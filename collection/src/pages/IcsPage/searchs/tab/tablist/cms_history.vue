<template>
	<section ref="abc" style="overflow-y: auto;" id="cslist">
		<el-collapse v-model="activeNames" >
			<el-collapse-item title="催收历史明细表" name="1">
				<!--列表-->
				<el-table :data="lists" max-height="170" border  v-loading="listLoading" style="width: 100%;" stripe :default-expand-all="true">											<el-table-column type="expand" >						
						<template slot-scope="props">
							<el-form  inline class="demo-table-expand" style="text-align:left;min-height:20px;line-height:20px">
         						<el-form-item  style="min-height:20px;line-height20px">
           							备注: {{ props.row.afpRecord }}
          						</el-form-item>							
							</el-form>
						</template>
					</el-table-column>		
					<el-table-column 
                        :prop="col.field" 
                        :label="col.title" 
                        v-for="(col, index) in cols" 
                        :key="index"                      
                        align="center"
						:width="col.width"
                        >
					</el-table-column>
				</el-table>

				<!--工具条-->
				<el-col :span="24" class="toolbar">					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[5,10, 20, 50, 100]"   :total="total"   style="float:right;">
					</el-pagination>
				</el-col>
			</el-collapse-item>
			<el-collapse-item title="特殊备注" name="4">
				<span>{{spMarks}}</span>
			</el-collapse-item>
			 <el-collapse-item title="费用减免明细表" name="2">
				<el-table :data="liststwo"  max-height="150" border highlight-current-row v-loading="listLoadingtwo" style="width: 100%;" stripe>									
					<el-table-column 
                        :prop="col.field" 
                        :label="col.title" 
                        v-for="(col, index) in colstwo" 
                        :key="index" 
                        align="center"
                    >
					</el-table-column>
				</el-table>
				<el-col :span="24" class="toolbar">					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChangetwo" @size-change="handleSizeChangetwo" :page-size="pagesizetwo" :page-sizes="[5,10, 20, 50, 100]"   :total="totaltwo"   style="float:right;">
					</el-pagination>
				</el-col>

			</el-collapse-item>
			 <el-collapse-item title="罚息减免明细表" name="3">
				<el-table :data="liststhr"  max-height="145" border highlight-current-row v-loading="listLoadingthr" style="width: 100%;" stripe>									
					<el-table-column 
                        :prop=" col.field" 
                        :label=" col.title" 
                        v-for="(col, index) in colsthr" 
                        :key="index" 
                        align="center"
                    >
					</el-table-column>
				</el-table>
				<el-col :span="24" class="toolbar">
					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChangethr" @size-change="handleSizeChangethr" :page-size="pagesizethr" :page-sizes="[5,10, 20, 50, 100]"   :total="totalthr"   style="float:right;">
					</el-pagination>
				</el-col>

			</el-collapse-item>
		</el-collapse>
	</section>
</template>

<script>

