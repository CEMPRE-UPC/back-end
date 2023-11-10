import { PracticeEntity } from '../../../entities';
import { IPracticeRepository } from '../../../repositories';


interface IGetAllPracticesUseCase {
    execute(): Promise<PracticeEntity[] | null>
}


export class GetAllPracticesUseCase implements IGetAllPracticesUseCase {

    constructor(
        private readonly practiceRepository: IPracticeRepository
    ) {}

    async execute(): Promise<PracticeEntity[] | null> {
        return await  this.practiceRepository.getAllPractices();
    }



}