export const state = () => ({
  panToNodeId: '',
  panToNode: {
    id: '',
    timeStamp: '',
    zoomLevel: 1
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

  someNode: {
    isActive: false
  },
  someChildNode: {
    timeStamp: '',
    isActive: false,
    direction: '',
    i: ''
  },

  links: {
    impactGroups: {}
  },

  mode: {
    isInit: true,
    isTutorial: false
  }
})

export const mutations = {
  SET_MODE(state, payloadArr) {
    state.mode[payloadArr[0]] = payloadArr[1]
  },

  TO_NODE_ID(state, payloadArr) {
    state.panToNode.id = payloadArr[0]
    state.panToNode.zoomLevel = payloadArr[1] || 1
    state.panToNode.timeStamp = Date.now()
  },

  GET_PANZOOM_COORDS(state, coords) {
    state.panZoomCoords = coords
  },

  GENERATE_LINKS_IMPACT_GROUPS(state, groups) {
    state.links.impactGroups = groups
  },

  SET_LINKS_IMPACT_GROUPS(state, setArr) {
    state.links.impactGroups[setArr[0]] = setArr[1]
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
    state.someNode = payload
  },

  SET_SOME_CHILDNODE(state, payload) {
    state.someChildNode = payload
    state.someChildNode.timeStamp = Date.now()
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
