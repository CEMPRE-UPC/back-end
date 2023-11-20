import { OptionalAreaInterestDto } from '../../../dtos/student';
import { IAreaInterestRepository } from '../../../repositories/student';


interface IAreaInterest {
    execute(optAreaInterestDto: OptionalAreaInterestDto): Promise<boolean>
}

export class UpdateUseCase implements IAreaInterest {

    constructor(
        private readonly areaInterest: IAreaInterestRepository
    ) { }

    async execute(optAreaInterestDto: OptionalAreaInterestDto): Promise<boolean> {
       
        return await this.areaInterest.update(optAreaInterestDto);
    }
}