<!-- 组件说明 -->
<template>
  <div class="titleBar">
    <transition name='slide-down'>
    <div class='title-wrapper' v-show='isShowTitleAndMenu'>
      <div class="left">
        <span class="icon icon-jiantouzuo"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon icon-shiwu-gouwuche"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon icon-renyuan"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon icon-i-more"></span>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isShowTitleAndMenu: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  components: {

  },
  computed: {

  },
  methods: {
  }
}
</script>

<style lang='stylus' scoped>
@import '../stylus/global.styl'
  .title-wrapper
    width 100%
    height px2rem(120)
    position absolute
    left 0
    top 0
    z-index 101
    display flex
    background #fff
    font-size 15px
    box-shadow 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15)
    .left
      flex 0 0 px2rem(60)
      center()
    .right
      flex 1
      display flex
      justify-content flex-end
      .icon-wrapper
        flex 0 0 px2rem(100)
        center()
</style>
