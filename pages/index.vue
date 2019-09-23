<template>
  <div class="container">
    <div class="box">
      <logo />
      <form>
      <h3 class="text-center subtitle">LOGIN</h3>
      <div class="login-container">
        <b-row class="m-b-sm position-right">
          <label class="f-bord-gray m-b-none p-xs m-r-sm" for="user-id"><i class="nc-icon nc-circle-09 m-r-xs"></i>ID</label>
          <b-input id="user-id" placeholder="Your ID" type="email" v-model="id" :class="{'border-danger' : loginFail}"/>
        </b-row>
        <b-row class="m-b-sm">
          <label class="f-bord-gray m-b-none p-xs m-r-sm" for="user-pw"><i class="nc-icon nc-lock-circle-open m-r-xs"></i>Password</label>
          <b-input id="user-pw" placeholder="Your password" type="password" v-model="pw" @keyup.enter="login()" :class="{'border-danger' : loginFail}"/>
        </b-row>        
      </div>
      <div class="text-right">
        <b-alert class="text-center" variant="danger" :show="loginFail">{{failMsg}}</b-alert>
        <b-button class="btn-info" @click="login()">Login</b-button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: { // 현재 template에 추가해서 사용하는 component
    Logo
  },
  layout: 'login',
  data () {
    return {
      id : '',
      pw : '',
      loginFail : false,
      failMsg : ''
    }
  },
  async beforeMount() {
     await this.$store.dispatch('logout') //login page 접근시 session reset
  },
  methods : {
    login : async function(){
      this.loginFail = false;
      try {
        await this.$store.dispatch('login', {
          username: this.id,
          password: this.pw
        })
        this.$router.push('dashboard');
      } catch (e) {
        this.loginFail = true;
        this.failMsg = e.message;
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.box {
  padding: 40px;
  border: solid #dadada 1px;
  background: #f7f7f7;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.login-container{
  width: 500px;
  i {
    position: relative;
    top: 4px;
    font-weight: 600;
    font-size: 20px;
  }
  input {
    width:75%;
  }
}

.alert {
  button {
    &.close {
      color:#000 !important;
    }
  }
}

.f-bord-gray{
  font-weight: 600;
  color:hsl(0, 0%, 44%);
}

.position-right{
  position:relative;
  right: -59px;
}
</style>
