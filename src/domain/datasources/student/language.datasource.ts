import { LanguageDto, OptionalLanguageDto } from '../../dtos';
import { LanguageEntity } from '../../entities';


export interface ILanguageDataSource {

    register(languageDto: LanguageDto): Promise<LanguageEntity>

    update(optLanguageDto: OptionalLanguageDto): Promise<boolean>

    getByIdStudent(studentId: string): Promise<LanguageEntity[] | null>
}