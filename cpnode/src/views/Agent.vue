<template>
  <div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>代理加盟</h1>
      <!-- <a class="register">代理注册</a> -->
    </header>
    <section style="background-color: #fff;">
      <div class="buttons">
        <router-link to="agentreg">注册</router-link>
        <a :href="agentUrl" target="_blank">登录</a>
      </div>
      <div
        style="color: #f6673d;font-weight: 600;font-size: 16px;text-align: center;line-height: 25px;padding: 10px 50px;border-bottom: 1px solid #f2f2f2;"
      >彩票代理可根据自身利益选择以下两种方案（二选一）进行结算佣金!</div>
      <p style="color: #f6673d;padding: 15px 10px;">方案 1</p>
      <table>
        <tr>
          <td>线下会员累
            <br>计有效投注
          </td>
          <td>有效会员
            <br>3人以上
          </td>
          <td>有效会员
            <br>10人以上
          </td>
          <td>有效会员
            <br>30人以上
          </td>
          <td>有效会员
            <br>50人以上
          </td>
        </tr>
        <tr>
          <td>3000或以上</td>
          <td>10元</td>
          <td>15元</td>
          <td>20元</td>
          <td>30元</td>
        </tr>
        <tr>
          <td>5000或以上</td>
          <td>15元</td>
          <td>20元</td>
          <td>30元</td>
          <td>50元</td>
        </tr>
        <tr>
          <td>1万或以上</td>
          <td>30元</td>
          <td>40元</td>
          <td>60元</td>
          <td>80元</td>
        </tr>
        <tr>
          <td>3万或以上</td>
          <td>100元</td>
          <td>150元</td>
          <td>200元</td>
          <td>300元</td>
        </tr>
        <tr>
          <td>5万或以上</td>
          <td>200元</td>
          <td>300元</td>
          <td>400元</td>
          <td>500元</td>
        </tr>
        <tr>
          <td>10万或以上</td>
          <td>400元</td>
          <td>500元</td>
          <td>600元</td>
          <td>700元</td>
        </tr>
        <tr>
          <td>20万或以上</td>
          <td>600元</td>
          <td>700元</td>
          <td>800元</td>
          <td>900元</td>
        </tr>
        <tr>
          <td>30万或以上</td>
          <td>900元</td>
          <td>1000元</td>
          <td>1100元</td>
          <td>1200元</td>
        </tr>
        <tr>
          <td>50万或以上</td>
          <td>1600元</td>
          <td>1700元</td>
          <td>1800元</td>
          <td>1900元</td>
        </tr>
        <tr>
          <td>100万或以上</td>
          <td>3300元</td>
          <td>3600元</td>
          <td>3800元</td>
          <td>4000元</td>
        </tr>
        <tr>
          <td>300万或以上</td>
          <td>9000元</td>
          <td>9300元</td>
          <td>9700元</td>
          <td>10000元</td>
        </tr>
        <tr>
          <td>500万或以上</td>
          <td>16000元</td>
          <td>18000元</td>
          <td>20000元</td>
          <td>22000元</td>
        </tr>
        <tr>
          <td>1000万或以上</td>
          <td>32000元</td>
          <td>33000元</td>
          <td>34000元</td>
          <td>35000元</td>
        </tr>
        <tr>
          <td>1500万或以上</td>
          <td>50000元</td>
          <td>51000元</td>
          <td>53000元</td>
          <td>55000元</td>
        </tr>
        <tr>
          <td>2000万或以上</td>
          <td>66000元</td>
          <td>69000元</td>
          <td>72000元</td>
          <td>75000元</td>
        </tr>
        <tr>
          <td>3000万或以上</td>
          <td>90000元</td>
          <td>93000元</td>
          <td>97000元</td>
          <td>110000元</td>
        </tr>
        <tr>
          <td>5000万或以上</td>
          <td>160000元</td>
          <td>170000元</td>
          <td>175000元</td>
          <td>180000元</td>
        </tr>
        <tr>
          <td>8000万或以上</td>
          <td>270000元</td>
          <td>280000元</td>
          <td>290000元</td>
          <td>300000元</td>
        </tr>
        <tr>
          <td>1亿 或以上</td>
          <td>300000元</td>
          <td>310000元</td>
          <td>320000元</td>
          <td>350000元</td>
        </tr>
        <tr>
          <td>2亿 或以上</td>
          <td>700000元</td>
          <td>750000元</td>
          <td>800000元</td>
          <td>900000元</td>
        </tr>
        <tr>
          <td>3亿 或以上</td>
          <td>100万元</td>
          <td>110万元</td>
          <td>130万元</td>
          <td>150万元</td>
        </tr>
      </table>
      <P style="color: #f6673d;">注：请谨记使用任何不诚实方式骗取代理佣金者将取消代理资格并永久冻结账号，佣金一律不予派发！
        <br>您将发现，合营计划为我们的合营伙伴提供了业界最具吸引力的共赢计划。
      </P>

      <p style="color: #f6673d;padding: 15px 10px;">方案 2</p>
      <table>
        <tr>
          <td>所有会员累
            <br>计实际亏损
          </td>
          <td>有效会员
            <br>3人以上
          </td>
          <td>有效会员
            <br>10人以上
          </td>
          <td>有效会员
            <br>30人以上
          </td>
          <td>有效会员
            <br>50人以上
          </td>
        </tr>
        <tr>
          <td>100-5000元</td>
          <td>5%</td>
          <td>8%</td>
          <td>10%</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>5001-30000元</td>
          <td>8%</td>
          <td>10%</td>
          <td>15%</td>
          <td>25%</td>
        </tr>
        <tr>
          <td>30001-99999元</td>
          <td>10%</td>
          <td>15%</td>
          <td>20%</td>
          <td>30%</td>
        </tr>
        <tr>
          <td>10万元-299999元</td>
          <td>15%</td>
          <td>20%</td>
          <td>25%</td>
          <td>35%</td>
        </tr>
        <tr>
          <td>30万元-999999元</td>
          <td>20%</td>
          <td>25%</td>
          <td>30%</td>
          <td>40%</td>
        </tr>
        <tr>
          <td>100万元-4999999元</td>
          <td>30%</td>
          <td>35%</td>
          <td>40%</td>
          <td>50%</td>
        </tr>
        <tr>
          <td>500万元-9999999元</td>
          <td>35%</td>
          <td>40%</td>
          <td>50%</td>
          <td>50%</td>
        </tr>
        <tr>
          <td>1000万元以上</td>
          <td>40%</td>
          <td>50%</td>
          <td>50%</td>
          <td>50%</td>
        </tr>
      </table>

      <p>例如：
        <br>A：代理线下客户拥有10个有效会员星期一到星期日累计的彩票实际亏损38000元，那么代理可得到的佣金是38000 X 15% = 5700元
        <br>B：代理线下客户拥有30个有效会员星期一到星期日累计的彩票实际亏损38000元，那么代理可得到的佣金是38000 X 20% = 7600元
        <br>C：代理线下客户拥有29个有效会员（未达到30个有效会员）星期一到星期日累计的彩票实际亏损101万元，那么代理可得到的佣金是 1010000 X 35% = 353500元
        <br>D：代理线下客户拥有30个有效会员 （达到30个有效会员）星期一到星期日累计的彩票实际亏损101万元，那么代理可得到的佣金是 1010000 X 40% = 404000元
        <br>
        <br>
      </p>
      <p>
        活动规则:
        <br>会员参与此代理方案可根据自己的自身利益选择其中一种进行代理合作；
        <br>线下会员达到有效会员条件需该周有效投注达到500以上即算做有效会员；
        代理线下所有彩票有效投注统计 棋牌游戏均不计算在内；
        <br>佣金结算区间：北京时间周一至周日，佣金派送时间：北京时间每周一24点前；
        <br>若想中途变更代理方案，请提前一周联系代理专员进行登记更换；
        <br>代理商若以任何不诚实的方式套取代理佣金，公司将冻结帐号终止合作；
        <br>再确认加入代理合作前请详细阅读{{name}}【用户协议】有关事宜；
        <br>
        <span style="color: #f6673d;">如果线下会员累积到日投注100人以上或者日损益100万以上即可申请日结佣金并升级到股东代理。</span>
        <br>
      </p>
    </section>
  </div>
</template>

<script>
import api from "../api.js"
export default {
  data() {
    return {
      name: api.name,
      agentUrl: this.$getCookie("agentUrl")
    };
  }
};
</script>

<style scoped>
.register {
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
}
.buttons {
  display: flex;
  justify-content: space-around;
  padding: 20px 0 10px 0;
}
.buttons a {
  display: block;
  width: 8rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 16px;
  text-align: center;
  letter-spacing: 4px;
  border-radius: 5px;
}
.buttons a:first-child {
  background-color: #f6673d;
  color: #fff;
}
.buttons a:last-child {
  border: 1px solid #7b7b7b;
  color: #7b7b7b;
}
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  color: #7d7d7d;
}
tr {
  height: 40px;
}
tr:nth-child(odd) {
  background-color: #f2f2f2;
}
p {
  padding: 10px;
  line-height: 25px;
  font-size: 13px;
}
</style>
