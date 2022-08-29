<template>
  <div class="flex flex-column">
    <LoginForm />
    <Divider class="justify-content-center">
      <b>OR</b>
    </Divider>
    <SingUpButton />
  </div>
</template>


<script>
import LoginForm from '@/components/authentication/LoginForm';
import SingUpButton from '@/components/authentication/SingUpButton';
import Divider from 'primevue/divider';

export default {
	name: 'MobileAccount',
	components:{
		SingUpButton,
		Divider,
		LoginForm,
	}
};
</script>

<style scoped>
::v-deep(.p-divider-content){
  background-color: #f4f4f8;
}
</style>
