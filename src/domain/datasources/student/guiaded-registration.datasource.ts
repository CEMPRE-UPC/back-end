import { GuiadedRegistrationEntity } from '../../entities'


export interface IGuiadedRegistrationDataSource {

    register(studentId: number): Promise<GuiadedRegistrationEntity>

    delete(studentId: number): Promise<boolean>

    getByStudentId(studentId: number): Promise<GuiadedRegistrationEntity | null>
}