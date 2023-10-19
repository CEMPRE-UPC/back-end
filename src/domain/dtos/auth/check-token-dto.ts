export class CheckTokenDto {

    static create(authorization: string | undefined): [string?, string?] {

        if(!authorization) return ['Authorization header is required'];
        if (!authorization.startsWith('Bearer ')) return ['Invalid Bearer token'];

        const token = authorization.split(' ').at(1) || '';

        return [undefined, token];
    }
}