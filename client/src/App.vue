<template>
  <v-app>
    <v-content>
      <ContactTable/>
    </v-content>
  </v-app>
</template>

<script>
import ContactTable from './components/ContactTable';

export default {
  name: 'App',

  components: {
    ContactTable,
  },

  data: () => ({
    //
  }),
};
</script>
