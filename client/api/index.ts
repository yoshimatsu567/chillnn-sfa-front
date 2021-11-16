import {
    ModelFactory,
    RepositoryContainer,
    UserUsecase,
    ClientUsecase,
    SearchUsecase,
} from 'chillnn-sfa-abr'
import { clientMastRepository } from './modules/GraphqlClientMastRepository'
import { userMastRepository } from './modules/GraphqlUserMastRepository'
import { phaseMastRepository } from './modules/GraphqlPhaseMastRepository'
import { eventMastRepository } from './modules/GraphqlEventMastRepository'
import { PhaseUsecase } from 'chillnn-sfa-abr/dist/usecase/phase/phaseUsecase'
import { EventUsecase } from 'chillnn-sfa-abr/dist/usecase/event/eventUsecase'

const repositoryContainer = new RepositoryContainer(
    // s3Repository,
    userMastRepository,
    clientMastRepository,
    eventMastRepository,
    phaseMastRepository
)

const modelFactory = new ModelFactory(repositoryContainer)

// Interactor
export const userInteractor = new UserUsecase(
    repositoryContainer, //
    modelFactory
)
export const clientInteractor = new ClientUsecase(
    repositoryContainer,
    modelFactory
)
export const phaseInteractor = new PhaseUsecase(
    repositoryContainer,
    modelFactory
)
export const eventInteractor = new EventUsecase(
    repositoryContainer,
    modelFactory
)
export const searchInteractor = new SearchUsecase(
    repositoryContainer,
    modelFactory
)
