// foi retirado do arquivo server.js a rota de usuario que agora se chama usersRoutes

// importa de express o *Router*
const { Router } = require("express");
const multer = require("multer");

const uploadConfig = require("../configs/upload");
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

userRoutes.post("/", usersController.create);
userRoutes.put("/", ensureAuthenticated, usersController.update);
// Nessa rota foi foi feita com o metodo patch porque será atualizado somente o avatar
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = userRoutes;