import { Company } from './covenant-company';

export class Covenant {
    constructor(public id?: number,
                public name?: string,
                public site?: string,
                public benefict?: string,
                public contactName?: string,
                public contactEmail?: string,
                public phone?: string,
                public status?: string,
                public covenantCategoryId?: number,
                public covenantCompanyId?: number,
                public company?: Company,
                public companyName?: string,
                public logo?: string) {
    }
}
