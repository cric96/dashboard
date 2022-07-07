<template>
  <div style="width: 80vw; height: 80vh;">
    <l-map
        ref="map"
        v-model="zoom"
        v-model:zoom="zoom"
        :max-zoom="18"
        :min-zoom="5"
        :zoom-animation="false"
        :center="[this.userCoords.latitude, this.userCoords.longitude]"
        @ready="mapIsReady"
        :scrollZoom = "false"
    >
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <MarkerComponent :lat="userCoords.latitude" :lng="userCoords.longitude" @openSidebar="openSidebar"/>
    </l-map>
  </div>
  <CollectionPointSidebar :side-visibility=sidebarVisible @closed="sidebarClosed"></CollectionPointSidebar>
</template>
<script>
import {
  LMap,
  LTileLayer,
} from "@vue-leaflet/vue-leaflet";

import "leaflet/dist/leaflet.css";
import CollectionPointSidebar from "@/components/structure/CollectionPointSidebar";
import MarkerComponent from "@/components/map/MarkerComponent";

export default {
  name: "MapComponent",
  components: {
    MarkerComponent,
    CollectionPointSidebar,
    LMap,
    LTileLayer,
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
    };
  },
  methods: {
    mapIsReady(){
      this.map = this.$refs.map.leafletObject;
      this.map.scrollWheelZoom.disable()

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(p => this.userCoords = p.coords);
        console.log(this.userCoords.latitude + "  " + this.userCoords.longitude)
        this.map.flyTo([this.userCoords.latitude, this.userCoords.longitude])
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    openSidebar(){
      this.sidebarVisible = true;
    },
    sidebarClosed(){
      this.sidebarVisible = false;
    },
  },
};

</script>
