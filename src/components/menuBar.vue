<!-- 组件说明 -->
<template>
  <div class='menuBar'>
    <transition name='slide-up'>
      <div class="menu-wrapper" v-show='isShowTitleAndMenu' :class="{'not-shadow': isFontSizeShow || !isShowTitleAndMenu}">
        <span class="icon icon-menu"></span>
        <span class="icon icon-switch-OFF-c"></span>
        <span class="icon icon-taiyang" @click="showFontSizeShow(1)"></span>
        <span class="icon icon-A" @click="showFontSizeShow(0)"></span>
      </div>
    </transition>
    <transition name='slide-up'>
      <div class="fontSizeBar" v-show='isFontSizeShow' >
        <div class="font-size-wrapper" v-if="showTag === 0">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
          <div class='box'>
            <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
              <div class="line">
              </div>
                <div class="point-wrapper" >
                  <div class="point" v-show="defaultFontSize === item.fontSize">
                    <div class="small-point"></div>
                  </div>
                </div>
              <div class="line">
              </div>
            </div>
          </div>
          <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
        </div>
        <div class="setThemes-wrapper" v-else-if="showTag === 1" v-for='(item, index) in themesList' :key='index' @click='selectThemes(index)'>
          <div class="preview"></div>
          <div class="text">{{item.name}}</div>
        </div>
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
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themesList: Array
  },
  data () {
    return {
      isFontSizeShow: false,
      showTag: 0
    }
  },
  computed: {
  },
  methods: {
    showFontSizeShow (tag) {
      this.isFontSizeShow = true
      this.showTag = tag
    },
    hideFontSize () {
      this.isFontSizeShow = false
    },
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../stylus/global.styl'
.menuBar
  .fontSizeBar
    position absolute
    left 0
    bottom 40px
    height px2rem(100)
    z-index 101
    background #fff
    width 100%
    box-shadow 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15)
    .setThemes-wrapper
      display flex
      height 100%
      .preview
        flex 1
    .font-size-wrapper
      display flex
      height 100%
      .preview
        flex 0 0 px2rem(40)
        center()
      .box
        flex 1
        display flex
        .select-wrapper
          flex 1
          display flex
          align-items center
          &:first-child>.line:first-child
            border none
          &:last-child>.line:last-child
            border none
          .line
            height 0
            flex 1
            border-top px2rem(1) solid #ccc
          .point-wrapper
            position relative
            border-left 1px solid #ccc
            flex 0 0 0
            width 0
            height px2rem(14)
            .point
              left -12px
              top -10px
              position absolute
              border-radius 50%
              height px2rem(50)
              width px2rem(50)
              background-color #fff
              box-shadow 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15)
              center()
              border 1px solid #ccc
              .small-point
                width px2rem(10)
                height px2rem(10)
                background-color #000
                border-radius 50%
  .menu-wrapper
    width 100%
    height px2rem(120)
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
    &.not-shadow
      box-shadow none
    .icon
      flex 1
      font-size px2rem(60)
</style>
