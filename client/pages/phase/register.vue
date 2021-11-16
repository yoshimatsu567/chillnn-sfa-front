<template>
    <div class="container">
        <h2 style="text-align: center">
            Phase登録画面
        </h2>
        <div v-if="!phaseModel">
            <app-primary-button>Phaseを登録する/ミスってる</app-primary-button>
        </div>
        <div v-else>
            <div class="input_wrapper">
                <!-- <div class="label">担当</div>
                <select style="width: 50%;" v-model="clientModel.chargeUserID" name="clientModel.chargeUserID" v-for="userData in userModelList" :key="userData.userID">
                    <option :value="userData.userID">{{ userData.name }}</option>
                </select> -->

                <app-input class="app-input" type="number" placeholder="1" label="Phaseの番号" v-model="phaseModel.phaseNumber" required />
                <app-input class="app-input" type="text" placeholder="リード" label="Phaseの詳細" v-model="phaseModel.phaseDetail" required />
            </div>
            <div class="button_wrapper">
                <app-primary-button @click="registerPhase" :disabled="disabled">登録</app-primary-button>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authInteractor } from '~/driver/amplify/auth'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { ClientMast, PHASE_STATUS } from 'chillnn-sfa-abr'
import { clientMastRepository } from '~/api/modules/GraphqlClientMastRepository'
import { phaseInteractor } from '~/api'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import AppPrimaryButton from '../../components/Atom/AppPrimaryButton.vue'
import AppInput from '../../components/Atom/AppInput.vue'

@Component({
    components: {
        AppPrimaryButton,
        AppInput,
    }
})
export default class ListPage extends Vue {
    public phaseModel: PhaseModel | null  = null

    public get disabled() {
        return this.phaseModel!.phaseNumber === 0 || this.phaseModel!.phaseDetail === ''
    }

    public async created() {
        this.phaseModel = await phaseInteractor.createNewPhaseTitle()
    }

    public async registerPhase() {
        if(this.phaseModel){
            await this.phaseModel.register()
            .then(() => window.alert("登録できました"))
            .catch((e) => window.alert('失敗しました'))
            this.phaseModel =  await phaseInteractor.createNewPhaseTitle()
        }
    }
}
</script>

<style lang="stylus" scoped>
.container{
    text-align: center;
    margin-right: 30%;
    margin-left: 30%;
    .button_wrapper{
        margin-top: 5%;
    }
}
</style>