<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.all}}<span
          class="count">{{ratings.length}}</span></span>
      <span @click="select(5,$event)" class="block positive" :class="{'active':selectType===5}">{{desc.good}}<span
          class="count">{{goods.length}}</span></span>
      <span @click="select(4,$event)" class="block negative" :class="{'active':selectType===4}">{{desc.positive}}<span
          class="count">{{positives.length}}</span></span>
      <span @click="select(3,$event)" class="block negative" :class="{'active':selectType===3}">{{desc.average}}<span
          class="count">{{averages.length}}</span></span>
      <span @click="select(2,$event)" class="block negative" :class="{'active':selectType===2}">{{desc.negative}}<span
          class="count">{{negatives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.bad}}<span
          class="count">{{bads.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 0;
  const GOOD = 5;
  const POSITIVE= 4;
  const AVERAGE=3;
  const NEGATIVE=2;
  const BAD=1;

  export default {
    props: {
      ratings: {
        type: Object,
        default() {
          return {};
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            good: '非常满意',
            positive: '满意',
            average: '一般',
            negative: '差',
            bad: '很差',
            all: '全部'
          };
        }
      }
    },
    computed: {
      goods() {
        return this.ratings.filter((rating) => {
          return rating.scoreStartNum === GOOD;
        });
      },
      positives() {
        return this.ratings.filter((rating) => {
          return rating.scoreStartNum === POSITIVE;
        });
      },
      averages() {
        return this.ratings.filter((rating) => {
          return rating.scoreStartNum === AVERAGE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.scoreStartNum === NEGATIVE;
        });
      },
      bads() {
        return this.ratings.filter((rating) => {
          return rating.scoreStartNum === BAD;
        });
      },
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>
