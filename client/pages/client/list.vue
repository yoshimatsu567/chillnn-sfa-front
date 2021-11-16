<template>
    <div>
        <div class="container" v-if="clientList.length !== 0">
            <!-- <table>
                <tr class="first_row_tr">
                    <th>No.</th>
                    <th>CHILLNN担当者</th>
                    <th>会社名</th>
                    <th>施設名</th>
                    <th>担当者</th>
                    <th>都道府県</th>
                    <th>電話番号</th>
                    <th>メールアドレス</th>
                    <th class="first_row_phase_class">フェーズ</th>
                    <th>アポ</th>
                    <th>過去ステータス</th>
                    <th>新規ステータス</th>
                    <th>HPのポテンシャル</th>
                    <th>予想流通額</th>
                </tr>
                <tr class="second_row_tr">
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th class="second_row_phaseList_style" v-if="phaseTitleList.length !== 0">
                        <td v-for="phase in phaseTitleList" :key="phase.phaseID">
                            Phase {{ phase.phaseNumber }}<br/>
                            {{ phase.phaseDetail }}
                        </td>
                    </th>
                    <th v-else>
                        <td>
                            Phaseが登録されていません
                        </td>
                    </th>
                    <th>仮アポ</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr v-for="(client, idx) in clientList" :key="client.clientID">
                    <td @click="isShowModal(client)">{{ idx + 1 }}</td>
                    <td @click="isShowModal(client)">
                        <client-horizontally-list-charge-user-name v-if="client.chargeUserID !== ''" :chargeUserID="client.chargeUserID" />
                        <div v-else>無し</div>
                    </td>
                    <td @click="isShowModal(client)">{{ client.companyName }}</td>
                    <td @click="isShowModal(client)">{{ client.accommodationName }}</td>
                    <td @click="isShowModal(client)">{{ client.clientUserName }}</td>
                    <td @click="isShowModal(client)">{{ client.prefecture }}</td>
                    <td @click="isShowModal(client)">{{ client.clientPhoneNumber }}</td>
                    <td @click="isShowModal(client)">{{ client.clientEmail }}</td>
                    <td @click="isShowPhaseModal(client)" v-if="phaseTitleList.length !== 0">
                        <phase-list :propValue="isModalTogglePhase" :idx="idx" :client="client" :phaseTitleList="phaseTitleList" />
                    </td>
                    <td v-else></td>
                    <td @click="isShowModal(client)">{{ client.appointmentStatus }}</td>
                    <td @click="isShowModal(client)">{{ client.pastStatus }}</td>
                    <td @click="isShowModal(client)">{{ client.newStatus }}</td>
                    <td @click="isShowModal(client)">{{ client.homePagePotential }}</td>
                    <td @click="isShowModal(client)">{{ client.expectedSalesAmount }}</td>
                </tr>
            </table> -->
            <table>
                <tr class="first_row_tr">
                    <th>No.</th>
                    <th>CHILLNN担当者</th>
                    <th>会社名</th>
                    <th>施設名</th>
                    <th>担当者</th>
                    <th>都道府県</th>
                    <th>電話番号</th>
                    <th>メールアドレス</th>
                    <th class="first_row_phase_class">フェーズ</th>
                    <th>アポの状態</th>
                    <th>過去ステータス</th>
                    <th>新規ステータス</th>
                    <th>HPのポテンシャル</th>
                    <th>予想流通額</th>
                    <th>所要時間</th>
                </tr>
                <tr class="second_row_tr">
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th class="second_row_phaseList_style" v-if="phaseTitleList.length !== 0">
                        <td v-for="phaseTitle in phaseTitleList" :key="phaseTitle.phaseID">
                            Phase {{ phaseTitle.phaseNumber }}<br/>
                            {{ phaseTitle.phaseDetail }}
                        </td>
                    </th>
                    <th v-else>
                        <td>
                            Phaseが登録されていません
                        </td>
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr class="third_row_tr" v-for="(client, idx) in clientList" :key="client.clientID">
                    <td @click="isShowModal(client)">{{ idx + 1 }}</td>
                    <td @click="isShowModal(client)">
                        <client-horizontally-list-charge-user-name v-if="client.chargeUserID !== ''" :chargeUserID="client.chargeUserID" />
                        <div v-else>無し</div>
                    </td>
                    <td @click="isShowModal(client)">{{ client.companyName }}</td>
                    <td @click="isShowModal(client)">{{ client.accommodationName }}</td>
                    <td @click="isShowModal(client)">{{ client.clientUserName }}</td>
                    <td @click="isShowModal(client)">{{ client.prefecture }}</td>
                    <td @click="isShowModal(client)">{{ client.clientPhoneNumber }}</td>
                    <td @click="isShowModal(client)">{{ client.clientEmail }}</td>
                    <td @click="isShowPhaseModal(client)" v-if="phaseTitleList.length !== 0" class="third_row_phase_style">
                        <phase-list :propValue="isModalTogglePhase" :idx="idx" :client="client" :phaseTitleList="phaseTitleList" />
                    </td>
                    <!-- <td v-else></td> -->
                    <td>
                        <input @blur="register(client)" class="appointmentStatus_input_style" type="number" v-model="client.appointmentStatus" min="0" max="20" placeholder="0" />
                        <!-- {{ client.appointmentStatus }} -->
                    </td>
                    <td @click="isShowModal(client)">{{ client.pastStatus }}</td>
                    <td @click="isShowModal(client)">{{ client.newStatus }}</td>
                    <td @click="isShowModal(client)">{{ client.homePagePotential }}</td>
                    <td @click="isShowModal(client)">{{ client.expectedSalesAmount }}</td>
                    <td @click="isShowModal(client)">{{ client.requiredTime }}</td>
                </tr>
            </table>
        </div>
        <div v-else>Client情報はありません</div>
        <app-modal v-if="isModalToggle" :propValue="isModalToggle" :client="clientModalData">
            <div @click="isModalToggle = false" style="cursor: pointer; text-align: right; font-weight: bold; font-size: 14px;">
                ×
            </div>
        </app-modal>
        <phase-modal v-if="isModalTogglePhase" :propValue="isModalTogglePhase" :phase-title-list="phaseTitleList" :client="clientModalData">
            <div @click="isModalTogglePhase = false" style="cursor: pointer; text-align: right; z-index: 10">
                ×
            </div>
        </phase-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { authInteractor } from '~/driver/amplify/auth'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { ClientMast, PhaseMast } from 'chillnn-sfa-abr'
