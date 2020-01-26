<template>
  <b-container fluid>
    <b-row>
      <b-col offset-md="2" md="8">
      <div class="mt-4">
        <b-form @submit.prevent="createCar">
          <b-col md="12">
              <b-row>
              <b-col md="4">
              <b-form-group 
                for="name">
                  <b-input placeholder="Марка" 
                    id="name" 
                    v-model="formData.title" 
                    maxlength="60" 
                    required />
            </b-form-group>
            </b-col>
             <b-col md="4">
          <b-form-group
            for="yearOfRelease">
              <b-input placeholder="Год выпуска"
                id="yearOfRelease"
                v-model="formData.year"
                required />
          </b-form-group>
          </b-col>
           <b-col md="4">
          <b-form-group
            for="model">
              <b-input placeholder="Модель"
                id="model"
                v-model="formData.model"
                maxlength="100"
                required />
          </b-form-group>
           </b-col>
           <b-col md="4">
          <b-form-group
            for="speed">
              <b-input placeholder="Максимальная скорость"
                id="speed"
                v-model="formData.speed"
                maxlength="100"
                required />
          </b-form-group>
           </b-col>
           <b-col md="4">
          <b-form-group
            for="accelaration">
              <b-input placeholder="Разгон 0-100, км/ч, с:"
                id="accelaration"
                v-model="formData.accelaration"
                maxlength="100"
                required />
          </b-form-group>
           </b-col>
           <b-col md="4">
          <b-form-group
            for="engine">
              <b-input placeholder="Двигатель кВт (л.с.) / об/мин"
                id="engine"
                v-model="formData.engine"
                maxlength="100"
                required />
          </b-form-group>
           </b-col>
           <b-col md="4">
          <b-form-group
            for="capacity">
              <b-input placeholder="Объём, см3"
                id="capacity"
                v-model="formData.capacity"
                maxlength="100"
                required />
          </b-form-group>
           </b-col>
           <b-col md="4">
          <b-form-group
            for="price">
              <b-input placeholder="Стоимость"
                id="price"
                v-model="formData.price"
                maxlength="100"
                required />
          </b-form-group>
           </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group
                    for="description">
                    <b-textarea placeholder="Описание"
                    id="description"
                    v-model="formData.description"
                    rows="8"
                    required />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                   <b-form-group
                      for="image">
                    <b-textarea placeholder="Изображение по URL ссылке:"
                    id="image"
                    v-model="formData.image"
                    rows="3"
                    required />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                   <b-form-group
                      for="video">
                    <b-textarea placeholder="Видео из YouTube по URL ссылке:"
                    id="video"
                    v-model="formData.video"
                    rows="3"
                    required />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          <b-col class="mb-4"
            :md="5"
            offset="4">
            <b-button
              type="submit"
              variant="outline-primary">Сохранить</b-button>
            <b-button
              :to="{ name: 'CarList' }"
              variant="outline-warning">Отмена</b-button>
          </b-col>
        </b-form>
      </div>
      <b-modal
        ref="alertModal"
        :title="alertModalTitle"
        :ok-only="true"
        @ok="onAlertModalOkClick">
        <p class="my-4">{{ alertModalContent }}</p>
      </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
.form-wrapper {
  min-height: 20px;
  padding: 19px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
}
</style>

<script>
import CarService from '@/api-services/car.service'
export default {
  name: 'CarCreate',
  data() {
    return {
      formData: {
        title: '',
        model: '',
        year: '',
        speed: '',
        accelaration: '',
        engine: '',
        capacity: '',
        price: '',
        description: '',
        image: null,
        video: ''
      },
      alertModalTitle: '',
      alertModalContent: '',
      isSuccessfully: false
    };
  },
  methods: {
    createCar() {
      CarService.create(this.formData).then(() => {
        this.isSuccessfully = true
        this.alertModalTitle = 'Успешно!'
        this.alertModalContent = 'Авто успешно добавлено в каталог'
        this.$refs.alertModal.show()
 
        this.formData = {
          title: '',
          model: '',
          year: '',
          speed: '',
          accelaration: '',
          engine: '',
          capacity: '',
          price: '',
          description: '',
          image: '',
          video: ''
        }
      }).catch((error) => {
        this.isSuccessfully = false
        this.alertModalTitle = 'Ошибка'
        this.alertModalContent = error.response.data
        this.$refs.alertModal.show()
      })
    },
    onAlertModalOkClick() {
      if (this.isSuccessfully) {
        this.$router.push({ name: 'CarList' })
      }
    },

    onPickFile() {
      this.$refs.fileInput.click()
    },

    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name

      if(filename.lastIndexOf('.') <= 0) {
        this.isSuccessfully = false
        this.alertModalTitle = 'Выберите файл с раширением png, jpg ...'
        this.alertModalContent = error.response.data
        this.$refs.alertModal.show()
      }

      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>