import { AreaInterestDto } from '../../../dtos/student';
import { AreaInterestEntity } from '../../../entities';
import { IAreaInterestRepository } from '../../../repositories';


interface IAreaInterest {
    execute(areaInterestDto: AreaInterestDto): Promise<AreaInterestEntity>
}

export class RegisterUseCase implements IAreaInterest {


    constructor(
        private readonly areaInterest: IAreaInterestRepository
    ) { }


    async execute(areaInterestDto: AreaInterestDto): Promise<AreaInterestEntity> {
       
        return await this.areaInterest.register(areaInterestDto);
    }
}