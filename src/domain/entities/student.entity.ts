import { UserEntity } from './user.entity';

export class StudentEntity {
   
    constructor(
        public id: number,
        public cedula: string,
        public firstName: string,
        public lastName: string,
        public middleName: string,
        public birthDate: Date,
        public placeOfBirth: string,
        public martialStatus: string,
        public program: string,
        public address: string,
        public phone: string,
        public eps: string,
        public email: string,
        public city: string,
        public secondName?: string,
        public user?: UserEntity 
    ) {}
}