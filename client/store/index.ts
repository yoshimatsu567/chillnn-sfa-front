import { Store } from 'vuex'
import { initializeStores } from '~/util/store/storeAccessor'
const initializer = (store: Store<any>) => initializeStores(store)
export const plugins = [initializer]
export * from '~/util/store/storeAccessor'
