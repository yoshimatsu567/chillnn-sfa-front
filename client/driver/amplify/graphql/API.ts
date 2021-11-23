/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ClientMastInput = {
  accommodationName: string,
  appointmentStatus?: string | null,
  chargeUserID?: string | null,
  clientEmail: string,
  clientID: string,
  clientPhoneNumber?: string | null,
  clientUserName?: string | null,
  companyName?: string | null,
  createdAt: number,
  deletedAt?: number | null,
  expectedSalesAmount?: string | null,
  homePagePotential?: string | null,
  newStatus?: string | null,
  pastStatus?: string | null,
  phaseDetailStatus?: string | null,
  phaseNumberStatus?: number | null,
  prefecture?: string | null,
  requiredTime?: string | null,
  updatedAt: number,
};

export type ClientMast = {
  __typename: "ClientMast",
  accommodationName: string,
  appointmentStatus?: string | null,
  chargeUserID?: string | null,
  clientEmail: string,
  clientID: string,
  clientPhoneNumber?: string | null,
  clientUserName?: string | null,
  companyName?: string | null,
  createdAt: number,
  deletedAt?: number | null,
  expectedSalesAmount?: string | null,
  homePagePotential?: string | null,
  newStatus?: string | null,
  pastStatus?: string | null,
  phaseDetailStatus?: string | null,
  phaseNumberStatus?: number | null,
  prefecture?: string | null,
  requiredTime?: string | null,
  updatedAt: number,
};

export type EventMastInput = {
  clientID: string,
  createdAt: number,
  deletedAt?: number | null,
  editedUserID?: string | null,
  eventCountNumber: number,
  eventDate?: string | null,
  eventDetail: string,
  eventID: string,
  eventMemo?: string | null,
  eventNumberStatus: number,
  eventStatus: EVENT_STATUS,
  eventTerm?: string | null,
  updatedAt: number,
};

export enum EVENT_STATUS {
  CONTACT = "CONTACT",
  DEAD = "DEAD",
  REACTION = "REACTION",
}


export type EventMast = {
  __typename: "EventMast",
  clientID: string,
  createdAt: number,
  deletedAt?: number | null,
  editedUserID?: string | null,
  eventCountNumber: number,
  eventDate?: string | null,
  eventDetail: string,
  eventID: string,
  eventMemo?: string | null,
  eventNumberStatus: number,
  eventStatus: EVENT_STATUS,
  eventTerm?: string | null,
  updatedAt: number,
};

export type PhaseMastInput = {
  clientID?: string | null,
  createdAt?: number | null,
  deletedAt?: number | null,
  editedUserID?: string | null,
  phaseDate?: string | null,
  phaseDetail: string,
  phaseID: string,
  phaseNumber: number,
  phaseStatus: PHASE_STATUS,
  phaseTerm?: string | null,
  updatedAt?: number | null,
};

export enum PHASE_STATUS {
  DATA = "DATA",
  DEAD = "DEAD",
  TITLE = "TITLE",
}


export type PhaseMast = {
  __typename: "PhaseMast",
  clientID?: string | null,
  createdAt?: number | null,
  deletedAt?: number | null,
  editedUserID?: string | null,
  phaseDate?: string | null,
  phaseDetail: string,
  phaseID: string,
  phaseNumber: number,
  phaseStatus: PHASE_STATUS,
  phaseTerm?: string | null,
  updatedAt?: number | null,
};

export type UserMast = {
  __typename: "UserMast",
  createdAt: number,
  deletedAt?: number | null,
  email: string,
  jobTitleName?: string | null,
  name: string,
  phoneNumber?: string | null,
  updatedAt: number,
  userID: string,
  userStatus: string,
};

export type UserMastInput = {
  createdAt: number,
  deletedAt?: number | null,
  email: string,
  jobTitleName?: string | null,
  name: string,
  phoneNumber?: string | null,
  updatedAt: number,
  userID: string,
  userStatus: string,
};

export type FetchClientsByPhaseInput = {
  phaseDetail: string,
  phaseNumber: number,
  phaseStatus: string,
};

export type AddClientMutationVariables = {
  input: ClientMastInput,
};

export type AddClientMutation = {
  addClient:  {
    __typename: "ClientMast",
    accommodationName: string,
    appointmentStatus?: string | null,
    chargeUserID?: string | null,
    clientEmail: string,
    clientID: string,
    clientPhoneNumber?: string | null,
    clientUserName?: string | null,
    companyName?: string | null,
    createdAt: number,
    deletedAt?: number | null,
    expectedSalesAmount?: string | null,
    homePagePotential?: string | null,
    newStatus?: string | null,
    pastStatus?: string | null,
    phaseDetailStatus?: string | null,
    phaseNumberStatus?: number | null,
    prefecture?: string | null,
    requiredTime?: string | null,
    updatedAt: number,
  },
};

