import { CustomError } from '../../../errors';
import { ILanguageRepository } from '../../../repositories';


interface ILanguage {
    execute(id: string): Promise<boolean>
}

export class DeleteUseCase implements ILanguage {


    constructor(
        private readonly languageRepository: ILanguageRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.languageRepository.delete(id);
    }
}