import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { CadastroAtualizacaoUsuarioComponent } from './page/cadastro-atualizacao-usuario/cadastro-atualizacao-usuario.component';
import { GerenciadorDeGastosComponent } from './page/gerenciador-de-gastos/gerenciador-de-gastos.component';
import { LoginGuard } from './core/guard/login.guard';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    {
        path: 'inicio',
        component: GerenciadorDeGastosComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'cadastrar-usuario',
        component: CadastroAtualizacaoUsuarioComponent,
    },
    {
        path: 'editar-perfil',
        component: CadastroAtualizacaoUsuarioComponent,
    },
    { path: '**', redirectTo: '/login' },
];
