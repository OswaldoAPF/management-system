const app = Vue.createApp({
  data() {
    return {
      shoes: [],
      allShoes: [],
      staff: false,
      cart: [],
      totalPrice:Number(localStorage.getItem("totalPrice")),
      openModalNav: false,
      page: "home",
      test: [1, 12, 6, 9, 12, 3, 9],
      graphics: "month",
      table: "log",
      navOpen: false,
      favShoes: [],

      /* SIGN UP STAFF */
      userSignUp: "",
      passwordSignUp: "",

      /* LOGIN STAFF*/
      userStaff: "",
      passwordStaff: "",
      manager:false,

      /* USER */
      alias: "",
      photo: "./assets/img/staff.jfif",
      inicioSesion: false,
      user: null,
      aliasName: ""

    };

  },

  created(){
    if (!localStorage.getItem("totalPrice")){
      localStorage.setItem("totalPrice",0)
      this.totalPrice=Number(localStorage.getItem("totalPrice"))
    }
    fetch('nike.json')
    .then(res => res.json())
    .then(res =>{
      if (!localStorage.getItem("shoes")){
        this.shoes = res
      localStorage.setItem("shoes",JSON.stringify(this.shoes))
     }
    } )
    .catch(err => console.log(err))
    //local storage
    this.shoes=JSON.parse(localStorage.getItem("shoes")) ||[]
    this.favShoes = JSON.parse(localStorage.getItem("fav")) || []
    let cart = JSON.parse(localStorage.getItem("cart"))?.map( e => e.id)
    if(cart){
      let aux = this.shoes.filter( e => cart.includes(e.id))
      this.cart= aux
    }
  },
  methods: {
    openNav() {
      if (this.navOpen === false) {
        this.navOpen = true
      }
      else {
        this.navOpen = false
      }
    
    },
    printAll: function () {
      this.allShoes = []
      this.allShoes = this.shoes
      this.openModalNav = false
      this.navOpen = false
      this.page = "alls"
    },

    printNike: function () {
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "nike")
      this.openModalNav = false
      this.page = "nike"
      this.navOpen = false
    },

    printAdidas: function () {
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "adidas")
      this.openModalNav = false
      this.page = "adidas"
      this.navOpen = false
    },

    printPuma: function () {
      this.allShoes = []
      this.allShoes = this.shoes.filter(e => e.category === "puma")
      this.openModalNav = false
      this.page = "puma"
      this.navOpen = false
    },

    // -------------------CART----------------------------- 
    addToCart(shoe){ 
      let boolean = this.cart.some( e => e.id === shoe.id) 
      if(boolean){ 
        this.cart.forEach( e => {
            if(e.id === shoe.id ){
             e.inCart++
             e.stock--
             e.total += e.price
             this.cart.inCart++ 
             this.cart.stock--
             this.totalPrice+=shoe.price
             localStorage.setItem("totalPrice",this.totalPrice)
             localStorage.setItem("cart",JSON.stringify(this.cart))
             localStorage.setItem("shoes",JSON.stringify(this.shoes))
            }
        })
    }else if(boolean===false && shoe.stock>0){
      this.cart.push(shoe) 
      shoe.inCart++
      shoe.stock--
      shoe.total=shoe.price
      this.cart.inCart++
      this.cart.stock--
      this.cart.total+=this.cart.price
      this.totalPrice=this.totalPrice+shoe.total
      localStorage.setItem("totalPrice",this.totalPrice)
      localStorage.setItem("cart",JSON.stringify(this.cart))
      localStorage.setItem("shoes",JSON.stringify(this.shoes))
    }
  },
  deleteCartProduct(product){    
    let element= JSON.parse(localStorage.getItem("shoes")).filter(e=>e.id==product.id)
    if(product.inCart>1){
      element[0].inCart--
      element[0].stock++
      element[0].total=element[0].total-element[0].price
      product.inCart--
      product.stock++
      product.total=product.total-product.price
      this.totalPrice-=product.price
      localStorage.setItem("totalPrice",this.totalPrice)
      localStorage.setItem("cart",JSON.stringify(this.cart))
      localStorage.setItem("shoes",JSON.stringify(this.shoes))
    }else {
      element[0].inCart--
      element[0].stock++
      element[0].total=element[0].total-element[0].price
      product.inCart--
      product.stock++
      
     
      this.cart=this.cart.filter(e=>e.id !=product.id)  
      this.totalPrice-=product.price
      localStorage.setItem("totalPrice",this.totalPrice)
      localStorage.setItem("cart",JSON.stringify(this.cart))
      localStorage.setItem("shoes",JSON.stringify(this.shoes))
    }
    if(!this.cart.length){
    
      localStorage.setItem("cart",JSON.stringify([]))
      this.cart=JSON.parse(localStorage.getItem("cart"))
      localStorage.setItem("totalPrice",this.totalPrice)
      this.totalPrice=Number(localStorage.getItem("totalPrice"))
    }
    
  },
  buy(){ 
    let lenght=this.shoes.length;
    for(let a=0 ; a<lenght;a++){
      this.shoes[a].inCart=0
    }
    this.cart=[]
    this.totalPrice=0
    localStorage.removeItem('cart');
    localStorage.removeItem('totalPrice');
    
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
        shoe[0].fav = false

        this.favShoes = this.favShoes?.filter(shoe => shoe.title !== product.title)
      }

      localStorage.setItem("fav", JSON.stringify(this.favShoes))
      this.favShoes = JSON.parse(localStorage.getItem("fav"))
    },

    printFav: function () {
      this.openModalNav = false
      this.favShoes = this.favShoes
      this.page = "fav"
    },

    //-------------------LOGIN---------------------------
    printLogin: function(){
      this.page = "login"
    },

    loginStaff() {
      if (this.userStaff != '' && this.passwordStaff != '') {
          firebase.auth().signInWithEmailAndPassword(this.userStaff, this.passwordStaff)
              .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;

                   this.user = user
                   console.log(this.user);
                  /*  this.alias = this.usuario.email */
                  this.inicioSesion = true
                  this.alias = this.user.email
                  this.page = 'home'
                  this.manager = false
                  this.staff= true
                  this.aliasName = this.alias
                  this.photo = "./assets/img/staff.jfif"

                  if(this.alias === "manager@hotmail.com" ){
                    this.manager = true
                    this.staff = false
                    this.photo = "./assets/img/gerente.jpg"
                    this.aliasName = "Manager Philip Hampson"
                  }

                  this.userStaff = ''
                  this.passwordStaff = ''
                  // ...
              })
              .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log(errorCode)
                  console.log(errorMessage)
              });
      }
  },

    //-------------------SIGN UP---------------------------

    signUpStaff: function(){
      if (this.userSignUp != '' && this.passwordSignUp != '') {
        firebase.auth().createUserWithEmailAndPassword(this.userSignUp, this.passwordSignUp)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                // lo que va a pasar, cuando termine de registrarse
                this.page = 'home'
                this.userSignUp = ''
                this.passwordSignUp = ''
            })
            .catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode)
                console.log(errorMessage)
            });
    }
    },

    //--------------------LOG OUT---------------------------------
    logOut: function () {
      firebase.auth().signOut();

      this.user = null
      this.page = 'home'
      this.inicioSesion = false
      this.staff= false
      this.manager = false
      this.emailInicio = ''
      this.passwordInicio = ''
    },

  }

  


}).mount("#app");



