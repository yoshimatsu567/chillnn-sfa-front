<template>
  <div>
    <div class="container">
      <h2>PhaseごとのClient情報</h2>
      <div class="client_map_wrapper">
        <table>
          <tr class="phase_wrapper">
            <th class="phaseTitleList_wrapper" v-for="phaseTitle in phaseTitleList" :key="phaseTitle.phaseID">
              <div class="phaseTitle_child">
                <div>
                  Phase : {{ phaseTitle.phaseNumber }}
                </div>
                <div>
                  {{ phaseTitle.phaseDetail }}　
                </div>
              </div>
              <vertically-client-by-phase-list :phase-title="phaseTitle" />
            </th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { EventModel } from 'chillnn-sfa-abr/dist/entities/models/modules/eventModel'
import { ClientMast, Scalars, FetchClientsByPhaseInput } from 'chillnn-sfa-abr'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { clientInteractor, searchInteractor, phaseInteractor } from '~/api'
import VerticallyClientByPhaseList from '../components/Organisms/Client/VerticallyList/index.vue'

@Component({
  components:{
    VerticallyClientByPhaseList,
  }
})
export default class Top extends Vue {
  public clientModel: ClientMast[] = []
  public clientModelList: ClientMast[] = []
  public phaseTitleList: PhaseModel[] = []

  @AsyncLoadingAndErrorHandle()
  public async created(){
    this.clientModelList = await clientInteractor.fetchAllClient()
    this.phaseTitleList = await phaseInteractor.fetchAllPhase()
    this.phaseTitleList = this.phaseTitleList.filter(phaseTitle => phaseTitle.phaseStatus === 'TITLE')
  }
}
</script>

<style lang="stylus" scoped>
  .container{
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    padding: 5px;
    width: 100%;

    .client_map_wrapper{
      overflow-x: scroll;
      width: 100%;

      .phase_wrapper{
        display: flex;

        .phaseTitleList_wrapper{
          // display: block;
          font-size: 8px;
          justify-content: space-between;
          margin-top: 1%;
          // margin-bottom: 30px;
          padding-left: 1%;

          .phaseTitle_child{
            min-width: 225px;
            border-radius: 10px;
            text-align: center;
            padding: 5px;
            background-color: $LIGHTPINKCOLOR;
            margin-right: 10px;
            // background-color: $CHILLNNBrightPinkColor;
            // color: #FFFFFF
          }
        }
      }
    }
  }
</style>