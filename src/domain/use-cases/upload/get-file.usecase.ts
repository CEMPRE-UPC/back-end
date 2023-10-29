import { ShowFileDto } from '../../dtos';
import { IUploadRepository } from '../../repositories';


interface IGetFileUseCase {
    execute(showFileDto: ShowFileDto): Promise<string>;
}

export class GetFileUseCase implements IGetFileUseCase {

    constructor(
        private readonly uploadRepository: IUploadRepository
    ) { }

    async execute(showFileDto: ShowFileDto): Promise<string> {
        return await this.uploadRepository.getFile(showFileDto);
    }

}