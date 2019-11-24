<template>
  <div>
    <b-row>
      <b-col
        md="2"
        offset-md="10">
        <router-link :to="{ name: 'CarCreate' }">Добавить авто</router-link>
      </b-col>
    </b-row>
    <br>
    <b-row md="12">
        <car-list-row
                v-for="car in cars"
                :key="car.id"
                :car="car"
                @details="detailsCar"
                @update="updateCar"
                @delete="deleteCar" />
    </b-row>
    <!-- <b-row>
      <b-col md="12">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Owner name</th>
                <th>Owner address</th>
                <th>Date of birth</th>
                <th>Details</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <car-list-row
                v-for="car in cars"
                :key="car.id"
                :car="car"
                @details="detailsCar"
                @update="updateCar"
                @delete="deleteCar" />
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row> -->
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
  </div>
</template>
<script>
import CarService from '@/api-services/car.service';
import CarListRow from '@/components/car/CarListRow';
export default {
  name: 'CarList',
  components: {
    CarListRow
  },
  data() {
    return {
      cars: [],
      selectedCarId: null,
      alertModalTitle: '',
      alertModalContent: ''
    };
  },
  created() {
    this.fetchCars()
  },
   methods: {
    detailsCar(carId) {
      console.log('details', carId)
    },
    updateCar(carId) {
      this.$router.push({ name: 'CarUpdate', params: { id: carId } })
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
};
</script>