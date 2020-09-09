<!-- 组件说明 -->
<template>
  <div class='menuBar'>
    <transition name='slide-up'>
      <div class="menu-wrapper" v-show='isShowTitleAndMenu'>
        <span class="icon icon-menu"></span>
        <span class="icon icon-switch-OFF-c"></span>
        <span class="icon icon-taiyang"></span>
        <span class="icon icon-A"></span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {

  },
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
  computed: {

  },
  methods: {
  }
}
</script>

<style lang='stylus' scoped>
@import '../stylus/global.styl'
  .menu-wrapper
    width 100%
    height 40px
    position absolute
    left 0
    bottom 0
    z-index 101
    background #fff
    font-size 15px
    box-shadow 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15)
    text-align center
    display flex
    justify-content center
    align-items center
    .icon
      flex 1
      font-size px2rem(40)
</style>
