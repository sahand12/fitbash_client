// @flow
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalPortal from './ModalPortal';
import * as ariaAppHider from '../helpers/ariaAppHider';
import SafeHTMLElement, {canUseDom} from '../helpers/safeHTMLElement';

export const portalClassName = 'ReactModalPortal';
export const bodyOpenClassName = 'ReactModal__Body--open';

const isReact16 = ReactDOM.createPortal !== undefined;
const createPortal = isReact16
  ? ReactDOM.createPortal
  : ReactDOM.unstable_renderSubtreeIntoContainer;

function getParentElement(parentSelector) {
  return parentSelector();
}

type Props = {
  isOpen: boolean,
  style: {
    content: {},
    overlay: {}
  },
  portalClassName: string,
  bodyOpenClassName: string,
  className: string | {base: string, afterOpen: string, beforeClose: string},
  overlayClassName: string | {base: string, afterOpen: string, beforeClose: string},
  appElement: typeof SafeHTMLElement,
  onAfterOpen: Function,
  onRequestClose: Function,
  closeTimeoutMS: number,
  ariaHideApp: boolean,
  shouldFocusAfterRender: boolean,
  shouldCloseOnOverlayClick: boolean,
  shouldReturnFocusAfterClose: boolean,
  parentSelector: Function,
  aria: {},
  role: string,
  contentLabel: string,
  shouldCloseOnEsc: boolean,
}
export default class Modal extends Component<Props> {
  static defaultProps = {
    isOpen: false,
    portalClassName,
    bodyOpenClassName,
    ariaHideApp: true,
    closeTimeoutMS: 0,
    shouldFocusAfterRender: true,
    shouldCloseOnEsc: true,
    shouldCloseOnOverlayClick: true,
    shouldReturnFocusAfterClose: true,
    parentSelector() {
      return document.body;
    }
  };
  
  static defaultStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '40px',
      right: '40px',
      left: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  };
  
  static setAppElement(element) {
    ariaAppHider.setElement(element);
  }
  
  componentDidMount() {
    if (!canUseDom) return;
    
    if (!isReact16) {
      this.node = document.createElement('div');
    }
    this.node.className = this.props.portalClassName;
    
    const parent = getParentElement(this.props.parentSelector);
    parent.appendChild(this.node);
    
    !isReact16 && this.renderPortal(this.props);
  }
  
  componentWillReceiveProps(newProps) {
    if (!canUseDom) return;
    const {isOpen} = newProps;
    // Stop unnecessary renders if modal is remaining closed
    if (!this.props.isOpen && !isOpen) return;
    
    const currentParent = getParentElement(this.props.parentSelector);
    const newParent = getParentElement(newProps.parentSelector);
    
    if (newParent !== currentParent) {
      currentParent.removeChild(this.node);
      newParent.appendChild(this.node);
    }
    
    !isReact16 && this.renderPortal(newProps);
  }
  
  componentWillUpdate(newProps) {
    if (!canUseDom) return;
    if (newProps.portalClassName !== this.props.portalClassName) {
      this.node.className = newProps.portalClassName;
    }
  }
  
  componentWillUnmount() {
    if (!canUseDom || !this.node || !this.portal) return;
    
    const state = this.portal.state;
    const now = Date.now();
    const closesAt =
      state.isOpen &&
      this.props.closeTimeoutMS &&
      (state.closesAt || now + this.props.closeTimeoutMS);
    
    if (closesAt) {
      if (!state.beforeClose) {
        this.portal.closeWithTimeout();
      }
      
      setTimeout(this.removePortal, closesAt - now);
    }
    else {
      this.removePortal();
    }
  }
  
  removePortal = () => {
    !isReact16 && ReactDOM.unmountComponentAtNode(this.node);
    const parent = getParentElement(this.props.parentSelector);
    parent.removeChild(this.node);
  };
  
  portalRef = ref => {
    this.portal = ref;
  };
  
  renderPortal = props => {
    const portal = createPortal(
      this,
      <ModalPortal defaultStyle={Modal.defaultStyles} {...props}/>,
      this.node,
    );
    this.portalRef(portal);
  };
  
  render() {
    if (!canUseDom || !isReact16) {
      return null;
    }
    
    if (!this.node && isReact16) {
      this.node = document.createElement('div');
    }
    
    return createPortal(
      <ModalPortal
        ref={this.portalRef}
        defaultStyles={Modal.defaultStyles}
        {...this.props}
      />,
      this.node,
    )
  }
}
