<template>
  <div class="flex flex-wrap align-content-start w-100">
    <Card>
      <template #title>
        <div class="flex flex-wrap justify-content-end align-content-center">
          <div>
            <h3 style="margin: 0">
              {{ dumpster.id }}
            </h3>
          </div>
          <Button
            icon="pi pi-trash"
            class="p-button-danger p-button-rounded"
            @click="$emit('delete')"
          />
        </div>

        <Divider />
      </template>
      <template #content>
        <div>
          <p>
            Status: <span :class="'dumpster-'+dumpsterStatusToValue.replace(' ', '-')">
              {{ dumpsterStatusToValue.toUpperCase() }}
            </span>
          </p>
          <div>
            Type of waste: <Tag
              :value="dumpsterOrdinaryWaste.wasteName"
              :rounded="true"
              :style="cssDumpsterColor"
            />
          </div>
          <div class="flex justify-content-start align-content-center">
            <p>Occupied percentage:</p>
            <ProgressBar
              class="mt-3 ml-2"
              :value="dumpsterOccupiedPercentage"
              style="width: 60%"
            >
              {{ dumpsterOccupiedPercentage }}%
            </ProgressBar>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import ProgressBar from 'primevue/progressbar';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
export default {
	name: 'DCard',
	components: {
		Card,
		Tag,
		ProgressBar,
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
				'background-color': this.dumpsterOrdinaryWaste.wasteColor.toLowerCase()
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
