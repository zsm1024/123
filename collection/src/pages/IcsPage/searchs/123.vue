<template>
	<section  ref="abc" style="margin-bottom:30px" class="msgs" id="chatContainer">	
		<el-collapse v-model="activeNames">	
			<el-collapse-item name="10" title="客户基本信息">				
				<template slot-scope="title" >
                    <el-table :data="items.customerSimpleList" border stripe> 
						<!-- width="60" -->
						<el-table-column :prop="baseinfo.field" :label="baseinfo.title"  v-for="(baseinfo, index) in baseinfo" :key="index"   align="center">
						</el-table-column>			
					</el-table>
                </template>
			</el-collapse-item>
			<el-collapse-item name="2" title="客户电话信息" id="asd">
				
				<el-table :data="items.customerPhones" border stripe >
					
					<el-table-column :prop="cols.field"  :label="cols.title" v-for="(cols, index) in cols" :key="index" align="center"  >
						<template slot-scope="scope">
							
							<span v-show="scope.row.edit" v-if="(cols.field!='effectiveness' && scope.row.infoSource=='CMS')||cols.field=='infoSource'" >{{ scope.row[cols.field] }}</span>
							<span v-show="!scope.row.edit"  :class="{changecolor:scope.row['effectiveness']=='N'}" >{{ scope.row[cols.field] }}</span>							
						</template>
					</el-table-column>
				</el-table>				
			</el-collapse-item>	
			 <!--  @click.native.prevent="deleteRow(scope.$index, tableData4)"-->
			<el-collapse-item name="3" title="客户地址信息">
					
				<el-table :data="items.customerAddresses" border stripe >
					
					<el-table-column :prop="cols1.field" :label="cols1.title"  v-for="(cols1, index) in cols1" :key="index" align="center"  >
						<template slot-scope="scope">
							
							<span v-show="scope.row.edit" v-if="(cols1.field!='effectiveness' && scope.row.infoSource=='CMS')||cols1.field=='infoSource'" >{{ scope.row[cols1.field] }}</span>
							<span v-show="!scope.row.edit" :class="{changecolor:scope.row['effectiveness']=='N'}">{{ scope.row[cols1.field] }}</span>
							
						</template>
					</el-table-column>			
				</el-table>				
			</el-collapse-item>	
            <el-collapse-item name="8" title="备注">			
				<p>
                     <el-button type="primary" size="mini" v-show="items.overdueDays>0" style="margin: 0 0 10px 10px;" v-on:click="remarkopen = true" >编辑</el-button>
                    {{remarkform.remarks}}
                </p>
			</el-collapse-item>					
			<el-collapse-item name="5" title="合同基本信息">
				<el-form :data="items" inline class="table-expand">
					
					<el-form-item label="申请号:" >
						<span>{{items.appNum}}</span>
						<!-- <span>{{items.delyNum}}</span> -->
					</el-form-item>
					<el-form-item label="合同号:">
						<span>{{items.applicationNumber}}</span>
						<!-- <span>{{items.contractNum}}</span> -->
					</el-form-item>
					<el-form-item label="首付比例:" >
						<span>{{items.firstRatio}}</span>
						<!-- <span>{{items.ShoufuRatio}}</span> -->
					</el-form-item>
					<el-form-item label="贷款金额:" >
						<span>{{items.loanAmount}}</span>
						<!-- <span>{{items.loan}}</span> -->
					</el-form-item>
					<el-form-item label="合同起始日:" >
						<span>{{items.startTime}}</span>
						<!-- <span>{{items.startTime}}</span> -->
					</el-form-item>
					<el-form-item label="贷款产品:" >
						<span>{{items.loanProducts}}</span>
						<!-- <span>{{items.RepayTime}}</span> -->
					</el-form-item>
					<el-form-item label="还款日:" >
						<span>{{items.datePayment}}</span>					
					</el-form-item>
					<el-form-item label="贷款期数:" >
						<span>{{items.loanNum}}</span>
						<!-- <span>{{items.endTime}}</span> -->
					</el-form-item>
					<el-form-item label="合同终止日:" >
						<span>{{items.endTime}}</span>
						<!-- <span>{{items.total}}</span> -->
					</el-form-item>
				</el-form>				
			</el-collapse-item>	

			<el-collapse-item name="6" title="逾期基本信息">
				<el-form :data="items" inline class="table-expand">
					<el-form-item label="逾期日期:" >
						<span>{{items.overdueDate}}</span>
					</el-form-item>
					<el-form-item label="本次逾期天数:">
						<span>{{items.overdueDays}}</span>
						<!-- <span>{{items.ThisOverdueDay}}</span> -->
					</el-form-item>
					<el-form-item label="本期逾期天数:">
						<span>{{items.overdueDaysperiod}}</span>
						<!-- <span>{{items.ThisCurrentdDay}}</span> -->
					</el-form-item>
					<el-form-item label="月应还款金额:">
						<span>{{items.monthlyRepayment}}</span>
					</el-form-item>
					<el-form-item label="逾期金额总计:" >
						<span>{{items.sumOverdue}}</span>
					</el-form-item>
					<el-form-item label="到期利息总计:">
						<span>{{items.totalDue}}</span>
					</el-form-item>
					<el-form-item label="逾期还款总额:" >
						<span>{{items.totalPayment}}</span>
					</el-form-item>
					<el-form-item label="逾期利息:" >
						<span>{{items.overdueInterest}}</span>
					</el-form-item>
					<el-form-item label="逾期应收总计:">
						<span>{{items.overdueTotal}}</span>
					</el-form-item>
					<el-form-item label="ET结算金额:">
						<span>{{items.ET}}</span>
					</el-form-item>
				</el-form>				
			</el-collapse-item>	
									
		</el-collapse>
		</div>
		
		<el-dialog title="备注" :visible.sync="remarkopen" :show-close="false">
			<el-form :model="remarkform">
				<el-form-item label="备注内容" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="remarkform.remarks"></el-input>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="confirmremarkopen">确 定</el-button>
			</div>
		</el-dialog>
	


	</section>
