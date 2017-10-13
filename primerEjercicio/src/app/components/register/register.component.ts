import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';

@Component({
	selector:'register',
	templateUrl:'./register.component.html',
	providers: [UserService]
})

export class RegisterComponent implements OnInit {
	public title: String;
	public user: User;
	public message: String;
	public status: String;

	constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) 
	{
		this.title = 'Registro';
		this.user = new User('', '', '', '', '', 'ROLE_USER', '');
	}

	ngOnInit()
	{
		console.log('Componente registro Cargado');
	}

	onSubmit(registerForm)
	{
		this._userService.register(this.user).subscribe(
			response => {
				if(response.user && response.user._id)
				{
					this.message = 'El registro se ha realizado de manera exitosa, inicia sesion <a [routerLink]="[\'/login\']">aquí</a>';
					this.status = 'success';
					this.user = new User('', '', '', '', '', 'ROLE_USER', '');
					registerForm.reset();
				}
				else
				{
					this.message = response.message;
					this.status = 'danger';
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
				this.message = 'Error al registrarme desde el api';
				this.status = 'danger';
			}
		);
	}
}