<<<<<<< HEAD
const {createApp}= Vue

createApp ({
    data(){

    },
    created(){

    },
    mounted(){

    },
    methods:{

    },
    computed:{

    }
})
=======


const { createApp } = Vue

createApp({
  data() {
    return {
      shoes: []
    }
  },

  created(){
    fetch('nike.json')
    .then(res => res.json())
    .then(res => this.shoes = res)
    .catch(err => console.log(err))
  },

  methods:{

  }
}).mount('#app')
>>>>>>> 15abb2035577aa31e264f6809e4eb1e9dc38bc1f
