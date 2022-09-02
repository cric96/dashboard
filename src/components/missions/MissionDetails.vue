<template>
  <div class="flex flex-column md:justify-content-center card-container md:m-5 w-full">
    <ProgressSpinner
      v-if="steps.length === 0"
    />
    <Card
      v-if="currentMission !== null"
      class="m-3"
    >
      <template #title>
        {{ currentMission.missionId }}
      </template>
      <template #content>
        <ul style="list-style-type:none; text-align: left">
          <li> Type of Mission: {{ currentMission.typeOfMission }} </li>
          <li> Type of Waste: {{ currentMission.typeOfWaste.wasteName }} </li>
          <li> Truck id: {{ currentMission.truckId }} </li>
        </ul>
      </template>
    </Card>
    <div
      v-if="steps.length > 0"
      class="flex justify-content-center align-items-center md:w-full"
    >
      <div class="flex md:w-10">
        <Timeline
          :value="steps.filter(s => s.show).reverse()"
          :align="'alternate'"
          class="w-full"
        >
          <template #marker="slotProps">
            <Button
              class="p-button-rounded"
              :icon="slotProps.item.icon"
              :style="{backgroundColor: slotProps.item.color, borderColor:slotProps.item.color}"
              @click="show(slotProps.item.id)"
            />
          </template>
          <template #content="slotProps">
            <div class="mb-3">
              <Card v-if="slotProps.item.id !== 'next' && slotProps.item.id !== 'prev' && slotProps.item.id !== 'start' && slotProps.item.id !== 'end'">
                <template #title>
                  <div
                    class="m-0 md:m-3 text-base md:text-3xl"
                  >
                    STEP #{{ slotProps.item.id }}
                  </div>
                  <Divider class="hidden md:block" />
                </template>
                <template #content>
                  <div class="md:mt-3 md:pt-3">
                    <span class="text-xs md:text-2xl"> <i class="pi pi-map-marker text-xs md:text-xl" /> {{ slotProps.item.stepId }}</span>
                  </div>
                </template>
              </Card>
            </div>
          </template>
        </Timeline>
      </div>
    </div>
  </div>
</template>

<script>
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useMissionStore } from '@/stores/MissionStore';
import ProgressSpinner from 'primevue/progressspinner';
import axios from 'axios';
import Divider from 'primevue/divider';

export default {
	name: 'MissionDetails',
	components:{
		Timeline,
		Card,
		Button,
		ProgressSpinner,
		Divider,
	},
	setup() {
		const missionsStore = useMissionStore();
		return { missionsStore };
	},
	data() {
		return {
			steps:[],
			currentMission:null,
			id:null,
			extremes:null,
			polling:null,
		};
	},
	mounted() {
		this.id = 'id' in this.$route.params ? this.$route.params.id : this.$route.params.truckId;
		this.missionsStore.fetchMissions().then(missions => {
			this.findMissionAndSetSteps(missions, this.id);
			this.polling = setInterval(() => {
				if (this.steps.length > 0 && this.steps.every(s => 'show' in s)) {
					this.missionsStore.fetchMissions().then(missions => {
						const updatedSteps = this.findMissionFromId(missions, this.id).missionSteps;
						this.setStepsUI(updatedSteps);
						updatedSteps.forEach(ns => {
							const os = this.steps.find(s => s.stepId === ns.stepId);
							if (os != null) {
								ns.show = os.show;
							}
						});
						let ongoing = updatedSteps.filter(s => !s.completed)[0];
						if (ongoing !== null) {
							ongoing.icon = 'pi pi-clock';
							ongoing.color = '#ffab00';
							ongoing.show = true;
						}
						this.steps.splice(1, updatedSteps.length, ...updatedSteps);
					});
				}
			}, 3000);
		});
	},
	unmounted() {
		clearInterval(this.polling);
		this.steps = [];
	},
	methods:{
		show(id) {
			if (id === 'next' || id === 'prev') {
				this.steps.filter(e => id === 'next' ? !e.completed : e.completed).forEach(e => e.show = true);
				if (id === 'next') {
					this.steps.splice(-1, 1, { id:'end', icon:'pi pi-check-circle', color:'#33437e', show:true });
				} else {
					this.steps.splice(0, 1, { id:'start', icon:'', color:'#33437e', show:true });
				}
			}
		},
		findMissionAndSetSteps(missions, id) {
			this.currentMission = this.findMissionFromId(missions, id);
			this.steps = this.currentMission.missionSteps;
			this.updateSteps();
		},
		setStepsUI(steps) {
			for (let i = 0; i < steps.length; i++) {
				const e = steps[i];
				e.id = i;
				e.icon = e.completed ? 'pi pi-check-circle' : 'pi pi-circle';
				e.color = e.completed ? '#9cff57' : 'lightgray';
				e.show = false;
			}
		},
		updateSteps() {
			this.setStepsUI(this.steps);
			let start = this.manageCompletedSteps();
			let end = this.manageUncompletedSteps();
			if (this.extremes !== null &&
          'id' in this.extremes.start &&
          'id' in this.extremes.end) {
				start = this.extremes.start;
				if (start.id === 'start') {
					this.getCompletedSteps().forEach(s => s.show = true);
				}
				end = this.extremes.end;
				if (end.id === 'end') {
					this.getUncompletedSteps().forEach(s => s.show = true);
				}
			}
			this.steps.unshift(start);
			this.steps.push(end);
		},
		getCompletedSteps() {
			return this.steps.filter(s => s.completed);
		},
		getUncompletedSteps() {
			return this.steps.filter(s => !s.completed);
		},
		manageCompletedSteps() {
			let start = { id:'start', icon:'', color:'#33437e', show:true };
			let last = this.steps.findLast(e => e.completed);
			if (last !== undefined) last['show'] = true;
			if (this.getCompletedSteps().length > 1) {
				start.id = 'prev';
				start.icon = 'pi pi-angle-double-down';
				start.color = '#33437e';
			}
			return start;
		},
		manageUncompletedSteps() {
			if (this.getUncompletedSteps().length === 0) {
				return { id:'end', icon:'pi pi-check-circle', color:'#33437e', show:true };
			} else {
				let ongoing = this.getUncompletedSteps()[0];
				ongoing.icon = 'pi pi-clock';
				ongoing.color = '#ffab00';
				ongoing.show = true;
				if (this.getUncompletedSteps().length > 1) {
					let next = this.getUncompletedSteps()[1];
					next.show = true;
					if (this.getUncompletedSteps().length > 2) {
						return { id:'next', icon:'pi pi-angle-double-up', color:'#33437e', show:true };
					}
				}
			}
		},
		findMissionFromId(missions, id) {
			if (id.startsWith('Truck')) {
				return missions.find(m => m.truckId === id);
			} else {
				return missions.find(m => m.missionId === id);
			}
		},
		updateMissions(id) {
			console.log('Update for ' + id);
			if (!this.fetchingMissions && id === this.currentMission.missionId) {
				console.log('UPDATE');
				axios.get(process.env.VUE_APP_MISSION_MICROSERVICE + '/missions/').then(res => {
					if (res.status === 200) {
						let start = this.steps[0];
						let end = this.steps[this.steps.length - 1];
						this.extremes = {
							start: start,
							end: end
						};
						this.missions = res.data;
						this.setCurrentMission(id);
					}
				});
			}
		},
	},
};
</script>

<style scoped>
.p-card, .p-card-body {
  align-self: stretch !important;
  flex: auto !important;
}
a { text-decoration: none; }

::v-deep(.p-card-content){
  padding-top: 0 !important;
}
</style>
