<template>
  <Card class="flex-grow-1 justify-content-between flex-wrap flex-row">
    <template #title>
      <h3 class="flex-grow-1">
        {{ dumpster.id }}
      </h3>
    </template>
    <template #subtitle>
      <p>
        Status: <Tag
          :value="dumpsterStatusToValue"
          :rounded="true"
          :severity="dumpsterStatusToSeverity"
        />
      </p>
    </template>
    <template #content>
      <div>
        <div>
          Type of waste: <Tag
            :value="dumpsterOrdinaryWaste.wasteName"
            :rounded="true"
            :style="cssDumpsterColor"
          />
        </div>
        <div>
          <ProgressBar :value="dumpsterOccupationPercentage">
            {{ dumpsterOccupationPercentage }}%
          </ProgressBar>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import ProgressBar from 'primevue/progressbar';
export default {
	name: 'DCard',
	components: {
		Card,
		Tag,
		ProgressBar,
	},
	props: {
		'dumpster': {
			type: Object,
			default: null,
		}
	},
	computed:{
		dumpsterStatusToValue (){
			return this.dumpster.available ? 'available': 'not available';
		},
		dumpsterStatusToSeverity (){
			return this.dumpster.available ? 'success': 'danger';
		},
		dumpsterOccupationPercentage (){
			return this.dumpster.occupiedVolume.value/this.dumpster.dumpsterType.size.capacity*100;
		},
		dumpsterOrdinaryWaste (){
			return this.dumpster.dumpsterType.typeOfOrdinaryWaste;
		},
		cssDumpsterColor (){
			return {
				'background-color': this.dumpsterOrdinaryWaste.wasteColor.toLowerCase()
			};
		}
	}
};
</script>

<style scoped>
.p-card .p-card-body {
	padding: 1.25rem;
	align-self: stretch;
	flex: auto;
}
</style>
