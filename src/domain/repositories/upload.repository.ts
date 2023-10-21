import { UploadDto } from '../dtos';


export interface IUploadRepository {
    uploadFile(uploadDto: UploadDto): Promise<boolean>

}