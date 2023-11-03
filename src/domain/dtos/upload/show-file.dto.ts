import { TypeTable } from '../../types';



export class ShowFileDto {

    constructor(
        public  readonly id: string,
        public  readonly table: string,
    ) {}

    static create( body: {[key: string]: any} ): [string?, ShowFileDto?] {

        const { table, id } = body;

        if (!table) return ['cedula is required'];

        console.log(table);
        

        if(!Object.values(TypeTable).includes(table)) return ['table is invalid' ];
        if (!id) return ['idFile is required'];

        return [undefined, new ShowFileDto(id, table)];
    }
}