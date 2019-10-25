import express from "express";
import compression from "compression";
import path from "path";
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import lusca from "lusca";

const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

import * as homeController from "./controllers/home";
import * as blogController from "./controllers/blog";
import * as courseController from "./controllers/course";


app.get("/", homeController.index);
app.get("/b(lo)?g", blogController.index);
app.get("/:category", homeController.category);
app.get("/:category/:slug", courseController.index);
app.get("/:category/:id/:slug", courseController.start);
app.get("/:category/topic/:id/:slug", courseController.startTopic);


// Test API
// import * as markdownController from "./controllers/markd";
// app.get("/marked", markdownController.getMarkDown);
// app.get("/test/:slug", courseController.test);
export default app;