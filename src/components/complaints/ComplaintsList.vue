<template>
  <div class="flex flex-column w-full">
    <DataView
      :value="filteredComplaints"
      layout="grid"
      :paginator="true"
      :rows="9"
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
          class="col-12 md:col-4"
          style="background-color: #EFF3F8"
        >
          <Card
            style="margin: 30px 30px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
          >
            <template #title>
              <p style="text-transform: capitalize">
                {{ slotProps.data.title }}
              </p>
            </template>
            <template #subtitle>
              <ul style="list-style-type:none; text-align: start">
                <li> ID: {{ slotProps.data.id }} </li>
                <li> Status: <span :class="'complaint-'+slotProps.data.status.toLowerCase()"> {{ slotProps.data.status }} </span></li>
                <li v-if="userStore.isManager">
                  Issuer: {{ slotProps.data.issuer }}
                </li>
              </ul>
            </template>
            <template #content>
              {{ slotProps.data.message }}
            </template>
            <template #footer>
              <div v-if="userStore.isManager && slotProps.data.status === 'OPEN'">
                <Divider />
                <Button @click="slotProps.data.status = 'CLOSE'">
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
// import axios from 'axios';
import { useUserStore } from '@/components/stores/UserStore';
import Divider from 'primevue/divider';
import ComplaintFilterPanel from '@/components/complaints/ComplaintFilterPanel';
import OverlayPanel from 'primevue/overlaypanel';
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
		return { userStore };
	},
	data() {
		return {
			complaints:[],
			filters: { statusFilters:[], issuers: [] },
		};
	},
	computed:{
		filteredComplaints() {
			return this.complaints
				.filter(c => this.filters.statusFilters.length === 0 || this.filters.statusFilters.includes(c.status))
				.filter(c => this.filters.issuers.length === 0 || this.filters.issuers.includes(c.issuer));
		}
	},
	created() {
		// if (this.userStore.isCitizen)
		// 	axios.get('http://localhost:3000/complaints/user/' + this.userStore.userId).then(res => this.complaints = res.data.reverse());
		// else if (this.userStore.isManager)
		// 	axios.get('http://localhost:3000/complaints/').then(res => this.complaints = res.data.reverse());
		for (let i = 0; i < 15; i++) {
			this.complaints.push({ id: '345', ownerId: '123', title: 'smart card reader broken',
				issuer:'CITIZEN', message:'the plastic dumpster in cp is broken', status:'OPEN' });
		}
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
.complaint-close {
  background-color: #FFCDD2;
  color: #CF222E;
  font-weight: bold;
  padding: 1px 5px;
}
::v-deep(.grid-nogutter){
  background-color: #EFF3F8;
}
::v-deep(.p-paginator){
  background-color: #f8f9fa;
}
</style>
