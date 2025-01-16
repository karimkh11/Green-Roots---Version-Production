
import { Order, User, CommandLine, Tree, Campaign } from '../models/index.js';
import stripe from '../../config/stripeConfig.js';





// fonction
export function calculateTotalAmount(cart) {
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



