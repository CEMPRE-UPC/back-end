import { PublicFileEntity, } from '../../../entities';
import { IPublicFileRepository } from '../../../repositories';


interface IGetPublicFilesCase {
    execute(): Promise<PublicFileEntity[]>;
}

export class GetPublicFilesUseCase implements IGetPublicFilesCase {
    
    constructor(
        private readonly publicFileRepository: IPublicFileRepository
    ) {}
    
    async execute(): Promise<PublicFileEntity[]> {

        return  await this.publicFileRepository.getFiles();
    }
}