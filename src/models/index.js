// @flow
export type Meal = {
  id: string,
  type: string, // 'MealMain'
  name: string, // 'Penne Bolognese',
  nameFA: string,
  description: string,
  descriptionFA: string,
  slug: string,
  slugFA: string,
  baseSku: string,
  sku: string,
  categories: Array<string>, // ['main'] or ['breakfast']
  ingredients: string,
  ingredientsFA: string,
  containedAllergens: string,
  containedAllergensFA: string,
  options: object, // {'cheese': true}
  sideDishName: string,
  sideDishNameFA: string,
  nutritionWithDailyValues?: {
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
  displayNameFA: string,
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
};
export type FoodGroup = {
  id: string,
  name: string,
  iconUrls: {
    gray: string,
    red: string,
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
export type DietBadge = {
  id: string,
  label: string,
  type: string,
};
export type FeatureBadge = {
  id: string,
  label: string,
  type: string,
};
export type Ribbon = {
  id: string,
  label: string,
};
export type Allergen = {
  name: string,
  id: string,
};
export type MealPrice = {
  id: string,
  mealId: string,
  startDate: number,
  endDate?: number,
  priceHash: {
    currency: string,
    amount: number,
    precision: number,
  }
}

type NutritionValue = {
  value: number,
  valueLabel: string,
}
type NutritionValueWithFDA = {
  value: number,
  valueLabel: string,
  fdaDailyPercent: number,
  fdaDailyPercentLabel: string,
}