import express, { Express } from "express";
import { notFound, errorHandler } from "../middleware/errorhandler";

import getpaper from "../routes/get/getpaper"
import postquestions from "../routes/post/postquestions"

export const use = (app: Express) => {
    app.use(express.Router());
    app.use(require('morgan')("dev"))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    app.use("/", getpaper)
    app.use("/", postquestions)
    app.use(notFound) // handle undefined routes
    app.use(errorHandler) // error handling middleware
}