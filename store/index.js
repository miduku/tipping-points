export const state = () => ({
  timeStamp: '',
  panToNodeId: '',
  panZoomCoords: [0, 0, 1],
  elementSize: {
    width: 0,
    height: 0
  },
  isMounted: {
    theNavMain: false,
    theNodes: false
  },
  sidebar: {
    isOpen: false,
    contentInstanceName: ''
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

  GET_ELEMENT_SIZE(state, sizes) {
    state.elementSize.width = sizes[0]
    state.elementSize.height = sizes[1]
  },

  SET_MOUNTED(state, set) {
    state.isMounted[set[0]] = set[1]
  },

  OPEN_SIDEBAR(state, openArr) {
    state.sidebar.isOpen = openArr[0]
    if (openArr[0] === true) state.sidebar.contentInstanceName = openArr[1]
  }
}
