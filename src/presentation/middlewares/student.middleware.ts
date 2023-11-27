import { Request, Response, NextFunction } from 'express';

import { IStudentRepository } from '../../domain';


export class StudentMiddleware {
    constructor(
        private readonly studentRepository: IStudentRepository
    ) {}

    existStudent = async(req: Request, res: Response, next: NextFunction) => {
        
        const cedula = req.body.cedula || req.params.cedula;

        const student = await this.studentRepository.getStudentByCedula(cedula);

        if (student) return res.status(400).json({ message: 'Student already exists'});

        next();
    }

    notfoundStudent = async(req: Request, res: Response, next: NextFunction) => {
            
            const cedula = req.body.cedula || req.params.cedula;
    
            const student = await this.studentRepository.getStudentByCedula(cedula);
    
            if (!student) return res.status(400).json({ message: 'Student not found'});
    
            next();
    }

}