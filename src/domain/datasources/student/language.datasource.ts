import { LanguageDto, OptionalLanguageDto } from '../../dtos';
import { LanguageEntity } from '../../entities';


export interface ILanguageDataSource {

    register(languageDto: LanguageDto): Promise<LanguageEntity>

    update(optLanguageDto: OptionalLanguageDto): Promise<boolean>

    getByIdStudent(studentId: string): Promise<LanguageEntity[] | null>

    getLanguageByName(studentId: string, name: string): Promise<LanguageEntity | null>

    getById(id: string): Promise<LanguageEntity | null>

    delete(id: string): Promise<boolean>

}