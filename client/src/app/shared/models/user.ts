import { Address } from './address';
import { Phone } from './phone';

export class User {
    constructor(public id?: string,
                public name?: string,
                public password?: string,
                public workUnit?: string,
                public imgProfile?: string,
                public dateCreated?: string,
                public dateUpdated?: string,
                public email?: string,
                public enabled?: boolean,
                public changePassword?: boolean,
                public role?: string,
                public phones?: Phone[],
                public address?: Address) {
    }
}
