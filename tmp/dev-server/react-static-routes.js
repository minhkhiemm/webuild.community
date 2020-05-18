
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { cleanPath } from 'react-static'


import t_0 from '../../src/containers/home'
import t_1 from '../../src/containers/chat'
import t_2 from '../../src/containers/404'

// Template Map
global.componentsByTemplateID = global.componentsByTemplateID || [
  t_0,
t_1,
t_2
]

const defaultTemplateIDs = {
  '404': 2
}

// Template Tree
global.templateIDsByPath = global.templateIDsByPath || defaultTemplateIDs

// Get template for given path
const getComponentForPath = path => {
  path = cleanPath(path)
  return global.componentsByTemplateID[global.templateIDsByPath[path]]
}

global.reactStaticGetComponentForPath = getComponentForPath
global.reactStaticRegisterTemplateIDForPath = (path, id) => {
  global.templateIDsByPath[path] = id
}
global.clearTemplateIDs = () => {
  global.templateIDsByPath = defaultTemplateIDs
}

export default class Routes extends Component {
  componentDidMount () {
    global.clearTemplateIDs = () => {
      this.setState({})
    }
    
    if (typeof document !== 'undefined' && module.hot) {
      module.hot.accept('../../src/containers/home', () => {
            global.componentsByTemplateID[0] = require('../../src/containers/home').default
            this.forceUpdate()
          })
module.hot.accept('../../src/containers/chat', () => {
            global.componentsByTemplateID[1] = require('../../src/containers/chat').default
            this.forceUpdate()
          })
module.hot.accept('../../src/containers/404', () => {
            global.componentsByTemplateID[2] = require('../../src/containers/404').default
            this.forceUpdate()
          })
      }


  }
  render () {
    const { component: Comp, render, children } = this.props

    const getFullComponentForPath = path => {
      let Comp = getComponentForPath(path)
      let is404 = path === '404'
      if (!Comp) {
        is404 = true
        Comp = getComponentForPath('/404')
      }
      return (newProps = {}) => (
        Comp
          ? <Comp {...newProps} {...(is404 ? {is404: true} : {})} />
          : null
      )
    }

    const renderProps = {
      componentsByTemplateID: global.componentsByTemplateID,
      templateIDsByPath: global.templateIDsByPath,
      getComponentForPath: getFullComponentForPath
    }

    if (Comp) {
      return (
        <Comp
          {...renderProps}
        />
      )
    }

    if (render || children) {
      return (render || children)(renderProps)
    }

    // This is the default auto-routing renderer
    return (
      <Route render={props => {
        let Comp = getFullComponentForPath(props.location.pathname)
        // If Comp is used as a component here, it triggers React to re-mount the entire
        // component tree underneath during reconciliation, losing all internal state.
        // By unwrapping it here we keep the real, static component exposed directly to React.
        return Comp && Comp()
      }} />
    )
  }
}

