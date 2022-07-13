<template>
  <div class="flex flex-wrap align-content-start w-100">
    <Card>
      <template #title>
        {{ dumpster.id }}
        <Divider />
      </template>
      <template #content>
        <div>
          <p>
            Status: <Tag
              :value="dumpsterStatusToValue"
              :rounded="true"
              :severity="dumpsterStatusToSeverity"
            />
          </p>
          <div>
            Type of waste: <Tag
              :value="dumpsterOrdinaryWaste.wasteName"
              :rounded="true"
              :style="cssDumpsterColor"
            />
          </div>
          <p>Occupied percentage:</p>
          <ProgressBar :value="dumpsterOccupiedPercentage">
            {{ dumpsterOccupiedPercentage }}%
          </ProgressBar>
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
export default {
	name: 'DCard',
	components: {
		Card,
		Tag,
		ProgressBar,
		Divider,
	},
	props: {
		'dumpster': {
			type: Object,
			default: null,
		}
	},
	computed:{
		dumpsterStatusToValue() {
			return this.dumpster.available ? 'available': 'not available';
		},
		dumpsterStatusToSeverity() {
			return this.dumpster.available ? 'success': 'danger';
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
</style>
