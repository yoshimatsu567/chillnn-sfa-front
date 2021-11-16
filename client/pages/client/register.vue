<template>
  <div class="container">
        <h2 style="text-align: center">
            Client登録画面
        </h2>
        <div class="input_wrapper">
            <div class="label">担当</div>
            <select style="width: 50%;" v-model="selectedValue" name="clientModel.chargeUserID">
                <option v-for="userData in userModelList" :key="userData.userID" :value="userData.userID">{{ userData.name }}</option>
            </select>

            <app-input class="app-input" type="text" placeholder="株式会社CHILLNN" label="会社名" v-model="clientModel.companyName" required />
            <app-input class="app-input" type="text" placeholder="CHILLNN HOTEL" label="施設名" v-model="clientModel.accommodationName" required />
            <app-input class="app-input" type="text" placeholder="チルン太郎" label="施設担当者名" v-model="clientModel.clientUserName" required />
            <app-input class="app-input" type="text" placeholder="100000000" label="見込み流通額"  v-model="clientModel.expectedSalesAmount" />
            <app-input class="app-input" type="text" placeholder="有り" label="HPのポテンシャル"  v-model="clientModel.homePagePotential" />
            <app-input class="app-input" type="text" placeholder="京都府" label="都道府県"  v-model="clientModel.prefecture" />
            <app-input class="app-input" type="tel" placeholder="090********" label="電話番号"  v-model="clientModel.clientPhoneNumber" />
            <app-input class="app-input" type="email" placeholder="chillnn@chillnn.com" label="メールアドレス"  v-model="clientModel.clientEmail" required />
            <app-input class="app-input" type="text" placeholder="Lead" label="過去ステータス"  v-model="clientModel.pastStatus" />
            <!-- <app-input class="app-input" type="text" placeholder="Lead" label="新規ステータス"  v-model="clientModel.newStatus" /> -->
            <!-- <select v-model="phaseTitle" @blur="setPhaseData(phaseTitle)" style="width: 100%; cursor: pointer;">
                <option value="" disabled>Phaseを選択してください。</option>
                <option v-for="phaseTitle in phaseTitleList" :key="phaseTitle.phaseID" :value="phaseTitle">Phase : {{ phaseTitle.phaseNumber }}　{{ phaseTitle.phaseDetail }}</option>
            </select>
            <input type="date" style="width: 100%; cursor: pointer;" @blur="setInputPhaseDate(phaseDate)" v-model="phaseDate" />
            <app-input class="app-input" type="text" placeholder="1" label="アポ"  v-model="clientModel.appointmentStatus" /> -->
        </div>
        <!-- <textarea placeholder="コンタクトメモ" />
        <textarea placeholder="リアクションメモ" /> -->
        <div style="text-align: center; margin-top: 2%;">
            <app-primary-button :disabled="disabled" @click="register">登録</app-primary-button>
        </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { authInteractor } from '../../driver/amplify/auth'
import { AsyncLoadingAndErrorHandle } from '../../util/decorator/baseDecorator'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { clientInteractor, userInteractor, phaseInteractor } from '../../api'
import AppInput from '../../components/Atom/AppInput.vue'
import AppPrimaryButton from '../../components/Atom/AppPrimaryButton.vue'
import { ClientMast, UserMast, PhaseMast } from 'chillnn-sfa-abr'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'

@Component({
    components: {
        AppInput,
        AppPrimaryButton,
    },
})
export default class RegisterPage extends Vue {
    public clientModel: ClientModel = clientInteractor.createNewClient()
    public userModelList: UserModel[] = []
    public selectValue: string = ''
    public phaseModel: PhaseModel | null = null
    public phaseTitleList: PhaseModel[] = []

    public get disabled() {
        return !this.clientModel!.accommodationName || !this.clientModel!.clientEmail || !this.clientModel!.companyName
    }

    public get selectedValue() {
        return this.selectValue;
    }

    public set selectedValue(select: string) {
        this.selectValue = select
        this.$emit('selected', select)
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
        this.userModelList = await userInteractor.fetchAllUser()
        this.phaseTitleList = await phaseInteractor.fetchAllPhase()
        this.phaseTitleList = this.phaseTitleList.filter(phaseTitle => phaseTitle.phaseStatus === 'TITLE')
    }

    @AsyncLoadingAndErrorHandle()
    async register() {
        this.clientModel.chargeUserID = this.selectValue
        await this.clientModel.register()
        .then(() => window.alert("送信した"))
        .catch(() => window.alert('なんかミスった'))
        this.clientModel = await clientInteractor.createNewClient()
    }
}
</script>

<style lang="stylus" scoped>
.container{
    width: 100%;
    padding-bottom: 5%;
}
.input_wrapper{
    text-align: center;
    margin-left: 30%;
    margin-right: 30%;
}
.app-input{
    margin-top: 1%;
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
</style>