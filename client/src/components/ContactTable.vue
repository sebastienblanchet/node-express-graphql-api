<template>
  <div>
    <v-data-table :headers="headers" :items="apollo.contacts">
      <template v-slot:contact.actions="{ contact }">
        <v-icon small class="mr-2" @click="selectContact(contact)">mdi-pencil</v-icon>
        <v-icon small @click="deleteContact(contact.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog">
        <v-card>
          <v-text-field label="firstName" v-model="firstName"></v-text-field>
          <v-text-field label="lastName" v-model="lastName"></v-text-field>
          <v-text-field label="email" v-model="email"></v-text-field>
          <v-card-actions>
            <v-btn
              v-if="!id"
              @click="createContact(firstName, lastName, email)"
            >Create</v-btn>
            <v-btn
              v-if="id"
              @click="updateContact(id, firstName, lastName, email)"
            >Update</v-btn>
            <v-btn @click="clearForm()" >Clear</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "CrudTable",
  data: () => ({
    dialog: true,
    headers: ["id", "firstName", "lastName", "email", "actions"],
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    apollo: {
      // template literal tag that parses GraphQL query strings into the standard GraphQL AST
      contacts: gql`
        query {
          contacts {
            id
            firstName
            lastName
            email
          }
        }
      `
    }
  }),
  methods: {
    createContact(firstName, lastName, email) {
      console.log(`Create contact: ${email}`);
      this.$apollo.mutate({
        mutation: gql`
          mutation createContact(
            $firstName: String!
            $lastName: String!
            $email: String!
          ) {
            createContact(
              firstName: $firstName
              lastName: $lastName
              email: $email
            ) {
              id
              firstName
              lastName
              email
            }
          }
        `,
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email
        }
      });
      location.reload();
    },
    updateContact(id, firstName, lastName, email) {
      console.log(`Update contact: # ${id}`);
      this.$apollo.mutate({
        mutation: gql`mutation updateContact($id: ID!, $firstName: String!, $lastName: String!, $email: String!){
                updateContact(id: $id, firstName: $firstName, lastName: $lastName, email: $email)
              `,
        variables: {
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email
        }
      });
      location.reload();
    },
    deleteContact(id) {
      console.log(`Delete contact: # ${id}`);
      this.$apollo.mutate({
        mutation: gql`
          mutation deleteContact($id: ID!) {
            deleteContact(id: $id)
          }
        `,
        variables: {
          id: id
        }
      });
      location.reload();
    },
    selectContact(contact) {
      this.id = contact.id;
      this.firstName = contact.firstName;
      this.lastName = contact.lastName;
      this.email = contact.email;
      this.dialog = true;
    },
    clearForm() {
      this.id = null;
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.dialog = false;
    }
  }
};
</script>
