<template>
  <MarkerComponent
    v-for="t in trucks"
    :key="t"
    :lat="t.position.latitude"
    :lng="t.position.longitude"
    :icon="tIcon"
    @click="$emit('open-sidebar', t.truckId)"
  />
</template>

<script>
import MarkerComponent from '@/components/map/MarkerComponent';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
//import axios from 'axios';
import randomLatitude from 'random-latitude';
import randomLongitude from 'random-longitude';

export default {
	name: 'CollectionPointMarkers',
	components: {MarkerComponent},
	emits: ['open-sidebar'],
	data (){
		return {
			trucks:[],
			tIcon: L.icon({
				iconUrl: 'https://i.postimg.cc/tCcLj6dL/garbage-truck.png',
				iconSize:     [32, 32], // size of the icon
			}),
		};
	},
	mounted () {
		// this.getTrucksInMission();
		for (let i = 0; i < 10; i++){
			let lat = randomLatitude({min:44.14, max:44.20});
			let lng = randomLongitude({min:12.24, max:12.30});
			this.trucks.push({
				truckId:'T-'+i,
				position : {
					latitude:lat,
					longitude: lng,

				},
			});
		}
	},
	methods:{
		// getTrucksInMission (){
		// 	axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/inMission/', {
		// 		headers: {
		// 			'Access-Control-Allow-Origin': '*',
		// 			'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		// 			'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		// 		}
		// 	})
		// 		.then(res => {
		// 			res.data.forEach(t => this.trucks.push(t));
		// 		});
		// }
	},
};
</script>

<style scoped>

</style>
