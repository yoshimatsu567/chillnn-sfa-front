import { EventMast } from 'chillnn-sfa-abr'
import {
    AddEventMutation,
    AddEventMutationVariables,
    DeleteEventMutation,
    DeleteEventMutationVariables,
    FetchAllEventQuery,
    FetchEventByEventIDQuery,
    FetchEventByEventIDQueryVariables,
    FetchEventsByClientIDQuery,
    FetchEventsByClientIDQueryVariables,
    FetchEventsByEditedUserIDQuery,
    FetchEventsByEditedUserIDQueryVariables,
    UpdateEventMutation,
    UpdateEventMutationVariables,
} from '~/driver/amplify/graphql/API'
import { callApi } from '../base'
import * as mutation from '@/driver/amplify/graphql/mutations'
import * as query from '@/driver/amplify/graphql/queries'
import { IEventMastRepository } from 'chillnn-sfa-abr/dist/entities/repositories/modules/eventMastRepository'

class GraphqlEventMastRepository implements IEventMastRepository {
    async addEvent(input: EventMast): Promise<EventMast> {
        return (
            await callApi<AddEventMutation, AddEventMutationVariables>(
                mutation.addEvent,
                {
                    input,
                }
            )
        ).addEvent
    }

    async updateEvent(input: EventMast): Promise<EventMast> {
        return (
            await callApi<UpdateEventMutation, UpdateEventMutationVariables>(
                mutation.updateEvent,
                {
                    input,
                }
            )
        ).updateEvent
    }

    async deleteEvent(eventID: string): Promise<EventMast> {
        return (
            await callApi<DeleteEventMutation, DeleteEventMutationVariables>(
                mutation.deleteEvent,
                {
                    eventID,
                }
            )
        ).deleteEvent
    }

    async fetchEventByEventID(eventID: string): Promise<EventMast | null> {
        return (
            (
                await callApi<
                    FetchEventByEventIDQuery,
                    FetchEventByEventIDQueryVariables
                >(query.fetchEventByEventID, {
                    eventID,
                })
            ).fetchEventByEventID || null
        )
    }

    async fetchEventsByClientID(clientID: string): Promise<any> {
        return (
            await callApi<
                FetchEventsByClientIDQuery,
                FetchEventsByClientIDQueryVariables
            >(query.fetchEventsByClientID, {
                clientID,
            })
        ).fetchEventsByClientID
    }

    async fetchEventsByEditedUserID(
        editedUserID: string
    ): Promise<EventMast[]> {
        return (
            await callApi<
                FetchEventsByEditedUserIDQuery,
                FetchEventsByEditedUserIDQueryVariables
            >(query.fetchEventsByClientID, {
                editedUserID,
            })
        ).fetchEventsByEditedUserID
    }

    async fetchAllEvent(): Promise<EventMast[]> {
        return (await callApi<FetchAllEventQuery, {}>(query.fetchAllEvent, {}))
            .fetchAllEvent
    }
}

export const eventMastRepository = new GraphqlEventMastRepository()
