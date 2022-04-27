<template>
	<view class="wrapper">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="item in goodsDetail.pics" :key="item.pics_id">
				<image :src="item.pics_mid" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="price">
			￥{{goodsDetail.goods_price}}
		</view>	
		
		<view class="name">
			<view class="name-left">
				{{goodsDetail.goods_name}}
			</view>
			<view class="name-right">
				<text class="iconfont icon-shoucang"></text>
				<view>收藏</view>
			</view>
		</view>
		
		<view class="goods_info">
		  <view class="goods_info_title">图文详情</view>
		  <view class="goods_info_content">
		    <!-- <rich-text :nodes="goodsDetail.goods_introduce"></rich-text> -->
				<view v-html="goodsDetail.goods_introduce"></view>
		  </view>
		</view>
		
		
		<view class="tool">
			<view class="tool_item">
				<view class="iconfont icon-kefu"></view>
				<view>客服</view>
				<button open-type="contact"></button>
			</view>
			<view class="tool_item">
				<view class="iconfont icon-yixianshi-"></view>
				<view>分享</view>
				<button open-type="share"></button>
			</view>
			<navigator open-type="switchTab" url="/pages/cart/index" class="tool_item">
				<view class="iconfont icon-gouwuche"></view>
				<view>购物车</view>
			</navigator>
			<view class="tool_item btn_cart " @click="handleCartAdd">
			加入购物车
			</view>
			<view class="tool_item btn_buy">
				立即购买
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId:null,
				goodsDetail:{}
			}
		},
		onLoad(option){
			this.goodsId = option.id;
			this.getGoodsDetail()
		},
		methods: {
			// 获取商详
			getGoodsDetail(){
				this.$request({
					url:`/goods/detail?goods_id=${this.goodsId}`
				}).then(res => {
					this.goodsDetail = res.data.message;
				})
			},
			// 点击加入购物车
			handleCartAdd(){
				let cart = uni.getStorageSync("cart") || [];
				let index = cart.findIndex(item => item.goods_id == this.goodsDetail.goods_id);
				if(index == -1){
					cart.push({
						num:1,
						checked:false,
						...this.goodsDetail
					})
				}else{
					cart[index].num ++
				}
				
				uni.setStorageSync("cart",cart);
				uni.showToast({
					title:"添加成功",
					mask:true
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	swiper{
		width: 100%;
		height: 65vw;
		text-align: center;
		swiper-item{
			image{
				width: 60%;
			}
		}
	}
	.price{
		color:#eb4450;
		font-size: 30rpx;
		padding: 20rpx;
		font-weight: 700;
	}
	
	.name{
		display: flex;
		border-top: 5rpx solid #ccc;
		border-bottom: 5rpx solid #ccc;
		padding: 10rpx;
	}
	.name-left{
		flex: 4;
		overflow:hidden;
		text-overflow:ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.name-right{
		flex: 1;
		border-left: 2rpx solid #000;
		text-align: center;
	}
	
	.tool{
	  border-top: 1rpx solid #ccc;
	  position: fixed;
	  left: 0;
	  bottom: 0;
	  width: 100%;
	  height: 90rpx;
	  background-color: #fff;
	  display: flex;
	  .tool_item{
	    flex: 1;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    font-size: 24rpx;
	    position: relative;
	    button{
	      position: absolute;
	      top: 0;
	      left: 0;
	      width: 100%;
	      height: 100%;
	      opacity: 0;
	    }
	  }
	  .btn_cart{
	    flex: 2;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    background-color: #ffa500;
	    color: #fff;
	    font-size: 30rpx;
	    font-weight: 600;
	  }
	  .btn_buy{
	    flex: 2;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    background-color: #eb4450;
	    color: #fff;
	    font-size: 30rpx;
	    font-weight: 600;
	  }
	}
	
	
	.goods_info{
	  .goods_info_title{
	    font-size: 32rpx;
	    color: #eb4450;
	    font-weight: 600;
	    padding: 20rpx;
	  }
	}
</style>
