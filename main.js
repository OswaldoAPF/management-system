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
    this.cart = JSON.parse(localStorage.getItem("cart")) || []
    
  },

  methods: {

    //------------FILTERS-------------------------------
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

      let boolean = this.cart.some(e => e.id === shoe.id)


      if (boolean) {
        this.cart.forEach(e => {
          if (e.id === shoe.id) {

            //anda bien
            e.inCart++
            e.stock--
            e.total += e.price
            this.totalPrice += shoe.price

            //no funciona
            this.allShoes.stock--
            this.shoes.stock--

          }
        })

      } else if (boolean === false && shoe.stock > 0) {
        this.cart.push(shoe)
        shoe.inCart++
        shoe.stock--
        shoe.total = shoe.price

        

        //anda bien
        this.cart.inCart++
        this.cart.stock--
        this.cart.total += this.cart.price
        this.totalPrice = this.totalPrice + shoe.total
      }

      localStorage.setItem("cart", JSON.stringify(this.cart))
      this.cart = JSON.parse(localStorage.getItem("cart")) 
       
    },


    deleteCartProduct(product) {
      
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


/*       localStorage.setItem("cart", JSON.stringify(this.cart))
      this.cart = JSON.parse(localStorage.getItem("cart"))  */

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



      //some nos da true si encuentra alguno que coincida con la condicion
      //En este caso se busca que en el array cart busque en sus objetos la propiedad "id" y si coincide con el objeto que viene por parámetro, de true, y sino false.

      

      //Creamos un condicional para hacer diferentes cosas, depentiendo de si ya existe o no el mismo objeto que viene por parametro dentro del array de carts

      //If boolean is true, se recorre el array de cart donde especificamente al objeto de cart con la propiedad id que cocincide con el objeto que viene por parametro, se le modifica, en +1 inCart, en -1 el stock, se acumula el valor del total con el valor del precio del producto.


      
        //Si boolean es false, and shoe.stock es mayor a 0, al array cart como no existe ese objeto que viene como parametro se lo pusheamos, y en el array shoe, modificamos el stock y demas.