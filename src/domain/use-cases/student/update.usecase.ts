import { OptionalStudentDto } from '../../dtos';
import { StudentEntity } from '../../entities';
import { IStudentRepository } from '../../repositories';


interface IUpdateStudentUseCase {
    execute(optionalStudentDto: OptionalStudentDto): Promise<number[]>;
}

export class UpdateStudentUseCase implements IUpdateStudentUseCase {
    
    constructor(
        private readonly studentRepository: IStudentRepository
    ) { }

    async execute(optionalStudentDto: OptionalStudentDto): Promise<number[]> {
        return await this.studentRepository.update(optionalStudentDto);
    }
}