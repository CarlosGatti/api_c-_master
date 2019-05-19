import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Phone } from '../shared/models/phone';
import { PhoneExpense } from '../shared/models/phone-expense';
import { ExpenseResume } from '../shared/models/expense-resume';

@Injectable()
export class PhoneService {

    private readonly URL = `/api/phone`;

    constructor(protected httpClient: HttpClient) {
    }

    public list(): Observable<Array<Phone>> {
        return this.httpClient.get<Array<Phone>>(this.URL);
    }

    public get(id: string): Observable<Phone> {
        return this.httpClient.get<Phone>(`${this.URL}/${id}`);
    }

    public create(phone: Phone, userId: string): Observable<Phone> {
        return this.httpClient.post<Phone>(`/api/user/phone/${userId}`, phone);
    }

    public remove(phone: Phone): Observable<Phone> {
        return this.httpClient.delete<Phone>(`${this.URL}/${phone.id}`);
    }

    public update(phone: Phone): Observable<Phone> {
        return this.httpClient.put<Phone>(`${this.URL}/${phone.id}`, phone);
    }

    public getAllPhoneExpenses(): Observable<PhoneExpense[]> {
        return this.httpClient.get<PhoneExpense[]>(`api/phoneexpense`);
    }

    public CreateExpensePhone(obj: PhoneExpense, phoneId: string): Observable<PhoneExpense> {
        return this.httpClient.post<PhoneExpense>(`${this.URL}/Expense/${phoneId}`, obj);
    }

    public DeletePhoneExpense(obj: PhoneExpense): Observable<PhoneExpense> {
        return this.httpClient.delete<PhoneExpense>(`api/phoneexpense/${obj.id}`);
    }

    public UpdatePhoneExpense(obj: PhoneExpense): Observable<PhoneExpense> {
        return this.httpClient.put<PhoneExpense>(`api/phoneexpense/${obj.id}`, obj);
    }

    public GetPhoneExpenseResume(): Observable<ExpenseResume[]> {
        return this.httpClient.get<ExpenseResume[]>(`${this.URL}/GetPhoneExpenseResume`);
    }

    public count(): Observable<number> {
        return this.httpClient.get<number>(`${this.URL}/count`);
    }
}
