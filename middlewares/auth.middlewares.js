const isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    // Si no está autenticado redirige a login
    return res.redirect('/');
  };

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated()) {
        if(req.user.role === "admin") {
            return next();
        }
        return res.status(403).json('No tienes permisos');
    } else {
        return res.status(401).json('[Código rojo!] No estás autorizado');
    };
};

module.exports = { isAuth, isAdmin };