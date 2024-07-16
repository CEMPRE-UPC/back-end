import { ObservationDto } from '../../dtos'
import { ObservationEntity } from '../../entities'


export interface IObservationRepository {

    register(observationDto: ObservationDto): Promise<ObservationEntity>

} 