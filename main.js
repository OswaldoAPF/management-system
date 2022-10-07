

const { createApp } = Vue

createApp({
  data() {
    return {
      shoes: [],
      allShoes: [],
      carrito: []
      
    }
  },

  created(){
    fetch('nike.json')
    .then(res => res.json())
    .then(res => this.shoes = res)
    .catch(err => console.log(err))
  },

  methods:{

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

    }
  }
}).mount('#app')