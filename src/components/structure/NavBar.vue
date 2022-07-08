<template>
  <div>
    <Menubar
      :model="items"
      class="flex justify-items-end justify-content-end"
    >
      git
    </Menubar>
  </div>
</template>

<script>
import Menubar from 'primevue/menubar';

export default {
	name: 'NavBar',
	components: {
		Menubar,
	},
	data () {
		return {
			items: [
				{
					label: 'Map',
					to:'/dashboard/map'
				},
				{
					label: 'Missions',
					to:'/dashboard/missions'
				},
				{
					label: 'Complaints',
					to:'/dashboard/complaints'
				},
				{
					label: 'Account',
					icon: 'pi pi-fw pi-user',
					to:'/dashboard/account'
				}
			],
		};
	},
};
</script>

<style scoped>
</style>
