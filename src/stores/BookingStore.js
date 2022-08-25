import  { defineStore } from 'pinia';
import axios from 'axios';

export const useBookingStore = defineStore('booking', {
	state: () => ({ bookings:[] }),
	getters:{
	},
	actions:{
		updateBooking(bn) {
			let old = this.bookings.filter(b => b._id === bn._id);
			this.bookings.splice(this.bookings.indexOf(old), 1, bn);
		},
		fetchUserBookings(userId) {
			axios.get('http://localhost:3000/bookings/user/' + userId)
				.then(res => this.bookings = res.data.reverse());
		},
		fetchAllBookings() {
			axios.get('http://localhost:3000/bookings/').then(res => this.bookings = res.data.reverse());

		}
	},
});
