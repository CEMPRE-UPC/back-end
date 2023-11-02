import { PracticeModality } from '../../../types/student';

export class PracticeDto {

    constructor(
        public modality: string,
        public studentId: string
    ) {}

    static create(body: {[key: string]: any }): [string?, PracticeDto?] {
        const { studentId, modality } = body;

        if (!studentId) return ['studentId is required'];

        if (!modality) return ['modality is required'];

        if (!Object.values(PracticeModality).includes(modality)) return ['modality is invalid'];  

        return [undefined, new PracticeDto(modality, studentId)];
    }
    
}