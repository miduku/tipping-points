export const state = () => ({
  timeStamp: '',
  panToNodeId: ''
})

export const mutations = {
  TO_NODE_ID(state, nodeId) {
    state.panToNodeId = nodeId
  }
}
