<template>
  <div class="outer-container">
    <ScrollPanel
      style="height: 400px;"
    >
      <div class="notifications-container flex flex-column-reverse">
        <Card
          v-for="n in notStore.notifications"
          :key="n._id"
          style="margin-bottom: .7rem"
        >
          <template #title>
            <p class="title">
              Booking: {{ n._id }}
            </p>
          </template>
          <template #content>
            <p class="description">
              Your at home collection booking is {{ n.status }}
            </p>
          </template>
          <template #footer>
            <div
              class="flex justify-content-between flex-wrap"
              style="padding: 0"
            >
              <Button class="p-button-rounded p-button-sm">
                Details
              </Button>
              <Button
                v-if="!n.isRead"
                class="p-button-rounded p-button-sm"
                @click="n.isRead=true"
              >
                Mark as read
              </Button>
            </div>
          </template>
        </Card>
      </div>
    </ScrollPanel>
  </div>
</template>

<script>
import { useNotificationStore } from '@/components/stores/NotificationStore';
import Card from 'primevue/card';
import Button from 'primevue/button';
import ScrollPanel from 'primevue/scrollpanel';

export default {
	name: 'NotificationsPanel',
	components:{
		Card,
		Button,
		ScrollPanel,
	},
	setup() {
		const notStore = useNotificationStore();
		return { notStore };
	},
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

.title {
  font-size: 18px;
}

.notifications-container::v-deep(.p-card .p-card-body) {
  padding: 10px !important;
}

.notifications-container::v-deep(.p-card .p-card-content) {
  padding: .5rem 0 !important;
}

.notifications-container::v-deep(.p-card .p-card-footer) {
  padding: .5rem 0 !important;
}

.outer-container::v-deep(.p-scrollpanel-content) {
  padding: 18px !important;
}



</style>
