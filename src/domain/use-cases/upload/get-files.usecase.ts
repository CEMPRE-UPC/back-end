import { AttachedFileEntity, } from '../../entities';
import { IUploadRepository } from '../../repositories';


interface IUploadUseCase {
    execute(studentId: string): Promise<AttachedFileEntity[]>;
}

export class GetFilesByIdUseCase implements IUploadUseCase {
    
    constructor(
        private readonly uploadRepository: IUploadRepository
    ) {}
    
    async execute(studentId: string): Promise<AttachedFileEntity[]> {

        if (!studentId) throw new Error("Id is required");
        
        return  await this.uploadRepository.getFilesByStudentId(studentId);
    }
}