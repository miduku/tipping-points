export const state = () => ({
  timeStamp: '',
  panToNodeId: '',
  panZoomCoords: [0, 0, 1]
})

export const mutations = {
  TO_NODE_ID(state, nodeId) {
    state.panToNodeId = nodeId
    state.timeStamp = Date.now()
  },

  GET_PANTOOM_COORDS(state, coords) {
    state.panZoomCoords = coords
  }
}
