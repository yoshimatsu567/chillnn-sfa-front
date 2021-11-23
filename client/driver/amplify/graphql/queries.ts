/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteClient = /* GraphQL */ `
  query DeleteClient($clientID: ID!) {
    deleteClient(clientID: $clientID) {
      accommodationName
      appointmentStatus
      chargeUserID
      clientEmail
      clientID
      clientPhoneNumber
      clientUserName
      companyName
      createdAt
      deletedAt
      expectedSalesAmount
      homePagePotential
      newStatus
      pastStatus
      phaseDetailStatus
      phaseNumberStatus
      prefecture
      requiredTime
      updatedAt
    }
  }
`;
export const fetchAllClient = /* GraphQL */ `
  query FetchAllClient {
    fetchAllClient {
      accommodationName
      appointmentStatus
      chargeUserID
      clientEmail
      clientID
      clientPhoneNumber
      clientUserName
      companyName
      createdAt
      deletedAt
      expectedSalesAmount
      homePagePotential
      newStatus
      pastStatus
      phaseDetailStatus
      phaseNumberStatus
      prefecture
      requiredTime
      updatedAt
    }
  }
`;
export const fetchAllEvent = /* GraphQL */ `
  query FetchAllEvent {
    fetchAllEvent {
      clientID
      createdAt
      deletedAt
      editedUserID
      eventCountNumber
      eventDate
      eventDetail
      eventID
      eventMemo
      eventNumberStatus
      eventStatus
      eventTerm
      updatedAt
    }
  }
`;
export const fetchAllPhase = /* GraphQL */ `
  query FetchAllPhase {
    fetchAllPhase {
      clientID
      createdAt
      deletedAt
      editedUserID
      phaseDate
      phaseDetail
      phaseID
      phaseNumber
      phaseStatus
      phaseTerm
      updatedAt
    }
  }
`;
export const fetchAllPhaseTitle = /* GraphQL */ `
  query FetchAllPhaseTitle {
    fetchAllPhaseTitle {
      clientID
      createdAt
      deletedAt
      editedUserID
      phaseDate
      phaseDetail
      phaseID
      phaseNumber
      phaseStatus
      phaseTerm
      updatedAt
    }
  }
`;
export const fetchAllUser = /* GraphQL */ `
  query FetchAllUser {
    fetchAllUser {
      createdAt
      deletedAt
      email
      jobTitleName
      name
      phoneNumber
      updatedAt
      userID
      userStatus
    }
  }
`;
export const fetchClientByChargeUserID = /* GraphQL */ `
  query FetchClientByChargeUserID($chargeUserID: ID!) {
    fetchClientByChargeUserID(chargeUserID: $chargeUserID) {
      accommodationName
      appointmentStatus
      chargeUserID
      clientEmail
      clientID
      clientPhoneNumber
      clientUserName
      companyName
      createdAt
      deletedAt
      expectedSalesAmount
      homePagePotential
      newStatus
      pastStatus
      phaseDetailStatus
      phaseNumberStatus
      prefecture
      requiredTime
      updatedAt
    }
  }
`;
export const fetchClientByClientID = /* GraphQL */ `
  query FetchClientByClientID($clientID: ID!) {
    fetchClientByClientID(clientID: $clientID) {
      accommodationName
      appointmentStatus
      chargeUserID
      clientEmail
      clientID
      clientPhoneNumber
      clientUserName
      companyName
      createdAt
      deletedAt
      expectedSalesAmount
      homePagePotential
      newStatus
      pastStatus
      phaseDetailStatus
      phaseNumberStatus
      prefecture
      requiredTime
      updatedAt
    }
  }
`;
export const fetchClientsByContentSearch = /* GraphQL */ `
  query FetchClientsByContentSearch($phaseContent: FetchClientsByPhaseInput!) {
    fetchClientsByContentSearch(phaseContent: $phaseContent) {
      accommodationName
      appointmentStatus
      chargeUserID
      clientEmail
      clientID
      clientPhoneNumber
      clientUserName
      companyName
      createdAt
      deletedAt
      expectedSalesAmount
      homePagePotential
      newStatus
      pastStatus
      phaseDetailStatus
      phaseNumberStatus
      prefecture
      requiredTime
      updatedAt
    }
  }
`;
export const fetchClientsByPhaseDetailStatus = /* GraphQL */ `
  query FetchClientsByPhaseDetailStatus($phaseDetail: String!) {
    fetchClientsByPhaseDetailStatus(phaseDetail: $phaseDetail) {
      accommodationName
      appointmentStatus
      chargeUserID
      clientEmail
      clientID
      clientPhoneNumber
      clientUserName
      companyName
      createdAt
      deletedAt
      expectedSalesAmount
      homePagePotential
      newStatus
      pastStatus
      phaseDetailStatus
      phaseNumberStatus
      prefecture
      requiredTime
      updatedAt
    }
  }
`;
export const fetchClientsByPhaseStatus = /* GraphQL */ `
  query FetchClientsByPhaseStatus($phaseStatus: String!) {
    fetchClientsByPhaseStatus(phaseStatus: $phaseStatus) {
      accommodationName
      appointmentStatus
      chargeUserID
      clientEmail
      clientID
      clientPhoneNumber
      clientUserName
      companyName
      createdAt
      deletedAt
      expectedSalesAmount
      homePagePotential
      newStatus
      pastStatus
      phaseDetailStatus
      phaseNumberStatus
      prefecture
      requiredTime
      updatedAt
    }
  }
`;
export const fetchEventByEventID = /* GraphQL */ `
  query FetchEventByEventID($eventID: ID!) {
    fetchEventByEventID(eventID: $eventID) {
      clientID
      createdAt
      deletedAt
      editedUserID
      eventCountNumber
      eventDate
      eventDetail
      eventID
      eventMemo
      eventNumberStatus
      eventStatus
      eventTerm
      updatedAt
    }
  }
`;
export const fetchEventsByClientID = /* GraphQL */ `
  query FetchEventsByClientID($clientID: ID!) {
    fetchEventsByClientID(clientID: $clientID) {
      clientID
      createdAt
      deletedAt
      editedUserID
      eventCountNumber
      eventDate
      eventDetail
      eventID
      eventMemo
      eventNumberStatus
      eventStatus
      eventTerm
      updatedAt
    }
  }
`;
export const fetchEventsByEditedUserID = /* GraphQL */ `
  query FetchEventsByEditedUserID($editedUserID: ID!) {
    fetchEventsByEditedUserID(editedUserID: $editedUserID) {
      clientID
      createdAt
      deletedAt
      editedUserID
      eventCountNumber
      eventDate
      eventDetail
      eventID
      eventMemo
      eventNumberStatus
      eventStatus
      eventTerm
      updatedAt
    }
  }
`;
export const fetchMyUserMast = /* GraphQL */ `
  query FetchMyUserMast {
    fetchMyUserMast {
      createdAt
      deletedAt
      email
      jobTitleName
      name
      phoneNumber
      updatedAt
      userID
      userStatus
    }
  }
`;
export const fetchPhaseByPhaseID = /* GraphQL */ `
  query FetchPhaseByPhaseID($phaseID: ID!) {
    fetchPhaseByPhaseID(phaseID: $phaseID) {
      clientID
      createdAt
      deletedAt
      editedUserID
      phaseDate
      phaseDetail
      phaseID
      phaseNumber
      phaseStatus
      phaseTerm
      updatedAt
    }
  }
`;
export const fetchPhaseDataByClientID = /* GraphQL */ `
  query FetchPhaseDataByClientID($clientID: ID!) {
    fetchPhaseDataByClientID(clientID: $clientID) {
      clientID
      createdAt
      deletedAt
      editedUserID
      phaseDate
      phaseDetail
      phaseID
      phaseNumber
      phaseStatus
      phaseTerm
      updatedAt
    }
  }
`;
export const fetchPhaseDataByClientIDAndPhaseDetail = /* GraphQL */ `
  query FetchPhaseDataByClientIDAndPhaseDetail(
    $clientID: ID!
    $phaseDetail: String!
  ) {
    fetchPhaseDataByClientIDAndPhaseDetail(
      clientID: $clientID
      phaseDetail: $phaseDetail
    ) {
      clientID
      createdAt
      deletedAt
      editedUserID
      phaseDate
      phaseDetail
      phaseID
      phaseNumber
      phaseStatus
      phaseTerm
      updatedAt
    }
  }
`;
export const fetchPhaseDataByEditedUserID = /* GraphQL */ `
  query FetchPhaseDataByEditedUserID($editedUserID: ID!) {
    fetchPhaseDataByEditedUserID(editedUserID: $editedUserID) {
      clientID
      createdAt
      deletedAt
      editedUserID
      phaseDate
      phaseDetail
      phaseID
      phaseNumber
      phaseStatus
      phaseTerm
      updatedAt
    }
  }
`;
export const fetchUserMastByUserID = /* GraphQL */ `
  query FetchUserMastByUserID($userID: ID!) {
    fetchUserMastByUserID(userID: $userID) {
      createdAt
      deletedAt
      email
      jobTitleName
      name
      phoneNumber
      updatedAt
      userID
      userStatus
    }
  }
`;
