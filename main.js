const { createApp } = Vue

createApp({
  data() {
    return {
      shoes: [],
      cart:[],
      totalCart:[]
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
      let boolean = this.cart.some( e => e.id === shoe.id) //
      console.log(boolean)

      if(boolean){ //si boleano es true, modifica propiedades del carrito, no modificar, funciona bien
        this.cart.forEach( e => {
            if(e.id === shoe.id ){
             e.inCart++
             e.stock--
             e.total += e.price
             //this.cart.inCart++ //activar si hay bugs en el carrito
             //this.cart.stock--
            }
        })
    }else if(boolean===false && shoe.stock>0){this.cart.push(shoe) //si es falso añade el producto al carrito
      shoe.inCart++
      shoe.stock--
      shoe.total=shoe.price
      this.cart.inCart++
      this.cart.stock--
      this.cart.total+=this.cart.price
    }

      console.log(this.cart)
      console.log(this.shoes)
  },
  deleteCartProduct(product){
    //FUNCION QUE ELIMINA PRODUCTO DEL CARRITO, en proceso...
    if(product.inCart>1){
      product.inCart--
      product.stock++
      //reponer stock del array shoes
    }else{
      //console.log(this.cart.indexOf(product))
      product.inCart--
      product.stock++
      productIndex=this.cart.indexOf(product)//guarda la ubicacion del producto en el array
      this.cart.splice(productIndex ,0) //elimina producto del array
    }
    productIndex=null
  }

}}).mount('#app')
