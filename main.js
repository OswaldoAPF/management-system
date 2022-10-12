const { createApp } = Vue

createApp({
  data() {
    return {
      shoes: [],
      allShoes: [],
      cart:[],
      totalPrice:0,
      openModalNav: false,
      page: "home",
      filter:false,
      filterCategory:"none"
    }
  },
  created(){
    fetch('nike.json')
    .then(res => res.json())
    .then(res => this.shoes = res)
    .catch(err => console.log(err))
    //local storage
    this.shoes=localStorage.getItem("shoes") ||[]
    console.log(this.shoes)
    this.cart=JSON.parse(localStorage.getItem("cart"))|| []
  },

  methods:{
    addToCart(shoe){ //BENJA
      let boolean = this.cart.some( e => e.id === shoe.id) //
      console.log(boolean)

      if(boolean){ //si boleano es true, modifica propiedades del carrito, no modificar, funciona bien
        this.cart.forEach( e => {
            if(e.id === shoe.id ){
             e.inCart++
             e.stock--
             e.total += e.price
             this.cart.inCart++ //activar si hay bugs en el carrito
             this.cart.stock--
             this.totalPrice+=shoe.price
             localStorage.setItem("cart",JSON.stringify(this.cart))
             localStorage.setItem("shoes",JSON.stringify(this.shoes))
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
      localStorage.setItem("cart",JSON.stringify(this.cart))
      localStorage.setItem("shoes",JSON.stringify(this.shoes))
    }

      console.log(this.cart)
      console.log(this.shoes)
  },
  deleteCartProduct(product){    //FUNCION QUE ELIMINA PRODUCTO DEL CARRITO
    if(product.inCart>1){
      product.inCart--
      product.stock++
      product.total=product.total-product.price
      this.totalPrice-=product.price
      localStorage.setItem("cart",JSON.stringify(this.cart))
      localStorage.setItem("shoes",JSON.stringify(this.shoes))
    }else{
  
      product.inCart--
      product.stock++
      product.total=null
      productIndex=this.cart.indexOf(product)//guarda la ubicacion del producto en el array
      this.cart.splice(productIndex ,0) //elimina producto del array 
      this.totalPrice-=product.price
      localStorage.removeItem("cart")
      localStorage.setItem("shoes",JSON.stringify(this.shoes))
    }
    productIndex=null
  },
  buy(){ 
    console.log(this.shoes[0])
    let lenght=this.shoes.length;
    for(let a=0 ; a<lenght;a++){
      this.shoes[a].inCart=0
    }
    this.cart=[]
    this.totalPrice=0
   
    //this.shoes.inCart=0
    alert("Thaks for the purchase")
  },
  //KEILA
    printPuma: function(){
      this.allShoes = []
      this.allShoes = this.shoes.filter(e=>e.category==="puma")
      this.openModalNav = false
      this.filterCategory="puma"
    },

    printNike: function(){
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "nike")
      this.openModalNav = false
      this.filterCategory="nike"
    },

    printAdidas: function(){
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "adidas")
      this.openModalNav = false
      this.filterCategory="adidas"
    }
   }

}).mount('#app')

//lili
/*const chr =  document.getElementById('myChart').getContext("2d");
const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Total Sales',
        data: [18,12,6,9,12,3,9],
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    {
        label: 'Sales Sub Branch',
        data: [18,12,6,9,12,3,9],
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    {
        label: 'Sales Main Branch',
        data: [18,12,6,9,12,3,9],
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
]
};
const config = {
    type: 'bar',
    data,
    options: {
        scales:{
            y:{
                beginAtZero: true
            }
        }
    }
}
const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );*/