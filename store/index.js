export const state = () => ({
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
  sidebarSources: {
    isOpen: false,
    toId: ''
  },
  someNodeIsActive: false,
  impactLinksGroups: {},
  mode: {
    isInit: true,
    isTutorial: false
  }
})

export const mutations = {
  SET_MODE(state, payloadArr) {
    state.mode[payloadArr[0]] = payloadArr[1]
  },

  TO_NODE_ID(state, nodeId) {
    state.panToNode.id = nodeId
    state.panToNode.timeStamp = Date.now()
  },

  GET_PANZOOM_COORDS(state, coords) {
    state.panZoomCoords = coords
  },

  CREATE_IMPACT_LINKS_GROUPS(state, groups) {
    state.impactLinksGroups = groups
  },

  SET_MOUNTED(state, setArr) {
    state.isMounted[setArr[0]] = setArr[1]
  },

  SET_SIDEBAR(state, openArr) {
    state.sidebar.isOpen = openArr[0]
    // if (openArr[0] === true) state.sidebar.contentInstanceName = openArr[1]
    state.sidebar.contentInstanceName = openArr[1]
  },

  SET_SIDEBARSOURCES(state, openArr) {
    state.sidebarSources.isOpen = openArr[0]
    state.sidebarSources.toId = openArr[1]
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
