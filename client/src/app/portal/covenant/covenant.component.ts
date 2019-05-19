import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterService } from 'angular2-toaster';
import { CovenantService } from '../../services/covenant.service';
import { Covenant } from '../../shared/models/covenant';
import { Router } from '@angular/router';

@Component({
    selector: 'app-covenant',
    templateUrl: 'covenant.component.html',
    styles: []
})
export class CovenantComponent implements OnInit {
    settings = {
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
                editable: false
            },
            companyName: {
                title: 'Empresa',
                filter: true,
            },
            logo: {
                title: 'Logo',
                filter: true,
                type: 'html'
            },
            site: {
                title: 'Site',
                filter: true
            },
            benefict: {
                title: 'Benefício',
                filter: true
            },
            status: {
                title: 'Status',
                filter: true
            },
        },
        actions: {
            columnTitle: 'Ações'
        },
        noDataMessage: 'Sem dados cadastrados.'
    };
    data: Covenant[];
    source: LocalDataSource;

    constructor(private covenantService: CovenantService,
                private toasterService: ToasterService,
                private router: Router) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.covenantService.list().subscribe(x => {
            this.data = x;
            this.data.forEach(y => {
                y.logo = y.company.logo ? `<img src="/upload/${y.company.logo}" height="50"/>` : null;
                y.companyName = y.company.name;
            });
            this.source = new LocalDataSource(this.data);
        });
    }

    create(event) {
        this.router.navigateByUrl('/portal/editcovenant');
    }

    edit(event) {
        console.log(event);
        this.router.navigate(['/portal/editcovenant'], { queryParams: { id: event.data.id } });
    }

    remove(event) {
        this.covenantService.remove(event.data)
            .subscribe(() => this.success('deletada'), () => this.error());
    }

    success(command: string) {
        this.get();
        this.toasterService.pop('success', 'Concluido', `Convênio ${command}!`);
    }

    error(message?: string) {
        this.toasterService.pop('error', 'Erro', message ? message : 'Ocorreu um erro!');
    }

    rowSelect(e) {
    }
}
