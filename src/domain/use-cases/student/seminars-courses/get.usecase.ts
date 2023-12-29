import { SeminarsOrCoursesEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { ISeminarsOrCoursesRepository } from '../../../repositories';


interface IGetSeminarsCoursesUseCase {
    execute(id: string): Promise<SeminarsOrCoursesEntity | null>;
}


export class GetByIdUseCase implements IGetSeminarsCoursesUseCase {

    constructor(
        private readonly seminarsCoursesRepository: ISeminarsOrCoursesRepository
    ) { }

    public async execute(id: string): Promise<SeminarsOrCoursesEntity | null> {

        if ( !id ) throw CustomError.badRequest('Id is required');
        
        return await this.seminarsCoursesRepository.getById(id);
    }

}