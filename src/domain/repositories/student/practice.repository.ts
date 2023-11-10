import { PracticeEntity } from '../../entities';


export interface IPracticeRepository {

    getPracticeById( id: string ): Promise<PracticeEntity | null>;

    getAllPractices(): Promise<PracticeEntity[] | null>;


}