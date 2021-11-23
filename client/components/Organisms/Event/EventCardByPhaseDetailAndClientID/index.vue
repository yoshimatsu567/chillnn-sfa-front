<template>
    <div v-if="eventModelList !== null">
        <div v-for="(eventModel, idx) in eventModelList" :key="eventModel.eventID">
            <div class="event_container" v-if="idx % 2 === 0" @click="onModalToggle(eventModel, idx)">
                <div class="event_status_text_style">コンタクトメモ</div>
                <div class="eventDate_style">
                    <!-- <app-simple-input type="date" :value="eventModel.eventDate" disable="true" /> -->
                    <img class="calendar_style" width="20" src="~/assets/img/calendar.svg" />
                    <div class="event_date_text_style">
                        {{ eventModel.eventDate }}
                    </div>
                </div>
                <div class="event_content_style">
                     {{ eventModel.eventMemo }}
                </div>
            </div>
            <div class="event_container" style="background-color:#eaf4fc" v-else @click="onModalToggle(eventModel, idx)">
                <div class="event_status_text_style">リアクションメモ</div>
                <div class="eventDate_style">
                    <!-- <app-simple-input type="date" :value="eventModel.eventDate" /> -->
                    <img class="calendar_style" width="20" src="~/assets/img/calendar.svg" />
                    <div class="event_date_text_style">
                        {{ eventModel.eventDate }}
                    </div>
                </div>
                <div class="event_content_style">
                    {{ eventModel.eventMemo }}
                </div>
            </div>
        </div>
        <app-modal v-model="isModalToggle">
            <div class="appModal_cross_wrapper">
                <img class="appModal_cross_style" @click="closeModal" width="15" src="~/assets/img/cross.svg" />
            </div>
            <div class="modal_event_container" v-if="localEventModel !== null && localIndexValue !== null">
                <div class="modal_event_status_text_style" v-if="localIndexValue % 2 === 0">コンタクトメモを編集する</div>
                <div class="modal_event_status_text_style" v-else>リアクションメモを編集する</div>
                <div class="modal_eventDate_style">
                    <app-simple-input type="date" :value="localEventModel.eventDate" v-model="localEventModel.eventDate" />
                </div>
                <div class="modal_event_content_style">
                    <app-text-area :value="localEventModel.eventMemo" v-model="localEventModel.eventMemo" placeholder="メールで案内送付" rows="7" cols="30" autofocus="false" maxLength="500" />
                </div>
                <div>
                    <app-primary-button @click="registered(localEventModel)">更新</app-primary-button>
                </div>　
            </div>
        </app-modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'nuxt-property-decorator'
import AppSimpleInput from '../../../Atom/AppSimpleInput.vue'
import { EventModel } from 'chillnn-sfa-abr/dist/entities/models/modules/eventModel'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { eventInteractor } from '~/api'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import AppModal from '../../../Organisms/Common/AppModal/index.vue'
import AppTextArea from '../../../Atom/AppTextArea.vue'
import AppPrimaryButton from '../../../Atom/AppPrimaryButton.vue'

@Component({
    components: {
        AppSimpleInput,
        AppModal,
        AppTextArea,
        AppPrimaryButton,
    }
})
export default class EventCardByPhaseDetailAndClientID extends Vue {
    // @Prop({ required: false }) eventModel!: EventModel
    @Prop({ required: true }) phaseTitle!: PhaseModel
    @Prop({ required: true }) clientModel!: ClientModel

    public eventModelList: EventModel[] | null = null
    public isModalToggle: boolean = false
    public localEventModel: EventModel | null = null
    public localIndexValue: number | null = null

    public async created() {
        this.eventModelList = await eventInteractor.fetchEventsByClientID(this.clientModel.clientID)
        if(this.eventModelList !== null){
            this.eventModelList = this.eventModelList.filter(eventModel => eventModel.eventDetail === this.phaseTitle.phaseDetail)
        }
    }

    public onModalToggle(eventModel: EventModel, idx: number) {
        this.isModalToggle = true
        this.localEventModel = eventModel
        this.localIndexValue = idx
    }

    public async closeModal(){
        this.isModalToggle = false
    }

    public async registered(localEventModel: EventModel){
        if(localEventModel){
            this.localEventModel = localEventModel
            await this.localEventModel.register()
            .then(() => window.alert('更新しました'))
            .catch((err) => window.alert(err))
            this.isModalToggle = false
        }
    }

}
</script>

<style lang="stylus" scoped>
    .eventMemo_subTitle_style{
        color: $commentContentsColor
        font-size: 5px;
        margin-bottom: 5px;
    }
    .event_container{
        border: 3px solid $lightBorderColor;
        border-radius: 10px;
        width: 248px;
        margin-bottom: 10px;
        background-color:$CHILLNNLEMONCOLOR
        cursor: pointer;

        &:active {
            -webkit-transform: translate(0, 2px);
            -moz-transform: translate(0, 2px);
            transform: translate(0, 2px);
        }

        .event_status_text_style{
            padding: 10px;
            // border-bottom: solid $CHILLNNBlueColor
        }

        .eventDate_style{
            justify-content: center;
            display: flex;
            width: 100%;

            

            .calendar_style{
                margin-right: 15px;
            }

            .event_date_text_style{

            }
        }

        .event_content_style{
            padding: 20px;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .border_style{
            width: 95%;
            margin-right: 2.5%;
            margin-left: 2.5%;
            padding: 0;
            border-top: 1px solid $WHITECOLOR;
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