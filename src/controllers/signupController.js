
import {User, Tree} from '../models/index.js';
import bcrypt from 'bcrypt';
import PasswordValidator from 'password-validator';
import validator from 'validator';


export const getSignup = (req, res) => {
    const user = req.user;
    const title = 'Inscription'; // Définir la variable title
    const errors = req.flash('errors');
    res.render('register', { title: title, errors: errors, user: user}); // Transmettre les variables title et errors à la vue
};

export const postSignup = async (req, res, next) => {
    try {
        // Vérifier si l'email est valide
        if (!validator.isEmail(req.body.email)) {
            throw new Error('Adresse e-mail invalide');
        }

        // Créer un nouveau validateur de mot de passe
        const schema = new PasswordValidator();

        // Définir les critères du mot de passe
        schema
            .is().min(12) // Minimum 12 caractères
            .has().uppercase() // Au moins une lettre majuscule
            .has().digits() // Au moins un chiffre
            .has().symbols(); // Au moins un caractère spécial

        // Valider le mot de passe
        if (!schema.validate(req.body.password)) {
            throw new Error('Le mot de passe doit contenir au moins 12 caractères avec au moins une lettre majuscule, un chiffre et un caractère spécial');
        }
        // Créer un nouvel utilisateur
        const newUser = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            telephone: req.body.telephone,
            birthday: req.body.birthday,
            locality: req.body.locality,
            role: req.body.role,
            createdAt: new Date(), // Utilisez created_at au lieu de createdAt
            updatedAt: null
        });

        res.redirect('/login');

    } catch (error) {
        // Transmettre l'erreur à la vue lors du rendu
        const user = req.user;
        const title = 'Inscription';
        const errors = [error.message]; // Placer l'erreur dans un tableau pour le rendre compatible avec les variables déjà utilisées dans le rendu
        res.render('register', { title: title, errors: errors, user: user });
    }

    console.log('Fin de la fonction postSignup');

};
