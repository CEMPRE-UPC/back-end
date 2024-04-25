import { PublicFileEntity, IPublicFileRepository, ShowFileDto, PublicFileDto, IPublicFileDataSource, ShowFileByTypeDto } from '../../../domain';


export class PublicFileRepository implements IPublicFileRepository {

    constructor(
        private readonly publicFileDatasource: IPublicFileDataSource
    ) {}
    register(publicFileDto: PublicFileDto): Promise<boolean> {
        return this.publicFileDatasource.register(publicFileDto);
    }
    getFiles(): Promise<PublicFileEntity[]> {
        return this.publicFileDatasource.getFiles();
    }
    getFile(showFileDto: ShowFileDto): Promise<string> {
        return this.publicFileDatasource.getFile(showFileDto);
    }

    getFileByType(showFileByTypeDtoDto: ShowFileByTypeDto): Promise<string> {
        return this.publicFileDatasource.getFileByType(showFileByTypeDtoDto);
    }

    updateFile(publicFileDto: PublicFileDto): Promise<boolean> {
        return this.publicFileDatasource.updateFile(publicFileDto);
    }
    
   
}