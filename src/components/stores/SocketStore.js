import  { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import { useNotificationStore } from '@/components/stores/NotificationStore';

export const useSocketStore = defineStore('socket', {
	state: () => ({
		socket:io('http://localhost:3000', { autoConnect:false }),
		sessionId: '',
	}),
	getters:{
	},
	actions:{
		connect(userId) {
			console.log('Connecting... '+ userId);
			this.socket.auth = { userId: userId };
			this.socket.connect();
			this.socket.on('session', ({ sessionId, uid }) => {
				this.socket.auth = { sessionId };
				this.sessionId = sessionId;
				console.log('sessionId: ', this.sessionId);
				console.log('userId: ', uid);
			});
			this.receiveNotification();
		},
		reconnect() {
			console.log('sessionId: ', this.sessionId);
			this.socket.auth = { sessionId: this.sessionId };
			this.socket.connect();
			this.socket.on('session', ({ sessionId, uid }) => {
				console.log('sessionId: ', sessionId);
				console.log('userId: ', uid);
			});
			this.receiveNotification();
		},
		receiveNotification() {
			this.socket.on('assigned', (res) => {
				console.log('notification received');
				// this.$toast.add({ severity:'success', summary: 'News about your booking',
				// 	detail:'The status of one of your At Home Collection booking is changed ', life: 3000 });
				res.isRead = false;
				useNotificationStore().addNotification(res);
			});
		},
		disconnect() {
			this.socket.disconnect();
		}
	},
	persist: {
		paths:['sessionId'],
	}
});
