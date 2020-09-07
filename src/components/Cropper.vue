<template>
  <div class="cropper">
    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
    />

    <div v-show="imgSrc && !cropImg" class="content">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="16 / 9"
            :src="imgSrc"
            :zoomable="false"
            :responsive="true"
            :containerStyle="{ maxHeight: '60vh' }"
          />
        </div>
        <div class="actions">
          <div>
            <span class="font-weight-bold">Editar:</span>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  type="button"
                  @click.prevent="rotate(-90)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-format-rotate-90</v-icon>
                </v-btn>
              </template>
              <span>Girar -90°</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  type="button"
                  @click.prevent="rotate(90)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon class="mdi-flip-h">mdi-format-rotate-90</v-icon>
                </v-btn>
              </template>
              <span>Girar 90°</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  type="button"
                  ref="flipX"
                  @click.prevent="flipX"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-flip-horizontal</v-icon>
                </v-btn>
              </template>
              <span>Inverter horizontalmente</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  type="button"
                  ref="flipY"
                  @click.prevent="flipY"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-flip-vertical</v-icon>
                </v-btn>
              </template>
              <span>Inverter verticalmente</span>
            </v-tooltip>
          </div>

          <div>
            <v-btn
              color="grey"
              dark
              type="button"
              class="mr-3"
              @click.prevent="cancel"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              type="button"
              @click.prevent="cropImage"
              :loading="cropping"
            >
              Cortar
            </v-btn>
          </div>
        </div>
      </section>
    </div>
    <a
      v-show="!imgSrc && !cropImg"
      href="#"
      class="select-image"
      role="button"
      @click.prevent="showFileChooser"
    >
      <span v-if="loadingCropper">
        <v-progress-circular
          indeterminate
          color="primary"
          class="mr-3"
        ></v-progress-circular>
        Carregando editor da imagem
      </span>
      <span v-else>Selecionar imagem de capa</span>
    </a>
    <div v-show="cropImg" class="cropped-img-container">
      <div class="cropped-img-content">
        <img :src="cropImg" alt="Cropped Image" />

        <a href="#" role="button" @click.prevent="showFileChooser">
          <span>Alterar imagem de capa</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  props: { value: { type: String, required: true }, currentImage: String },
  components: {
    VueCropper,
  },
  data() {
    return {
      imgSrc: this.value,
      loadingCropper: false,
      cropping: false,
      cropImg: this.currentImage,
    };
  },
  methods: {
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropping = true;
      let result = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.cropImg = result;
      this.$emit("input", result);
      this.cropping = false;
    },
    flipX() {
      const dom = this.$refs.flipX.$el;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute("data-scale", scale);
    },
    flipY() {
      const dom = this.$refs.flipY.$el;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute("data-scale", scale);
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file) {
        if (file.type.indexOf("image/") === -1) {
          alert("Please select an image file");
          return;
        }
        if (typeof FileReader === "function") {
          this.loadingCropper = true;
          const reader = new FileReader();
          reader.onload = (event) => {
            this.imgSrc = event.target.result;
            // rebuild cropperjs with the updated source
            this.$refs.cropper.replace(event.target.result);
            this.cropImg = "";
            this.loadingCropper = false;
          };
          reader.readAsDataURL(file);
        } else {
          alert("Sorry, FileReader API not supported");
        }
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    cancel() {
      this.imgSrc = "";
      this.cropImg = "";
      this.$refs.input.value = "";
      this.$emit("croppedResult", "");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file"] {
  display: none;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.cropper-area {
  /* width: 614px; */
  background-color: #d0d7dd;
  border-radius: 3px;
  padding: 10px;
  flex: 1;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #004b83;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
.select-image {
  text-decoration: none;
  display: flex;
  padding: 30px;
  align-items: center;
  justify-content: center;
  border: 3px dotted #004b83;
  text-transform: uppercase;
  background-color: #f2f2f2;
  font-weight: 500;
  flex-direction: column;
}
.cropped-img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
}
.cropped-img-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid #004b83;
  background: #004b83;
  border-radius: 5px;
}
.cropped-img-content img {
  max-height: 40vh;
  border-radius: 5px;
  width: auto;
}
.cropped-img-content a {
  width: 100%;
  text-align: center;
  padding: 10px;
  background-color: #004b83;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  font-weight: 500;
}
</style>
