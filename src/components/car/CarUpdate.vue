<template>
  <b-container fluid>
    <div class="form-wrapper">
        <b-form @submit.prevent="updateCar">
            <b-form-group 
            :label-cols="2" 
            breakpoint="md" 
            horizontal 
            label="Название модели:"
            for="name">
            <b-col :md="5">
                <b-input 
                id="name" 
                v-model="formData.title" 
                maxlength="60" 
                required />
            </b-col>
            </b-form-group>

            <b-form-group
            :label-cols="2"
            breakpoint="md"
            horizontal
            label="Год выпуска:"
            for="yearOfRelease">
            <b-col :md="5">
                <b-input
                id="yearOfRelease"
                v-model="formData.year"
                required />
            </b-col>
            </b-form-group>

            <b-form-group
            :label-cols="2"
            breakpoint="md"
            horizontal
            label="Модель:"
            for="model">
            <b-col :md="5">
                <b-input
                id="model"
                v-model="formData.model"
                maxlength="100"
                required />
            </b-col>
            </b-form-group>

              <b-form-group
            :label-cols="2"
            breakpoint="md"
            horizontal
            label="Скорость:"
            for="speed">
            <b-col :md="5">
                <b-input
                id="speed"
                v-model="formData.speed"
                maxlength="100"
                required />
            </b-col>
            </b-form-group>
            <br ><br >

            <b-col
            :md="5"
            offset="4">
            <b-button
                type="submit"
                variant="info">Сохранить</b-button>
            <b-button
                :to="{ name: 'CarList' }"
                variant="danger">Отмена</b-button>
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
  </b-container>
</template>

<style>
.form-wrapper {
  margin-top: 20px;
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
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
        year: '',
        model: '',
        speed: '',
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
      console.log(this.formData.title, this.formData.year, this.formData.model)
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