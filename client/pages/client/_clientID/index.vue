<template>
  <div class="container">
    <h2>
      Client詳細
    </h2>
    <div v-if="clientModel !== null">
      <div>
          施設名：{{ clientModel.accommodationName }}
      </div>
      <div>
          メールアドレス：{{ clientModel.clientEmail }}
      </div>
      <div>
          電話番号：{{ clientModel.clientPhoneNumber }}
      </div>
      <div>
          施設担当者名：{{ clientModel.clientUserName }}
      </div>
      <div>
          会社名：{{ clientModel.companyName }}
      </div>
      <div>
        予想流通額：{{ clientModel.expectedSalesAmount }}
      </div>
      <div>
        HPのポテンシャル：{{ clientModel.homePagePotential }}
      </div>
      <div>
        施設所在地：{{ clientModel.prefecture }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { clientInteractor } from '~/api'
import { ClientMast } from 'chillnn-sfa-abr'

@Component({
  components: {},
})
export default class ClientDetailPage extends Vue {
    public clientModel: ClientMast | ClientModel | null | string = null 

  async created() {
    if(this.$route.params.clientModel){
        this.clientModel = this.$route.params.clientModel
    }else{
        this.clientModel = await clientInteractor.fetchClientByClientID(this.$route.params.clientID)
    }
    console.log(this.$route.params)
  }
}
</script>

<style lang="stylus" scoped>
.container{
  text-align: center;
}
</style>