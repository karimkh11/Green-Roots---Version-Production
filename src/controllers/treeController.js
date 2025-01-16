import {Tree, Campaign} from '../models/index.js';


export const getTrees = async (req, res) => {
  try {
      const isLoggedIn = req.isAuthenticated();
      const trees = await Tree.findAll({
          include: [{
              model: Campaign,
              as: 'campaign',
              attributes: ['name']
          }]
      });
 // Stocker le message d'erreur et le supprimer de la session
 const errorMessage = req.session.errorMessage;
 req.session.errorMessage = null; // Réinitialiser immédiatement
      res.render('catalog', {
          title: 'Catalogue d\'arbres',
          trees,
          user: req.user, // Supposons que l'utilisateur est stocké dans req.user après authentification
          isLoggedIn: isLoggedIn,
          errorMessage: errorMessage,
      });
      
  } catch (error) {
      console.error('Erreur lors de la récupération des arbres:', error);
      res.status(500).send('Erreur serveur');
  }
};

export const getCampaign = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      include: {
        model: Tree,
        as: 'trees',
        attributes: ['name', 'id']}
    });
    res.render('campaign', {title: 'Campagne', campaigns, user: req.user // Supposons que l'utilisateur est stocké dans req.user après authentification
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des arbres:', error);
    res.status(500).send('Erreur serveur');
  }
};
