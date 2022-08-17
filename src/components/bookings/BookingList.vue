<template>
  <div>
    <DataView
      :value="bookings"
      layout="grid"
      :paginator="true"
      :rows="9"
      class="w-full"
    >
      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <Card
            style="margin: 20px 10px"
          >
            <template #title>
              Prova {{ slotProps.id }}
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
//import axios from 'axios';
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
	},
};
</script>

<style scoped>
a { text-decoration: none; }

</style>
