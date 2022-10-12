const app = Vue.createApp({
  data() {
    return {
      shoes: [],
      allShoes: [],
      cart: [],
      totalPrice: 0,
      openModalNav: false,
      page: "desk",
      test: [1, 12, 6, 9, 12, 3, 9],
      graphics: "month",
      table: "log"
    };
  },
  created() {
    fetch("nike.json")
      .then((res) => res.json())
      .then((res) => (this.shoes = res))
      .catch((err) => console.log(err));
  },
  methods: {
    addToCart(shoe) {
      let boolean = this.cart.some((e) => e.id === shoe.id); //
      console.log(boolean);

      if (boolean) {
        //si boleano es true, modifica propiedades del carrito, no modificar, funciona bien
        this.cart.forEach((e) => {
          if (e.id === shoe.id) {
            e.inCart++;
            e.stock--;
            e.total += e.price;
            //this.cart.inCart++ //activar si hay bugs en el carrito
            //this.cart.stock--
            this.totalPrice += shoe.price;
          }
        });
      } else if (boolean === false && shoe.stock > 0) {
        this.cart.push(shoe); //si es falso añade el producto al carrito
        shoe.inCart++;
        shoe.stock--;
        shoe.total = shoe.price;
        this.cart.inCart++;
        this.cart.stock--;
        this.cart.total += this.cart.price;
        this.totalPrice = this.totalPrice + shoe.total;
      }

      console.log(this.cart);
      console.log(this.shoes);
    },
    deleteCartProduct(product) {
      //FUNCION QUE ELIMINA PRODUCTO DEL CARRITO, en proceso...
      if (product.inCart > 1) {
        product.inCart--;
        product.stock++;
        product.total = product.total - product.price;
        this.totalPrice -= product.price;
      } else {
        //console.log(this.cart.indexOf(product))
        product.inCart--;
        product.stock++;
        product.total = null;
        productIndex = this.cart.indexOf(product); //guarda la ubicacion del producto en el array
        this.cart.splice(productIndex, 0); //elimina producto del array
        this.totalPrice -= product.price;
      }
      productIndex = null;
    },
  },
}).mount("#app");

/* WEEK */
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




