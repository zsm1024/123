<template>
	<section>
        <el-row>
           <div class="bottom10">
                <el-button size="mini" @click="addUserBtn" type="primary">添加</el-button>
           </div>
          
        </el-row>

		<!--列表-->
		<el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading"  style="width: 100%;" stripe>
			 <el-table-column label="密码重置"  align="center" width="80">
                <template  slot-scope="scope">
                    <el-button size="mini" @click="refreshSubmit(scope.row.id)" type="info">重置</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作"  align="center" >
                <template  slot-scope="scope">
                    <el-button size="mini" @click="editUserBtn(scope.row.id)" type="info">编辑</el-button>
                    <el-button size="mini" @click="delUserBtn(scope.row.id,scope.row)" type="danger">删除</el-button>
                </template>
            </el-table-column>
			<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" >
			</el-table-column>
     
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
			</el-pagination>
		</el-col>
<!-- :before-close="handleClose" -->
	<el-dialog  :title="title" :visible.sync="dialogFormVisible" id="userAdd" :show-close="false">	
        <el-form  :model="addUser" ref="addUser" :rules="addUser">
            <el-form-item label="登录名：" prop="username" :label-width="formLabelWidth" >
                <el-input v-model="addUser.username" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="用户名：" prop="nickname" :label-width="formLabelWidth">
                <el-input v-model="addUser.nickname" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item v-if="submit!='false'" label="密码：" prop="password" :label-width="formLabelWidth" >
                <el-input v-model="addUser.password" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="phone" :label-width="formLabelWidth">
                <el-input v-model="addUser.phone" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item  label="角色：" :label-width="formLabelWidth">
                <el-select v-model="addUser.roleIds" placeholder="请选择" style="width:300px">
                    <el-option 
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"    
                    >
                    </el-option>
                </el-select>
            </el-form-item>
          
            <el-form-item v-if="submit!='false'"  label="岗位：" :label-width="formLabelWidth">
               <el-select v-model="addUser.positionId" placeholder="请选择"  size="mini" style="width:300px" multiple   >
                    <el-option 
                        v-for="item in treedata"
                        :key="item.id"
                        :label="item.position"
                        :value="item.id"    
                    >
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item v-else label="岗位：" :label-width="formLabelWidth">
               <el-select v-model="addUser.positionIdEdi" placeholder="请选择"  size="mini" style="width:300px" multiple   >
                    <el-option 
                        v-for="item in editList"
                        :key="item.id"
                        :label="item.position"
                        :value="item.id"    
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收款模式：" prop="widthdrawMoneyModel" :label-width="formLabelWidth">
                <el-input v-model="addUser.widthdrawMoneyModel" style="width:300px"></el-input>
            </el-form-item>	
            <el-form-item label="收车模式：" prop="widthdrawCarModel" :label-width="formLabelWidth">
                <el-input v-model="addUser.widthdrawCarModel" style="width:300px"></el-input>
            </el-form-item>	
            <el-form-item> 
                <el-row :span="4" style="margin-left:200px">
                    <el-button @click="cancelBtn('addUser')">取消</el-button>
                    <el-button type="primary" @click="addBtn('addUser')">确 定</el-button>
                </el-row>   	
            
            </el-form-item>
            
		</el-form>
    </el-dialog>
	</section>
</template>

<script>
//import NProgress from 'nprogress'
import {
  getUsers,
  getRoles,
  getAuthtree,
  toAddUser,
  findUser,
  toEditUser,
  deleteUser,
  sysPositionslistAll,
  refreshSub
} from "@/api/auth";

