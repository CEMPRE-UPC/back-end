import { OptionalPracticeApplicationDto } from '../../dtos';
import { IPracticeApplicationRepository } from '../../repositories';

interface IUpdateUseCase {
    execute(optPracticeApplicationDto: OptionalPracticeApplicationDto): Promise<boolean>
}

export class PracticeAppUpdateUseCase implements IUpdateUseCase {

    constructor(
        private readonly practiceApplication: IPracticeApplicationRepository
    ) { }

    async execute(optPracticeApplicationDto: OptionalPracticeApplicationDto): Promise<boolean> {
        return await this.practiceApplication.update(optPracticeApplicationDto);
    }
}