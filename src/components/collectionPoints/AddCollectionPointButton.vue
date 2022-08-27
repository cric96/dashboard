<template>
  <SplitButton
    :model="items"
    label="Add new Collection Point"
  />
</template>

<script>
import SplitButton from 'primevue/splitbutton';

export default {
	name: 'AddCollectionPointButton',
	components:{
		SplitButton,
	},
	emits: ['pick', 'insert'],
	data() {
		return {
			items:[
				{
					label:'By picking the position',
					command: () => this.$emit('pick')
				},
				{
					label:'By entering the position',
					command: () => this.$emit('insert')
				}
			]
		};
	},
};
</script>

<style scoped>
::v-deep(.p-button){
  background-color:darkgreen;
  border-color:darkgreen;
}
::v-deep(.p-button:hover){
  background-color:darkgreen;
  border-color:darkgreen;
}
</style>
