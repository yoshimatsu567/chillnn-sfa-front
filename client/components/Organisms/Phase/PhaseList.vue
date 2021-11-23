<template>
    <div class="phase_wrapper">
        <div class="phase_child" v-for="(phase) in phaseDataList" :key="phase.phaseID">
            <div>Phase : {{ phase.phaseNumber }} {{ phase.phaseDetail }}</div>
            <div class="phaseDate_style">{{ phase.phaseDate }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ClientMast } from 'chillnn-sfa-abr'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { phaseInteractor } from '~/api'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import PhaseModal from '../../../pages/client/phaseModal.vue'

@Component({
    components: {
        PhaseModal,
    }
})
export default class PhaseList extends Vue {
    @Prop({ required: false }) client!: ClientModel
    @Prop({ required: true }) idx!: number
    @Prop({ required: true }) phaseTitleList!: PhaseModel[]
    
    public isModalTogglePhase: boolean = false
    public index: number | null = null
    public phaseModel: PhaseModel | null = null
    public phaseDataList: PhaseModel[] = []

    @AsyncLoadingAndErrorHandle()
    public async created() {
        // this.phaseDataList = await this.fetchPhaseDataByClientIDAsync(this.client.clientID)
        this.phaseDataList = await phaseInteractor.fetchPhaseDataByClientID(this.client.clientID)
        // console.log(this.phaseDataList[0])
    }

    @AsyncLoadingAndErrorHandle()
    public async isShowModalPhase(client: ClientModel) {
        this.isModalTogglePhase = true
        return client
    }

    @AsyncLoadingAndErrorHandle()
    public async createNewPhaseBlanc(idx: number) {
        
    }

    @AsyncLoadingAndErrorHandle()
    public async register(idx: number, phase: PhaseModel) {
        phase.clientID = this.client.clientID
        if(this.phaseModel){
            await this.phaseModel.register()
        }
    }
}
</script>

<style lang="stylus" scoped>
.phase_wrapper{
    display: flex;
    min-width: 132px;
    align-items: center;

    .phase_child{
        min-width: 175px;
        min-width: 132px;
        height: 40px;
        position: 1;
        justify-content: center;
        border: 2px solid #FFFFFF;

        &:hover{
            // background-color: $shadowColor;
        }

        .phaseDate_style{
            // border-bottom: 2px solid $CHILLNNBlueColor;
            font-weight: bold;
            max-width: 60px;
            margin-top: 12px;
            // margin-top: 5px;
            margin-right: auto;
            margin-left: auto;  
        }

    }

    input{
        // color: #FFFFFF;
        outline: none;
        max-width: 128px;
        font-size: 10px;
        cursor: pointer;

        &:hover{
            // color: $shadowColor;
            background-color: $shadowColor;
        }

        &:focus{
            color: #000000;
            background-color: #FFFFFF;
        }
    }
}
</style>