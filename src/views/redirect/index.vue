<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    console.log('rediect to /' + path)
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
