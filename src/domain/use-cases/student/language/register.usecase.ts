import { LanguageDto } from '../../../dtos';
import { LanguageEntity } from '../../../entities';
import { ILanguageRepository } from '../../../repositories';

interface ILanguage {
    execute(languageDto: LanguageDto): Promise<LanguageEntity>
}

export class RegisterUseCase implements ILanguage {


    constructor(
        private readonly languageRepository: ILanguageRepository
    ) { }

    async execute(languageDto: LanguageDto): Promise<LanguageEntity> {
       
        return await this.languageRepository.register(languageDto);
    }
}