
import passport from 'passport';
import {User, Tree} from '../models/index.js';
import flash from 'connect-flash';
//import LocalStrategy from `passport-local`.Strategy;


const loginController = {
  getLogin: (req, res) => {
    const title = 'Connexion';
    const errorMessage = req.flash('error');
    const user = req.user;
    res.render('login', { title: title, errorMessage: errorMessage, user: user });
  },

  login: async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      try {
        if (err) {
          throw err;
        }
        if (!user) {
          req.flash('error', info.message);
          return res.redirect('/login');
        }

        // Sauvegarder l'état actuel de la session avant `req.login`
        const savedSessionCart = req.session.cart || '[]';

        req.login(user, (err) => {
          if (err) {
            throw err;
          }

          // Restaurer le panier de session après `req.login`
          req.session.cart = req.session.cart || savedSessionCart;

          console.log('Contenu brut du localCart reçu :', req.body.localCart);

          // Récupérer le panier local et le panier en session
          const localCart = JSON.parse(req.body.localCart || '[]');
          console.log('Panier local reçu depuis le formulaire :', localCart);

          const sessionCart = JSON.parse(req.session.cart || '[]');
          console.log('Panier en session avant fusion :', sessionCart);

          // Fusionner les paniers sans doublons
          const mergedCart = [...sessionCart];
          localCart.forEach(item => {
            if (!mergedCart.some(cartItem => cartItem.tree_id === item.tree_id)) {
              mergedCart.push(item);
            }
          });
          console.log('Panier fusionné :', mergedCart);

          // Sauvegarder le panier fusionné dans la session
          req.session.cart = JSON.stringify(mergedCart);
          req.session.save(err => {
            if (err) {
              console.error('Erreur lors de la sauvegarde du panier dans la session :', err);
            }
            console.log('Panier en session après sauvegarde :', req.session.cart);

            // Redirection en fonction du rôle
            if (user.role === 'admin') {
              return res.redirect('/admin');
            }
            return res.redirect('/profile');
          });
        });
      } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/login');
      }
    })(req, res, next);
  },
};

export default loginController;



