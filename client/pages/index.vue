<template>
  <div>
    <div class="container">
      <h2>PhaseごとのClient情報</h2>
        <div class="create_new_phase_wrapper" @click="isCreatePhaseModalToggle = true">
          <div class="create_new_phase_text_style">
            Phase
          </div>
          <img class="create_new_phase_plus_img_style" width="20" src="~/assets/img/plus.svg">
        </div>
      <div class="client_map_wrapper">

        <table>
          <tr class="phase_wrapper">
            <th class="phaseTitleList_inner_wrapper" v-for="phaseTitle in phaseTitleList" :key="phaseTitle.phaseID">
              <div>
                <img class="delete_phase_img_style" @click="deletePhaseTitle(phaseTitle)" width="10" src="~/assets/img/cross.svg" />
              </div>
              <!-- ホゲホゲ -->
              <div class="phaseTitle_inner">
                <div>
                  Phase : {{ phaseTitle.phaseNumber }}
                </div>
                <div>
                  {{ phaseTitle.phaseDetail }}
                </div>
              </div>
              <client-by-phase-list :phase-title="phaseTitle" @onModalToggle="onReceiveToggleStatus(phaseTitle)" @clientModelListLength="fetchClientModelListLength" />
            </th>
          </tr>
        </table>
      </div>
    </div>

    <app-modal v-model="isModalToggle">
      <div class="appModal_cross_wrapper">
        <img class="appModal_cross_style" @click="closeModal" width="15" src="~/assets/img/cross.svg" />
      </div>
      <client-input-form :client-model="clientModel" :user-model-list="userModelList" @registered="closeModalAndReload" :phase-title="phaseTitle" :phase-data="phaseData" />
    </app-modal>

    <app-modal v-model="isCreatePhaseModalToggle" v-if="newPhaseTitle !== null">
      <div class="appModal_cross_wrapper">
        <img class="appModal_cross_style" @click="closeModal" width="15" src="~/assets/img/cross.svg" />
      </div>
      <h4>Phaseの追加</h4>
      <app-input class="app_input_style" :value="newPhaseTitle.phaseNumber" v-model="newPhaseTitle.phaseNumber" type="number" label="Phaseのナンバー" placeholder="1" />
      <app-input label="Phaseのタイトル" :value="newPhaseTitle.phaseDetail" v-model="newPhaseTitle.phaseDetail" placeholder="初回商談" />
      <app-primary-button class="app_primary_button" @click="registerNewPhaseTitle">追加</app-primary-button>
    </app-modal>

    <app-modal v-model="isDeletePhaseToggle" v-if="confirmPhaseTitle !== null">
      <div class="appModal_cross_wrapper">
        <img class="appModal_cross_style" @click="closeModal" width="15" src="~/assets/img/cross.svg" />
      </div>
      <h4>
        Phase : {{ confirmPhaseTitle.phaseNumber }}{{ confirmPhaseTitle.phaseDetail }}を削除しますか？
      </h4>
      <app-primary-button style="margin-top: 40px;" @click="deletePhase">削除する</app-primary-button>
    </app-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { ClientMast, Scalars, FetchClientsByPhaseInput } from 'chillnn-sfa-abr'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { clientInteractor, searchInteractor, phaseInteractor, userInteractor } from '~/api'
import ClientByPhaseList from '../components/Organisms/Client/ClientListByPhase/index.vue'
import AppModal from '../components/Organisms/Common/AppModal/index.vue'
import ClientInputForm from '../components/Organisms/Client/InputForm/index.vue'
import AppInput from '../components/Atom/AppInput.vue'
import AppPrimaryButton from '../components/Atom/AppPrimaryButton.vue'

@Component({
  components:{
    ClientByPhaseList,
    AppModal,
    ClientInputForm,
    AppInput,
    AppPrimaryButton,
  }
})
export default class Top extends Vue {
  public clientModel: ClientModel | null = null
  public clientModelList: ClientMast[] = []
  public clientModelListLength: number = 0
  public phaseTitle: PhaseModel | null = null
  public newPhaseTitle: PhaseModel | null = null
  public phaseTitleList: PhaseModel[] = []
  public phaseData: PhaseModel | null = null
  public userModelList: UserModel[] = []
  public isModalToggle: boolean = false
  public isCreatePhaseModalToggle: boolean = false
  public isDeletePhaseToggle: boolean = false
  public confirmPhaseTitle: PhaseModel | null = null 

