;(function(ng) {
  "use strict";

  ng
    .module('alt.passaporte-informacoes-autorizacao', [])
    .provider('AltPassaporteUrlBase', function() {
        this.urlBase = '';

        this.$get = function() {
          return this.urlBase;
        };
    })
    .service('AuthorizationInfoService', ['$q', '$http', 'AltPassaporteUrlBase', function($q, $http, AltPassaporteUrlBase) {
        var URL_BASE = AltPassaporteUrlBase + '/passaporte-rest-api/rest/authorization/token';

        this.getToken = function() {
            return $http
                    .get(URL_BASE)
                    .then(function(info) {
                      return info.data.token;
                    })
                    .catch(function(erro) {
                      return $q.reject(erro);
                    });
        };
    }]);
}(angular));
