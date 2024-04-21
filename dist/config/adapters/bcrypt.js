"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptAdapter = void 0;
const bcryptjs_1 = require("bcryptjs");
class BcryptAdapter {
    static hash(password) {
        return (0, bcryptjs_1.hashSync)(password);
    }
    static compare(password, hash) {
        return (0, bcryptjs_1.compareSync)(password, hash);
    }
}
exports.BcryptAdapter = BcryptAdapter;
