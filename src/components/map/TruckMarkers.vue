<template>
  <MarkerComponent
    v-for="t in trucks"
    :key="t"
    :lat="t.position.latitude"
    :lng="t.position.longitude"
    :icon-path="'https://i.postimg.cc/tCcLj6dL/garbage-truck.png'"
    @click="$emit('open-sidebar', t.truckId)"
  />
</template>

<script>
import MarkerComponent from '@/components/map/MarkerComponent';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export default {
	name: 'CollectionPointMarkers',
	components: { MarkerComponent },
	emits: ['open-sidebar'],
	data() {
		return {
			trucks:[],
		};
	},
	mounted() {
		this.getTrucksInMission();
	},
	methods:{
		getTrucksInMission() {
			this.trucks = [];
			axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/inMission/', {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				}
			})
				.then(res => {
					res.data.forEach(t => this.trucks.push(t));
				});
		}
	},
};
</script>

<style scoped>

</style>
