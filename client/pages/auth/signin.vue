<template>
  <div class="container">
    <div>
        サインイン
    </div>
    <input type="text" placeholder="メール" v-model="email">
    <input type="password" placeholder="パスワード" v-model="password">
    <button :disabled="disabled" @click="authSignUp">サインイン</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AsyncLoadingAndErrorHandle } from '../../util/decorator/baseDecorator'
import { authInteractor } from '../../driver/amplify/auth'

@Component({})
export default class SignInPage extends Vue {
  public email: string = ''
  public password: string = ''

  public get disabled() {
    return !this.email || !this.password
  }

  @AsyncLoadingAndErrorHandle()
  public async authSignUp() {
    await authInteractor.signIn(this.email, this.password)
    this.$router.push({
      name: "index"
    })
  }
}
</script>

<style lang="stylus" scoped>
.container{
    text-align: center;
    font-size: 50px;
}
</style>