<!-- 组件说明 -->
<template>
  <div class='menuBar'>
    <transition name='slide-up'>
      <div class="menu-wrapper" v-show='isShowTitleAndMenu' :class="{'not-shadow': isFontSizeShow || !isShowTitleAndMenu}">
        <span class="icon icon-menu" @click="showFontSizeShow(3)"></span>
        <span class="icon icon-switch-OFF-c" @click="showFontSizeShow(2)"></span>
        <span class="icon icon-taiyang" @click="showFontSizeShow(1)"></span>
        <span class="icon icon-A" @click="showFontSizeShow(0)"></span>
      </div>
    </transition>
    <div class='catalog' >
      <transition name='slide-left'>
        <catalog v-if="ifShowContent" :navigation='navigation' @toJump='toJump' :bookAvailable='bookAvailable'></catalog>
      </transition>
      <transition name='fade'>
        <div class="mask" @click='hideShowTitleAndMenu' v-if="ifShowContent"></div>
      </transition>
    </div>
    <transition name='slide-up'>
      <div class="handleBar" v-show='isFontSizeShow' >
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
        <div class="setThemes-wrapper" v-else-if="showTag === 1">
          <div class="themesItem" v-for='(item, index) in themesList' :key='index' @click='selectThemes(index)'>
            <div class="preview" :style="{background: item.style.body.background}"
            :class="{'no-border': index !== 0}"
            ></div>
            <div class="text" :class="{'activeThemes': index === defaultThemes}">{{item.name}}</div>
          </div>
        </div>
        <div class="progress-wrapper" v-else-if="showTag === 2">
          <div class="progress">
            <input type="range"
            max="100" min="0"
            step="0"
            @input='progressInput($event.target.value)'
            @change="setProgress($event.target.value)"
            :value="progress"
            :disabled='!bookAvailable'
            ref='progress'
            >
          </div>
          <div class="text">
            {{bookAvailable === true ? progress + '%' : '加载中...'}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import catalog from './catalog'
export default {
  components: {
    catalog
  },
  props: {
    isShowTitleAndMenu: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themesList: Array,
    defaultThemes: Number,
    bookAvailable: Boolean,
    navigation: Object
  },
  data () {
    return {
      isFontSizeShow: false,
      showTag: 0,
      progress: 0,
      ifShowContent: false
    }
  },
  computed: {
  },
  methods: {
    hideShowTitleAndMenu () {
      this.$emit('hideShowTitleAndMenu')
      this.ifShowContent = false
    },
    setProgress (progress) {
      this.$emit('setProgress', progress)
    },
    showFontSizeShow (tag) {
      if (tag === 3) {
        this.ifShowContent = true
        this.isFontSizeShow = false
      } else {
        this.isFontSizeShow = true
      }
      this.showTag = tag
    },
    hideFontSize () {
      this.isFontSizeShow = false
    },
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    selectThemes (index) {
      this.$emit('setThemes', index)
    },
    progressInput (progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    toJump (href) {
      this.$emit('toJump', href)
      this.ifShowContent = false
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../stylus/global.styl'
.menuBar
  .handleBar
    position absolute
    left 0
    bottom 40px
    height px2rem(140)
    z-index 101
    background #fff
    width 100%
    box-shadow 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15)
    .progress-wrapper
      position relative
      height 100%
      width 100%
      .text
        text-align center
        position absolute
        left 0
        bottom 0
        width 100%
      .progress
        width 100%
        height 100%
        padding 0 px2rem(50)
        box-sizing border-box
        center()
        input
          height px2rem(10)
          -webkit-appearance none
          background linear-gradient(#999, #999) no-repeat #ddd
          background-size 0 100%
          width 100%
        input[type=range]::-webkit-slider-thumb
          -webkit-appearance none
          border-radius 50%
          height px2rem(50)
          width px2rem(50)
          background-color #fff
          box-shadow 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15)
          border solid px2rem(2) #666/*设置边框*/
    .setThemes-wrapper
      display flex
      height 100%
      .themesItem
        display flex
        flex 1
        flex-direction column
        center()
        height 100%
        box-sizing border-box
        padding px2rem(10)
        .preview
          flex 1
          width 100%
          height px2rem(40)
          border 1px #666 solid
          &.no-border
            border none
        .text
          flex 1
          font-size px2rem(20)
          color #ccc
          &.activeThemes
            color #000
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
  .catalog
    position absolute
    width 100%
    height 100%
    left 0
    top 0
    .mask
      position absolute
      width 100%
      height 100%
      z-index 101
      background-color rgba(51, 51, 51, 0.8)
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
