import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsEmail, MinLength, IsNotEmpty, Validate, IsString, Matches } from 'class-validator'
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
    @Matches(/@unicesar\.edu\.co$/, { message: 'El correo debe ser de dominio @unicesar.edu.co' })
    @Validate( CustomIsEmailInDb )
    email!: string

    @Column()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password!: string

    @Column({ default: 'STUDENT_ROLE' })
    @Validate( CustomIsValidRole )
    role!: string

    @Column({ default: true })
    status!: boolean;

}
