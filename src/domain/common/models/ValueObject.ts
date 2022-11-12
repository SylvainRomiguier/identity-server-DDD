export abstract class ValueObject {
  abstract getEqualityComponents(): (number | string)[];
  equals(obj?: object): boolean {
    if (!obj ||  obj.constructor.name !== this.constructor.name) {
      return false;
    }
    const objValues = (obj as ValueObject).getEqualityComponents();
    const thisValues = this.getEqualityComponents();
   
    if(objValues.length!==thisValues.length) { return false;}
    for(let i=0; i<objValues.length; i++) {
      if(typeof objValues[i] !== typeof thisValues[i]) {
        return false;
      }
      if(objValues[i] !== thisValues[i] ) { return false}
    }
    return true;
  }
}
