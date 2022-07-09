<template>
  <Card>
    <template #title>
      Dumpster id: {{ dumpster.id }}
    </template>
    <template #subtitle>
      <div>
        <p>
          Status: <Tag
            :value="dumpster.status"
            :rounded="true"
            :severity="dumpsterStatusToSeverity"
          />
        </p>
      </div>
    </template>
    <template #content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';
import Tag from 'primevue/tag';
export default {
	name: 'DCard',
	components: {
		Card,
		Tag,
	},
	props: {
		'dumpster': {
			type: Object,
			default: null,
		}
	},
	computed:{
		dumpsterStatusToSeverity (){
			return this.dumpster.status === 'working' ? 'success': 'danger';
		}
	}
};
</script>

<style scoped>

</style>
