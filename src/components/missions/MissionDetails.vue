<template>
  <div class="flex flex-column justify-content-start card-container m-5 w-full">
    <Card class="m-3">
      <template #title>
        Mission id
      </template>
      <template #content>
        <ul style="list-style-type:none; text-align: left">
          <li> Type of Mission: {{ missionsStore.currentMission.typeOfMission }} </li>
          <li> Type of Waste: {{ missionsStore.currentMission.typeOfWaste.wasteName }} </li>
          <li> Truck id: {{ missionsStore.currentMission.truckId }} </li>
        </ul>
      </template>
    </Card>
    <Timeline
      :value="stepsToDisplay"
      align="alternate"
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
        <div class="flex flex-wrap align-content-start w-full">
          <Card v-if="slotProps.item.id !== 'next' && slotProps.item.id !== 'prev'">
            <template #title>
              STEP #{{ slotProps.item.id }}
            </template>
            <template #content>
              <div>
                <p>
                  Collection Point collected: {{ slotProps.item.stepId }}
                </p>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Timeline>
  </div>
</template>

<script>
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useMissionStore } from '@/stores/MissionStore';

export default {
	name: 'MissionDetails',
	components:{
		Timeline,
		Card,
		Button,
	},
	setup() {
		const missionsStore = useMissionStore();
		return { missionsStore };
	},
	data() {
		return {
			missionId:this.$route.params.id,
			steps:null,
			stepsToDisplay:[],
		};
	},
	created() {
		console.log(this.missionId);
		this.missionsStore.setCurrentMission(this.missionId);
		this.steps = this.missionsStore.currentMission.missionSteps;
		console.log(this.steps);
		for (let i = 0; i < this.steps.length; i++) {
			const e = this.steps[i];
			e.id = i;
			e['icon'] = e.completed ? 'pi pi-check-circle' : 'pi pi-circle';
			e['color'] = e.completed ? '#9cff57' : '#ffeb3b';
			e['show'] = true;
		}
		// let next2 = this.steps.filter(e => !e.completed).slice(0,2);
		// console.log(next2);
		// next2.forEach(e => e['show']= true);
		// let next = next2[0];
		// next['icon'] = 'pi pi-chevron-circle-up';
		// next['color'] = '#ffab00';
		// let last = this.steps.findLast(e => e.completed);
		// last['show'] = true;
		this.stepsToDisplay = this.steps.filter(e => e.show).reverse();
		// if (this.steps.length > 3) {
		// 	let seeMoreNext = { id:'next', icon:'pi pi-angle-double-up', color:'#aeaeae' };
		// 	let seeMorePrev = { id:'prev', icon:'pi pi-angle-double-down', color:'#aeaeae' };
		// 	this.stepsToDisplay.unshift(seeMoreNext);
		// 	this.stepsToDisplay.push(seeMorePrev);
		// }
	},
	methods:{
		show(id) {
			if (id === 'next' || id === 'prev') {
				this.steps.filter(e => id === 'next' ? !e.completed : e.completed).forEach(e => e['show'] = true);
				let seeMore = this.stepsToDisplay.find(e => e.id === (id === 'next' ? 'prev' : 'next'));
				this.stepsToDisplay = this.steps.filter(e => e.show).reverse();
				if (seeMore) this.stepsToDisplay.splice((id === 'next' ? this.stepsToDisplay.length : 0), 0, seeMore);
			}
		}
	},
};
</script>

<style scoped>
.p-card, .p-card-body {
  align-self: stretch !important;
  flex: auto !important;
}
a { text-decoration: none; }

</style>
