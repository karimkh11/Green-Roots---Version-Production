import { Order, CommandLine, Tree } from '../models/index.js';
import stripe from '../../config/stripeConfig.js';



function calculateTotalAmount(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity * 100), 0);
}

// Fonction pour récupérer le contenu du panier
export const getCart = async (req, res) => {
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
    res.render('cart', {session: req.session,
        title: 'Panier',
        cart,
        user: req.user,
        totalAmount: calculateTotalAmount(cart), // Converti pour l'affichage
        clientSecret: clientSecret,
        errors: req.flash('error'),
        isLoggedIn: req.isAuthenticated()
    });
};

// Fonction pour ajouter un arbre au panier
export const addToCart = async (req, res) => {
  try {
      const { treeId, quantity } = req.body;
      const parsedQuantity = parseInt(quantity, 10);

      // Validation de la quantité
      if (parsedQuantity <= 0) {
          req.session.errorMessage = 'La quantité doit être supérieure à zéro.';
          return res.redirect('/catalog');
      }

      // Vérification de l'existence de l'arbre
      const tree = await Tree.findByPk(treeId);
      if (!tree) {
          req.session.errorMessage = 'Arbre non trouvé';
          return res.redirect('/catalog');
      }

      // Mise à jour ou ajout de l'article dans le panier
      let cart = JSON.parse(req.session.cart || '[]');
      const existingItem = cart.find(item => item.tree_id === tree.id);
      if (existingItem) {
          existingItem.quantity += parsedQuantity;
      } else {
          cart.push({
              tree_id: tree.id,
              name: tree.name,
              description: tree.description,
              image: tree.image,
              price: tree.price,
              quantity: parsedQuantity
          });
      }

      // Sauvegarde du panier dans la session
      req.session.cart = JSON.stringify(cart);
      // Stocker le montant total dans la session
      req.session.totalAmount = calculateTotalAmount(cart);

      res.redirect('/cart');
  } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      req.session.errorMessage = 'Erreur serveur lors de l\'ajout au panier';
      res.redirect('/catalog');
  }
};


// Fonction pour vider le panier
export const clearCart = async (req, res) => {
    try {
        delete req.session.cart;
        res.sendStatus(204);
    } catch (error) {
        //console.error('Erreur lors de la suppression du panier :', error);
        res.status(500).send('Erreur lors de la suppression du panier');
    }
};


// Ajout ou mise à jour des fonctions du contrôleur
export const updateCartQuantity = async (req, res) => {
    const { treeId, quantity } = req.body;
    let cart = JSON.parse(req.session.cart || '[]');
    const itemIndex = cart.findIndex(item => item.tree_id === parseInt(treeId, 10));

    if (itemIndex > -1) {
        cart[itemIndex].quantity = parseInt(quantity, 10); // S'assurer que la quantité est un entier
        req.session.cart = JSON.stringify(cart);
        const newTotal = calculateTotalAmount(cart); // Calcule le nouveau total

        // Envoie la réponse avec le nouveau total
        res.json({ success: true, newTotal: newTotal });
    } else {
        res.status(404).json({ success: false, message: "Article non trouvé dans le panier" });
    }
};


// Fonction pour valider le panier et créer une commande
export const checkout = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    //console.log('Contenu du panier à la validation :', JSON.stringify(req.session.cart));

    const cart = JSON.parse(req.session.cart || '[]');
    // Vérifier si tous les articles ont une quantité supérieure à zéro
    const hasInvalidQuantity = cart.some(item => item.quantity <= 0);
    if (hasInvalidQuantity) {
        req.flash('error', 'La quantité de tous les articles doit être supérieure à zéro pour valider le panier.');
        return res.redirect('/cart');
    }
    console.log('Cart at checkout start:', JSON.stringify(cart, null, 2)); 

    if (cart.length === 0) {
        return res.redirect('/catalog');
    }

    try {
        const order = await Order.create({
            user_id: req.user.id,
            order_date: new Date(),
            paid: 'payé',
            status: 'pending',
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        });

        for (const item of cart) {
            console.log('Processing item in checkout:', item);

            if (!item.tree_id) {
                throw new Error('CommandLine.tree_id cannot be null');
            }

            if (item.quantity > 0) { // Vérifiez que la quantité est supérieure à zéro
                await CommandLine.create({
                    order_id: order.id,
                    tree_id: item.tree_id,
                    quantity: item.quantity,
                    commandline_total: item.price * item.quantity
                });
            } else {
                console.log('Skipping item with zero quantity:', item);
            }
        }

        delete req.session.cart;
        res.redirect('/orders1');
    } catch (error) {
        console.error('Erreur lors de la validation du panier:', error);
        res.status(500).send('Erreur serveur');
    }
};
