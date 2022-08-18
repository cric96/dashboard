<template>
  <div>
    <DataView
      :value="bookings"
      layout="grid"
      :paginator="bookings.length > 9"
      :rows="9"
      class="p-5"
    >
      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <Card
            style="margin: 30px 30px"
          >
            <template #title>
              <p>At Home Collection Booking</p>
            </template>
            <template #subtitle>
              ID: {{ slotProps.data._id }}
            </template>
            <template #content>
              <ul style="list-style-type:none;">
                <li> Status: {{ slotProps.data.status }} </li>
                <li> Waste Type: {{ slotProps.data.typeOfWaste.wasteName }} </li>
              </ul>
              <p>MADE ON {{ printPrettyDate(slotProps.data.datetime) }}</p>
            </template>
          </Card>
        </div>
      </template>
    </DataView>
    <router-link
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
import axios from 'axios';
import moment from 'moment';
export default {
	name: 'BookingList',
	components:{
		Button,
		DataView,
		Card,
	},
	data() {
		return {
			bookings:[],
		};
	},
	created() {
		axios.get('http://localhost:3000/bookings/user/123').then(res => this.bookings = res.data.reverse());
	},
	methods: {
		printPrettyDate(d) {
			return moment(d).format('DD MMMM YYYY');
		}
	}
};
</script>

<style scoped>
a { text-decoration: none; }

</style>
