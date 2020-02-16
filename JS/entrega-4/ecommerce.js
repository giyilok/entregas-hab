'use strict';
/* Programa que simula un ecommerce muy simple. Crea una tienda con un stock
que tendra uno o varios usuarios y cada uno tendra un carrito de la compra
donde se iran guardando los articulos que vaya comprando. Cuando el usuario
termine su compra por la pantalla se mostrara un ticket detallado de la misma.
*/

/*########################
##### CLASS Item  ########
########################*/
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

/*########################
##### CLASS CartItem  ####
########################*/
class CartItem {
  constructor(item) {
    this.product = item;
    this.units = 1;
  }

  increase() {
    ++this.units;
  }
}

/*########################
##### CLASS User  ########
########################*/
class User {
  #cart;
  constructor(name) {
    this.name = name;
    this.#cart = [];
  }

  //Añade un articulo especifico (item) al carrito del usuario
  addToCart(item) {
    for (const cartItem of this.#cart) {
      if (item.name === cartItem.product.name) {
        cartItem.increase();
        return;
      }
    }
    this.#cart.push(new CartItem(item));
  }

  //Añade una cantidad (numItems) de articulos del stock de la tienda de
  //forma aleatoria
  addTocartRandom(numItems, shop) {
    for (let i = 0; i < numItems; i++) {
      let value = Math.floor(Math.random() * 3);
      this.addToCart(shop.stock[value]);
    }
  }

  //Getter del carrito
  get cart() {
    return this.#cart;
  }

  //Funcion para pagar en la tienda (shop)
  pay(shop) {
    shop.checkout(this);
  }
}

/*########################
##### CLASS Shop  ########
########################*/
class Shop {
  stock = [];
  users = [];

  constructor(newStock) {
    this.stock = newStock;
  }

  //Metodo estatico de la tienda para generar la lista de articulos disponibles
  static createStock() {
    const itemNames = ['Camisa', 'Pantalon', 'Calcetines'];
    const itemPrices = [13, 27, 100];
    return itemNames.map((value, index) => new Item(itemNames[index], itemPrices[index]));
  }

  newUser(user) {
    this.users.push(user);
  }

  //Realiza el checkout de un usuario (user)
  checkout(user) {
    const total = user.cart.reduce((acc, totalItem) => {
      return acc + totalItem.product.price * totalItem.units;
    }, 0);

    console.log(``);
    console.log(``);
    console.log(`Cliente:  ${user.name}`);
    console.log(``);

    for (const cartItem of user.cart) {
      console.log(
        `Articulo: ${cartItem.product.name}   Precio: ${cartItem.product.price}   Cantidad: ${
          cartItem.units
        }   Suma: ${cartItem.product.price * cartItem.units}`
      );
    }
    console.log(``);
    console.log(`TOTAL A PAGAR:  ${total} euros`);
  }
}

//Funcion principal que pone la tienda en funcionamiento
function runShop() {
  const myShop = new Shop(Shop.createStock());
  console.log(`Articulos disponibles en la tienda :`, myShop.stock);

  //Creamos dos usuarios y añadimos articulos a sus carritos de forma manual
  //y de forma aleatoria a modo de ejemplo
  const myUser1 = new User('Guillermo');
  const myUser2 = new User('Paula');

  myUser1.addToCart(myShop.stock[0]);
  myUser1.addToCart(myShop.stock[0]);
  myUser1.addToCart(myShop.stock[0]);
  myUser1.addToCart(myShop.stock[1]);
  myUser1.addToCart(myShop.stock[1]);
  myUser1.addToCart(myShop.stock[2]);
  myUser1.addToCart(myShop.stock[2]);
  myUser1.addToCart(myShop.stock[2]);
  myUser1.addTocartRandom(10, myShop);

  myUser2.addTocartRandom(8, myShop);
  console.log(`Contenido del carrito del usuario ${myUser1.name}`, myUser1.cart);
  console.log(`Contenido del carrito del usuario ${myUser2.name}`, myUser2.cart);

  //Los usarios pagan
  myUser1.pay(myShop);
  myUser2.pay(myShop);
}

runShop();
