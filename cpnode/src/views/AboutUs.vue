<template>
  <div>
    <header>
      <a class="return" @click="$router.go(-1)"><i class="iconfont icon-return"></i></a>
      <h1>关于我们</h1>
    </header>
    <section>
      “一站式”网络时时彩平台{{name}}重磅来袭！ 不同于传统博彩娱乐模式的限制，{{name}}是一种全新的网络娱乐平台，给玩家带来不一样的冲击和体验！
      选择{{name}}，就是选择无处不在的快乐！<br/><br/>
      第一、{{name}}秉承“公正、诚心、精品”理念，打造优良的网络娱乐平台，致力于为玩家提供更方便、更快捷、更优质的投注体验。<br/><br/>
      第二，{{name}}娱乐凭借强大的核心研发技术，为玩家创造最佳、最安全的多元化网络娱乐平台，让所有玩家享受一站式娱乐体验。另外，{{name}}平台开发全新的手机投注系统，让玩家随时随地体验到最先进、最便利、最流畅的线上娱乐！<br/><br/>
      第三、广阔的市场。{{name}}凭借敏锐的市场洞察力和广阔的市场视野，打造自己的品牌特征，成为亚洲领先的网络互动娱乐品牌。<br/><br/>
      第四、玩法丰富、注重创新。彩票市场上最新最热的彩种，在{{name}}的平台上，你都可以体验到。{{name}}平台目前拥有彩票市场上最新最火的30多个彩种，300多种玩法，并且更多新的玩法还在持续开发。除此之外，你还可以体验到平台独有的创新趣味玩法，真正感受{{name}}带给您的快乐！<br/><br/>
      第五、强大的现场资金流支持。{{name}}平台立志打造成行业玩法最多、资金实力最强的全新网络娱乐平台，百万取款十分钟内到账，让各位彩民无后顾之忧！<br/><br/>
      {{name}}团队的每一位工作人员都将铭记平台的核心价值观：诚信为本，用户第一。用热情打动每一位用户，坚持以用户的满意为奋斗目标。<br/>
    </section>
  </div>
</template>
<script>
import api from "../api.js"
export default {
  data(){
    return{
      name:api.name
    }
  }
}
</script>
<style scoped>
  section {
    padding-left: 1rem;
    padding-right: 1rem;
    line-height: 2rem;
    font-size: 12px;
    background-color: #fff;
  }
</style>
