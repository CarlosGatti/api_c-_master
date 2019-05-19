import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    { title: 'Início', icon: 'fa fa-home', link: '/portal/home' },
    { title: 'Despesas telefone', icon: 'fa fa-phone', link: '/portal/user-phones' },
    { title: 'Relatório Despesas', icon: 'fa fa-line-chart', link: '/portal/report' },
    { title: 'Cadastros de despesas', icon: 'fa fa-dollar', link: '/portal/expense' },
    { title: 'Empresas', icon: 'fa fa-building', link: '/portal/companies' },
    { title: 'Convênios', icon: 'fa fa-handshake-o', link: '/portal/covenant' },
    { title: 'Usuários', icon: 'fa fa-users', link: '/portal/users' },
    // { title: 'Configurações', icon: 'fa fa-gear', link: '/portal/config', }
] as any;
