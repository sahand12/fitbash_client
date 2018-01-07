// @flow
import React, {Component, type Node} from 'react';

const addEvent = function addEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') { return; }
  if (elem.addEventListener) { elem.addEventListener(type, eventHandle, false); }
  else if (elem.attachEvent) { elem.attachEvent(`on${type}`, eventHandle); }
  else elem[`on${type}`] = eventHandle;
};
const removeEvent = function removeEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') { return; }
  if (elem.removeEventListener) { elem.removeEventListener(type, eventHandle, false); }
  else if (elem.detachEvent) { elem.detachEvent(`on${type}`, eventHandle); }
  else elem[`on${type}`] = null;
};

type Props = {
  afterSlide: Function,
  autoplay: boolean,
  autoplayInterval: number,
  beforeSlide: Function,
  cellAlign: 'left' | 'center' | 'right',
  cellSpacing: number,
  children: Node,
  data: Function,
  decorators: Array<{
    component: Function,
    position: 'TopLeft' | 'TopCenter' | 'TopRight' | 'CenterLeft' | 'CenterCenter' | 'CenterRight' | 'BottomLeft' | 'BottomCenter' | 'BottomRight',
  }>,
  style: mixed,
  dragging: boolean,
  easing: string,
  edgeEasing: string,
  framePadding: string,
  frameOverflow: string,
  initialSlideHeight: number,
  initialSlideWidth: number,
  slideIndex: number,
  slidesToShow: number,
  slidesToScroll: number | 'auto',
  slideWidth: number | string,
  speed: number,
  swiping: boolean,
  vertical: boolean,
  width: string,
  wrapAround: boolean,
};
type State = {
  currentSlide: number,
  dragging: boolean,
  frameWidth: number | string,
  left: number,
  slideCount: number,
  slidesToShow: number,
  slidesToScroll: number,
  slideWidth: number,
  slideHeight: number,
  top: number,
};

function noop () {}

