<template>
  <MarkerComponent
    v-for="cp in collectionPoints"
    :key="cp"
    :lat="cp.position.latitude"
    :lng="cp.position.longitude"
    :icon="cpIcon"
    @click="$emit('open-sidebar', cp.id)"
  />
</template>

<script>
import MarkerComponent from '@/components/map/MarkerComponent';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import randomLatitude from 'random-latitude';
import randomLongitude from 'random-longitude';
export default {
	name: 'CollectionPointMarkers',
	components: { MarkerComponent },
	emits: ['open-sidebar'],
	data() {
		return {
			collectionPoints:[],
			cpIcon: L.icon({
				iconUrl: 'https://i.postimg.cc/PfCmTmb2/collection-point.png',
				iconSize:     [32, 32], // size of the icon
			}),
		};
	},
	mounted() {
		for (let i = 0; i < 6; i++) {
			let lat = randomLatitude({ min:44.14, max:44.20 });
			let lng = randomLongitude({ min:12.24, max:12.30 });
			this.collectionPoints.push({
				id:'Cp-'+i,
				position:{
					latitude:lat,
					longitude: lng,
				}
			});
		}
		//this.getCollectionPoints();
	},
	methods : {
		getCollectionPoints() {
			axios.get(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/collectionpoints', {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				}
			})
				.then(res => {
					console.log(res);
					res.data.forEach(c => this.collectionPoints.push(c));
				});
		}
	}
};
</script>

<style scoped>

</style>
