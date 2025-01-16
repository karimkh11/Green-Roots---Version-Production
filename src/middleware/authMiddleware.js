

export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  if (req.user.role === 'admin') {
    res.redirect('/admin');
  } else if (req.user.role === 'user') {
    next(); // Passez au middleware ou route suivant
  } else {
    // Rediriger vers une page par défaut ou afficher une erreur
    req.flash('error', 'Rôle non reconnu ou non autorisé');
    res.redirect('/');
  }
};

export const isAdmin = (req, res, next) => {
  // Assurez-vous que l'utilisateur est connecté
  if (!req.isAuthenticated()) {
    req.flash('error', 'Vous devez être connecté pour accéder à cette ressource.');
    return res.redirect('/login');  // Redirection vers la page de connexion au lieu de '/admin'
  }

  // Vérifiez si l'utilisateur est un administrateur
  if (req.user && req.user.role === 'admin') {
    next(); // Passez au middleware ou route suivant
  } else {
    req.flash('error', 'Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
    res.redirect('/'); // Redirigez l'utilisateur vers la page d'accueil ou une page d'erreur
  }
};
