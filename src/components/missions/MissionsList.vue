<template>
  <div>
    <h1> Missions </h1>
    <div class="flex p-8 w-screen">
      <DataTable
        :value="missions"
        class="p-datatable-lg w-full"
        responsive-layout="scroll"
      >
        <Column
          field="id"
          header="ID"
        />
        <Column
          field="date"
          header="Date"
        />
        <Column
          field="typeOfWaste"
          header="Type Of Waste"
        />
        <Column
          field="typeOfMission"
          header="TypeOfMission"
        />
        <Column
          field="truck"
          header="Truck"
        />
        <Column
          field="completed"
          header="Status"
        >
          <template #body="slotProps">
            <span :class="'p-badge'">{{ slotProps.data.completed }}</span>
          </template>
        </Column>
        <Column
          header="Steps"
        >
          <template #body="slotProps">
            <router-link
              v-slot="{href, navigate}"
              :to="missionDetailsPath(slotProps.data.id)"
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
import m  from '@/components/missions/missions.json';
import Button from 'primevue/button';
export default {
	name: 'MissionsList',
	components:{
		DataTable,
		Column,
		Button,
	},
	data() {
		return {
			missions:[], 
		};
	},
	mounted() {
		this.missions = m.missions;
	},
	methods:{
		missionDetailsPath(id) {
			return '/dashboard/missions/'+id;
		}
	},
};
</script>

<style scoped>
a { text-decoration: none; }
</style>
