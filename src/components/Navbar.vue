
<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="primary">
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