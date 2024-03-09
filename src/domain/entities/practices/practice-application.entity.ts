import { PracticeApplicationStatus } from '../../types/practices';
import { StudentEntity } from '../student';



export class PracticeApplicationEntity {

    constructor(
        
        public id: string,
        public identificationFile: boolean,
        public photoFile: boolean,
        public classScheduleFile: boolean,
        public epsFile: boolean,
        public graduationCertificateFile: boolean,
        public companyRequestLetterFile: boolean,
        public status: PracticeApplicationStatus,
        public observation: string,
        public createdAt: Date,
        public updatedAt: Date,
        public studentId: number,
    ) {}
}