import { PracticeDto } from '../../../dtos';
import { IPracticeRepository } from '../../../repositories';


interface IUpdateUseCase {
    execute( practiceDto: PracticeDto ): Promise<boolean>;
}

export class UpdateUseCase implements IUpdateUseCase {

    constructor(
        private readonly practiceRepository: IPracticeRepository
    ) {}

    async execute( practiceDto: PracticeDto ): Promise<boolean> {

        return  await this.practiceRepository.update( practiceDto );
    }

}