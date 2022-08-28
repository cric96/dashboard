<template>
  <div>
    <h1> Missions </h1>
    <ProgressSpinner v-if="missionsStore.fetchingMissions" />
    <div
      v-if="!missionsStore.fetchingMissions"
      class="flex p-8 w-screen"
    >
      <DataTable
        :value="missionsStore.missions"
        class="p-datatable-lg w-full"
        responsive-layout="scroll"
      >
        <Column
          field="missionId"
          header="ID"
        />
        <Column
          field="date"
          header="Date"
        />
        <Column
          field="typeOfWaste.wasteName"
          header="Type Of Waste"
        />
        <Column
          field="typeOfMission"
          header="TypeOfMission"
        />
        <Column
          field="truckId"
          header="Truck"
        />
        <Column
          field="completed"
          header="Status"
        >
          <template #body="slotProps">
            <span :class="'mission-status-'+slotProps.data.completed">{{ missionStatus(slotProps.data.completed) }}</span>
          </template>
        </Column>
        <Column
          header="Steps"
        >
          <template #body="slotProps">
            <router-link
              v-slot="{href, navigate}"
              :to="'/dashboard/missions/'+ slotProps.data.missionId"
            >
              <Button
                :href="href"
                class="p-button-sm p-button-raised p-button-text"
                icon="pi pi-list"
                @click="navigate"
              />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { useMissionStore } from '@/stores/MissionStore';
export default {
	name: 'MissionsList',
	components:{
		DataTable,
		Column,
		Button,
		ProgressSpinner,
	},
	setup() {
		const missionsStore = useMissionStore();
		return { missionsStore };
	},
	mounted() {
		this.missionsStore.fetchMissions();
	},
	methods:{
		missionStatus(completed) {
			console.log('mission-status-'+completed);
			return completed ? 'COMPLETED' : 'IN PROGRESS';
		},

	},
};
</script>

<style scoped>
a { text-decoration: none; }
.mission-status-true {
  background-color: #C8E6C9;
  color: green;
  font-weight: bold;
  padding: 1px 5px;
}
.mission-status-false {
  background-color: #ffcc80;
  color: #ef6c00;
  font-weight: bold;
  padding: 1px 5px;
}
</style>
