
import { User }  from '../src/models/index.js'; 

describe('Test simple d\'intégration', () => {
  test('Afficher tous les utilisateurs dans la console', async () => {
    const users = await User.findAll({ attributes: ['id', 'email', 'role'] }); // Récupère tous les utilisateurs
    console.log(users.map(user => user.toJSON())); // Affiche chaque utilisateur en JSON dans la console
    expect(users).toBeDefined(); // Vérifie que les utilisateurs sont bien récupérés
  });
});

import { calculateTotalAmount } from '../src/controllers/paymentController.js';

test('Calcule correctement le montant total', () => {
    const cart = [
        { price: 10.99, quantity: 2 }, // 10.99 * 100 * 2 = 2198
        { price: 5.49, quantity: 1 },  // 5.49 * 100 * 1 = 549
    ];
    const result = calculateTotalAmount(cart);
    expect(result).toBe(2747); // Total attendu : 2198 + 549 = 2747
});
