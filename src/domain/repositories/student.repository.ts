import { OptionalStudentDto, StudentDto } from '../dtos';
import { StudentEntity } from '../entities';


export interface IStudentRepository {

    register( stundetDto: StudentDto ): Promise<StudentEntity>;

    update( optionalStudentDto: OptionalStudentDto ): Promise<number[]>;
}