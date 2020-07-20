import { Ofertas } from './shared/ofertas.model'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import {Observable, observable} from 'rxjs';
import { map, retry } from 'rxjs/operators';


 // Ao utilizar um serviço HTTP, precisamos um INJECTABLE para decorar as requisições API 

@Injectable()

export class OfertasService {

    private urlOfertas_api = 'http://localhost:3000/ofertas'
    private urlComoUsar_api = 'http://localhost:3000/como-usar'
    private urlOndeFica_api = 'http://localhost:3000/onde-fica'

    // Ao utilizar um serviço HTTP, precisamos criar uma variavel no construtor chamando este serviço 

    constructor(private http: HttpClient){

    }

    public getOfertas() {
        return this.http.get<Ofertas[]>(`${this.urlOfertas_api}?destaque=true`)
    }
    
    public getOfertasPorCategoria(categoria:string){
        return this.http.get<Ofertas[]>(`${this.urlOfertas_api}?categoria=${categoria}`)
        // .then((resposta:any) => resposta.json())
    }

    public getOfertaID(id:number) {
        return this.http.get<Ofertas[]>(`${this.urlOfertas_api}?id=${id}`)
    }

    public getComoUsarOfertaID(id:number){
        return this.http.get<Ofertas[]>(`${this.urlComoUsar_api}?id=${id}`)
    }

    public getOndeFicaOfertaID(id:number){
        return this.http.get<Ofertas[]>(`${this.urlOndeFica_api}?id=${id}`)
    }


    // Método para pesquisa 
    public pesquisaOfertas(termo: string):Observable<Ofertas[]> {
        return this.http.get(`${this.urlOfertas_api}?descricao_oferta_like=${termo}`)
        .pipe(
            //Fazendo 10 tentativas de conexões HTTP
            retry(3),
            map((res:any) => res)
            )
    }


    // Trabalhando com promisses
    // public getOfertas(): Promise<Array<Ofertas>> {
    //     return new Promise((resolve,reject) => {
    //         //algum tipo de processamento que ao finalizar chama resolse ou reject
    //         let resolva=true
    //         if (resolva) {
    //             setTimeout(() => resolve(this.ofertas), 3000)
    //         }
    //         else{
    //             reject({codigoErro: 404, mensagemErro: 'Dados não encontrado'})
    //         }
    //     })
    //     .then((ofertas: Array<Ofertas>) =>  {
    //         console.log ("Primeiro then")
    //         return ofertas
    //     })
    //     .then((ofertas: Array<Ofertas>)=> {
    //         console.log ("Segundo then")
    //         return new Promise((resolve2, reject2) => {
    //             setTimeout(() => { resolve2(ofertas)}, 3000)
    //         })
    //         .then((ofertas: Array<Ofertas>)=> {
    //             console.log ("Terceiro then executado após 3 segundos após segunda promisse")
    //             return ofertas
    //         })
    //     })
    // }
}