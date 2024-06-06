import passport from 'passport';
import {User} from '../models/index.js';



export const getProfile = async (req, res) => {
  try {
      if (!req.user || !req.user.id) {
          throw new Error('User not found or user id is undefined');
      }
      
      const userProfile = await User.findByPk(req.user.id);
      
      if (!userProfile) {
          return res.status(404).send('User profile not found');
      }

      res.render('profile', {title: 'Mon profil', user: userProfile });
  } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
      res.status(500).send('Erreur serveur');
  }
};


// Afficher la page de modification du profil

 // Afficher la page de modification du profil
export const getEditProfile = async (req, res) => {
  try {
    // Récupérer les informations de l'utilisateur à partir de la base de données
    const user = await User.findByPk(req.user.id);
    
    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    
    // Rendre la page de modification du profil avec les informations de l'utilisateur
    const title = 'Modifier mon profil'; // Définir la variable title
      res.render('editProfile', { title: title, user: user }); // Transmettre les variables title et user à la vue
  } catch (err) {
    console.error('Erreur lors de la récupération des informations de l\'utilisateur :', err);
    res.status(500).send('Une erreur s\'est produite lors de la récupération des informations de l\'utilisateur');
  }
};



// Mettre à jour les informations du profil
export const updateProfile = async (req, res) => {
  try {
    const { firstname, lastname, telephone, locality } = req.body;

    // Trouver l'utilisateur à partir de req.user.id ou req.user._id, selon votre modèle
    const user = await User.findByPk(req.user.id);

    // Mettre à jour les champs du profil avec les nouvelles valeurs
    user.firstname = firstname;
    user.lastname = lastname;
    user.telephone = telephone;
    user.locality = locality;
    
    // Enregistrer les modifications dans la base de données
    await user.save();

      // Vérification du rôle après une connexion réussie
      if (user.role === 'admin') {
        return res.redirect('/admin'); // Rediriger les administrateurs vers une route spécifique
      }
          return res.redirect('/profile'); // Rediriger où vous le souhaitez après la connexion réussie
  } catch (err) {
    // Gérer les erreurs de validation ou d'autres erreurs lors de la mise à jour du profil
    console.error('Erreur lors de la mise à jour du profil :', err);
    res.redirect('/profile/edit'); // Rediriger vers la page de modification du profil en cas d'erreur
  }
};

// profileController.js

// Fonction pour la déconnexion de l'utilisateur
export const logout = (req, res) => {
  // Utilisez la méthode logout() fournie par Passport pour déconnecter l'utilisateur
  req.logout(function(err) {
    if (err) {
      // Gérer les erreurs éventuelles ici
      console.error('Erreur lors de la déconnexion :', err);
      return res.redirect('/'); // Rediriger vers la page d'accueil ou toute autre page en cas d'erreur
    }
    // Rediriger l'utilisateur vers la page d'accueil ou toute autre page après la déconnexion réussie
    res.redirect('/');
  });
};

