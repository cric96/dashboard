import  { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import { useNotificationStore } from '@/stores/NotificationStore';
import { useBookingStore } from '@/stores/BookingStore';
import { useUserStore } from '@/stores/UserStore';

export const useSocketStore = defineStore('socket', {
	state: () => ({
		socket:io(process.env.VUE_APP_BOOKING_MICROSERVICE, { autoConnect:false }),
		sessionId: '',
		userId:'',
	}),
	getters:{
	},
	actions:{
		connect(userId) {
			console.log('Connecting... '+ userId);
			this.userId = useUserStore().userId;
			this.socket.auth = { userId: userId };
			this.socket.connect();
			this.socket.on('connect_error', () => {
				console.log('ERROR');
				socket.connect();
			});
			this.socket.on('session', ({ sessionId, uid }) => {
				this.socket.auth = { sessionId };
				this.sessionId = sessionId;
				console.log('sessionId: ', this.sessionId);
				console.log('userId: ', uid);
			});
			this.receiveNotification();
		},
		reconnect() {
			console.log('Riconnetto');
			this.socket.auth = { sessionId: this.sessionId };
			this.socket.connect();
			this.socket.on('session', ({ sessionId }) => {
				console.log('sessione attiva: ' + sessionId);
			});
			this.receiveNotification();
		},
		receiveNotification() {
			console.log('Ricevo notifiche');
			this.socket.on('prova', (msg)=> console.log(msg));
			this.socket.on('assigned', (res) => {
				console.log('notification received');
				useNotificationStore().addNotification(res);
				useBookingStore().updateBooking(res.booking);
			});
		},
		emit(on, msg) {
			this.socket.emit(on, msg);
		},
		disconnect() {
			this.socket.disconnect();
		}
	},
	persist: {
		paths:['sessionId'],
	}
});
