import { AppliedStudiesDto, OptionalAppliedStudiesDto } from '../../dtos'
import { AppliedStudiesEntity } from '../../entities'

export interface IAppliedStudiesRepository {
    
    register(appliedStudiesDto: AppliedStudiesDto): Promise<AppliedStudiesEntity>

    update(optAppliedStudiesDto: OptionalAppliedStudiesDto): Promise<boolean>

    getByIdStudent(studentId: string): Promise<AppliedStudiesEntity[] | null>

    delete(id: string): Promise<boolean>

}