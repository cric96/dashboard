<template>
  <MarkerComponent
    v-for="t in trucks"
    :key="t"
    :lat="t.lat"
    :lng="t.lng"
    :icon="tIcon"
    @click="$emit('open-sidebar', t)"
  />
</template>

<script>
import MarkerComponent from '@/components/map/MarkerComponent';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const randomLatitude = require('random-latitude');
const randomLongitude = require('random-longitude');
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
		for (let i = 0; i < 10; i++){
			let lat = randomLatitude({min:44.14, max:44.20});
			let lng = randomLongitude({min:12.24, max:12.30});
			this.trucks.push({
				id:'t-'+i,
				lat:lat,
				lng: lng,
				id_mission:i,
			});
		}
	}
};
</script>

<style scoped>

</style>
