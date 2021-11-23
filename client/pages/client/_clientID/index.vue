<template>
  <div class="container" v-if="clientModel !== null">
      <h2 class="accommodationName_text_style">{{ clientModel.accommodationName }}の情報一覧・編集</h2>
      <div class="chargeUserName_wrapper">
        <div class="chargeUserName_text_style" v-if="userModel !== null">
          <div class="chargeUserName_label_style">
            CHILLNN 担当者
          </div>
          <div>
            {{ userModel.name }}
          </div>
          <!-- <div v-else>
            無し
          </div> -->
        </div>
      </div>
    <div class="clientByPhase_wrapper">
      <client-by-phase :phase-title-list="phaseTitleList" :client-model="clientModel" />
    </div>
    <div class="border_style" />
    <div class="clientInfo_container" v-if="clientModel !== null">
      <div class="inputForm_wrapper">
        <client-input-form :client-model="clientModel" :user-model-list="userModelList" :user-model="userModel" />
      </div>
    </div>
    <div class="deleteButton_wrapper">
      <div class="deleteButton_style" @click="deleteClient(clientModel.clientID)">
        削除
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Once } from 'nuxt-property-decorator'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { clientInteractor, phaseInteractor, userInteractor } from '~/api'
import { ClientMast } from 'chillnn-sfa-abr'
import ClientInputForm from '../../../components/Organisms/Client/InputForm/index.vue'
import ClientByPhase from '../../../components/Organisms/Client/ClientByPhase/index.vue'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'

@Component({
  components: {
    ClientInputForm,
    ClientByPhase,
  },
})
export default class ClientDetailPage extends Vue {
    // VueRouterでstringが設定されているので、例外でstringの型入れている
    public clientModel: ClientModel | null | string = null
    public clientData: ClientModel | null = null
    public phaseTitleList: PhaseModel[] = []
    public userModel: UserModel | null = null
    public userModelList: UserModel[] = []
    // public accommodationName: any

    // 施設名がinputと連動するのを防ぎたかった...
    // @Once('accommodationName')
    // onceCallBack(): void{
    //   if(this.clientModel){
    //     this.accommodationName = this.clientModel.accommodationName
    //   }
    // }

  async created() {
    if(this.$route.params.clientModel){
        this.clientModel = this.$route.params.clientModel
    }else{
        this.clientModel = await clientInteractor.fetchClientByClientID(this.$route.params.clientID)
        console.log(this.clientModel)
    }
    if(typeof this.clientModel !== "string"){
      this.clientData = this.clientModel
      if(this.clientData && this.clientData.chargeUserID){
        this.userModel = await userInteractor.fetchUserMastByUserID(this.clientData.chargeUserID)
      }
    }

    this.userModelList = await userInteractor.fetchAllUser()

    this.phaseTitleList = await phaseInteractor.fetchAllPhase()
    this.phaseTitleList = this.phaseTitleList.filter(phaseTitle => phaseTitle.phaseStatus === 'TITLE').filter(phaseTitle => phaseTitle.deletedAt === 0)
  }

  async deleteClient(clientID: string){
    if(window.confirm('本当に削除していいですか？')){
      if(this.clientData !== null){
        this.clientData.deletedAt = 1
        this.clientData.register()
      }
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
.container{
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;

  .accommodationName_text_style{
    width: 70%;
    margin-right: 15%;
    margin-left: 15%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .chargeUserName_wrapper{
    width: 90%;
    display: flex;
    justify-content: flex-end;

    .chargeUserName_text_style{
      background-color: $CHILLNNPURPLELIGHTCOLOR;
      padding: 10px;
      border-radius: 10px;
      width: 100px;
      font-weight: bold;

      .chargeUserName_label_style{
        color: $commentContentsColor
        font-size: 5px;
        margin-bottom: 5px;
        font-weight: normal;
      }
    }
  }

  .clientByPhase_wrapper{
    text-align: center;
    margin-top: 5%;
    margin-left: 3%;
  }

  .border_style{
    width: 95%;
    margin-right: 2.5%;
    margin-left: 2.5%;
    padding: 0;
    border-top: 1px solid $lightBorderColor;
  }

  .clientInfo_container{
    margin-top: 3%;
    margin-right: 10%;
    margin-left: 10%;
    text-align: center;

    .inputForm_wrapper{
    }

  }

  .deleteButton_wrapper{
      background-color: $WHITECOLOR;
      display: flex;
      justify-content: flex-end;
      margin-top: 5%;
      margin-right: 50px;
      
    
    .deleteButton_style{
      // margin-left: 46%;
      background-color: $WHITECOLOR
      width: 5%;
      padding: 10px;
      border:solid 1px $WARNINGREDCOLOR;
      border-radius: 10px;
      cursor: pointer;
      color: $WARNINGREDCOLOR;

      &:hover{
        background-color: $WARNINGREDCOLOR;
        color: $WHITECOLOR;
      }

      &:active {
          -webkit-transform: translate(0, 2px);
          -moz-transform: translate(0, 2px);
          transform: translate(0, 2px);
      }
    }
  }

}
</style>