<template>
  <p>Logged User: {{ userId }}</p>
  <span
    v-if="userId==='' || !connected"
    class="p-float-label"
  >
    <InputText
      id="userId"
      v-model="userId"
      type="text"
    />
    <label for="userId">UserId</label>
  </span>
  <Button
    v-if="userId !== '' && !connected"
    @click="connectSocket"
  >
    Connect
  </Button>
</template>

<script>
import { io } from 'socket.io-client';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useNotificationStore } from '@/components/stores/NotificationStore';
export default {
	name: 'AccountComponent',
	components:{
		Button,
		InputText,
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
				this.$toast.add({ severity:'success', summary: 'Success Message', detail:'Order submitted', life: 3000 });
				res.isRead = false;
				this.notStore.addNotification(res);
			});
		}
	}
};
</script>

<style scoped>

</style>
