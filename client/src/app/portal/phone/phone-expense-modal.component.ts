import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Expense } from '../../shared/models/expense';
import { PhoneExpense } from '../../shared/models/phone-expense';
import { Phone } from '../../shared/models/phone';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { PhoneService } from '../../services/phone.service';

@Component({
    selector: 'app-phone-expense-modal',
    templateUrl: 'phone-expense-modal.component.html',
})
export class PhoneExpenseModalComponent implements OnInit {
    phoneExpense = new PhoneExpense();
    phone: Phone;
    date = new Date();
    reload = new EventEmitter<boolean>();

    constructor(private activeModal: NgbActiveModal,
                private toasterService: ToasterService,
                private phoneService: PhoneService) {
    }

    ngOnInit() {
        this.phoneExpense.expense = new Expense();
    }

    closeModal() {
        this.activeModal.close();
    }

    rowSelected(event: Expense) {
        this.phoneExpense.expense = event;
        this.phoneExpense.value = event.value;
    }

    save() {
        if (this.validate()) {
            this.phoneService.CreateExpensePhone(this.phoneExpense, this.phone.id).subscribe(() => {
                this.success('criada');
            }, () => {
                this.error();
            });
        }
    }

    success(command: string) {
        this.toasterService.pop('success', 'Concluido', `Despesa ${command}!`);
        this.reload.next(true);
        this.activeModal.close();
    }

    error() {
        this.toasterService.pop('error', 'Erro', 'Ocorreu um erro!');
    }

    validate(): boolean {
        if (!this.phoneExpense.value || isNaN(this.phoneExpense.value) || isNaN(this.phoneExpense.year)
            || !this.phoneExpense.month) {
            this.toasterService.pop('warning', 'Erro', 'Formulario invalido!');
            return false;
        } else if (isNaN(this.phoneExpense.month)) {
            this.toasterService.pop('warning', 'Erro', 'O mês deve ser um numero!');
            return false;
        }
        return true;
    }
}
