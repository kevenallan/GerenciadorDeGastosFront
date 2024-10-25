import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        MenubarModule,
        AvatarModule,
        OverlayPanelModule,
        ButtonModule,
        TooltipModule,
        SpeedDialModule,
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
    items: MenuItem[] = [];
    inicialUsuario = '';
    nomeUsuario = '';

    constructor(private router: Router, private authService: AuthService) {
        this.items = [
            {
                label: 'Arquivos compartilhados',
                icon: 'pi pi-folder',
                command: () => {
                    this.redirecionarTelaArquivosCompartilhados();
                },
            },
        ];
    }

    redirecionarTelaArquivosCompartilhados() {
        this.router.navigate(['/arquivos-compartilhados']);
    }

    ngOnInit(): void {
        const nome = localStorage.getItem('usuario') || '';
        this.inicialUsuario = nome?.slice(0, 1).toUpperCase();
        this.nomeUsuario = nome;
    }

    sair() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
    telaPrincipal() {
        this.router.navigate(['/inicio']);
    }
    editarPerfil() {
        this.router.navigate(['/editar-perfil']);
    }
}
