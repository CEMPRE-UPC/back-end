import { Status } from '../../types/call';



export class CallEntity {
    constructor(
        public id: string,
        public name: string,
        public startDate: string,
        public endDate: string,
        public status: Status,
        public practiceId: string
    ) {}
}