<template>
  <div class="address_page">
    <head-top head-title="添加地址" go-back='true'></head-top>
    <section class="page_text_container">
      <section class="section_list">
        <span class="section_left">联系人</span>
        <section class="section_right">
          <input type="text" name="buyerName" placeholder="你的名字" v-model="buyerName" class="input_style">
          <div class="choose_sex">
            <span class="choose_option">
              <font-awesome-layers full-width class="fa-1x" @click="chooseSex(0)" :class="{choosed: buyerSex == 0}">
                <font-awesome-icon icon="mars" class="icon_font" />
              </font-awesome-layers>
              <span>先生</span>
            </span>
            <span class="choose_option">
              <font-awesome-layers full-width class="fa-1x" @click="chooseSex(1)" :class="{choosed: buyerSex == 1}">
                <font-awesome-icon icon="venus" class="icon_font" />
              </font-awesome-layers>
              <span>女士</span>
            </span>
          </div>
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">联系电话</span>
        <section class="section_right">
          <div class="phone_add">
            <input type="text" name="buyerPhone" placeholder="你的手机号" v-model="buyerPhone" class="input_style">
            <font-awesome-layers full-width class="fa-1x">
              <font-awesome-icon icon="user-circle" class="icon_font" />
            </font-awesome-layers>
          </div>
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">送餐地址</span>
        <section class="section_right">
          <!-- <router-link to="/searchAddress" tag="div" class="choose_address">小区/写字楼/学校等{{searchAddress? searchAddress.name : '小区/写字楼/学校等'}}</router-link> -->
          <input type="text" name="addressName" placeholder="小区/写字楼/学校等" v-model="addressName" class="input_style">
          <input type="text" name="detailAddress" placeholder="详细地址（如门牌号等）" v-model="detailAddress" class="input_style">
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">标签</span>
        <section class="section_right">
          <input type="text" name="tag_type" :value="tag_type" placeholder="无/家/学校/公司" v-model="tag_type" class="input_style">
        </section>
      </section>
    </section>
    <div class="determine" @click="addAddress">确定</div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import headTop from 'src/components/header/head'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import alertTip from 'src/components/common/alertTip'

  export default {
    data() {
      return {
        address: {},
        buyerName: null, //姓名
        buyerSex: 0, //性别
        buyerPhone: null, //电话
        addressName: null, //大地址
        detailAddress: null, //详细地址
        tag_type: '', //备注
        tag: 1, //备注类型
        alertText: null, //弹出框信息
        poi_type: 0, //地址类型
      }
    },
    created() {
      if (this.$route.params.addressId != null) {
        this.$http.get(this.HOST + '/address/findOne', {
          params: {
            addressId: this.$route.params.addressId,
          }
        }).then(function(response) {
          response = response.body;
          if(response.code == 0){
            this.address = response.data;
            this.buyerName = this.address.buyerName;
            this.buyerSex = this.address.buyerSex;
            this.buyerPhone = this.address.buyerPhone;
            this.addressName = this.address.addressName;
            this.detailAddress = this.address.detailAddress;
            this.tag = this.address.tag;
            if (this.tag == 2) {
              this.tag_type = '学校';
            } else if (this.tag == 3) {
              this.tag_type = '家';
            } else if (this.tag == 4) {
              this.tag_type = '公司';
            }
          }
        })
      }
    },
    components: {
      headTop,
      alertTip,
    },
    computed: {
      ...mapState([
        'searchAddress', 'geohash', 'userInfo',
      ]),
    },
    methods: {
      ...mapMutations([
        'CONFIRM_ADDRESS'
      ]),
      //选择性别
      chooseSex(buyerSex) {
        this.buyerSex = buyerSex;
      },
      //保存地址信息
      async addAddress() {
        if (!this.buyerName) {
          alert("请输入名字")
          return
        } else if (!this.buyerPhone) {
          alert("请输入电话号码")
          return
        } else if (!this.addressName) {
          alert("请填写地址")
          return
        } else if (!this.detailAddress) {
          alert("请输入详细地址")
          return
        }
        if (this.tag_type == '家') {
          this.tag = 3;
        } else if (this.tag_type == '学校') {
          this.tag = 2;
        } else if (this.tag_type == '公司') {
          this.tag = 4;
        }
        if(this.$route.params.addressId != null){
          this.$http.post(this.HOST + '/address/alter', {
            addressId: this.$route.params.addressId,
            buyerName: this.buyerName,
            buyerOpenid: getCookie('openid'),
            buyerSex: this.buyerSex,
            buyerPhone: this.buyerPhone,
            addressName: this.addressName,
            detailAddress: this.detailAddress,
            tag: this.tag
          }, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then(function(response) {
            response = response.body
            if (response.code == 0) {
              alert('修改成功')
              this.$router.go(-1);
            } else {
              alert('修改失败' + response.msg)
            }
          });
        }else{
          this.$http.post(this.HOST + '/address/add', {
            buyerName: this.buyerName,
            buyerOpenid: getCookie('openid'),
            buyerSex: this.buyerSex,
            buyerPhone: this.buyerPhone,
            addressName: this.addressName,
            detailAddress: this.detailAddress,
            tag: this.tag
          }, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then(function(response) {
            response = response.body
            if (response.code == 0) {
              alert('添加成功')
              this.$router.go(-1);
            } else {
              alert('添加失败' + response.msg)
            }
          });
        }

      }
    }
  }

  function getCookie(name) {
    var arr;
    var reg = new RegExp('(^| )' + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .address_page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 204;
    padding-top: 1.95rem;

    p,
    span,
    input {
      font-family: Helvetica Neue, Tahoma, Arial;
    }
  }

  .page_text_container {
    background-color: #fff;
    padding: 0 .7rem;
  }

  .section_list {
    display: flex;
    border-bottom: 0.025rem solid #f5f5f5;

    .section_left {
      @include sc(.7rem, #333);
      flex: 2;
      line-height: 2.5rem;
    }

    .section_right {
      flex: 5;

      .input_style {
        width: 100%;
        height: 2.5rem;
        @include sc(.7rem, #999);
      }

      .phone_bk {
        border-top: 0.025rem solid #f5f5f5;
      }

      .phone_add {
        @include fj;
        align-items: center;
      }

      .choose_sex {
        display: flex;
        line-height: 2.5rem;
        border-top: 0.025rem solid #f5f5f5;

        .choose_option {
          @include sc(.7rem, #333);
          display: flex;
          align-items: center;
          margin-right: .8rem;

          /* svg{
                        margin-right: .3rem;
                        @include wh(.8rem, .8rem);
                    } */
          .choosed {
            color: #007AFF
          }
        }
      }

      .choose_address {
        @include sc(.7rem, #999);
        line-height: 2.5rem;
        border-bottom: 0.025rem solid #f5f5f5;
      }
    }
  }

  .determine {
    background-color: #4cd964;
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    margin-top: .6rem;
  }

  .router-slid-enter-active,
  .router-slid-leave-active {
    transition: all .4s;
  }

  .router-slid-enter,
  .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
