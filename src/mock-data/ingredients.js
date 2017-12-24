// @flow
const ingredientsHash = {
  'almond': 'بادام',
  'almonds': 'بادام',
  'annatto': 'آناتو',
  'artichoke hearts': 'کنگر فرنگی',
  'asiago cheese': 'پنیر آسیاگو',
  'bacon': 'بیکِن',
  'baking soda': 'جوش‌شیرین',
  'bell peppers': 'فلفل دلمه‌ای',
  'black pepper': 'فلفل سیاه',
  'butter': 'کره',
  'carrot': 'هویج',
  'carrots': 'هویج',
  'cassava flour': 'آرد کاساوا',
  'canola oil': 'روغن کانولا',
  'celery': 'جعفری',
  'celery powder': 'پودر جعفری',
  'cellulose': 'سلولز',
  'citric acid': 'اسید سیتریک',
  'chablis': 'شراب سفید چابلیس',
  'cheddar cheese': 'پنیر چدار',
  'cheese culture': 'مخمر پنیر',
  'cheese cultures': 'مخمر پنیر',
  'chicken breast': 'سینه مرغ',
  'chicken fat': 'دنبه مرغ',
  'chicken stock': 'آب مرغ پخته‌شده',
  'concentrated grape must': 'پوراب عصاره انگور',
  'cooked brown rice': 'برنج قهوه‌ای پخته‌شده',
  'cooked quinoa': 'کینوا پخته‌شده',
  'cream': 'خامه',
  'cultured milk': 'شیر غنی‌شده با اسید لاکتیک',
  'dehydrated garlic': 'سیر خشک‌شده',
  'dehydrated onion': 'پیاز خشک‌شده',
  'dried chicken stock': 'عصاره مرغ خشک‌شده',
  'dried porcini mushrooms': 'قارچ تیره‌سر خشک‌شده',
  'egg': 'تخم‌مرغ',
  'eggs': 'تخم‌مرغ',
  'enzyme': 'آنزیم‌',
  'enzymes': 'آنزیم‌ها',
  'expeller pressed canola oil': 'روغن کانولا اکسپرس',
  'flat iron steak': 'گوشت راسته گاو استیکی',
  'fruit juice': 'آب میوه',
  'garlic': 'سیر',
  'gelatin': 'ژلاتین',
  'greek yogurt': 'ماست یونانی',
  'green beans': 'لوبیا سبز',
  'half and half': 'نصف نصف',
  'honey': 'عسل',
  'lemon juice': 'آب لیموترش',
  'marsala wine reduction': 'شراب مارسالا غلیظ‌شده',
  'milk': 'شیر',
  'mirepoix stock': 'عصاره سبزیجات',
  'mushroom': 'قارچ',
  'mushrooms': 'قارچ',
  'natamycin': 'ناتامایسیسن',
  'natural flavor': 'طعم‌دهنده‌های طبیعی',
  'natural flavoring': 'طعم‌دهنده‌های طبیعی',
  'nutritional yeast': 'مخمر تغذیه‌ای',
  'oat bran': 'سبوس جو دو‌ سر',
  'olive oil': 'روغن زیتون',
  'omelette': 'املت',
  'onion': 'پیاز',
  'onion stock': 'عصاره پیاز',
  'onion stocks': 'عصاره پیاز',
  'oregano': 'مرزنگوش',
  'paprika': 'پاپریکا',
  'parmesan cheese': 'پنیر پارمزان',
  'pork': 'گوشت خوک',
  'pork sausage': 'سوسیس خوک',
  'potatoes': 'سیب‌زمینی',
  'potato starch': 'نشاسته سیب‌زمینی',
  'quinoa': 'کینوا',
  'red wine vinegar': 'سرکه شراب قرمز',
  'rice flour': 'آرد برنج',
  'roasted chicken stock': 'عصاره مرغ کباب‌شده',
  'roasted tomatoes': 'گوجه‌فرنگی کباب‌شده',
  'salt': 'نمک',
  'sea salt': 'نمک دریا',
  'skim milk': 'شیر بدون چربی',
  'shrimp': 'میگو',
  'spaghetti squash': 'اسپاگتی اِسکواش',
  'spices': 'ادویه‌جات',
  'spinach': 'اسفناج',
  'sugar': 'شکر',
  'swiss cheese': 'پنیر سوئیسی',
  'tomatoes': 'گوجه‌فرنگی',
  'tomato': 'گوجه‌فرنگی',
  'turkey': 'بوقلمون',
  'turkey breast': 'سینه بوقلمون',
  'vinegar': 'سرکه',
  'walnuts': 'گردو',
  'water': 'آب',
  'white balsamic vinegar': 'سرکه بالزامیک سفید',
  'white onion': 'پیاز سفید',
  'white rice': 'برنج سفید',
  'white wine': 'شراب سفید',
  'wine vinegar': 'سرکه شراب',
  'xanthan gum': 'صمغ زانتان',
};