export type AddEventMutationVariables = {
  input: EventMastInput,
};

export type AddEventMutation = {
  addEvent:  {
    __typename: "EventMast",
    clientID: string,
    createdAt: number,
    deletedAt?: number | null,
    editedUserID?: string | null,
    eventCountNumber: number,
    eventDate?: string | null,
    eventDetail: string,
    eventID: string,
    eventMemo?: string | null,
    eventNumberStatus: number,
    eventStatus: EVENT_STATUS,
    eventTerm?: string | null,
    updatedAt: number,
  },
};

export type AddPhaseMutationVariables = {
  input: PhaseMastInput,
};

export type AddPhaseMutation = {
  addPhase:  {
    __typename: "PhaseMast",
    clientID?: string | null,
    createdAt?: number | null,
    deletedAt?: number | null,
    editedUserID?: string | null,
    phaseDate?: string | null,
    phaseDetail: string,
    phaseID: string,
    phaseNumber: number,
    phaseStatus: PHASE_STATUS,
    phaseTerm?: string | null,
    updatedAt?: number | null,
  },
};

export type DeleteEventMutationVariables = {
  eventID: string,
};

export type DeleteEventMutation = {
  deleteEvent:  {
    __typename: "EventMast",
    clientID: string,
    createdAt: number,
    deletedAt?: number | null,
    editedUserID?: string | null,
    eventCountNumber: number,
    eventDate?: string | null,
    eventDetail: string,
    eventID: string,
    eventMemo?: string | null,
    eventNumberStatus: number,
    eventStatus: EVENT_STATUS,
    eventTerm?: string | null,
    updatedAt: number,
  },
};

export type DeletePhaseMutationVariables = {
  phaseID: string,
};

export type DeletePhaseMutation = {
  deletePhase:  {
    __typename: "PhaseMast",
    clientID?: string | null,
    createdAt?: number | null,
    deletedAt?: number | null,
    editedUserID?: string | null,
    phaseDate?: string | null,
    phaseDetail: string,
    phaseID: string,
    phaseNumber: number,
    phaseStatus: PHASE_STATUS,
    phaseTerm?: string | null,
    updatedAt?: number | null,
  },
};

export type DeleteUserMastMutationVariables = {
  userID: string,
};

export type DeleteUserMastMutation = {
  deleteUserMast:  {
    __typename: "UserMast",
    createdAt: number,
    deletedAt?: number | null,
    email: string,
    jobTitleName?: string | null,
    name: string,
    phoneNumber?: string | null,
    updatedAt: number,
    userID: string,
    userStatus: string,
  },
};

export type UpdateClientMutationVariables = {
  input: ClientMastInput,
};

export type UpdateClientMutation = {
  updateClient:  {
    __typename: "ClientMast",
    accommodationName: string,
    appointmentStatus?: string | null,
    chargeUserID?: string | null,
    clientEmail: string,
    clientID: string,
    clientPhoneNumber?: string | null,
    clientUserName?: string | null,
    companyName?: string | null,
    createdAt: number,
    deletedAt?: number | null,
    expectedSalesAmount?: string | null,
    homePagePotential?: string | null,
    newStatus?: string | null,
    pastStatus?: string | null,
    phaseDetailStatus?: string | null,
    phaseNumberStatus?: number | null,
    prefecture?: string | null,
    requiredTime?: string | null,
    updatedAt: number,
  },
};

export type UpdateEventMutationVariables = {
  input: EventMastInput,
};

export type UpdateEventMutation = {
  updateEvent:  {
    __typename: "EventMast",
    clientID: string,
    createdAt: number,
    deletedAt?: number | null,
    editedUserID?: string | null,
    eventCountNumber: number,
    eventDate?: string | null,
    eventDetail: string,
    eventID: string,
    eventMemo?: string | null,
    eventNumberStatus: number,
    eventStatus: EVENT_STATUS,
    eventTerm?: string | null,
    updatedAt: number,
  },
};

export type UpdatePhaseMutationVariables = {
  input: PhaseMastInput,
};

