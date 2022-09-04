import  { defineStore } from 'pinia';
import axios from 'axios';

export const useComplaintStore = defineStore('complaint', {
	state: () => ({ complaints:[], isFetchingComplaints:true, }),
	getters:{
	},
	actions:{
		closeComplaint(id) {
			this.complaints.find(c => c.id === id).status = 'CLOSED';
			axios.put(process.env.VUE_APP_COMPLAINT_MICROSERVICE+'/complaints/'+ id);
		},
		fetchComplaints() {
			this.isFetchingComplaints = true;
			axios.get(process.env.VUE_APP_COMPLAINT_MICROSERVICE + '/complaints').then(res => {
				this.complaints = res.data.reverse();
				this.isFetchingComplaints = false;
			} );

		},
		fetchUserComplaints(userId) {
			this.isFetchingComplaints=true;
			axios.get(process.env.VUE_APP_COMPLAINT_MICROSERVICE + '/complaints')
				.then(res => {
					this.complaints = res.data.filter(c => c.ownerId === userId).reverse();
					this.isFetchingComplaints = false;
				});

		}
	},
});
