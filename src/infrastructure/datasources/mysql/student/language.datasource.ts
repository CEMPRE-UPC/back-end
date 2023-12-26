import { LanguageModel } from '../../../../data/mysqldb';
import { CustomError, LanguageDto, LanguageEntity, OptionalLanguageDto } from '../../../../domain';
import { ILanguageDataSource } from '../../../../domain/datasources/student/';
import { LanguageMapper } from '../../../mappers';


export class LanguageDataSource implements ILanguageDataSource {


    async register(languageDto: LanguageDto): Promise<LanguageEntity> {
        
        const { name, listeningLevel, readingLevel, speakingLevel, writingLevel, studentId } = languageDto;

        try {
            
            const language = LanguageModel.build({
                name,
                listeningLevel,
                readingLevel,
                speakingLevel,
                writingLevel,
                studentId
            });

            const savedLanguage = await language.save();

            return LanguageMapper.languageEntityFromObject(savedLanguage);

        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async update(optLanguageDto: OptionalLanguageDto): Promise<boolean> {
        
        const { id, name, listeningLevel, readingLevel, speakingLevel, writingLevel, studentId } = optLanguageDto;

        try {
            
            const exist = LanguageModel.findOne({ where: { id, studentId } });

            if(!exist) {
                throw CustomError.notFound('Language not found');
            }

            const language = await LanguageModel.update({
                name,
                listeningLevel,
                readingLevel,
                speakingLevel,
                writingLevel
            }, { where: { id, studentId } });

            return language.at(0) === 1;
        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async getByIdStudent(studentId: string): Promise<LanguageEntity[] | null> {
       
        try {
            
            const languages = LanguageModel.findAll({ where: { studentId } });


            if (!languages)  return null;

            return languages.then((languages) => {
                return languages.map((language) => LanguageMapper.languageEntityFromObject(language));
            });
            
        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async delete(id: string): Promise<boolean> {
        try {

            const language = await LanguageModel.destroy({ where: { id } });

            return language === 1;

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    
}