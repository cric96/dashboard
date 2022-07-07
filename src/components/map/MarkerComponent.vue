<template>
  <l-marker :lat-lng="[lat,lng]" :icon="icon" @click="$emit('openSidebar')">
  </l-marker>
</template>

<script>
import {LMarker} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default {
  name: "MarkerComponent",
  components:{
    LMarker,
  },
  props:[
    'lat',
    'lng',
  ],
  data(){
    return{
      icon : L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/293/293706.png',
        iconSize:     [32, 32], // size of the icon
        shadowSize:   [32, 32], // size of the shadow
        iconAnchor:   [this.lat, this.lat], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      }),
    }
  },
}
</script>

<style scoped>

</style>
