
export class RoleDto {

    constructor(
        public id: number,
        public name: string,
    ){}

    static create(body: {[key: string]: any }): [string?, RoleDto?] {
        const { id, name } = body;

        if (!id) return ['Missing id'];
        if (!name) return ['Role is required'];

        return [undefined, new RoleDto(id, name)];
    }
}