<template>
  <div class="container">
    <div>
        認証画面
    </div>
    <input type="text" placeholder="メール" v-model="email">
    <input type="password" placeholder="パスワード" v-model="password">
    <input type="text" placeholder="認証コード" v-model="verifyCode">
    <button :disabled="disabled" @click="verifySignIn">登録する</button>
    <div>
        <nuxt-link :to="{ name: 'auth-signin' }">すでに登録しているので、サインインする</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authInteractor } from '~/driver/amplify/auth'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { userInteractor } from '~/api'

@Component({})
export default class SignUpPage extends Vue {
    public email: string = ''
    public password: string = ''
    public verifyCode: string = ''
    public userModel: UserModel | null = null

    public get disabled() {
        return !this.email || !this.password || !this.verifyCode
    }

    @AsyncLoadingAndErrorHandle()
    public async verifySignIn() {
        await authInteractor.signUpConfirmed(this.email, this.verifyCode)
        await authInteractor.signIn(this.email, this.password)
        this.userModel = await userInteractor.fetchMyUserModel()
        this.$router.push({ name: 'user-userID', params: { userID: this.userModel.userID } })
    }
}
</script>

<style lang="stylus" scoped>
.container{
    text-align: center;
    size: 20px;
}
</style>