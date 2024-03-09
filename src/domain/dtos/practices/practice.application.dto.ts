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

        const identificationFile = body.identificationFile || undefined;
        const photoFile = body.photoFile || undefined;
        const classScheduleFile = body.classScheduleFile || undefined;
        const epsFile = body.epsFile || undefined;
        const graduationCertificateFile = body.graduationCertificateFile || undefined;
        const companyRequestLetterFile = body.companyRequestLetterFile || undefined;
        const status = body.status || undefined;
        const observation = body.observation || undefined;

        if(status) {
            if(!Object.values(PracticeApplicationStatus).includes(status)) return ['status is invalid'];
        }

        return [undefined, new OptionalPracticeApplicationDto(id, identificationFile, photoFile, classScheduleFile, epsFile, graduationCertificateFile, companyRequestLetterFile, status, observation, studentId)];
    }
}