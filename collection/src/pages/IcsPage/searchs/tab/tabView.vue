<template>
<section>
	<div id="tabCon">
		<router-link class="routerTab" v-for="(tab,$index) in lists" :key="$index" :to="{path:tab.path +'/'+id}" tag="span" activeClass='active'>{{tab.name}}</router-link>
	</div>
	<div>
		<router-view></router-view>
	</div>
</section>

  <!-- <div class="tab-container abc"> -->
    <!-- <el-tabs  type="border-card">
    	<el-tab-pane label="催收信息">
				<div ref="cs" style="overflow-y:auto">
					<cs-message style="height:100%" ></cs-message>
				</div>
				<div ref="for" style="overflow-y:auto" id="abd">
					<form-message ></form-message>
				</div>				
				</el-tab-pane>
    	<el-tab-pane label="合同信息"><ht-message></ht-message></el-tab-pane>
    	  <el-tab-pane label="催收历史"><cs-history></cs-history></el-tab-pane> 
    	 <el-tab-pane label="维保记录"><maintenance></maintenance></el-tab-pane>
    	 <el-tab-pane label="还款计划"><hk-plan></hk-plan></el-tab-pane>
    	<el-tab-pane label="扣款流水"><kk-list></kk-list></el-tab-pane>
    	<el-tab-pane label="cms历史"><cms-history></cms-history></el-tab-pane>  
    </el-tabs> -->
  <!-- </div> -->
</template>
<script>
export default {
  data(){		
     return{
			  	 id:this.$route.params.id, 
					 lists:[
						 {'name':"催收信息",path:'/IcsPage/tab/tabView/cs_message'},
						 {'name':"合同信息",path:'/IcsPage/tab/tabView/ht_message'},
						 {'name':"催收历史",path:'/IcsPage/tab/tabView/cs_history'},
						 {'name':"车辆信息",path:'/IcsPage/tab/tabView/showlist'},
						 {'name':"还款计划",path:'/IcsPage/tab/tabView/hk_plan'},
						 {'name':"扣款流水",path:'/IcsPage/tab/tabView/kk_list'},
						 {'name':"CMS历史",path:'/IcsPage/tab/tabView/cms_history'},
						 {'name':"控制车辆信息",path:'/IcsPage/tab/tabView/controlCar'},
						 {'name':"法诉信息",path:'/IcsPage/tab/tabView/legal'},
					 ],
         
        }
	},
		mounted(){
		// let h=(window.innerHeight);
		// this.$refs.cs.style.height= (h-290)+"px";
 },
  components:{
  	// csMessage,
  	// htMessage,
  	//  csHistory,
  	// maintenance,
  	//  hkPlan,
  	// kkList,
	// cmsHistory,
	// formMessage
	}
}

</script>
<style >
#tabCon{height:30px;line-height: 30px;width:100%;border-bottom: 1px solid #f0f0f0 } 
.routerTab{padding: 5px 3px;cursor: pointer;margin: 0 3px}
.routerTab:hover{cursor: pointer;color:#20a0ff   }
</style>