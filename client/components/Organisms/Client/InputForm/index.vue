<template>
    <div>    
        <div v-if="clientModel !== null">
            <h3 class="appModal_h3_style" v-if="phaseTitle">Phase : {{ phaseTitle.phaseNumber }} {{ phaseTitle.phaseDetail }}にClientを追加する</h3>
            <div class="input_wrapper">
                <app-input placeholder="CHILLNN Inc." label="会社名" :value="clientModel.companyName" v-model="clientModel.companyName" />
                <app-input placeholder="CHILLNN HOTEL" label="施設名" :value="clientModel.accommodationName" v-model="clientModel.accommodationName" />
            </div>
            <div class="input_wrapper">
                <app-input placeholder="chillnn@chillnn.com" label="メールアドレス" :value="clientModel.clientEmail" v-model="clientModel.clientEmail" />
                <app-input placeholder="00012345678" label="電話番号" :value="clientModel.clientPhoneNumber" v-model="clientModel.clientPhoneNumber" maxLength="15" />
            </div>
            <div class="input_wrapper">
                <app-input placeholder="若林太郎" label="施設担当者名" :value="clientModel.clientUserName" v-model="clientModel.clientUserName" />
                <app-input placeholder="京都府" label="所在地" :value="clientModel.prefecture" v-model="clientModel.prefecture" />
            </div>
            <div class="input_wrapper">
                <app-input placeholder="10000万くらい" label="予想流通額" :value="clientModel.expectedSalesAmount" v-model="clientModel.expectedSalesAmount" maxLength="15" />
                <app-input placeholder="有り" label="HPのポテンシャル" :value="clientModel.homePagePotential" v-model="clientModel.homePagePotential" />
            </div>
            <div class="input_wrapper">
                <div class="select_option_container">
                    <div class="label">CHILLNN担当者</div>
                    <select class="option_select_style" v-model="selectedOptionValue">
                        <option disabled>CHILLNNの担当者を選択してください</option>
                        <option v-for="user in userModelList" :key="user.userID" :value="user.userID">{{ user.name }}</option>
                    </select>
                </div>
                <app-input v-if="phaseData && phaseData.phaseDate !== null" label="このPhaseに移行した日" type="date" :value="phaseData.phaseDate" v-model="phaseData.phaseDate" maxLength="15" />
            </div>
        </div>
        <div class="primaryButton_wrapper">
            <app-primary-button v-if="phaseTitle" :disabled="disabled" @click="register">登録</app-primary-button>
            <app-primary-button v-else :disabled="disabled" @click="register">更新</app-primary-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { phaseInteractor } from '~/api'
import AppInput from '../../../Atom/AppInput.vue'
import AppPrimaryButton from '../../../Atom/AppPrimaryButton.vue'
import AppSimpleInput from '../../../Atom/AppSimpleInput.vue'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { Scalars } from 'chillnn-sfa-abr'

@Component({
    components:{
        AppInput,
        AppPrimaryButton,
        AppSimpleInput,
    }
})
export default class ClientInputForm extends Vue {
    @Prop({ required: true }) clientModel!: ClientModel
    @Prop({ required: false }) phaseTitle!: PhaseModel
    @Prop({ required: false }) phaseData!: PhaseModel
    @Prop({ required: false }) userModel!: UserModel
    @Prop({ required: false }) userModelList!: UserModel[]

    public userData: UserModel | null = null
    public selectedOptionValue: string = ''


    public get disabled() {
        if(this.clientModel !== null){
            return !this.clientModel.accommodationName || !this.clientModel.clientUserName
        }
    }

    public async created(){
        if(this.clientModel !== null && this.clientModel.chargeUserID !== ''){
            this.selectedOptionValue = this.clientModel.chargeUserID
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        if(this.phaseTitle){
            this.clientModel.phaseNumberStatus = this.phaseTitle.phaseNumber
            this.clientModel.phaseDetailStatus = this.phaseTitle.phaseDetail
        }
        if(this.phaseData){
            this.phaseData.phaseDetail = this.phaseTitle.phaseDetail
            this.phaseData.phaseNumber = this.phaseTitle.phaseNumber
            await this.phaseData.register()
        }
        if(this.clientModel){
            this.clientModel.chargeUserID = this.selectedOptionValue
            await this.clientModel.register()
            .then(() => window.alert("送信しました"))
        }
        this.$emit('registered')
    }
}
</script>

<style lang="stylus" scoped>
    .appModal_h3_style{
        margin-bottom: 5%;
    }
    .input_wrapper{
        display: flex;
        margin-top: 1%;
    }
    .date_input_wrapper{
        margin-top: 1%;
        // width: 50%;
        display: flex;
    }

    .select_option_container{
        width: 100%;

        .label{
            width: 100%;
            margin-left: 7%;
            font-size: 5px;
            text-align: left;
            color: $commentContentsColor
        }

        .option_select_style{
            width: 90%;
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

    .primaryButton_wrapper{
        margin-top: 5%;
        margin-bottom: 2%;
    }
</style>