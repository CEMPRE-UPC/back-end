import { CallDto, OptionalCallDto } from '../../dtos/call'
import { CallEntity } from '../../entities/call'


export interface ICallRepository {
    register( callDto: CallDto): Promise<CallEntity>
    update(optCallDto: OptionalCallDto): Promise<boolean>
    getById(id: string): Promise<CallEntity | null>
    getByPracticeId(practiceId: string): Promise<CallEntity | null>
    delete(id: string): Promise<boolean>
    getAllCalls(): Promise<CallEntity[] | null>
}