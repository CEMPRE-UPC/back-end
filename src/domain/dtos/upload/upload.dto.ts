import { FileUpload } from '../../types';


export class UploadDto {
   
    constructor(
        public readonly cedula: string,
        public readonly table: string,
        public readonly file: FileUpload,
        public readonly studentId: string,
    ) {}

    static create(body: {[key: string]: any}, file: FileUpload): [string?, UploadDto?] {

        const { studentId, cedula, table } = body;

        if (!cedula) return ['cedula is required'];
        if (!table) return ['table is required'];
        if (!file) return ['file is required'];
        if (!studentId) return ['studentId is required'];

        return [undefined, new UploadDto(cedula, table, file, studentId)];
    }

    
}