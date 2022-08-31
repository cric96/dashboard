<template>
  <form
    class="p-fluid"
    @submit.prevent="handleSubmit(!v$.$invalid)"
  >
    <div class="field">
      <label
        for="email"
        :class="{'p-error':(v$.email.$invalid && submitted)}"
      >Email</label>
      <InputText
        id="email"
        v-model="v$.email.$model"
        :class="{'p-invalid':(v$.email.$invalid && submitted)}"
        type="text"
      />
      <small
        v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
        class="p-error"
      >{{ v$.email.required.$message.replace('Value', 'Email') }}</small>
    </div>
    <div class="field">
      <label
        for="password"
        :class="{'p-error':(v$.password.$invalid && submitted)}"
      >Password</label>
      <Password
        id="password"
        v-model="password"
        :class="{'p-error':(v$.password.$invalid && submitted)}"
        :feedback="false"
      />
      <small
        v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
        class="p-error"
      >{{ v$.password.required.$message.replace('Value', 'Password') }}</small>
      <small
        v-if="error"
        class="p-error"
      >Username or Password are incorrect</small>
    </div>
    <Button
      type="submit"
      label="Login"
    />
  </form>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import axios from 'axios';
import Password from 'primevue/password';
import { useUserStore } from '@/stores/UserStore';
import { useSocketStore } from '@/stores/SocketStore';

export default {
	name: 'LoginForm',
	components:{
		InputText,
		Button,
		Password
	},
	setup() {
		const userStore = useUserStore();
		const socketStore = useSocketStore();
		return { v$: useVuelidate(), userStore, socketStore };
	},
	data() {
		return {
			email:'',
			password:'',
			submitted:null,
			error:false,
		};
	},
	validations() {
		return {
			email:{
				required,
				email
			},
			password: {
				required
			}
		};
	},
	methods:{
		handleSubmit(isFormValid) {
			this.submitted = true;
			if (isFormValid) {
				let account = {
					username: this.email,
					password: this.password
				};
				console.log(account);
				axios.post(process.env.VUE_APP_AUTHENTICATION_MICROSERVICE + '/authentication/login', account)
					.then(response => {
						if (response.status === 200) {
							console.log('Connetto...');
							this.userStore.login(response.data.user);
							this.socketStore.connect(this.userStore.userId);
							this.$router.push('/dashboard/map/');
						}
					}).catch( error => {
						console.log('ERROR: ' + error);
						console.log('account non trovato');
						this.password='';
						this.submitted = false;
						this.error = true;
					});
			}
		},
	}
};
</script>

<style scoped>
::v-deep(.p-password input) {
  width: 20rem
}
</style>
