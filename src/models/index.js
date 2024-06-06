import  User from './User.js';
import  Tree from './Tree.js';
import  Campaign from './Campaign.js';
import  Order from './Order.js';
import  CommandLine from './Commandline.js';

// Associations
 User.hasMany(Tree, { foreignKey: 'user_id', as: 'trees' });
 Tree.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

 Campaign.hasMany(Tree, { foreignKey: 'campaign_id', as: 'trees' });
 Tree.belongsTo(Campaign, { foreignKey: 'campaign_id', as: 'campaign' });

 User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
 Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

 Order.hasMany(CommandLine, { foreignKey: 'order_id', as: 'commandLines' });
 CommandLine.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

 Tree.hasMany(CommandLine, { foreignKey: 'tree_id', as: 'commandLines' });
 CommandLine.belongsTo(Tree, { foreignKey: 'tree_id', as: 'tree' });

 User.hasMany(Campaign, { foreignKey: 'user_id', as: 'campaigns' }); // Un utilisateur peut avoir plusieurs campagnes, avec la clé étrangère 'userId'
Campaign.belongsTo(User, { foreignKey: 'user_id', as: 'user' }); // Une campagne appartient à un utilisateur, avec la clé étrangère 'userId'


export {User, Campaign, Tree, Order, CommandLine};