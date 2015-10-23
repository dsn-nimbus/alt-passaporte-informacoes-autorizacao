;(function(ng) {
  "use strict";

  ng
    .module('alt.passaporte-informacoes-autorizacao', [])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
    }])
    .factory('AltPassaporteAuthorizationInfoService', ['$q', '$http', function($q, $http) {
        var AltPassaporteAuthorizationInfoService = function(urlBase) {
          this.url = urlBase + '/passaporte-rest-api/rest/authorization/token';
        };

        AltPassaporteAuthorizationInfoService.prototype.getToken = function() {
            return $http
                    .get(this.url)
                    .then(function(info) {
                      return info.data.token;
                    })
                    .catch(function(erro) {
                      return $q.reject(erro);
                    });
        };

        return AltPassaporteAuthorizationInfoService;
    }]);
}(angular));
