import { PracticeApplicationStatus } from '../../types/practices';



export class OptionalPracticeApplicationDto {

    constructor(
        public id: string,
        public identificationFile: boolean,
        public photoFile: boolean,
        public classScheduleFile: boolean,
        public epsFile: boolean,
        public graduationCertificateFile: boolean,
        public companyRequestLetterFile: boolean,
        public status: string,
        public observation: string,
        public studentId: string,
    ) { }



    static create (body: {[key: string]: any}, id: string): [string?, OptionalPracticeApplicationDto?] {
        const { studentId } = body;

        if(!studentId) return ['studentId is required'];
        if(!id) return ['id is required'];

        const identificationFile = body.identificationFile || false;
        const photoFile = body.photoFile || false;
        const classScheduleFile = body.classScheduleFile || false;
        const epsFile = body.epsFile || false;
        const graduationCertificateFile = body.graduationCertificateFile || false;
        const companyRequestLetterFile = body.companyRequestLetterFile || false;
        const status = body.status || undefined;
        const observation = body.observation || undefined;

        if(status) {
            if(!Object.values(PracticeApplicationStatus).includes(status)) return ['status is invalid'];
        }

        return [undefined, new OptionalPracticeApplicationDto(id, identificationFile, photoFile, classScheduleFile, epsFile, graduationCertificateFile, companyRequestLetterFile, status, observation, studentId)];
    }
}