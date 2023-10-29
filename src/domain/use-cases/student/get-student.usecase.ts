import { StudentEntity } from '../../entities';
import { IStudentRepository } from '../../repositories';


interface IStudentUseCase {
    execute(id: string): Promise<StudentEntity | null>;
}

export class GetStudentByIdUseCase implements IStudentUseCase {
    
    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}
    
    async execute(id: string): Promise<StudentEntity | null> {

        if (!id) throw new Error("Id is required");
        
        return  await this.studentRepository.getStudentByIdUser(id);
    }

}