  @AsyncLoadingAndErrorHandle()
  public async created(){
		if(this.clientModelList){
			this.clientModelList = this.clientModelList.filter(client => client.deletedAt === 0)
		}
    this.clientModel = await clientInteractor.createNewClient()
    this.newPhaseTitle = await phaseInteractor.createNewPhaseTitle()
    this.phaseTitleList = await phaseInteractor.fetchAllPhase()
    this.phaseData = await phaseInteractor.createNewPhaseData(this.clientModel.clientID)
    this.phaseTitleList = this.phaseTitleList.filter(phaseTitle => phaseTitle.phaseStatus === 'TITLE').filter(phaseTitle => phaseTitle.deletedAt === 0)
    this.userModelList = await userInteractor.fetchAllUser()
  }

  public async closeModal(){
    this.clientModel = await clientInteractor.createNewClient()
    this.newPhaseTitle = await phaseInteractor.createNewPhaseTitle()
    this.isModalToggle = false
    this.isCreatePhaseModalToggle = false
    this.isDeletePhaseToggle = false
  }

  public async closeModalAndReload() {
    this.clientModel = await clientInteractor.createNewClient()
    this.newPhaseTitle = await phaseInteractor.createNewPhaseTitle()
    this.isModalToggle = false
    this.isCreatePhaseModalToggle = false
  }

  public async registerNewPhaseTitle() {
    if(this.newPhaseTitle){
      await this.newPhaseTitle.register()
        .then(() => window.alert('追加しました'))
        .catch((err) => window.alert(err))
    }
  }

  public async deletePhaseTitle(phaseTitle: PhaseModel) {
    this.isDeletePhaseToggle = true
    this.confirmPhaseTitle = phaseTitle
    console.log(phaseTitle)
  }

  public async deletePhase() {
    if(this.confirmPhaseTitle){
      const isClient =  await clientInteractor.fetchClientsByPhaseDetailStatus(this.confirmPhaseTitle.phaseDetail)
      if(isClient && isClient.length !== 0){
        window.alert('現在このPhaseにClientが存在するため、削除できません')
        return
      }
      this.confirmPhaseTitle.deletedAt = 1
      await this.confirmPhaseTitle.register()
      .then(() => [window.alert('削除しました'), this.isDeletePhaseToggle = false])
      .catch(() => window.alert('削除に失敗しました'))
    }
  }

  public fetchClientModelListLength(clientModelListLength: number){
    this.clientModelListLength = clientModelListLength
  }

  public onReceiveToggleStatus(phaseTitle: PhaseModel){
    this.isModalToggle = true
    this.phaseTitle = phaseTitle
  }

}
</script>

<style lang="stylus" scoped>
  .container{
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    padding: 5px;
    width: 100%;

    .create_new_phase_wrapper{
      width: 150px;
      height: 40px;
      padding: 3px
      margin-left: 80vw;
      border: 1px solid $borderColor;
      border-radius: 15px;
      background-color: $CREATENEWCARDBACKGROUNDCOLOR;
      cursor: pointer;

      &:active {
          -webkit-transform: translate(0, 2px);
          -moz-transform: translate(0, 2px);
          transform: translate(0, 2px);
      }

      .create_new_phase_text_style{
        font-weight: bold;
        margin-top: 3px;
        font-size: 10%;
        color: $commentContentsColor
      }

      .create_new_phase_plus_img_style{
        
      }
    }

    .client_map_wrapper{
      overflow-x: scroll;
      width: 100%;
      margin-right: 30px;


      .phase_wrapper{
        display: flex;
        margin-bottom: 30px;

        .phaseTitleList_inner_wrapper{
          font-size: 8px;
          margin-top: 1%;
          padding-right: 10px;
          padding-left: 10px;

          .delete_phase_img_style{
            // position: relative;
            // position: absolute;
            margin-left: 200px;
            cursor: pointer;
          }

          .phaseTitle_inner{
            min-width: 225px;
            border-radius: 10px;
            text-align: center;
            padding: 5px;
            background-color: $LIGHTPINKCOLOR;
          }

        }
      }
    }
  }
  .appModal_cross_wrapper{
    width: 97%;
    text-align: right;

    .appModal_cross_style{
      cursor: pointer;
    }
  }

  .app_input_style{
    margin-bottom: 20px;  
  }
  .app_primary_button{
    margin-top: 50px;  
  }
</style>