import { StudentEntity } from '../../../entities';
import { IStudentRepository } from '../../../repositories';


interface IGetAllStudentsUseCase {
    execute(): Promise<StudentEntity[] | null>;
}

export class GetAllStudentsUseCase implements IGetAllStudentsUseCase {

    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}

    async execute(): Promise<StudentEntity[] | null> {

        return await this.studentRepository.getAllStudents();
    }

}