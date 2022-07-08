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
    v-if="cpMarkerClicked"
    :side-visibility="sidebarVisible"
    @closed="sidebarClosed"
  />
  <TruckSidebar
    v-if="truckMarkerClicked"
    :side-visibility="sidebarVisible"
    @closed="sidebarClosed"
  />
</template>
<script>
import {
	LMap,
	LTileLayer,
} from '@vue-leaflet/vue-leaflet';

import 'leaflet/dist/leaflet.css';
import CollectionPointSidebar from '@/components/structure/CollectionPointSidebar';
import TruckSidebar from '@/components/structure/TruckSidebar';
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
			truckMarkerClicked:false,
			cpMarkerClicked:false,

		};
	},
	methods: {
		mapIsReady (){
			this.map = this.$refs.map.leafletObject;
			this.map.scrollWheelZoom.disable();

			if (navigator.geolocation) {
				navigator.geolocation.watchPosition(p => this.userCoords = p.coords);
				this.map.flyTo([this.userCoords.latitude, this.userCoords.longitude]);
			}
		},
		openSidebar (marker){
			this.cpMarkerClicked = marker.id.startsWith('cp');
			this.truckMarkerClicked = marker.id.startsWith('t');
			this.sidebarVisible = true;
		},
		sidebarClosed (){
			this.cpMarkerClicked = false;
			this.sidebarVisible = false;
		},
	},
};

</script>
