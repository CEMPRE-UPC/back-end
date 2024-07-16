import { ObservationDto } from '../../dtos'
import { ObservationEntity } from '../../entities'


export interface IObservationDataSource {

    register(observationDto: ObservationDto): Promise<ObservationEntity>

} 