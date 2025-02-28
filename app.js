// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import session from 'express-session';
// import passport from 'passport';
// import initialize from './config/passport.js';
// import flash from 'connect-flash';
// import router from './src/router/router.js';
// import expressSanitizer from 'express-sanitizer';
// import helmet from 'helmet'; // Ajout de Helmet pour la sécurité

// dotenv.config();

// // On configure express
// const app = express();
// // Soit le port est configuré dans le fichier .env soit il utilisera le port 3000 par défaut
// const PORT = process.env.PORT || 3002;

// // Configure Express to use EJS as templating engine
// app.set('view engine', 'ejs');
// app.set('views', './src/views');

// // On dirige les routes de fichiers statiques dans public
// app.use(express.static('./public'));

// // Configuration CORS appliquée à toutes les requêtes
// app.use(cors({
//   origin: 'http://localhost:3002',  // Autorise seulement les requêtes de cette origine
//   methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
//   allowedHeaders: ['Content-Type', 'Authorization']  // En-têtes autorisés
// }));

// // Middleware pour req.body
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(expressSanitizer());

// //  Helmet pour configurer la CSP
// // app.use(
// //   helmet.contentSecurityPolicy({
// //     directives: {
// //       defaultSrc: ["'self'"],
// //       scriptSrc: ["'self'", "https://unpkg.com", "https://js.stripe.com", "https://ajax.googleapis.com", "https://maxcdn.bootstrapcdn.com"],
// //       styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://unpkg.com", "https://maxcdn.bootstrapcdn.com"],
// //       imgSrc: ["'self'", "https://res.cloudinary.com", "data:"],
// //       fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com", "https://maxcdn.bootstrapcdn.com"],
// //       connectSrc: ["'self'"],
// //       objectSrc: ["'none'"],
// //       frameSrc: ["https://js.stripe.com"]
// //     },
// //   })
// // );

// // Configure express-session middleware
// app.use(session({
//   secret: process.env.SECRET_POUR_EXPRESS_SESSION,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 36000000, // Durée de vie du cookie de session (1 heure ici)
//     secure: app.get('env') === 'production'
//   }
// }));

// app.use(flash());

// initialize(passport);
// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Initialiser le panier si absent
// app.use((req, res, next) => {
//   if (!req.session.cart) {
//     req.session.cart = JSON.stringify([]);
//   }
//   next();
// });

// // Ajouter le logger de session
// app.use((req, res, next) => {
//   console.log('Session before handling request:', req.session);
//   next();
// });

// // Routes principales
// app.use(router);
// // export default app;
// // On écoute sur le port configuré
// app.listen(PORT, () => console.log(`Le serveur est lancé et écoute sur le port : http://localhost:${PORT}`));
