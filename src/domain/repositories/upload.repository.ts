import { ShowFileDto, UploadDto } from '../dtos';
import { AttachedFileEntity } from '../entities';


export interface IUploadRepository {
    uploadFile(uploadDto: UploadDto): Promise<boolean>

    getFilesByStudentId(studentId: string): Promise<AttachedFileEntity[]>

    getFile(showFileDto: ShowFileDto): Promise<string>


}