import { StudentDto } from '../../dtos';
import { StudentEntity } from '../../entities';
import { IStudentRepository } from '../../repositories';


interface IStudentUseCase {
    execute( studentDto: StudentDto ): Promise<StudentEntity>;
}

export class RegisterStudentUseCase implements IStudentUseCase {
    
    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}
    
    async execute(studentDto: StudentDto): Promise<StudentEntity> {
        
        return await this.studentRepository.register(studentDto);
        
    }

}