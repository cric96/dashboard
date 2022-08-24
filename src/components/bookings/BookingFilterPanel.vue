<template>
  <div class="outer-container">
    <h5>STATUS</h5>
    <div
      v-for="state in states"
      :key="state"
      class="field-checkbox"
    >
      <Checkbox
        v-model="statusFilters"
        name="state"
        :input-id="'state'+state.toLowerCase()"
        :value="state"
      />
      <label
        :class="'booking-status-'+state.toLowerCase()"
        :for="'state'+state.toLowerCase()"
      >{{ state }}</label>
    </div>
    <h5>TYPE OF WASTE</h5>
    <div
      v-for="waste in typesOfWaste"
      :key="waste"
      class="field-checkbox"
    >
      <Checkbox
        v-model="wasteFilters"
        name="waste"
        :input-id="'waste'+waste.toLowerCase()"
        :value="waste"
      />
      <label
        :for="'waste'+waste.toLowerCase()"
      >{{ waste }}</label>
    </div>

    <Divider />
    <Button
      class="p-button-sm"
      @click="$emit('filters', {statusFilters, wasteFilters})"
    >
      Apply
    </Button>
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox';
import { useUserStore } from '@/components/stores/UserStore';
import Divider from 'primevue/divider';
import Button from 'primevue/button';

export default {
	name: 'ComplaintFilterPanel',
	components:{
		Checkbox,
		Divider,
		Button
	},
	props:{
		'filters': {
			type:Object,
			require:true,
			default:null
		}
	},
	emits: ['filters'],
	setup() {
		const userStore = useUserStore();
		return { userStore };
	},
	data() {
		return {
			statusFilters:this.filters.statusFilters,
			wasteFilters:this.filters.wasteFilters,
			states:['PENDING', 'ASSIGNED' ,'COMPLETED'],
			typesOfWaste:[
				'TWIGS',
				'WASTE OIL',
				'IRON',
				'ELECTRONICS',
				'CLOTHES',
				'OTHER',
			],
		};
	}
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
.booking-status-pending {
  background-color: #c5cae9;
  color: #303f9f;
  font-weight: bold;
  padding: 1px 5px;
}
.booking-status-assigned {
  background-color: #ffcc80;
  color: #ef6c00;
  font-weight: bold;
  padding: 1px 5px;
}
.booking-status-completed {
  background-color: #C8E6C9;
  color: green;
  font-weight: bold;
  padding: 1px 5px;
}
.outer-container::v-deep(.p-scrollpanel-content) {
  padding: 18px !important;
}



</style>
