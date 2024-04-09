import { OptionalStudentDto, StudentDto } from '../../dtos';
import { StudentEntity } from '../../entities';


export interface IStudentRepository {

    register( stundetDto: StudentDto ): Promise<StudentEntity>;

    update( optStudentDto: OptionalStudentDto ): Promise<boolean>;

    getStudentByCedula(cedula: string): Promise<StudentEntity | null>;

    getStudentByIdUser( id: string ): Promise<StudentEntity | null>;

    getAllStudents(modality?: string, program?: string): Promise<StudentEntity[] | null>;

    delete(id: string): Promise<boolean>

}