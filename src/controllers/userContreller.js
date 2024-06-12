import {User} from '../models/index.js';

const userController = {

  home:  (req, res) => {
    const title = 'Accueil'; // Définir la variable title
    const user = req.user; // Récupérer l'utilisateur connecté depuis la requête
    res.render('home', { title: title, user: user }); // Transmettre les variables title et user à la vue

  },
  

};

export default userController