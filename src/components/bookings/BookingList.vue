<template>
  <div
    class="flex flex-column w-full"
    style="text-align: center"
  >
    <DataView
      :value="filteredBookings"
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
          <BookingFilterPanel
            :filters="filters"
            @filters="applyFilters"
          />
        </OverlayPanel>
      </template>
      <template #grid="slotProps">
        <div
          class="flex justify-content-center col-12 md:col-4"
          style="background-color: #EFF3F8;"
        >
          <Card
            class=" m-5 w-full"
            style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
          >
            <template #title>
              <p>At Home Collection Booking</p>
            </template>
            <template #subtitle>
              ID: {{ slotProps.data._id }}
            </template>
            <template #content>
              <ul style="list-style-type:none; text-align: left">
                <li> Status: <span :class="'booking-status-'+slotProps.data.status.toLowerCase()"> {{ slotProps.data.status }} </span> </li>
                <li> Waste Type: {{ slotProps.data.typeOfWaste.wasteName }} </li>
              </ul>
              <p>MADE ON {{ printPrettyDate(slotProps.data.datetime) }}</p>
            </template>
          </Card>
        </div>
      </template>
      <template #empty>
        No Bookings to Show
      </template>
    </DataView>
    <router-link
      v-if="userStore.isCitizen"
      v-slot="{href, navigate}"
      :to="'/dashboard/bookings/new'"
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
import moment from 'moment';
import { useUserStore } from '@/stores/UserStore';
import BookingFilterPanel from '@/components/bookings/BookingFilterPanel';
import OverlayPanel from 'primevue/overlaypanel';
import { useBookingStore } from '@/stores/BookingStore';
export default {
	name: 'BookingList',
	components:{
		BookingFilterPanel,
		Button,
		DataView,
		Card,
		OverlayPanel
	},
	setup() {
		const userStore = useUserStore();
		const bookingStore = useBookingStore();
		return { userStore, bookingStore };
	},
	data() {
		return {
			bookings:[],
			filters: { statusFilters:[], wasteFilters: [] },
		};
	},
	computed:{
		filteredBookings() {
			return this.bookingStore.bookings
				.filter(b => this.filters.statusFilters.length === 0 || this.filters.statusFilters.includes(b.status))
				.filter(b => this.filters.wasteFilters.length === 0 || this.filters.wasteFilters.includes(b.typeOfWaste.wasteName));
		}
	},
	created() {
		if (this.userStore.isCitizen)
			this.bookingStore.fetchUserBookings(this.userStore.userId);
		else if (this.userStore.isManager)
			this.bookingStore.fetchAllBookings();

	},
	methods: {
		printPrettyDate(d) {
			return moment(d).format('DD MMMM YYYY');
		},
		applyFilters(f) {
			this.filters = f;
			this.$refs.fop.hide();
		}
	}
};
</script>

<style scoped>
a { text-decoration: none; }
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
::v-deep(.grid-nogutter){
  background-color: #EFF3F8;
}

::v-deep(.p-paginator){
  background-color: #f8f9fa;
}

</style>
