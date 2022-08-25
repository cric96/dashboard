<template>
  <l-marker
    :lat-lng="[lat,lng]"
    :icon="createIcon"
  />
</template>

<script>
import { LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
export default {
	name: 'MarkerComponent',
	components:{
		LMarker,
	},
	props: {
		'lat': {
			type: Number,
			default: 0.0,
			require: true,
		},
		'lng': {
			type: Number,
			default: 0.0,
			require: true,
		},
		// eslint-disable-next-line vue/require-default-prop
		'iconPath': {
			type: String,
		},
	},
	computed:{
		createIcon() {
			return L.icon({
				iconUrl: this.iconPath,
				iconSize:     [32, 32], // size of the icon
			});
		}
	}
};
</script>

<style scoped>

</style>
