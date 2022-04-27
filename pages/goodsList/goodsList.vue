<template>
	<view class="wrapper">
		<searchInput></searchInput>
		<tabs :list="tabList"></tabs>
		<view class="goods" v-for="item in goodsList" :key="item.goods_id" @click="toGoodsDetal(item.goods_id)">
			<image class="left" :src="item.goods_small_logo" mode="widthFix" v-if="item.goods_small_logo"></image>
			<image class="left" src="/static/defaultImage.jpg" mode="widthFix" v-else></image>
			<view class="right">
				<view class="right-title">{{item.goods_name}}</view>
				<view class="price">￥{{item.goods_price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import searchInput from "../../components/searchInput.vue";
	import tabs from "../../components/tabs.vue";
	export default {
		components:{searchInput,tabs},
		data() {
			return {
				searchObj:{size:10,page:1},
				goodsList:[],
				cateId:null,
				tabList:[{
					id: 0,
					value: "综合",
				},
				{
					id: 1,
					value: "销量",
				},
				{
					id: 2,
					value: "价格",
				}]
			}
		},
		onLoad(option){
			this.cateId = option.id;
			this.getGoodsList()
		},
		onReachBottom(){
			this.searchObj.page ++;
			this.getGoodsList()
		},
		methods: {
			getGoodsList(){
				this.$request({
					url:`/goods/search?cid=${this.cateId}&pagenum=${this.searchObj.page}&pagesize=${this.searchObj.size}`
				}).then(res => {
					this.goodsList = [...this.goodsList,...res.data.message.goods];
				})
			},
			toGoodsDetal(id){
				uni.navigateTo({
					url:`/pages/goodsDetail/goodsDetail?id=${id}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.goods{
		display: flex;
		border-bottom: 1rpx solid #999;
		gap: 50rpx;
	}
	.left{
		flex: 3;
	}
	
	.right{
		flex: 5;
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding-right: 5rpx;
		.right-title{
			overflow:hidden;
			text-overflow:ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.price{
			color: #eb4450;
		}
	}
</style>
