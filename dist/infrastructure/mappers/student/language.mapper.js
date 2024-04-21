"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageMapper = void 0;
const domain_1 = require("../../../domain");
class LanguageMapper {
    static languageEntityFromObject(object) {
        const { id, _id, name, listeningLevel, readingLevel, speakingLevel, writingLevel } = object;
        if (!id && !_id) {
            throw domain_1.CustomError.badRequest('Invalid object');
        }
        if (!name)
            throw domain_1.CustomError.badRequest('Missing name');
        if (!listeningLevel)
            throw domain_1.CustomError.badRequest('Missing listeningLevel');
        if (!readingLevel)
            throw domain_1.CustomError.badRequest('Missing readingLevel');
        if (!speakingLevel)
            throw domain_1.CustomError.badRequest('Missing speakingLevel');
        if (!writingLevel)
            throw domain_1.CustomError.badRequest('Missing writingLevel');
        return new domain_1.LanguageEntity(_id || id, name, readingLevel, listeningLevel, speakingLevel, writingLevel);
    }
}
exports.LanguageMapper = LanguageMapper;
