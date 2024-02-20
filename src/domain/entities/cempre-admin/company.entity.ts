

export class CompanyEntity {
   
    constructor(
        public id: string,
        public name: string,
        public startDate: Date | string,
        public endDate: Date | string,
    ) {}
}