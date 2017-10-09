import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'mostrar-email',
  template: `
     <div *ngIf="emailContacto">
        <h4>{{title}}</h4>
        Email de contacto: <strong>{{emailContacto}}</strong>
        <button (click)="eliminarEmailContacto()">Eliminar email de contacto</button>
     </div>
        
  `
})
export class MostrarEmailComponent implements DoCheck, OnInit {
  title = 'Mostrar Email';
  public emailContacto: string;

  ngDoCheck()
  {
  	this.emailContacto = localStorage.getItem('emailContacto');
  }

  ngOnInit()
  {
  	this.emailContacto = localStorage.getItem('emailContacto');
  }

	eliminarEmailContacto(){
		localStorage.removeItem('emailContacto');
		// localStorage.clear();
		this.emailContacto = null;
	}

}
