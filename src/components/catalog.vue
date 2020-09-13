<!-- 组件说明 -->
<template>
  <div class='catalog-wrapper'>
    <div class="wrapper" v-if="bookAvailable === true">
      <div class="catalog-item" v-for='(item, index) in navigation.toc' :key='index' @click='select(item)'>
        <div>{{item.label}}</div>
      </div>
    </div>
    <div v-else-if='bookAvailable === false' class="loading">加载中...</div>
  </div>
</template>

<script>
export default {
  props: {
    bookAvailable: Boolean,
    navigation: Object
  },
  components: {

  },
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {
    select (item) {
      this.$emit('toJump', item.href)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../stylus/global.styl'
.catalog-wrapper
  position absolute
  height 100%
  z-index 102
  width 50%
  background-color #fff
  .loading
    width 100%
    height 100%
    center()
  .wrapper
    .catalog-item
      box-sizing border-box
      padding px2rem(30) px2rem(20)
      border-bottom 1px solid #ccc
      &.catalog-item:hover
        background-color #666
        color #fff
</style>