export type UpdatePhaseMutation = {
  updatePhase:  {
    __typename: "PhaseMast",
    clientID?: string | null,
    createdAt?: number | null,
    deletedAt?: number | null,
    editedUserID?: string | null,
    phaseDate?: string | null,
    phaseDetail: string,
    phaseID: string,
    phaseNumber: number,
    phaseStatus: PHASE_STATUS,
    phaseTerm?: string | null,
    updatedAt?: number | null,
  },
};

export type UpdateUserMastMutationVariables = {
  input: UserMastInput,
};

export type UpdateUserMastMutation = {
  updateUserMast:  {
    __typename: "UserMast",
    createdAt: number,
    deletedAt?: number | null,
    email: string,
    jobTitleName?: string | null,
    name: string,
    phoneNumber?: string | null,
    updatedAt: number,
    userID: string,
    userStatus: string,
  },
};

export type DeleteClientQueryVariables = {
  clientID: string,
};

export type DeleteClientQuery = {
  deleteClient?:  {
    __typename: "ClientMast",
    accommodationName: string,
    appointmentStatus?: string | null,
    chargeUserID?: string | null,
    clientEmail: string,
    clientID: string,
    clientPhoneNumber?: string | null,
    clientUserName?: string | null,
    companyName?: string | null,
    createdAt: number,
    deletedAt?: number | null,
    expectedSalesAmount?: string | null,
    homePagePotential?: string | null,
    newStatus?: string | null,
    pastStatus?: string | null,
    phaseDetailStatus?: string | null,
    phaseNumberStatus?: number | null,
    prefecture?: string | null,
    requiredTime?: string | null,
    updatedAt: number,
  } | null,
};

export type FetchAllClientQuery = {
  fetchAllClient:  Array< {
    __typename: "ClientMast",
    accommodationName: string,
    appointmentStatus?: string | null,
    chargeUserID?: string | null,
    clientEmail: string,
    clientID: string,
    clientPhoneNumber?: string | null,
    clientUserName?: string | null,
    companyName?: string | null,
    createdAt: number,
    deletedAt?: number | null,
    expectedSalesAmount?: string | null,
    homePagePotential?: string | null,
    newStatus?: string | null,
    pastStatus?: string | null,
    phaseDetailStatus?: string | null,
    phaseNumberStatus?: number | null,
    prefecture?: string | null,
    requiredTime?: string | null,
    updatedAt: number,
  } >,
};

export type FetchAllEventQuery = {
  fetchAllEvent:  Array< {
    __typename: "EventMast",
    clientID: string,
    createdAt: number,
    deletedAt?: number | null,
    editedUserID?: string | null,
    eventCountNumber: number,
    eventDate?: string | null,
    eventDetail: string,
    eventID: string,
    eventMemo?: string | null,
    eventNumberStatus: number,
    eventStatus: EVENT_STATUS,
    eventTerm?: string | null,
    updatedAt: number,
  } >,
};

export type FetchAllPhaseQuery = {
  fetchAllPhase:  Array< {
    __typename: "PhaseMast",
    clientID?: string | null,
    createdAt?: number | null,
    deletedAt?: number | null,
    editedUserID?: string | null,
    phaseDate?: string | null,
    phaseDetail: string,
    phaseID: string,
    phaseNumber: number,
    phaseStatus: PHASE_STATUS,
    phaseTerm?: string | null,
    updatedAt?: number | null,
  } >,
};

export type FetchAllPhaseTitleQuery = {
  fetchAllPhaseTitle:  Array< {
    __typename: "PhaseMast",
    clientID?: string | null,
    createdAt?: number | null,
    deletedAt?: number | null,
    editedUserID?: string | null,
    phaseDate?: string | null,
    phaseDetail: string,
    phaseID: string,
    phaseNumber: number,
    phaseStatus: PHASE_STATUS,
    phaseTerm?: string | null,
    updatedAt?: number | null,
  } >,
};

export type FetchAllUserQuery = {
  fetchAllUser:  Array< {
    __typename: "UserMast",
    createdAt: number,
    deletedAt?: number | null,
    email: string,
    jobTitleName?: string | null,
    name: string,
    phoneNumber?: string | null,
    updatedAt: number,
    userID: string,
    userStatus: string,
  } >,
};

export type FetchClientByChargeUserIDQueryVariables = {
  chargeUserID: string,
};

