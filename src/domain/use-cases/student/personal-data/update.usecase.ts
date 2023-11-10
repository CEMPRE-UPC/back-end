import { OptionalStudentDto } from '../../../dtos';
import { IStudentRepository } from '../../../repositories';


interface IUpdateStudentUseCase {
    execute(optionalStudentDto: OptionalStudentDto): Promise<boolean>;
}

export class UpdateStudentUseCase implements IUpdateStudentUseCase {
    
    constructor(
        private readonly studentRepository: IStudentRepository
    ) { }

    async execute(optionalStudentDto: OptionalStudentDto): Promise<boolean> {
        return await this.studentRepository.update(optionalStudentDto);
    }
}