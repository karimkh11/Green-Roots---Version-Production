//import { Strategy as LocalStrategy } from 'passport-local';
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
        req.login(user, (err) => {
          if (err) {
            throw err;
          }
          const cart = JSON.parse(req.body.localCart || '[]');
          if (cart.length > 0) {
            req.session.cart = JSON.stringify(cart);
          } else if (!req.session.cart) {
            req.session.cart = JSON.stringify([]);
          }

          req.session.save(err => {
            if (err) {
              console.error('Erreur lors de la réinitialisation du panier après connexion :', err);
            }
            // Vérification du rôle après une connexion réussie
            if (user.role === 'admin') {
              return res.redirect('/admin'); // Rediriger les administrateurs vers une route spécifique
            }
            return res.redirect('/profile'); // Rediriger où vous le souhaitez après la connexion réussie
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

