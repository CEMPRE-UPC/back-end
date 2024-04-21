"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeErrorMapper = void 0;
class SequelizeErrorMapper {
}
exports.SequelizeErrorMapper = SequelizeErrorMapper;
SequelizeErrorMapper.customErrorFromObject = (error) => {
    return error.errors.map((err) => {
        return { msg: err.message, field: err.path };
    });
};
