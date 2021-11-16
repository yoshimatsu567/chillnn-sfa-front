import { ClientMast, FetchClientsByPhaseInput } from 'chillnn-sfa-abr'
import { IClientMastRepository } from 'chillnn-sfa-abr/dist/entities/repositories/modules/clientMastRepository'
import {
    AddClientMutation,
    AddClientMutationVariables,
    FetchAllClientQuery,
    FetchClientByChargeUserIDQuery,
    FetchClientByChargeUserIDQueryVariables,
    FetchClientByClientIDQuery,
    FetchClientByClientIDQueryVariables,
    FetchClientsByContentSearchQuery,
    FetchClientsByContentSearchQueryVariables,
    FetchClientsByPhaseDetailStatusQuery,
    FetchClientsByPhaseDetailStatusQueryVariables,
    FetchClientsByPhaseNumberStatusQuery,
    FetchClientsByPhaseNumberStatusQueryVariables,
    FetchClientsByPhaseStatusQuery,
    FetchClientsByPhaseStatusQueryVariables,
    UpdateClientMutation,
    UpdateClientMutationVariables,
} from '~/driver/amplify/graphql/API'
import { callApi } from '../base'
import * as mutation from '@/driver/amplify/graphql/mutations'
import * as query from '@/driver/amplify/graphql/queries'

class GraphqlClientMastRepository implements IClientMastRepository {
    async addClient(input: ClientMast): Promise<ClientMast> {
        return (
            await callApi<AddClientMutation, AddClientMutationVariables>(
                mutation.addClient,
                {
                    input,
                }
            )
        ).addClient
    }

    async updateClient(input: ClientMast): Promise<ClientMast> {
        return (
            await callApi<UpdateClientMutation, UpdateClientMutationVariables>(
                mutation.updateClient,
                {
                    input,
                }
            )
        ).updateClient
    }

    async fetchAllClient(): Promise<ClientMast[]> {
        return (
            await callApi<FetchAllClientQuery, {}>(query.fetchAllClient, {})
        ).fetchAllClient
    }

    async fetchClientByClientID(clientID: string): Promise<ClientMast | null> {
        return (
            (
                await callApi<
                    FetchClientByClientIDQuery,
                    FetchClientByClientIDQueryVariables
                >(query.fetchClientByClientID, {
                    clientID,
                })
            ).fetchClientByClientID || null
        )
    }

    async fetchClientsByChargeUserID(
        chargeUserID: string
    ): Promise<ClientMast[]> {
        return (
            await callApi<
                FetchClientByChargeUserIDQuery,
                FetchClientByChargeUserIDQueryVariables
            >(query.fetchClientByChargeUserID, {
                chargeUserID,
            })
        ).fetchClientByChargeUserID
    }

    async fetchClientsByContentSearch(
        phaseContent: FetchClientsByPhaseInput
    ): Promise<ClientMast[]> {
        return (
            await callApi<
                FetchClientsByContentSearchQuery,
                FetchClientsByContentSearchQueryVariables
            >(query.fetchClientsByContentSearch, {
                phaseContent,
            })
        ).fetchClientsByContentSearch
    }

    async fetchClientsByPhaseStatus(
        phaseStatus: string
    ): Promise<ClientMast[]> {
        return (
            await callApi<
                FetchClientsByPhaseStatusQuery,
                FetchClientsByPhaseStatusQueryVariables
            >(query.fetchClientsByPhaseStatus, {
                phaseStatus,
            })
        ).fetchClientsByPhaseStatus
    }
    async fetchClientsByPhaseNumberStatus(
        phaseNumber: number
    ): Promise<ClientMast[]> {
        return (
            await callApi<
                FetchClientsByPhaseNumberStatusQuery,
                FetchClientsByPhaseNumberStatusQueryVariables
            >(query.fetchClientsByPhaseNumberStatus, {
                phaseNumber,
            })
        ).fetchClientsByPhaseNumberStatus
    }
    async fetchClientsByPhaseDetailStatus(
        phaseDetail: string
    ): Promise<ClientMast[]> {
        return (
            await callApi<
                FetchClientsByPhaseDetailStatusQuery,
                FetchClientsByPhaseDetailStatusQueryVariables
            >(query.fetchClientsByPhaseDetailStatus, {
                phaseDetail,
            })
        ).fetchClientsByPhaseDetailStatus
    }
}

export const clientMastRepository = new GraphqlClientMastRepository()
