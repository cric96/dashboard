<template>
  <Toast />
  <div
    id="main"
    :style="{'background':'url(' + require('../assets/images/green-gradient-bg.jpg') + ') no-repeat center center fixed',
             '-webkit-background-size': 'cover',
             '-moz-background-size': 'cover',
             '-o-background-size': 'cover',
             'background-size': 'cover'}"
  >
    <NavBar />
    <div class="flex justify-content-center my-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/structure/NavBar';
import Toast from 'primevue/toast';
export default {
	name: 'App',
	components: {
		NavBar,
		Toast,
	}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0 !important;
  margin: 0 !important;
  height: 100vh !important;
}

#main{
  height: 100% !important;
  overflow: auto;
}

html, body {
  padding: 0 !important;
  margin: 0 !important;
  height: 100% !important;
}
</style>
