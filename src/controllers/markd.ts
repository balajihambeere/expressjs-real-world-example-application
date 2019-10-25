import { Request, Response, NextFunction } from "express";
import * as filesystem from "../util/filesystem";

export let getMarkDown = (req: Request, res: Response, next: NextFunction) => {
    res.render("testmd", {
        title: "test markdown",
        content: filesystem.readFile("./data_base/1-0-why-this-course.md", undefined)
    });
};

export let startTest = (req: Request, res: Response, next: NextFunction) => {
    // res.set("Content-Type", "text/html");
    // res.send(markdownHandler.markdown("./data_base/1-0-why-this-course.md"));
    res.send(filesystem.readFile("./data_base/1-0-why-this-course.md", undefined));
};
