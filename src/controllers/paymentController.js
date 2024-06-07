
import { Order, User, CommandLine, Tree, Campaign } from '../models/index.js';
import stripe from '../../config/stripeConfig.js';
import PDFDocument from 'pdfkit';

import path from 'path';
import { fileURLToPath } from 'url';


// Convertir import.meta.url en chemin de fichier
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Définir le chemin vers le dossier 'invoices'
const invoicesDir = path.join(__dirname, '../../invoices');

// Vérifier si le dossier existe, sinon le créer
import fs from 'fs';

if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
}
// fonction
function calculateTotalAmount(cart) {
    // S'assurer que cart est un tableau
    if (!Array.isArray(cart)) {
        console.error('Expected cart to be an array, got:', cart);
        return 0; // Retourne 0 si cart n'est pas un tableau
    }

    return cart.reduce((total, item) => total + (item.price * 100 * item.quantity), 0);
}

// Route pour afficher la page de paiement
export const paymentController = async (req, res) => {

    const cart = JSON.parse(req.session.cart || '[]');
    const totalAmount = calculateTotalAmount(cart); // Calcul en centimes pour Stripe
    let clientSecret = null;

    if (cart.length > 0 && totalAmount >= 50) { // Stripe a un montant minimum de 50 centimes pour les transactions
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalAmount,
                currency: 'eur',
                description: "Achat d'arbres",
                // Vous pouvez ajouter d'autres paramètres ici si nécessaire
            });
            clientSecret = paymentIntent.client_secret;
        } catch (error) {
            console.error('Erreur lors de la création du PaymentIntent:', error);
            req.flash('error', 'Impossible d\'initialiser le paiement. Veuillez réessayer.');
        }
    }
    req.session.totalAmount = totalAmount; // Stockage en centimes
    res.render('payment', {
        cartDetails: req.session.cart || [],
        title: 'Page de Paiement',
        totalAmount: totalAmount / 100,  // Convertir en euros pour l'affichage
        cart: cart,
        user: req.user,
        errors: req.flash('error'),
        clientSecret: clientSecret,  // Passer le clientSecret à la vue
        isLoggedIn: req.isAuthenticated()
    });


};




export const detailController = async (req, res) => {

    try {
        const order = await Order.findByPk(req.params.orderId, {
            include: [{
                model: CommandLine,
                as: 'commandLines',
                include: [{
                    model: Tree,
                    as: 'tree'
                }]
            }]
        });

        if (!order) {
            return res.status(404).send('Commande non trouvée');
        }

        // Utiliser console.log pour afficher les détails de l'objet 'order'
        console.log(JSON.stringify(order, null, 2)); // Cela affichera la structure complète de l'objet `order`
        res.render('orderDetails', { order, title: 'Ma Commandes', user: req.user, });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).send('Erreur interne du serveur');
    }
};



// Controller pour la création de l'intention de paiement
// Controller pour créer l'intention de paiement et enregistrer la commande
export const createPaymentIntent = async (req, res) => {
    try {
        console.log('Received request:', req.body);  // Log de la requête reçue
        if (!req.session.cart || req.session.cart === '[]') {
            return res.status(400).json({ error: "Le panier est vide" });
        }

        let cartItems;
        try {
            cartItems = JSON.parse(req.session.cart); // Assumer que le panier est stocké sous forme de chaîne JSON
        } catch (error) {
            console.error('Error parsing cart:', error);
            return res.status(500).json({ error: "Erreur lors de la lecture du panier" });
        }

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ error: "Le panier est invalide" });
        }

        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const order = await Order.create({
            user_id: req.user.id,  // Assumer que l'ID de l'utilisateur est stocké dans la session
            order_date: new Date(),
            paid: true,  // Ici on suppose que le paiement a été effectué avec succès
            status: 'En attente',
            total: total
        });
        // Création des lignes de commande
        for (const item of cartItems) {
            await CommandLine.create({
                order_id: order.id,
                tree_id: item.tree_id,
                quantity: item.quantity,
                commandline_total: item.price * item.quantity
            });
        }
        // Assurez-vous d'ajouter une logique pour créer les lignes de commande si nécessaire ici.

        req.session.cart = '[]';  // Vider le panier après la commande
        res.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};



// Fonction pour générer une facture (exemple fictif)
function generateInvoice(order) {
    const doc = new PDFDocument();

    // Définir le chemin de sortie du fichier
    const filePath = path.join(invoicesDir, `Invoice_${order.id}.pdf`);


    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(filePath));

    // Ajouter un titre
    doc.fontSize(25).text('Facture', {
        align: 'center'
    });

    // Ajouter les informations de la commande
    doc.fontSize(12).moveDown();
    doc.text(`ID Commande: ${order.id}`, {
        align: 'left'
    });
    doc.text(`Statut: ${order.status}`, {
        align: 'left'
    });
    doc.text(`Total Payé: ${order.total / 100} €`, {
        align: 'left'
    });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, {
        align: 'left'
    });

    // Lister les articles (simulés ici, vous devrez ajuster en fonction de votre modèle)
    doc.moveDown().fontSize(18).text('Articles:', {
        underline: true
    });
    order.items.forEach(item => {
        doc.fontSize(12).text(`${item.description} - ${item.quantity} x ${item.unitPrice / 100} €`);
    });

    // Ajouter un espace à la fin
    doc.moveDown().fontSize(14).text('Merci pour votre achat!', {
        align: 'center'
    });

    // Finalize PDF file
    doc.end();
}

