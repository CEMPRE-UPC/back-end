import { AttachedFileEntity, IUploadDataSource, IUploadRepository, ShowFileDto, UploadDto } from '../../domain';


export class UploadRepository implements IUploadRepository {

    constructor(
        private readonly uploadDatasource: IUploadDataSource
    ) {}
    
    uploadFile(uploadDto: UploadDto): Promise<boolean> {
        return this.uploadDatasource.uploadFile(uploadDto);
    }
    
    getFilesByStudentId(studentId: string): Promise<AttachedFileEntity[]> {
        return this.uploadDatasource.getFilesByStudentId(studentId);
    }
    
    getFile(showFileDto: ShowFileDto): Promise<string> {
        return this.uploadDatasource.getFile(showFileDto);
    }

    updateFile(uploadDto: UploadDto): Promise<boolean> {
        return this.uploadDatasource.updateFile(uploadDto);
    }
}