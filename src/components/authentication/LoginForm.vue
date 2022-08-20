<template>
  <form
    class="p-fluid"
    @submit.prevent="handleSubmit(!v$.$invalid)"
  >
    <div class="field">
      <label
        for="email"
        :class="{'p-error':v$.email.$invalid && submitted}"
      >Email</label>
      <InputText
        id="email"
        v-model="v$.email.$model"
        :class="{'p-invalid':v$.email.$invalid && submitted}"
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
        :class="{'p-error':v$.password.$invalid && submitted}"
      >Password</label>
      <Password
        id="password"
        v-model="password"
        :feedback="false"
      />
      <small
        v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
        class="p-error"
      >{{ v$.password.required.$message.replace('Value', 'Password') }}</small>
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

export default {
	name: 'LoginForm',
	components:{
		InputText,
		Button,
		Password
	},
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			email:'',
			password:'',
			submitted:null,
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
				axios.post('http://localhost:3002/authentication/login', account)
					.then(response => {
						if (response.status === 200) {
							console.log(response.data);
						} else if (response.status === 401) {
							console.log(response.data);
						}
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
