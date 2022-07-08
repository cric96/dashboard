<template>
  <l-marker
    :lat-lng="[lat,lng]"
    :icon="icon"
  />
</template>

<script>
import {LMarker} from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
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
			default:0.0,
			require: true,
		},
		// eslint-disable-next-line vue/require-default-prop
		'icon':{

		},
	},
};
</script>

<style scoped>

</style>
