

export class PracticeEntity {

    constructor(
        public id: string,
        public modality: string,
        public createdAt: Date | string,
        public updatedAt: Date | string,
    ) {}
  
}