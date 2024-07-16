import { ObservationDto } from '../../../dtos';
import { ObservationEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { IObservationRepository } from '../../../repositories';


interface IObservationRegisterUseCase {
    execute(observationDto: ObservationDto): Promise<ObservationEntity>;
}


export class ObservationRegisterUseCase implements IObservationRegisterUseCase {

    constructor(
        private readonly observationRepository: IObservationRepository
    ) { }
    async execute(observationDto: ObservationDto): Promise<ObservationEntity> {

        const { practiceAppId } = observationDto;

        if (!practiceAppId) throw CustomError.badRequest('practiceAppId is required');
        return await this.observationRepository.register(observationDto);
    }
}