import { ObservationModel } from '../../../../data/mysqldb';
import { CustomError, IObservationDataSource, ObservationDto, ObservationEntity } from '../../../../domain';
import { ObservationMapper } from '../../../mappers';



export class ObservationDatasource implements IObservationDataSource {
    async register(observationDto: ObservationDto): Promise<ObservationEntity> {
        
        const { content, userName, createdBy, practiceAppId } = observationDto;

        try {
                
                const observation =  ObservationModel.build({
                    content,
                    userName,
                    createdBy,
                    practiceAppId
                });
    
                const savedObservation = await observation.save();
    
                return ObservationMapper.observationEntityFromObject(savedObservation.toJSON());
        } catch (error) {
                
                if(error instanceof CustomError) {
                    throw error;
                }
                console.log(error);
                throw CustomError.internalServer();

        }
    }

}