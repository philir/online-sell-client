<template>
  <div class="rating_page">
    <head-top head-title="收货地址" go-back='true' :management="management" :save="save"
    @manage="showManage" @save="showSave"></head-top>
    <router-link to="/addAddress" class="add_icon_footer">
      <img src="../../images/add_address.png" height="24" width="24">
      <span>新增收货地址</span>
    </router-link>
    <section id="scroll_section" class="scroll_container">
      <section class="list_cotainer">
        <ul class="deliverable_address">
          <li v-for="(item,index) in addressList" @click.prevent.stop="chooseAddress(item, index)">
            <div class="address_icon">
              <font-awesome-layers full-width class="fa-1x" v-if="defaultIndex == index">
                <font-awesome-icon icon="check-circle" style="color: #00B43C;" class="icon_font" />
              </font-awesome-layers>
              <font-awesome-layers full-width class="fa-1x" v-else v-show="save">
                <font-awesome-icon icon="check-circle" style="color: #EFF0F1;" class="icon_font" />
              </font-awesome-layers>
            </div>

            <div class="address_context">
              <header>
                <span>{{item.buyerName}}</span>
                <span>{{item.buyerSex == 0? '先生' : '女士'}}</span>
                <span>{{item.buyerPhone}}</span>
              </header>
              <div class="address_detail ellipsis">
                <span v-if="item.tag == 2" :style="{backgroundColor: iconColor(item.tag)}">学校</span>
                <span v-if="item.tag == 3" :style="{backgroundColor: iconColor(item.tag)}">家</span>
                <span v-if="item.tag == 4" :style="{backgroundColor: iconColor(item.tag)}">公司</span>
                <p>{{item.addressName}}---</p>
                <p>{{item.detailAddress}}</p>
              </div>
            </div>
            <div class="address_edit" v-if="manage">
              <i class="iconfont" @click="edit(item)">&#xe609;编辑</i>
              <i class="iconfont" @click="dele(item)">&#xe60e;删除</i>
            </div>
          </li>
        </ul>
        <!-- <section id="out_delivery" v-if="deliverdisable.length">
                    <header class="out_header">以下地址超出配送范围</header>
                    <ul class="deliverable_address">
                        <li v-for="(item,index) in deliverdisable">
                            <svg class="choosed_address">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                            <div>
                                <header>
                                    <span>{{item.name}}</span>
                                    <span>{{item.sex == 1? '先生' : '女士'}}</span>
                                    <span>{{item.phone}}</span>
                                </header>
                                <div class="address_detail ellipsis">
                                    <span v-if="item.tag" :style="{backgroundColor: '#ccc', color: '#fff'}">{{item.tag}}</span>
                                    <p>{{item.address_detail}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section> -->
      </section>
    </section>
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
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        addressList: [], //地址列表
        addressIndex: 0,
        manage: false,
        management: true,
        save: false
      }
    },
    created() {
      this.$http.get(this.HOST + '/address/findList', {
        params: {
          'openid': getCookie('openid')
        },
      }, ).then((response) => {
        response = response.body;
        if (response.code === 0) {
          this.addressList = response.data;
        }
      })
    },
    components: {
      headTop
    },
    props: [],
    computed: {
      //选择地址
      defaultIndex: function() {
        if (this.addressIndex != 0) {
          return this.addressIndex;
        } else {
          return 0;
        }
      }
    },
    methods: {
      ...mapMutations([
        'CHOOSE_ADDRESS'
      ]),
      iconColor(tag) {
        switch (tag) {
          case '2':
            return '#4cd964';
          case '3':
            return '#00B43C';
          case '4':
            return '#3190e8';
        }
      },
      //选择地址
      chooseAddress(address, index) {
        this.addressIndex = index;
      },
      showManage(data){
        this.manage = data;
        this.management = false;
        this.save = true;

      },
      showSave(data){
        this.manage = data;
        this.save = false;
        this.management = true;
      },
      edit(item){
        location.href = '/#/addAddress/' + item.addressId;
      },
      dele(item){
        this.$http.get(this.HOST + '/address/delete', {
          params: {
             addressId: item.addressId,
          }
        }).then(function(response) {
          response = response.body
          if (response.code == 0) {
            alert('删除成功')
          } else {
            alert('删除失败' + response.msg)
          }
          this.$router.push('/addresses');
        });
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

  .rating_page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    padding-top: 1.95rem;

    p,span {
      font-family: Helvetica Neue, Tahoma, Arial;
    }
  }

  .scroll_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    overflow-y: auto;
  }

  .list_cotainer {
    padding-bottom: 5rem;
  }

  .add_icon_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 204;

    span {
      @include sc(.7rem, $blue);
      margin-left: .3rem;
    }
  }

  .deliverable_address {
    background-color: #fff;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 0.025rem solid #f5f5f5;
      padding: .7rem;
      line-height: 1rem;

      .address_icon {
        width: 5%;
        text-align: center;
        /* margin-top: -35px;
        margin-right: 5px; */
      }
      .address_context {
          header {
            @include sc(.7rem, #333);

            span:nth-of-type(1) {
              font-size: .8rem;
              font-weight: bold;
              padding-left: 5px;
            }
          }
          .address_detail {
            display: flex;
            align-items: center;
            padding-left: 5px;
            margin-bottom: 5px;
            span {
              @include sc(.5rem, #fff);
              border-radius: .15rem;
              background-color: #ff5722;
              height: .6rem;
              line-height: .6rem;
              padding: 0 .2rem;
              margin-right: .3rem;
            }
            p {
              @include sc(.6rem, #777);
            }

          }
      }
      .address_edit{
        /* margin-top: 10px; */
        margin-left: 50px;
        width: 40%;
        height: 50%;
        .iconfont {
          right: 10px;
          font-size: 12px;
          padding-left: 5px;
          margin-right: 10px;
        }
      }
    }
  }

  #out_delivery {
    .out_header {
      @include sc(.6rem, #666);
      line-height: 1.5rem;
      padding-left: .5rem;
      background-color: #f5f5f5;
    }

    * {
      color: #ccc;
    }
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
