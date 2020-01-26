<template>
  <div>
  <b-container>
    <b-row>
      <b-col md="2" offset-md="10" class="mt-2 mb-2">
          <router-link  :to="{ name: 'CarCreate' }">Добавить авто</router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <b-form-input size="lg" 
          type="text" 
          placeholder="Фильтр по модели, названию"  
          v-model="filter" autofocus>
        </b-form-input>
      </b-col>
    </b-row>
    <b-row md="12">
        <car-list-row
          v-for="car in filteredRecords"
          :key="car.id"
          :car="car"
          @update="updateCar"
          @details="detailsCar"
          @delete="deleteCar" />
          <loader/>
    </b-row>
    <b-row>
      <b-col>
        
      </b-col>
    </b-row>
    <b-modal
      ref="deleteConfirmModal"
      title="Подтвердите свои действия"
      @ok="onDeleteConfirm"
      @hide="onDeleteModalHide">
      <p class="my-4">Вы уверены, что хотите удалить это авто из каталога</p>
    </b-modal>
    <b-modal
      ref="alertModal"
      :title="alertModalTitle"
      :ok-only="true">
      <p class="my-4">{{ alertModalContent }}</p>
    </b-modal>
  </b-container>
  </div>
</template>
<script>
import CarService from '@/api-services/car.service'
import CarListRow from '@/components/car/CarListRow'
import Loader from '@/components/Loader'
export default {
  name: 'CarList',
  components: {
    CarListRow,
    Loader
  },
  data() {
    return {
      filter: '',
      cars: [],
      selectedCarIndex: 0,
      selectedCarId: null,
      alertModalTitle: '',
      alertModalContent: ''
    };
  },
  created() {
    this.fetchCars()
  },
  computed: {
    filteredRecords: function() {
      var self = this
      const filtered = this.cars.filter(car => {
        let byModel = car.model.indexOf(self.filter) > -1
        let byTitle = car.title.indexOf(self.filter) > -1

        if(byModel === true) {
          return byModel
        }

        if(byTitle === true) {
          return byTitle
        }
      })
      return filtered
    }
  },
   methods: {
    updateCar(carId) {
      this.$router.push({ name: 'CarUpdate', params: { id: carId } })
    },
    detailsCar(carId) {
      this.$router.push({ name: 'CarDetails', params: { id: carId } });
    },
    deleteCar(carId) {
      this.selectedCarId = carId;
      this.$refs.deleteConfirmModal.show()
    },
    fetchCars() {
      CarService.getAll().then((response) => {
        this.cars = response.data;
      });
    },
    onDeleteConfirm() {
      CarService.delete(this.selectedCarId).then(() => {
        this.alertModalTitle = 'Успешно!'
        this.alertModalContent = 'Авто успешно удалено из каталога'
        this.$refs.alertModal.show()
        this.fetchCars();
      }).catch((error) => {
        this.alertModalTitle = 'Ошибка'
        this.alertModalContent = error.response.data
        this.$refs.alertModal.show()
      })
    },
    onDeleteModalHide() {
      this.selectedCarId = null
    }
  }
}
</script>