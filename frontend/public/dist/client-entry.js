(function() {
  const d = window.document
  let wsServerUrl = window.location.protocol
    + '//' + (window.location.host || 'localhost').split(':')[0]
    + ':49445/';
  
  if (!window['__ROLLUP_PLUGIN_HOT_RUNTIME']) {
    let loaded = false;
    const callbacks = [];
    window['__ROLLUP_PLUGIN_HOT_RUNTIME'] = {
      host: null,
      port: 49445,
      ws: false,
      hot: true,
      then: function(cb) {
        if (loaded) {
          setTimeout(cb, 0);
        } else {
          callbacks.push(cb);
        }
      }
    };
    const script = d.createElement('script');
    script.async = 1;
    script.src = wsServerUrl + 'runtime/hmr-runtime.js';
    script.onload = () => {
      loaded = true;
      callbacks.splice(0, callbacks.length).forEach(function(cb) {
        cb();
      });
    };
    d.head.appendChild(script);
  }
  window['__ROLLUP_PLUGIN_HOT_RUNTIME'].then(function() {
    System.import("/public/dist/gsm/frontend/app/client-entry.js", wsServerUrl).catch(err => {
    console.error(err && err.stack || err);
  });
  });

})();
