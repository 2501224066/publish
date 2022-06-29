<template>
	<div style="flex: 1">
		<span @click="show = true">
			<slot></slot>
		</span>

		<div class="preview" v-show="show" @click="show = false">
			<div class="content" v-html="content"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			content: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				show: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.preview {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.6);
	}

	.content {
		width: 90%;
		margin: auto;
		padding: 20px;
		border-radius: 16px;
		box-sizing: border-box;
		background: #fff;
	}
</style>