</template>

<script>
import { getlistAfpRest } from "@/api/collmanage";

export default {
  data() {
	 
    	return {
			floatForm:{
				 background:"#fff",
				 zIndex:"10"
	 		},
			classObject: {
				active: true,
				'text-danger': false
			},
			activeNames:["1","2","3","4","5","6",'7',"8","9","10"],
			items: [],
			height:"",
			cols:[
				{title:'角色',field:'roleName',width:"60"},
            	{title:'姓名',field:'name',width:"60"}, 
            	{title: '关系', field: 'relationship', width: "50" },         
            	{title:'电话',field:'phone',width:"135"},
            	{title: '电话类型', field: 'phoneType', width: "90" },
            	{title: '电话码', field: 'phoneNum', width: "60" },	
            	{title:'信息来源',field:'infoSource',width:"60"},
            	{title:'有效性',field:'effectiveness',width:"60"},
			],
			dialogStatus: '',
			cols1:[
				{title:'角色',field:'roleName',width:"60"},
            	{title:'姓名',field:'name',width:"60"},
            	{title:'关系', field: 'relationship', width: "50" },      
            	{title:'地址',field:'address',width:"200"},
            	{title: '地址类型', field: 'addressType', width: "70" },
            	{title:'信息来源',field:'infoSource',width:"60"},
            	{title:'有效性',field:'effectiveness',width:"60"},
			],
			baseinfo:[
				{ title: '角色名', field: 'roleName', width: "60" },
				{ title: '姓名', field: 'name', width: "60" },
				{ title: '拼音', field: 'pinyin', width: "80" },
				{ title: '职业', field: 'occupation', width: "80" },
				{ title: '单位名称', field: 'unitName', width: "110" },
				{ title: '性别', field: 'sex', width: "45" },
				{ title: '证件类型', field: 'documentType', width: "90"},
				{ title: '证件号码', field: 'documentNum', width: "145"},
				{ title: '出生日期', field: 'birthDate', width: "80"}
			],
			id:this.$route.params.id,	
			remarkopen: false,
			messageopen: false,
			addUserInfos:false,
			addWorkInfos:false,
			formLabelWidth: '120px',
			//备注弹出层
			remarkform: {
				remarks:'',
			},
    };
  },
  methods: {



		//备注方法
		confirmremarkopen() {
				this.remarkopen=false;
				this.$message({
					type:'success',
					message:'保存成功',
				});

		},


		getlist() {
			let para = {
				contractId: this.id
            };
            
			getlistAfpRest(para).then(res => {
				
                let data = res.data.result;		
                
				this.items = data;								
				
				this.remarkform.remarks = this.items.remarks;
				// this.cols=data.cols;
                // this.cols1=data.cols1; 
				       
			});
   },
    
  },
  mounted() {
    this.getlist();
    
  }
};
</script>

<style scoped>
	h4{background: #eef1f6;padding: 10px;border: 1px solid #dfe6ec;font-weight: bold;}
	table{width: 100%;text-align: center;}
	tr{width: 100%;}
	td{border-right: 1px solid #dfe6ec;border-bottom: 1px solid #dfe6ec;height:23px!important;line-height: 23px!important;background: #f0f0f0;}	
	.useraddress{width: 150px;}
	.el-collapse-item__header{font-size:13px!important;font-weight: bold!important;background:#dfe6ec!important;border: 1px solid #f0f0f0;}
	.abc{height: 500px!important; }
	.el-col .el-icon-edit,.el-col .el-icon-message,.el-col .el-icon-upload2{cursor: pointer; color: #20a0ff;margin-left: 5px;}
	.el-col .el-icon-upload2:hover{color: #4db3ff;}
	.el-col .el-icon-edit:hover{color: #4db3ff;}
	.el-col .el-icon-message:hover{color:#4db3ff}
	.changecolor{color: red;}
	.el-collapse-item__content{padding:5px!important;}
	.el-form-item__label{padding: 5px 0!important}
	.el-form-item__content{line-height: 24px!important}
  	.table-expand label { width:90px!important;text-align:el-pagination__rightwrapper;}
  	.table-expand .el-form-item {margin: 0 0 0 2px!important; width:220px!important;color: #269aff!important;}
  	.el-table .cell{padding: 0!important;white-space:nowrap!important};
	.floatForm{position: fixed;bottom: 0;right:0}
	::-webkit-scrollbar{width:2px;height:12px }
	::-webkit-scrollbar-track{background-color:#fff;border-radius: 8px}
 	::-webkit-scrollbar-thumb{background-color:#bee1eb;border-radius: 8px}
	::-webkit-scrollbar-thumb:active {background-color:#bee1eb} 
	.el-button{padding: 2px!important;font-size: 13px!important}
	.el-table th{height: 0px!important}
	/* .el-form-item span{display: inline-block;width: 130px} */
</style>