const app = Vue.createApp({
  data() {
    return {
      shoes: [],
      allShoes: [],
      staff: true,
      cart: [],
      totalPrice:Number(localStorage.getItem("totalPrice")),
      openModalNav: false,
      page: "staff",
      test: [1, 12, 6, 9, 12, 3, 9],
      graphics: "week",
      table: "log",
      navOpen: false,
      favShoes: [],
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
    
    //alert("Thaks for the purchase")
    Swal.fire({
      title:"Thank you!",
      //width:"40vw",
      html:"<template class='buyAlert'> </template>"
    })
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
     // --------------------CONTACT ---------------------
    contactAlert(){
      Swal.fire({
        title:"Sent!",

      })
    }
  }

  


}).mount("#app");


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


const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  //   console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("dropped");
}

/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal-todo");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal-todo");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

/* create todo  */
const todo_submit = document.getElementById("todo_submit");

todo_submit.addEventListener("click", createTodo);

function createTodo() {
  const todo_div = document.createElement("div");
  const input_val = document.getElementById("todo_input").value;
  const txt = document.createTextNode(input_val);

  todo_div.appendChild(txt);
  todo_div.classList.add("todo");
  todo_div.setAttribute("draggable", "true");

  /* create span */
  const span = document.createElement("span");
  const span_txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(span_txt);

  todo_div.appendChild(span);

  no_status.appendChild(todo_div);

  span.addEventListener("click", () => {
    span.parentElement.style.display = "none";
  });
  //   console.log(todo_div);

  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  document.getElementById("todo_input").value = "";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});