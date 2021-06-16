<template>
  <section class="relative grid place-items-center !bg-white" style="width: 100vw; height: 100vh">
    <div class="absolute inset-3 z-0">
      <img src="logo.png" />
    </div>
    <div class="flex flex-col dtc-box relative login-box z-10" data-msg="生物安全會電子表單系統">
      <img src="login.png" class="mt-10 object-contain block self-center" width="190" height="40" />
      <div class="dtc-input ml-20 flex space-x-2 mt-10">
        <img src="user.png" class="object-contain block" width="40" height="40" />
        <InputText type="text" v-model="value1" class="z-20 !bg-white w-64" placeholder="請輸入帳號"></InputText>
      </div>
      <div class="dtc-input ml-20 flex space-x-2 mt-10">
        <img src="password.png" class="object-contain block" width="40" height="40" />
        <InputText placeholder="請輸入密碼" type="password" v-model="pwd" class="z-20 !bg-white w-64" />
      </div>
      <div class="dtc-input ml-20 flex space-x-2 mt-10">
        <img src="verificationcode.png" class="object-contain block" width="40" height="40" />
        <InputText placeholder="請輸入驗證碼" type="text" v-model="pass2" class="z-20 !bg-white w-28" />
        <img src="turn.png" class="object-contain block" width="30" height="30" />
      </div>

      <div class="dtc-input ml-36 flex space-x-6 mt-10">
        <Button>確認登入</Button>
        <Button class="p-button-secondary">重新輸入</Button>
      </div>
    </div>
  </section>
</template>

<script>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      value1: "",
      pwd: "",
      pass2: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.dtc-box {
  width: 503px;
  height: 517px;
  background: #ebf2ff 0% 0% no-repeat padding-box;
  border-radius: 6px;
  z-index: 5;
}

.login-box::before,
.login-box::after {
  content: attr(data-msg);
  position: absolute;
  font: normal normal bold 40px/58px Source Han Sans TW;
  letter-spacing: 4px;
  color: #00448c;
  z-index: 1;
  top: -60px;
  left: 10px;
}
.login-box::after {
  content: "";
  top: 0;
  bottom: -60px;
  left: 0;
  right: 0px;
  background: url(dtclogo.png) no-repeat bottom right;
}
</style>
