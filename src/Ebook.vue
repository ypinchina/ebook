<!-- 组件说明 -->
<template>
  <div class='ebook'>
    <title-bar :isShowTitleAndMenu='isShowTitleAndMenu' ></title-bar>
    <div class="read-wrapper">
      <div id="read">
      </div>
      <div class="mask">
        <div class="left" @click='prev'></div>
        <div class="center" @click='toggleTitleAndMenu'></div>
        <div class="right" @click='next'></div>
      </div>
    </div>
    <menu-bar :isShowTitleAndMenu='isShowTitleAndMenu'
    ref='$menuBar'
    :fontSizeList='fontSizeList'
    :defaultFontSize='defaultFontSize'
    @setFontSize='setFontSize'
    :themesList='themesList'
    @setThemes='setThemes'
    :defaultThemes='defaultThemes'
    :bookAvailable='bookAvailable'
    @setProgress='setProgress'
    @hideShowTitleAndMenu='hideShowTitleAndMenu'
    @toJump='toJump'
    :navigation='navigation'
    >
    </menu-bar>
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
      isShowTitleAndMenu: false,
      fontSizeList: [{
        fontSize: 12
      }, {
        fontSize: 14
      }, {
        fontSize: 16
      }, {
        fontSize: 18
      }, {
        fontSize: 20
      }, {
        fontSize: 22
      }, {
        fontSize: 24
      }, {
        fontSize: 26
      }],
      defaultFontSize: 16,
      themesList: [{
        name: 'default',
        style: {
          body: {
            color: '#000',
            background: '#fff'
          }
        }
      }, {
        name: 'eye',
        style: {
          body: {
            color: '#000',
            background: '#cce8cf'
          }
        }
      }, {
        name: 'night',
        style: {
          body: {
            color: '#fff',
            background: '#666'
          }
        }
      }, {
        name: 'gold',
        style: {
          body: {
            color: '#000',
            background: '#f2ede3'
          }
        }
      }],
      defaultThemes: 0,
      bookAvailable: false,
      navigation: {}
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
      // 保存主题
      this.themes = this.rendition.themes
      // 设置默认字体
      this.themes.fontSize(this.defaultFontSize)
      // 注册主题
      this.registerThemes()
      // 读取location对象
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        console.log(this.navigation)
        // this.navigation.toc.label 章节标题 .href跳转链接
        return this.book.locations.generate()
      }).then(() => {
        this.locations = this.book.locations
        this.bookAvailable = true
      })
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
      if (!this.isShowTitleAndMenu) {
        this.$refs.$menuBar.hideFontSize()
      }
    },
    setFontSize (fontSize) {
      this.defaultFontSize = fontSize
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    },
    registerThemes () {
      this.themesList.forEach(themes => {
        this.themes.register(themes.name, themes.style)
      })
      this.setThemes(this.defaultThemes)
    },
    setThemes (index) {
      this.defaultThemes = index
      this.themes.select(this.themesList[index].name)
    },
    setProgress (progress) {
      const percentage = progress / 100
      const location = progress > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },
    hideShowTitleAndMenu () {
      this.isShowTitleAndMenu = false
    },
    toJump (href) {
      this.rendition.display(href)
      this.isShowTitleAndMenu = false
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
