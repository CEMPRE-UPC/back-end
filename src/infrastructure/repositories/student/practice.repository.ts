import { IPracticeDataSource, IPracticeRepository, PracticeEntity } from '../../../domain';


export class PracticeRepository implements IPracticeRepository {


    constructor(
        private readonly practiceDatasource: IPracticeDataSource
    ) { }
    
    getPracticeById( id: string ): Promise<PracticeEntity | null> {
        return this.practiceDatasource.getPracticeById(id);
    }

    getAllPractices(): Promise<PracticeEntity[] | null> {
        return this.practiceDatasource.getAllPractices();
    }

    delete(id: string): Promise<boolean> {
        return this.practiceDatasource.delete(id);
    }

}