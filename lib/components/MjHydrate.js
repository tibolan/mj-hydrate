"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _mjmlCore = require("mjml-core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Handlebars = require("handlebars");
/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/


var MjHydrate = /*#__PURE__*/function (_BodyComponent) {
  _inherits(MjHydrate, _BodyComponent);

  var _super = _createSuper(MjHydrate);

  function MjHydrate() {
    var initialDatas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MjHydrate);

    return _super.call(this, initialDatas);
  }

  _createClass(MjHydrate, [{
    key: "getAvailableData",
    value: function getAvailableData(file) {
      var mapping = this.getAttribute("mapping");
      var source = this.getAttribute("source");
      var data = {};

      if (mapping) {
        mapping.split(';').forEach(function (variable) {
          var _variable$split = variable.split(':'),
              _variable$split2 = _slicedToArray(_variable$split, 2),
              key = _variable$split2[0],
              value = _variable$split2[1];

          data[key] = value;
        });
      }

      if (source) {
        try {
          data = Object.assign({}, data, JSON.parse(source));
        } catch (e) {
          data = Object.assign({}, data, MjHydrate.prototype.externalData[source] || {});
        }
      }

      return data;
    }
  }, {
    key: "render",
    value: function render() {
      try {
        var path = this.getAttribute('path');
        var data = Object.assign({}, MjHydrate.prototype.externalData || {}, this.attributes, this.getAvailableData(file), {
          mjHydrateContent: this.props.content
        });

        var file = _fs["default"].readFileSync(path, {
          encoding: 'utf8',
          flag: 'r'
        });

        var template = Handlebars.compile(file);
        file = template(data);
        return this.renderMJML("".concat(file));
      } catch (e) {
        return "<!-- ".concat(e.message, " -->");
      }
    }
  }]);

  return MjHydrate;
}(_mjmlCore.BodyComponent);

exports["default"] = MjHydrate;

_defineProperty(MjHydrate, "endingTag", true);

_defineProperty(MjHydrate, "dependencies", {
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['mj-hydrate'],
  'mj-section': ['mj-hydrate'],
  'mj-column': ['mj-hydrate'],
  'mj-text': ['mj-hydrate'],
  'mj-wrapper': ['mj-hydrate'],
  // Tell the validator which tags are allowed as our component's children
  'mj-hydrate': ['mj-hydrate']
});

_defineProperty(MjHydrate, "allowedAttributes", {
  'path': 'string',
  'mapping': 'string',
  'source': 'string'
});

MjHydrate.prototype.externalData = {};

MjHydrate.setData = function (data) {
  MjHydrate.prototype.externalData = data;
};