import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Ofertas } from '../shared/ofertas.model';
import { CarrinhoService } from '../carrinho.service';
// import { interval, Observable, Observer, Subscription } from 'rxjs';
// import { strict } from 'assert';


@Component({
  selector: 'purb-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss'],

  // Não será necessário Carrinho Service poiis já está declarado em app module como escopo global
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {


  // private tempoObservableSubscription: Subscription
  // private meuObservableTesteSubscription : Subscription

  public ofertaID : Ofertas[]

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
    ) { 
    this.route = route
  }

  ngOnInit(): void {

    this.carrinhoService.exibirItens()

    // Recuperação dos parametos através de SNAPSHOT
     let id = this.route.snapshot.params['id']

    //Recuperação de parametro através do subscribe
    this.route.params.subscribe(
      (response:any) => {        
        // console.log(response.id)

        this.ofertasService.getOfertaID(response.id)
        .subscribe(
          (response) => {        
            this.ofertaID = response
            // console.log(this.ofertaID)
          }
        );
    })



//  let tempo = interval(2000)

//  this.tempoObservableSubscription = tempo.subscribe((intervalo:number)=> {
//     console.log(intervalo)
//  })


//Observable (observável)
// let meuObservable = Observable.create((observer: Observer<string>) => {
//   observer.next('Primeiro evento')
//   observer.next('Segundo evento')
//   // observer.error("Erro no evento")
//   observer.complete()
//   observer.next("Quarto evento")
// })

//Observable (observador)
// this.meuObservableTesteSubscription = meuObservable.subscribe(
//   // Este parametro lida com os eventos em si
//   (resultado:any) => console.log(resultado),
//   // Este segundo sempre será relativo ao erro
//   (erro: string) => console.log(erro),
//   // Relativo ao complete
//   () => console.log ("Eventos finalizados")
// )
    
}

ngOnDestroy() {
  //Destruindo loop infinito de interval e create do Observable
  // this.tempoObservableSubscription.unsubscribe()
  // this.meuObservableTesteSubscription.unsubscribe()
}

public adicionarItemCarrinho(oferta: Ofertas): void {
    this.carrinhoService.incluirItem(oferta)
    console.log(this.carrinhoService.exibirItens())

}

}