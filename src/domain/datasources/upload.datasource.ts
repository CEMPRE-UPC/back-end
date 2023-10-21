import { UploadDto } from '../dtos';


export interface IUploadDataSource {
    uploadFile(uploadDto: UploadDto): Promise<boolean>
}