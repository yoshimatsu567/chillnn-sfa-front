<template>
    <div>
        <div class="container">
            <div class="phaseTitle_container">
                <table>
                    <tr class="phaseTitle_wrapper">
                        <th class="phaseTitle_inner_wrapper" v-for="phaseTitle in phaseTitleList" :key="phaseTitle.phaseID">
                            <div class="phaseTitle_inner" v-if="phaseTitle !== null">
                                <div>
                                    Phase : {{ phaseTitle.phaseNumber }}
                                </div>
                                <div>
                                    {{ phaseTitle.phaseDetail }}
                                </div>
                            </div>
                            
                            <td>
                                <div class="phaseDate_wrapper">
                                    <phase-date-by-phase-detail-and-client-i-d :phase-title="phaseTitle" :client-model="clientModel" />
                                </div>
                                <div class="border_style" />
                                <div class="">
                                    <div class="eventMemo_subTitle_style">コンタクト・リアクションメモ</div>
                                    <event-card-by-phase-detail-and-client-i-d :phase-title="phaseTitle" :client-model="clientModel" />
                                </div>
                                <div class="create_new_event_card_container" @click="onModalToggle(phaseTitle)">
                                    <img class="create_new_event_img_style" width="30" src="~/assets/img/plus.svg" />
                                </div>
                            </td>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
        <app-modal v-model="isModalToggle">
            <div class="appModal_cross_wrapper">
                <img class="appModal_cross_style" @click="closeModal" width="15" src="~/assets/img/cross.svg" />
            </div>
            <div class="modal_event_container" v-if="phaseTitleModel">
                <div class="modal_event_status_text_style">Phase : {{phaseTitleModel.phaseNumber}} {{ phaseTitleModel.phaseDetail }} に メモを追加する</div>
                <div class="modal_eventDate_style">
                    <app-simple-input type="date" :value="eventModel.eventDate" v-model="eventModel.eventDate" />
                </div>
                <div class="modal_event_content_style">
                    <app-text-area  :value="eventModel.eventMemo" v-model="eventModel.eventMemo" placeholder="メールで案内送付" rows="7" cols="30" autofocus="false" maxLength="500" />
                </div>
                <div>
                    <app-primary-button @click="register">追加</app-primary-button>
                </div>
            </div>
        </app-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { PhaseMast, EVENT_STATUS } from 'chillnn-sfa-abr'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { clientInteractor, userInteractor, phaseInteractor, eventInteractor } from '~/api'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import AppSimpleInput from '../../../Atom/AppSimpleInput.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import ClientInputDate from '../InputDate/index.vue'
import { EventModel } from 'chillnn-sfa-abr/dist/entities/models/modules/eventModel'
import AppModal from '../../Common/AppModal/index.vue'
import AppTextArea from '../../../Atom/AppTextArea.vue'
import AppPrimaryButton from '../../../Atom/AppPrimaryButton.vue'
import EventCardByPhaseDetailAndClientID from '../../../Organisms/Event/EventCardByPhaseDetailAndClientID/index.vue'
import PhaseDateByPhaseDetailAndClientID from '../../Phase/PhaseDateByPhaseDetailAndClientID/index.vue'

@Component({
    components: {
        AppSimpleInput,
        ClientInputDate,
        AppModal,
        AppTextArea,
        AppPrimaryButton,
        EventCardByPhaseDetailAndClientID,
        PhaseDateByPhaseDetailAndClientID,
    }
})
export default class ClientByPhase extends Vue {
	@Prop({ required: true }) phaseTitleList!: PhaseModel[]
    @Prop({ required: true }) clientModel!: ClientModel

	public clientModelList: ClientModel[] = []
	public userModel: UserModel[] = []
    public phaseDataList: PhaseModel[] = []
    public phaseData: PhaseModel | null = null
    public eventModel: EventModel | null = null
    public eventModelList: EventModel[] = []
    public isModalToggle: boolean = false
    public phaseTitleModel: PhaseModel | null = null

	// async fetchChargeUserName(chargeUserID: string, idx: number){
	// 	this.userModel[idx] = await userInteractor.fetchUserModelByUserID(chargeUserID)
	// 	return this.chargeUserName[idx] = await this.userModel[idx].name
	// }

	public async created() {
        this.eventModel = await eventInteractor.createNewEvent()
	}

