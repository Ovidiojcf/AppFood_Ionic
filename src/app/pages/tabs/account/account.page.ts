import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  lastOrders: any[] = [];
  isLoading: boolean = false;
  model: any = {
    icon: 'fast-food-outline',
    title: "Nenhum pedido encontrado."
  }

  constructor() {}

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.lastOrders = [
        {
          name: 'Dom Henrique',
          location: 'Guarapuava, Paraná',
          price: 60.00,
          status: 'Entregue',
          items: ['Pizza x2', 'Burguer x2'],
          date: 'Fevereiro 28, 2024'
          },
          {
          name: 'Dom Henrique 2',
          location: 'Guarapuava, Paraná',
          price: 60.00,
          status: 'Entregue',
          items: ['Pizza x1'],
          date: 'Março 18, 2024'
          },
          {
          name: 'Dom Henrique 3',
          location: 'Guarapuava, Paraná',
          price: 60.00,
          status: 'Entregue',
          items: ['Salada Especial'],
          date: 'Outubro 05, 2024'
          }

      ];
      this.isLoading = false;
    },2200);
  }
}
