import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../shared/models/expense';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'app-expense',
    templateUrl: 'expense.component.html',
    styles: []
})
export class ExpenseComponent implements OnInit {
    @Input() title = 'Despesas';
    @Input() disableActions: boolean;
    @Output() rowSelected = new EventEmitter<Expense>();
    settings = {};

    data: Expense[];
    source: LocalDataSource;

    constructor(private expenseService: ExpenseService,
                private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.get();
        this.settings = {
            add: {
                confirmCreate: true,
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                name: {
                    title: 'Nome',
                    filter: true,
                },
                value: {
                    title: 'Valor Padrão',
                    filter: true,
                },
                category: {
                    title: 'Categoria',
                    filter: true,
                },
            },
            actions: {
                columnTitle: 'Ações',
                add: !this.disableActions,
                edit: !this.disableActions,
                delete: !this.disableActions,
            },
            noDataMessage: 'Sem dados cadastrados.'
        };
    }

    get() {
        this.expenseService.list().subscribe(x => {
            this.data = x;
            this.source = new LocalDataSource(this.data);
        }, () => this.error());
    }

    create(event) {
        if (this.validate(event.newData)) {
            this.expenseService.create(event.newData).subscribe(() => {
                event.confirm.resolve();
                this.success('criada');
            }, () => {
                event.confirm.reject();
                this.error();
            });
        }
    }

    edit(event) {
        if (this.validate(event.newData, true)) {
            this.expenseService.update(event.newData).subscribe(() => {
                event.confirm.resolve();
                this.success('alterada');
            }, () => {
                event.confirm.reject();
                this.error();
            });
        }
    }

    remove(event) {
        this.expenseService.remove(event.data).subscribe(() => {
            event.confirm.resolve();
            this.success('deletada');
        }, () => {
            event.confirm.reject();
            this.error('Essa despesa já está associada a telefones e não pode ser removida.');
        });
    }

    success(command: string) {
        this.get();
        this.toasterService.pop('success', 'Concluido', `Despesa ${command}!`);
    }

    error(message?: string) {
        this.toasterService.pop('error', 'Erro', message ? message : 'Ocorreu um erro!');
    }

    validate(data: Expense, edit?: boolean): boolean {
        if (!data.name || !data.category || !data.value || isNaN(data.value)) {
            this.toasterService.pop('warning', 'Erro', 'Formulario invalido!');
            return false;
        } else if (!edit && this.data.filter(x => x.name === data.name).length > 0) {
            this.toasterService.pop('warning', 'Erro', 'Já existe uma despesa com esse nome!');
            return false;
        }
        return true;
    }

    rowSelect(event) {
        this.rowSelected.next(event.data);
    }
}
