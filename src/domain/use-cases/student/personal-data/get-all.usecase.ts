import { StudentEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { IStudentRepository } from '../../../repositories';


interface IGetAllStudentsUseCase {
    execute(modality: string): Promise<StudentEntity[] | null>;
}

export class GetAllStudentsUseCase implements IGetAllStudentsUseCase {

    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}

    async execute(modality: string): Promise<StudentEntity[] | null> {

        if (!modality) throw CustomError.badRequest('Missing modality');
        
        return await this.studentRepository.getAllStudents(modality);
    }

}