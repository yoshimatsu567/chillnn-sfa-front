<template>
    <div v-if="phaseData !== null">
        <div class="phaseDate_subTitle_style" v-if="phaseData.phaseDate !== ''">このPhaseに移行した日</div>
        <div class="phaseDate_subTitle_style" v-else>このPhaseに移行した日を登録しましょう！</div>
        <app-simple-input type="date" @blur="register()" v-model="phaseData.phaseDate" :value="phaseData.phaseDate"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppSimpleInput from '../../../Atom/AppSimpleInput.vue'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { phaseInteractor } from '~/api'

@Component({
    components: {
        AppSimpleInput,
    }
})
export default class PhaseDateByPhaseDetailAndClientID extends Vue {
    @Prop({ required: false }) phaseTitle!: PhaseModel
    @Prop({ required: false }) clientModel!: ClientModel

    public phaseData: PhaseModel | null = null

    @AsyncLoadingAndErrorHandle()
    public async created() {
        this.phaseData = await phaseInteractor.fetchPhaseDataByClientIDAndPhaseDetail(this.clientModel.clientID, this.phaseTitle.phaseDetail)
        if(this.phaseData !== null){
            this.phaseData.phaseDetail = this.phaseTitle.phaseDetail
            this.phaseData.phaseNumber = this.phaseTitle.phaseNumber
        }
    }
    
    @AsyncLoadingAndErrorHandle()
    public async register() {
        if(this.phaseData !== null){
            this.clientModel.phaseNumberStatus = this.phaseData.phaseNumber
            this.clientModel.phaseDetailStatus = this.phaseData.phaseDetail
            await this.clientModel.register()
            await this.phaseData.register()
        }
    }
}
</script>

<style lang="stylus" scoped>
    .phaseDate_subTitle_style{
        color: $commentContentsColor
        font-size: 5px;
        margin-bottom: 10px;
    }
</style>