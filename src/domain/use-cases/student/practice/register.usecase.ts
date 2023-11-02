import { PracticeDto } from '../../../dtos';
import { PracticeEntity } from '../../../entities';
import { IPracticeRepository } from '../../../repositories/';


interface IRegisterUseCase {
    execute( practiceDto: PracticeDto ): Promise<PracticeEntity>;
}

export class RegisterUseCase implements IRegisterUseCase {

    constructor(
        private readonly practiceRepository: IPracticeRepository
    ) {}

    async execute( practiceDto: PracticeDto ): Promise<PracticeEntity> {
        return await this.practiceRepository.register( practiceDto );
    }

}