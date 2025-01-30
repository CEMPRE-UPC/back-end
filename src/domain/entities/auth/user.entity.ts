import { RoleEntity } from './role.entity';


export class UserEntity {
   
    constructor(
        public id: number,
        public email: string,
        public password: string,
        public isActive: boolean,
        public name?: string,
        public role?: RoleEntity
    ){}
}