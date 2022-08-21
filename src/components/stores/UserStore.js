import  { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		firstname:'',
		lastname:'',
		email:'',
		userId:'',
		role:'',
	}),
	getters:{
		getUserName: (state) => {
			return state.firstname + ' '+ state.lastname;
		},

		isLogged: (state) => {
			return state.userId !== '';
		}
	},
	actions:{
		login(user) {
			this.firstname=user.firstname;
			this.lastname=user.lastname;
			this.email=user.username;
			this.userId=user._id;
			this.role=user.role;
		},

		logout() {
			this.firstname='';
			this.lastname='';
			this.email='';
			this.userId='';
			this.role='';
		}
	},
	persist:true
});
