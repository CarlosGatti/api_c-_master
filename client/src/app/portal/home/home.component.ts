import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../../services/phone.service';
import { Phone } from '../../shared/models/phone';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { CovenantService } from '../../services/covenant.service';
import { CompanyService } from '../../services/company.service';
import { LinkService } from "../../services/link.service";
import { Link } from "../../shared/models/link";


@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
    phones: Phone[];
    phonesLenght: number;

    users: User[];
    usersLenght: number;

    covenantCount: number;
    CompanyCount: number;

    links: Link[];

    constructor(private phoneService: PhoneService,
                private userService: UserService,
                private covenantService: CovenantService,
                private covenantCompanyService: CompanyService,
                private linkService: LinkService) {

    }

    ngOnInit() {
        this.phoneService.count().subscribe(x => {
            this.phonesLenght = x;
        });
        this.userService.count().subscribe(x => {
            this.usersLenght = x;
        });
        this.covenantService.count().subscribe(x => {
            this.covenantCount = x ? x : 0;
        });
        this.covenantCompanyService.count().subscribe(x => {
            this.CompanyCount = x ? x : 0;
        });
        this.phoneService.list().subscribe(x => this.phones = x);
        this.userService.list().subscribe(x => this.users = x);

        this.linkService.list().subscribe(x => this.links = x);
    }
}
