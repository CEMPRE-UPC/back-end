import { UploadDto } from '../../dtos';
import { IUploadRepository } from '../../repositories';


interface IUpdateFileUseCase {
    execute(uploadDto: UploadDto): Promise<boolean>
}

export class UpdateFileUseCase implements IUpdateFileUseCase {

    constructor(
        private readonly uploadRepository: IUploadRepository
    ) {}

    async execute(uploadDto: UploadDto): Promise<boolean> {
        return await this.uploadRepository.updateFile(uploadDto);
    }
}