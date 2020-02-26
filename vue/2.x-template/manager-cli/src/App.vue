<template>
  <div id="app" class='mpp'>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    console.log('app实例', 'beforeCreate','$el--', this.$el,this.$store.state.xxx,'store', this.$route.path)
    console.log('app实例', 'beforeCreate', '$el--',this.$el)
  },
  created() {
    console.log('app实例', 'created', '$el--', this.$el)
  },
  beforeMount() {
    console.log('app实例', 'beforeMount', '$el--', JSON.stringify(this.$el))
  },
  mounted() {
    console.log('app实例', 'mounted',this.$el)
  },
  methods: {
    init() {
      console.log(1244242)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
