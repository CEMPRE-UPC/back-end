import { FileUpload, TypeFile, TypeTable } from '../../types';
export class UploadDto {
   
    constructor(
        public readonly cedula: string,
        public readonly table: string,
        public readonly file: FileUpload,
        public readonly typeFile: TypeFile,
        public readonly studentId: string,
    ) {}

    static create(body: {[key: string]: any}, file: FileUpload): [string?, UploadDto?] {

        const { studentId, cedula, table, typeFile } = body;

        console.log(file);
        

        if (!cedula) return ['cedula is required'];
        if (!table) return ['table is required'];
        if (!file) return ['file is required'];
        if (!studentId) return ['studentId is required'];
        if (!typeFile) return ['typeFile is required'];
        // validate typeFile
        if (!Object.values(TypeFile).includes(typeFile)) return ['typeFile is invalid'];
        if (!Object.values(TypeTable).includes(table)) return ['table is invalid'];

        return [undefined, new UploadDto(cedula, table, file, typeFile, studentId)];
    }

    
}