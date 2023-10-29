import { BcryptAdapter } from '../../../config/bcrypt';
import { UserModel } from '../../../data/mongodb';
import { CustomError, IAuthDataSource, LoginUserDto, RegisterUserDto, UserEntity } from '../../../domain';
import { UserMapper } from '../../mappers';



export class AuthMongoDatasource implements IAuthDataSource {
    getUserByEmail(email: string): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }
    getUserById(id: number): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

    
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { email, password, isActive } = registerUserDto;

        try {

            // TODO: verify if email already exists

            const exist = await UserModel.findOne({ email });
            if( exist ) throw CustomError.badRequest('Email already exists');


            const user = await UserModel.create({
                email,
                password: BcryptAdapter.hash(password),
                isActive
            })

            await user.save();

            // TODO: hash password

            // TODO: map result to UserEntity


            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
            
        }
    }

}