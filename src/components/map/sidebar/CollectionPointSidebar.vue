<template>
  <Sidebar
    class="md:min-w-min"
    @item-updated="updateCollectionPointId"
  >
    <template #header>
      <div class="flex flex-wrap align-content-center justify-content-end">
        <div>
          <h1 class="text-base lg:text-2xl">
            {{ collectionPointId }}
          </h1>
        </div>
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
      <div
        v-if="fetchingDumpster"
        class="flex justify-content-center"
      >
        <ProgressSpinner />
      </div>
      <ScrollPanel style="width: 100%; height: 100%">
        <div
          v-if="!fetchingDumpster"
          class="flex flex-column justify-content-evenly"
        >
          <DumpsterCard
            v-for="d in dumpsters"
            :key="d"
            class="flex align-items-center justify-content-center m-2"
            :dumpster="d"
            @delete="deleteDumpster(d)"
          />
        </div>
      </ScrollPanel>
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
import ScrollPanel from 'primevue/scrollpanel';

export default {
	name: 'CollectionPointSidebar',
	components:{
		DumpsterForm,
		Dialog,
		Sidebar,
		DumpsterCard,
		Button,
		ProgressSpinner,
		ScrollPanel,
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
			dumpstersPolling:null,
			dumpsters:[],
		};
	},
	unmounted() {
		clearInterval(this.dumpstersPolling);
	},
	methods:{
		fetchCollectionPointDumpsters() {
			console.log('Fetching');
			axios.get(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/collectionpoints/'+this.collectionPointId+'/dumpsters', {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				}
			})
				.then(res => {
					this.fetchingDumpster = false;
					this.dumpsters = res.data;
				});
		},
		updateCollectionPointId(id) {
			this.collectionPointId = id;
			this.fetchingDumpster=true;
			this.fetchCollectionPointDumpsters();
			if (this.dumpstersPolling !== null) clearInterval(this.dumpstersPolling);
			this.dumpstersPolling = setInterval(this.fetchCollectionPointDumpsters, 3000);
		},
		deleteDumpster(d) {
			clearInterval(this.dumpstersPolling);
			axios.delete(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/dumpsters/'+d.id).then(res => {
				console.log(res);
				this.dumpsters.splice(this.dumpsters.indexOf(d), 1);
				this.dumpstersPolling = setInterval(this.fetchCollectionPointDumpsters, 3000);
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
			clearInterval(this.dumpstersPolling);
			axios.post(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/dumpsters', dump).then(res => {
				if (res.status === 200) {
					console.log(res.data);
					var tmp = this.dumpsters;
					tmp.push(res.data);
					tmp = tmp.sort((d1, d2) => d1.id.localeCompare(d2.id, 'en', { numeric:true }));
					this.dumpsters = tmp;
					this.dumpstersPolling = setInterval(this.fetchCollectionPointDumpsters, 3000);
				}
			});
		},
	},
};
</script>

<style scoped>

</style>
