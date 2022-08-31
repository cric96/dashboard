<template>
  <router-link
    v-slot="{href, navigate}"
    :to="'/dashboard/account/registration'"
  >
    <Button
      :href="href"
      label="Sign Up"
      icon="pi pi-user-plus"
      class="p-button-success"
      @click="navigate"
    />
  </router-link>
</template>

<script>
import Button from 'primevue/button';

export default {
	name: 'SingUpButton',
	components:{
		Button
	}
};
</script>

<style scoped>
a { text-decoration: none; }
</style>
