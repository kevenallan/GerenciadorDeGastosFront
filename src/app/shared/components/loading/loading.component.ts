import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../core/service/loading.service';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit {
    isLoading: Observable<boolean>;

    constructor(private loadingervice: LoadingService) {
        this.isLoading = this.loadingervice.loading$;
    }

    ngOnInit() {}
}
