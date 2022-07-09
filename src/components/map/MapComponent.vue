<template>
  <div style="width: 80vw; height: 80vh;">
    <l-map
      ref="map"
      v-model="zoom"
      v-model:zoom="zoom"
      :max-zoom="18"
      :min-zoom="5"
      :zoom-animation="false"
      :center="[userCoords.latitude, userCoords.longitude]"
      :scroll-zoom="false"
      @ready="mapIsReady"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CollectionPointMarkers @open-sidebar="openSidebar" />
      <TruckMarkers @open-sidebar="openSidebar" />
    </l-map>
  </div>
  <CollectionPointSidebar
    v-if="collectionPointIsClicked"
    :side-visibility="sidebarVisible"
    @closed="sidebarClosed"
  />
  <TruckSidebar
    v-if="truckIsClicked"
    :side-visibility="sidebarVisible"
    :truck-id="markerClicked"
    @closed="sidebarClosed"
  />
</template>
<script>
import {
	LMap,
	LTileLayer,
} from '@vue-leaflet/vue-leaflet';

import 'leaflet/dist/leaflet.css';
import CollectionPointSidebar from '@/components/map/sidebar/CollectionPointSidebar';
import TruckSidebar from '@/components/map/sidebar/TruckSidebar';
import CollectionPointMarkers from '@/components/map/CollectionPointMarkers';
import TruckMarkers from '@/components/map/TruckMarkers';


export default {
	name: 'MapComponent',
	components: {
		CollectionPointMarkers,
		TruckSidebar,
		CollectionPointSidebar,
		TruckMarkers,
		LMap,
		LTileLayer,
	},
	data () {
		return {
			zoom: 13,
			map:null,
			userCoords:{
				latitude: 44.2227278,
				longitude: 12.0412730,
			},
			sidebarVisible:false,
			markerClicked:null,
			locationWatcher:null,
		};
	},
	computed:{
		collectionPointIsClicked (){
			return this.markerClicked != null && this.markerClicked.startsWith('cp');
		},
		truckIsClicked (){
			return this.markerClicked != null && this.markerClicked.startsWith('T');
		}
	},
	unmounted () {
		if (this.locationWatcher !== null)
			navigator.geolocation.clearWatch(this.locationWatcher);
	},
	methods: {
		mapIsReady (){
			this.map = this.$refs.map.leafletObject;
			if (this.map !== null){
				this.map.scrollWheelZoom.disable();
				if (navigator.geolocation) {
					this.locationWatcher = navigator.geolocation.watchPosition(p => {
						this.userCoords = p.coords;
						this.map.flyTo([this.userCoords.latitude, this.userCoords.longitude]);
					});
				}
			}
		},
		openSidebar (marker){
			this.markerClicked = marker;
			this.sidebarVisible = true;
		},
		sidebarClosed (){
			this.sidebarVisible = false;
		},
	}
};

</script>
