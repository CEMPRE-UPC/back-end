"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDAdapter = void 0;
const uuid_1 = require("uuid");
class UUIDAdapter {
    static generate() {
        return (0, uuid_1.v4)();
    }
    // validate uuid is valid
    static isValid(uuid) {
        return (0, uuid_1.validate)(uuid);
    }
}
exports.UUIDAdapter = UUIDAdapter;
