<template>
  <Dialog
    v-model:visible="showMessage"
    :breakpoints="{ '960px': '80vw' }"
    :style="{ width: '30vw' }"
    position="top"
  >
    <div class="flex align-items-center flex-column pt-6 px-3">
      <i
        class="pi pi-check-circle"
        :style="{fontSize: '5rem', color: 'var(--green-500)' }"
      />
      <h5>Account successfully registered!</h5>
    </div>
    <template #footer>
      <div class="flex justify-content-center">
        <Button
          label="OK"
          class="p-button-text"
          @click="toggleDialog"
        />
      </div>
    </template>
  </Dialog>

  <div class="flex justify-content-center">
    <Card>
      <template #title>
        Registration
      </template>
      <br>
      <template #content>
        <form
          class="p-fluid"
          @submit.prevent="handleSubmit(!v$.$invalid)"
        >
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="firstname"
                v-model="v$.firstname.$model"
                :class="{'p-invalid':v$.firstname.$invalid && submitted}"
              />
              <label
                for="firstname"
                :class="{'p-error':v$.firstname.$invalid && submitted}"
              >First Name*</label>
            </div>
            <small
              v-if="(v$.firstname.$invalid && submitted) || v$.firstname.$pending.$response"
              class="p-error"
            >{{ v$.firstname.required.$message.replace('Value', 'First Name') }}</small>
          </div>
          <br>
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="lastname"
                v-model="v$.lastname.$model"
                :class="{'p-invalid':v$.lastname.$invalid && submitted}"
              />
              <label
                for="lastname"
                :class="{'p-error':v$.lastname.$invalid && submitted}"
              >Last Name*</label>
            </div>
            <small
              v-if="(v$.lastname.$invalid && submitted) || v$.lastname.$pending.$response"
              class="p-error"
            >{{ v$.lastname.required.$message.replace('Value', 'Last Name') }}</small>
          </div>
          <br>
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="email"
                v-model="v$.email.$model"
                :class="{'p-invalid':v$.email.$invalid && submitted}"
              />
              <label
                for="email"
                :class="{'p-error':v$.email.$invalid && submitted}"
              >Email*</label>
            </div>
            <small
              v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
              class="p-error"
            >{{ v$.email.required.$message.replace('Value', 'Email') }}</small>
          </div>
          <br>
          <div class="field">
            <div class="p-float-label">
              <Password
                id="password"
                v-model="password"
                :class="{'p-error':v$.password.$invalid && submitted}"
                toggle-mask
              />
              <label
                for="password"
                :class="{'p-error':v$.password.$invalid && submitted}"
              >Password*</label>
            </div>
            <small
              v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
              class="p-error"
            >{{ v$.password.required.$message.replace('Value', 'Password') }}</small>
          </div>
          <br>
          <Button
            type="submit"
            label="Submit"
            class="mt-2"
          />
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import { required, email, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import axios from 'axios';
import Dialog from 'primevue/dialog';
import Password from 'primevue/password';

export default {
	name: 'RegistrationForm',
	components:{
		Password,
		Button,
		Card,
		InputText,
		Dialog,
	},
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			firstname:'',
			lastname:'',
			email:'',
			password:'',
			submitted:null,
			showMessage:false,
		};
	},
	validations() {
		return {
			email:{
				required,
				email
			},
			lastname:{
				required
			},
			firstname:{
				required
			},
			password: {
				required,
				minLength: minLength(8)
			}
		};
	},
	methods: {
		handleSubmit(isFormValid) {
			this.submitted = true;
			if (isFormValid) {
				let account = {
					firstname: this.firstname,
					lastname:this.lastname,
					username: this.email,
					password: this.password
				};
				console.log(account);
				axios.post(process.env.VUE_APP_AUTHENTICATION_MICROSERVICE + '/authentication/register', account)
					.then(response => {
						if (response.status === 200) {
							console.log(response.data);
							this.toggleDialog();

						}
					});
			}
		},
		toggleDialog() {
			this.showMessage = !this.showMessage;

			if (!this.showMessage) {
				this.$router.push('/dashboard/account');
			}
		}
	}
};
</script>

<style scoped>

</style>
