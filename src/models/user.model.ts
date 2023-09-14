import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsEmail, MinLength, IsNotEmpty, Validate, IsString } from 'class-validator'
import { CustomIsEmailInDb } from '../validators/CustomIsEmailInDb'
import { CustomIsValidRole } from '../validators/CustomIsVaildRole'

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    @IsString({ message: 'El nombre debe ser un string'})
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    name!: string

    @Column()
    @IsEmail({}, { message: 'Email incorrecto' })
    @Validate( CustomIsEmailInDb, { message: 'El correo ya se encuentra registrado' })
    email!: string

    @Column()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password!: string

    @Column({ default: 'STUDENT_ROLE' })
    @Validate( CustomIsValidRole, { message: 'El rol no es válido' } )
    role!: string

    @Column({ default: true })
    status!: boolean;

}
