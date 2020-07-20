import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';
import { Ofertas } from 'src/app/shared/ofertas.model';

@Component({
  selector: 'purb-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.scss'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  comoUsarID: any[] = []
  id = this.route.parent.snapshot.params['id']


  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit(): void {

    this.route.parent.params.subscribe(
      (response:any) => {        
        // console.log(response.id)

    this.ofertasService.getComoUsarOfertaID(response.id)
      .subscribe(
        (response) => {        
          this.comoUsarID = response
        }
        );
    })

}

}
