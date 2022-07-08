<template>
  <Sidebar>
    <template #header>
      <h1> Collection Point </h1>
      <p />
    </template>

    <template #content>
      <div class="flex flex-column justify-content-evenly">
        Prova
      </div>
    </template>
  </Sidebar>
</template>

<script>
import Sidebar from '@/components/structure/Sidebar';

export default {
	name: 'CollectionPointSidebar',
	components:{
		Sidebar,
	},
};
</script>

<style scoped>

</style>