import { clientMastRepository } from '~/api/modules/GraphqlClientMastRepository'
import { userInteractor, clientInteractor, phaseInteractor, searchInteractor } from '~/api'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import ClientHorizontallyListChargeUserName from '../../components/Organisms/Client/HorizontallyList/index.vue'
import AppModal from '../../components/Organisms/Common/AppModal/index.vue'
import AppInput from '../../components/Atom/AppInput.vue'
import ClientModal from './modal.vue'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import AppPrimaryButton from '../../components/Atom/AppPrimaryButton.vue'
import PhaseModal from './phaseModal.vue'
import PhaseList from '../../components/Organisms/Phase/PhaseList.vue'

@Component({
    components: {
        ClientHorizontallyListChargeUserName,
        AppModal,
        AppInput,
        ClientModal,
        AppPrimaryButton,
        PhaseModal,
        PhaseList,
    }
})
export default class ListPage extends Vue {
    public clientList: ClientModel[] = []
    public phaseList: PhaseModel[] = []
    public phaseTitleList: PhaseModel[] = []
    public phaseListForClientList: PhaseModel[] = []
    public phaseListReverse: PhaseModel[] = []
    public isModalToggle: boolean = false
    public isModalTogglePhase: boolean = false
    public clientModalData: ClientModel | null = null
    public phaseModel: PhaseModel | null = null
    public phaseModelExampleListReverse: PhaseModel[] = []
    public clientModel: ClientModel | null = null
    public phaseDataList: PhaseModel[] = []
    // public selectedValue: string = ''
    
    @AsyncLoadingAndErrorHandle()
    public async created() {
        this.clientList = await clientInteractor.fetchAllClient()
        this.phaseList = await phaseInteractor.fetchAllPhase()
        this.phaseTitleList = await phaseInteractor.fetchAllPhase()
        this.phaseTitleList = this.phaseTitleList.filter(phaseModel => phaseModel.phaseStatus === 'TITLE')
        this.phaseListReverse = this.phaseList.reverse()
    }

    @AsyncLoadingAndErrorHandle()
    async createPhaseDataEachClient(){
        for(let i = 0; i < this.phaseTitleList.length; i++){
            await phaseInteractor.createNewPhaseData(this.clientList[i].clientID)
        }
    }

