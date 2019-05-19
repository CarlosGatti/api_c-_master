import { Phone } from './phone';
import { User } from './user';

export class PhoneUser {
    constructor(public user?: User,
                public phone?: Phone) {
    }
}
