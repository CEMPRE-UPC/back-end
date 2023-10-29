import { TypeFile } from '../types';
import { StudentEntity } from './student.entity';

export class AttachedFileEntity {
    constructor(
        public id: string,
        public type: TypeFile,
        public file: string,
        public student?: StudentEntity
    ){}
}