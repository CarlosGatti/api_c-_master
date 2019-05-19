import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Covenant } from '../../shared/models/covenant';
import { Location } from '@angular/common';
import { Company } from '../../shared/models/covenant-company';
import { CovenantService } from '../../services/covenant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-covenant-edit',
    templateUrl: 'covenant-edit.component.html',
    styleUrls: ['covenant-edit.component.sass']
})
export class CovenantEditComponent implements OnInit {
    isUpdate: boolean;
    covenant: Covenant;

    constructor(private toasterService: ToasterService,
                private activatedRoute: ActivatedRoute,
                private _location: Location,
                private covenantService: CovenantService) {
    }

    ngOnInit() {
        this.covenant = new Covenant();
        this.covenant.company = new Company();
        this.activatedRoute.queryParams
            .subscribe(params => {
                const id = params['id'];
                if (id) {
                    this.isUpdate = true;
                    this.get(id);
                }
            });
    }

    get(id: string) {
        this.covenantService.get(id).subscribe(x => this.covenant = x);
    }

    save() {
        if (this.isUpdate) {
            this.covenantService.update(this.covenant)
                .subscribe(x => this.success(), () => this.error());
        } else {
            this.covenantService.create(this.covenant, this.covenant.company.id)
                .subscribe(x => this.success(), () => this.error());
        }
    }

    success() {
        this.toasterService.pop('success', 'Concluido', `Convênio cadastrado!`);
        this.goBack();
    }

    error(message ?: string) {
        this.toasterService.pop('error', 'Erro', message ? message : 'Ocorreu um erro!');
    }

    notFound() {
        this.toasterService.pop('warning', 'Não encontrado', 'Não foi possivel encontrar esse Convênio!');
        this.goBack();
    }

    goBack() {
        this._location.back();
    }
}
