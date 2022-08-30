<template>
  <l-marker
    ref="marker"
    :lat-lng="[position.latitude, position.longitude]"
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
		'position': {
			type: Object,
			// eslint-disable-next-line vue/require-valid-default-prop
			default: { latitude:0.0, longitude:0.0 },
			require: true,
		},
		// eslint-disable-next-line vue/require-default-prop
		'iconPath': {
			type: String,
		},
		'iconSize':{
			type:Number,
			require: false,
			default: 32
		}
	},
	computed:{
		createIcon() {
			return L.icon({
				iconUrl: this.iconPath,
				iconSize:     [this.iconSize, this.iconSize], // size of the icon
			});
		}
	},
};
</script>

<style scoped>

</style>
