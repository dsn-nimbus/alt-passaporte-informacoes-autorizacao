;(function(ng) {
  "use strict";

  ng
    .module('alt.passaporte-informacoes-autorizacao', [])
    .service('AuthorizationInfoService', ['$q', '$http', function($q, $http) {
        var URL_BASE = '/passaporte-rest-api/rest/authorization/token';

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
