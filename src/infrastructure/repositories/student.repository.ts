import { IStudentDataSource, IStudentRepository, OptionalStudentDto, StudentDto, StudentEntity } from '../../domain';


export class StudentRepository implements IStudentDataSource {

    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}
    
    register(stundetDto: StudentDto): Promise<StudentEntity> {
        return this.studentRepository.register(stundetDto);
    }

    update(optionalStudentDto: OptionalStudentDto): Promise<number[]> {
       return this.studentRepository.update(optionalStudentDto);
    }

}