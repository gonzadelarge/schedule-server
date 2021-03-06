const express = require('express');
const controller = require('../controllers/auth.controller');
const {isAuth} = require('../middlewares/auth.middlewares');


const router = express.Router();

router.get("/register", controller.registerGet);
router.post("/register", controller.registerPost);

router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);

router.post("/logout", controller.logoutPost);

module.exports = router;