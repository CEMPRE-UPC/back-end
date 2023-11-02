import { IPracticeDataSource, IPracticeRepository, PracticeDto, PracticeEntity } from '../../../domain';


export class PracticeRepository implements IPracticeRepository {


    constructor(
        private readonly practiceDatasource: IPracticeDataSource
    ) { }

    register(practiceDto: PracticeDto): Promise<PracticeEntity> {
        return this.practiceDatasource.register(practiceDto);
    }
    update(practiceDto: PracticeDto): Promise<boolean> {
        return this.practiceDatasource.update(practiceDto);
    }
    getByIdStudent(studentId: string): Promise<PracticeEntity | null> {
        return this.practiceDatasource.getByIdStudent(studentId);
    }

}