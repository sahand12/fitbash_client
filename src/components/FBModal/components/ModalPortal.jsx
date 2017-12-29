// @flow
import React, {Component, type Node} from 'react';
import * as focusManager from '../helpers/focusManager';
import scopeTab from '../helpers/scopeTab';
import * as ariaAppHider from '../helpers/ariaAppHider';
import * as refCount from '../helpers/refCount';
import * as bodyClassList from '../helpers/bodyClassList';
import SafeHTMLElement from '../helpers/safeHTMLElement';

// So that our css statically analyzable
const CLASS_NAMES = {
  overlay: 'ReactModal__Overlay',
  content: 'ReactModal__Content',
};

const TAB_KEY = 9;
const ESC_KEY = 27;

type Props = {
  isOpen: boolean,
  defaultStyles: {
    content: {},
    overlay: {},
  },
  style: {
    content: {},
    overlay: {},
  },
  className: string | Object,
  overlayClassName: string | Object,
  bodyOpenClassName: string,
  ariaHideApp: boolean,
  appElement: typeof SafeHTMLElement,
  onAfterOpen: Function,
  onRequestClose: Function,
  closeTimeoutMS: number,
  shouldFocusAfterRender: boolean,
  shouldCloseOnOverlayClick: boolean,
  shouldReturnFocusAfterClose: boolean,
  role: string,
  contentLabel: string,
  aria: Object,
  children: Node,
  shouldCloseOnEsc: boolean,
};
type State = {
  afterOpen: boolean,
  beforeClose: boolean,
  isOpen?: boolean,
  closesAt: number,
}
export default class ModalPortal extends Component<Props, State> {
  content: ?HTMLDivElement;
  focusAfterRender: ?boolean;
  overlay: ?HTMLDivElement;
  moveFromContentToOverlay: ?boolean;
  node: ?HTMLDivElement;
  shouldClose: ?boolean;
  setOverlayRef: Function;
  closeTimer: ?number;
  
  static defaultProps = {
    style: {
      content: {},
      overlay: {},
    }
  };
  
  constructor(props: Props) {
    super(props);
    
    this.state = {
      afterOpen: false,
      beforeClose: false,
      closesAt: 0,
    };
    
    this.shouldClose = null;
    this.moveFromContentToOverlay = null;
  }
  
  componentDidMount() {
    // Focus needs to be set when mounting and already open
    if (this.props.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    }
  }
  
  componentWillReceiveProps(newProps: Props) {
    if (process.env.NODE_ENV !== 'production') {
      if (newProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
        // eslint-disable-next-line no-console
        console.warn(`React-Modal: "bodyOpenClassName" props has been modified. This may cause unexpected behavior when multiple modals are open.`);
      }
    }
    
    // Focus only needs to be set once when the modal is being opened
    if (!this.props.isOpen && newProps.ioOpen) {
      this.setFocusAfterRender(true);
      this.open();
    }
    else if (this.props.isOpen && !newProps.isOpen) {
      this.close();
    }
  }
  
  componentDidUpdate() {
    if (this.focusAfterRender) {
      this.focusContent();
      this.setFocusAfterRender(true);
    }
  }
  
  componentWillUnmount() {
    this.afterClose();
    clearTimeout(this.closeTimer);
  }
  
  setFocusAfterRender = (focus: boolean): void => {
    this.focusAfterRender = this.props.shouldFocusAfterRender && focus;
  };
  
  setOverlayRef = (overlay: ?HTMLDivElement): void => {
    this.overlay = overlay;
  };
  
  setContentRef = (content: ?HTMLDivElement): void => {
    this.content = content;
  };
  
  beforeOpen() {
    const {appElement, ariaHideApp, bodyOpenClassName} = this.props;
    
    // Add body class
    bodyClassList.add(bodyOpenClassName);
    
    // Add aria-hidden to appElement
    if (ariaHideApp) {
      ariaAppHider.hide(appElement);
    }
  }
  
  afterClose = (): void => {
    const {
      appElement,
      ariaHideApp,
      bodyOpenClassName,
      shouldFocusAfterRender,
      shouldReturnFocusAfterClose
    } = this.props;
    
    // Remove body class
    bodyClassList.remove(bodyOpenClassName);
    
    // Reset aria-hidden attribute if all modals have been removed
    if (ariaHideApp && refCount.totalCount() < 1) {
      ariaAppHider.show(appElement);
    }
    
    if (shouldFocusAfterRender) {
      if (shouldReturnFocusAfterClose) {
        focusManager.returnFocus();
        focusManager.teardownScopedFocus();
      }
      else {
        focusManager.popWithouFocus();
      }
    }
  };
  
  open = (): void => {
    this.beforeOpen();
    
    if (this.state.afterOpen && this.state.beforeClose) {
      clearTimeout(this.closeTimer);
      this.setState({beforeClose: false});
    }
    else {
      if (this.props.shouldFocusAfterRender) {
        focusManager.setupScopedFocus(this.node);
        focusManager.markForFocusLater();
      }
      
      this.setState({isOpen: true}, () => {
        this.setState({afterOpen: true});
        
        if (this.props.isOpen && this.props.onAfterOpen) {
          this.props.onAfterOpen();
        }
      });
    }
  };
  
