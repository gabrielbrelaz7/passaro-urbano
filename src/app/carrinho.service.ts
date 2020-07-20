import { ItemCarrinho } from './shared/item.carrinho.model'
import { Ofertas } from './shared/ofertas.model';
import { IfStmt } from '@angular/compiler';

export class CarrinhoService {
    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    public incluirItem(oferta:Ofertas): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(

            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )

        // Verificar se o item em questão já não existe dentro de this.itens
         let itemCarrinhoEncontrado = this.itens.find((item:ItemCarrinho) => item.id === itemCarrinho.id)

         if (itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade = itemCarrinhoEncontrado.quantidade + 1
         }

         else {
            // Incluir a instânica de Item Carrinho no Array Itens
            this.itens.push(itemCarrinho)
         }
    }

         // Calcular total dos itens do carrinho

         public totalCarrinhoCompras():number {

            let total:number = 0
            this.itens
            .map((item:ItemCarrinho) => {
                total = total + (item.valor * item.quantidade)
            })

            return total
         }


    //          // Método para pesquisa 
    // public pesquisaOfertas(termo: string):Observable<Ofertas[]> {
    //     return this.http.get(`${this.urlOfertas_api}?descricao_oferta_like=${termo}`)
    //     .pipe(
    //         //Fazendo 10 tentativas de conexões HTTP
    //         retry(3),
    //         map((res:any) => res)
    //         )
    // }


            // Adicionando quantidade no carrinho
            public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
             console.log(itemCarrinho)
        
             // Incrementar quantidade
        
            let itemCarrinhoEncontrado = this.itens.find((item:ItemCarrinho) => item.id === itemCarrinho.id)
        
                if (itemCarrinhoEncontrado) {
                  itemCarrinhoEncontrado.quantidade += 1
                }
            }

            // Subtraindo quantidade no carrinho
            public subtrairQuantidade(itemCarrinho: ItemCarrinho): void {
                console.log(itemCarrinho)
                       
                // decrementar quantidade
                       
                let itemCarrinhoEncontrado = this.itens.find((item:ItemCarrinho) => item.id === itemCarrinho.id)
                       
                    if (itemCarrinhoEncontrado) {
                        itemCarrinhoEncontrado.quantidade -= 1

                        if(itemCarrinhoEncontrado.quantidade === 0) {
                            this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado),1)
                        }
                }
            }

            public limparCarrinho(): void {
                this.itens = [];
            }
}