//  import { getcmsdetails,getcmshistory,getcmsthr } from "@/api/tablist";
import { listByContractId,cusDelInfos,penaltyReductions } from "@/api/collmanage";
export default {
		data() {
			return {
				activeNames: ['1','2','3','4'],
				lists: [],
				cols: [
                    {title:'处理日期',field:'processingDate',width:"70"},
                    {title:'催收结果',field:'collectionResults',width:"100"},
                    {title:'承诺日期',field:'commitmentDate',width:"70"},
                    {title:'复催日期',field:'recoveryDate',width:"70"},
                    {title:'处理人',field:'handlePerson',width:"70"},
                    {title:'承诺金额',field:'amountCommitment',width:"70"},
                    {title:'实地状态',field:'fieldStatus',width:"70"},
                    {title:'实地日期',field:'fieldDate',width:"70"},
                    {title:'特殊案件标识',field:'specialIdentification',width:"70"},
                    {title:'代购标识',field:'purchasingLabel',width:"70"},
                    {title:'代购人姓名',field:'nameAgent',width:"70"},
                    {title:'代购人身份证',field:'purchasingId',width:"90"},
                    // {title:'催收备注',field:'afpRecord',width:"220"},
                    //  {title:'特殊备注',field:'spRecord',width:"70"},
                
                ],
				total: 0,
				pagesize:50,
				page: 1,
				id:this.$route.params.id,
				listLoading: false,
				liststwo: [],
				colstwo: [
                    {title:'费用描述',field:'costDescription',width:"70"},
                    {title:'费用总计',field:'totalCost',width:"70"},
                    {title:'豁免%',field:'exemption',width:"70"},
                    {title:'豁免额',field:'exemptionAmount',width:"70"},
                    {title:'核销额',field:'writeAmount',width:"70"},
                    {title:'到期金额',field:'dueAmount',width:"70"},
                    {title:'豁免日期',field:'exemptionDate',width:"70"},
                    {title:'豁免人',field:'exemptionUser',width:"70"},
                ],
				totaltwo: 0,
				pagetwo:1,
				pagesizetwo: 20,
				listLoadingtwo: false,
				liststhr: [],
				colsthr:[
					{title:'租期号',field:'rentalId',width:"70"},
                    {title:'费用总计',field:'overdueAmt',width:"70"},
                    {title:'豁免%',field:'chargeWaivePct',width:"70"},
                    {title:'豁免额',field:'chargeWaiveAmt',width:"70"},
                    {title:'核销额',field:'settleAmt',width:"70"},
                    {title:'净逾期额',field:'netOverdueAmt',width:"70"},
                    {title:'豁免日期',field:'waiveDte',width:"70"},
                    {title:'豁免人',field:'waivedBy',width:"70"},
				],
				totalthr: 0,
				pagethr:1,
				pagesizethr: 20,
				listLoadingthr: false,
				spMarks:'',
			}
		},
		methods: {
			handleSizeChange(val) {
				this.pagesize = val;
				this.getlists();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlists();
			},

			handleSizeChangetwo(val) {
				this.pagesizetwo = val;
				this.getliststwo();
			},
			handleCurrentChangetwo(val) {
				this.pagetwo = val;
				this.getliststwo();
			},
			
			handleSizeChangethr(val) {
				this.pagesizethr = val;
				this.getliststhr();
			},
			handleCurrentChangethr(val) {
				this.pagethr = val;
				this.getliststhr();
			},
			getlists() {
				let para = {
					contractId: this.id,
					page: this.page,
					pageSize: this.pagesize,
				
				};
				this.listLoadingtwo = true;
				
				//NProgress.start();
				listByContractId(para).then((res) => {
					// console.log(parseInt(res.data.length))					
						let data=res.data.result
						this.total=data.recordsTotal;
						if(this.total==0){	
							this.listLoadingtwo = false;						
							return false;
						}else{
							this.lists= data.data;
							this.spMarks=this.lists[0].spRecord;	
						}
						
						// this.lists.forEach(element => {
						// 	console.log(element[0])
						// });
						this.listLoading = false;											
					//NProgress.done();
				});
			},

			getliststwo() {
				let para = {
					contractId: this.id,
					page: this.pagetwo,
					pageSize: this.pagesizetwo,					
				};
				this.listLoadingtwo = true;
				//NProgress.start();
				cusDelInfos(para).then((res) => {
					let data=res.data.result;
					this.totaltwo = data.recordsTotal;
					if(this.totaltwo==0){
						this.listLoadingtwo = false;
						return false;

					}else{
						this.liststwo = data.data;
					}
					
					this.listLoadingtwo = false;
					//NProgress.done();
				});
			},
			getliststhr() {
				let para = {
					contractId: this.id,
					page: this.pagethr,
					pageSize: this.pagesizethr,					
				};
				this.listLoadingthr = true;
				//NProgress.start();
				penaltyReductions(para).then((res) => {
					 let data=res.data.result;
					 this.totalthr = data.recordsTotal;
					 if(data.recordsTotal==0){
						 this.listLoadingthr = false;
						 return false;
					 }else{
						this.liststhr = data.data; 
						this.listLoadingthr = false;
					 }
					 
					 
					//NProgress.done();
				});
			},

		},
		mounted() {
			this.getlists();
			this.getliststwo();
			this.getliststhr();
			 let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
   			this.$refs.abc.style.height= h+"px"
		}


}
</script>

<style>
.el-table__expand-icon{height:24px!important}
</style>