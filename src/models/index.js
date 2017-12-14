// @flow
type NutritionValue = {
  value: number,
  valueLabel: string,
};
type NutritionValueWithFDA = {
  value: number,
  valueLabel: string,
  fdaDailyPercent: number,
  fdaDailyPercentLabel: string,
};
export type Meal = {
  id: string,
  type: string, // 'MealMain'
  name: string, // 'Penne Bolognese',
  description: string,
  slug: string,
  baseSku: string,
  sku: string,
  categories: Array<string>, // ['main'] or ['breakfast']
  ingredients: string,
  containedAllergens: Array<string>,
  options: mixed, // {'cheese': true}
  sideDishName: string,
  nutritionWithDailyValues: {
    servingUnit: NutritionValue,
    servingSize: NutritionValue,
    calories: NutritionValue,
    protein: NutritionValue,
    caloriesFromFat: NutritionValue,
    totalFat: NutritionValueWithFDA,
    saturatedFat: NutritionValueWithFDA,
    transFat: NutritionValue,
    carbohydrates: NutritionValueWithFDA,
    cholesterol: NutritionValueWithFDA,
    sodium: NutritionValueWithFDA,
    dietaryFiber: NutritionValueWithFDA,
    sugars: NutritionValue,
    vitaminA: NutritionValue,
    vitaminC: NutritionValue,
    calcium: NutritionValue,
    iron: NutritionValue,
  },
  prettyOptionsLabel: string, // "w/ cheese"
  displayName: string,
  mealImageUrls: {
    large: string,
    medium: string,
    small: string,
    square: string,
    thumb: string,
    ios2x: string,
    ios3x: string,
  },
  mainRatingRecentAverageNormalized: number,
  t: {
    fa: {
      categories: Array<string>,
      containedAllergens: Array<string>,
      description: string,
      displayName: string,
      ingredients: string,
      name: string,
      options: mixed,
      prettyOptionsLabel: string,
      sideDishName: string,
      slug: string,
      type: string,
    }
  }
};
export type FoodGroup = {
  id: string,
  name: string,
  iconUrls: {
    gray: string,
    red: string,
  },
  t: {
    fa: {
      name: string,
    }
  }
};
export type MealFoodGroup = {
  id: string,
  mealId: string,
  foodGroupId: string,
};
export type MealBadge = {
  id: string,
  mealId: string,
  badgeId: string,
  sortOrder: number,
};

export type Badge = {
  id: string,
  label: string,
  type: string, // 'diet badge', 'feature badge'
  t: {
    fa: {
      label: string
    }
  }
};
export type Ribbon = {
  id: string,
  label: string,
  t: {
    fa: {
      label: string,
    }
  }
};
export type Allergen = {
  name: string,
  id: string,
  t: {
    fa: {
      name: string,
    }
  }
};
export type MealPrice = {
  id: string,
  mealId: string,
  startDate: string,
  endDate?: string,
  priceHash: {
    currency: string,
    amount: number,
    precision: number,
  }
}
