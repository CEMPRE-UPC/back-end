import { PracticeEntity } from '../../../entities';
import { IPracticeRepository } from '../../../repositories';


interface IGetPracticeByIdUseCase {
    execute( studentId: string ): Promise<PracticeEntity | null>
}


export class GetPracticeByIdUseCase implements IGetPracticeByIdUseCase {

    constructor(
        private readonly practiceRepository: IPracticeRepository
    ) {}

    async execute( studentId: string ): Promise<PracticeEntity | null> {

        if( !studentId ) throw new Error( 'Student id is required' );

        return await this.practiceRepository.getByIdStudent( studentId );
    }

}