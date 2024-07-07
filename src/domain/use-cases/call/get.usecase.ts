import { CallEntity } from '../../entities';
import { CustomError } from '../../errors';
import { ICallRepository } from '../../repositories';


interface IGetByCallIdUseCase {
    execute(callId: string): Promise<CallEntity | null>;
}

interface IGetByPracticeIdUseCase {
    execute(practiceId: string): Promise<CallEntity | null>;
}

interface IGetAllCallsUseCase {
    execute(): Promise<CallEntity[] | null>;
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

export class GetByPracticeIdUseCase implements IGetByPracticeIdUseCase  {

    constructor(
        private readonly callRepository: ICallRepository
    ) { }

    async execute(practiceId: string): Promise<CallEntity | null> {

        if (!practiceId) throw CustomError.badRequest('practiceId is required');

        return await this.callRepository.getByPracticeId(practiceId);
    }

   
}


export class GetAllCallsUseCase implements IGetAllCallsUseCase {

    constructor(
        private readonly callRepository: ICallRepository
    ) { }

    async execute(): Promise<CallEntity[] | null> {
        return await this.callRepository.getAllCalls();
    }
}