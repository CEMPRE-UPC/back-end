import { JwtAdapter } from '../../../config';
import { IAuthRepository } from '../../repositories';
import { UserToken, VerifyToken } from '../../types';
import { CustomError } from '../../errors/custom.error';


type UserChecked = {
    id: number;
    email: string;
    isActive: boolean;
}

interface ICheckTokenUseCase {
    execute( token: string ): Promise<UserChecked>;
}


export class CheckTokenUseCase implements ICheckTokenUseCase {
    
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly verifyToken: VerifyToken = JwtAdapter.validateToken
    ) {}
    
    async execute(token: string): Promise<UserChecked> {
        
        const payload = await this.verifyToken<{ id: number }>(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const user = await this.authRepository.getUserById(payload.id);
        if (!user ) throw CustomError.unauthorized('Invalid token - user not found');

        return {
            id: user.id,
            email: user.email,
            isActive: user.isActive
        }

    }

}