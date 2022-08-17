<template>
  <div>
    <Menubar
      :model="items"
      style="'background-color': 'transparent'"
    >
      <template #start>
        SWC
      </template>
      <template #end>
        <span class="p-button-set">
          <Button
            icon="pi pi-bell"
            class="p-button-text p-button-rounded"
            :badge="notificationsBadge"
            @click="toggleOP"
          />
          <OverlayPanel ref="op">
            <NotificationsPanel />
          </OverlayPanel>
          <router-link
            v-slot="{href, navigate}"
            to="/dashboard/account"
          >
            <Button
              :href="href"
              icon="pi pi-user"
              class="p-button-text p-button-rounded"
              @click="navigate"
            />
          </router-link></span>
      </template>
    </Menubar>
  </div>
</template>

<script>
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import NotificationsPanel from '@/components/structure/NotificationsPanel';
import { useNotificationStore } from '@/components/stores/NotificationStore';
export default {
	name: 'NavBar',
	components: {
		Menubar,
		Button,
		NotificationsPanel,
		OverlayPanel,
	},
	setup() {
		const notStore = useNotificationStore();
		return { notStore };
	},
	data() {
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
					label: 'Bookings',
					to:'/dashboard/bookings'
				},
			],
		};
	},
	computed:{
		notificationsBadge() {
			return this.notStore.getUnreadNumber > 0 ? this.notStore.getUnreadNumber.toString() : '';
		}
	},
	methods:{
		toggleOP(event) {
			this.$refs.op.toggle(event);
		}
	}
};
</script>

<style scoped>
.p-menubar{
  background-color: transparent !important;
  border-color: transparent;
}

.p-menuitem{
  border-color: darkgreen;
  border: 2pt;
}
a { text-decoration: none; }
</style>
