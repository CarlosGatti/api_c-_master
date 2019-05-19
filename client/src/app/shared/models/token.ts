import { User } from './user';

export class Token {
    constructor(public token?: string,
                public auth?: boolean,
                public user?: User) {
    }
}
