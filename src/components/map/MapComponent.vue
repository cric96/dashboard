<template>
  <div class="flex flex-column">
    <div
      class="flex align-content-center justify-content-end m-2"
    >
      <AddCollectionPointButton
        @pick="activatePositionPicker"
        @insert="$router.push(`/dashboard/collectionPoints/new/`);"
      />
    </div>
    <div
      :style="{
        'width': '80vw',
        'height': '80vh'}"
    >
      <l-map
        id="map"
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
        <TruckMarkers
          v-if="userStore.isManager"
          @open-sidebar="openSidebar"
        />
      </l-map>
    </div>
  </div>
  <CollectionPointSidebar
    v-if="collectionPointIsClicked"
    :side-visibility="sidebarVisible"
    :item-id="markerClicked"
    @closed="sidebarClosed"
  />
  <TruckSidebar
    v-if="truckIsClicked"
    :side-visibility="sidebarVisible"
    :item-id="markerClicked"
    @closed="sidebarClosed"
  />
</template>
<script>
import {
	LMap,
	LTileLayer,
} from '@vue-leaflet/vue-leaflet';

import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
import CollectionPointSidebar from '@/components/map/sidebar/CollectionPointSidebar';
import TruckSidebar from '@/components/map/sidebar/TruckSidebar';
import CollectionPointMarkers from '@/components/map/CollectionPointMarkers';
import TruckMarkers from '@/components/map/TruckMarkers';
import { useUserStore } from '@/stores/UserStore';
import AddCollectionPointButton from '@/components/collectionPoints/AddCollectionPointButton';


export default {
	name: 'MapComponent',
	components: {
		CollectionPointMarkers,
		TruckSidebar,
		CollectionPointSidebar,
		TruckMarkers,
		AddCollectionPointButton,
		LMap,
		LTileLayer,
	},
	setup() {
		const userStore = useUserStore();
		return { userStore };
	},
	data() {
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
		collectionPointIsClicked() {
			return this.markerClicked != null && this.markerClicked.startsWith('C');
		},
		truckIsClicked() {
			return this.markerClicked != null && this.markerClicked.startsWith('T');
		}
	},
	unmounted() {
		if (this.locationWatcher !== null)
			navigator.geolocation.clearWatch(this.locationWatcher);
	},
	methods: {
		mapIsReady() {
			this.map = this.$refs.map.leafletObject;
			if (this.map !== null) {
				this.map.scrollWheelZoom.disable();
				if (navigator.geolocation) {
					this.locationWatcher = navigator.geolocation.watchPosition(p => {
						this.userCoords = p.coords;
						this.map.flyTo([this.userCoords.latitude, this.userCoords.longitude]);
					});
				}
			}
		},
		openSidebar(marker) {
			this.markerClicked = marker;
			this.sidebarVisible = true;
		},
		sidebarClosed() {
			this.sidebarVisible = false;
		},
		activatePositionPicker() {
			if (this.map !== null) {
				document.getElementById('map').style.cursor = 'crosshair';
				this.map.on('click', (e) => {
					document.getElementById('map').style.cursor = '';
					this.$router.push(`/dashboard/collectionPoints/new/${e.latlng.lat}/${e.latlng.lng}`);
				});
			}
		}
	}
};

</script>

<style scoped>

#map{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>


