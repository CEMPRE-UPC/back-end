import { AreaInterestDto, OptionalAreaInterestDto } from '../../dtos';
import { AreaInterestEntity } from '../../entities';


export interface IAreaInterestRepository {

    register(areaInterestDto: AreaInterestDto): Promise<AreaInterestEntity[]>

    update(optAreaInterestDto: OptionalAreaInterestDto): Promise<boolean>

    getByStudentId(studentId: string): Promise<AreaInterestEntity[] | null>
}