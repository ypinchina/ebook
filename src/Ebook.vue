<!-- 组件说明 -->
<template>
  <div class='ebook'>
    <div class="read-wrapper">
      <div id="read">
      </div>
      <div class="mask">
        <div class="left" @click='prev'></div>
        <div class="center"></div>
        <div class="right" @click='next'></div>
      </div>
    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'
const DOWNLOAD_URL = '/2018_Book_AgileProcessesInSoftwareEngine.epub'
global.ePub = Epub
export default {
  components: {

  },
  data () {
    return {

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