    @AsyncLoadingAndErrorHandle()
    async register(client: ClientModel) {
        await client.register()
        .catch(() => window.alert('編集の保存に失敗しました。再読み込み後、再度お試しください。'))
    }

    // @AsyncLoadingAndErrorHandle()
    // async fetchPhaseDataByClientIDAsync(clientID: string) {
    //     this.phaseDataList = await phaseInteractor.fetchPhaseDataByClientID(clientID)
    //     console.log(this.phaseDataList)
    // }

    // @Watch('selectedValue', {immediate: true})
    // public async fetchAllClient(){
    //     this.clientList = await clientInteractor.fetchAllClient()
    // }

    // @AsyncLoadingAndErrorHandle()
    // public async createPhaseListForClientList(){
    //     this.phaseList = await phaseInteractor.fetchAllPhase()
    //     this.phaseDataList = await this.phaseList.filter(phaseModel => phaseModel.phaseStatus === 'DATA')
    //     this.phaseTitleList = await this.phaseTitleList.filter(phaseModel => phaseModel.phaseStatus === 'TITLE').reverse()
    //     for(let i = 0; i < this.clientList.length; i++){
    //         for(let o = 0; o < this.phaseList.length; o++){
    //             if((this.phaseDataList.length < (this.clientList.length * this.phaseTitleList.length)) && this.phaseModel){
    //                 this.phaseModel = await this.clientList[i].createNewPhaseData()
    //                 this.phaseModel.clientID = this.clientList[i].clientID
    //                 this.phaseModel.phaseDetail = this.phaseList[o].phaseDetail
    //                 await this.phaseModel.register()
    //             }
    //         }
    //     }
    //     this.phaseTitleList = await phaseInteractor.fetchAllPhase()
    //     this.phaseTitleList = await this.phaseTitleList.filter(phaseModel => phaseModel.phaseStatus === 'TITLE').reverse()
    // }

    @AsyncLoadingAndErrorHandle()
    public async fetchPhaseListForClient() {
        for(let i = 0; i < this.clientList.length; i++){
            this.phaseList.filter(phaseModel => phaseModel.clientID === this.clientList[i].clientID)
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async isShowModal(client: ClientModel) {
        this.isModalToggle = true
        if(client !== null){
            return this.clientModalData = client
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async isShowPhaseModal(client: ClientModel) {
        this.isModalTogglePhase = true
        if(client !== null){
            return this.clientModalData = client
        }
    }

}
</script>

<style lang="stylus" scoped>
.container{
    padding-top: 20px;
    text-align: center;
    width: 100%;
    overflow-x: scroll;

    table{
        border-collapse: separate;
        border-spacing: 4px;
    }

    tr{
        cursor: pointer;
        &:hover{
            background-color: $lightBorderColor
        }
        &:focus{
            outline: none;
        }
    }

    .first_row_tr{
        cursor: default;
    }

    .second_row_tr{
        cursor: default;
        th{
            background-color: $CherryBlossomPinkColor
            color: $commentContentsColor
        }
        .first_row_phase_class{
            border-bottom: 1px solid $lightBorderColor
            background-color: $CHILLNNBrightPinkColor;
            color: #ffffff;
            font-size: 10px;
            min-width: 50px;
            max-width: none;
            font-weight: 100;
        }
        .second_row_phaseList_style{
            min-width: 50px;
            max-width: none;
            display: flex;
            align-items: center;

            td{
                min-width: 130px;
                border: 2px solid #FFFFFF
                // white-space: pre;
            }
        }

    }
    .third_row_phase_style{
        max-width: none;
        // min-width: 200px;
    }
    .appointmentStatus_input_style{
        border: 1px solid $lightBorderColor;
        color: $commentContentsColors;
        border-radius: 5px;
        width: 40px;

        &:focus {
            outline: 0;
            box-shadow: none;
            border: 2px solid $CHILLNNBrightPinkColor;
            background-color: #ffffff;
        }
    }
}

th{
    border-bottom: 1px solid $lightBorderColor
    background-color: $CHILLNNBrightPinkColor;
    color: #ffffff;
    font-size: 10px;
    min-width: 50px;
    max-width: 200px;
    font-weight: 100;
}

    td{
        border-bottom: 1px solid $lightBorderColor
        min-width: 50px;
        max-width: 200px;
        font-size: 10px;
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // cursor: pointer;

        &:focus{
            outline: none;
        }
        // padding: 5px;
    }
.phaseList_style{
    display: flex
}
</style>