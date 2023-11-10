import { PracticeEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { IPracticeRepository } from '../../../repositories';


interface IGetPracticeByIdUseCase {
    execute( studentId: string ): Promise<PracticeEntity | null>
}


export class GetPracticeByIdUseCase implements IGetPracticeByIdUseCase {

    constructor(
        private readonly practiceRepository: IPracticeRepository
    ) {}

    async execute( id: string ): Promise<PracticeEntity | null> {

        if( !id ) throw CustomError.badRequest('Id is required');

        return await this.practiceRepository.getPracticeById( id );
    }

}