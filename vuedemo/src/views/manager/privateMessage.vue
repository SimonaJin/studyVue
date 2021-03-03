<!-- manager/privateMessage -->
<template>
  <div>
    <a-form-model>
      <a-form-model-item label="消息内容">
        <a-input v-model="msg" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="publish"> 发送消息 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      msg: "",
    };
  },
  computed: {
    ...mapState(["ws"]),
  },
  methods: {
    publish() {
      this.ws.send({ type: "message", data: this.msg });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>