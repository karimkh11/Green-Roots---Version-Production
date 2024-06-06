import {User} from '../models/index.js';
import bcrypt from 'bcrypt';




const adminController = {
// Méthode asynchrone pour afficher la page de profil
 getAdmin: async (req, res) => {
  try {
    // Récupérer les informations de l'utilisateur connecté depuis req.user
    const user = await User.findByPk(req.user.id);
    // Rendre la vue du profil en transmettant les informations de l'utilisateur
    res.render('admin', { title: 'Mon profil', user });
  } catch (error) {
    // Gérer les erreurs
    console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
    res.redirect('/login');
    //res.status(500).send('Erreur lors de la récupération des informations de l\'utilisateur');
  }
},
manageAccounts: (req, res) => {
  const title = 'Creation de compte';
  let errorMessage = '';
  if (req.isAuthenticated() && req.user.role === 'admin') {
    res.render('manage-accounts', {title: title, admin: req.user, user: req.user, errorMessage });
  } else {
    res.redirect('/login');
  }
},

createAccount: async (req, res) => {
  const { email, password, firstname, lastname, telephone, birthday, locality, role } = req.body;
  try {
    // Vérifier d'abord si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà.');
    }
    // Création du nouvel utilisateur dans la base de données
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, 10), // Hachage du mot de passe
      firstname,
      lastname,
      telephone,
      birthday,
      locality,
      role
    });
    req.flash('success', 'Nouveau compte créé avec succès.');
    res.redirect('/admin');
  } catch (error) {
    console.error('Erreur lors de la création du compte :', error);
    req.flash('error', error.message);
    res.render('manage-accounts', { title: 'Création de compte', user: req.user, errorMessage: error.message });
  }
},

};

export default adminController;