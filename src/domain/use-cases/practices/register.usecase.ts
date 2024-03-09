import { PracticeApplicationEntity } from '../../entities';
import { CustomError } from '../../errors';
import { IPracticeApplicationRepository } from '../../repositories';


interface IRegisterUseCase {
    execute(studentId: number): Promise<PracticeApplicationEntity>;
}

export class PracticeAppRegisterUseCase implements IRegisterUseCase {

    constructor(
        private readonly practiceApplication: IPracticeApplicationRepository
    ) { }

    async execute(studentId: number): Promise<PracticeApplicationEntity> {

        if (!studentId) throw CustomError.badRequest('studentId is required');

        return await this.practiceApplication.register(studentId);
    }
}