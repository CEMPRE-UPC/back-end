"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const domain_1 = require("../../domain");
const handleError = (error, res) => {
    if (error instanceof domain_1.CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
};
exports.handleError = handleError;
