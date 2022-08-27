<template>
  <Sidebar @item-updated="updateCollectionPointId">
    <template #header>
      <div class="flex flex-wrap align-content-center justify-content-end">
        <div><h1> {{ collectionPointId }} </h1></div>
        <div
          v-if="userStore.isManager"
          class="flex justify-content-around"
        >
          <Button
            class="p-button-rounded p-button-success m-1"
            icon="pi pi-plus"
            @click="showDumpsterForm=true"
          />
          <Button
            class="p-button-rounded p-button-danger m-1"
            icon="pi pi-trash"
            @click="$emit('deleteCollectionPoint')"
          />
        </div>
      </div>
    </template>
    <template
      v-if="dumpsters!==null"
      #content
    >
      <div class="flex flex-column justify-content-evenly">
        <ProgressSpinner v-if="fetchingDumpster" />
        <DumpsterCard
          v-for="d in dumpsters"
          :key="d"
          class="flex align-items-center justify-content-center m-2"
          :dumpster="d"
          @delete="deleteDumpster(d)"
        />
      </div>
      <Dialog
        v-model:visible="showDumpsterForm"
      >
        <DumpsterForm
          class="m-3"
          @dumpster="d => addDumpster(d)"
        />
      </Dialog>
    </template>
  </Sidebar>
</template>

<script>
import Sidebar from '@/components/map/sidebar/Sidebar';
import DumpsterCard from '@/components/map/sidebar/DumpsterCard';
import axios from 'axios';
import Button from 'primevue/button';
import DumpsterForm from '@/components/collectionPoints/DumpsterForm';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import { useUserStore } from '@/stores/UserStore';

export default {
	name: 'CollectionPointSidebar',
	components:{
		DumpsterForm,
		Dialog,
		Sidebar,
		DumpsterCard,
		Button,
		ProgressSpinner,
	},
	emits: ['deleteCollectionPoint'],
	setup() {
		const userStore = useUserStore();
		return { userStore };
	},
	data() {
		return {
			showDumpsterForm:false,
			collectionPointId:null,
			fetchingDumpster:true,
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
					this.fetchingDumpster = false;
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
		addDumpster(d) {
			this.showDumpsterForm=false;
			let dump = {
				dumpster: {
					capacity:d.capacity,
					wasteName:d.waste.name,
				},
				collectionPointId:this.collectionPointId
			};
			console.log(d);
			axios.post(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/dumpsters/', dump).then(res => {
				if (res.status === 200) {
					console.log(res.data);
					this.dumpsters.push(res.data);
				}
			});
		}
	},
};
</script>

<style scoped>

</style>
