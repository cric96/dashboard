<template>
  <MarkerComponent
    v-for="cp in collectionPoints"
    :key="cp"
    :position="cp.position"
    :icon-path="'https://i.postimg.cc/PfCmTmb2/collection-point.png'"
    @click="$emit('open-sidebar', cp.id)"
  />
</template>

<script>
import MarkerComponent from '@/components/map/MarkerComponent';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export default {
	name: 'CollectionPointMarkers',
	components: { MarkerComponent },
	props:{
		'cpToDelete':{
			type:String,
			default: null,
		}
	},
	emits: ['open-sidebar', 'deleted'],
	data() {
		return {
			collectionPoints:[],
		};
	},
	watch:{
		cpToDelete(cp) {
			if (cp != null) {
				this.collectionPoints = this.collectionPoints.filter(c => c.id !== cp);
				this.$emit('deleted');
				axios.delete(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/collectionpoints/'+cp).then(res => console.log(res));
			}
		}
	},
	mounted() {
		this.fetchCollectionPoints();
	},
	methods : {
		fetchCollectionPoints() {
			axios.get(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/collectionpoints', {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				}
			})
				.then(res => {
					this.collectionPoints = res.data;
				});
		}
	}
};
</script>

<style scoped>

</style>
