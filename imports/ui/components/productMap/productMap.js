import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-simple-logger';
import 'angular-google-maps';

import './productMap.less';
import template from './productMap.html';

class ProductMap {
  constructor($scope) {
    'ngInject';

    this.map = {
      center: {
        latitude: 39.8282,
        longitude: -98.5795
      },
      zoom: 4,
      events: {
        click: (mapModel, eventName, originalEventArgs) => {
          this.setLocation(originalEventArgs[0].latLng.lat(), originalEventArgs[0].latLng.lng());
          console.log("click " + originalEventArgs[0].latLng.lat(), originalEventArgs[0].latLng.lng());
          $scope.$apply();
        }
      }
    };

    this.marker = {
      options: {
        draggable: true
      },
      events: {
        dragend: (marker, eventName, args) => {
          this.setLocation(marker.getPosition().lat(), marker.getPosition().lng());
          console.log("dragend " + marker.getPosition().lat(), marker.getPosition().lng());
          $scope.$apply();
        }
      }
    };



  }

  setLocation(latitude, longitude) {
    
    this.prlocation = {
      latitude: latitude,
      longitude: longitude
    };

  
  }
}

const name = 'productMap';

// create a module
export default angular.module(name, [
  angularMeteor,
  'nemLogging', // https://github.com/angular-ui/angular-google-maps/issues/1633
  'uiGmapgoogle-maps'
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  bindings: {
    prlocation: '='
  },
  controller: ProductMap
});