import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-orders',
  templateUrl: './last-orders.component.html',
  styleUrls: ['./last-orders.component.scss'],
})
export class LastOrdersComponent  implements OnInit {
  @Input() lastOrders: any;
  constructor() { }

  ngOnInit() {}

}
