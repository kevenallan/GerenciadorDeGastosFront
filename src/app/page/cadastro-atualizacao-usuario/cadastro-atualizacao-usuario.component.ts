import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/service/usuario.service';
import { AuthService } from '../../core/service/auth.service';
import { AlertService } from '../../core/service/alert.service';
import { UsuarioModel } from '../../core/model/usuario.model';
import { LoginDTO } from '../../core/dto/login.dto';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuComponent } from "../../shared/components/menu/menu.component";

@Component({
    selector: 'app-cadastro-atualizacao-usuario',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, TooltipModule, MenuComponent],
    templateUrl: './cadastro-atualizacao-usuario.component.html',
    styleUrl: './cadastro-atualizacao-usuario.component.scss',
})
export class CadastroAtualizacaoUsuarioComponent implements OnInit {
    cadastroAtualizacaoForm!: FormGroup;
    isEditarPerfil: boolean = false;
    isUsuarioGoogle: boolean = false;
    msgVoltar = 'Tela de login';
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private alertService: AlertService
    ) {}

    async ngOnInit(): Promise<void> {
        this.cadastroAtualizacaoForm = this.formBuilder.group(
            {
                nome: ['', Validators.required],
                email: [
                    '',
                    [
                        Validators.required,
                        Validators.email,
                        Validators.pattern(
                            '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                        ),
                    ],
                ],
                usuario: ['', [Validators.required, Validators.minLength(3)]],
                senha: ['', [Validators.required, Validators.minLength(3)]],
                confirmarSenha: ['', Validators.required],
            },
            { validators: this.senhasIguais }
        );

        if (this.router.url === '/editar-perfil') {
            this.isEditarPerfil = true;
            this.isUsuarioGoogle =
                this.authService.isUsuarioGoogle() === true ? true : false;

            this.msgVoltar = 'Tela inicial';
            const usuarioLogado = await this.usuarioService.dadosUsuario();
            this.cadastroAtualizacaoForm.setValue({
                nome: usuarioLogado.nome,
                email: usuarioLogado.email,
                usuario: usuarioLogado.usuario,
                senha: usuarioLogado.senha,
                confirmarSenha: usuarioLogado.senha,
            });
            if (this.isUsuarioGoogle) {
                this.cadastroAtualizacaoForm.get('email')?.disable();
                this.cadastroAtualizacaoForm.get('usuario')?.disable();
                this.cadastroAtualizacaoForm.get('senha')?.disable();
                this.cadastroAtualizacaoForm.get('confirmarSenha')?.disable();
            }
        }
    }

    senhasIguais(formGroup: FormGroup) {
        return formGroup.get('senha')?.value ===
            formGroup.get('confirmarSenha')?.value
            ? null
            : { senhasDiferentes: true };
    }

    onSubmit() {
        if (this.cadastroAtualizacaoForm.valid) {
            if (this.isEditarPerfil) {
                this.atualizarUsuario();
            } else {
                this.cadastrar();
            }
        } else {
            // Marcar todos os campos como "tocados" para mostrar mensagens de erro
            this.cadastroAtualizacaoForm.markAllAsTouched();
        }
    }

    voltar() {
        this.router.navigate(['/login']);
    }

    cadastrar() {
        const usuario: UsuarioModel = this.getUsuario();

        this.usuarioService
            .cadastro(usuario)
            .subscribe((loginDTO: LoginDTO) => {
                if (loginDTO) {
                    this.authService.setLoginStorage(loginDTO);
                    this.router.navigate(['/inicio']);
                }
            });
    }

    async atualizarUsuario() {
        const usuario: UsuarioModel = this.getUsuario();

        if (this.isUsuarioGoogle) {
            await this.usuarioService.atualizarUsuarioGoogle(usuario);
        } else {
            await this.usuarioService.atualizarUsuario(usuario);
        }
        this.authService.setNomeUsuarioStorage(usuario.nome);
        this.router.navigate(['/inicio']);
    }
    getUsuario() {
        const form = this.cadastroAtualizacaoForm;

        const usuario: UsuarioModel = {
            nome: form.get('nome')?.value,
            email: form.get('email')?.value,
            usuario: form.get('usuario')?.value,
            senha: form.get('senha')?.value,
        };
        return usuario;
    }

    async deletar() {
        const isDeletar = await this.alertService.showConfirmationAlertWarning(
            'Deletar conta do usuário',
            'Tem certeza que deseja deletar sua conta?'
        );
        if (isDeletar) {
            await this.usuarioService.deletar();
            this.authService.logout();
            this.router.navigate(['/login']);
        }
    }
}
