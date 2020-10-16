<template>
	<div>
		<cmtbox :id="$route.params.id"></cmtbox>
	</div>
</template>

<script>
	import cmtbox from "../subcompnent/comment.vue"
	
	export default{
		components:{
			cmtbox
		}
	}
</script>

<style>
</style>
