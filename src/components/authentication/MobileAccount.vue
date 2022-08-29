<template>
  <Card class="mt-5">
    <template #content>
      <div class="flex flex-column">
        <LoginForm />
        <Divider class="justify-content-center">
          <b>OR</b>
        </Divider>
        <SingUpButton />
      </div>
    </template>
  </Card>
</template>


<script>
import LoginForm from '@/components/authentication/LoginForm';
import SingUpButton from '@/components/authentication/SingUpButton';
import Divider from 'primevue/divider';
import Card from 'primevue/card';

export default {
	name: 'MobileAccount',
	components:{
		SingUpButton,
		Divider,
		LoginForm,
		Card,
	}
};
</script>

<style scoped>
</style>
