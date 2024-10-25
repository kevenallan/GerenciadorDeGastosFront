import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseModel } from '../model/response.model';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    constructor(private http: HttpClient) {}

    getConfig(): Observable<any> {
        return this.http
            .get<ResponseModel>(`${environment.urlBackEnd}/firebase/get-config`)
            .pipe(
                map((response: ResponseModel) => response.model)
            );
    }
}
