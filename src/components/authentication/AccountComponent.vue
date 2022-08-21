<template>
  <Card
    v-if="!userStore.isLogged"
    class="w-full"
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
          <router-link
            v-slot="{href, navigate}"
            :to="'/dashboard/account/registration'"
          >
            <Button
              :href="href"
              label="Sign Up"
              icon="pi pi-user-plus"
              class="p-button-success"
              @click="navigate"
            />
          </router-link>
        </div>
      </div>
    </template>
  </Card>
  <Card v-if="userStore.isLogged">
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
import { useUserStore } from '@/components/stores/UserStore';
import { useSocketStore } from '@/components/stores/SocketStore';
export default {
	name: 'AccountComponent',
	components:{
		LoginForm,
		Button,
		Divider,
		Card,
	},
	setup() {
		const userStore = useUserStore();
		const socketStore = useSocketStore();
		return { userStore, socketStore };
	},
	data() {
		return {

		};
	},
	created() {
		if (this.socketStore.sessionId !== '' && this.userStore.isLogged) {
			this.socketStore.reconnect();
		} else {
			console.log('User not connected ' + this.socketStore.sessionId + '  ' + this.userStore.isLogged);
		}
	},
	methods:{
		logout() {
			this.userStore.logout();
			this.socketStore.disconnect();
		}
	}
};
</script>

<style scoped>
a { text-decoration: none; }
</style>
