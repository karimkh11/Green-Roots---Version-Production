import passport from 'passport';

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'user') {
    return next();
  } else {
      res.redirect('/login');
  }
};

export const isAdmin = (req, res, next) =>{
  // Assurez-vous que l'utilisateur est connecté
  if (!req.isAuthenticated()) {
    req.flash('error', 'Vous devez être connecté pour accéder à cette ressource.');
    return res.redirect('/admin');
  }

  // Vérifiez si l'utilisateur est un administrateur
  if (req.user && req.user.role === 'admin') {
    next(); // Passez au middleware ou route suivant
  } else {
    req.flash('error', 'Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
    res.redirect('/'); // Redirigez l'utilisateur vers la page d'accueil ou une page d'erreur
  }
}
