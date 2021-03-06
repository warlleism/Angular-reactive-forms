import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service{
  constructor(private http: HttpClient) {}

  consultaCEP(cep: string) {
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
      }
    }
    return of({});
  }

  getGenero(){
    return [
      {valor: 'M', desc: 'masculino'},
      {valor: 'F', desc: 'feminino'},
      {valor: 'NB', desc: 'não-binário'}
    ]
  }
}
