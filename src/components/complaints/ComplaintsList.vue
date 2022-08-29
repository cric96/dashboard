<template>
  <div class="flex flex-column w-full">
    <DataView
      :value="filteredComplaints"
      layout="grid"
      :paginator="true"
      :rows="8"
      class="m-5"
    >
      <template #header>
        <div style="text-align: right">
          <Button
            class="p-button-text p-button-rounded"
            icon="pi pi-filter"
            @click="e => $refs.fop.toggle(e)"
          />
        </div>
        <OverlayPanel ref="fop">
          <ComplaintFilterPanel
            :filters="filters"
            @filters="applyFilters"
          />
        </OverlayPanel>
      </template>
      <template #grid="slotProps">
        <div
          class="col-12 md:col-3"
          style="background-color: #EFF3F8"
        >
          <Card class="m-3 md:m-5">
            <template #title>
              <p style="text-transform: capitalize">
                {{ slotProps.data.title }}
              </p>
            </template>
            <template #subtitle>
              <ul style="margin:0; list-style-type:none; text-align: start">
                <li> ID: {{ slotProps.data.id }} </li>
                <li> Status: <span :class="'complaint-'+slotProps.data.status.toLowerCase()"> {{ slotProps.data.status }} </span></li>
                <li v-if="userStore.isManager">
                  Issuer: {{ slotProps.data.issuer }}
                </li>
              </ul>
            </template>
            <template #content>
              <Divider />
              {{ slotProps.data.message }}
            </template>
            <template #footer>
              <div v-if="userStore.isManager && slotProps.data.status === 'OPEN'">
                <Divider />
                <Button @click="complaintsStore.closeComplaint(slotProps.data.id)">
                  CLOSE
                </Button>
              </div>
            </template>
          </Card>
        </div>
      </template>
      <template #empty>
        No Complaints to Show
      </template>
    </DataView>
    <router-link
      v-if="userStore.isCitizen"
      v-slot="{href, navigate}"
      :to="'/dashboard/complaints/new'"
    >
      <Button
        :href="href"
        label="Create New"
        class="p-button-raised"
        @click="navigate"
      />
    </router-link>
  </div>
</template>

<script>
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import Card from 'primevue/card';
import { useUserStore } from '@/stores/UserStore';
import Divider from 'primevue/divider';
import ComplaintFilterPanel from '@/components/complaints/ComplaintFilterPanel';
import OverlayPanel from 'primevue/overlaypanel';
import { useComplaintStore } from '@/stores/ComplaintsStore';
export default {
	name: 'ComplaintList',
	components:{
		ComplaintFilterPanel,
		OverlayPanel,
		Button,
		DataView,
		Card,
		Divider,
	},
	setup() {
		const userStore = useUserStore();
		const complaintsStore = useComplaintStore();
		return { userStore, complaintsStore };
	},
	data() {
		return {
			filters: { statusFilters:[], issuers: [] },
		};
	},
	computed:{
		filteredComplaints() {
			return this.complaintsStore.complaints
				.filter(c => this.filters.statusFilters.length === 0 || this.filters.statusFilters.includes(c.status))
				.filter(c => this.filters.issuers.length === 0 || this.filters.issuers.includes(c.issuer));
		}
	},
	created() {
		if (this.userStore.isCitizen)
			this.complaintsStore.fetchUserComplaints(this.userStore.userId);
		else if (this.userStore.isManager)
			this.complaintsStore.fetchComplaints();
	},
	methods: {
		applyFilters(f) {
			this.filters = f;
			this.$refs.fop.hide();
		}
	}
};
</script>

<style scoped>
a { text-decoration: none; }
.complaint-open {
  background-color: #C8E6C9;
  color: green;
  font-weight: bold;
  padding: 1px 5px;
}
.complaint-closed {
  background-color: #FFCDD2;
  color: #CF222E;
  font-weight: bold;
  padding: 1px 5px;
}
li{
  word-break: break-all;
}
::v-deep(.grid-nogutter){
  background-color: #EFF3F8;
}
::v-deep(.p-paginator){
  background-color: #f8f9fa;
}
::v-deep(.p-card-footer){
  padding-top: 0;
}
::v-deep(.p-card-content){
  padding: 0;
}
</style>
