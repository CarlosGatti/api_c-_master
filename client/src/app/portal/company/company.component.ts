import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterService } from 'angular2-toaster';
import { Company } from '../../shared/models/covenant-company';
import { CompanyService } from '../../services/company.service';

@Component({
    selector: 'app-company',
    templateUrl: 'company.component.html',
    styles: []
})
export class CompanyComponent implements OnInit {
    settings = {};
    data: Company[];
    source: LocalDataSource;
    editing: boolean;
    companyEditing: Company;
    @Input() maxImgHeight;
    @Output() rowSelected = new EventEmitter<Company>();

    constructor(private companyService: CompanyService,
                private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.get();
        this.settings = {
            mode: 'external',
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
                logo: {
                    title: 'Logo',
                    filter: true,
                    type: 'html'
                },
            },
            actions: {
                columnTitle: 'Ações'
            },
            noDataMessage: 'Sem dados cadastrados.'
        };
    }

    get() {
        this.companyService.list().subscribe(x => {
            this.data = x;
            this.data.forEach(y => y.logo = y.logo ?
                `<img src="/upload/${y.logo}" height="${this.maxImgHeight ? this.maxImgHeight : 100}"/>` : null);
            this.source = new LocalDataSource(this.data);
        });
    }

    create(event) {
        window.scrollTo(0, 0);
        this.editing = true;
        this.companyEditing = new Company();
    }

    edit(event) {
        window.scrollTo(0, 0);
        this.editing = true;
        this.companyEditing = event.data;

    }

    remove(event) {
        this.companyService.remove(event.data).subscribe(() => {
            this.success('deletada');
        }, () => {
            this.error('Essa empresa já está associada e não pode ser removida');
        });
    }

    success(command: string) {
        this.get();
        this.toasterService.pop('success', 'Concluido', `Empresa ${command}!`);
    }

    error(message?: string) {
        this.toasterService.pop('error', 'Erro', message ? message : 'Ocorreu um erro!');
    }

    rowSelect(event) {
        this.rowSelected.next(event.data);
    }

    getDelaid() {
        setTimeout(() => this.get(), 1000);
    }
}
