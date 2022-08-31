<template>
  <Card
    v-if="!userStore.isLogged"
    class="hidden md:block md:w-8 mt-5"
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
</template>

<script>
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
		Divider,
		Card,
	},
	setup() {
		const userStore = useUserStore();
		const socketStore = useSocketStore();
		const notStore = useNotificationStore();
		return { userStore, socketStore, notStore };
	},
};
</script>

<style scoped>
</style>
