import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'guardar-email',
  template: `
     <h4>{{title}}</h4>
     <input type="text" [(ngModel)]="emailContacto" >
     <button (click)="guardarEmail()">Guardar Email</button>
  `
})
export class GuardarEmailComponent 
// implements DoCheck, OnInit 
{
  title = 'Guardar Email';
  public emailContacto: string;

  // ngDoCheck()
  // {
  // 	this.emailContacto = localStorage.getItem('emailContacto');
  // 	// console.log("metodo docheck lanzado");
  // }

  // ngOnInit()
  // {
  // 	this.emailContacto = localStorage.getItem('emailContacto');
  // 	// console.log(localStorage.getItem('emailContacto'));
  // }
	
  guardarEmail()
  {
    localStorage.setItem('emailContacto', this.emailContacto);
  }

}
