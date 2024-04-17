import { PracticeApplicationEvents, PracticeApplicationStatus } from '../../types/practices';



export class OptionalPracticeApplicationDto {

    constructor(
        public id: string,
        public identificationFile: boolean,
        public photoFile: boolean,
        public classScheduleFile: boolean,
        public epsFile: boolean,
        public graduationCertificateFile: boolean,
        public companyRequestLetterFile: boolean,
        public statusCempre: string,
        public statusProgram: string,
        public statusFaculty: string,
        public event: string,
        public observation: string,
        public studentId: string,
    ) { }



    static create(body: { [key: string]: any }, id: string): [string?, OptionalPracticeApplicationDto?] {
        const { studentId } = body;

        if (!studentId) return ['studentId is required'];
        if (!id) return ['id is required'];

        const identificationFile = body.identificationFile || false;
        const photoFile = body.photoFile || false;
        const classScheduleFile = body.classScheduleFile || false;
        const epsFile = body.epsFile || false;
        const graduationCertificateFile = body.graduationCertificateFile || false;
        const companyRequestLetterFile = body.companyRequestLetterFile || false;
        const statusCempre = body.statusCempre || undefined;
        const statusProgram = body.statusProgram || undefined;
        const statusFaculty = body.statusFaculty || undefined;
        const observation = body.observation || undefined;

        const event = body.event || undefined;

        if (statusCempre) {
            if (!Object.values(PracticeApplicationStatus).includes(statusCempre)) return ['status cempre is invalid'];
        }

        if (statusProgram) {
            if (!Object.values(PracticeApplicationStatus).includes(statusProgram)) return ['status program is invalid'];
        }

        if (statusFaculty) {
            if (!Object.values(PracticeApplicationStatus).includes(statusFaculty)) return ['status faculty is invalid'];
        }

        if (event) {
            if (!Object.values(PracticeApplicationEvents).includes(event)) return ['event is invalid'];
        }

        return [undefined, new OptionalPracticeApplicationDto(id, identificationFile, photoFile, classScheduleFile, epsFile, graduationCertificateFile, companyRequestLetterFile, statusCempre, statusProgram, statusFaculty, event, observation, studentId)];
    }
}