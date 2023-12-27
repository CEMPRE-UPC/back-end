import { Request, Response, NextFunction } from 'express';

import { ILanguageRepository } from '../../domain';


export class LanguageMiddleware {
    constructor(
        private readonly LanguageRepository: ILanguageRepository
    ) {}

    existLanguage = async(req: Request, res: Response, next: NextFunction) => {
        
        const { studentId, name } = req.body;

        const Language = await this.LanguageRepository.getLanguageByName(studentId, name)

        if (Language) return res.status(400).json({ message: 'Language already exists', exist: true });

        next();
    }

}