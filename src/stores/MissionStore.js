import  { defineStore } from 'pinia';
import axios from 'axios';

export const useMissionStore = defineStore('mission', {
	state: () => ({
		missions:[],
		fetchingMissions:true,
	}),
	getters:{

	},
	actions:{
		fetchMissions() {
			return axios.get(process.env.VUE_APP_MISSION_MICROSERVICE + '/missions/').then(res => {
				if (res.status === 200) {
					this.fetchingMissions = false;
					this.missions = res.data;
				}
				return Promise.resolve(res.data);
			});
		},
		getOrFetchMissions() {
			return this.missions.length === 0 ?
				this.fetchMissions()
				: Promise.resolve(this.missions);
		},
	},
});
