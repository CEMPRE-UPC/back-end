import { JwtAdapter } from '../../../config';
import { IAuthRepository } from '../../repositories';
import { UserToken, VerifyToken } from '../../types';
import { CustomError } from '../../errors/custom.error';

interface ICheckTokenUseCase {
    execute( token: string ): Promise<UserToken>;
}


export class CheckTokenUseCase implements ICheckTokenUseCase {
    
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly verifyToken: VerifyToken = JwtAdapter.validateToken
    ) {}
    
    async execute(token: string): Promise<UserToken> {
        
        const payload = await this.verifyToken<{ id: number }>(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const user = await this.authRepository.getUserById(payload.id);
        if (!user ) throw CustomError.unauthorized('Invalid token - user not found');

       
        return {
            user: {
                id: user.id,
                email: user.email,
                isActive: user.isActive,
                role: user.role
            },
            token
        }

    }

}