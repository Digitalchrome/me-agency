'use strict';
// Compatibility shim for Sanity 5.x + React 19 stable.
// React 19 stable does not export `useEffectEvent` publicly.
// Sanity imports it directly — this shim adds it back to the module object.
const React = require('react');
if (!React.useEffectEvent) {
  Object.defineProperty(React, 'useEffectEvent', {
    value:
      React.experimental_useEffectEvent ??
      // Fallback: return the callback as-is (stable identity, no-op wrapper)
      function useEffectEvent(fn) {
        return fn;
      },
    writable: true,
    configurable: true,
  });
}
module.exports = React;
