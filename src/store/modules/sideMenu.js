import router, { resetRouter } from '@/router'


const state = {
  routes: []
}

const mutations = {

}

const actions = {
  changeMenu({ commit , dispatch}, key) {
    return new Promise(async resolve => {

      resetRouter()
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/changeHidden', key,{ root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

