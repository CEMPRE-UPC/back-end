import { PracticeDto } from '../../dtos';
import { PracticeEntity } from '../../entities';





export interface IPracticeDataSource {

    register( practiceDto: PracticeDto ): Promise<PracticeEntity>;

    update( practiceDto: PracticeDto ): Promise<boolean>;

    getByIdStudent( studentId: string ): Promise<PracticeEntity | null>;
}