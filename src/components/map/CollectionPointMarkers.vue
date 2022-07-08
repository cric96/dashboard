<template>
  <MarkerComponent
    v-for="cp in collectionPoints"
    :key="cp"
    :lat="cp.lat"
    :lng="cp.lng"
    :icon="cpIcon"
    @click="$emit('open-sidebar', cp)"
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
			collectionPoints:[],
			cpIcon: L.icon({
				iconUrl: 'https://i.postimg.cc/WDjbgvLy/iconsBin.png',
				iconSize:     [32, 32], // size of the icon
				iconAnchor:   [this.lat, this.lat], // point of the icon which will correspond to marker's location
			}),
		};
	},
	mounted () {
		for (let i = 0; i < 10; i++){
			let lat = randomLatitude({min:44.14, max:44.20});
			let lng = randomLongitude({min:12.24, max:12.30});
			this.collectionPoints.push({
				id:i,
				lat:lat,
				lng: lng,
				dumpsters:['1', '2', '3'],
			});
		}
	}
};
</script>

<style scoped>

</style>
