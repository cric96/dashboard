<template>
  <MarkerComponent
    v-for="t in trucks"
    :key="t"
    :position="t.position"
    :icon-path="'https://i.postimg.cc/YqCCTXyV/lorry.png'"
    :icon-size="48"
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
			truckPolling:null,
		};
	},
	mounted() {
		this.getTrucksInMission();
		this.truckPolling = setInterval(() => this.updateTruckInMission(), 2000);
	},
	unmounted() {
		clearInterval(this.truckPolling);
	},
	methods:{
		getTrucksInMission() {
			axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/inMission/', {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				}
			})
				.then(res => {
					this.trucks = res.data;
				});
		},
		updateTruckInMission() {
			axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/inMission/', {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				}
			})
				.then(res => {
					res.data.forEach(t => {
						const truck = this.trucks.find(ot => ot.truckId === t.truckId);
						if (truck.position !== t.position) {
							truck.position = t.position;
						}
					});
				});
		}
	},
};
</script>

<style scoped>

</style>
