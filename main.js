import { createApp } from 'Vue'

  createApp({
    data() {
      return {
        message: 'Hello Vue!',
        openModalNav: false,

      }
    }
  }).mount('#app')