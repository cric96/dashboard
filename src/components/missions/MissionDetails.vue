<template>
  <div class="flex flex-column justify-content-start card-container m-5 w-full">
    <div class="flex align-items-center justify-content-start">
      <h3>Mission id</h3>
    </div>
    <div class="flex align-items-center justify-content-start">
      Truck: xyz
    </div>
    <div class="flex align-items-center justify-content-start">
      Type of Waste : svt
    </div>
    <Timeline
      :value="eventsToDisplay"
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
            <template #subtitle>
              {{ slotProps.item.date }}
              <div>
                <i class="pi pi-map-marker" />
                {{ slotProps.item.lat }}, {{ slotProps.item.lng }}
              </div>
            </template>
            <template #content>
              <div>
                <p>
                  Collection Point collected: {{ slotProps.item.cp }}
                </p>
                <p>
                  Dumpster ID: {{ slotProps.item.dumpster }}
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

export default {
	name: 'MissionDetails',
	components:{
		Timeline,
		Card,
		Button,
	},
	data() {
		return {
			events: [
				{ id: '1', date: '16/10/2020 10:00', completed:true, cp:'123', dumpster:'1', lat:'44.12', lng:'12.32' },
				{ id: '2', date: '16/10/2020 10:00', completed:true, cp:'123', dumpster:'1', lat:'44.12', lng:'12.32' },
				{ id: '3', date: '16/10/2020 10:00', completed:false, cp:'123', dumpster:'1', lat:'44.12', lng:'12.32' },
				{ id: '4', date: '16/10/2020 10:00', completed:false, cp:'123', dumpster:'1', lat:'44.12', lng:'12.32' },
				{ id: '5', date: '16/10/2020 10:00', completed:false, cp:'123', dumpster:'1', lat:'44.12', lng:'12.32' },
			],
			eventsToDisplay:[],
		};
	},
	mounted() {
		console.log(this.events);
		this.events.forEach(e => {
			e['icon'] = e.completed ? 'pi pi-check-circle' : 'pi pi-circle';
			e['color'] = e.completed ? '#9cff57' : '#ffeb3b';
			e['show'] = false;
		});
		let next2 = this.events.filter(e => !e.completed).slice(0,2);
		console.log(next2);
		next2.forEach(e => e['show']= true);
		let next = next2[0];
		next['icon'] = 'pi pi-chevron-circle-up';
		next['color'] = '#ffab00';
		let last = this.events.findLast(e => e.completed);
		last['show'] = true;
		let seeMoreNext = { id:'next', icon:'pi pi-angle-double-up', color:'#aeaeae' };
		let seeMorePrev = { id:'prev', icon:'pi pi-angle-double-down', color:'#aeaeae' };

		this.eventsToDisplay = this.events.filter(e => e.show).reverse();
		this.eventsToDisplay.unshift(seeMoreNext);
		this.eventsToDisplay.push(seeMorePrev);
	},
	methods:{
		show(id) {
			if (id === 'next' || id === 'prev') {
				this.events.filter(e => id === 'next' ? !e.completed : e.completed).forEach(e => e['show'] = true);
				let seeMore = this.eventsToDisplay.find(e => e.id === (id === 'next' ? 'prev' : 'next'));
				this.eventsToDisplay = this.events.filter(e => e.show).reverse();
				if (seeMore) this.eventsToDisplay.splice((id === 'next' ? this.eventsToDisplay.length : 0), 0, seeMore);
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
</style>
