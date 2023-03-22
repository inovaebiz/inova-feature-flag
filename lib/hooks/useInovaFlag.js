"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInovaFlag = useInovaFlag;
var _react = require("react");
var _InovaFeatureFlagProvider = require("../providers/InovaFeatureFlagProvider");
function useInovaFlag(key, defaultValue) {
  var _useContext = (0, _react.useContext)(_InovaFeatureFlagProvider.InovaFeatureFlagContext),
    useFlag = _useContext.useInovaFlag;
  return useFlag(key, defaultValue);
}