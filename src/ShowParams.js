export default {
  name: 'ShowParams',
  render(h) {

    return h(
      'pre',
      {
        style:{
          padding: '20px',
          maxHeight: '300px',
          color: 'white',
          overflow: 'auto',
          backgroundColor: 'black',
        }
      },
      this.$slots.default
    )
  }
}
