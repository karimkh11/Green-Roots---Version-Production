// ON charge express et le router
import express from 'express';
import dotenv  from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import { v2 as cloudinary } from 'cloudinary';
import passport from 'passport';
import initialize from './config/passport.js';
import flash from 'connect-flash';
import router from './src/router/router.js';

dotenv.config();

// Récupérer les valeurs des variables d'environnement depuis le fichier .env
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({ 
  cloud_name: cloudinaryCloudName, 
  api_key: cloudinaryApiKey, 
  api_secret: cloudinaryApiSecret 
});


//on configure express
const app = express();
//SOit le port est configuré dans le fichier .env soit il utilisera le port 3000 par defaut
const PORT = process.env.PORT || 3002;



// Configure Express to use EJS as templating engine
app.set('view engine', 'ejs')
app.set('views', './src/views');

//ON dirige les routes de fichiers statiques dans public
app.use(express.static('./public'));
// Configuration CORS appliquée à toutes les requêtes
app.use(cors({
  origin: 'http://localhost:3002',  // Autorise seulement les requêtes de cette origine
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization']  // En-têtes autorisés
}));

// Ce middleware permet d'accéder a req.body dans les controller liés à des route utilisant la méthdoe post
app.use(express.urlencoded({extended: true}));
app.use(express.json());



// Configure express-session middleware
app.use(session({
    secret: 'arbre',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 36000000, // Durée de vie du cookie de session (1 heure ici)
       secure: false }
  }));
  app.use(flash());

  initialize(passport);
  // Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ON envoi toutes nos requêtes dans un router qui s'occupera de leurs dire quoi faire
app.use((req, res, next) => {
  console.log('Session before handling request:', req.session);
  next();
});
app.use((req, res, next) => {
  if (!req.session.cart) {
      req.session.cart = JSON.stringify([]);
  }
  next();
});

app.use((req, res, next) => {
  res.on('finish', () => {
      console.log('Session after handling request:', req.session);
  });
  next();
});

app.use(router);


//on écoute sur le port configuré
app.listen(PORT, () => console.log(`Le serveur est lancé et écoute sur le port : http://localhost:${PORT}`));
