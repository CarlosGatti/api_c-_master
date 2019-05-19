import { Phone } from './phone';
import { Expense } from './expense';

export class PhoneExpense {
    constructor(public id?: string,
                public phone?: Phone,
                public expense?: Expense,
                public year?: number,
                public month?: number,
                public value?: number,
                public name?: string,
                public category?: string) {
    }
}
