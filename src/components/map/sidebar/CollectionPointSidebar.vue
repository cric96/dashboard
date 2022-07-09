<template>
  <Sidebar>
    <template #header>
      <h1> Collection Point {{ collectionPointId }} </h1>
      <p />
    </template>

    <template
      v-if="collectionPoint!==null"
      #content
    >
      <div class="flex flex-column justify-content-evenly">
        <DumpsterCard
          v-for="d in collectionPoint.dumpsters"
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

export default {
	name: 'CollectionPointSidebar',
	components:{
		Sidebar,
		DumpsterCard,
	},
	props:{
		'collectionPointId': {
			type: String,
			default:'000',
		},
	},
	data (){
		return {
			collectionPoint:null,
		};
	},
	watch:{
		collectionPointId (){
			this.getCollectionPointById();
		}
	},
	mounted () {
		console.log('Collection Point showed' + this.collectionPointId);
		this.getCollectionPointById();
	},
	methods:{
		// getDumpsterById (){
		// 	axios.get(process.env.VUE_APP_TRUCK_MICROSERVICE+'/trucks/'+this.collectionPointId, {
		// 		headers: {
		// 			'Access-Control-Allow-Origin': '*',
		// 			'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		// 			'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		// 		}
		// 	})
		// 		.then(res => {
		// 			this.truck = res.data;
		// 		});
		// }
		getCollectionPointById (){
			this.collectionPoint = {
				id:'Cp-1',
				dumpsters:[
					{
						id:'D-1',
					},
					{
						id:'D-2',
					},
					{
						id:'D-3',
					}
				]
			};
		}
	},
};
</script>

<style scoped>

</style>