export default {
  data() {
    return {
      heights: 0,
      lists: [],
      editList:[],
      cols: [
        { title: "登录名", field: "username" },
        { title: "用户名", field: "nickname" },
        { title: "角色", field: "roleName" },
        { title: "电话", field: "phone" },
        { title: "岗位", field: "position" },
        { title: "收款模式", field: "widthdrawMoneyModel" },
        { title: "控车模式", field: "widthdrawCarModel" },
      ],
      total: 0,
      page: 1,
      toEdit: false,
      id: "",
      pagesize: 10,
      submit:'false',
      dialogFormVisible: false,
      listLoading: false,
      title: "添加用户",
      formLabelWidth: "120px",
      options: [],
      treedata: [],
      addUser: {
        username: "",
        nickname: "",
        password: "",
        phone: "",
        roleIds: [],
        positionId: [],
        positionIdEdi:[],
        widthdrawMoneyModel:"",
        widthdrawCarModel:""


      }
    };
  },

  methods: {
    handleClose(done) {
      this.$refs["addUser"].resetFields();
      done();
    },
    getRolesMethod() {
      getRoles().then(res => {
        this.options = res.data.result;
      });
    },
    getTree() {
      sysPositionslistAll().then(res => {
        this.treedata = res.data.result;
        this.editList= res.data.result
      });
    },

    addBtn(addUser) {
      var roleids = this.addUser.roleIds;
      var arrrole = [];     
       this.getTree()
      arrrole.push(roleids);
      if (this.toEdit) {      
       for(var a=0;a<this.addUser.positionIdEdi.length;a++){
             for(var b=0;b<this.editList.length;b++){
                if(this.addUser.positionIdEdi[a]==this.editList[b].position){
                       this.addUser.positionIdEdi[a]= this.editList[b].id
                }
            }        
       } 
        let para = {
            username: this.addUser.username,
            nickname: this.addUser.nickname,
            password: this.addUser.password,
            phone: this.addUser.phone,
            roleIds: arrrole,
            positionIds: this.addUser.positionIdEdi,
            id: this.id,
            widthdrawMoneyModel:this.addUser.widthdrawMoneyModel,
            widthdrawCarModel:this.addUser.widthdrawCarModel,

        };
        toEditUser(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.dialogFormVisible = false;
            this.$refs["addUser"].resetFields();
            this.getlists();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败，请联系管理员"
            });
          }
        });
      } else {
           let para = {
                username: this.addUser.username,
                nickname: this.addUser.nickname,
                password: this.addUser.password,
                phone: this.addUser.phone,
                roleIds: arrrole,
                positionIds: this.addUser.positionId,
                id: this.id,
                widthdrawMoneyModel:this.addUser.widthdrawMoneyModel,
                widthdrawCarModel:this.addUser.widthdrawCarModel,
            };
        toAddUser(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "添加成功！"
            });
            this.dialogFormVisible = false;
            this.$refs["addUser"].resetFields();
            this.getlists();
          } else {
            this.$message({
              type: "error",
              message: "添加失败，请联系管理员"
            });
          }
        });
       }
    },
    cancelBtn() {
      this.dialogFormVisible = false;
      this.$refs["addUser"].resetFields();
    },
    addUserBtn() {
      this.title = "添加用户";
      this.dialogFormVisible = true;
      this.getRolesMethod();
      this.getTree();
      this.toEdit = false;
      this.submit = 'true'
      this.id = "";
      this.addUser.roleIds="";
      this.addUser.positionId="";
      this.addUser.widthdrawMoneyModel="";
      this.addUser.widthdrawCarModel="";
    },
    editUserBtn(id) {
      this.title = "编辑用户";
      this.toEdit = true;
      this.id = id;
      this.addUser.positionIdEdi=[];
      this.dialogFormVisible = true;
      this.submit = 'false'
      this.getRolesMethod();
      this.getTree();
      let para = {
        id: id
      };
       this.getlists()
       this.addUser.positionIdEdi=this.editList
      findUser(para).then(res => {
        let aa = [];
        aa.push(res.data.result.positionId);
        this.addUser.username = res.data.result.username;
        this.addUser.nickname = res.data.result.nickname;
        this.addUser.phone = res.data.result.phone;
        this.addUser.positionIds = aa;
        this.addUser.positionIdEdi=res.data.result.positionIds
        this.addUser.roleIds = res.data.result.roleIds[0];
        this.addUser.widthdrawMoneyModel=res.data.result.widthdrawMoneyModel
        this.addUser.widthdrawCarModel=res.data.result.widthdrawCarModel
      });
    },
    refreshSubmit(id) {
      let para = {
        id: id
      };
      refreshSub(para).then(res =>{
        if(res.data.success){
          this.$message({
              type: "success",
              message: "重置成功！"
            });
        }
      })
    },
    delUserBtn(id, data) {
      this.$confirm("确定删除" + data.username + "用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let para = {
            id: id
          };
          deleteUser(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getPermissionsMethod();
            } else {
              this.$message({
                type: "error",
                message: "删除失败，请联系管理员！"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
    },
    //获取列表
    getlists() {
      let h =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 260;
      this.heights = h;
      let para = {
        page: this.page,
        pageSize: this.pagesize
      };
      this.listLoading = true;
      //NProgress.start();
      getUsers(para).then(res => {
        this.total = res.data.result.recordsTotal;
        this.lists = res.data.result.data;
        this.cols = this.cols;
        this.listLoading = false;
        //NProgress.done();
      });
    }
  },
  mounted() {
    this.getlists();
  }
};
</script>