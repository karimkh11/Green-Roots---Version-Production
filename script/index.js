// Importation des modules nécessaires
import readline from 'readline'; // Module readline pour interagir avec l'utilisateur via la ligne de commande
import bcrypt from 'bcrypt'; // Module bcrypt pour le hachage des mots de passe
import { User } from '../src/models/index.js';
// Crée une interface readline pour lire les entrées utilisateur depuis le terminal
const rl = readline.createInterface({
  input: process.stdin, // Utilise l'entrée standard (clavier)
  output: process.stdout // Utilise la sortie standard (console)
});

// Fonction utilitaire pour poser une question et retourner la réponse en utilisant une Promise
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

(async () => {
  try {
    console.log("Création d'un utilisateur admin\n");

    // Poser des questions pour obtenir les informations de l'utilisateur
    const email = await question('Email: '); // Demande l'email
    const plainPassword = await question('Mot de passe: '); // Demande le mot de passe
    const firstname = await question('Prénom: '); // Demande le prénom
    const lastname = await question('Nom de famille: '); // Demande le nom de famille
    const telephone = await question('Téléphone: '); // Demande le téléphone
    const birthday = await question('Date de naissance (YYYY-MM-DD): '); // Demande la date de naissance
    const locality = await question('Localité: '); // Demande la localité

    // Hacher le mot de passe fourni par l'utilisateur
    const password = bcrypt.hashSync(plainPassword, 10);

    // Créer un nouvel utilisateur avec les informations fournies et le rôle d'admin
    const newUser = await User.create({
      email, // Email de l'utilisateur
      password, // Mot de passe haché
      firstname, // Prénom de l'utilisateur
      lastname, // Nom de famille de l'utilisateur
      telephone, // Téléphone de l'utilisateur
      birthday, // Date de naissance de l'utilisateur
      locality, // Localité de l'utilisateur
      role: 'admin', // Rôle de l'utilisateur (admin)
    });

    // Afficher un message de succès avec les détails de l'utilisateur créé
    console.log('Utilisateur admin créé avec succès:', newUser.toJSON());

  } catch (error) {
    // Afficher un message d'erreur en cas de problème
    console.error('Erreur lors de la création de l\'utilisateur admin:', error);
  } finally {
    // Fermer l'interface readline pour terminer proprement le script
    rl.close();
  }
})();
