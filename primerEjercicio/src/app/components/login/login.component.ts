import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	providers: [UserService]
})

export class LoginComponent implements OnInit {
	public title: String;
	public user: User;
	public identity;
	public token;
	public status;

	constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) 
	{
		this.title = 'Identificate';
		this.user = new User('', '', '', '', '', 'ROLE_USER', '');
	}

	ngOnInit()
	{
		console.log('Componente login Cargado');
	}

	onSubmit()
	{
		//loguear usuario y obtener objeto
		this._userService.signUp(this.user).subscribe(
			response => {
				this.identity = response.user;

				if(!this.identity || !this.identity._id)
				{
					alert("no se pudo logear el usuario");
				}
				else
				{
					// this.identity.password = '';
					console.log(this.identity);
					let userCopy = Object.assign({}, this.user);
					//conseguir token
					this._userService.signUp(userCopy, 'true').subscribe(
						response => {
							this.token = response.token;

							if(this.token.length <= 0)
							{
								alert('El token no se ha generado');
							}
							else
							{
								console.log(this.token);
								this.status = 'success';
							}
						},
						error => {
							console.log(<any>error);
						}
					);
				}
			},
			error => {
				var errorMessage = <any>error;
				if(errorMessage != null)
				{
					var body = JSON.parse(error._body);
					this.status = 'error';
				}
			}
		);
	}
}