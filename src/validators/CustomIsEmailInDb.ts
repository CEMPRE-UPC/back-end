import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import db from '../db/connection';
import { User } from '../models/user.model';

@ValidatorConstraint({ name: 'customEmailInDb', async: false })
export class CustomIsEmailInDb implements ValidatorConstraintInterface {

    private userRepository = db.getRepository(User);

    async validate(email: string, args: ValidationArguments) {

        const user = await this.userRepository.findOne({
            where: { email }
        })
        return !user;
    }

    defaultMessage(args: ValidationArguments) {
        return `El correro ingresado: ${args.value}, ya se encuentra registrado`;
    }
}