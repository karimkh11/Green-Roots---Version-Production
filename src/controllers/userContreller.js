import {User} from '../models/index.js';

const userController = {

  home:  (req, res) => {
    const title = 'Accueil'; // Définir la variable title
    const user = req.user; // Récupérer l'utilisateur connecté depuis la requête
    res.render('home', { title: title, user: user }); // Transmettre les variables title et user à la vue

  },
  

// Action pour traiter la soumission du formulaire de connexion
// postLogin: async (req, res) => {
//     try {
//         // Logique de vérification de l'utilisateur à partir des données du formulaire
//         const { email, password } = req.body;

//         // Rechercher l'utilisateur dans la base de données par son adresse e-mail
//         const user = await User.findByEmail(email);

//         // Si aucun utilisateur n'est trouvé avec cet e-mail, afficher un message d'erreur
//         if (!user) {
//             throw new Error('Aucun utilisateur avec cet e-mail. Veuillez vous inscrire.');
//         }

//         // Vérifier si le mot de passe est correct en utilisant la méthode de vérification du modèle utilisateur
//         const isPasswordValid = await user.checkPassword(password);

//         // Si le mot de passe est incorrect, afficher un message d'erreur
//         if (!isPasswordValid) {
//             throw new Error('identifiant ou mot passe incorrect. Veuillez réessayer.');
//         }

//         // Si les identifiants sont valides, connecter l'utilisateur et rediriger vers une page sécurisée
//         req.login(user, (err) => {
//             if (err) {
//                 throw err;
//             }
//             return res.redirect('/profile'); // Rediriger vers une page sécurisée après la connexion réussie
//         });
//     } catch (error) {
//         // En cas d'erreur, rediriger vers la page de connexion avec un message d'erreur
//         req.flash('error', error.message);
//         return res.redirect('/login');
//     }
// },


  // postLogin: async (req, res) => {
  //   try {
  //     // Logique de vérification de l'utilisateur
  //     const { email, password } = req.body;

  //     // Exemple de vérification factice
  //     if (email === 'utilisateur@example.com' && password === 'motdepasse') {
  //         res.send('Vous êtes connecté !');
  //     } else {
  //         throw new Error('Identifiants incorrects. Veuillez réessayer.');
  //     }
  // } catch (error) {
  //     res.render('connexion', { errorMessage: error.message });
  // }
  // },
};

export default userController