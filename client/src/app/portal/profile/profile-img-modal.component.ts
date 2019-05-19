import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'app-profile-img-modal',
    templateUrl: 'profile-img-modal.component.html',
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
export class ProfileImgModalComponent implements OnInit {
    public uploader: FileUploader;
    userId: string;
    public hasBaseDropZoneOver = false;

    constructor(private activeModal: NgbActiveModal) {
    }

    ngOnInit() {
        this.uploader = new FileUploader({ url: `/api/user/${this.userId}/photo` });
        this.uploader.options.queueLimit = 1;
        this.uploader.authToken = `Bearer ${localStorage.getItem('token')}`;
    }

    closeModal() {
        this.activeModal.close();
    }

    fileOverBase(e) {
        this.hasBaseDropZoneOver = e;
    }
}
