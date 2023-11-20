import { AreaInterestEntity } from '../../../entities';
import { IAreaInterestRepository } from '../../../repositories';


interface IAreaInterest {
    execute( studentId: string): Promise<AreaInterestEntity[] | null>
}

export class GetAreaInterestUseCase implements IAreaInterest {

    constructor(
        private readonly areaInterest: IAreaInterestRepository
    ) {}

    async execute(studentId: string): Promise<AreaInterestEntity[] | null> {

        if(!studentId) {
            throw new Error('Student id must be provided');
        }

        return await this.areaInterest.getByStudentId(studentId);
    }

}