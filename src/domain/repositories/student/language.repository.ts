import { LanguageDto, OptionalLanguageDto } from '../../dtos';
import { LanguageEntity } from '../../entities';


export interface ILanguageRepository {

    register(languageDto: LanguageDto): Promise<LanguageEntity>

    update(optLanguageDto: OptionalLanguageDto): Promise<boolean>

    getByIdStudent(studentId: string): Promise<LanguageEntity[] | null>

    delete(id: string): Promise<boolean>

}