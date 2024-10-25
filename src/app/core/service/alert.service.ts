import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor() {}

    showSuccessAlert(titulo: string) {
        Swal.fire({
            title: titulo,
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'swal2-custom-confirm',
            },
        });
    }

    showWarningAlert(texto: string) {
        Swal.fire({
            title: 'Atenção!',
            text: texto,
            icon: 'warning',
            confirmButtonText: 'OK',
            customClass: {},
        });
    }

    showErrorAlert(texto: string) {
        Swal.fire({
            title: 'Erro',
            text: texto,
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {},
        });
    }

    async showConfirmationAlertWarning(titulo: string, texto: string) {
        const result = await Swal.fire({
            title: titulo,
            text: texto,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {},
        });
        return result.isConfirmed;
    }
}
