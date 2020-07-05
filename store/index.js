export const state = () => ({
  timeStamp: '',
  panToNodeId: '',
  panToNode: {
    id: '',
    timeStamp: ''
  },
  panZoomCoords: [0, 0, 1],
  newZoomLevel: {
    level: 1,
    timeStamp: ''
  },
  viewSize: {
    width: 0,
    height: 0
  },
  isMapVisible: true,
  isPanning: false,
  isMounted: {
    theNavMain: false,
    theNodes: false
  },
  sidebar: {
    isOpen: false,
    contentInstanceName: ''
  },
  someNodeIsActive: false,
  impactLinksGroups: {}
})

export const mutations = {
  TO_NODE_ID(state, nodeId) {
    state.panToNode.id = nodeId
    state.panToNode.timeStamp = Date.now()
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
    // if (openArr[0] === true) state.sidebar.contentInstanceName = openArr[1]
    state.sidebar.contentInstanceName = openArr[1]
  },

  CREATE_IMPACT_LINKS_GROUPS(state, groups) {
    state.impactLinksGroups = groups
  },

  SET_SOME_NODE(state, payload) {
    state.someNodeIsActive = payload
  },

  SET_IMPACT_LINKS_GROUPS(state, setArr) {
    state.impactLinksGroups[setArr[0]] = setArr[1]
  },

  SET_NEW_ZOOM_LEVEL(state, payload) {
    state.newZoomLevel.level = payload
    state.newZoomLevel.timeStamp = Date.now()
  },

  SET_PANNING(state, payload) {
    state.isPanning = payload
  },

  SET_MAP_VISIBLE(state, payload) {
    state.isMapVisible = payload
  }
}
