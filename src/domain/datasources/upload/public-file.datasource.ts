import { ShowFileDto, PublicFileDto , ShowFileByTypeDto} from '../../dtos';
import { PublicFileEntity } from '../../entities';


export interface IPublicFileDataSource {
    register(publicFileDto: PublicFileDto): Promise<boolean>

    getFiles(): Promise<PublicFileEntity[]>

    getFile(showFileDto: ShowFileDto): Promise<string>
    
    getFileByType(showFileByTypeDto: ShowFileByTypeDto): Promise<string>

    updateFile(publicFileDto:PublicFileDto): Promise<boolean>
}