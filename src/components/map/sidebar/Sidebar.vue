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
		itemId:{
			type: String,
			default: '-1',
		}
	},
	emits: ['closed', 'itemUpdated'],
	data (){
		return {
			visible:this.sideVisibility
		};
	},
	watch: {
		sideVisibility (n){
			this.visible = n;
		},
		itemId (n){
			this.$emit('itemUpdated', n);
		}
	},
	mounted () {
		this.$emit('itemUpdated', this.itemId);
	},
	methods:{
		hide (){
			this.$emit('closed');
		}
	},
};
</script>

<style scoped>

</style>
