import { AreaInterestDto, AreaInterestEntity, CustomError, IAreaInterestRepository, OptionalAreaInterestDto } from '../../../domain';
import { AreaInterestDataSource } from '../../datasources';


export class AreaInterestRepository implements IAreaInterestRepository {
    
    constructor(
        private readonly areaInterest: AreaInterestDataSource
    ) {}

    register(areaInterestDto: AreaInterestDto): Promise<AreaInterestEntity[]> {
        return this.areaInterest.register(areaInterestDto);
    }
    update(optAreaInterestDto: OptionalAreaInterestDto): Promise<boolean> {
        return this.areaInterest.update(optAreaInterestDto);
    }
    getByStudentId(studentId: string): Promise<AreaInterestEntity[] | null> {
        
        if (!studentId) {
            throw CustomError.badRequest('studentId is required');
        }

        return this.areaInterest.getByStudentId(studentId);
    }
    delete(id: string): Promise<boolean> {
        return this.areaInterest.delete(id);
    }

}