<template>
<!-- 今回は管理者からのアカウント発行に限ると思うが、一応置いとく -->
  <div class="container">
    <div>
        新規登録
    </div>
    <input type="text" placeholder="メール" v-model="email">
    <input type="password" placeholder="パスワード" v-model="password">
    <button :disabled="disabled" @click="authSignUp">新規登録</button>
    <div>
        <nuxt-link :to="{ name: 'auth-signin' }">すでに登録しているので、サインインする</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AsyncLoadingAndErrorHandle } from '../../util/decorator/baseDecorator'
import { authInteractor } from '../../driver/amplify/auth'

@Component({})
export default class SignUpPage extends Vue {
    public email: string = ''
    public password: string = ''

    public get disabled() {
        return !this.email || !this.password
    }

    @AsyncLoadingAndErrorHandle()
    public async authSignUp() {
        await authInteractor.signUp(this.email, this.password)
        window.alert(
            '認証用メールを送ったはず、来なかったら何か間違えてる'
        )
        this.$router.push({
            name: 'auth-verify',
            query: {
                email: this.email,
                password: this.password
            }
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