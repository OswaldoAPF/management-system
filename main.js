const { createApp } = Vue

createApp({
  data() {
    return {
      shoes: [],
      allShoes: [],
      carrito: [],
      cart:[],
      totalPrice:0
    }
  },
  created(){
    fetch('nike.json')
    .then(res => res.json())
    .then(res => this.shoes = res)
    .catch(err => console.log(err))
  },

  methods:{
    addToCart(shoe){
      let boolean = this.cart.some( e => e.id === shoe.id) 
      console.log(boolean)
    },

    imprimirAll: function(){
      this.allShoes = []
      this.allShoes = this.shoes
    },

    imprimirNike: function(){
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "nike")
    },

    imprimirAdidas: function(){
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "adidas")
    },

    agregarCarrito: function(){
      
    },

    comprar: function(){
      if(boolean){ //si boleano es true, modifica propiedades del carrito, no modificar, funciona bien
        this.cart.forEach( e => {
            if(e.id === shoe.id ){
             e.inCart++
             e.stock--
             e.total += e.price
             //this.cart.inCart++ //activar si hay bugs en el carrito
             //this.cart.stock--
             this.totalPrice+=shoe.price
            }
        })
      }else if(boolean===false && shoe.stock>0){this.cart.push(shoe) //si es falso añade el producto al carrito
      shoe.inCart++
      shoe.stock--
      shoe.total=shoe.price
      this.cart.inCart++
      this.cart.stock--
      this.cart.total+=this.cart.price
      this.totalPrice=this.totalPrice+shoe.total
    }
      console.log(this.cart)
      console.log(this.shoes)
  },
    },

  deleteCartProduct(product){
    //FUNCION QUE ELIMINA PRODUCTO DEL CARRITO, en proceso...
    if(product.inCart>1){
      product.inCart--
      product.stock++
      product.total=product.total-product.price
      this.totalPrice-=product.price
    }else{
      //console.log(this.cart.indexOf(product))
      product.inCart--
      product.stock++
      product.total=null
      productIndex=this.cart.indexOf(product)//guarda la ubicacion del producto en el array
      this.cart.splice(productIndex ,0) //elimina producto del array
      this.totalPrice-=product.price
    }
    productIndex=null
  }
}).mount('#app')

