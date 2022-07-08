<template>
  <Sidebar>
    <template #header>
      <h1> Truck {{ truckId }} </h1>
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
	name: 'TruckSidebar',
	components:{
		Sidebar,
	},
	props:{
		'truckId': {
			type: String,
			default:'10',
		},
	},
	watch:{
		truckId (o, n){
			console.log(o);
			console.log(n);
		}
	}
};
</script>

<style scoped>

</style>
