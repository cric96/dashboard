import  { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
	state: () => ({ notifications:[] }),
	getters:{
		getUnreadNotifications: (state) => {
			return state.notifications.filter(n => !n.isRead);
		},
		getUnreadNumber() {
			return this.getUnreadNotifications.length;
		}
	},
	actions:{
		fetchNotifications() {

		},

		addNotification(n) {
			console.log('adding: ' + n);
			this.notifications.push(n);
			console.log(this.notifications);

		}
	},
	persist:true
});
