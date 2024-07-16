import { IObservationDataSource, IObservationRepository, ObservationDto, ObservationEntity } from '../../../domain';


export class ObservationRepository implements IObservationRepository {
   
    constructor(
        private readonly observationDatasource: IObservationDataSource
    ) { }
   
    register(observationDto: ObservationDto): Promise<ObservationEntity> {
        return this.observationDatasource.register(observationDto);
    }

}