import express from 'express';
import loginController from '../controllers/loginController.js';
import userController from '../controllers/userContreller.js';
import * as signupController from '../controllers/signupController.js';
import * as profileController from '../controllers/profileController.js';
import adminController from '../controllers/adminConttroller.js';
import { getCampaign, getTrees } from '../controllers/treeController.js';
import gestionController from '../controllers/gestionController.js';
import * as cartController from '../controllers/cartController.js';
import  { createPaymentIntent, detailController, paymentController } from '../controllers/paymentController.js'
import { getOrders, validateOrder, getOrderPage, getValidatedOrders, updateOrderStatus } from '../controllers/ordersController.js';
import { isLoggedIn, isAdmin } from '../middleware/authMiddleware.js';
import { plantationController, suiviCommande } from '../controllers/suiviController.js';
import { createCampaign, formCampaign } from '../controllers/campaignController.js';

const router = express.Router();


router.get('/', userController.home);
router.get('/catalog', getTrees);
router.get('/campaign', getCampaign );
// Route pour afficher le contenu du panier
router.get('/cart', cartController.getCart);

// Route pour ajouter un arbre au panier
router.post('/cart/add', cartController.addToCart);

router.get('/payment', isLoggedIn, paymentController);
router.get('/order/:orderId', detailController);
router.post('/api/create_order', createPaymentIntent);

// Route pour vider le panier
router.post('/cart/clear', cartController.clearCart);
// Route pour mettre à jour la quantité d'un article dans le panier
router.post('/cart/update', cartController.updateCartQuantity);

router.post('/checkout', isLoggedIn, cartController.checkout);
router.get('/orders1',  isLoggedIn, getOrders );
// Login route
router.get('/login', loginController.getLogin);
router.post('/login', loginController.login);

router.get('/register', signupController.getSignup);
router.post('/register', signupController.postSignup);

router.get('/orders', isAdmin, getOrderPage);
router.post('/admin/orders/validate/:orderId', isAdmin, validateOrder);

// Route pour afficher les commandes validées
router.get('/admin/validated-orders', isAdmin, getValidatedOrders);

// Route pour mettre à jour le statut d'une commande
router.post('/admin/orders/update-status/:orderId', isAdmin, updateOrderStatus);

router.get('/admin', isAdmin,  adminController.getAdmin);
//Gestion des Comptes
router.get('/admin/manage-accounts', isAdmin, adminController.manageAccounts);
router.post('/admin/create-account', isAdmin, adminController.createAccount);


router.get('/createCampaign', isAdmin, createCampaign);
router.post('/campaigns', isAdmin, formCampaign);
// Route POST pour gérer l'upload d'image (accessible uniquement aux administrateurs)
router.get('/add-tree', isAdmin, gestionController.getAddTreeForm);
router.post('/add-tree', isAdmin, gestionController.addTree);

router.get('/profile',isLoggedIn, profileController.getProfile);
router.get('/profile/edit', isLoggedIn, profileController.getEditProfile);
router.get('/myorders', isLoggedIn, suiviCommande);
// Route pour afficher les arbres validés
router.get('/validated-trees', plantationController);
router.post('/profile/edit', isLoggedIn, profileController.updateProfile);
// Route de déconnexion
router.post('/logout', profileController.logout);


// User routes
// router.get('/users', userController.index);
// router.get('/users/:id', userController.show);
// router.post('/users', userController.create);
// router.put('/users/:id', userController.update);
// router.delete('/users/:id', userController.destroy);

// // Tree routes
// router.get('/trees', treeController.index);
// router.get('/trees/:id', treeController.show);
// router.post('/trees', treeController.create);
// router.put('/trees/:id', treeController.update);
// router.delete('/trees/:id', treeController.destroy);

// // Order routes
// router.get('/orders', orderController.index);
// router.get('/orders/:id', orderController.show);
// router.post('/orders', orderController.create);
// router.put('/orders/:id', orderController.update);
// router.delete('/orders/:id', orderController.destroy);

// // Campaign routes
// router.get('/campaigns', campaignController.index);
// router.get('/campaigns/:id', campaignController.show);
// router.post('/campaigns', campaignController.create);
// router.put('/campaigns/:id', campaignController.update);
// router.delete('/campaigns/:id', campaignController.destroy);

export default router;

