<template>
      <div class="profile_page">
        <head-top go-back='true' :head-title="profiletitle"></head-top>
        <section>
           <section class="profile-number">
                <router-link :to="'/profile'" class="profile-link">
                    <img :src="buyerHeadimgurl" class="privateImage" v-if="true">
                    <div class="user-info">
                        <p>{{ buyerNickname }}</p>
                    </div>
                    <span class="arrow">
                        <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </router-link>
            </section>
            <section class="info-data">

                    <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>0</b>元</span>
                        <span class="info-data-bottom">我的余额</span>
                    </router-link>
                    <router-link to="" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>0</b>个</span>
                        <span class="info-data-bottom">我的优惠</span>
                    </router-link>

            </section>
            <section class="profile-1reTe">
                <!-- 会员中心 -->
                <router-link to='' class="myorder">
                    <icon name="huiyuan" width="50" height="19"></icon>
                    <div class="myorder-div" >
                        <span>会员中心</span>
                        <icon name="youjiantou" width="25" height="25"></icon>
                    </div>
                </router-link>
                <!-- 我的订单 -->
                <router-link to='/order' class="myorder">
                    <icon name="dingdan" width="50" height="25"></icon>
                    <div class="myorder-div">
                        <span>我的订单</span>
                        <icon name="youjiantou" width="25" height="25"></icon>
                    </div>
                </router-link>
                <!-- 我的评论 -->
                <router-link to='/comments' class="myorder">
                    <icon name="pinglun" width="50" height="25"></icon>
                    <div class="myorder-div">
                        <span>我的评论</span>
                        <icon name="youjiantou" width="25" height="25"></icon>
                    </div>
                </router-link>
                <!-- 我的地址 -->
                <router-link to='/addresses' class="myorder">
                    <icon name="dizhi" width="50" height="25"></icon>
                    <div class="myorder-div">
                        <span>我的地址</span>
                        <icon name="youjiantou" width="25" height="25"></icon>
                    </div>
                </router-link>
                    <!-- 服务中心 -->
                    <router-link to='' class="myorder">
                        <icon name="fuwuzhongxin" width="50" height="25"></icon>
                        <div class="myorder-div">
                            <span>服务中心</span>
                            <icon name="youjiantou" width="25" height="25"></icon>
                        </div>
                    </router-link>
            </section>
        </section>
        <!-- <tabbar></tabbar> -->
        <footGuide></footGuide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import {mapState, mapMutations} from 'vuex'
import footGuide from 'components/footer/footGuide'

var config = require('config')
config = process.env.NODE_ENV === 'development' ? config.dev : config.build
export default {

    data(){
        return{
            profiletitle: '我的',
            buyer: {},
            addressId:'',
            buyerId: '',
            buyerOpenid: '',
            buyerNickname: '',
            buyerHeadimgurl: '',
            buyerVip: 0
        }
    },
    components:{
        headTop,
        footGuide
    },
    computed:{
        ...mapState([
            'userInfo',
        ])
    },
    methods:{
        ...mapMutations([
            'SAVE_AVANDER'
        ])
    },
    created() {
        this.$http.get(this.HOST+'/buyer/buyerInfo', {
            params: {
                openid: getCookie('openid')
            }
        }).then(function (response) {
            response = response.body
            if(response.code == 0){
              this.buyer = response.data;
              this.addressId = this.buyer.addressId;
              this.buyerId = this.buyer.buyerId;
              this.buyerOpenid = this.buyer.buyerOpenid;
              this.buyerNickname = this.buyer.buyerNickname;
              this.buyerHeadimgurl = this.buyer.buyerHeadimgurl;
              this.buyerVip = this.buyer.buyerVip;
            }

        })
    }
}
function getCookie(name) {
        var arr;
        var reg = new RegExp('(^| )' +name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
</script>

<style lang="scss" scoped>
     @import 'src/style/mixin';

    .profile_page{
         p, span{
             font-family: Helvetica Neue,Tahoma,Arial;
         }
     }
    .profile-number{
         padding-top:1.95rem;
         .profile-link{
             display:block;
             display:flex;
             box-align: center;
             -webkit-box-align: center;
             -ms-flex-align: center;
             align-items: center;
             background:$blue;
             padding: .666667rem .6rem;
             .privateImage{
                 display:inline-block;
                 @include wh(2.5rem,2.5rem);
                 border-radius:50%;
                 vertical-align:middle;
                 .privateImage-svg{
                     background:$fc;
                     border-radius:50%;
                     @include wh(2.5rem,2.5rem);
                 }
             }
             .user-info{
                 margin-left:.48rem;
                 -webkit-box-flex: 1;
                 -ms-flex-positive: 1;
                 flex-grow: 1;
                 p{
                     font-size: 20px;
                     font-weight: 700;
                     @include sc(.8rem,$fc);
                     }
                     .icon-mobile-number{
                         display:inline-block;
                         @include sc(.57333rem,$fc);

                     }
                 }
             .arrow{
                 @include wh(.46667rem,.98rem);
                 display:inline-block;
                 svg{
                    @include wh(100%,100%);
                 }
             }
         }
    }
    .info-data{
         width:100%;
         background:$fc;
         box-sizing: border-box;
         padding-bottom: 4rem;
             .info-data-link{
                 float:left;
                 width:49.85%;
                 display:inline-block;
                 border-right:0.5px solid #f1f1f1;
                 span{
                     display:block;
                     width:90%;
                     text-align:center;
                 }
                 .info-data-top{
                     padding: .853333rem 0 .453333rem;
                     b{
                         display:inline-block;
                         @include sc(1rem,#f90);
                         font-weight:700;
                         line-height:1rem;
                         font-family: Helvetica Neue,Tahoma;
                     }
                 }
                 .info-data-bottom{
                     @include sc(1rem,#666);
                     font-weight:400;
                     padding-bottom:.453333rem;

                 }
             }

    }
    .profile-1reTe{
         margin-top:.4rem;
         background:$fc;
         .myorder{
             margin-top: .7rem;
             padding-left:0.5rem;
             display:flex;
             align-items: center;
             aside{
                 @include wh(.7rem,.7rem);
                 margin-left:-.866667rem;
                 margin-right:.266667rem;
                 display:flex;
                 align-items: center;
             }
             .myorder-div{
                 width:100%;
                 border-bottom:1px solid #f1f1f1;
                 padding:.433333rem .266667rem .433333rem 0;
                 @include sc(.7rem,#333);
                 display:flex;
                 justify-content:space-between;
                 span{
                     display:block;
                     font-size: 20px;
                     font-weight: 300;
                 }
                 .myorder-divsvg{
                     @include wh(.46667rem,.466667rem);
                     svg{
                         @include wh(100%,100%);
                     }
                 }
             }
         }
         .myorder:nth-of-type(3) .myorder-div{
             border:0;
         }
     }
     .router-slid-enter-active, .router-slid-leave-active {
         transition: all .4s;
     }
     .router-slid-enter, .router-slid-leave-active {
         transform: translate3d(2rem, 0, 0);
         opacity: 0;
     }
</style>
