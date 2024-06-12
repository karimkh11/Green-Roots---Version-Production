//import { v2 as cloudinary } from 'cloudinary';
import {User, Tree, Campaign } from '../models/index.js'; // Assurez-vous que le chemin est correct
import sequelize from '../database/database.js';

const gestionController = {
  getAddTreeForm: async (req, res) => {
    const title = 'Formulaire d\'upload d\'image'; // Titre de la page
    const user = req.user; // Utilisateur actuellement connecté (le cas échéant)

    try {
      const campaigns = await Campaign.findAll();
      res.render('addTree', { campaigns, title, user });
  } catch (error) {
      console.error('Erreur lors de la récupération des campagnes:', error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  addTree: async (req, res) => {

    const { campaignId, name, description, image, price, latitude, longitude } = req.body;

    try {
        // Récupérer la campagne pour obtenir l'ID de l'utilisateur associé
        const campaign = await Campaign.findByPk(campaignId, {
            include: [{
                model: User, // Assurez-vous que le modèle User est importé et correctement associé
                as: 'user'  // Correspond à l'alias défini dans l'association
            }]
        });

        if (!campaign) {
            return res.status(404).send('Campagne non trouvée');
        }

        // Création de l'arbre avec l'userId du propriétaire de la campagne
        const tree = await Tree.create({
            campaign_id: campaignId,
            user_id: campaign.user.id,  // Utiliser l'ID de l'utilisateur associé à la campagne
            name: name,
            description: description,
            image: image,
            price: price,
            gps_coordinates: sequelize.fn('ST_SetSRID', sequelize.fn('ST_Point', longitude, latitude), 4326)
        });
      console.log(tree);
        res.redirect('/admin');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'arbre:', error);
        res.status(500).send('Erreur interne du serveur');
    }
  },
};

export default gestionController;

