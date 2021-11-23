import { IUserMastRepository, UserMast } from 'chillnn-sfa-abr'
import { callApi } from '../base'
import {
    DeleteUserMastMutation,
    DeleteUserMastMutationVariables,
    FetchAllUserQuery, //
    FetchMyUserMastQuery,
    FetchUserMastByUserIDQuery,
    FetchUserMastByUserIDQueryVariables,
    UpdateUserMastMutation,
    UpdateUserMastMutationVariables,
} from '~/driver/amplify/graphql/API'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'

class GraphqlUserMastRepository implements IUserMastRepository {
    addUserMast(_input: UserMast): Promise<UserMast> {
        throw new Error('Method not implemented.')
    }

    async updateUserMast(input: UserMast): Promise<UserMast> {
        return (
            await callApi<
                UpdateUserMastMutation,
                UpdateUserMastMutationVariables
            >(mutation.updateUserMast, {
                input,
            })
        ).updateUserMast
    }

    async deleteUserMast(userID: string): Promise<UserMast> {
        return (
            await callApi<
                DeleteUserMastMutation,
                DeleteUserMastMutationVariables
            >(mutation.deleteUserMast, {
                userID,
            })
        ).deleteUserMast
    }

    async fetchMyUserMast(): Promise<UserMast | null> {
        return (
            (await callApi<FetchMyUserMastQuery, {}>(query.fetchMyUserMast, {}))
                .fetchMyUserMast || null
        )
    }

    async fetchUserMastByUserID(userID: string): Promise<UserMast | null> {
        return (
            (
                await callApi<
                    FetchUserMastByUserIDQuery,
                    FetchUserMastByUserIDQueryVariables
                >(query.fetchUserMastByUserID, {
                    userID,
                })
            ).fetchUserMastByUserID || null
        )
    }

    async fetchAllUser(): Promise<UserMast[]> {
        return (await callApi<FetchAllUserQuery, {}>(query.fetchAllUser, {}))
            .fetchAllUser
    }

    // async fetchUsersMastByPhaseNumber(
    //     phaseNumber: number
    // ): Promise<UserMast[]> {
    //     return (
    //         await callApi<
    //             FetchUsersMastByPhaseNumberQuery,
    //             FetchUsersMastByPhaseNumberQueryVariables
    //         >(query.fetchUsersMastByPhaseNumber, {
    //             phaseNumber,
    //         })
    //     ).fetchUsersMastByPhaseNumber
    // }

    // async fetchUsersMastByPhaseDetail(
    //     phaseDetail: string
    // ): Promise<UserMast[]> {
    //     return (
    //         await callApi<
    //             FetchUsersMastByPhaseDetailQuery,
    //             FetchUsersMastByPhaseDetailQueryVariables
    //         >(query.fetchUsersMastByPhaseDetail, {
    //             phaseDetail,
    //         })
    //     ).fetchUsersMastByPhaseDetail
    // }
}

export const userMastRepository = new GraphqlUserMastRepository()
