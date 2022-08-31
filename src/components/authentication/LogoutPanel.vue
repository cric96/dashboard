<template>
  <Card
    v-if="userStore.isLogged"
    class="flex justify-content-center"
  >
    <template #title>
      {{ userStore.getUserName }}
    </template>
    <template #footer>
      <div class="flex justify-content-center align-items-center">
        <Button
          label="Logout"
          @click="logout()"
        />
      </div>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useUserStore } from '@/stores/UserStore';
import { useNotificationStore } from '@/stores/NotificationStore';
import { useSocketStore } from '@/stores/SocketStore';

export default {
	name: 'LogoutPanel',
	components:{
		Card,
		Button,
	},
	emits: ['close'],
	setup() {
		const userStore = useUserStore();
		const notStore = useNotificationStore();
		const socketStore = useSocketStore();
		return { userStore, notStore, socketStore };
	},
	methods:{
		logout() {
			this.$emit('close');
			this.userStore.logout();
			this.socketStore.disconnect();
			this.notStore.logout();
			this.$router.push('dashboard/account/');
		}
	}
};
</script>

<style scoped>
</style>
