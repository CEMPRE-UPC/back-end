import { IUploadDataSource, IUploadRepository, UploadDto } from '../../domain';



export class UploadRepository implements IUploadRepository {

    constructor(
        private readonly uploadDatasource: IUploadDataSource
    ) {}

    uploadFile(uploadDto: UploadDto): Promise<boolean> {
        return this.uploadDatasource.uploadFile(uploadDto);
    }

}