import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Ofertas } from '../shared/ofertas.model';

@Component({
  selector: 'purb-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.scss'],
  providers: [OfertasService]
})
export class DiversaoComponent implements OnInit {

  public ofertasCategoria : Ofertas[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {

    this.ofertasService.getOfertasPorCategoria('diversao')
    .subscribe(
      (response) => {        
        this.ofertasCategoria = response;
      }
    );

  }

}
