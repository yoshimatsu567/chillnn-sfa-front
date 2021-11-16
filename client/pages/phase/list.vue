<template>
    <div class="container">
        <h2>
            Phase一覧
        </h2>
        <div class="phaseList_wrapper" v-if="phaseList.length !== 0">
            <div v-for="phase in phaseList" :key="phase.phaseID">
                {{ phase.phaseNumber }} : {{ phase.phaseDetail }}
            </div>            
        </div>
        <div v-else>
            Phaseが登録されていません
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authInteractor } from '~/driver/amplify/auth'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { PhaseMast } from 'chillnn-sfa-abr'
import { phaseMastRepository } from '~/api/modules/GraphqlPhaseMastRepository'
import { userInteractor, clientInteractor, phaseInteractor } from '~/api'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'

@Component({})
export default class ListPage extends Vue {
    public phaseList: PhaseMast[] = []
    public phaseListReverse: PhaseMast[] = []

    @AsyncLoadingAndErrorHandle()
    public async created() {
        this.phaseList = await phaseInteractor.fetchAllPhase()
        this.phaseList = await this.phaseList.filter(phaseModel => phaseModel.phaseNumber !== 0).filter(phaseModel => phaseModel.clientID === '')
    }
}
</script>

<style lang="stylus" scoped>
.container{
    text-align: center;
}
.phaseList_wrapper{
    margin-right: 30%;
    margin-left: 30%;
    text-align: left;
    font-weight: bold;
}
</style>