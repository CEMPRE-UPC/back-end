import { IStudentDataSource, IStudentRepository, OptionalStudentDto, StudentDto, StudentEntity } from '../../../domain';


export class StudentRepository implements IStudentRepository {

    constructor(
        private readonly studentDataSource: IStudentDataSource
    ) {}
    
    register(stundetDto: StudentDto): Promise<StudentEntity> {
        return this.studentDataSource.register(stundetDto);
    }
    
    update(optionalStudentDto: OptionalStudentDto): Promise<boolean> {
        return this.studentDataSource.update(optionalStudentDto);
    }

    getStudentByCedula(cedula: string): Promise<StudentEntity | null> {
        return this.studentDataSource.getStudentByCedula(cedula);
    }
    
    getStudentByIdUser(id: string): Promise<StudentEntity | null> {
        return this.studentDataSource.getStudentByIdUser(id);
    }

    getAllStudents(modality?: string, program?: string): Promise<StudentEntity[] | null> {
        return this.studentDataSource.getAllStudents(modality, program);
    }

    delete(id: string): Promise<boolean> {
        return this.studentDataSource.delete(id);
    }
    
}