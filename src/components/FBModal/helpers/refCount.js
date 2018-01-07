// @flow
type ClassListMap = {[string]: number};
const classListMap: ClassListMap = {};

export function get(): ClassListMap {
  return classListMap;
}

export function add(bodyClass: string): string {
  // Set variable adn default if none
  if (!classListMap[bodyClass]) {
    classListMap[bodyClass] = 0;
  }
  classListMap[bodyClass] += 1;
  return bodyClass;
}

export function remove(bodyClass: string): string {
  if (classListMap[bodyClass]) {
    classListMap[bodyClass] -= 1;
  }
  return bodyClass;
}

export function totalCount(): number {
  return Object.keys(classListMap).reduce(
    (acc, curr) => acc + classListMap[curr],
    0
  );
}
