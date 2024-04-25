import { TypeFile } from '../../types';

export class PublicFileEntity {
    constructor(
        public id: string,
        public type: TypeFile,
        public file: string,
    ){}
}