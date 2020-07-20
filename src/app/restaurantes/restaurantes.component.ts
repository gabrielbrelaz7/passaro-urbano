import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Ofertas } from '../shared/ofertas.model';

@Component({
  selector: 'purb-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  public ofertasCategoria : Ofertas[]

  // Criando atributo para criar uma parâmetro PIPE
  // public date:any = new Date(2020,0,9)

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {

    this.ofertasService.getOfertasPorCategoria('restaurante')
    .subscribe(
      (response) => {        
        this.ofertasCategoria = response;
      }
    );

  }

}
