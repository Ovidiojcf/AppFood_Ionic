import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.page.html',
  styleUrls: ['./itens.page.scss'],
})
export class ItensPage implements OnInit {
  restaurants =[
      {
        uid: 'dh1',
        cover: 'assets/imgs/img1.jpeg',
        name: 'Dom Henrique 1',
        short_name: 'domhenrique1',
        cuisines: ['Almoço', 'Café', 'Hamburguer'],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100,
      },
      {
        uid: 'dh2',
        cover: 'assets/imgs/img2.jpeg',
        name: 'Dom Henrique 2',
        short_name: 'domhenrique2',
        cuisines: ['Almoço', 'Café', 'Hamburguer'],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100,
      },
      {
        uid: 'dh3',
        cover: 'assets/imgs/img3.jpeg',
        name: 'Dom Henrique 3',
        short_name: 'domhenrique3',
        cuisines: ['Almoço', 'Café', 'Hamburguer'],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100,
      },
    ];
    categories: any[] = [
      {
        id: "e00",
        name: "Italiana",
        uid: "dh1"
      },
      {
        id: "e01",
        name: "Mexicana",
        uid: "dh1"
      }
    ];
    allItems = [
      {
        category_id: "e00",
        cover: "assets/imgs/pizza.jpeg",
        desc: "Pizza de Calabreza",
        id: "i1",
        name: "Pizza",
        price: 80,
        rating: 0,
        status: true,
        uid: "dh1",
        variation: false,
        veg: false
      },
      {
        category_id: "e00",
        cover: "assets/imgs/salada.jpeg",
        desc: "Salada Especial",
        id: "i2",
        name: "Salada",
        price: 40,
        rating: 0,
        status: true,
        uid: "dh1",
        variation: false,
        veg: true
      },
      {
        category_id: "e01",
        cover: "assets/imgs/carne.jpeg",
        desc: "Medalhão de Mignon",
        id: "i3",
        name: "Carne",
        price: 120,
        rating: 0,
        status: true,
        uid: "dh1",
        variation: false,
        veg: false
      }
    ];
  data: any = {};
  itens: any[] = [];
  id: any;
  veg: boolean = false;

  constructor( private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('restaurantId')){
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      console.log(this.id);
    });
  }
  
  getItens(){
    this.data = {};
    let data : any = this.restaurants.filter(x => x.uid === this.id);
    this.data = data [0];
    this.itens = this.allItems;
  }

  getCuisine(cuisine){
    return cuisine.join(', ');
  }

  vegOnly(event){
    console.log(event.detail.checked);
  }

}
