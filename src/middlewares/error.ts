import { NextFunction, Request, Response } from 'express';
import { BaseError, InternalServerError, BadRequest } from '@exceptions';

const errorHandler = (
    error: BaseError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    let errorDetail = error;
    let errors;

    if (error instanceof BadRequest) {
        errors = error.errors;
    }

    if (!error.code || typeof error.code === 'string' || error.name === 'Error') {
        console.error(error.stack)

        errorDetail = new InternalServerError(
            'Sorry!, we cannot process your request now'
        );
    }

    res
        .status(errorDetail.code)
        .json({ status: 'fail', message: errorDetail.message, errors });
};

export default errorHandler;