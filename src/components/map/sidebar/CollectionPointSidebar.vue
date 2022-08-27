<template>
  <Sidebar @item-updated="updateCollectionPointId">
    <template #header>
      <div class="flex flex-wrap align-content-center justify-content-end">
        <div><h1> {{ collectionPointId }} </h1></div>
        <div class="flex justify-content-around">
          <Button
            class="p-button-rounded p-button-success m-1"
            icon="pi pi-plus"
          />
          <Button
            class="p-button-rounded p-button-danger m-1"
            icon="pi pi-trash"
            @click="$emit('deleteCollectionPoint', collectionPointId)"
          />
        </div>
      </div>
    </template>
    <template
      v-if="dumpsters!==null"
      #content
    >
      <div class="flex flex-column justify-content-evenly">
        <DumpsterCard
          v-for="d in dumpsters"
          :key="d"
          class="flex align-items-center justify-content-center m-2"
          :dumpster="d"
          @delete="deleteDumpster(d)"
        />
      </div>
    </template>
  </Sidebar>
</template>

<script>
import Sidebar from '@/components/map/sidebar/Sidebar';
import DumpsterCard from '@/components/map/sidebar/DumpsterCard';
import axios from 'axios';
import Button from 'primevue/button';

export default {
	name: 'CollectionPointSidebar',
	components:{
		Sidebar,
		DumpsterCard,
		Button,
	},
	emits: ['deleteCollectionPoint'],
	data() {
		return {
			collectionPointId:null,
			dumpsters:[],
		};
	},
	methods:{
		fetchCollectionPointDumpsters() {
			this.dumpsters = [];
			axios.get(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/collectionpoints/'+this.collectionPointId+'/dumpsters', {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				}
			})
				.then(res => {
					console.log(res);
					res.data.forEach(d => this.dumpsters.push(d));
				});
		},
		updateCollectionPointId(id) {
			this.collectionPointId = id;
			this.fetchCollectionPointDumpsters();
		},
		deleteDumpster(d) {
			this.dumpsters.splice(this.dumpsters.indexOf(d), 1);
			axios.delete(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/dumpsters/'+d.id).then(res => {
				console.log(res);
			});
		},
	},
};
</script>

<style scoped>

</style>
