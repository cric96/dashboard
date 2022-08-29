<template>
  <Sidebar @item-updated="updateTruckId">
    <template #header>
      <h1> {{ truckId }} </h1>
      <p />
    </template>

    <template #content>
      <p>Occupied percentage:</p>
      <ProgressBar :value="truckOccupiedPercentage">
        {{ truckOccupiedPercentage > 7 ? truckOccupiedPercentage+'%' : '' }}
      </ProgressBar>
      <div
        class="flex justify-content-between"
      >
        <h3>Go to mission details</h3>
        <Button
          icon="pi pi-arrow-right"
          class="p-button-rounded m-2"
          @click="goToMissionDetails"
        />
      </div>
    </template>
  </Sidebar>
</template>

<script>
import Sidebar from '@/components/map/sidebar/Sidebar';
import ProgressBar from 'primevue/progressbar';
import Button from 'primevue/button';
import axios from 'axios';

export default {
	name: 'TruckSidebar',
	components:{
		Sidebar,
		ProgressBar,
		Button,
	},
	emits: ['exited'],
	data() {
		return {
			truckId:null,
			truck:null,
			truckPolling:null,
		};
	},
	computed:{
		truckOccupiedPercentage() {
			if (this.truck !== null) {
				return Math.round(this.truck.occupiedVolume.value/this.truck.capacity * 100);
			}
			else return 0;
		}
	},
	methods:{
		updateTruckId(id) {
			this.truckId = id;
			this.getTruckById();
			if (this.truckPolling != null) clearInterval(this.truckPolling);
			setInterval(()=>this.getTruckById(), 3000);
		},
		goToMissionDetails() {
			this.$emit('exited');
			this.$router.push('/dashboard/missions/'+this.truckId);
		},
		getTruckById() {
			axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/'+this.truckId, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				}
			})
				.then(res => {
					this.truck = res.data;
				});
		}
	},
};
</script>

<style scoped>
a { text-decoration: none; }
</style>
