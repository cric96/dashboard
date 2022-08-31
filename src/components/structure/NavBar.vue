<template>
  <div>
    <Menubar
      :model="items"
      class="md:py-2 p-0"
    >
      <template #start>
        <h3 class="m-3">
          Smart Waste Collection
        </h3>
      </template>
      <template #item="{item}">
        <router-link
          v-if="item.role.includes(userStore.role)"
          v-slot="{href, navigate}"
          :to="item.to"
        >
          <Button
            class="p-button-text nav-button md:text-lg"
            :href="href"
            @click="navigate"
          >
            {{ item.label }}
          </Button>
        </router-link>
      </template>
      <template #end>
        <span class="p-button-set">
          <Button
            v-if="userStore.isCitizen"
            icon="pi pi-bell"
            class="p-button-text p-button-rounded nav-button"
            :badge="notificationsBadge"
            @click="toggleOP"
          />
          <OverlayPanel ref="op">
            <NotificationsPanel />
          </OverlayPanel>
          <Button
            icon="pi pi-user"
            class="p-button-text p-button-rounded nav-button md:mx-3"
            @click="account"
          />
          <OverlayPanel ref="lop">
            <LogoutPanel @close="$refs.lop.hide()" />
          </OverlayPanel>
        </span>
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
import LogoutPanel from '@/components/authentication/LogoutPanel';
export default {
	name: 'NavBar',
	components: {
		LogoutPanel,
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
		account(event) {
			if (!this.userStore.isLogged) {
				this.$router.push('/dashboard/account');
			} else {
				this.$refs.lop.toggle(event);
			}
		},
	}
};
</script>

<style scoped>
.p-menubar{
  background-color: #303f9f !important;
  border:0;
  border-radius:0;
  color:white;
}
::v-deep(.p-menubar-root-list){
  background-color: #303f9f !important;
  border:0;
  color:white;
}

::v-deep(.p-menubar-button){
  background-color: #303f9f !important;
  border:0;
  color:white !important;
}

.nav-button{
  color:white !important;
  font-weight: bold !important;
}
/*.p-menuitem{*/
/*  border-color: darkgreen;*/
/*  border: 2pt;*/
/*}*/
a { text-decoration: none; }
</style>
