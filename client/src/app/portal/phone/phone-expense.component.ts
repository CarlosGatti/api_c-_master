import { LocalDataSource } from 'ng2-smart-table';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhoneExpenseModalComponent } from './phone-expense-modal.component';
import { PhoneExpense } from '../../shared/models/phone-expense';
import { Phone } from '../../shared/models/phone';
import { ToasterService } from 'angular2-toaster';
import { PhoneService } from '../../services/phone.service';


@Component({
    selector: 'app-phone-expense',
    template: `
        <nb-card>
            <nb-card-header>
                <span>Despesas</span>
                <button class="btn btn-sm btn-success" (click)="create()" *ngIf="!disableControls">Adicionar</button>
            </nb-card-header>
            <nb-card-body>
                <ng2-smart-table [settings]="settings" [source]="source"
                                 (deleteConfirm)="remove($event)"
                                 (editConfirm)="edit($event)">
                </ng2-smart-table>
            </nb-card-body>
        </nb-card>

    `,
    styles: [`
        nb-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    `]
})
export class PhoneExpenseComponent implements OnInit, OnChanges {
    @Input() phoneExpenses: PhoneExpense[];
    @Input() phone: Phone;
    @Input() disableControls: boolean;
    @Output() reload = new EventEmitter<boolean>();

    settings = {
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        columns: {
            name: {
                title: 'Nome',
                filter: true,
                editable: false
            },
            value: {
                title: 'Valor',
                filter: true,
            },
            year: {
                title: 'Ano',
                filter: true,
            },
            month: {
                title: 'Mês',
                filter: true,
            },
            category: {
                title: 'Categoria',
                filter: true,
                editable: false
            }
        },
        actions: {
            add: false,
            edit: true,
            delete: true,
            columnTitle: 'Ações'
        },
        noDataMessage: 'Sem dados cadastrados.'
    };
    source: LocalDataSource;

    constructor(private modalService: NgbModal,
                private toasterService: ToasterService,
                private phoneService: PhoneService) {
    }

    ngOnInit() {
        this.updateTable();
        this.settings.actions.edit = !this.disableControls;
        this.settings.actions.delete = !this.disableControls;
    }

    ngOnChanges() {
        this.updateTable();
    }

    updateTable() {
        if (this.phoneExpenses && this.phoneExpenses.length > 0) {
            this.phoneExpenses.forEach(x => {
                x.name = x.expense.name;
                x.category = x.expense.category;
            });
            this.source = new LocalDataSource(this.phoneExpenses);
        }
    }

    create() {
        const activeModal = this.modalService.open(PhoneExpenseModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.phone = this.phone;
        activeModal.componentInstance.reload.subscribe(() => this.reload.next(true));
    }

    edit(event: any) {
        if (this.validate(event.newData)) {
            this.phoneService.UpdatePhoneExpense(event.newData).subscribe(() => {
                event.confirm.resolve();
                this.success('alterada');
            }, () => {
                event.confirm.reject();
                this.error();
            });
        }
    }

    validate(phoneExpense: PhoneExpense): boolean {
        if (!phoneExpense.value || isNaN(phoneExpense.value) || isNaN(phoneExpense.year) || !phoneExpense.month) {
            this.toasterService.pop('warning', 'Erro', 'Formulario invalido!');
            return false;
        } else if (isNaN(phoneExpense.month)) {
            this.toasterService.pop('warning', 'Erro', 'O mês deve ser um numero!');
            return false;
        }
        return true;
    }

    remove(event) {
        this.phoneService.DeletePhoneExpense(event.data).subscribe(() => {
            event.confirm.resolve();
            this.success('deletada');
        }, () => {
            event.confirm.reject();
            this.error();
        });
    }

    success(command: string) {
        this.toasterService.pop('success', 'Concluido', `Despesa ${command}!`);
        this.reload.next(true);
    }

    error() {
        this.toasterService.pop('error', 'Erro', 'Ocorreu um erro!');
    }
}