    public get disabled(){
        if(this.eventModel){
            return this.eventModel.eventMemo === '' || this.eventModel.eventDate === ''
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async fetchPhaseDateByClientIDAndPhaseDetail(clientID: string, phaseDetail: string) {
        this.phaseDataList = await phaseInteractor.fetchPhaseDataByClientID(clientID)
        this.phaseDataList = await this.phaseDataList.filter(phaseData => phaseData.phaseDetail === phaseDetail).filter(phaseData => phaseData !== null)
        // if(this.phaseDataList.length >= 1){
        //     return this.phaseData = this.phaseDataList[0]
        // }else{
        //     return this.phaseData = await phaseInteractor.createNewPhaseData(clientID)
        // }
    }

    @AsyncLoadingAndErrorHandle()
    public async createPhase(phaseTitle: PhaseModel) {
        this.phaseData = await phaseInteractor.createNewPhaseData(this.clientModel.clientID)
        this.phaseData.phaseDetail = phaseTitle.phaseDetail
        this.phaseData.phaseNumber = phaseTitle.phaseNumber
        this.phaseData.clientID = phaseTitle.clientID
    }

    @AsyncLoadingAndErrorHandle()
    public async registerPhase(phaseTitle: PhaseModel) {
        // this.phaseData = await phaseInteractor.fetchPhaseDataByClientIDAndPhaseDetail(this.clientModel.clientID, phaseTitle.phaseDetail)
        if(this.phaseData === null){
            this.phaseData = await phaseInteractor.createNewPhaseData(this.clientModel.clientID)
            this.phaseData.phaseDetail = phaseTitle.phaseDetail
            this.phaseData.phaseNumber = phaseTitle.phaseNumber
            this.phaseData.clientID = phaseTitle.clientID
        }
        await this.phaseData.register()
        .then(() => window.alert('登録しました'))
        .catch(() => window.alert('登録に失敗しました'))
    }

    public onModalToggle(phaseTitle: PhaseModel){
        this.phaseTitleModel = phaseTitle
        if(this.eventModel){
            this.eventModel.eventNumberStatus = phaseTitle.phaseNumber
            this.eventModel.eventDetail = phaseTitle.phaseDetail
            this.eventModel.clientID = this.clientModel.clientID
            this.eventModel.eventStatus = 'CONTACT' as EVENT_STATUS
        }
        this.isModalToggle = true
    }

    public async register(){
        if(this.eventModel){
            await this.eventModel.register()
            .then(() => [window.alert('追加しました'), this.eventModel = eventInteractor.createNewEvent()])
            .catch(() => window.alert('追加に失敗しました'))
        }
    }

    public async closeModal(){
        this.isModalToggle = false
    }

}
</script>

<style lang="stylus" scoped>
  .container{

      .phaseTitle_container{
        overflow-x: scroll;
        width: 100%;

        .phaseTitle_wrapper{
            display: flex;

            .phaseTitle_inner_wrapper{
                margin-right: 20px;
                font-size: 12px;
                width: 250px;


                .phaseTitle_inner{
                    padding: 5px;
                    border-radius: 10px;
                    background-color: $LIGHTPINKCOLOR;
                }

                td{
                    width: 250px;

                    .phaseDate_wrapper{
                        margin-top: 20px;
                        margin-bottom: 30px;
                    }

                    .border_style{
                        width: 95%;
                        margin-right: 2.5%;
                        margin-left: 2.5%;
                        margin-bottom: 20px;
                        padding: 0;
                        border-top: 1px solid $lightBorderColor;
                    }
                }

                .eventMemo_subTitle_style{
                    color: $commentContentsColor
                    font-size: 5px;
                    margin-bottom: 10px;
                }

                .create_new_event_card_container{
                    cursor: pointer;
                    border: 1px solid $lightBorderColor;
                    border-radius: 10px;
                    width: 100%;
                    height: 50px;
                    margin-bottom: 10px;
                    background-color: $CREATENEWCARDBACKGROUNDCOLOR;

                    &:active {
                        -webkit-transform: translate(0, 2px);
                        -moz-transform: translate(0, 2px);
                        transform: translate(0, 2px);
                    }

                    .create_new_event_img_style{
                        height: 50px;
                    }
                }
            }
        }

        
    }
  }
    .appModal_cross_wrapper{
        width: 75%;
        text-align: right;
        

        .appModal_cross_style{
            cursor: pointer;
        }
    }
    .modal_event_container{
        font-weight: bold;

        .modal_event_status_text_style{
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .modal_eventDate_style{
            margin-bottom: 20px;
        }

        .modal_event_content_style{
            margin-bottom: 30px;
        }
    }
</style>