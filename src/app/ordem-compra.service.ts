import { Pedido } from './shared/pedido.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const URL_API = 'http://localhost:3000';

@Injectable()

export class OrdemCompraService {

    constructor(private http: HttpClient){}

    public efetivarCompra(pedido: Pedido): Observable<any> {

        // Aplicando um cabeçalho do tipo JSON/POST

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        }
        
        return this.http.post(
            `${URL_API}/pedidos`,
            //  Anexando o body da nossa requisição

            pedido,
            // console.log(pedido)
        )
        
        .pipe(
            // Mapeando a resposta somente para o item que quero
            map((resposta) => 
                resposta['id'])
            )
    }
}