export type FetchClientByChargeUserIDQuery = {
  fetchClientByChargeUserID:  Array< {
    __typename: "ClientMast",
    accommodationName: string,
    appointmentStatus?: string | null,
    chargeUserID?: string | null,
    clientEmail: string,
    clientID: string,
    clientPhoneNumber?: string | null,
    clientUserName?: string | null,
    companyName?: string | null,
    createdAt: number,
    deletedAt?: number | null,
    expectedSalesAmount?: string | null,
    homePagePotential?: string | null,
    newStatus?: string | null,
    pastStatus?: string | null,
    phaseDetailStatus?: string | null,
    phaseNumberStatus?: number | null,
    prefecture?: string | null,
    requiredTime?: string | null,
    updatedAt: number,
  } >,
};

export type FetchClientByClientIDQueryVariables = {
  clientID: string,
};

export type FetchClientByClientIDQuery = {
  fetchClientByClientID?:  {
    __typename: "ClientMast",
    accommodationName: string,
    appointmentStatus?: string | null,
    chargeUserID?: string | null,
    clientEmail: string,
    clientID: string,
    clientPhoneNumber?: string | null,
    clientUserName?: string | null,
    companyName?: string | null,
    createdAt: number,
    deletedAt?: number | null,
    expectedSalesAmount?: string | null,
    homePagePotential?: string | null,
    newStatus?: string | null,
    pastStatus?: string | null,
    phaseDetailStatus?: string | null,
    phaseNumberStatus?: number | null,
    prefecture?: string | null,
    requiredTime?: string | null,
    updatedAt: number,
  } | null,
};

export type FetchClientsByContentSearchQueryVariables = {
  phaseContent: FetchClientsByPhaseInput,
};

export type FetchClientsByContentSearchQuery = {
  fetchClientsByContentSearch:  Array< {
    __typename: "ClientMast",
    accommodationName: string,
    appointmentStatus?: string | null,
    chargeUserID?: string | null,
    clientEmail: string,
    clientID: string,
    clientPhoneNumber?: string | null,
    clientUserName?: string | null,
    companyName?: string | null,
    createdAt: number,
    deletedAt?: number | null,
    expectedSalesAmount?: string | null,
    homePagePotential?: string | null,
    newStatus?: string | null,
    pastStatus?: string | null,
    phaseDetailStatus?: string | null,
    phaseNumberStatus?: number | null,
    prefecture?: string | null,
    requiredTime?: string | null,
    updatedAt: number,
  } >,
};

export type FetchClientsByPhaseDetailStatusQueryVariables = {
  phaseDetail: string,
};

export type FetchClientsByPhaseDetailStatusQuery = {
  fetchClientsByPhaseDetailStatus?:  Array< {
    __typename: "ClientMast",
    accommodationName: string,
    appointmentStatus?: string | null,
    chargeUserID?: string | null,
    clientEmail: string,
    clientID: string,
    clientPhoneNumber?: string | null,
    clientUserName?: string | null,
    companyName?: string | null,
    createdAt: number,
    deletedAt?: number | null,
    expectedSalesAmount?: string | null,
    homePagePotential?: string | null,
    newStatus?: string | null,
    pastStatus?: string | null,
    phaseDetailStatus?: string | null,
    phaseNumberStatus?: number | null,
    prefecture?: string | null,
    requiredTime?: string | null,
    updatedAt: number,
  } | null > | null,
};

export type FetchClientsByPhaseStatusQueryVariables = {
  phaseStatus: string,
};

export type FetchClientsByPhaseStatusQuery = {
  fetchClientsByPhaseStatus:  Array< {
    __typename: "ClientMast",
    accommodationName: string,
    appointmentStatus?: string | null,
    chargeUserID?: string | null,
    clientEmail: string,
    clientID: string,
    clientPhoneNumber?: string | null,
    clientUserName?: string | null,
    companyName?: string | null,
    createdAt: number,
    deletedAt?: number | null,
    expectedSalesAmount?: string | null,
    homePagePotential?: string | null,
    newStatus?: string | null,
    pastStatus?: string | null,
    phaseDetailStatus?: string | null,
    phaseNumberStatus?: number | null,
    prefecture?: string | null,
    requiredTime?: string | null,
    updatedAt: number,
  } >,
};

export type FetchEventByEventIDQueryVariables = {
  eventID: string,
};

export type FetchEventByEventIDQuery = {
  fetchEventByEventID?:  {
    __typename: "EventMast",
    clientID: string,
    createdAt: number,
    deletedAt?: number | null,
    editedUserID?: string | null,
    eventCountNumber: number,
    eventDate?: string | null,
    eventDetail: string,
    eventID: string,
    eventMemo?: string | null,
    eventNumberStatus: number,
    eventStatus: EVENT_STATUS,
    eventTerm?: string | null,
    updatedAt: number,
  } | null,
};

