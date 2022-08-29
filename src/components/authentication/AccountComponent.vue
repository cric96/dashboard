<template>
  <Card
    v-if="!userStore.isLogged"
    class="hidden md:block md:w-8"
  >
    <template #content>
      <div class="grid">
        <div class="col-5 flex align-items-center justify-content-center">
          <LoginForm />
        </div>
        <div class="col-2">
          <Divider layout="vertical">
            <b>OR</b>
          </Divider>
        </div>
        <div class="col-5 flex align-items-center justify-content-center">
          <SingUpButton />
        </div>
      </div>
    </template>
  </Card>
  <MobileAccount class="block md:hidden" />
  <Card
    v-if="userStore.isLogged"
  >
    <template #title>
      {{ userStore.getUserName }}
    </template>
    <template #footer>
      <Button @click="logout()">
        Logout
      </Button>
    </template>
  </Card>
</template>

<script>
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import LoginForm from '@/components/authentication/LoginForm';
import { useUserStore } from '@/stores/UserStore';
import { useSocketStore } from '@/stores/SocketStore';
import { useNotificationStore } from '@/stores/NotificationStore';
import MobileAccount from '@/components/authentication/MobileAccount';
import SingUpButton from '@/components/authentication/SingUpButton';
export default {
	name: 'AccountComponent',
	components:{
		SingUpButton,
		MobileAccount,
		LoginForm,
		Button,
		Divider,
		Card,
	},
	setup() {
		const userStore = useUserStore();
		const socketStore = useSocketStore();
		const notStore = useNotificationStore();
		return { userStore, socketStore, notStore };
	},
	data() {
		return {

		};
	},
	methods:{
		logout() {
			this.userStore.logout();
			this.socketStore.disconnect();
			this.notStore.logout();

		}
	}
};
</script>

<style scoped>
</style>
