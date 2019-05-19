import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { Link } from '../../shared/models/link';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'app-links',
    templateUrl: 'links.component.html',
    styles: [`
        nb-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    `]
})
export class LinksComponent implements OnInit {
    link: Link;
    settings = {};
    data: Link[];
    source: LocalDataSource;

    constructor(private linkService: LinkService,
                private _location: Location,
                private toasterService: ToasterService) {
    }

    ngOnInit(): void {
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
                address: {
                    title: 'Site',
                    filter: true,
                },
            },
            actions: {
                columnTitle: 'Ações',
                add: true,
                edit: true,
                delete: true,
            },
            noDataMessage: 'Sem dados cadastrados.'
        };
    }

    get() {
        this.linkService.list().subscribe(x => {
            this.data = x;
            this.source = new LocalDataSource(this.data);
        }, () => this.error());
    }

    create(event) {
        this.linkService.create(event.newData).subscribe(() => {
            event.confirm.resolve();
            this.success('criada');
        }, () => {
            event.confirm.reject();
            this.error();
        });
    }

    edit(event) {
        this.linkService.update(event.newData).subscribe(() => {
            event.confirm.resolve();
            this.success('alterada');
        }, () => {
            event.confirm.reject();
            this.error();
        });
    }

    remove(event) {
        this.linkService.remove(event.data).subscribe(() => {
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


    goBack() {
        this._location.back();
    }
}
