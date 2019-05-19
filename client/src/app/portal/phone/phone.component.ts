import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../shared/models/user';
import { Phone } from '../../shared/models/phone';
import { PhoneService } from '../../services/phone.service';
import { PhoneExpense } from '../../shared/models/phone-expense';

@Component({
    selector: 'app-phone',
    templateUrl: 'phone.component.html',
    styleUrls: ['phone.component.sass']
})
export class PhoneComponent implements OnInit, OnDestroy {
    users: User[];
    user: User;
    phone: Phone;
    isUpdate: boolean;
    loading: boolean;
    phoneExpenses: PhoneExpense[];
    phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    dddMask = [/\d/, /\d/, /\d/];
    private alive = true;

    constructor(private activatedRoute: ActivatedRoute,
                private userService: UserService,
                private phoneService: PhoneService,
                private _location: Location,
                private toasterService: ToasterService) {

    }

    ngOnInit() {
        this.activatedRoute.queryParams
            .takeWhile(() => this.alive)
            .subscribe(params => {
                const userId = params['userId'];
                const phoneId = params['phoneId'];
                if (userId && phoneId) {
                    this.userService.get(userId).takeWhile(() => this.alive).subscribe(u => {
                        this.isUpdate = true;
                        this.loading = true;
                        this.user = u;
                        this.phone = this.user.phones.find(p => p.id === phoneId);
                        if (!this.phone) {
                            this.notFound();
                        }
                        this.getPhoneExpense();
                        this.loading = false;
                    });
                } else {
                    // new phone
                    this.phone = new Phone();
                    this.getAllUsers();
                }
            });
    }

    ngOnDestroy() {
        this.alive = false;
    }

    getPhoneExpense() {
        this.phoneService.get(this.phone.id).subscribe(x => {
            this.phoneExpenses = x.phoneExpenses;
        });
    }

    getAllUsers() {
        this.userService.list().takeWhile(() => this.alive).subscribe((u) => this.users = u);
    }

    save(): void {
        if (!this.validate()) {
            this.loading = false;
            return;
        }

        this.phone.ddd = this.phone.ddd.replace(/\D/g, '');
        this.phone.number = this.phone.number.replace(/\D/g, '');

        this.loading = true;
        if (this.isUpdate) {
            this.phoneService.update(this.phone)
                .takeWhile(() => this.alive)
                .subscribe(() => this.saveSucess(), () => this.saveError());
        } else {
            this.phoneService.create(this.phone, this.user.id)
                .takeWhile(() => this.alive)
                .subscribe(() => this.saveSucess(), () => this.saveError());
        }
        this.loading = false;
    }

    validate(): boolean {
        if (!this.phone.ddd || !this.phone.number || !this.user || !this.user.id) {
            this.toasterService.pop('warning', 'Erro', 'Formulario invalido!');
            return false;
        }
        return true;
    }

    saveSucess(): void {
        const status = this.isUpdate ? 'alterado' : 'criado';
        this.toasterService.pop('success', 'Concluido', `Telefone ${status} com sucesso!`);
        this._location.back();
    }

    saveError(): void {
        this.toasterService.pop('error', 'Erro', 'Ocorreu um erro ao salvar os dados do telefone!');
    }

    disablePhone(): void {
        this.phone.enabled = false;
        this.save();
    }

    enablePhone(): void {
        this.phone.enabled = true;
        this.save();
    }

    notFound() {
        this.toasterService.pop('warning', 'Não encontrado', 'Não foi possivel encontrar esse telefone!');
        this._location.back();
    }

    goBack() {
        this._location.back();
    }
}
