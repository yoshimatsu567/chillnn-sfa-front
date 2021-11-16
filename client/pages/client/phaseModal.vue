<template>
    <div
        v-show="localValue"
        class="modal_wrapper"
        @click.self="localValue = false"
    >
        <div class="inner">
            <slot />
            <h3 style="text-align: center;">Phaseの登録</h3>
            <div>
                都道府県：{{ client.prefecture }}
            </div>
            <div>
                会社名：{{ client.companyName }}
            </div>
            <div>
                施設名：{{ client.accommodationName }}
            </div>
            <div>
                施設担当者名：{{ client.clientUserName }}
            </div>
            <select v-model="phaseTitle" @blur="setPhaseData(phaseTitle)" style="width: 100%; cursor: pointer;">
                <option value="" disabled>Phaseを選択してください。</option>
                <option v-for="phaseTitle in phaseTitleList" :key="phaseTitle.phaseID" :value="phaseTitle">Phase : {{ phaseTitle.phaseNumber }}　{{ phaseTitle.phaseDetail }}</option>
            </select>
            <input type="date" style="width: 100%; cursor: pointer;" @blur="setInputPhaseDate(phaseDate)" v-model="phaseDate" />
            <div class="button_wrapper">
                <app-primary-button class="button_style" @click="register">更新</app-primary-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { ClientMast, UserMast, PhaseMast } from 'chillnn-sfa-abr'
import AppInput from '../../components/Atom/AppInput.vue'
import AppPrimaryButton from '../../components/Atom/AppPrimaryButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { clientInteractor, userInteractor } from '~/api'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'

@Component({
    components: {
        AppInput,
        AppPrimaryButton,
    }
})
export default class PhaseModal extends Vue {
    @Prop({ required: true, default: false }) propValue!: boolean
    @Prop({ required: true }) client!: ClientModel
    @Prop({ required: true }) phaseTitleList!: PhaseModel[]
    @Prop({ required: false }) index!: number

    public chargeUserNameValue: string = ''
    public userModel: UserMast | null = null
    public userModelList: UserMast[] = []
    public phaseModel: PhaseModel | null = null
    public phaseTitle: PhaseMast | null = null
    public phaseDate: string = ''

    public get localValue() {
        return this.propValue
    }

    public set localValue(input: boolean) {
        this.$emit('input', input)
    }

    public setPhaseData(phaseTitle: PhaseMast){
        if(this.phaseModel){
            this.phaseModel.phaseNumber = phaseTitle.phaseNumber
            this.phaseModel.phaseDetail = phaseTitle.phaseDetail
        }
    }

    public setInputPhaseDate(phaseDate: string){
        if(this.phaseModel){
            this.phaseModel.phaseDate = phaseDate
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async created() {
        this.phaseModel = await this.client.createNewPhaseData();
    }

    @AsyncLoadingAndErrorHandle()
    public async register(){
        if(this.phaseModel!.clientID === ''){
            return window.alert('登録に失敗しました。')
        }
        if(this.phaseModel!.phaseDetail === '' || this.phaseModel!.phaseNumber === 0 || this.phaseModel!.phaseNumber === null || this.phaseModel!.phaseDate === ''){
            return window.alert('全て欄に入力してから、もう一度お試しください。')
        }
        if(this.phaseModel){
            this.client.phaseNumberStatus = this.phaseModel.phaseNumber
            this.client.phaseDetailStatus = this.phaseModel.phaseDetail
            await this.client.register()
            this.phaseModel.clientID = this.client.clientID
            this.phaseModel.phaseDate
            await this.phaseModel.register()
            .then(() => window.alert('登録しました。'))
            .catch(() => window.alert('登録できませんでした。'))
        }
    }
}
</script>
<style lang="stylus" scoped>
.modal_wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-x: scroll;

    .inner {
        box-sizing: border-box;
        max-width: 850px;
        background-color: white;
        border-radius: 25px;
        padding: 20px 20px 13px 20px;
        width: 95%;
        text-align: center;
    }

    .label{
        width: 100%;
        margin-left: 7%;
        font-size: 5px;
        text-align: left;
        color: $commentContentsColor

        &:focus-within{
            color: $CHILLNNBrightPinkColor;
        }
    }

    .button_wrapper{
        text-align: center;
        margin: 5%;
    }

    .button_style{
    }
}
</style>
