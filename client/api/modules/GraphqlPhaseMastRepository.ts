import { PhaseMast } from 'chillnn-sfa-abr'
import { IPhaseMastRepository } from 'chillnn-sfa-abr/dist/entities/repositories/modules/phaseMastRepository'
import {
    AddPhaseMutation,
    AddPhaseMutationVariables,
    DeletePhaseMutation,
    DeletePhaseMutationVariables,
    FetchAllPhaseQuery,
    FetchAllPhaseTitleQuery,
    FetchPhaseByPhaseIDQuery,
    FetchPhaseByPhaseIDQueryVariables,
    FetchPhaseDataByClientIDAndPhaseDetailQuery,
    FetchPhaseDataByClientIDAndPhaseDetailQueryVariables,
    FetchPhaseDataByClientIDQuery,
    FetchPhaseDataByClientIDQueryVariables,
    FetchPhaseDataByEditedUserIDQuery,
    FetchPhaseDataByEditedUserIDQueryVariables,
    UpdatePhaseMutation,
    UpdatePhaseMutationVariables,
} from '~/driver/amplify/graphql/API'
import { callApi } from '../base'
import * as mutation from '@/driver/amplify/graphql/mutations'
import * as query from '@/driver/amplify/graphql/queries'

class GraphqlPhaseMastRepository implements IPhaseMastRepository {
    async addPhase(input: PhaseMast): Promise<PhaseMast> {
        return (
            await callApi<AddPhaseMutation, AddPhaseMutationVariables>(
                mutation.addPhase,
                {
                    input,
                }
            )
        ).addPhase
    }

    async updatePhase(input: PhaseMast): Promise<PhaseMast> {
        return (
            await callApi<UpdatePhaseMutation, UpdatePhaseMutationVariables>(
                mutation.updatePhase,
                {
                    input,
                }
            )
        ).updatePhase
    }

    async deletePhase(phaseID: string): Promise<PhaseMast> {
        return (
            await callApi<DeletePhaseMutation, DeletePhaseMutationVariables>(
                mutation.deletePhase,
                {
                    phaseID,
                }
            )
        ).deletePhase
    }

    async fetchPhaseByPhaseID(phaseID: string): Promise<PhaseMast | null> {
        return (
            (
                await callApi<
                    FetchPhaseByPhaseIDQuery,
                    FetchPhaseByPhaseIDQueryVariables
                >(query.fetchPhaseByPhaseID, {
                    phaseID,
                })
            ).fetchPhaseByPhaseID || null
        )
    }

    async fetchPhaseDataByClientID(clientID: string): Promise<PhaseMast[]> {
        return (
            await callApi<
                FetchPhaseDataByClientIDQuery,
                FetchPhaseDataByClientIDQueryVariables
            >(query.fetchPhaseDataByClientID, {
                clientID,
            })
        ).fetchPhaseDataByClientID
    }

    async fetchPhaseDataByEditedUserID(
        editedUserID: string
    ): Promise<PhaseMast[]> {
        return (
            await callApi<
                FetchPhaseDataByEditedUserIDQuery,
                FetchPhaseDataByEditedUserIDQueryVariables
            >(query.fetchPhaseDataByEditedUserID, {
                editedUserID,
            })
        ).fetchPhaseDataByEditedUserID
    }

    async fetchPhaseDataByClientIDAndPhaseDetail(
        clientID: string,
        phaseDetail: string
    ): Promise<PhaseMast | null> {
        return (
            (
                await callApi<
                    FetchPhaseDataByClientIDAndPhaseDetailQuery,
                    FetchPhaseDataByClientIDAndPhaseDetailQueryVariables
                >(query.fetchPhaseDataByClientIDAndPhaseDetail, {
                    clientID,
                    phaseDetail,
                })
            ).fetchPhaseDataByClientIDAndPhaseDetail || null
        )
    }

    async fetchAllPhase(): Promise<PhaseMast[]> {
        return (await callApi<FetchAllPhaseQuery, {}>(query.fetchAllPhase, {}))
            .fetchAllPhase
    }

    async fetchAllPhaseTitle(): Promise<PhaseMast[]> {
        return (
            await callApi<FetchAllPhaseTitleQuery, {}>(
                query.fetchAllPhaseTitle,
                {}
            )
        ).fetchAllPhaseTitle
    }
}

export const phaseMastRepository = new GraphqlPhaseMastRepository()
