import { OptionalStudentDto, StudentDto } from '../dtos';
import { StudentEntity } from '../entities';


export interface IStudentDataSource {

    register( stundetDto: StudentDto ): Promise<StudentEntity>;

    update( optionalStudentDto: OptionalStudentDto ): Promise<number[]>;

}