<template>
  <Toast />
  <div
    id="main"
    style="background-color: #f4f4f8"
  >
    <NavBar />
    <div class="flex justify-content-center my-1">
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
