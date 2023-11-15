

export class ProjectsEntity {

    constructor(
        public id: string,
        public description: string,
        public date: Date | string,
    ) {}
}