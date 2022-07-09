<template>
  <Sidebar @item-updated="updateTruckId">
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
import Sidebar from '@/components/map/sidebar/Sidebar';
export default {
	name: 'TruckSidebar',
	components:{
		Sidebar,
	},
	data() {
		return {
			truckId:null,
			truck:null,
		};
	},
	methods:{
		updateTruckId(id) {
			this.truckId = id;
		}
		// getTruckById (){
		// 	axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/'+this.truckId, {
		// 		headers: {
		// 			'Access-Control-Allow-Origin': '*',
		// 			'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		// 			'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		// 		}
		// 	})
		// 		.then(res => {
		// 			this.truck = res.data;
		// 		});
		// }
	},
};
</script>

<style scoped>

</style>
