import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../shared/models/expense';

@Injectable()
export class ExpenseService {

    private readonly URL = `/api/expense`;

    constructor(protected httpClient: HttpClient) {
    }

    public list(): Observable<Array<Expense>> {
        return this.httpClient.get<Array<Expense>>(this.URL);
    }

    public get(id: string): Observable<Expense> {
        return this.httpClient.get<Expense>(`${this.URL}/${id}`);
    }

    public create(expense: Expense): Observable<Expense> {
        return this.httpClient.post<Expense>(this.URL, expense);
    }

    public remove(expense: Expense): Observable<Expense> {
        return this.httpClient.delete<Expense>(`${this.URL}/${expense.id}`);
    }

    public update(expense: Expense): Observable<Expense> {
        return this.httpClient.put<Expense>(`${this.URL}/${expense.id}`, expense);
    }
}
