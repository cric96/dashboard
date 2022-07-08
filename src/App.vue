<template>
  <NavBar />
  <div class="flex justify-content-center my-5">
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/structure/NavBar';
export default {
	name: 'App',
	components: {
		NavBar,
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
}

html, body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
