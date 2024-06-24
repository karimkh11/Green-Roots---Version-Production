import { Campaign } from '../models/index.js';

// Contrôleur utilisateur
const userController = {

  // Action pour afficher la page d'accueil
  home: async(req, res) => {
    try {
      // On récupère les dernières campagnes enregistrées en base de données
      const lastCampaigns = await Campaign.findAll(
        {
          order: [
            // On trie en partant de la fin
            ['id', 'DESC'],
          ],
          // On limite aux 3 premiers enregistrements
          limit: 3
        }
      );

      res.render('home', { title: 'Accueil', lastCampaigns, user: req.user });
    } catch (error) {
      res.status(500).send('Erreur serveur');
    }
  },
};

// Exporter le contrôleur utilisateur pour pouvoir l'utiliser dans d'autres parties de l'application
export default userController;