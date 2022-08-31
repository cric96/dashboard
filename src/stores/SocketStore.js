import  { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import { useNotificationStore } from '@/stores/NotificationStore';
import { useBookingStore } from '@/stores/BookingStore';

export const useSocketStore = defineStore('socket', {
	state: () => ({
		socket:io(process.env.VUE_APP_BOOKING_MICROSERVICE, { autoConnect:false }),
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
