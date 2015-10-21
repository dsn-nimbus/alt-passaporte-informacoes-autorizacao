"use strict";

describe('alt.passaporte-informacoes-autorizacao', function() {
  var _rootScope, _AuthorizationInfoService, _httpMock, _windowMock;
  var URL_TOKEN = '/passaporte-rest-api/rest/authorization/token';

  beforeEach(module('alt.passaporte-informacoes-autorizacao'));

  beforeEach(inject(function ($injector) {
    _rootScope = $injector.get('$rootScope');
    _AuthorizationInfoService = $injector.get('AuthorizationInfoService');
    _httpMock = $injector.get('$httpBackend');
    _windowMock = $injector.get('$window');
  }));

  describe('getToken', function () {
    it('deve rejeitar a promessa, servidor retorna erro - 401 - sem mensagem', function () {
      _httpMock.expectGET(URL_TOKEN).respond(401)

      var _onSuccess = function () {
        expect(true).toBeFalsy(); // não deve ser chamado
      };

      var _onError = function (error) {
        expect(error).toBeDefined();
      };

      _AuthorizationInfoService
        .getToken()
        .then(_onSuccess)
        .catch(_onError);

      _httpMock.flush();
    });

    it('deve rejeitar a promessa, servidor retorna erro - 401 - com mensagem', function () {
      _httpMock.expectGET(URL_TOKEN).respond(401, {erro: true})

      var _onSuccess = function () {
        expect(true).toBeFalsy(); // não deve ser chamado
      };

      var _onError = function (error) {
        expect(error).toBeDefined();
        expect(error.data.erro).toBe(true);
      };

      _AuthorizationInfoService
        .getToken()
        .then(_onSuccess)
        .catch(_onError);

      _httpMock.flush();
    });

    it('deve retornar o token corretamente - 200', function () {
      _httpMock.expectGET(URL_TOKEN).respond(200, {token: "abc123"});

      var _onSuccess = function (token) {
          expect(token).toBe('abc123');
      };

      var _onError = function (error) {
        expect(true).toBeFalsy(); // não deve ser chamado
      };

      _AuthorizationInfoService
        .getToken()
        .then(_onSuccess)
        .catch(_onError);

      _httpMock.flush();
    });
  });
});
