import { GuiadedRegistrationEntity } from '../../entities'


export interface IGuiadedRegistrationRepository {

    register(studentId: number): Promise<GuiadedRegistrationEntity>

    delete(studentId: number): Promise<boolean>

    getByStudentId(studentId: number): Promise<GuiadedRegistrationEntity | null>
}