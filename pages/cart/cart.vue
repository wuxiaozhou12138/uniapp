<template>
	<view>
		
		<view class="address">
			<view class="top">
				<text>{{address.name}}</text>	
				<text>{{address.phone}}</text>	
			</view>
			<view class="bottom">
				{{address.address}}
			</view>
		</view>
		
		<view class="title">
			购物车
		</view>
		
		
		<view class="cart-list" v-if="cartList.length">
			<view class="cart-item" v-for="(item,index) in cartList" :key="index">
				<view class="item-left">
					<checkbox-group @change="goodsCheckedChange(item)">
						<label class="select">
							<checkbox :checked="item.checked"/>
						</label>
					</checkbox-group>
					
					<view class="image-wrapper">
						<image :src="item.goods_small_logo" mode="heightFix"></image>
					</view>	
				</view>	
				
				<view class="item-right">
					<view class="goods-name">{{item.goods_name}}</view>
					<view class="operation">
						<text>￥{{item.goods_price}}</text>
						<view class="count">
							<view class="num-edit" @click="reduceNum(item,index)">-</view>
							{{item.num}}
							<view class="num-edit" @click="addNum(item,index)">+</view>
						</view>	
					</view>	
				</view>
				
			</view>	
		</view>	
		
		<view class="empty" v-else>
			~暂无商品~
		</view>	
		
		<view class="compute">
			<view class="left">
				<checkbox-group @change="selectAllChange">
					<label>
						<checkbox :checked="selectAll"/><text>全选</text>
					</label>
				</checkbox-group>
				<text>合计：{{totalPrice}}</text>	
			</view>	
			<view class="right" @click="compute">
				结算（{{totalCount}}）
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:{
					name:'吴小舟',
					phone:'15888888888',
					address:'广东省广州市珠海区新港中路168号'
				},
				selectAll:false,						//是否全选
				totalPrice:0,								//总价
				totalCount:0,								//商品总数
				cartList:[],								//购物车列表
			}
		},
		watch:{
			selectAll(val){
				if(val){
					this.cartList.forEach(item => {
						item.checked = true;
						this.totalCount += item.num;
						this.totalPrice += item.num * item.goods_price
					})
				}else{
					this.totalCount = 0;
					this.totalPrice =0;
				}
			},
			cartList:{
				handler(){
					this.totalCount = 0;
					this.totalPrice = 0
					this.cartList.forEach(item => {
						if(item.checked){
							this.totalCount += item.num;
							this.totalPrice += item.num * item.goods_price
						}
					})
					uni.setStorageSync('cart',this.cartList)
				},
				deep:true
			}
		},
		onLoad(){
			this.getCartList();
		},
		methods: {
			getCartList(){
				this.cartList = uni.getStorageSync("cart");
			},
			// 结算
			compute(){
				
			},
			// 全选按钮状态点击
			selectAllChange(e){
				this.selectAll = !this.selectAll;
				if(!this.selectAll){
					this.cartList.forEach(item => item.checked = false)
				}
			},
			// 商品--
			async reduceNum(item,index){
				if(item.num === 1){
					const res =	await this.$uniAsync.showModal({title: '提示',content:'确定要删除该商品吗?'})
					if(res.confirm){
						this.cartList.splice(index,1);
						return
					}else if(res.cancel){
						uni.showToast({
							title: '已取消',
							duration: 500
						});
						return
					}
				}
				item.num --;
			},
			// 商品++
			addNum(item,index){
				item.num ++;
			},
			// 商品选中状态切换
			goodsCheckedChange(item){
				item.checked = !item.checked
				let status = this.cartList.every(item => item.checked);
				if(status){
					this.selectAll = true
				}
				else{
					this.selectAll = false
				}
			}
		}
	}
</script > 

<style scoped lang="scss">
	.address{
		padding: 20rpx;
		.top{
			display: flex;
			justify-content: space-between;
			margin-bottom: 5rpx;
		}
	}
	.title{
		padding: 20rpx;
		color: #eb4450;
		font-size: 40rpx;
		border-top: 3rpx solid #eb4450;
		border-bottom: 3rpx solid #eb4450;
	}
	
	.compute{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 100rpx;
		padding-left: 20rpx;
		border-top: 3rpx solid #ccc;
		display: flex;
		align-items: center;
		height: 80rpx;
		.left{
			height: 100%;
			flex: 4;
			display: flex;
			justify-content: space-between;
			padding-right: 10rpx;
			align-items: center;
		}
		.right{
			flex: 2;
			background-color: #eb4450;
			color: #fff;
			font-size: 40rpx;
			font-weight: 800;
			text-align: center;
			line-height: 80rpx;
			height: 100%;
		}
	}
	
	.cart-item{
		display: flex;
		width: 100%;
		height: 200rpx;
		border-bottom: 3rpx solid #ccc;
		padding: 20rpx 0;
		.item-left{
			flex: 3;
			display: flex;
			padding-left: 20rpx;
			.select{
				flex: 1;
				line-height: 200rpx;
			}
			.image-wrapper{
				flex: 3;
				image{
					height: 100%;
				}
			}
		}
		.item-right{
			flex: 5;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			// align-items: flex-end;
			padding:0 20rpx;
			.operation{
				display: flex;
				justify-content: space-between;
				width: 100%;
				text{
					color: #eb4450;
				}
			}
			.goods-name{
				overflow:hidden;
				text-overflow:ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.count{
				display: flex;
				gap: 10rpx;
				align-items: center;
				.num-edit{
					width: 55rpx;
					height: 55rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1rpx solid #ccc;
				}
			}
		}
	}
	
	.empty{
		font-size: 80rpx;
		color: #ccc;
		text-align: center;
		margin-top: 500rpx;
	}
</style>
