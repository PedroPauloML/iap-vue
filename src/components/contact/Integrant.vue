<template>
  <v-dialog :value="dialog" @input="closeDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">
        <span v-if="id" class="mr-2">Atualizar</span>
        <span v-else class="mr-2">Adicionar</span>
        dados do integrate
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <Cropper
            ref="photo"
            v-model="photo"
            :currentImage="currentPhoto"
            imageName="Foto"
            :aspectRatio="1 / 1"
            class="mb-5"
            linear-actions-button
          />
          <v-text-field
            ref="title"
            v-model="name"
            :rules="requiredRules.name"
            label="Nome"
            required
            @keyup.enter="createOrUpdateIntegrant"
          />
          <v-text-field
            ref="title"
            v-model="role"
            :rules="requiredRules.role"
            label="Função"
            required
            @keyup.enter="createOrUpdateIntegrant"
          />
          <v-text-field
            ref="title"
            v-model="contact"
            :rules="requiredRules.contact"
            label="Contato (opcional)"
            required
            @keyup.enter="createOrUpdateIntegrant"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" dark @click="closeDialog" :disabled="loading">
          Cancelar
        </v-btn>

        <v-btn
          v-if="id"
          color="primary"
          @click="updateIntegrant"
          :loading="loading"
        >
          Atualizar
        </v-btn>
        <v-btn
          v-else
          color="primary"
          @click="createIntegrant"
          :loading="loading"
        >
          Criar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Cropper from "../Cropper";

export default {
  props: {
    data: {
      id: {
        type: Number,
      },
      name: {
        type: String,
      },
      role: {
        type: String,
      },
      contact: {
        type: String,
      },
      photo: {
        type: String,
      },
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
  components: { Cropper },
  data() {
    return {
      dialog: this.opened,

      // Fields
      id: this.data ? this.data.id || null : null,
      name: this.data ? this.data.name || "" : "",
      role: this.data ? this.data.role || "" : "",
      contact: this.data ? this.data.contact || "" : "",
      photo: this.data ? this.data.photo || "" : "",
      currentPhoto: this.data ? this.data.photo || "" : "",

      // Rules
      requiredRules: [
        { field: "name", name: "Nome" },
        { field: "role", name: "Função" },
      ].reduce((acc, val) => {
        acc[val.field] = [(v) => !!v || `${val.name} é obrigatório(a)`];
        return acc;
      }, {}),

      // Form variables
      valid: true,
      loading: false,
    };
  },
  watch: {
    opened(val) {
      this.dialog = val;
    },
    data: {
      handler: function(val) {
        this.id = val ? val.id || null : null;
        this.name = val ? val.name || "" : "";
        this.role = val ? val.role || "" : "";
        this.contact = val ? val.contact || "" : "";
        this.photo = val ? val.photo || "" : "";
        this.currentPhoto = val ? val.photo || "" : "";
      },
      deep: true,
    },
  },
  methods: {
    createOrUpdateIntegrant() {
      if (this.id) {
        this.updateIntegrant();
      } else {
        this.createIntegrant();
      }
    },
    createIntegrant() {
      if (this.$refs.form.validate()) {
        let data = {
          name: this.name,
          role: this.role,
          contact: this.contact,
          photo: this.photo,
        };

        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.$emit("createIntegrant", data);
        }, 1000);
      } else {
        if (!this.name) {
          let y =
            this.$refs.name.$el.getBoundingClientRect().top +
            window.pageYOffset -
            60;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
          return;
        }
        if (!this.role) {
          let y =
            this.$refs.role.$el.getBoundingClientRect().top +
            window.pageYOffset -
            60;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
          return;
        }
      }
    },
    updateIntegrant() {
      if (this.$refs.form.validate()) {
        let data = {
          name: this.name,
          role: this.role,
          contact: this.contact,
          photo: this.photo,
        };

        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.$emit("updateIntegrant", { id: this.id, data });
        }, 1000);
      } else {
        if (!this.name) {
          let y =
            this.$refs.name.$el.getBoundingClientRect().top +
            window.pageYOffset -
            60;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
          return;
        }
        if (!this.role) {
          let y =
            this.$refs.role.$el.getBoundingClientRect().top +
            window.pageYOffset -
            60;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
          return;
        }
      }
    },
    closeDialog() {
      this.$refs.form.reset();
      this.photo = "";
      this.currentPhoto = "";
      this.$emit("closeDialog");
    },
  },
};
</script>

<style></style>
