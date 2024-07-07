import { CallEntity } from '../../entities';
import { CustomError } from '../../errors';
import { ICallRepository } from '../../repositories';


interface IGetByCallIdUseCase {
    execute(callId: string): Promise<CallEntity | null>;
}

export class GetByCallIdlUseCase implements IGetByCallIdUseCase {

    constructor(
        private readonly callRepository: ICallRepository
    ) { }

    async execute(callId: string): Promise<CallEntity | null> {

        if (!callId) throw CustomError.badRequest('callId is required');

        return await this.callRepository.getById(callId);
    }
}


export class GetAllCallsUseCase {

    constructor(
        private readonly callRepository: ICallRepository
    ) { }

    async execute(): Promise<CallEntity[] | null> {
        return await this.callRepository.getAllCalls();
    }
}