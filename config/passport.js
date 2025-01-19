
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../src/models/index.js';
import bcrypt from 'bcryptjs'

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return done(null, false, { message: 'Aucun utilisateur avec cet e-mail' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: 'identifiant ou mot passe incorrect. Veuillez réessayer.' });
      }

      return done(null, user);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

export default initialize;
