
import { AppliedStudiesEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { IAppliedStudiesRepository } from '../../../repositories';



interface IAppliedStudies {
    execute(studentId: string): Promise<AppliedStudiesEntity[] | null>
}

export class GetByStudentIdUseCase implements IAppliedStudies {


    constructor(
        private readonly appliedStudiesRepository: IAppliedStudiesRepository
    ) { }


    async execute(studentid: string): Promise<AppliedStudiesEntity[] | null> {

        if (!studentid) throw CustomError.badRequest('Student id is required');
       
        return await this.appliedStudiesRepository.getByIdStudent( studentid );
    }
}