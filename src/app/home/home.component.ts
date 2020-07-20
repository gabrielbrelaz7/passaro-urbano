import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Ofertas } from '../shared/ofertas.model';


@Component({
  selector: 'purb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  public ofertas: Array<Ofertas>

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    
      this.ofertasService.getOfertas()
      .subscribe(
        (response) => {        
          this.ofertas = response;
        }
      );
    
  }
  
}
