import { v4 as uuidv4, validate } from 'uuid';

export class UUIDAdapter {

    static generate(): string {
        return uuidv4();
    }

    // validate uuid is valid
    static isValid(uuid: string): boolean {
        return validate(uuid);
    }
}