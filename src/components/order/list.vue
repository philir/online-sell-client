<template>
    <div infinite-scroll-distance="20" class="orderbody">
      <div>
      <head-top go-back='true' :head-title="profiletitle"></head-top>
      </div>
    <a class="ordercard" v-for="item in orderList">
        <div  class="ordercard-body">
            <div  @click="orderDetail(item)" class="ordercard-avatar">
                <img  src="/sell/image/fendou.jpg">
            </div>
            <div  class="ordercard-content">
                <div  @click="orderDetail(item)" class="ordercard-head">
                    <div  class="title">
                            <p class="name">奋斗小馆 </p><span>></span>
                        <!--这里使用订单状态和支付状态组合显示
                        订单: 新下单/已完成/已取消
                        支付: 未支付/已支付-->
                        <p  class="status">{{item.orderStatus | formatOrderStatus(item.payStatus) }}</p>
                    </div>
                    <div class="content">
                      <p class="name">{{item.createTime | time }}</p>
                    </div>
                </div>
                <div  @click="orderDetail(item)" class="ordercard-detail">
                    <p  class="detail">
                        <span  class="productname">{{ item.orderProductDes }}</span>
                    </p>
                    <p  class="price">¥{{item.orderAmount}}</p>
                </div>
                <div class="ordercard-delete">
                  <span></span>
                  <button class="btn btn-danger" v-on:click="comment(item)" v-show="item.commentStatus == 0">
                    <i class="fa fa-trash-o fa-lg"></i> 评论一下
                    </button>
                  <button class="btn btn-danger" v-on:click="deleteOrder(item)">
                    <i class="fa fa-trash-o fa-lg"></i> 刪除订单
                    </button>
                </div>
            </div>
        </div>
    </a>
    <footGuide></footGuide>
    </div>
</template>

<script type="text/ecmascript-6">
  import footGuide from 'components/footer/footGuide';
  import headTop from 'src/components/header/head1'
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        orderList: [],
          orderStatusName: '',
          isPopupVisible: false,
          ite: {},
          profiletitle: '订单列表'
      };
    },
    created() {
      this.$http.get(this.HOST+'/buyer/order/list', {
        params: {
          'openid': getCookie('openid'),
          'page': 0,
          'size': 100
          },
        },
        ).then((response) => {
        response = response.body;
        if (response.code === ERR_OK) {
            this.orderList =  response.data;
        }
      });
    },
    methods: {
        orderDetail: function (item) {
           location.href = '/#/order/' + item.orderId;
        },
        deleteOrder: function (item) {
          this.$http.post(this.HOST+'/buyer/order/delete', {
              orderId: item.orderId,
              openid: getCookie('openid')
          }).then(function (response) {
              response = response.body
              if (response.code == 0) {
                  location.reload()
              }else {
                  alert('删除订单失败:' + response.msg)
              }
          });
        },
        showPopup(data){
              this.isPopupVisible = true;
              this.ite = data;
            },
        closePopup(){
              this.isPopupVisible = false
            },
        comment(item) {
            location.href = '/#/comments/' + item.orderId;
        }
    },
    components: {
      footGuide,
      headTop
    },
      filters: {
        time: function (value) {
            var date = new Date(value);
            return date.getFullYear() + '-'
                + (date.getMonth() + 1) + '-'
                + date.getDate() + ' '
                + date.getHours() + ':'
                + date.getMinutes();
        },
        formatOrderStatus: function (orderStatus, payStatus) {
          if (orderStatus == 1) {
              return '已送达'
          }else if (orderStatus == 2) {
              return '已取消'
          }else if (payStatus == 0) {
              return '等待支付(未支付)'
          }else {
              return '尽快送达(刚支付)'
          }
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
//  Vue.filter('time', function (value) {
//      return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
//  })
</script>

<style lang="less" scoped>
   html, body {
      height: 100%;
      width: 100%;
    }

    .orderbody {
      position: absolute;
      width: 100%;
      height: 90%;
      background-color: #fff;
      margin-bottom: 30px;
      margin-top: 30px;
      .ordercard {
        display: block;
        padding-left: 10px;
        margin-top: 10px;
        border-top:1px solid #f1f1f1;
        bottom: 48px;
        background-color: #fff;
        .ordercard-body {
          display: flex;
          height: 110px;

          .ordercard-avatar {
            flex: none;
            padding-right: 10px;
            margin-top: 10px;
            img {
              width: 55px;
              height: 55px;
            }
          }

          .ordercard-content {
            flex: 1;
            svg {
              width: 4px;
              height: 4px;
            }
            .ordercard-head {
              padding-right: 10px;
              padding-bottom: 3px;
              .title {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                .name {
                  color: #333;
                  font-weight: 500;
                }
              }
              .content {
                padding-right: 10px;
                .name {
                  font-size: 5px;
                  padding-top: 5px;
                }
              }
            }
            .ordercard-detail {
              display: flex;
              justify-content: space-between;
              padding-right: 10px;
              align-items: center;
              padding-top: 5px;
              padding-bottom: 10px;
              .productname {
                font-size: 10px;
                padding-top: 5px;
                color: #333;
                font-weight: 500;
              }
              .price {
                color: #333;
                font-weight: 700;
              }

            }

            .ordercard-delete {
              display: flex;
              justify-content: space-between;
              padding-right: 10px;
              align-items: center;
              padding-top: 5px;
              /* padding-bottom: 30px; */
              margin-bottom: 50px;
              button{
                color: #333;
                font-weight: 300;
                background-color: #fff;
                border: 0.1;
                border-color: whitesmoke;
                margin-bottom: 10px;
              }
            }
        }
      }
      }
    }

</style>