export type FetchEventsByClientIDQueryVariables = {
  clientID: string,
};

export type FetchEventsByClientIDQuery = {
  fetchEventsByClientID?:  Array< {
    __typename: "EventMast",
    clientID: string,
    createdAt: number,
    deletedAt?: number | null,
    editedUserID?: string | null,
    eventCountNumber: number,
    eventDate?: string | null,
    eventDetail: string,
    eventID: string,
    eventMemo?: string | null,
    eventNumberStatus: number,
    eventStatus: EVENT_STATUS,
    eventTerm?: string | null,
    updatedAt: number,
  } | null > | null,
};

export type FetchEventsByEditedUserIDQueryVariables = {
  editedUserID: string,
};

export type FetchEventsByEditedUserIDQuery = {
  fetchEventsByEditedUserID:  Array< {
    __typename: "EventMast",
    clientID: string,
    createdAt: number,
    deletedAt?: number | null,
    editedUserID?: string | null,
    eventCountNumber: number,
    eventDate?: string | null,
    eventDetail: string,
    eventID: string,
    eventMemo?: string | null,
    eventNumberStatus: number,
    eventStatus: EVENT_STATUS,
    eventTerm?: string | null,
    updatedAt: number,
  } >,
};

export type FetchMyUserMastQuery = {
  fetchMyUserMast?:  {
    __typename: "UserMast",
    createdAt: number,
    deletedAt?: number | null,
    email: string,
    jobTitleName?: string | null,
    name: string,
    phoneNumber?: string | null,
    updatedAt: number,
    userID: string,
    userStatus: string,
  } | null,
};

export type FetchPhaseByPhaseIDQueryVariables = {
  phaseID: string,
};

export type FetchPhaseByPhaseIDQuery = {
  fetchPhaseByPhaseID?:  {
    __typename: "PhaseMast",
    clientID?: string | null,
    createdAt?: number | null,
    deletedAt?: number | null,
    editedUserID?: string | null,
    phaseDate?: string | null,
    phaseDetail: string,
    phaseID: string,
    phaseNumber: number,
    phaseStatus: PHASE_STATUS,
    phaseTerm?: string | null,
    updatedAt?: number | null,
  } | null,
};

export type FetchPhaseDataByClientIDQueryVariables = {
  clientID: string,
};

export type FetchPhaseDataByClientIDQuery = {
  fetchPhaseDataByClientID:  Array< {
    __typename: "PhaseMast",
    clientID?: string | null,
    createdAt?: number | null,
    deletedAt?: number | null,
    editedUserID?: string | null,
    phaseDate?: string | null,
    phaseDetail: string,
    phaseID: string,
    phaseNumber: number,
    phaseStatus: PHASE_STATUS,
    phaseTerm?: string | null,
    updatedAt?: number | null,
  } >,
};

export type FetchPhaseDataByClientIDAndPhaseDetailQueryVariables = {
  clientID: string,
  phaseDetail: string,
};

export type FetchPhaseDataByClientIDAndPhaseDetailQuery = {
  fetchPhaseDataByClientIDAndPhaseDetail?:  {
    __typename: "PhaseMast",
    clientID?: string | null,
    createdAt?: number | null,
    deletedAt?: number | null,
    editedUserID?: string | null,
    phaseDate?: string | null,
    phaseDetail: string,
    phaseID: string,
    phaseNumber: number,
    phaseStatus: PHASE_STATUS,
    phaseTerm?: string | null,
    updatedAt?: number | null,
  } | null,
};

export type FetchPhaseDataByEditedUserIDQueryVariables = {
  editedUserID: string,
};

export type FetchPhaseDataByEditedUserIDQuery = {
  fetchPhaseDataByEditedUserID:  Array< {
    __typename: "PhaseMast",
    clientID?: string | null,
    createdAt?: number | null,
    deletedAt?: number | null,
    editedUserID?: string | null,
    phaseDate?: string | null,
    phaseDetail: string,
    phaseID: string,
    phaseNumber: number,
    phaseStatus: PHASE_STATUS,
    phaseTerm?: string | null,
    updatedAt?: number | null,
  } >,
};

export type FetchUserMastByUserIDQueryVariables = {
  userID: string,
};

export type FetchUserMastByUserIDQuery = {
  fetchUserMastByUserID?:  {
    __typename: "UserMast",
    createdAt: number,
    deletedAt?: number | null,
    email: string,
    jobTitleName?: string | null,
    name: string,
    phoneNumber?: string | null,
    updatedAt: number,
    userID: string,
    userStatus: string,
  } | null,
};
