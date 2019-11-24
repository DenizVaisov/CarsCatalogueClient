<template>
  <b-col md="3">
      <b-card
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        class="mb-2"
      >
        <b-card-text>
          <p>Модель {{ car.model }}  </p>
          <p>Описание  {{ car.title }} </p>
          <p>Год выпуска {{ car.year }} </p>
          <p>Скорость {{ car.speed }} </p>
        </b-card-text>

        <b-button
        variant="success"
        @click="onUpdateClick">Обновить</b-button>
        <b-button
        variant="danger"
        @click="onDeleteClick">Удалить</b-button>
      </b-card>
    </b-col>

    <!-- <b-button
      @click="onDetailsClick">Подробнее</b-button> -->
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