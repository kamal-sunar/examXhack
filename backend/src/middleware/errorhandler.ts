import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode=500, isOperational=true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500; // default 500
    const message = err.message || "Something went wrong"

    res.status(statusCode).json({
        status: "error",
        message,
        details: err.isOperational ? undefined : "Internal server error",
    })

    if (!err.isOperational) {
        console.error("Unexpected error: ", err); // log unexpected error for debugging
    }
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: "error",
        message: `Cannot find ${req.originalUrl}, on this server`,
    })
}