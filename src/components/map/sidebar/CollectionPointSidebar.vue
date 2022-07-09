<template>
  <Sidebar>
    <template #header>
      <h1> Collection Point {{ collectionPointId }} </h1>
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
	name: 'CollectionPointSidebar',
	components:{
		Sidebar,
	},
	props:{
		'collectionPointId': {
			type: String,
			default:'000',
		},
	},
	data (){
		return {
			collectionPoint:null,
		};
	},
	watch:{
		collectionPointId (n){
			console.log(n);
		}
	},
	mounted () {
		console.log('Collection Point showed' + this.collectionPointId);
	},
	methods:{
		// getTruckById (){
		// 	axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/'+this.collectionPointId, {
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
