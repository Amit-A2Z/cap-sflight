// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as __ from './../_';
// the following represents the CDS aspect 'managed'
export function _managedAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class managed extends Base {
        createdAt?: __.DeepRequired<_.managed>['createdAt'];
    /**
    * Canonical user ID
    */
        createdBy?: __.DeepRequired<_.managed>['createdBy'];
        LastChangedAt?: __.DeepRequired<_.managed>['modifiedAt'];
    /**
    * Canonical user ID
    */
        LastChangedBy?: __.DeepRequired<_.managed>['modifiedBy'];
      static actions: {
    }
  };
}
export class managed extends _managedAspect(__.Entity) {}