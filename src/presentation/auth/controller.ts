import { Request, Response } from 'express';

import { IAuthRepository } from '../../domain/repositories';
import { LoginUseCase, RegisterUseCase, CheckTokenUseCase } from '../../domain/use-cases';
import { LoginUserDto, RegisterUserDto, CheckTokenDto } from '../../domain/dtos';
import { CustomError } from '../../domain/errors';

export class AuthController {

    constructor(
        private readonly authRepositoy: IAuthRepository
    ) { }   


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }

    login = async(req: Request, res: Response) => {
        const [ error, loginUserDto ] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json(error);

        
        new LoginUseCase( this.authRepositoy ).execute( loginUserDto! )
            .then( userToken => res.json( userToken ) )
            .catch( error => this.handleError( error, res ) );
    }
    
    register = (req: Request, res: Response) => {
        
        const [ error, registerUserDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json( error );

        
       new RegisterUseCase( this.authRepositoy ).execute( registerUserDto! )
            .then( userToken => res.json( userToken ) )
            .catch( error => this.handleError( error, res ) );
    }

    checkToken = (req: Request, res: Response) => {

        const [ error, token ] = CheckTokenDto.create(req.header('Authorization'));
        if (error) return res.status(401).json(error);

        new CheckTokenUseCase( this.authRepositoy ).execute( token! )
            .then( userChecked => res.json( userChecked ) )
            .catch( error => this.handleError( error, res ) );
    }

}