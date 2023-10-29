import { OptionalStudentDto, StudentDto } from '../dtos';
import { StudentEntity } from '../entities';


export interface IStudentRepository {

    register( stundetDto: StudentDto ): Promise<StudentEntity>;

    update( optionalStudentDto: OptionalStudentDto ): Promise<number[]>;

    getStudentByIdAndCedula(id: string, cedula: string): Promise<StudentEntity | null>;

    getStudentByIdUser( id: string ): Promise<StudentEntity | null>;


}