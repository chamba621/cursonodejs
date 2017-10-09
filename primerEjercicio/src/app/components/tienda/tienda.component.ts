import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/core'

@Component({
	selector: 'tienda',
	templateUrl: './tienda.component.html',
	styleUrls: ['./tienda.component.css'],
	animations: [
		trigger('marcar', [
			state('inactive', style({
				border: '5px solid #ccc'
			})),
			state('active', style({
				border: '5px solid yellow',
				background: 'red',
				borderRadius: '50px'
			})),
			transition('inactive => active', animate('5s linear')),
			transition('active => inactive', animate('5s linear'))
		])
	]
})

export class TiendaComponent implements OnInit{
	public titulo;
	public nombreDelParque: string;
	public miParque;
	public status;

	constructor(){
		this.titulo = 'Mi tiendita';
		this.status = 'inactive';
	}

	cambiarEstado(status){
		if(status == 'inactive')
		{
			this.status = 'active';
		}
		else
		{
			this.status = 'inactive';			
		}

	}

	mostrarNombre(){
		console.log(this.nombreDelParque);
	}

	ngOnInit(){
		$('#textoJQ').hide();
		$('#btnJQ').click(function(){
			$('#textoJQ').slideToggle();
		});

		$('#caja').dotdotdot();
	}

	verDatosParque(event)
	{
		console.log(event);
		this.miParque = event;
	}
}