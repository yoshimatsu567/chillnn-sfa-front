<template>
  <div class="container">
    <h2>
      ユーザー情報
    </h2>
    <div class="input_wrapper" v-if="userModel !== null" >
      <app-input type="text" placeholder="chillnn@chillnn.com" v-model="userModel.email" class="input" label="メールアドレス"/>
      <app-input type="text" placeholder="チルン太郎" v-model="userModel.name" maxLength="15" class="input" label="名前"/>
      <app-input type="text" placeholder="090********" v-model="userModel.phoneNumber" maxLength="15" class="input" label="電話番号"/>
      <div class="jobTitleName_container">
        <div class="label">役職</div>
        <select class="jobTitleName_wrapper" v-model="userModel.jobTitleName" required>
          <option value="jobTitleName" disabled>-- あなたの役職を選択してください --</option>
          <optgroup label="社員">
            <option value="CEO">CEO</option>
            <option value="CTO">CTO</option>
            <option value="BizDev">BizDev</option>
            <option value="エンジニア">エンジニア</option>
          </optgroup>
          <optgroup label="インターン">
            <option value="BizDevインターン">BizDevインターン</option>
            <option value="エンジニアインターン">エンジニアインターン</option>
          </optgroup>
        </select>
      </div>
      <!-- <app-select-job-title-name
        v-model="userModel.jobTitleName"
      /> -->
    </div>
    <div class="button_wrapper" v-if="userModel !== null">
      <app-primary-button :disabled="disabled" @click="register">登録</app-primary-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { userInteractor } from '~/api'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppInput from '../../../components/Atom/AppInput.vue'
import AppPrimaryButton from '../../../components/Atom/AppPrimaryButton.vue'
import AppSelectJobTitleName from '../../../components/Organisms/Common/AppSelect/SelectJobTitleName/index.vue'

@Component({
  components: {
    AppInput,
    AppPrimaryButton,
    AppSelectJobTitleName,
  },
})
export default class RegisterPage extends Vue {
  public name: string = ''
  public phoneNumber: string = ''
  public jobTitleName: string = ''
  public userModel: UserModel | null = null

  public get disabled() {
    if(this.userModel)
    return this.userModel.name === '' || this.userModel.jobTitleName === 'jobTitleName'
  }

  async created() {
    this.userModel = await userInteractor.fetchMyUserModel()
  }

  @AsyncLoadingAndErrorHandle()
  public async register() {
    if(this.userModel){
      await this.userModel.register()
      .then(() => window.alert("登録できました"))
      .catch(() => window.alert("登録できませんでした。一度リロードしてみてください。"))
    }
  }
}
</script>

<style lang="stylus" scoped>
.container{
  text-align: center;

  .info_wrapper{
    margin-top: 2%;
    margin-bottom: 5%;
  }
  .input_wrapper{
    width: 70%;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-flow: column;
  
    .input{
      margin-bottom: 2%;
    }

    .jobTitleName_container{  
      width: 100%;

      .label{
        width: 100%;
        margin-left: 7%;
        font-size: 5px;
        text-align: left;
        color: $commentContentsColor
      }

      .jobTitleName_wrapper{
        width: 85%;
        border: 1px solid $lightBorderColor;
        padding: 10px 20px;
        margin-top: 5px;
        border-radius: 5px;
        background-color: $WHITECOLOR

        &:hover{
            outline: $CHILLNNBrightPinkColor
            background-color: $lightBorderColor
            cursor: text;
        }
        &:focus{
            outline: $CHILLNNBrightPinkColor
        }
      }
    }

  }
  .button_wrapper{
    margin-top: 3%;  
  }
}
</style>