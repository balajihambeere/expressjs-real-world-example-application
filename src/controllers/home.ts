import { Request, Response, NextFunction } from "express";
import * as filesystem from "../util/filesystem";

export let index = (req: Request, res: Response, next: NextFunction) => {
  res.render("home", {
    title: "wishtara",
    menuItems: filesystem.readJSONFile("./data_base/category.json", undefined),
    courses: filesystem.readJSONFile("./data_base/courses.json", undefined)
  });
};

export let category = (req: Request, res: Response, next: NextFunction) => {
  const result = filesystem.readJSONFile("./data_base/courses.json", undefined);
  res.render("home", {
    title: "wishtara",
    menuItems: filesystem.readJSONFile("./data_base/category.json", undefined),
    courses: result.filter((x: any) => x.category === req.params.category)
  });
};
