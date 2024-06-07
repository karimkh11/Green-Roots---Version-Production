import {User, Tree, Campaign, CommandLine} from '../models/index.js';


// Route pour obtenir les commandes d'un utilisateur avec un certain statut
export const suiviCommande = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                userId: req.user.id,
                status: 'pending' // Modifier selon le statut désiré
            },
            include: [{
                model: CommandLine,
                as: 'commandLines',
                include: [{
                    model: Tree,
                    as: 'tree',
                    include: [{
                        model: Campaign,
                        as: 'campaign'
                    }]
                }]
            }]
        });
        res.json(orders);
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        res.status(500).send('Internal Server Error');
    }
};