<template>
  <Card
    v-if="userId==='' || !connected"
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
</template>

<script>
import { io } from 'socket.io-client';
import Button from 'primevue/button';
import { useNotificationStore } from '@/components/stores/NotificationStore';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import LoginForm from '@/components/authentication/LoginForm';
export default {
	name: 'AccountComponent',
	components:{
		LoginForm,
		Button,
		Divider,
		Card,
	},
	setup() {
		const notStore = useNotificationStore();
		return { notStore };
	},
	data() {
		return {
			userId:'',
			connected:false,
			socket:io('http://localhost:3000', { autoConnect:false }),
		};
	},
	created() {
		const sessionId = localStorage.getItem('sessionId');
		console.log('Session: ', sessionId);
		if (sessionId) {
			this.connected = true;
			this.socket.auth = { sessionId };
			this.socket.connect();
			this.socket.on('session', ({ sessionId, userId }) => {
				this.userId = userId;
				console.log('UserId: ', userId);
				console.log('Session: ', sessionId);
			});
			this.receiveNotification();
		}
	},
	methods:{
		connectSocket() {
			this.connected = true;
			this.socket.auth = { userId };
			console.log('connection');
			this.socket.connect();
			this.socket.on('session', ({ sessionId, userId }) => {
				this.socket.auth = { sessionId };
				localStorage.setItem('sessionId', sessionId);
				console.log('sessionId: ', sessionId);
				this.userId = userId;
				console.log('UserId: ', userId);
			});
			this.receiveNotification();
		},
    
		receiveNotification() {
			this.socket.on('assigned', (res) => {
				this.$toast.add({ severity:'success', summary: 'News about your booking', detail:'The status of one of your At Home Collection booking is changed ', life: 3000 });
				res.isRead = false;
				this.notStore.addNotification(res);
			});
		}
	}
};
</script>

<style scoped>
a { text-decoration: none; }
</style>
