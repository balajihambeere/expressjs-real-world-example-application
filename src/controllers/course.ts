import { Request, Response, NextFunction } from "express";
import * as filesystem from "../util/filesystem";
import * as courseModel from "../models/course";

export let index = (req: Request, res: Response, next: NextFunction) => {
  res.render("course/details", {
    title: "courses-details",
    menuItems: filesystem.readJSONFile("./data_base/category.json", undefined),
    course: courseModel.loadCourseDetails(req.params.slug)
  });
};

export let start = (req: Request, res: Response, next: NextFunction) => {
  res.render("course/start", {
    title: "Get Started",
    visible: true,
    menuItems: filesystem.readJSONFile("./data_base/category.json", undefined),
    course: courseModel.loadCourseById(req.params.id)
  });
};


export let startTopic = (req: Request, res: Response, next: NextFunction) => {
  res.render("course/start", {
    title: "Get Started",
    visible: true,
    menuItems: filesystem.readJSONFile("./data_base/category.json", undefined),
    course: courseModel.loadCourseBySlug(req.params.id, req.params.slug)
  });
};

export let test = (req: Request, res: Response, next: NextFunction) => {
  res.send(courseModel.loadCourseDetails(req.params.slug));
};


