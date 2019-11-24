
<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="info">
    <!-- <b-navbar-brand :to="{ name: 'Home' }">Спортивные авто</b-navbar-brand> -->
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'CarList' }">Авто</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
export default {
  name: 'Navbar'
};
</script>