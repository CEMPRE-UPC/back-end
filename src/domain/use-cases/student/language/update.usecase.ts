import { OptionalLanguageDto } from '../../../dtos';
import { ILanguageRepository } from '../../../repositories';


interface ILanguage {
    execute(optLanguageDto: OptionalLanguageDto): Promise<boolean>
}

export class UpdateUseCase implements ILanguage {

    constructor(
        private readonly languageRepository: ILanguageRepository
    ) { }

    async execute(optLanguageDto: OptionalLanguageDto): Promise<boolean> {
       
        return await this.languageRepository.update(optLanguageDto);
    }
}