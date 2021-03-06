const User = require('../models/User.model');

const indexGet = async (req, res, next) => {

  try {
    const user = await User.find();
    return res.json(user);

  } catch (error) {

    return next(error);
  }
};

const userGet = async (req, res, next) => {

  const { id } = req.user

  try {

    const user = await User.findById(id);

    const fecha = new Date(user.birthDay);
    const date = fecha.toLocaleDateString();

    user.birthDay = date;

    console.log('La fecha buena --->', date);
    console.log('La fecha mala ---->', user.birthDay);

    return res.render( "./user", { user, title: req.user, isAuthenticated: req.isAuthenticated(), user: req.user });

  } catch (error) {

    return next(error);
  }
};

const editPost = async (req, res, next) => {

    try {
        
        const { id, name, surname, nick, email, password, birthDay } = req.body;

        const update = {};

        if (name) update.name = name;
        if (surname) update.surname = surname;
        if (nick) update.nick = nick;
        if (email) update.email = email;
        if (password) update.password = password;
        if (birthDay) update.birthDay = birthDay;
        update.avatar = req.fileUrl; // Descubir porque el file no entra en el req.body
        
        const updateUser = await User.findByIdAndUpdate(id, update, { new: true });
        
        return res.redirect(`/users/user/${id}`);

      } catch (error) {
        return next(error);
      }
};

const deletePost = async (req, res, next) => {

    const { id } = req.params;
  
    try {
      const deleted = await Todo.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.json("El elemento que querías borrar no existe");
      } else {
        return res.redirect("/");
      }
  
    } catch (error) {
      return next(error);
    }
  }

module.exports = { indexGet, userGet, editPost, deletePost }
