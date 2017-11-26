// @flow
import t from './i18n';
import FBMealCard from './components/FBMealCard';
import type {FBCarouselSeatProps, FBCarouselProps} from './components/FBCarousel';

const item: FBCarouselSeatProps = {
  component: FBMealCard,
  props: {
    id: t('sahand'),
  },
};

const items: FBCarouselProps = {
  items: [item]
};
export default item;
