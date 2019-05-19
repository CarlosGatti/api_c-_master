import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { Address } from '../../shared/models/address';
import { roles } from '../../shared/enums/roles';
import { PasswordReset } from '../../shared/models/password-reset';
import { ConfigService } from '../../services/config.service';
import * as cep from 'cep-promise';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileImgModalComponent } from './profile-img-modal.component';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {
    isUpdate: boolean;
    isEditingSelf: boolean;
    loading: boolean;
    user = new User();
    roles = roles;
    addressEnabled = true;
    cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    objPassowrdReset = new PasswordReset();
    private alive = true;

    constructor(private modalService: NgbModal,
                private activatedRoute: ActivatedRoute,
                private userService: UserService,
                private _location: Location,
                private toasterService: ToasterService,
                private configService: ConfigService) {

    }

    ngOnInit() {
        // in case user is editing self
        this.activatedRoute.params
            .takeWhile(() => this.alive)
            .subscribe(params => {
                if (params['me']) {
                    const userId = localStorage.getItem('userId');
                    this.isEditingSelf = true;
                    this.getUser(userId);
                }
            });
        // editing any user
        this.activatedRoute.queryParams
            .takeWhile(() => this.alive)
            .subscribe(params => {
                const userId = params['id'];
                if (userId) {
                    this.getUser(userId);
                }
            });
        // if none of the above a new user is being created
        if (!this.isUpdate && this.user && !this.user.address) {
            this.isUpdate = false;
            this.user.role = 'regular';
            this.user.address = new Address();
            this.getDefaultPassword();
        }
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }

    getDefaultPassword() {
        this.configService.list().takeWhile(() => this.alive).subscribe(x => {
            const defaultPassword = x.find(c => c.key === 'defaultPassword');
            if (defaultPassword && defaultPassword.value) {
                this.user.password = defaultPassword.value;
            }
        });
    }

    getUser(userId: string): void {
        this.loading = true;
        this.isUpdate = true;
        this.userService.get(userId)
            .takeWhile(() => this.alive)
            .subscribe((u) => {
                this.user = u;
                if (!this.user.address) {
                    this.user.address = new Address();
                }
                this.loading = false;
            });
    }

    updateAddress() {
        this.addressEnabled = true;
        const cepNumber = this.user.address.zipcode.replace(/\D/g, '');
        if (cepNumber && cepNumber.length === 8) {
            cep(cepNumber).then((a) => {
                this.user.address.country = 'Brasil';
                this.user.address.street = a.street;
                this.user.address.city = a.city;
                this.user.address.state = a.state;
                this.user.address.neighborhood = a.neighborhood;
                this.addressEnabled = false;
            }).catch(() => {
                    this.toasterService.pop('warning', 'Erro', 'Ocorreu um erro ao pesquisar por este cep!');
                    this.addressEnabled = false;
                }
            );
        }
    }

    findRoleName(roleCode: string): string {
        const role = this.roles.find(x => x.code === roleCode);
        return role && role.name ? role.name : 'desconhecida';
    }

    save(): void {
        this.loading = true;
        if (!this.validate()) {
            this.loading = false;
            return;
        }
        if (this.isUpdate) {
            this.userService.update(this.user)
                .takeWhile(() => this.alive)
                .subscribe(() => this.saveSucess(), () => this.saveError());
        } else {
            this.userService.create(this.user)
                .takeWhile(() => this.alive)
                .subscribe(() => this.saveSucess(), () => this.saveError());
        }
        this.loading = false;
    }

    validate(): boolean {
        if (!this.user.email || !this.user.name || !this.user.password && !this.isUpdate) {
            this.toasterService.pop('warning', 'Erro', 'Formulario invalido! Confira se os campos estão todos preenchidos');
            return false;
        }
        return true;
    }

    saveSucess(): void {
        const status = this.isUpdate ? 'alterado' : 'criado';
        this.toasterService.pop('success', 'Concluido', `Usuario ${status} com sucesso!`);
        this._location.back();
    }

    saveError(): void {
        const onCreate = this.isUpdate ? '' : 'Talvez esse email já esteja em nossa base de dados.';
        this.toasterService.pop('error', 'Erro', `Ocorreu um erro ao salvar os dados do usuario. ${onCreate}`);
    }

    disableUser(): void {
        this.user.enabled = false;
        this.save();
    }

    enableUser(): void {
        this.user.enabled = true;
        this.save();
    }

    goBack() {
        this._location.back();
    }

    changePassword() {
        if (this.validateResetPassword()) {
            const userId = localStorage.getItem('userId');
            this.userService.resetPassword(userId, this.objPassowrdReset)
                .takeWhile(() => this.alive)
                .subscribe(() => this.saveSucess(), () => this.saveError());
        }
    }

    validateResetPassword(): boolean {
        if (!this.objPassowrdReset.oldPassword || !this.objPassowrdReset.newPassword
            || !this.objPassowrdReset.newPasswordConfirm) {
            this.toasterService.pop('warning', 'Erro', 'Formulário inválido!');
            return false;
        } else if (this.objPassowrdReset.newPassword !== this.objPassowrdReset.newPasswordConfirm) {
            this.toasterService.pop('warning', 'Erro', 'Senhas não conferem!');
            return false;
        }
        return true;
    }

    changeImg() {
        const activeModal = this.modalService.open(ProfileImgModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.userId = this.user.id;
    }
}
