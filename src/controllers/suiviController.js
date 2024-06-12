import { User, Tree, Campaign, CommandLine, Order } from '../models/index.js';
import { Op } from 'sequelize';

// Route pour obtenir les commandes d'un utilisateur avec un certain statut
export const suiviCommande = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                user_id: req.user.id,
                status: 'En attente' // Modifier selon le statut désiré
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
        res.render('myorders', { orders, title: 'Ma Commandes', user: req.user });
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const plantationController = async (req, res) => {
    try {
        const { search, sort } = req.query;
        let queryOptions = {
            include: [
                {
                    model: CommandLine,
                    as: 'commandLines',
                    include: [
                        {
                            model: Order,
                            as: 'order',
                            attributes: ['id', 'createdAt'],
                            where: { status: { [Op.ne]: 'En attente' } }
                        }
                    ],
                    required: true
                },
                {
                    model: Campaign,
                    as: 'campaign',
                    attributes: ['name'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            where: { role: 'partner' },
                            attributes: ['telephone']
                        }
                    ]
                }
            ],
            where: {},
            attributes: ['id', 'name', 'status', 'gps_coordinates']
        };

        if (search) {
            queryOptions.where.name = { [Op.iLike]: `%${search}%` };
        }

        const trees = await Tree.findAll(queryOptions);
        const treesData = trees.map(tree => {
            const order = tree.commandLines[0]?.order;
            const partner = tree.campaign?.user;
            return {
                orderId: order?.id,
                orderDate: order?.createdAt.toISOString().split('T')[0], // Format the date properly
                name: tree.name,
                campaignName: tree.campaign?.name,
                partnerPhone: partner?.telephone ?? '',
                status: tree.status,
                gps_coordinates: tree.gps_coordinates ? {
                    lat: tree.gps_coordinates.coordinates[1], // Correcting latitude and longitude
                    lng: tree.gps_coordinates.coordinates[0]  // Correcting latitude and longitude
                } : null
            };
        });

        res.render('plantationTrees', {
            trees: treesData,
            title: 'Suivi des Arbres Validés',
            user: req.user,
            searchQuery: search
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des arbres validés:', error);
        res.status(500).send('Internal Server Error');
    }
};
