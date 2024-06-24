import { Tree, Campaign } from "../models/index.js";

const detailPageController = {
    getDetail: async (req, res) => {
        const campaignId = req.params.id;
    try {
      const campaign = await Campaign.findByPk(campaignId, {
        include: {
          model: Tree,
          as: 'trees',
          attributes: ['id', 'name']}
      });
        if (!campaign) {
        // Gérer le cas où la campagne n'est pas trouvée
        return res.status(404).send('Campagne non trouvée');
      }
        res.render('detail', {
            title: 'Detail de la campagne',
            campaign,
            user: req.user // Supposons que l'utilisateur est stocké dans req.user après authentification
      });
    } catch (error) {
      console.error('Erreur lors de la récupération detail de la campagne:', error);
      res.status(500).send('Erreur serveur');
    }
  },
};

export default detailPageController;