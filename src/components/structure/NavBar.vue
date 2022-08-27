<template>
  <div>
    <Menubar
      :model="items"
    >
      <template #start>
        SWC
      </template>
      <template #item="{item}">
        <router-link
          v-if="item.role.includes(userStore.role)"
          v-slot="{href, navigate}"
          :to="item.to"
        >
          <Button
            class="p-button-text"
            :href="href"
            style="color: darkgreen"
            @click="navigate"
          >
            {{ item.label }}
          </Button>
        </router-link>
      </template>
      <template #end>
        <span class="p-button-set">
          <Button
            v-if="userStore.isLogged"
            icon="pi pi-bell"
            class="p-button-text p-button-rounded"
            :badge="notificationsBadge"
            style="color:darkgreen; font-weight: bold"
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
              style="color:darkgreen; font-weight: bold"
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
import { useNotificationStore } from '@/stores/NotificationStore';
import { useUserStore } from '@/stores/UserStore';
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
		const userStore = useUserStore();
		return { notStore, userStore };
	},
	data() {
		return {
			items: [
				{
					label: 'Map',
					to:'/dashboard/map',
					role:['','CITIZEN', 'MANAGER']
				},
				{
					label: 'Missions',
					to:'/dashboard/missions',
					role:['MANAGER'],
				},
				{
					label: 'Trucks',
					to:'/dashboard/trucks',
					role:['MANAGER'],
				},
				{
					label: 'Complaints',
					to:'/dashboard/complaints',
					role:['MANAGER', 'CITIZEN']
				},
				{
					label: 'Bookings',
					to:'/dashboard/bookings',
					role:['CITIZEN', 'MANAGER']
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
		},
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

::v-deep(.p-button-text){
  font-weight: bold;
  color: darkgreen;
}
</style>