class Carousel extends Component<Props, State> {
  static defatulProps = {
    afterSlide: noop,
    autoplay: false,
    autoplayInterval: 3000,
    beforeSlide: noop,
    cellAlign: 'left',
    cellSpacing: 0,
    data: noop,
    decorators,
    dragging: true,
    easing: 'easeOutCirc',
    edgeEasing: 'easeOutElastic',
    framePadding: '0px',
    frameOverflow: 'hidden',
    slideIndex: 0,
    slidesToScroll: 1,
    slidesToShow: 1,
    slideWidth: 1,
    speed: 500,
    swiping: true,
    vertical: false,
    width: '100%',
    wrapAround: false,
  };
  state = {
    currentSlide: this.props.slideIndex,
    dragging: false,
    frameWidth: 0,
    left: 0,
    slideCount: 0,
    slidesToShow: this.props.slidesToShow,
    slidesToScroll: (typeof this.props.slidesToScroll === 'number' ? this.props.slidesToScroll : 1), // @FIXME
    slideWidth: 0,
    slideHeight: 0,
    top: 0,
  };
  slider: ?HTMLDivElement;
  frame: ?HTMLDivElement;
  list: ?HTMLUListElement;
  componentWillMount() {
    this.setInitialDimenstions();
  }
  componentDidMount() {
    this.mounted = true;
    this.setDimensions();
    this.bindEvents();
    this.setExternalData();
    if (this.props.autoplay) { this.startAutoplay(); }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({slideCount: nextProps.children.length});
    this.setDimensions(nextProps);
    
    if (this.props.slideIndex !== nextProps.slideIndex && nextProps.slideIndex !== this.state.currentSlide) {
      this.goToSlide(nextProps.slideIndex);
    }
    
    if (this.props.autoplay !== nextProps.autoplay) {
      if (nextProps.autoplay) { this.startAutoplay(); }
      else { this.stopAutoplay(); }
    }
  }
  componentWillUnmount() {
    this.unbindEvents();
    this.stopAutoplay();
    this.mounted = false;
  }
  render() {
    const self = this;
    const children = React.Children.count(this.props.children) > 1 ?
      this.formatChildren(this.props.children) :
      this.props.children;
    
    return (
      <div
        className={['slider', this.props.className || ''].join(' ')}
        ref={elem => {this.slider = elem;}}
        style={Object.assign(this.getSliderStyle(), this.props.style || {})}
      >
        <div
          className='slider-frame'
          ref={elem => {this.frame = elem}}
          style={this.getFrameStyle()}
          {...this.getTouchEvents()}
          {...this.getMouseEvents()}
          onClick={this.handleClick}
        >
          <ul
            className='slider-list'
            ref={elem => {this.list = elem;}}
            style={this.getListStyle()}
          >
            {children}
          </ul>
        </div>
        {this.props.decorators
          ? this.props.decorators.map(function (Decorator, index) {
            return (
              <div
                style={Object.assign(self.getDecoratorStyles(Decorator.position), Decorator.style || {})}
                className={`slider-decorator-${index}`}
                key={index}
              >
                <Decorator.component
                  currentSlide={self.state.currentSlide}
                  slideCount={self.state.slideCount}
                  frameWidth={self.state.frameWidth}
                  slideWidth={self.state.slideWidth}
                  slidesToScroll={self.state.slidesToScroll}
                  cellSpacing={self.state.cellSpacing}
                  slidesToShow={self.state.slidesToShow}
                  wrapAround={self.state.wrapAround}
                  nextSlide={self.nextSlide}
                  previousSlide={self.previousSlide}
                  goToSlide={self.goToSlide}
                />
              </div>
            );
          })
          : null}
        <style
          type='text/css'
          dangerouslySetInnerHTML={{__html: self.getStyleTagStyles()}}
        />
      </div>
    );
  }
  // Touch Events
  touchObject = {};
  getTouchEvents = () => {
    if (this.props.swiping === false) { return null; }
    const self = this;
    return ({
      onTouchStart(e) {
        self.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY,
        };
        self.handleMouseOver();
      },
      onTouchMove(e) {
        const direction = self.swipeDirection(
          self.touchObject.startX,
          e.touches[0].pageX,
          self.touchObject.startY,
          e.touches[0].pageY,
        );
        
        if (direction !== 0) {
          e.preventDefault();
        }
        
        const length = self.props.vertical
          ? Math.round(
            Math.sqrt(
              Math.pow(e.touches[0].pageY - self.touchObject.startY, 2)
            )
          )
          : Math.round(
            Math.sqrt(
              Math.pow(e.touches[0].pageX - self.touchObject.startX, 2)
            )
          );
        
        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.touches[0].pageX,
          endY: e.touches[0].pageY,
          length: length,
          direction: direction,
        };
        
        self.setState({
          left: self.props.vertical
            ? 0
            : self.getTargetLeft(self.touchObject.length * self.touchObject.direction),
          top: self.props.vertical
            ? self.getTargetLeft(self.touchObject.length * self.touchObject.direction)
            : 0,
        });
      },
      onTouchEnd(e) {
        self.handleSwipe(e);
        self.handleMouseOut();
      },
      onTouchCancel(e) {
        self.handleSwipe(e);
      }
    });
  };
  clickSafe = true;
  getMouseEvents = () => {
    const self = this;
    if (this.props.dragging === false) { return null; }
    
    return ({
      onMouseOver() {
        self.handleMouseOver();
      },
      onMouseOut() {
        self.handleMouseOut();
      },
      onMouseDown(e) {
        self.touchObject = {
          startX: e.clientX,
          startY: e.clientY,
        };
        
        self.setState({dragging: true});
      },
      onMouseMove(e) {
        if (!self.state.dragging) { return; }
        
        const direction = self.swipeDirection(
          self.touchObject.startX,
          e.clientX,
          self.touchObject.startY,
          e.clientY,
        );
        
        if (direction !== 0) {
          e.preventDefault();
        }
        
        const length = self.props.vertical
          ? Math.round(
            Math.sqrt(Math.pow(e.clientY - self.touchObject.startY, 2))
          )
          : Math.round(
            Math.sqrt(Math.pow(e.clientX - self.touchObject.startX, 2))
          );
        
        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length,
          direction,
        };
        
        self.setState({
          left: self.props.vertical
            ? 0
            : self.getTargetleft(self.touchObject.length * self.touchObject.direction),
          top: self.props.vertical
            ? self.getTargetleft(self.touchObject.length * self.touchObject.direction)
            : 0,
        });
      },
      onMouseUp(e) {
        if (!self.state.dragging) { return; }
        self.handleSwipe(e);
      },
      onMouseLeave(e) {
        if (!self.state.dragging) { return; }
        self.handleSwipe(e);
      }
    });
  };
  handleMouseOver = () => {
    if (this.props.autoplay) {
      this.autoplayPaused = true;
      this.stopAutoplay();
    }
  };
  handleMouseOut = () => {
    if (this.props.autoplay && this.autoplayPaused) {
      this.startAutoplay();
      this.autoplayPaused = null;
    }
  };
  handleClick = (e) => {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();
      
      if (e.nativeEvent) { e.nativeEvent.stopPropagation(); }
    }
  };
  handleSwipe = () => {
    this.clickSafe = typeof this.touchObject.length !== 'undefined' && this.touchObject.length > 44;
    
    let slidesToShow = this.props.slidesToShow;
    if (this.props.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll;
    }
    
    if (this.touchObject.length > this.state.slideWidth / slidesToShow / 5) {
      if (this.touchObject.direction === 1) {
        if (this.state.currentSlide >= React.Children.count(this.props.children) - slidesToShow &&
          !this.props.wrapAround) {
          this.animateSlide(tweenState.easingTypes[this.props.edgeEasing]);
        }
        else {
          this.nextSlide();
        }
      }
      else if (this.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
          this.animateSlide(tweenState.easingTypes[this.props.edgeEasing]);
        }
        else {
          this.previousSlide();
        }
      }
    }
    else {
      this.goToSlide(this.state.currentSlide);
    }
    
    this.touchObject = {};
    
    this.setState({dragging: false});
  };
  swipeDirection = (x1, x2, y1, y2) => {
    const xDist = x1 - x2;
    const yDist = y1 - y2;
    const r = Math.atan2(yDist, xDist);
 
    let swipeAngle = Math.round(r * 180 / Math.PI);
    if (swipeAngle < 0) { swipeAngle = 360 - Math.abs(swipeAngle); }
    
    if (swipeAngle <= 45 && swipeAngle >= 0) { return 1; }
    if (swipeAngle <= 360 && swipeAngle >= 315) { return 1; }
    if (swipeAngle >= 135 && swipeAngle <= 225) { return -1; }
    
    if (this.props.vertical === true) {
      if (swipeAngle >= 45 && swipeAngle <= 135) { return 1; }
      return -1;
    }
    
    return 0;
  };
  autoplayIterator = () => {
    if (this.props.wrapAround) {
      return this.nextSlide();
    }
    if (this.state.currentSlide !== this.state.slideCount - this.state.slidesToShow) {
      return this.nextSlide();
    }
    return this.stopAutoplay();
  };
  startAutoplay = () => { // @TODO: may be use requestAnimationFrame
    this.autoplayId = setInterval(this.autoplayIterator, this.props.autoplayInterval);
  };
  resetAutoplay = () => {
    if (this.props.autoplay && !this.autoplayPaused) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  };
  stopAutoplay = () => {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
    }
  };
  // Action Methods
  goToSlide = (index: number) => {
    const self = this;
    if (index >= React.Children.count(this.props.children) || index < 0) {
      if (!this.props.wrapAround) { return; }
      if (index >= React.Children.count(this.props.children)) {
        this.props.beforeSlide(this.state.currentSlide, 0);
        const afterUpdate = () => self.animateSlide(null, null, self.getTargetLeft(null, index), () => {
          self.animateSlide(null, 0.01);
          self.props.afterSlide(0);
          self.resetAutoplay();
          self.setExternalData();
        });
        this.setState({currentSlide: 0}, afterUpdate);
      }
      else {
        const endSlide = React.Children.count(this.props.children) - this.state.slidesToScroll;
        this.props.beforeSlide(this.state.currentSlide, endSlide);
        const afterUpdate = () => self.animateSlide(null, null, self.getTargetLeft(null, index), () => {
          self.animateSlide(null, 0.01);
          self.props.afterSlide(endSlide);
          self.resetAutoplay();
          self.setExternalData();
        });
        this.setState({currentSlide: endSlide}, afterUpdate);
      }
    }
    else {
      this.props.beforeSlide(this.state.currentSlide, index);
    
      if (index !== this.state.currentSlide) {
        this.props.afterSlide(index);
      }
      this.setState({currentSlide: index}, () => {
        self.animateSlide();
        self.resetAutoplay();
        self.setExternalData();
      });
    }
  };
  nextSlide = () => {
    const childrenCount = React.Children.count(this.props.children);
    let {slidesToShow} = this.props;
    if (this.props.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll;
    }
    if (this.state.currentSlide >= childrenCount - slidesToShow && !this.props.wrapAround) { return; }
    
    if (this.props.wrapAround) {
      this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
    }
    else {
      if (this.props.slideWidth !== 1) {
        this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
      }
      this.goToSlide(Math.min(
        this.state.currentSlide + this.state.slidesToScroll,
        childrenCount - slidesToShow,
      ));
    }
  };
  previousSlide = () => {
    if (this.state.currentSlide <= 0 && !this.props.wrapAround) { return; }
    if (this.props.wrapAround) { this.goToSlide(this.state.currentSlide - this.state.slidesToScorll); }
    else { this.goToSlide(Math.max(0, this.state.currentSlide - this.state.slidesToScroll)); }
  };
  // Animation
  animateSlide = (easing, duration, endValue, callback) => {
    this.tweenState(this.props.vertical ? 'top' : 'left', {
      easing: easing || tweenState.easingTypes[this.props.easing],
      duration: duration || this.props.speed,
      endValue: endValue || this.getTargetLeft(),
      onEnd: callback || null,
    });
  };
  getTargetLeft = (touchOffset, slide) => {
    let offset;
    const target = slide || this.state.currentSlide;
    switch (this.props.cellAlign) {
      case 'left': {
        offset = 0;
        offset -= this.props.cellSpacing * target;
        break;
      }
      case 'center': {
        offset = (this.state.frameWidth - this.state.slideWidth) / 2;
        offset -= this.props.cellSpacing * target;
        break;
      }
      case 'right': {
        offset = this.state.frameWidth - this.state.slideWidth;
        offset -= this.props.cellSpacing * target;
        break;
      }
      default:
    }
    
    let left = this.state.slideWidth * target;
    const isLastSlide = this.state.currentSlide > 0 &&
      target + this.state.slidesToScroll >= this.state.slideCount;
    
    if (isLastSlide &&
      this.props.slideWidth !== 1 &&
      !this.props.wrapAround &&
      this.props.slidesToScroll === 'auto'
    ) {
      left = this.state.slideWidth * this.state.slideCount - this.state.frameWidth;
      offset = 0;
      offset -= this.props.cellSpacing * (this.state.slideCount - 1);
    }
    
    offset -= touchOffset || 0;
    return (left - offset) * -1;
  };
  // Bootstrapping
  bindEvents = () => {
    const self = this;
    if (ExecutionEnvironment.canUseDom) {
      addEvent(window, 'resize', self.onResize);
      addEvent(document, 'readystatechange', self.onReadyStateChange);
    }
  };
  onResize = () => {
    this.setDimensions();
  };
  onReadyStateChange = () => {
    this.setDimensions();
  };
  unbindEvents = () => {
    const self = this;
    if (ExecutionEnvironment.canUseDom) {
      removeEvent(window, 'resize', self.onResize);
      removeEvent(document, 'readystatechange', self.onReadyStateChange);
    }
  };
  formatChildren = children => {
    const self = this;
    const positionValue = this.props.vertical
      ? this.getTweeningValue('top')
      : this.getTweeningValue('left');
    return React.Children.map(children, (child, index) => (
      <li
        className="slider-slide"
        style={self.getSlideStyle(index, positionValue)}
        key={index}
      >
        {child}
      </li>
    ));
  };
  setInitialDimensions = () => {
    const slideWidth: number = this.props.vertical
      ? this.props.initialSlideHeight || 0
      : this.props.initialSlideWidth || 0;
    const slideHeight: number = this.props.initialSlideHeight
      ? this.props.initialSlideHeight * this.props.slidesToShow
      : 0;
    const frameHeight: number = slideHeight + this.props.cellSpacing * (this.props.slidesToShow - 1);
    
    this.setState({
      slideHeight,
      slideWidth,
      slideCount: React.Children.count(this.props.children),
      frameWidth: this.props.vertical ? frameHeight : '100%',
    }, () => {
      this.setLeft();
      this.setExternalData();
    });
  };
  setDimensions = (props = this.props) => {
  
  };
}
