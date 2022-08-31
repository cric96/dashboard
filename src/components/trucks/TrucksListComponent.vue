<template>
  <ProgressSpinner v-if="fetchingTrucks" />
  <div class="flex justify-content-center mt-5 mx-5 md:mx-8">
    <DataView
      v-if="!fetchingTrucks"
      :value="trucks"
      layout="list"
      :paginator="true"
      :rows="9"
    >
      <template #header>
        <div class="flex justify-content-end align-content-center">
          <Button
            class="p-button-success p-button-rounded p-button-raised"
            icon="pi pi-plus"
            @click="showTruckForm=true"
          />
          <Dialog
            v-model:visible="showTruckForm"
            :modal="true"
          >
            <TruckForm
              class="m-3"
              @truck="t => addTruck(t)"
            />
          </Dialog>
        </div>
      </template>
      <template #list="slotProps">
        <div class="col-12">
          <div class="flex flex-column md:flex-row align-items-center justify-content-between md:p-5">
            <div class="flex flex-column align-items-center md:align-items-start justify-content-start md:text-left m-2">
              <h3 class="text-lg md:text-3xl my-2 ">
                {{ slotProps.data.truckId }}
              </h3>
              <div class="product-description mb-0">
                Capacity: {{ slotProps.data.capacity }}
              </div>
              <div class="product-description w-full">
                <p>Occupied Volume:</p>
                <ProgressBar
                  class="w-full"
                  :value="truckOccupiedPercentage(slotProps.data)"
                >
                  {{ truckOccupiedPercentage(slotProps.data) > 7 ? truckOccupiedPercentage(slotProps.data)+'%' : '' }}
                </ProgressBar>
              </div>
            </div>
            <div class="flex align-items-center flex-column justify-content-evenly">
              <span :class="'truck-status-'+slotProps.data.inMission +' mt-3'">{{ truckStatus(slotProps.data.inMission) }}</span>
              <Button
                v-if="!slotProps.data.inMission"
                class="p-button-sm p-button-raised p-button-rounded p-button-danger my-2"
                icon="pi pi-trash"
                @click="deleteTruck(slotProps.data)"
              />
              <Button
                v-if="slotProps.data.inMission"
                class="p-button-sm p-button-raised p-button-rounded p-button-primary my-2"
                icon="pi pi-list"
                @click="$router.push('/dashboard/missions/truck/'+slotProps.data.truckId);"
              />
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import axios from 'axios';
import ProgressBar from 'primevue/progressbar';
import Dialog from 'primevue/dialog';
import TruckForm from '@/components/trucks/TruckForm';
export default {
	name: 'TrucksListComponent',
	components:{
		DataView,
		Button,
		ProgressSpinner,
		ProgressBar,
		Dialog,
		TruckForm,
	},
	data() {
		return {
			fetchingTrucks:true,
			showTruckForm:false,
			truckPolling:null,
			trucks:[],
		};
	},
	mounted() {
		this.fetchTrucks();
		this.activatePolling();
	},
	unmounted() {
		clearInterval(this.truckPolling);
	},
	methods:{
		activatePolling() {
			this.truckPolling = setInterval(() => this.updateTrucks(), 3000);
		},
		truckStatus(inMission) {
			return inMission ? 'IN MISSION' : 'AVAILABLE';
		},
		fetchTrucks() {
			this.trucks = [];
			axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/').then(res => {
				if (res.status === 200) {
					this.trucks = res.data;
					this.fetchingTrucks = false;

				}
			});
		},
		addTruck(t) {
			this.showTruckForm = false;
			clearInterval(this.truckPolling);
			axios.post(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/', t)
				.then(res => {
					if (res.status === 200) {
						t.truckId = res.data;
						this.trucks.push(t);
						this.activatePolling();
					}
				});
		},
		deleteTruck(t) {
			clearInterval(this.truckPolling);
			this.trucks.splice(this.trucks.indexOf(t), 1);
			axios.delete(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/'+t.truckId).then(res => {
				if (res.status === 200) {
					this.activatePolling();
				}
			});
		},
		updateTrucks() {
			axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/').then(res => {
				if (res.status === 200) {
					this.trucks = res.data;
				}
			});
		},
		truckOccupiedPercentage(t) {
			return Math.round(t.occupiedVolume.value/t.capacity * 100);
		}
	},
};
</script>

<style scoped>
a { text-decoration: none; }
.truck-status-false {
  background-color: #C8E6C9;
  color: green;
  font-weight: bold;
  padding: 1px 5px;
}
.truck-status-true {
  background-color: #ffcc80;
  color: #ef6c00;
  font-weight: bold;
  padding: 1px 5px;
}

.product-description {
  margin: 0 0 1rem 0;
}

</style>
