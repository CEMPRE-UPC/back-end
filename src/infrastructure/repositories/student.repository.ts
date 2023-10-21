import { IStudentDataSource, IStudentRepository, OptionalStudentDto, StudentDto, StudentEntity } from '../../domain';


export class StudentRepository implements IStudentRepository {

    constructor(
        private readonly studentDataSource: IStudentDataSource
    ) {}
    
    register(stundetDto: StudentDto): Promise<StudentEntity> {
        return this.studentDataSource.register(stundetDto);
    }

    update(optionalStudentDto: OptionalStudentDto): Promise<number[]> {
       return this.studentDataSource.update(optionalStudentDto);
    }

}