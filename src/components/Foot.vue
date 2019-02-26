<template>
  <footer>
    &copy; <a href="https://athensservices.com">Athens Advisor</a>
    // 1.2~Stable
  </footer>
</template>

<script>
  export default {
    name: 'Foot'
  }
</script>

<style scoped lang="scss">
  footer {
    text-align: center;
    padding: 1rem;
    background: $gray--light;
    clear: both;
  }

  a {
    font-weight: bold;
  }
</style>