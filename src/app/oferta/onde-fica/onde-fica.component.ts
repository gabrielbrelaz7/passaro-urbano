import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/ofertas.service';
import { Ofertas } from 'src/app/shared/ofertas.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'purb-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.scss'],
  providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {

  OndeFicaID: any[] 

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit(): void {

    let id = this.route.parent.snapshot.params['id']

    this.route.parent.params.subscribe(
      (response:any) => {        
        // console.log(response.id)

    this.ofertasService.getOndeFicaOfertaID(id)
    .subscribe(
      (response) => {        
        this.OndeFicaID = response
      }
      );
  })

}

}