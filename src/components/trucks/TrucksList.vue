<template>
  <div class="flex flex-column justify-content-center">
    <h1> Trucks </h1>
    <ProgressSpinner v-if="fetchingTrucks" />
    <div
      v-if="!fetchingTrucks"
      class="flex flex-column justify-content-center px-8"
    >
      <div class="flex justify-content-end">
        <Button
          class="p-button-success p-button-rounded p-button-raised mb-3"
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
      <DataTable
        :value="trucks"
        class="p-datatable-lg"
        responsive-layout="scroll"
      >
        <Column
          field="truckId"
          header="ID"
        />
        <Column
          field="capacity"
          header="Capacity"
        />
        <Column
          field="occupiedVolume.value"
          header="Occupied Volume"
        />
        <Column
          field="inMission"
          header="Status"
        >
          <template #body="slotProps">
            <span :class="'truck-status-'+slotProps.data.inMission">{{ truckStatus(slotProps.data.inMission) }}</span>
          </template>
        </Column>
        <Column
          header="Delete"
        >
          <template #body="slotProps">
            <Button
              class="p-button-sm p-button-raised p-button-rounded p-button-danger"
              icon="pi pi-trash"
              @click="deleteTruck(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';
import Button from 'primevue/button';
import TruckForm from '@/components/trucks/TruckForm';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
export default {
	name: 'TrucksList',
	components:{
		TruckForm,
		DataTable,
		Column,
		Button,
		Dialog,
		ProgressSpinner
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
		this.truckPolling = setInterval(() => this.updateTrucks(), 3000);
	},
	unmounted() {
		clearInterval(this.truckPolling);
	},
	methods:{
		truckStatus(inMission) {
			return inMission ? 'IN MISSION' : 'AVAILABLE';
		},
		fetchTrucks() {
			this.trucks = [];
			axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/').then(res => {
				if (res.status === 200) {
					this.fetchingTrucks = false;
					console.log(res.data);
					res.data.forEach(t => this.trucks.push(t));
				}
			});
		},
		addTruck(t) {
			this.showTruckForm = false;
			axios.post(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/', t)
				.then(res => {
					if (res.status === 200) {
						t.truckId = res.data;
						this.trucks.push(t);
					}
				});
		},
		deleteTruck(t) {
			this.trucks.splice(this.trucks.indexOf(t), 1);
			axios.delete(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/'+t.truckId);
		},
		updateTrucks() {
			axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/').then(res => {
				if (res.status === 200) {
					console.log('Update');
					this.trucks = res.data;
					// this.trucks.map(obj => res.data.find(o => o.truckId === obj.truckId && o !== obj) || obj);
				}
			});
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
td {
  text-align: center !important;
  align-content: center !important;
  alignment: center !important;
}
</style>
