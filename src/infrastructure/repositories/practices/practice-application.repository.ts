import { IPracticeApplicationDataSource, IPracticeApplicationRepository, OptionalPracticeApplicationDto, PracticeApplicationEntity } from '../../../domain';



export class PracticeApplicationRepository implements IPracticeApplicationRepository {

    constructor(
        private readonly practiceApplication: IPracticeApplicationDataSource
    ) {}
    register(studentId: number): Promise<PracticeApplicationEntity> {
        return this.practiceApplication.register(studentId);
    }
    update(optPracticeApplicationDto: OptionalPracticeApplicationDto): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getByIdStudent(studentId: number): Promise<PracticeApplicationEntity[] | null> {
        throw new Error('Method not implemented.');
    }
    getById(id: string): Promise<PracticeApplicationEntity | null> {
        throw new Error('Method not implemented.');
    }

   
}