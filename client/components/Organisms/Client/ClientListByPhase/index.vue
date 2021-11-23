<template>
	<div class="clientListByPhase_container" >
		<td class="clientCard_wrapper">
			<nuxt-link
				:to="{ name: 'client-clientID', params: { clientID: clientModel.clientID, clientModel } }"
				class="link"
				tag="div"
				v-for="(clientModel, idx) in clientModelList" :key="clientModel.clientID"
			>
				<div class="clientCard_style" v-if="clientModelList.length !== 0 && idx !== clientModelListLength && userModelList">
					<div class="chargeUserName_wrapper" >
						<div v-if="clientModel.chargeUserID === '970b7942-73d1-4583-b7f0-75a48ece7df6'" class="chargeUserName_text_style">
							吉松輝音
						</div>
						<div v-else-if="clientModel.chargeUserID !== ''" class="chargeUserName_text_style">
							若林正恭
						</div>
					</div>
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
					<client-charge-user-name :client-model="clientModel" />
					<!-- <div v-if="clientModel !== null" :fetchChargeUserName="fetchChargeUserName(clientModel.chargeUserID)" style="background-color: pink">
						{{ chargeUserName }}
					</div> -->
				</div>
			</nuxt-link>
			<div class="createNewclientCard_style" @click="onModalToggle()">
				<img class="createNewclientCard_img_style" width="50" height="50" src="~/assets/img/plus.svg" />
			</div>
		</td>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'
import { PhaseMast } from 'chillnn-sfa-abr'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { clientInteractor, userInteractor } from '~/api'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import ClientChargeUserName from '../ClientChargeUserName/index.vue'

@Component({
	components:{
		ClientChargeUserName,
	}
})
export default class ClientByPhaseList extends Vue {
	@Prop({ required: true }) phaseTitle!: PhaseModel

	public newClientModel: ClientModel | null = null
	public clientModelList: ClientModel[] | null = null
	public userModel: UserModel | null = null
	public userModelList: UserModel[] = []
	public chargeUserName: string = '未定'
	public clientModelListLength: number = 0
	public isModalToggle: boolean = false

	// async fetchChargeUserName(chargeUserID: string, idx: number){
	// 	this.userModel[idx] = await userInteractor.fetchUserModelByUserID(chargeUserID)
	// 	return this.chargeUserName[idx] = await this.userModel[idx].name
	// }

	@Emit('clientModelListLength')
	public async created() {
		this.newClientModel = await clientInteractor.createNewClient()
		this.userModelList = await userInteractor.fetchAllUser()
		this.clientModelList = await clientInteractor.fetchClientsByPhaseDetailStatus(this.phaseTitle.phaseDetail)
		if(this.clientModelList){
			this.clientModelList = this.clientModelList.filter(client => client.deletedAt === 0)
		}
		// if(this.clientModel !== null){
		// 	this.userModel = await userInteractor.fetchUserModelByUserID(this.clientModel.chargeUserID)
		// }
		if(this.clientModelList !== null)
		this.clientModelListLength = this.clientModelList.length
		return this.clientModelListLength
	}

	@AsyncLoadingAndErrorHandle()
	public async fetchChargeUserName(chargeUserID: string){
		// this.userModel = await userInteractor.fetchUserModelByUserID(chargeUserID)
		// this.chargeUserName = this.userModel.name
	}

	@Emit('onModalToggle')
	onModalToggle(){
		this.isModalToggle = true
		return this.newClientModel
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

			&:active {
				-webkit-transform: translate(0, 2px);
				-moz-transform: translate(0, 2px);
				transform: translate(0, 2px);
			}
		}

		.clientCard_style{
			border: 1px solid $borderColor;
			border-radius: 15px;
			margin-top: 30px;
			padding: 15px;
			background-color: #FFFFFF

			div{
				width: 201px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}

			.chargeUserName_wrapper{
				display: flex;
				justify-content: flex-end;

				.chargeUserName_text_style{
					background-color: $CHILLNNPURPLECOLOR
					width: 40px;
					padding: 5px;
					border-radius: 5px;
				}
			}
		}

		.createNewclientCard_style{
			border: 1px solid $borderColor;
			border-radius: 15px;
			margin-top: 30px;
			padding: 15px;
			background-color: $CREATENEWCARDBACKGROUNDCOLOR;
			height: 100px;
			// height: 75px;
			text-align: center;
			font-size: 50px;
			color: #BBBBBB;
			cursor: pointer;

			&:active {
				-webkit-transform: translate(0, 2px);
				-moz-transform: translate(0, 2px);
				transform: translate(0, 2px);
			}

			.createNewclientCard_img_style{
				height: 100px;
				// height: 75px;
			}
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