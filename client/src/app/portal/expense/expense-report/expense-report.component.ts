import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { PhoneService } from '../../../services/phone.service';
import { PhoneExpense } from '../../../shared/models/phone-expense';

@Component({
    selector: 'app-expense-report',
    template: `
        <nb-card>
            <nb-card-header>Despesas</nb-card-header>
            <nb-card-body>
                <app-loader *ngIf="loading"></app-loader>
                <h1 *ngIf="noData && !loading">Ainda não há despesas cadastradas!</h1>
                <div echarts [options]="options" class="echart"></div>
            </nb-card-body>
        </nb-card>

        <app-phone-expense [disableControls]="true"
                           [phoneExpenses]="phoneExpenses"
                           *ngIf="phoneExpenses?.length > 0 && !hideTable"></app-phone-expense>
    `,
    styleUrls: ['expense-report.component.sass']
})
export class ExpenseReportComponent implements AfterViewInit, OnDestroy {
    options: any = {};
    themeSubscription: any;
    months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    series = [];
    legend = [];
    noData = false;
    loading = true;
    phoneExpenses: PhoneExpense[];
    @Input() hideTable: boolean;

    constructor(private theme: NbThemeService,
                private phoneService: PhoneService) {
    }

    ngAfterViewInit() {
        this.getExpenseResume();
        if (!this.hideTable) {
            this.getAllPhonesExpeses();
        }
    }

    getOptions() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const echarts: any = config.variables.echarts;

            this.options = {
                backgroundColor: echarts.bg,
                color: [colors.danger, colors.primary, colors.info],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: echarts.tooltipBackgroundColor,
                        },
                    },
                },
                legend: {
                    left: 'left',
                    data: this.legend,
                    textStyle: {
                        color: echarts.textColor,
                    },
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.months,
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: echarts.splitLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                series: [
                    ...this.series
                ],
            };
        });
    }

    getExpenseResume() {
        this.phoneService.GetPhoneExpenseResume().subscribe(x => {
            if (x.length > 0) {
                x.forEach(y => {
                    this.series.push({
                        name: y.year,
                        type: 'line',
                        data: y.data
                    });
                    this.legend.push(y.year.toString());
                });
                this.getOptions();
            } else {
                this.noData = true;
            }
            this.loading = false;
        });
    }

    getAllPhonesExpeses() {
        this.phoneService.getAllPhoneExpenses().subscribe(x => {
            this.phoneExpenses = x;
        });
    }

    ngOnDestroy(): void {
    }
}
