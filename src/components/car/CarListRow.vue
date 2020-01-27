<template>
  <b-col style="margin-bottom:60px" class="mt-4" md="4">
    <b-card>
      <b-img :src="car.image" fluid alt="Fluid image"></b-img>
      <b-card-text>
        <p>Модель {{ car.model }}  </p>
        <p>Марка {{ car.title }} </p>
        <p>Год выпуска {{ car.year }} </p>
        <p>Скорость {{ car.speed }} км/ч</p>
      </b-card-text>
      <b-button
      variant="outline-success"
      @click="onUpdateClick">Обновить</b-button>
       <b-button
      variant="outline-primary"
      @click="onDetailsClick">Подробнее</b-button>
      <b-button
      variant="outline-danger"
      @click="onDeleteClick">Удалить</b-button>
    </b-card>
  </b-col>
</template>
<script>
export default {
  name: 'CarListRow',
  props: [ 'car' ],
  methods: {
    onDetailsClick() {
      this.$emit('details', this.car.id);
    },
    onUpdateClick() {
      this.$emit('update', this.car.id);
    },
    onDeleteClick() {
      this.$emit('delete', this.car.id);
    }
  }
};
</script>

<style scoped>
.img-fluid {
    max-width: 100%;
    height: 150px;
}
</style>