function Node(data, depth = 0) {
  this._data = data;
  this.children = [];
  this.parent = null;
  this._depth = depth;
}
Node.prototype.add = function (...children) {
  children.forEach(child => {
    child.parent = this;
    child._depth = this._depth + 1;
    this.children.push(child)
  });
};
function Tree(node) {
  node._depth = 0;
  this._root = node;
}
Tree.prototype.add = function addLeaf(data, where) {
  this.traverseBF(function (parent) {
    if (parent._data === where) {
      const newChild = new Node(data);
      newChild.parent = parent;
      parent.children.push(newChild);
    }
  });
};
Tree.prototype.map = function map(fn) {
  (function traverse(node) {
    for (let i = 0; i < node.children.length; i++) {
      traverse(node.children[i]);
    }
    node._data = fn(node._data);
  })(this._root);
  return this;
};
Tree.prototype.reduce = function reduce(fn, initStructure) {
  let result = initStructure;
  this.traverseBF(node => {
    result = fn(result, node);
  });
  return result;
};
Tree.prototype.traverseBF = function traverseBF(callback) {
  const self = this;
  (function recurse(node, queue = [self._root]) {
    callback(node);
    for (let i = 0; i < node.children.length; i++) {
      queue.unshift(node.children[i]);
      recurse(node.children[i], queue);
    }
  })(this._root);
};
Tree.prototype.traverseDF = function traverseDF(callback) {
  (function recurse(node) {
    for (let i = 0; i < node.children.length; i++) {
      recurse(node.children[i]);
    }
    callback(node);
  })(this._root);
};

function createTree(treeName, treeRawString) {
  const root = new Node(treeName);
  const tree = new Tree(root);
  const open = '(';
  const close = ')';
  const comma = ',';
  const dot = '.';
  
  let char;
  let word = '';
  let parent = root;
  let child = null;
  for (let i = 0, len = treeRawString.length; i < len; i++) {
    char = treeRawString[i];
    switch (char) {
      case open:
        child = new Node(word.trim());
        word = '';
        parent.add(child);
        parent = child;
        break;
      case close:
        child = new Node(word.trim());
        word = '';
        parent.add(child);
        parent = parent.parent;
        break;
      case dot:
      case comma:
        word = word.trim();
        if (word !== '') {
          child = new Node(word);
          parent.add(child);
          word = '';
        }
        break;
      default:
        word += char;
    }
  }
  
  return tree;
}
const translate = function translate(str) {
  return ingredientsHash[str.toLowerCase()] || str;
};

const string = 'Eggs (Eggs, Citric Acid), Spinach, Tomatoes, Bacon (Pork, Water, Salt, Sugar, Celery Powder, Natural Flavor), Parmesan Cheese (Milk, Cheese Cultures, Salt, Enzymes, Cellulose), Expeller Pressed Canola Oil.';

const mealTree = createTree('مرغ با برنج مخلوط', string);
const output = mealTree.map(translate)
  .reduce(function (result, node) {
    if (node._depth === 0) return '';
    
    const index = node.parent.children.indexOf(node);
    const siblingsCount = node.parent.children.length;
    const childrenCount = node.children.length;
    const nodeDepth = node._depth;
    
    if (childrenCount > 0) {
      return `${result}${node._data} (`;
    }
    if (index === siblingsCount - 1) {
      if (nodeDepth === 1) { return `${result}${node._data}`}
      return `${result}${node._data})، `;
    }
    return `${result}${node._data}، `;
  }, '');

console.log(output);
