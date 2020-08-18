<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{overAllScore}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家90%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="serverScore"></star>
            <span class="score">{{serverScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="productionScore"></star>
            <span class="score">{{productionScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">38分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"
                    :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.scoreStartNum, rating.context)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.buyerHeadimgurl">
            </div>
            <div class="content">
              <h1 class="name">{{rating.buyerNickname}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.scoreStartNum"></star>
                <!-- <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span> -->
              </div>
              <p class="text">{{rating.context}}</p>
              <!-- <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div> -->
              <div class="time">
                {{rating.createTime | formatDate}}
              </div>
            </div>
            <div class="showImage">
                <img class="wc-preview-img" :src="url" v-for="(url, key) in rating.imgUrls" :key="key" @click="$preview($event, rating.imgUrls, key)">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {formatDate} from 'common/js/date';
  import star from 'components/star/star';
  import ratingselect from 'components/ratingselect/ratingselect';
  import split from 'components/split/split';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        overAllScore: 0,
        serverScore: 0,
        productionScore: 0,
        selectType: ALL,
        onlyContent: true,
        buyer: {},
        buyerNickname: '',
        buyerHeadimgurl: '',
        buyerVip: 0.
      };
    },
    created() {
      this.$http.get(this.HOST+'/comment/findAll').then((response) => {
        response = response.body;
        if (response.code === ERR_OK) {
          this.ratings = response.data;
          let result1 = 0
          let result2 = 0
          for(let index in this.ratings){
            result1 += this.ratings[index].scoreStartNum
            result2 += this.ratings[index].severStartNum
          }
          this.productionScore = Math.ceil((result1)/this.ratings.length)-0.1
          this.serverScore = Math.ceil((result1)/this.ratings.length)-0.1
          this.overAllScore = (this.productionScore+this.serverScore)/2
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });

      this.$http.get(this.HOST+'/buyer/buyerInfo', {
          params: {
              openid: getCookie('openid')
          }
      }).then(function (response) {
          response = response.body
          if(response.code == ERR_OK){
            this.buyer = response.data;
            this.buyerNickname = this.buyer.buyerNickname;
            this.buyerHeadimgurl = this.buyer.buyerHeadimgurl;
            this.buyerVip = this.buyer.buyerVip;
          }

      });
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  };
  function getCookie(name) {
    var arr;
    var reg = new RegExp('(^| )' +name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position: absolute
    top: 174px
    bottom: 48px
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          margin-top -13px
          img
            border-radius: 50%
        .content
          position: center
          margin-top -13px
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            margin-top: 10px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 5px
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
        .showImage
          padding-left: 40px;
          margin-top 10px
          position: center
          img
            width: 54px;
            height: 54px;
</style>
