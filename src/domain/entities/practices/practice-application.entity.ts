import { PracticeApplicationStatus, PracticeApplicationEvents } from '../../types/practices';



export class PracticeApplicationEntity {

    constructor(
        
        public id: string,
        public identificationFile: boolean,
        public photoFile: boolean,
        public classScheduleFile: boolean,
        public epsFile: boolean,
        public graduationCertificateFile: boolean,
        public companyRequestLetterFile: boolean,
        public event: PracticeApplicationEvents,
        public statusCempre: PracticeApplicationStatus,
        public statusProgram: PracticeApplicationStatus,
        public statusFaculty: PracticeApplicationStatus,
        public observation: string,
        public createdAt: Date,
        public updatedAt: Date,
        public studentId: number,
    ) {}
}