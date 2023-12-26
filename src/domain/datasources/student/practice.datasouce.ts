import { PracticeEntity } from '../../entities';

export interface IPracticeDataSource {

    getPracticeById( id: string ): Promise<PracticeEntity | null>;

    getAllPractices(): Promise<PracticeEntity[] | null>;

    delete(id: string): Promise<boolean>

}