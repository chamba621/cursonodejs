import { Component } from '@angular/core';

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html'
})

export class ListComponent{
  title = 'List admin';
  numbers = new Array(10);
}
