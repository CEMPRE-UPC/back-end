import { OptionalLanguageDto } from '../../../dtos';
import { LanguageEntity } from '../../../entities';
import { ILanguageRepository } from '../../../repositories';


interface ILanguage {
    execute(studentId: string): Promise<LanguageEntity[] | null>
}

export class GetAllByStudentIdUseCase implements ILanguage {

    constructor(
        private readonly languageRepository: ILanguageRepository
    ) { }

    async execute(studentId: string): Promise<LanguageEntity[] | null> {
       
        return await this.languageRepository.getByIdStudent(studentId);
    }
}