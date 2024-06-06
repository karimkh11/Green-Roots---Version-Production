import { v2 as cloudinary } from 'cloudinary';
import {User, Tree, Campaign } from '../models/index.js'; // Assurez-vous que le chemin est correct

const gestionController = {
  uploadTreeImageController: async (req, res) => {
    const title = 'Formulaire d\'upload d\'image'; // Titre de la page
    const user = req.user; // Utilisateur actuellement connecté (le cas échéant)

    try {
      const campaigns = await Campaign.findAll();
      const users = await User.findAll({
        where: {
          role: 'Partenaire' // Filtrer pour obtenir uniquement les utilisateurs avec le rôle 'partenaire'
        }
      });

      res.render('uploadTreeImageForm', { title, user, campaigns, users });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors du chargement des campagnes et des utilisateurs.');
    }
  },

  uploadController: async (req, res) => {
    try {
      // Téléchargement de l'image sur Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.body.imageUrl, {
        public_id: req.body.publicId
      });
  
      // Récupérer la campagne par ID pour obtenir le nom de l'organisation
      const campaign = await Campaign.findByPk(req.body.campaign_id);
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
  
      // Création d'un nouvel arbre avec l'URL de l'image téléchargée et le nom de l'organisation de la campagne
      const newTree = await Tree.create({
        campaign_id: req.body.campaign_id,
        user_id: req.body.user_id,
        name: req.body.name,
        description: `${req.body.description} - Organization: ${campaign.nameOfOrganization}`,
        image: uploadResult.secure_url, // URL de l'image téléchargée
        price: req.body.price,
        date_of_purchase: req.body.date_of_purchase,
        status: req.body.status,
        planting_date: req.body.planting_date,
        gps_coordinates: req.body.gps_coordinates
      });
  
      res.json(newTree);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload image and create tree' });
    }
  },
};

export default gestionController;

