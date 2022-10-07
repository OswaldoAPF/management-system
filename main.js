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
            }
        })
    }else {this.cart.push(shoe) //si es falso añade el producto al carrito
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
    if (this.cart.lenght>0){

    }else if (this.cart.lenght===0){
      console.log("no esta en el carrito")
    }
  }

}}).mount('#app')
