const express = require("express");

const authRoute = require("./auth.route");
const uploadRoute = require("./upload.route");
const adminRoute = require("./admin.route");
const userRoute = require("./user.route");
const movieRoute = require("./movie.route");
const categoryRoute = require("./category.route");

const routes = express.Router();

routes.use("/auth", authRoute);
routes.use("/upload", uploadRoute);
routes.use("/users", userRoute);
routes.use("/admin", adminRoute);
routes.use("/movies", movieRoute);
routes.use("/categories", categoryRoute);

module.exports = routes;
