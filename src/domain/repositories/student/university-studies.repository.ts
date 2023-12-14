import { OptionalUniversityStudiesDto, UniversityStudiesDto } from '../../dtos/student/university-studies'
import { UniversityStudiesEntity } from '../../entities'


export interface IUniversityStudiesRepository {

    register(universityStudiesDto: UniversityStudiesDto): Promise<UniversityStudiesEntity>

    update(optUniversityStudiesDto: OptionalUniversityStudiesDto): Promise<boolean>

    getByIdStudent(studentId: string): Promise<UniversityStudiesEntity | null>
}