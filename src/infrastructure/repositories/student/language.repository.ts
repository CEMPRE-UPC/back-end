import { ILanguageDataSource, ILanguageRepository, LanguageDto, LanguageEntity, OptionalLanguageDto } from '../../../domain';


export class LanguageRepository implements ILanguageRepository {
    
    constructor(
        private readonly languageDataSource: ILanguageDataSource
    ) {}
    
    register(languageDto: LanguageDto): Promise<LanguageEntity> {
        return this.languageDataSource.register(languageDto);
    }
    update(optLanguageDto: OptionalLanguageDto): Promise<boolean> {
        return this.languageDataSource.update(optLanguageDto);
    }
    getByIdStudent(studentId: string): Promise<LanguageEntity[] | null> {
        return this.languageDataSource.getByIdStudent(studentId);
    }

}