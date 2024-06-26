import { PracticeApplicationEntity } from '../practices';

export class StudentEntity {
   
    constructor(
        public id: number,
        public cedula: string,
        public firstName: string,
        public secondName: string,
        public lastName: string,
        public middleName: string,
        public birthDate: Date | string,
        public placeOfBirth: string,
        public martialStatus: string,
        public address: string,
        public phone: string,
        public eps: string,
        public email: string,
        public city: string,
        public userId?: number,
        public practiceId?: string,
        public program?: string,
        public modality?: string,
        public practiceApplication?: PracticeApplicationEntity
    ) {}
}