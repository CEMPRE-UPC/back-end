import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator'

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    name!: string

    @Column()
    @IsEmail({}, { message: 'Email incorrecto' })
    email!: string

    @Column()
    //Default value
    @IsNotEmpty({ message: 'El status es requerido' })
    status: boolean = true

}
