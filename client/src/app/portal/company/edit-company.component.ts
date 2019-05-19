import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Company } from '../../shared/models/covenant-company';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'app-edit-company',
    templateUrl: 'edit-company.component.html',
    styles: [`
        .my-drop-zone {
            border: dotted 3px lightgray;
            height: 70px;
        }

        .nv-file-over {
            border: dotted 3px red;
        }
    `]
})
export class EditCompanyComponent implements OnInit, OnChanges {
    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;
    @Output() close = new EventEmitter<boolean>();
    @Output() reload = new EventEmitter<boolean>();
    @Input() company: Company;

    constructor(private toasterService: ToasterService,
                private companyService: CompanyService) {
    }

    ngOnInit() {
        this.updateUploader();
    }

    ngOnChanges() {
        if (this.company && this.company.id) {
            this.updateUploader();
        }
    }

    updateUploader() {
        this.uploader = new FileUploader({ url: `/api/company/${this.company.id ? this.company.id : 0}/logo` });
        this.uploader.options.queueLimit = 1;
    }

    save() {
        if (!this.company || !this.company.id) {
            this.companyService.create(this.company)
                .subscribe(x => {
                    // Must have id before img update
                    this.company = x;
                    this.saveImg();

                }, () => this.error(), () => {
                    this.success();
                    this.reload.next(true);
                    this.close.next(true);
                });
        } else {
            this.companyService.update(this.company)
                .subscribe(x => {
                    this.saveImg();
                }, () => this.error(), () => {
                    this.success();
                    this.reload.next(true);
                    this.close.next(true);
                });
        }
    }

    saveImg() {
        this.uploader.setOptions({ url: `/api/company/${this.company.id}/logo` });
        this.uploader.authToken = `Bearer ${localStorage.getItem('token')}`;
        this.uploader.queue.forEach(x => {
            x.upload();
        });
    }

    closeModal() {
        this.close.next(true);
    }

    fileOverBase(e) {
        this.hasBaseDropZoneOver = e;
    }

    success() {
        this.toasterService.pop('success', 'Concluido', `Empresa cadastrada!`);
    }

    error(message ?: string) {
        this.toasterService.pop('error', 'Erro', message ? message : 'Ocorreu um erro!');
    }

}
