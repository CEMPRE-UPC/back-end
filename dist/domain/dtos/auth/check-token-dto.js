"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckTokenDto = void 0;
class CheckTokenDto {
    static create(authorization) {
        if (!authorization)
            return ['Authorization header is required'];
        if (!authorization.startsWith('Bearer '))
            return ['Invalid Bearer token'];
        const token = authorization.split(' ').at(1) || '';
        return [undefined, token];
    }
}
exports.CheckTokenDto = CheckTokenDto;
