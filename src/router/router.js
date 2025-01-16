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
import { validateOrder, getOrderPage, getValidatedOrders, updateOrderStatus } from '../controllers/ordersController.js';
import { isLoggedIn, isAdmin } from '../middleware/authMiddleware.js';
import { plantationController, suiviCommande } from '../controllers/suiviController.js';
import { createCampaign, formCampaign } from '../controllers/campaignController.js';
import detailPageController from '../controllers/detailController.js'
const router = express.Router();


// 1. ROUTES PUBLIQUES (libres)
router.get('/', userController.home);
router.get('/catalog', getTrees);
router.get('/campaign', getCampaign);
router.get('/detail/:id', detailPageController.getDetail);

// 2. ROUTES RELATIVES AU PANIER
router.get('/cart', cartController.getCart);
router.post('/cart/add', cartController.addToCart);
router.post('/cart/clear', cartController.clearCart);
router.post('/cart/update', cartController.updateCartQuantity);

// 3. AUTHENTIFICATION / INSCRIPTION
router.get('/login', loginController.getLogin);
router.post('/login', loginController.login);
router.get('/register', signupController.getSignup);
router.post('/register', signupController.postSignup);
router.post('/logout', profileController.logout);

// 4. ROUTES PROTEGÉES PAR isLoggedIn
router.get('/payment', isLoggedIn, paymentController);
router.post('/api/create_order', isLoggedIn, createPaymentIntent);
router.get('/order/:orderId', isLoggedIn, detailPageController.getDetail);
router.get('/profile', isLoggedIn, profileController.getProfile);
router.get('/profile/edit', isLoggedIn, profileController.getEditProfile);
router.post('/profile/edit', isLoggedIn, profileController.updateProfile);
router.get('/myorders', isLoggedIn, suiviCommande);
router.get('/validated-trees', isLoggedIn, plantationController);

// 5. ROUTES PROTEGÉES PAR isAdmin
router.get('/admin', isAdmin, adminController.getAdmin);
router.get('/orders', isAdmin, getOrderPage);
router.post('/admin/orders/validate/:orderId', isAdmin, validateOrder);
router.get('/admin/validated-orders', isAdmin, getValidatedOrders);
router.post('/admin/orders/update-status/:orderId', isAdmin, updateOrderStatus);
router.get('/admin/manage-accounts', isAdmin, adminController.manageAccounts);
router.post('/admin/create-account', isAdmin, adminController.createAccount);
router.get('/createCampaign', isAdmin, createCampaign);
router.post('/campaigns', isAdmin, formCampaign);
router.get('/add-tree', isAdmin, gestionController.getAddTreeForm);
router.post('/add-tree', isAdmin, gestionController.addTree);

// 6. EXPORT DU ROUTER
export default router;