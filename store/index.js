export const state = () => ({
  timeStamp: '',
  panToNodeId: '',
  panZoomCoords: [0, 0, 1],
  window: {
    width: 0,
    height: 0
  },
  isMounted: {
    theNavMain: false,
    theNodes: false
  }
})

export const mutations = {
  TO_NODE_ID(state, nodeId) {
    state.panToNodeId = nodeId
    state.timeStamp = Date.now()
  },

  GET_PANTOOM_COORDS(state, coords) {
    state.panZoomCoords = coords
  },

  GET_WINDOW_SIZE(state, sizes) {
    state.window.width = sizes[0]
    state.window.height = sizes[1]
  },

  SET_MOUNTED(state, set) {
    state.isMounted[set[0]] = set[1]
  }
}
