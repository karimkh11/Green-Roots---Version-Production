import { User, Tree, Campaign, CommandLine, Order } from '../models/index.js';



export const createCampaign = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs ayant le rôle 'partner'
        const partners = await User.findAll({
            where: { role: 'partner' },
            attributes: ['id', 'lastname']
        });

        // Afficher la vue avec les partenaires passés en tant que paramètre
        res.render('createCampaign', { partners, title: 'Campaign', user: req.user });
    } catch (error) {
        console.error('Error fetching partners:', error);
        res.status(500).send('Internal Server Error');
    }
};


// Route pour traiter la soumission du formulaire de création de campagne
export const formCampaign = async (req, res) => {
    const { name, image, description, userId } = req.body;

    try {
        // Vérifier si l'utilisateur sélectionné est bien un partenaire
        const user = await User.findOne({
            where: {
                id: userId,
                role: 'partner'
            }
        });

        if (!user) {
            req.flash('error', 'Utilisateur non trouvé ou n\'est pas un partenaire');
            return res.redirect('/admin');
        }

        // Créer la nouvelle campagne
        const newCampaign = await Campaign.create({
            name,
            description,
            image,
            user_id: userId
        });

        req.flash('success', 'Campagne créée avec succès');
        res.redirect('/admin'); // Rediriger vers la liste des campagnes ou toute autre page appropriée
    } catch (error) {
        console.error('Error creating campaign:', error);
        req.flash('error', 'Erreur lors de la création de la campagne');
        res.redirect('/admin');
    }
};


