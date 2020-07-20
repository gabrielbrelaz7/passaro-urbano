import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Ofertas } from '../shared/ofertas.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'purb-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Ofertas[]>
  public ofertasPesquisa: string
  // public ofertasSugestao: Ofertas[] | Não é mais necessário devido ao Pipe Async
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {

    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(1000), // executa o SwitchMap após 1 segundo da última tecla digitada
        distinctUntilChanged(), // impede que termos de pesquisas iguais sejam pesquisas sequencialmente
        switchMap((termo:string) => {
          //  console.log('SwitchMap')

           // Impedir que termos de pesquisa vazios sejam pesquisados 
           if(termo.trim() === ''){
             //retornar um observable de array de ofertas vazio 
             return of(<Ofertas[]>([]))
           }
           return this.ofertasService.pesquisaOfertas(termo)
        }),

        // Trabalhando com erros no Angular 8
        catchError((err:any) => {
          // console.log(err)
          return of(<Ofertas[]>([]))
        })

        )

        // Não é necessário mais a utilização devido ao Pipe Asincy

        // this.ofertas.subscribe((ofertas:Ofertas[]) => {

        //   // Fazendo com que a váriável receba o retorno do observable
        //   this.ofertasSugestao = ofertas
        //   console.log(this.ofertasSugestao)
        // })
      }

        // Implementando função pesquisa declarada com Event Bindding  
        public pesquisa(event: Event):void {

          this.ofertasPesquisa = (<HTMLInputElement>event.target).value
          // console.log(this.ofertasPesquisa)

          // console.log('Keyup' + this.ofertasPesquisa)
          this.subjectPesquisa.next(this.ofertasPesquisa)
      
          // // Criamos um subscribe para tratar os valores do observable
          // this.ofertas.subscribe(
          //   (ofertas:Ofertas[]) => console.log(ofertas),
          //   (erro:any) => console.log('Erro status:' , erro.status),
          //   () => console.log('Fluxo de Eventos completo')
          // )
        }

        public limpaPesquisa(): void{
          this.subjectPesquisa.next('')
        }
      

}
