import { CallDto } from '../../dtos';
import { CallEntity } from '../../entities';
import { CustomError } from '../../errors';
import { ICallRepository } from '../../repositories';



interface IRegisterCallUseCase {
    execute(callDto: CallDto): Promise<CallEntity>;
}


export class RegisterCallUseCase implements IRegisterCallUseCase {

    constructor(
        private readonly callRepository: ICallRepository
    ) { }

    async execute(callDto: CallDto): Promise<CallEntity> {

        if (!callDto) throw CustomError.badRequest('callDto is required');

        return await this.callRepository.register(callDto);
    }
}