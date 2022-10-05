

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