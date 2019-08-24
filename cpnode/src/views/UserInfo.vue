<template>
  <div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>个人信息</h1>
      <!-- <a class="save" @click="save()">保存</a> -->
    </header>
    <section>
      <ul>
        <li>
          <span>头像</span>
          <input type="file" class accept="image/*" @change="upload()" ref="imgSource">
          <img :src="imgUrl" class="avatar">
        </li>
        <li>
          <span>用户名</span>
          <span style="color:#999">{{username}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>中文名</span>
          <span style="color:#999">{{realname}}</span>
        </li>
        <!-- <li>
          <span>手机号</span>
          <input type="tel" class="phone" placeholder="点击添加手机号" v-model="phone"/>
        </li>-->
        <li>
          <span>手机号</span>
          <img src="" alt="">
          <span style="color:#999">{{phone}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: this.$getCookie("headphoto"),
      username: this.$getCookie("username"),
      realname: this.$getCookie("realname"),
      phone: this.$getCookie("phone") || ""
    };
  },
  methods: {
    upload() {
      let imgFile = this.$refs.imgSource.files[0];
      let formData = new FormData();
      formData.append("file", imgFile);
      this.$loading.show("上传中");
      this.$http.post("/user/fileUpload", formData).then(
        res => {
          this.imgUrl = res;
          this.$setCookie("headphoto", this.imgUrl, 1000 * 60 * 60 * 24 * 30);
          this.$loading.hide();
          this.$router.go(-1);
        },
        err => {
          this.$loading.hide();
        }
      );
    },
    save() {
      if (this.phone.length !== 11 || !this.phone.startsWith("1")) {
        alert("手机格式不正确!");
        return;
      }
      this.$loading.show("保存中");
      this.$http.post("/user/update", { Phone: this.phone }).then(
        res => {
          this.$loading.hide();
          this.$setCookie("phone", this.phone, 1000 * 60 * 60 * 24 * 30);
          this.$router.go(-1);
        },
        err => {
          this.$loading.hide();
        }
      );
    }
  }
};
</script>
<style scoped>
.save {
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: #fff;
}

ul {
  margin: 0.5rem 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding-left: 1rem;
}

ul > li {
  display: flex;
  padding: 1rem 1rem 1rem 0;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

ul > li:first-child {
  border-bottom: 1px solid #ddd;
}

.avatar {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

input[type="file"] {
  position: absolute;
  display: inline-block;
  width: 50%;
  height: 5rem;
  right: 0;
  top: 0;
  opacity: 0;
}

input[type="tel"] {
  text-align: right;
}
</style>
