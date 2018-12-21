<template>
      <div class="main">
        <router-view></router-view>
      </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import Main from './components/Main.vue'


export default {
  name: 'app',
  components: {
    HelloWorld,
      Main,
  }
}
</script>

