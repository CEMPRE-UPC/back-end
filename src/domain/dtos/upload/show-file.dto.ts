import { PublicTypeFile, TypeTable } from '../../types';



export class ShowFileDto {

    constructor(
        public  readonly id: string,
        public  readonly table: string,
    ) {}

    static create( body: {[key: string]: any} ): [string?, ShowFileDto?] {

        const { table, id } = body;

        if (!table) return ['table is required'];

        console.log(table);
        

        if(!Object.values(TypeTable).includes(table)) return ['table is invalid' ];
        if (!id) return ['idFile is required'];

        return [undefined, new ShowFileDto(id, table)];
    }
}
export class ShowFileByTypeDto {

    constructor(
        public  readonly typeFile: string,
        public  readonly table: string,
    ) {}

    static create( body: {[key: string]: any} ): [string?, ShowFileByTypeDto?] {

        const { typeFile, table } = body;

        if (!table) return ['table is required'];

        if(!Object.values(TypeTable).includes(table)) return ['table is invalid' ];

        if (!typeFile) return ['typeFile is required'];

        if (!Object.values(PublicTypeFile).includes(typeFile)) return ['typeFile is invalid' ];

        return [undefined, new ShowFileByTypeDto(typeFile, table)];
    }
}