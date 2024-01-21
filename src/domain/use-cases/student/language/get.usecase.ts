import { LanguageEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { ILanguageRepository } from '../../../repositories';


interface IGetLanguageByIdUseCase {
    execute(id: string): Promise<LanguageEntity | null>
}

export class GetLanguageByIdUseCase implements IGetLanguageByIdUseCase {

    constructor(
        private readonly languageRepository: ILanguageRepository
    ) { }

    async execute(id: string): Promise<LanguageEntity | null> {
        
        if (!id ) throw CustomError.badRequest('Id is required');

        return await this.languageRepository.getById(id);
    }
}