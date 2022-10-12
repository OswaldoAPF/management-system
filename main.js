const { createApp } = Vue

createApp({
  data() {
    return {
      shoes: [],
      allShoes: [],
      page: "home",
      openModalNav: false,
      login: false,
      cart: [],
      totalPrice: 0,

      //favs
      favShoes: [],
    }

  },
  created() {
    fetch('nike.json')
      .then(res => res.json())
      .then(res => {
        this.shoes = res
      })
      .catch(err => console.log(err))


    this.favShoes = JSON.parse(localStorage.getItem("fav")) || []
  },

  methods: {

    printAll: function () {
      this.allShoes = []
      this.allShoes = this.shoes
      this.openModalNav = false
    },

    printNike: function () {
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "nike")
      this.openModalNav = false
      this.page = "nike"
    },

    printAdidas: function () {
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "adidas")
      this.openModalNav = false
      this.page = "adidas"
    },

    printPuma: function () {
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "puma")
      this.openModalNav = false
      this.page = "puma"
    },

    // -------------------CART----------------------------- 
    addToCart(shoe) { //BENJA
      let boolean = this.cart.some(e => e.id === shoe.id) //
      console.log(boolean)

      if (boolean) { //si boleano es true, modifica propiedades del carrito, no modificar, funciona bien
        this.cart.forEach(e => {
          if (e.id === shoe.id) {
            e.inCart++
            e.stock--
            e.total += e.price
            //this.cart.inCart++ //activar si hay bugs en el carrito
            //this.cart.stock--
            this.totalPrice += shoe.price
          }
        })
      } else if (boolean === false && shoe.stock > 0) {
        this.cart.push(shoe) //si es falso añade el producto al carrito
        shoe.inCart++
        shoe.stock--
        shoe.total = shoe.price
        this.cart.inCart++
        this.cart.stock--
        this.cart.total += this.cart.price
        this.totalPrice = this.totalPrice + shoe.total
      }

      console.log(this.cart)
      console.log(this.shoes)
    },
    deleteCartProduct(product) {
      //FUNCION QUE ELIMINA PRODUCTO DEL CARRITO, en proceso...
      if (product.inCart > 1) {
        product.inCart--
        product.stock++
        product.total = product.total - product.price
        this.totalPrice -= product.price
      } else {
        //console.log(this.cart.indexOf(product))
        product.inCart--
        product.stock++
        product.total = null
        productIndex = this.cart.indexOf(product)//guarda la ubicacion del producto en el array
        this.cart.splice(productIndex, 0) //elimina producto del array
        this.totalPrice -= product.price
      }
      productIndex = null
    },
    buy() {
      console.log(this.shoes[0])
      let lenght = this.shoes.length;
      for (let a = 0; a < lenght; a++) {
        this.shoes[a].inCart = 0
      }
      this.cart = []
      this.totalPrice = 0

      //this.shoes.inCart=0
      alert("Thaks for the purchase")
    },

    // --------------------FAVORITES---------------------
    addToFav: function (product) {
      if (!this.favShoes?.some(shoe => shoe.title === product.title)) {

        this.favShoes.push(product)
        let shoe = this.shoes.filter(e => e.id === product.id)
        shoe[0].fav = true



      } else {
        let shoe = this.shoes.filter(e => e.id === product.id)
        console.log(shoe);
        shoe[0].fav = false

        this.favShoes = this.favShoes?.filter(shoe => shoe.title !== product.title)
      }

      localStorage.setItem("fav", JSON.stringify(this.favShoes))
      this.favShoes = JSON.parse(localStorage.getItem("fav"))

      console.log(product);
    },

    printFav: function () {
      this.openModalNav = false
      this.favShoes = this.favShoes
      this.page = "fav"

    },

  }



}).mount('#app')


