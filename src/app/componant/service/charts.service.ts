import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environments';
import { roots } from './../shared/config/endPoints';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  apiUrl = environment?.apiUrl;
  apiKey = environment?.apiKey;
  apiChartUrl = environment?.apiChartUrl;
  constructor(private http:HttpClient) { }
  Getchartinfo(){
    return this.http.get("http://localhost:3000/sales");
  }
  getlatest(): Observable<any> {
    const url = `${this.apiUrl + roots?.endpoint?.latest}?access_key=${this.apiKey}`;
    return this.http.get(url);
  }

}
