<template>
  <p class="homeText">
    Спортивные авто
  </p>
</template>
<script>
import CarService from '@/api-services/car.service';
export default {
  name: 'Home',
  created() {
    CarService.getAll().then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error.response.data);
    });
  }
};
</script>
<style scoped>
.homeText{
    font-size: 35px;
    color: red;
    text-align: center;
    position: relative;
    top:30px;
    text-shadow: 2px 2px 2px gray;
}
</style>