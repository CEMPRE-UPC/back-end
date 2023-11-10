import { Request, Response, NextFunction } from 'express';

import { IStudentRepository } from '../../domain';


export class StudentMiddleware {
    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}

    validateStudent = async(req: Request, res: Response, next: NextFunction) => {
        
        const cedula = req.body.cedula || req.params.cedula;

        const student = await this.studentRepository.getStudentByCedula(cedula);

        if (!student) return res.status(400).json({ message: 'Student not found'});

        next();
    }

}