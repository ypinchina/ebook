<!-- 组件说明 -->
<template>
  <div class='ebook'>
    <title-bar :isShowTitleAndMenu='isShowTitleAndMenu'></title-bar>
    <div class="read-wrapper">
      <div id="read">
      </div>
      <div class="mask">
        <div class="left" @click='prev'></div>
        <div class="center" @click='toggleTitleAndMenu'></div>
        <div class="right" @click='next'></div>
      </div>
    </div>
    <menu-bar :isShowTitleAndMenu='isShowTitleAndMenu'></menu-bar>
  </div>
</template>

<script>
import titleBar from './components/titleBar'
import menuBar from './components/menuBar'
import Epub from 'epubjs'
const DOWNLOAD_URL = '/2018_Book_AgileProcessesInSoftwareEngine.epub'
global.ePub = Epub
export default {
  components: {
    titleBar, menuBar
  },
  data () {
    return {
      isShowTitleAndMenu: false
    }
  },
  computed: {

  },
  methods: {
    showBook () {
      // 生成book对象
      this.book = new Epub(DOWNLOAD_URL)
      // 生存rendition对象
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.rendition.display()
    },
    prev () {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    next () {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    toggleTitleAndMenu () {
      this.isShowTitleAndMenu = !this.isShowTitleAndMenu
    }
  },
  mounted () {
    this.showBook()
  }
}
</script>

<style lang='stylus'>
@import './stylus/global.styl'
.ebook
  .read-wrapper
    position relative
    .mask
      display flex
      z-index 100
      width 100%
      height 100%
      position absolute
      top 0
      left 0
      .left
        flex 0 0 px2rem(100)
      .center
        flex 1
      .right
        flex 0 0 px2rem(100)
</style>
