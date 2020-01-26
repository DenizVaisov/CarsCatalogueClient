<template>
  <div>
    <b-container fluid>
    <div class="well">
      <b-row>
        <b-col class="mt-2" offset-md="1" md="10">
          <h1>{{ car.title }} {{car.model}}</h1>
        </b-col>
      </b-row>
      
      <b-row>
        <b-col offset-md="2" md="8">
            <!-- <b-img :src="car.image" fluid alt="Fluid image"></b-img> -->
            <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="15000"
                indicators
                fade
                background="#ababab"
                img-width="1024"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                >
                <b-carousel-slide>
                    <template v-slot:img>
                    <img
                        class="d-block img-fluid w-100"
                        width="1368"
                        height="380"
                        :src="car.image"
                        alt="image slot"
                    >
                    </template>
                </b-carousel-slide>
                <!-- <b-carousel-slide>
                    <template v-slot:img>
                        <img
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="380"
                            src="https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/788x525/quality/85/https://s.aolcdn.com/commerce/autodata/images/USC90BMS191A021002.jpg"
                            alt="image slot"
                        >
                    </template>
                </b-carousel-slide> -->
            </b-carousel>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-4 mb-4" offset-md="2" md="8">
          <h3 class="mb-4">Обзор</h3>
            <b-embed
                type="iframe"
                aspect="16by9"
                :src="car.video"
                allowfullscreen
              >
            </b-embed>
        </b-col>
      </b-row>
      <b-row>
        <b-col offset-md="1" md="10">
          <h3>Описание</h3>
          <p>{{car.description}}</p>
        </b-col>
      </b-row>
    </div>
 
    <b-row>
      <b-col md="12">
        <div class="table-responsive">
        <h3>Характеристики</h3>
          <table     
            class="table">
            <thead>
              <tr>
                <th>Марка</th>
                <th>Модель</th>
                <th>Стоимость</th>
                <th>Год выпуска</th>
                <th>Двигатель кВт (л.с.) / об/мин</th>
                <th>Объём, см3</th>
                <th>Максимальная скорость, км/ч</th>
                <th>Разгон 0-100, км/ч, с</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ car.title }}</td>
                <td>{{ car.model }}</td>
                <td>{{ car.price }} $</td>
                <td>{{ car.year }}</td>
                <td>{{ car.engine }}</td>
                <td>{{ car.capacity }}</td>
                <td>{{ car.speed }}</td>
                <td>{{ car.accelaration }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>
import CarService from '@/api-services/car.service'
export default {
  name: 'CarDetails',
  components: {
  },

  data() {
    return {
      car: {},
      slide: 0,
      sliding: null
    }
  },
  methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
  },
  created() {
    CarService.get(this.$router.currentRoute.params.id).then((response) => {
      this.car = response.data
      console.log(this.car)
      })
    }
  }
</script>

<style>
.carousel-indicators li {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    -ms-flex: 0 1 auto;
    -webkit-box-flex: 0;
    flex: 0 1 auto;
    width: 30px;
    height: 3px;
    margin-right: 3px;
    margin-left: 3px;
    text-indent: -999px;
    cursor: pointer;
    background-color: blue;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    -webkit-transition: opacity 0.6s ease;
    transition: opacity 0.6s ease;
    /* color: blue; */
}
</style>
