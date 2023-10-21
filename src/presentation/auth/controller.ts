import { Request, Response } from 'express';

import { IAuthRepository } from '../../domain/repositories';
import { LoginUseCase, RegisterUserUseCase, CheckTokenUseCase } from '../../domain/use-cases';
import { LoginUserDto, RegisterUserDto, CheckTokenDto } from '../../domain/dtos';
import { handleError } from '../helpers';

export class AuthController {

    constructor(
        private readonly authRepositoy: IAuthRepository
    ) { }   


    login = async(req: Request, res: Response) => {
        const [ error, loginUserDto ] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json(error);

        
        new LoginUseCase( this.authRepositoy ).execute( loginUserDto! )
            .then( userToken => res.json( userToken ) )
            .catch( error => handleError( error, res ) );
    }
    
    register = (req: Request, res: Response) => {
        
        const [ error, registerUserDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json( error );

        
       new RegisterUserUseCase( this.authRepositoy ).execute( registerUserDto! )
            .then( userToken => res.json( userToken ) )
            .catch( error => handleError( error, res ) );
    }

    checkToken = (req: Request, res: Response) => {

        const [ error, token ] = CheckTokenDto.create(req.header('Authorization'));
        if (error) return res.status(401).json(error);

        new CheckTokenUseCase( this.authRepositoy ).execute( token! )
            .then( userChecked => res.json( userChecked ) )
            .catch( error => handleError( error, res ) );
    }

}