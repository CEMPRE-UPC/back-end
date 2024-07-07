import { CallDto, CallEntity, ICallDataSource, ICallRepository, OptionalCallDto } from '../../../domain';



export class CallRepository implements ICallRepository {

    constructor(
        private readonly callDataSource: ICallDataSource
    ) {}


    register(callDto: CallDto): Promise<CallEntity> {
        return this.callDataSource.register(callDto);
    }
    
    update(optCallDto: OptionalCallDto): Promise<boolean> {
        return this.callDataSource.update(optCallDto);
    }
    
    getById(id: string): Promise<CallEntity | null> {
        return this.callDataSource.getById(id);
    }

    
    getAllCalls(): Promise<CallEntity[] | null> {
        return this.callDataSource.getAllCalls();
    }

    delete(id: string): Promise<boolean> {
        return this.callDataSource.delete(id);
    }
    
}