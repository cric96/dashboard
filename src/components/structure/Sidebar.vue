<template>
  <Sidebar
    v-model:visible="visible"
    position="right"
    class="p-sidebar-md"
    @hide="hide"
  >
    <slot name="header" />
    <Divider />
    <slot name="content" />
  </Sidebar>
</template>

<script>
import Sidebar from 'primevue/sidebar';
import Divider from 'primevue/divider';

export default {
	name: 'SideBar',
	components:{
		Sidebar,
		Divider,
	},
	props: {
		sideVisibility: Boolean,
	},
	emits: ['closed'],
	data (){
		return {
			visible:this.sideVisibility
		};
	},
	watch: {
		sideVisibility (n){
			this.visible = n;
		},
	},
	methods:{
		hide (){
			this.$emit('closed');
		}
	}
};
</script>

<style scoped>

</style>
