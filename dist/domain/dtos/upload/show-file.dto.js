"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowFileDto = void 0;
const types_1 = require("../../types");
class ShowFileDto {
    constructor(id, table) {
        this.id = id;
        this.table = table;
    }
    static create(body) {
        const { table, id } = body;
        if (!table)
            return ['cedula is required'];
        console.log(table);
        if (!Object.values(types_1.TypeTable).includes(table))
            return ['table is invalid'];
        if (!id)
            return ['idFile is required'];
        return [undefined, new ShowFileDto(id, table)];
    }
}
exports.ShowFileDto = ShowFileDto;