  close = (): void => {
    if (this.props.closeTimeoutMS > 0) {
      this.closeWithTimeout();
    }
    else {
      this.closeWithoutTimeout();
    }
  };
  
  // Don't steal focus from inner elements
  focusContent = (): void => {
    this.content && !this.contentHasFocus() && this.content.focus();
  };
  
  closeWithTimeout = (): void => {
    const closesAt = Date.now() + this.props.closeTimeoutMS;
    this.setState({beforeClose: true, closesAt}, () => {
      this.closeTimer = setTimeout(
        this.closeWithoutTimeout,
        this.state.closesAt - Date.now()
      );
    });
  };
  
  closeWithoutTimeout = (): void => {
    this.setState(
      {
        beforeClose: false,
        isOpen: false,
        afterOpen: false,
        closesAt: 0,
      },
      this.afterClose
    );
  };
  
  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLButtonElement>) => {
    if (event.keyCode === TAB_KEY) {
      scopeTab(this.content, event);
    }
    
    if (this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
      event.stopPropagation();
      this.requestClose(event);
    }
  };
  
  handleOverlayOnClick = (event: SyntheticMouseEvent<*>): void => {
    if (this.shouldClose === null) {
      this.shouldClose = true;
    }
    
    if (this.shouldClose && this.props.shouldCloseOnOverlayClick) {
      if (this.ownerHandlesClose()) {
        this.requestClose(event);
      }
      else {
        this.focusContent();
      }
    }
    
    this.shouldClose = null;
    this.moveFromContentToOverlay = null;
  };
  
  handleOverlayOnMouseUp = (): void => {
    if (this.moveFromContentToOverlay === null) {
      this.shouldClose = false;
    }
  };
  
  handleContentOnMouseUp = () => {
    this.shouldClose = false;
  };
  
  handleOverlayOnMouseDown = (event: SyntheticMouseEvent<*>) => {
    if (!this.props.shouldCloseOnOverlayClick && event.target === this.overlay) {
      event.preventDefault();
    }
    
    this.moveFromContentToOverlay = false;
  };
  
  handleContentOnClick = () => {
    this.shouldClose = false;
  };
  
  handleContentOnMouseDown = () => {
    this.shouldClose = false;
    this.moveFromContentToOverlay = false;
  };
  
  requestClose = (event: SyntheticEvent<*>) => {
    this.ownerHandlesClose() && this.props.onRequestClose(event);
  };
  
  ownerHandlesClose = () => this.props.onRequestClose;
  
  shouldBeClosed = () => !this.state.isOpen && !this.state.beforeClose;
  
  contentHasFocus = () => {
    return (
      document.activeElement === this.content ||
      (this.content && this.content.contains(document.activeElement))
    );
  };
  
  buildClassName = (which: string, additional?: Object | string) => {
    const classNames = typeof additional === 'object'
      ? additional
      : {
        base: CLASS_NAMES[which],
        afterOpen: `${CLASS_NAMES[which]}--after-open`,
        beforeClose: `${CLASS_NAMES[which]}--before-close`
      };
    let className = classNames.base;
    if (this.state.afterOpen) {
      className = `${className} ${classNames.afterOpen}`;
    }
    if (this.state.beforeClose) {
      className = `${className} ${classNames.beforeClose}`;
    }
    
    return typeof additional === 'string' && additional
     ? `${className} ${additional}`
     : className;
  };
  
  ariaAttributes = (items: Object) => {
    Object.keys(items)
      .reduce((acc, name) => {
        acc[`aria-${name}`] = items[name];
        return acc;
      }, {});
  };
  
  render() {
    const {className, overlayClassName, defaultStyles} = this.props;
    const contentStyles = className ? {} : defaultStyles.content;
    const overlayStyles = overlayClassName ? {} : defaultStyles.overlay;
    
    return this.shouldBeClosed() ? null : (
      <div
        ref={this.setOverlayRef}
        className={this.buildClassName('overlay', overlayClassName)}
        style={{...overlayStyles, ...this.props.style.overlay}}
        onClick={this.handleOverlayOnClick}
        onMouseDown={this.handleOverlayOnMouseDown}
        onMouseUp={this.handleOverlayOnMouseUp}
        aria-modal="true"
      >
        <div
          ref={this.setContentRef}
          style={{...contentStyles, ...this.props.style.content}}
          className={this.buildClassName('content', className)}
          tabIndex="-1"
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleContentOnMouseDown}
          onMouseUp={this.handleContentOnMouseUp}
          onClick={this.handleContentOnClick}
          role={this.props.role}
          aria-label={this.props.contentLabel}
          {...this.ariaAttributes(this.props.aria || {})}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
