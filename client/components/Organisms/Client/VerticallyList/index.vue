<template>
	<div class="clientListByPhase_container" >
		<td class="clientCard_wrapper" v-for="clientModel in clientModelList" :key="clientModel.clientID">
			<nuxt-link
				:to="{ name: 'client-clientID', params: { clientID: clientModel.clientID, clientModel } }"
				class="link"
				tag="div"
			>
				<div class="clientCard_style" v-if="clientModelList.length !== 0">
					<div>
						会社名：{{ clientModel.companyName }}
					</div>
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
					<!-- <div class="chargeUserName_text_style" :bind="fetchChargeUserName(clientModel.chargeUserID, idx)" :key="clientModel.chargeUserID">
						<div v-if="chargeUserName[idx]">
							{{ chargeUserName[idx] }}
						</div>
					</div> -->
				</div>
			</nuxt-link>
		</td>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { PhaseMast } from 'chillnn-sfa-abr'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { clientInteractor, userInteractor } from '~/api'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
@Component({})
export default class VerticallyClientByPhaseList extends Vue {
	@Prop({ required: true }) phaseTitle!: PhaseModel

	public clientModel: ClientModel | null = null
	public clientModelList: ClientModel[] = []
	public userModel: UserModel[] = []
	public chargeUserName: string[] = []

	async fetchChargeUserName(chargeUserID: string, idx: number){
		this.userModel[idx] = await userInteractor.fetchUserModelByUserID(chargeUserID)
		return this.chargeUserName[idx] = await this.userModel[idx].name
	}

	public async created() {
		this.clientModelList = await clientInteractor.fetchClientsByPhaseDetail(this.phaseTitle.phaseDetail)
		// this.chargeUserName = await userInteractor.fetchUserModelByUserID(this.clientModel.)
	}

}
</script>

<style lang="stylus" scoped>
  .clientListByPhase_container{
    // display: flex;
	max-width: 235px;
    font-size: 8px;
    justify-content: space-between;
    margin-top: 1%;
	margin-right: 0;
	margin-left: 0;
    // margin-bottom: 30px;
    // padding-left: 1%;
	
	.clientCard_wrapper{
		display: block;
		text-align: left;

		.link{
			cursor: pointer;	
		}

		.clientCard_style{
			border: 1px solid $borderColor;
			border-radius: 15px;
			margin-top: 30px;
			padding: 15px;
		}

		.chargeUserName_text_style{
			display: flex;
			justify-content: flex-end;

			div{
				border-radius: 5px;
				background-color: $CHILLNNBlueColor;
			}
		}
	}
  }
</style>