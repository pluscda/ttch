<template>
  <section class="relative grid place-items-center !bg-white" style="width: 100vw; height: 100vh">
    <div class="absolute inset-1">
      <img src="logo.png" />
    </div>
    <div class="flex dtc-box relative"></div>
  </section>
</template>

<script>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const actions = inject("actions");
    const name = ref("14tc_14_16_03");
    const pwd = ref("654321");
    const router = useRouter();
    async function login() {
      try {
        // const { jwt, user, message } = await actions.login({ identifier: name.value, password: pwd.value });
        // sessionStorage.token = jwt;
        // jwt ? router.push("/register/list") : alert(JSON.stringify(message));
        sessionStorage.token = "12";
        actions.getAllDDL();
        router.push("/register/list");
      } catch (e) {
        alert("error: " + e);
      }
    }

    return { name, pwd, login };
  },
};
</script>

<style lang="scss" scoped>
#dtc-login {
  background-image: url("//unsplash.it/998/998");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: grid;
  place-items: center;
  height: 100vh;
}
</style>

<style lang="scss" scoped>
.dtc-box {
  width: 503px;
  height: 517px;
  background: #ebf2ff 0% 0% no-repeat padding-box;
  border-radius: 6px;
}

:deep(.el-input-group__append),
:deep(.el-input-group__prepend) {
  background-color: #ffc107;
  color: black;
}
</style>