//lili
/*const chr =  document.getElementById('myChart').getContext("2d");
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "",
      data: app.test,
      backgroundColor: [
        "#FF74B1",
        "#C7F2A4",
        "#FA7070",
        "#C3F8FF",
        "#FFF89C",
        "#B2A4FF",
        "#FFAD60",
      ],
      borderColor: "aliceblue",
      borderWidth: 2,
    },
  ],
};
const config = {
  type: "bar",
  data,
  options: {
    plugins: {
      title: {
        display: true,
        text: "SALES FOR WEEK",
        weight: "bold",
        color: "#FEF9EF",
        padding: {
          top: 10,
          bottom: 30,
        },
        font: {
          size: 20,
        },
      },
    },
    animations: {
      tension: {
        duration: 300,
        easing: "easeInOutBounce",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
const myChart = new Chart(document.getElementById("weekChart"), config);

/* MONTH */
const confi = {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "",
        data: [950, 180, 654, 280, 505, 432, 203, 300, 840, 532, 202, 101],
        backgroundColor: [
          "#FFF8BC",
          "#FFE898",
          "#FF87B2",
          "#F65A83",
          "#F77E21",
          "#E7F6F2",
          "#A5C9CA",
          "#9C9EFE",
          "#A66CFF",
          "#73A9AD",
          "#F5F0BB",
          "#FF9494",
          "#FFD1D1",
        ],
        borderColor: "aliceblue",
        borderWidth: 2,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "SALES FOR MONTH",
        weight: "bold",
        color: "#FEF9EF",
        padding: {
          top: 10,
          bottom: 30,
        },
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
const Char = new Chart(document.getElementById("monthChart"), confi);

/* YEAR */
const configuration = {
  type: "bar",
  data: {
    labels: ["2017", "2018", "2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "",
        data: [500, 800, 504, 200, 505, 320],
        backgroundColor: [
          "#FFF8BC",
          "#FFE898",
          "#FF87B2",
          "#F65A83",
          "#F77E21",
          "#E7F6F2",
        ],
        borderColor: "aliceblue",
        borderWidth: 2,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "SALES BY YEAR",
        weight: "bold",
        color: "#FEF9EF",
        padding: {
          top: 10,
          bottom: 30,
        },
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
const Cha = new Chart(document.getElementById("annualChart"), configuration);
