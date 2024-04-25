import { ShowFileByTypeDto, ShowFileDto } from '../../../dtos';
import { IPublicFileRepository } from '../../../repositories';


interface IGetPublicFileUseCase {
    execute(showFileDto: ShowFileDto): Promise<string>;
}
interface IGetPublicFileByTypeUseCase {
    execute(showFileByTypeDto: ShowFileByTypeDto): Promise<string>;
}

export class GetPublicFileUseCase implements IGetPublicFileUseCase {

    constructor(
        private readonly publicFileRepository: IPublicFileRepository
    ) { }

    async execute(showFileDto: ShowFileDto): Promise<string> {
        return await this.publicFileRepository.getFile(showFileDto);
    }

}


export class GetPublicFileByTypeUseCase implements IGetPublicFileByTypeUseCase {

    constructor(
        private readonly publicFileRepository: IPublicFileRepository
    ) { }


    async execute(showFileByTypeDto: ShowFileByTypeDto): Promise<string> {
        return await this.publicFileRepository.getFileByType(showFileByTypeDto);
    }

}