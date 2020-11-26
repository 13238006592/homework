<template>
  <div class="hello">
      About
      <router-link to="/">home</router-link>
      <router-link to="/about">about</router-link>
  </div>
</template>

<script>
export default {
  name: 'About',
  props: {
    msg: String
  }
}
</script>


