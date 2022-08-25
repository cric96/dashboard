<template>
  <div class="outer-container">
    <h5>STATUS</h5>
    <div class="field-checkbox">
      <Checkbox
        v-model="statusFilters"
        name="state"
        input-id="state1"
        value="OPEN"
      />
      <label
        class="complaint-open"
        for="state1"
      >OPEN</label>
    </div>
    <div class="field-checkbox">
      <Checkbox
        v-model="statusFilters"
        name="state"
        input-id="state2"
        value="CLOSE"
      />
      <label
        class="complaint-close"
        for="state2"
      >CLOSE</label>
    </div>
    <div v-if="userStore.isManager">
      <h5>ISSUER</h5>
      <div class="field-checkbox">
        <Checkbox
          v-model="issuers"
          name="issuer"
          input-id="issuer1"
          value="CITIZEN"
        />
        <label
          for="issuer1"
        >CITIZEN</label>
      </div>
      <div class="field-checkbox">
        <Checkbox
          v-model="issuers"
          name="issuer"
          input-id="issuer2"
          value="DUMPSTER"
        />
        <label
          for="issuer1"
        >DUMPSTER</label>
      </div>
    </div>
    <Divider />
    <Button
      class="p-button-sm"
      @click="$emit('filters', {statusFilters, issuers})"
    >
      Apply
    </Button>
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox';
import { useUserStore } from '@/stores/UserStore';
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
			issuers:this.filters.issuers,
		};
	}
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
.complaint-open {
  background-color: #C8E6C9;
  color: green;
  font-weight: bold;
  padding: 1px 5px;
}
.complaint-close {
  background-color: #FFCDD2;
  color: #CF222E;
  font-weight: bold;
  padding: 1px 5px;
}
.outer-container::v-deep(.p-scrollpanel-content) {
  padding: 18px !important;
}



</style>
