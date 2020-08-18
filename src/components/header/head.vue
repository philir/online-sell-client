<template>
    <header id='head_top'>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <section v-if='management' class="head_manage">
            <a class="btn btn-danger" @click="operateManage" style="color: #fff;">
              <i class="fa fa-trash-o fa-lg"></i> 管理
            </a>
        </section>
        <section v-if='save' class="head_manage">
            <a class="btn btn-danger" @click="operateSave" style="color: #fff;">
              <i class="fa fa-trash-o fa-lg"></i> 保存
            </a>
        </section>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
    </header>
</template>

<script>
    export default {
    	data(){
            return{
            }
        },
        mounted(){

        },
        props: ['management', 'headTitle', 'goBack','save'],
        methods: {
          operateManage(){
            this.$emit("manage",true)
          },
          operateSave(){
            this.$emit("save",false)
          }
        }

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #head_top{
        background-color: $blue;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem);
    }
    .head_goback{
        left: 0.4rem;
        @include wh(0.6rem, 1rem);
        line-height: 2.2rem;
        margin-left: .4rem;
    }
    .head_manage{
        right: 0.55rem;
        @include sc(0.8rem, $blue);
        @include ct;
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        .title_text{
            @include sc(1.2rem, #fff);
            text-align: center;
            font-weight: bold;
        }
    }
</style>
