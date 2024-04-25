import { FileUpload, PublicTypeFile, TypeTable } from '../../types';
export class PublicFileDto {
   
    constructor(
        public readonly table: TypeTable,
        public readonly file: FileUpload,
        public readonly typeFile: PublicTypeFile,
    ) {}

    static create(body: {[key: string]: any}, file: FileUpload): [string?, PublicFileDto?] {

        const { table, typeFile } = body;

        if (!table) return ['table is required'];
        if (!file) return ['file is required'];
        if (!typeFile) return ['typeFile is required'];
        // validate typeFile
        if (!Object.values(PublicTypeFile).includes(typeFile)) return ['typeFile is invalid'];
        if (!Object.values(TypeTable).includes(table)) return ['table is invalid'];

        return [undefined, new PublicFileDto(table, file, typeFile)];
    }
    
}
