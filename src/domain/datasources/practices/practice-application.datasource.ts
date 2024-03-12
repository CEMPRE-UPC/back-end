import { OptionalPracticeApplicationDto } from '../../dtos'
import { PracticeApplicationEntity } from '../../entities'


export interface IPracticeApplicationDataSource {

    register(studentId: number): Promise<PracticeApplicationEntity>

    update(optPracticeApplicationDto: OptionalPracticeApplicationDto): Promise<boolean>

    getByIdStudent(studentId: number): Promise<PracticeApplicationEntity | null>

    getById(id: string): Promise<PracticeApplicationEntity | null>
} 