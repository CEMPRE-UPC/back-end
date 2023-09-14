import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import db from '../db/connection';
import { Role } from '../models/role.model';

@ValidatorConstraint({ name: 'customValidRole', async: false })
export class CustomIsValidRole implements ValidatorConstraintInterface {

    private userRepository = db.getRepository(Role);

    async validate(role: string, args: ValidationArguments) {

        const isValidRol = await this.userRepository.findOne({
            where: { role }
        })

        return !!isValidRol;
    }

    defaultMessage(args: ValidationArguments) {
        return `El rol ${args.value} no se encuentra registrado en la DB`;
    }
}