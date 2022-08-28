import  { defineStore } from 'pinia';
import axios from 'axios';

export const useComplaintStore = defineStore('complaint', {
	state: () => ({ complaints:[] }),
	getters:{
	},
	actions:{
		closeComplaint(id) {
			this.complaints.find(c => c.id === id).status = 'CLOSED';
			axios.put(process.env.VUE_APP_COMPLAINT_MICROSERVICE+'/complaints/'+ id);
		},
		fetchComplaints() {
			axios.get(process.env.VUE_APP_COMPLAINT_MICROSERVICE + '/complaints').then(res => this.complaints = res.data);

		},
		fetchUserComplaints(userId) {
			axios.get(process.env.VUE_APP_COMPLAINT_MICROSERVICE + '/complaints')
				.then(res => this.complaints = res.data.filter(c => c.ownerId === userId));

		}
	},
});
