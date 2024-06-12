// controllers/orderController.js
import { Order, CommandLine, Tree, User } from '../models/index.js';
import { Op } from 'sequelize';

 export const getOrders = async (req, res) => {
    try {
      const orders = await Order.findAll({
        where: { user_id: req.user.id },
        include: [{
          model: CommandLine,
          as: 'commandLines',  // Ajoutez l'alias ici
          include: [{
            model: Tree,
            as: 'tree'  // Assurez-vous que l'alias pour Tree est correct
          }]
        }],
        order: [['id', 'ASC']]
      });
  
      console.log('Orders retrieved for user:', req.user.id, orders);
      res.render('orders1', {title: 'Mes Commandes', user: req.user, orders });
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.redirect('/');
    }
  };
  /////////////////////////////////////////////////////////!SECTION
  export const getOrderPage = async (req, res) => {
    try {
        const { email } = req.query;  // Récupère l'email de la requête pour filtrer
        let whereClause =  { status: 'En attente' };
        
        if (email) {
            const user = await User.findOne({ where: { email } });
            if (user) {
                whereClause.user_id = user.id;
            }
        }

        const orders = await Order.findAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['firstname', 'lastname']
                },
                {
                    model: CommandLine,
                    as: 'commandLines',
                    include: [{
                        model: Tree,
                        as: 'tree'
                    }]
                }
            ],
            order: [['order_date', 'DESC']]
        });

        res.render('order-management', {
            title: 'Gestion des Commandes',
            user: req.user,
            orders,
            search: email || ''
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
        res.status(500).render('error', { message: "Problème de serveur lors de la récupération des commandes." });
    }
};


// Fonction pour valider une commande
export const validateOrder = async (req, res) => {
  try {
      const { orderId } = req.params;
      const [updatedCount] = await Order.update({ status: 'validated' }, { where: { id: orderId } });
      console.log('Updated count:', updatedCount);

      if (updatedCount > 0) {
          res.json({ success: true, message: 'Commande validée avec succès.', orderId: orderId });
      } else {
          console.error('Commande non trouvée pour ID:', orderId);
          res.status(404).json({ success: false, message: 'Commande non trouvée.' });
      }
  } catch (error) {
      console.error('Erreur lors de la validation de la commande:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

export const getValidatedOrders = async (req, res) => {
  try {
      const { email } = req.query;
      let whereClause = {
        status: { [Op.ne]: 'En attente' }  // Utilise Op.ne pour exclure 'pending'
    };

      if (email) {
          const user = await User.findOne({ where: { email } });
          if (user) {
              whereClause.user_id = user.id;  // Applique un filtre supplémentaire par utilisateur si l'email est fourni
          }
      }

      const orders = await Order.findAll({
          where: whereClause,
          include: [
              {
                  model: User,
                  as: 'user',
                  attributes: ['firstname', 'lastname']
              },
              {
                  model: CommandLine,
                  as: 'commandLines',
                  include: [{
                      model: Tree,
                      as: 'tree'
                  }]
              }
          ],
          order: [['order_date', 'DESC']]
      });

      res.render('validated-orders', {
          title: 'Gestion des Commandes pour l\'Administration',
          user: req.user,
          orders,
          search: email || ''
      });
  } catch (error) {
      console.error('Erreur lors de la récupération des commandes pour l\'administration:', error);
      res.status(500).render('error', { message: "Problème de serveur lors de la récupération des commandes." });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
      const { orderId } = req.params;
      const { status } = req.body;

      const [updated] = await Order.update({ status }, {
          where: { id: orderId }
      });

      if (updated) {
          res.json({ success: true, message: 'Le statut de la commande a été mis à jour.' });
      } else {
          res.status(404).json({ success: false, message: 'Commande non trouvée.' });
      }
  } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la commande:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};


