/* eslint-disable max-classes-per-file */

export class BaseError extends Error {
    // eslint-disable-next-line no-unused-vars
    constructor(public code: number, public message: string) {
        super(message);

        // restore prototype chain since we are extending the built-in Error class
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(404, message);
        this.name = NotFoundError.name;
    }
}

export class ConflictError extends BaseError {
    constructor(message: string) {
        super(409, message);
        this.name = ConflictError.name;
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message: string) {
        super(401, message);
        this.name = UnauthorizedError.name;
    }
}

export class ForbiddenError extends BaseError {
    constructor(message: string) {
        super(403, message);
        this.name = ForbiddenError.name;
    }
}

export class BadRequest extends BaseError {
    // eslint-disable-next-line no-unused-vars
    constructor(public errors: any) {
        super(400, 'Validation Error');
        this.name = BadRequest.name;
    }
}

export class InternalServerError extends BaseError {
    constructor(message: string) {
        super(500, message);
        this.name = InternalServerError.name;
    }
}
