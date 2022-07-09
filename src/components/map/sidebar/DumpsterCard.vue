<template>
  <Card>
    <template #title>
      Dumpster id: {{ dumpster }}
    </template>
    <template #content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';
export default {
	name: 'DCard',
	components:{
		Card,
	},
	props:[
		'dumpster'
	]
};
</script>

<style scoped>

</style>
