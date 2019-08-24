<template>
  <div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1 v-if="type==1">建议</h1>
      <h1 v-if="type==2">投诉</h1>
      <a
        @click="FeedbackSubmit()"
        style="position:absolute; right:5px; top:0; color:#fff; font-size:15px; line-height:40px;"
      >提交</a>
    </header>
    <aside>
      <span>请选择你想反馈的部门</span>
      <ul>
        <li @click="targetDept=1">
          <input type="radio" id="service" name="feedback" :checked="targetDept==1">
          <span>客服部门</span>
        </li>
        <li @click="targetDept=2">
          <input type="radio" id="withdraw" name="feedback" :checked="targetDept==2">
          <span>出款部门</span>
        </li>
        <li @click="targetDept=3">
          <input type="radio" id="pay" name="feedback" :checked="targetDept==3">
          <span>入款部门</span>
        </li>
      </ul>
      <span>请输入你想反馈的问题</span>
      <div class="text">
        <textarea placeholder="请输入不少于10字的反馈" rows="5" v-model="text"></textarea>
        <div class="avatar">
          <img :src="imgUrl" v-if="img==true">
          <div class="add" v-if="img==false">
            <input type="file" class accept="image/*" @change="upload()" ref="imgSource">
          </div>
          <div class="del" v-if="img==true" @click="deleteimg()"></div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: false,
      targetDept: null,
      imgUrl: this.$getCookie("headphoto"),
      text: "",
      type: this.$route.params.id
    };
  },
  created() {},
  methods: {
    deleteimg() {
      this.img = false;
      this.imgUrl = "";
    },
    //上传图片
    upload() {
      let imgFile = this.$refs.imgSource.files[0];
      let formData = new FormData();
      formData.append("file", imgFile);
      this.$loading.show("上传中");
      this.$http.post("/feedback/image", formData).then(
        res => {
          this.imgUrl = res;
          this.img = true;
          this.$loading.hide();
        },
        err => {
          this.$loading.hide();
        }
      );
    },
    //提交建议
    FeedbackSubmit() {
      const con = {
        content: this.text,
        type: this.type,
        targetDept: this.targetDept,
        image: this.imgUrl
      };
      if(this.text.length <= 10){
        alert('请输入不少于10字的反馈')
        return
      }
      this.$loading.show("反馈中");
      this.$http.post("feedback/submit", con).then(
        res => {
          this.text = "";
          this.targetDept = null;
          this.img=false
          this.$loading.hide();
          alert("反馈成功，结果将通过站内信告知！")
        },
        err => {
          this.$loading.hide();
          console.log(err);
        }
      );
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
aside {
  padding-top: 40px;
  span {
    line-height: 3.2rem;
    color: rgb(159, 159, 159);
    padding: 0 15px;
  }
  ul {
    background-color: #fff;
    li {
      padding: 0 15px;
      display: flex;
      align-items: center;
      color: rgb(93, 93, 93);
      font-size: 14px;
      height: 4rem;
      input {
        width: 1.4rem;
        height: 1.4rem;
        border: solid 1px rgb(146, 146, 146);
        -webkit-border-radius: 0.6rem;
        border-radius: 50%;
        margin: 0;
        padding: 0;
        position: relative;
        -webkit-appearance: none; // 隐藏原生控件
        display: flex;
        justify-content: center;
        align-items: center;
      }
      input:checked {
        content: "";
        border: solid 1px rgb(254, 59, 70);
        text-align: center;
        background-clip: padding-box;
      }
      input:checked:before {
        content: "";
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        background-color: rgb(254, 59, 70);
        position: absolute;
      }
    }
  }
  li + li {
    border-top: 1px solid #eee;
  }
  .text {
    background-color: #fff;
    padding: 0 15px 15px;
    textarea {
      line-height: 2rem;
      font-size: 15px;
      padding-bottom: 10px;
      width: 100%;
      resize: none;
    }
    .avatar {
      display: flex;
      img {
        width: 4rem;
        height: 4rem;
        margin-right: 10px;
      }
    }
    .add {
      width: 4rem;
      height: 4rem;
      background: url("../assets/icons/addpic.svg") no-repeat center;
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .del {
      width: 4rem;
      height: 4rem;
      background: url("../assets/icons/delpic.svg") no-repeat center;
    }
  }
}
</style>