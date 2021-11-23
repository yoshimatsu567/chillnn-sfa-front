/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addClient = /* GraphQL */ `
  mutation AddClient($input: ClientMastInput!) {
    addClient(input: $input) {
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
export const addEvent = /* GraphQL */ `
  mutation AddEvent($input: EventMastInput!) {
    addEvent(input: $input) {
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
export const addPhase = /* GraphQL */ `
  mutation AddPhase($input: PhaseMastInput!) {
    addPhase(input: $input) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent($eventID: ID!) {
    deleteEvent(eventID: $eventID) {
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
export const deletePhase = /* GraphQL */ `
  mutation DeletePhase($phaseID: ID!) {
    deletePhase(phaseID: $phaseID) {
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
export const deleteUserMast = /* GraphQL */ `
  mutation DeleteUserMast($userID: ID!) {
    deleteUserMast(userID: $userID) {
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient($input: ClientMastInput!) {
    updateClient(input: $input) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent($input: EventMastInput!) {
    updateEvent(input: $input) {
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
export const updatePhase = /* GraphQL */ `
  mutation UpdatePhase($input: PhaseMastInput!) {
    updatePhase(input: $input) {
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
export const updateUserMast = /* GraphQL */ `
  mutation UpdateUserMast($input: UserMastInput!) {
    updateUserMast(input: $input) {
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
