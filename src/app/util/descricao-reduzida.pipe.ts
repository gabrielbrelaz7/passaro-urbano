import {PipeTransform, Pipe} from '@angular/core'

// Para identificar que esta classe é um PIPE e não um componente 
@Pipe({
    name: 'descricaoReduzida'
})

export class DescricaoReduzida implements PipeTransform {

    transform(texto:string):string {
        if(texto.length > 15) {
            return texto.substr(0,15) + '...'
        }

        else {
            return texto;
        }
    }

}