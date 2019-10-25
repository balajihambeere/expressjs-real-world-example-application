import { Request, Response } from "express";
import * as filesystem from "../util/filesystem";

export let index = (req: Request, res: Response) => {
  res.render("blog/blogs", {
    title: "blogs",
    menuItems: filesystem.readJSONFile("./data_base/category.json", undefined),
  });
};
