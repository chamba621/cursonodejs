import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core'

@Component({
	selector:'parques',
	templateUrl:'./parques.component.html',
	styleUrls:['./parques.component.css']
})

export class ParquesComponent implements OnChanges, OnInit, OnDestroy{
	@Input() nombre: string;
	@Input('dimension') metros: number;
	public vegetacion: string;
	public abierto: boolean;

	@Output() pasarDatos = new EventEmitter();

	constructor(){
		this.nombre = 'marihuanodromo';
		this.metros = 450;
		this.vegetacion = 'hierba alta';
		this.abierto = false;
	}

	ngOnChanges(changes: SimpleChanges)
	{
		console.log("cambios en las propiedades");
	}

	ngOnInit()
	{
		console.log("metodo on init lanzado");
	}

	ngOnDestroy()
	{
		console.log("se va a eliminar el componente");
	}

	emitirEvento()
	{
		this.pasarDatos.emit({
			'nombre' : this.nombre,
		  	'metros': this.metros,
		  	'vegetacion': this.vegetacion,
		  	'abierto': this.abierto
		});
	}
}