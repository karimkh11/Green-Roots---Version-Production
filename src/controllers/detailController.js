import { Tree, Campaign } from "../models/index.js";

// Définition du contrôleur pour la page de détail
const detailPageController = {
  
  // Méthode pour récupérer et afficher les détails d'une campagne
  getDetail: async (req, res) => {
    
    // Récupérer l'identifiant de la campagne depuis les paramètres de la requête
    const campaignId = req.params.id;

    try {
      // Rechercher la campagne par son ID dans la base de données
      // Inclure les arbres associés (modèle Tree) avec leurs ID et noms
      const campaign = await Campaign.findByPk(campaignId, {
        include: {
          model: Tree,             // Modèle des arbres associés
          as: 'trees',             // Alias pour la relation
          attributes: ['id', 'name'] // Inclure uniquement les colonnes 'id' et 'name' des arbres
        }
      });

      // Vérifier si la campagne n'a pas été trouvée
      if (!campaign) {
        // Retourner une réponse 404 si la campagne n'existe pas
        return res.status(404).send('Campagne non trouvée');
      }

      // Rendre la vue 'detail' en passant les données de la campagne
      res.render('detail', {
        title: 'Détail de la campagne', // Titre de la page
        campaign,                      // Données de la campagne
        user: req.user                 // Informations sur l'utilisateur connecté
      });

    } catch (error) {
      // Gérer les erreurs potentielles lors de la récupération des données
      console.error('Erreur lors de la récupération du détail de la campagne:', error);

      // Retourner une réponse 500 en cas d'erreur serveur
      res.status(500).send('Erreur serveur');
    }
  },
};

export default detailPageController;