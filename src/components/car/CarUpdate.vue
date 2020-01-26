<template>
  <b-container fluid>
    <b-row>
      <b-col :md="10" :offset-md="1">
        <div class="mt-4">
          <b-form @submit.prevent="updateCar">
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
            <b-col
                :md="5"
                offset="4">
                <b-button
                    type="submit"
                    variant="outline-primary">Сохранить
                </b-button>
                <b-button
                  :to="{ name: 'CarList' }"
                  variant="outline-warning">Отмена
                </b-button>
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
import CarService from '@/api-services/car.service';

export default {
  name: 'CarUpdate',
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
  created() {
    CarService.get(this.$router.currentRoute.params.id).then((response) => {
      this.formData.title = response.data.title
      this.formData.year = response.data.year
      this.formData.model = response.data.model
      this.formData.speed = response.data.speed
      this.formData.accelaration = response.data.accelaration
      this.formData.engine = response.data.engine
      this.formData.capacity = response.data.capacity
      this.formData.price = response.data.price
      this.formData.image = response.data.image
      this.formData.video = response.data.video
      this.formData.description = response.data.description
      console.log(typeof(this.formData.cost), typeof(this.formData.capacity), typeof(this.formData.speed))
    });
  },
  methods: {
    updateCar() {
      CarService.update(this.$router.currentRoute.params.id, this.formData).then(() => {
        console.log(this.$router.currentRoute.params.id, this.formData)
        this.isSuccessfully = true
        this.alertModalTitle = 'Успешно!'
        this.alertModalContent = 'Это авто успешно обновлено в каталоге'
        this.$refs.alertModal.show()
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
    }
  }
};
</script>