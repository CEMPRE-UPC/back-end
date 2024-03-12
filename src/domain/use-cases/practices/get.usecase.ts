import { PracticeApplicationEntity } from '../../entities';
import { CustomError } from '../../errors';
import { IPracticeApplicationRepository } from '../../repositories';


interface IGetByStudentIdUseCase {
    execute(studentId: number): Promise<PracticeApplicationEntity | null>;
}

interface IGetByIdUseCase {
    execute(id: string): Promise<PracticeApplicationEntity | null>;

}


export class PracticeAppGetByStudentIdUseCase implements IGetByStudentIdUseCase {

    constructor(
        private readonly practiceApplication: IPracticeApplicationRepository
    ) { }

    async execute(studentId: number): Promise<PracticeApplicationEntity | null> {

        
        
        if (!studentId) throw CustomError.badRequest('studentId is required');
        
        return await this.practiceApplication.getByIdStudent(studentId);
    }
}


export class PracticeAppGetByIdUseCase implements IGetByIdUseCase {

    constructor(
        private readonly practiceApplication: IPracticeApplicationRepository
    ) { }

    async execute(id: string): Promise<PracticeApplicationEntity | null> {

        if (!id) throw CustomError.badRequest('id is required');

        return await this.practiceApplication.getById(id);
    }
}