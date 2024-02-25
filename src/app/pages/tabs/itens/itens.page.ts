import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
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
        addres: 'Santarém- PA',
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
  cartData: any = {};
  storeData: any = {};
  itens: any[] = [];
  id: any;
  veg: boolean = false;

  constructor( private route: ActivatedRoute, private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('restaurantId')){
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      console.log(this.id);
    });
    this.getItens();//função para carregar
  }
  
  async getItens(){
    this.data = {};
    let data : any = this.restaurants.filter(x => x.uid === this.id);
    this.data = data [0];
    this.itens = this.allItems.filter(x => x.uid === this.id );
    this.cartData = {};
    this.storeData = {};
    let cart: any = await this.getCart();
    if(cart?.value){
      this.storeData = JSON.parse(cart.value);
      if(this.id == this.storeData.restaurant.uid &&
        this.allItems.length > 0 ){
          this.allItems.forEach((element: any) => {
            this.storeData.forEach(ele => {
              if(element.id != ele.id) return;
              element.quantity = ele.quantity;
            });
          });
        }
    }
    this.cartData.totalItem = this.storeData.totalItem;
    this.cartData.totalPrice = this.storeData.totalPrice;
  }

  async getCart(){
    return Preferences.get({key: 'cart'});
  }

  getCuisine(cuisine){
    return cuisine.join(', ');
  }

  vegOnly(event){
    console.log(event.detail.checked);
    if(event.detail.checked == true){
      this.itens = this.allItems.filter(x => x.veg == true);
    }else{
      this.itens = this.allItems;
    }
  }

  quantityPlus(item,index){
    try{
      if(!this.itens[index].quantity || this.itens[index].quantity == 0){
        this.itens[index].quantity = 1;
      }else{
        this.itens[index].quantity += 1;
      }
      this.calculate();
    }catch(e){
      console.log(e);
    }
  }

  quantityMinus(item,index){
    if(this.itens[index].quantity !==0){
      this.itens[index].quantity -=1;
    }else{
      this.itens[index].quantity = 0;
    }
    this.calculate();
  }

  async saveToCart(){
    try {
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cartData)
      })
    } catch (e) {
      console.log(e);
    }
  }

  async viewCart(){
    if(this.cartData.itens && this.cartData.itens.length >0){
      await this.saveToCart();
      this.router.navigate([this.router.url + '/cart']);
    }
  }

  calculate(){
    this.cartData.itens = {};
    let item = this.itens.filter( x => x.quantity > 0);
    this.cartData.itens = item;
    console.log(this.cartData);
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    item.forEach(element => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice += (parseFloat(element.price)* parseFloat(element.quantity()));
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    if(this.cartData.totalItem == 0){
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
  }

}
