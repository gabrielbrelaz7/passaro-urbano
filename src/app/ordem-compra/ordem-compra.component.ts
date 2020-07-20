import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item.carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.scss'],
    
  // Não será necessário Carrinho Service pois já está declarado em app module como escopo global
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit { 

  public idPedidoCompra:number 
  public itensCarrinho: ItemCarrinho[] = []

  // public totalCarrinho:number

  // Um form group corresponde a um formulário do template, enquanto o formControl aos 
  //elementos do formulário

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null ,[Validators.required, Validators.minLength(1), Validators.maxLength(20)]), 
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(private ordemCompraService: OrdemCompraService, public carrinhoService: CarrinhoService) { }

  ngOnInit() {

    // Associando o exibir Itens do Carrinho ao array itensCarinho para fazer o data binding

    this.itensCarrinho = this.carrinhoService.exibirItens()
    // this.totalCarrinho = this.carrinhoService.totalCarrinhoCompras()

  }

  public confirmarCompra(): void {
    if(this.formulario.status === 'INVALID'){
      this.formulario.get('endereco').markAllAsTouched()
      this.formulario.get('numero').markAllAsTouched()
      this.formulario.get('complemento').markAllAsTouched()
      this.formulario.get('formaPagamento').markAllAsTouched()
    }

    else {

      // Incluir pedidos somente se o formulário itens
      if (this.carrinhoService.exibirItens().length === 0){
        alert("Você não selecionou nenhum item!")
      }

      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoService.exibirItens()        
        )
        console.log(pedido)

        this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((resposta:number) => {
            this.idPedidoCompra = resposta
            console.log(this.idPedidoCompra)

            this.carrinhoService.limparCarrinho()
        })
    }

  }

        public adicionar(item:ItemCarrinho):void {
          this.carrinhoService.adicionarQuantidade(item)
        }

        public subtrair(item:ItemCarrinho):void {
          this.carrinhoService.subtrairQuantidade(item)
        }
}
