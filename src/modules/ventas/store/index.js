import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const VentasModule = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default VentasModule