<template>
  <ProgressSpinner v-if="missionsStore.fetchingMissions" />
  <div class="flex justify-content-center m-5 md:m-8">
    <DataView
      v-if="!missionsStore.fetchingMissions"
      :value="missionsStore.missions"
      layout="list"
      :paginator="true"
      :rows="9"
    >
      <template #list="slotProps">
        <div class="col-12">
          <div class="flex flex-column md:flex-row align-items-center justify-content-between md:p-5">
            <div class="flex flex-column align-items-center md:align-items-start justify-content-start md:text-left m-2">
              <h3 class="text-lg md:text-3xl my-2 ">
                {{ slotProps.data.missionId }}
              </h3>
              <div class="product-description">
                Type of Mission: {{ slotProps.data.typeOfMission }}
              </div>
              <div class="flex flex-row align-items-center">
                <i class="pi pi-trash mr-2" /><span class="product-category">{{ slotProps.data.typeOfWaste.wasteName }}</span>
              </div>
            </div>
            <div class="flex align-items-center flex-column justify-content-evenly">
              <span :class="'mission-status-'+slotProps.data.completed +' mt-3'">{{ missionStatus(slotProps.data.completed) }}</span>
              <router-link
                v-slot="{href, navigate}"
                :to="'/dashboard/missions/'+ slotProps.data.missionId"
              >
                <Button
                  :href="href"
                  class="p-button-sm p-button-raised my-2"
                  icon="pi pi-list"
                  label="Steps"
                  @click="navigate"
                />
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import DataView from 'primevue/dataview'; 
import { useMissionStore } from '@/stores/MissionStore';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
export default {
	name: 'MissionsListComponent',
	components:{
		DataView,
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

.product-description {
  margin: 0 0 1rem 0;
}

</style>
