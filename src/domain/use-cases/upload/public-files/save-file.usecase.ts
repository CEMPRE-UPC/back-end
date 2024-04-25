import { PublicFileDto } from '../../../dtos';
import { IPublicFileRepository } from '../../../repositories';


interface ISavePublicFileUseCase {
    execute(publicFileDto: PublicFileDto): Promise<boolean>
}

export class SavePublicFileUseCase implements ISavePublicFileUseCase {

    constructor(
        private readonly publicFileRepository: IPublicFileRepository
    ) {}

    async execute(publicFileDto: PublicFileDto): Promise<boolean> {
        return await this.publicFileRepository.register(publicFileDto);
    }
}