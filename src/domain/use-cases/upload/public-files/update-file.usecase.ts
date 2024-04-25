import { PublicFileDto } from '../../../dtos';
import { IPublicFileRepository } from '../../../repositories';


interface IUpdatePublicFileUseCase {
    execute(publicFileDto: PublicFileDto): Promise<boolean>
}

export class UpdatePublicFileUseCase implements IUpdatePublicFileUseCase {

    constructor(
        private readonly publicFileRepository: IPublicFileRepository
    ) {}

    async execute(publicFileDto: PublicFileDto): Promise<boolean> {
        return await this.publicFileRepository.updateFile(publicFileDto);
    }
}