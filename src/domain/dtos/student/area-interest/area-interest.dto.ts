
export class AreaInterestDto {

    constructor(
        public description: string[],
        public studentId: number 
    ) {}


    static create(body:{[key: string]:any}): [string?, AreaInterestDto?] {

        const { description = [], studentId } = body;

        if(!studentId) return ['studentId is required'];
        if (!description.length) return ['description is required'];

        return [undefined, new AreaInterestDto(description, studentId)];
  
    }
}