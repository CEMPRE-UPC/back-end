import { UploadDto } from '../../dtos';
import { IUploadRepository } from '../../repositories';


interface ISaveFileUseCase {
    execute(uploadDto: UploadDto): Promise<boolean>
}


export class SaveFileUseCase implements ISaveFileUseCase {

    constructor(
        private readonly uploadRepository: IUploadRepository
    ) {}

    async execute(uploadDto: UploadDto): Promise<boolean> {
        return await this.uploadRepository.uploadFile(uploadDto);
    }
}