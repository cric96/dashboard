import  { defineStore } from 'pinia';
import { useSocketStore } from '@/stores/SocketStore';

export const useNotificationStore = defineStore('notification', {
	state: () => ({ notifications:[] }),
	getters:{
		getUnreadNotifications: (state) => {
			return state.notifications.filter(n => !n.isRead);
		},
		getUnreadNumber() {
			return this.getUnreadNotifications.length;
		},
		empty() {
			return this.notifications.length === 0;
		}
	},
	actions:{
		addNotification(n) {
			if (!this.notifications.includes(n))
				this.notifications.push(n);
		},
		markAsRead(n) {
			n.isRead=true;
			useSocketStore().emit('markAsRead', { id: n._id, notification: n });
		},
		delete(n) {
			this.notifications.splice(this.notifications.indexOf(n), 1);
			useSocketStore().emit('delete', n._id);
		},
		logout() {
			this.notifications = [];
		}
	},
});
