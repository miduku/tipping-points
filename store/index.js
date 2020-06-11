export const state = () => ({
  timeStamp: '',
  panToNodeId: '',
  panZoomCoords: [0, 0, 1],
  viewSize: {
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
  },
  impactLinksGroups: {}
})

export const mutations = {
  TO_NODE_ID(state, nodeId) {
    state.panToNodeId = nodeId
    state.timeStamp = Date.now()
  },

  GET_PANZOOM_COORDS(state, coords) {
    state.panZoomCoords = coords
  },

  GET_VIEW_SIZE(state, sizes) {
    state.viewSize.width = sizes[0]
    state.viewSize.height = sizes[1]
  },

  SET_MOUNTED(state, setArr) {
    state.isMounted[setArr[0]] = setArr[1]
  },

  OPEN_SIDEBAR(state, openArr) {
    state.sidebar.isOpen = openArr[0]
    if (openArr[0] === true) state.sidebar.contentInstanceName = openArr[1]
  },

  CREATE_IMPACT_LINKS_GROUPS(state, groups) {
    state.impactLinksGroups = groups
  },

  SET_IMPACT_LINKS_GROUPS(state, setArr) {
    state.impactLinksGroups[setArr[0]] = setArr[1]
  }
}
