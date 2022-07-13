<template>
  <Sidebar @item-updated="updateCollectionPointId">
    <template #header>
      <h1> {{ collectionPointId }} </h1>
      <p v-if="collectionPoint !== null">
        {{ collectionPoint.position }}
      </p>
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
        />
      </div>
    </template>
  </Sidebar>
</template>

<script>
import Sidebar from '@/components/map/sidebar/Sidebar';
import DumpsterCard from '@/components/map/sidebar/DumpsterCard';
// import axios from 'axios';

export default {
	name: 'CollectionPointSidebar',
	components:{
		Sidebar,
		DumpsterCard,
	},
	data() {
		return {
			collectionPointId:null,
			collectionPoint:null,
			dumpsters:[],
		};
	},
	methods:{
		// getCollectionPointById (){
		// 	this.dumpsters = [];
		// 	axios.get(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/collectionpoints/'+this.collectionPointId, {
		// 		headers: {
		// 			'Access-Control-Allow-Origin': '*',
		// 			'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		// 			'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		// 		}
		// 	})
		// 		.then(res => {
		// 			console.log(res.data);
		// 			this.collectionPoint = res.data;
		// 		});
		// 	axios.get(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/collectionpoints/'+this.collectionPointId+'/dumpsters', {
		// 		headers: {
		// 			'Access-Control-Allow-Origin': '*',
		// 			'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		// 			'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		// 		}
		// 	})
		// 		.then(res => {
		// 			console.log(res);
		// 			res.data.forEach(d => this.dumpsters.push(d));
		// 		});
		// },
		getCollectionPointById() {
			this.dumpsters = [
				{
					id: 'Dumpster2',
					dumpsterType: {
						size: {
							dimension: 'SMALL',
							capacity: 175.0
						},
						typeOfOrdinaryWaste: {
							wasteName: 'ORGANIC',
							wasteColor: 'BROWN'
						}
					},
					occupiedVolume: {
						value: 0.0
					},
					open: false,
					available: true,
					working: true
				},
				{
					id: 'Dumpster3',
					dumpsterType: {
						size: {
							dimension: 'SMALL',
							capacity: 175.0
						},
						typeOfOrdinaryWaste: {
							wasteName: 'PAPER',
							wasteColor: 'BLUE'
						}
					},
					occupiedVolume: {
						value: 175.0
					},
					open: false,
					available: false,
					working: true
				}
			];
		},
		updateCollectionPointId(id) {
			this.collectionPointId = id;
			this.dumpsters = [];
			this.getCollectionPointById();
		},
	},
};
</script>

<style scoped>

</style>
