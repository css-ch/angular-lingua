export function isEqual(a, b): boolean {

  if (a === undefined || b === undefined || a === null || b === null) {
    if (a === undefined && b === undefined) {
      return true;
    }
    if (a === null && b === null) {
      return true;
    }
    return false;
  }

  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
}
