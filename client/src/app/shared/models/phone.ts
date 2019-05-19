import { User } from './user';
import { PhoneExpense } from './phone-expense';

export class Phone {
    constructor(public id?: string,
                public type?: string,
                public ddd?: string,
                public number?: string,
                public dateCreated?: string,
                public dateUpdated?: string,
                public enabled?: boolean,
                public phoneExpenses?: PhoneExpense[],
                public user?: User) {
    }
}
