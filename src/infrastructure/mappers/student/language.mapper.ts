import { CustomError, LanguageEntity } from '../../../domain';


export class LanguageMapper {

    static languageEntityFromObject(object: { [key: string]:any }): LanguageEntity {

        const { id, _id, name, listeningLevel, readingLevel, speakingLevel, writingLevel } = object;

        if(!id && !_id) {
            throw CustomError.badRequest('Invalid object');
        }

        if(!name) throw CustomError.badRequest('Missing name');
        if(!listeningLevel) throw CustomError.badRequest('Missing listeningLevel');
        if(!readingLevel) throw CustomError.badRequest('Missing readingLevel');
        if(!speakingLevel) throw CustomError.badRequest('Missing speakingLevel');
        if(!writingLevel) throw CustomError.badRequest('Missing writingLevel');

        return new LanguageEntity(
            _id || id,
            name,
            readingLevel,
            listeningLevel,
            speakingLevel,
            writingLevel
        );
    }
}