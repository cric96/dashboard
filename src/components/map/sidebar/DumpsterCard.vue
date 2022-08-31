<template>
  <div class="flex flex-wrap align-content-start w-100">
    <Card class="">
      <template #title>
        <div class="flex flex-column flex-wrap justify-content-end align-content-center">
          <div>
            <h3
              class="text-base lg:text-2xl m-0"
            >
              {{ dumpster.id }}
            </h3>
          </div>
          <div class="flex justify-content-end">
            <Button
              v-if="userStore.isManager"
              icon="pi pi-trash"
              class="p-button-danger p-button-rounded"
              @click="$emit('delete')"
            />
          </div>
        </div>

        <Divider />
      </template>
      <template #content>
        <div class="flex justify-content-between align-content-center">
          <div class="flex flex-column justify-content-evenly align-content-center">
            <p>
              Status: <span :class="'dumpster-'+dumpsterStatusToValue.replace(' ', '-')">
                {{ dumpsterStatusToValue.toUpperCase() }}
              </span>
            </p>
            <div>
              Type of waste: <Tag
                class="py-2 px-3 m-1 text-sm"
                :value="dumpsterOrdinaryWaste.wasteName.replace('_', ' ')"
                :rounded="true"
                :style="cssDumpsterColor"
              />
            </div>
          </div>
          <div class="flex flex-column justify-content-center align-content-center">
            <p>Occupied percentage:</p>
            <div class="flex justify-content-center align-content-center">
              <Knob
                v-model="dumpsterOccupiedPercentage"
                :max="100"
                :readonly="true"
              />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Knob from 'primevue/knob';
import { useUserStore } from '@/stores/UserStore';
export default {
	name: 'DCard',
	components: {
		Card,
		Tag,
		Knob,
		Divider,
		Button,
	},
	props: {
		'dumpster': {
			type: Object,
			default: null,
		}
	},
	emits: ['delete'],
	setup() {
		const userStore = useUserStore();
		return { userStore };
	},
	computed:{
		dumpsterStatusToValue() {
			return this.dumpster.available ? 'available': 'not available';
		},
		dumpsterOccupiedPercentage() {
			return this.dumpster.occupiedVolume.value/this.dumpster.dumpsterType.size.capacity*100;
		},
		dumpsterOrdinaryWaste() {
			return this.dumpster.dumpsterType.typeOfOrdinaryWaste;
		},
		cssDumpsterColor() {
			return {
				'background-color': this.dumpsterOrdinaryWaste.wasteColor.toLowerCase(),
				'color': this.dumpsterOrdinaryWaste.wasteName === 'PLASTIC_ALUMINIUM' ? 'black' : 'white'
			};
		}
	}
};
</script>

<style scoped>
.p-card, .p-card-body {
	align-self: stretch !important;
	flex: auto !important;
}
.p-card-content {
	margin-top: 0 !important;
	padding-top: 0 !important;
}
.dumpster-available{
  background-color: #C8E6C9;
  color: green;
  font-weight: bold;
  padding: 1px 5px;
}
.dumpster-not-available{
  background-color: #FFCDD2;
  color: #CF222E;
  font-weight: bold;
  padding: 1px 5px;
}
</style>
