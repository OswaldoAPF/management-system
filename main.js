const { createApp } = Vue

createApp({
  data() {
    return {
      shoes: [],
      allShoes: [],
      carrito: [],
      openModalNav: false,
      login: false
      
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
      this.openModalNav = false
    },

    imprimirNike: function(){
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "nike")
      this.openModalNav = false
    },

    imprimirAdidas: function(){
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "adidas")
      this.openModalNav = false
    },

    agregarCarrito: function(){
      
    },

    comprar: function(){

    }
  }
  
}).mount('#app')
