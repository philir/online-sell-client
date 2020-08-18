<template>
    <div infinite-scroll-distance="20" class="commentbody">
      <div>
      <head-top go-back='true' :head-title="profiletitle"></head-top>
      </div>
    <a class="commentcard" v-for="item in commentList">
        <div  class="commentcard-body">
            <div   class="commentcard-avatar">
                <img  :src="buyerHeadimgurl">
            </div>
            <div  class="commentcard-content">
                <div   class="commentcard-head">
                    <div  class="title">
                        <p class="name">{{buyerNickname}} </p>
                        <p class="time">{{item.createTime | time }}</p>
                    </div>
                    <div class="score">
                      <p><star :size="24" :score="item.scoreStartNum"></star></p>
                      <p class="name" v-if="item.scoreStartNum === 1">
                        很差
                      </p>
                      <p class="name" v-else-if="item.scoreStartNum === 2">
                        差
                      </p>
                      <p class="name" v-else-if="item.scoreStartNum === 3">
                        一般
                      </p>
                      <p class="name" v-else-if="item.scoreStartNum === 4">
                        滿意
                      </p>
                      <p class="name" v-else-if="item.scoreStartNum === 5">
                        优质评价
                      </p>
                    </div>
                </div>
                <div class="commentcard-context">
                    <p  class="context">
                        {{ item.context }}
                    </p>
                </div>
            </div>
        </div>
        <div class="showImage">
            <img class="wc-preview-img" :src="url" v-for="(url, key) in item.imgUrls" :key="key" @click="$preview($event, item.imgUrls, key)">
        </div>
    </a>
    </div>
</template>

<script type="text/ecmascript-6">
  import footGuide from 'components/footer/footGuide';
  import headTop from 'src/components/header/head1';
  import star from 'components/star/star';
 var starOffImg = '../../../static/Images/star02@2x.png'
  var starOnImg = '../../../static/Images/star@2x.png'
  /* var starOffImg = '/sell/Images/star02@2x.png'
  var starOnImg = '/sell/Images/star@2x.png' */
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
          showBigImg: false,
          size: 30,
          commentList: [],
          orderStatusName: '',
          isPopupVisible: false,
          ite: {},
          profiletitle: '评价列表',
          buyer: {},
          buyerNickname: '',
          buyerHeadimgurl: '',
          buyerVip: 0,
          imgUrls: []
      };
    },
    created() {
      this.$http.get(this.HOST+'/buyer/buyerInfo', {
          params: {
              openid: getCookie('openid')
          }
      }).then(function (response) {
          response = response.body;
          if(response.code === ERR_OK){
            this.buyer = response.data;
            this.buyerNickname = this.buyer.buyerNickname;
            this.buyerHeadimgurl = this.buyer.buyerHeadimgurl;
            this.buyerVip = this.buyer.buyerVip;
          }
      }),
      this.$http.get(this.HOST+'/comment/findList', {
        params: {
          'openid': getCookie('openid')
          },
        },
        ).then((response) => {
        response = response.body;
        if (response.code === ERR_OK) {
            this.commentList =  response.data;
        }
      })
    },
    methods: {
        showStar: function (item) {
           for (var i = 0; i < item.scoreStartNum; i++) {
             this.stars[i].src = starOnImg
             this.stars[i].active = true
           }
        },
        showPopup(data){
              this.isPopupVisible = true;
              this.ite = data;
            },
        closePopup(){
              this.isPopupVisible = false
            },
        handleChange (index) {
          this.num = index
        },
        bigImg (item) {
          this.showBigImg = true
          this.imgUrls = item.imgUrls
        },
        imgBack(){
          this.showBigImg = false
        }
    },
    components: {
      footGuide,
      headTop,
      star
    },
      filters: {
        time: function (value) {
            var date = new Date(value*1000);
            return date.getFullYear() + '-'
                + (date.getMonth() + 1) + '-'
                + date.getDate() + ' '
                + date.getHours() + ':'
                + date.getMinutes();
        }
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

<style lang="less" scoped>
    html, body {
       height: 100%;
       width: 100%;
     }

     .commentbody {
       position: absolute;
       width: 100%;
       height: 580px;
       background-color: #fff;
       margin-bottom: 40px;
       margin-top: 30px;
       .commentcard {
         display: block;
         padding-top: 10px;
         padding-left: 10px;
         /* margin-top: 30px; */
         margin-bottom: 10px;
         border-top:1px solid #f1f1f1;
         bottom: 48px;
         background-color: #fff;
         .commentcard-body {
           display: flex;
           height: 60%;
           .commentcard-avatar {
             flex: none;
             padding-right: 10px;
             margin-top: 10px;
             img {
               width: 30px;
               height: 30px;
             }
           }
           .commentcard-content {
             flex: 1;
             svg {
               width: 4px;
               height: 4px;
             }
             .commentcard-head {
               padding-right: 10px;
               padding-bottom: 3px;
               .title {
                 display: flex;
                 justify-content: space-between;
                 margin-top: 10px;
                 .name {
                   color: #333;
                   font-weight: 500;
                   font-size: 15px;
                 }
                 .time {
                   color: #333;
                   font-weight: 300;
                   font-size: 10px;
                 }
               }
               .score {
                 padding-right: 10px;
                 display: flex;
                 justify-content: space-between;
                 padding-top: 5px;
                 .name {
                   font-size: 5px;
                   padding-top: 3px;
                   justify-content: space-between;
                   img {
                     width: 10px;
                     height: 10px;
                   }
                 }
               }
             }
             .commentcard-context {
               display: flex;
               justify-content: space-between;
               padding-right: 10px;
               align-items: center;
               padding-top: 15px;
               padding-bottom: 10px;
               font-size: 10px;
             }
         }
       }

       .showImage {
         padding-left: 40px;
         img {
           width: 64px;
           height: 64px;
         }
       }
   }
}

</style>
