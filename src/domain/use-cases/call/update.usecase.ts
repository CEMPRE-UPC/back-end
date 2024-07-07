import { OptionalCallDto } from '../../dtos';
import { ICallRepository } from '../../repositories';


interface IUpdateCallUseCase {
    execute(optCallDto: OptionalCallDto): Promise<boolean>
}


export class UpdateCallUseCase implements IUpdateCallUseCase {

    constructor(
        private readonly callRepository: ICallRepository
    ) { }

    async execute(optCallDto: OptionalCallDto): Promise<boolean> {
        return await this.callRepository.update(optCallDto);
    }
}