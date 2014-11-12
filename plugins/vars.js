/*
 * Copyright (c) 2014, Jorge Falcão.
 * Copyrights licensed under the BSD License. See the accompanying LICENSE.txt file for terms.
 */

// It's the vars plugin. Used to define some vars before boomerang <script />.
// Example:
// <script type="text/javascript">
// (function() {
//    _vars = [];
//    _vars.push(['page', 'Login']);
//
//    var l=document.createElement('script');
//    l.type = 'text/javascript';l.async=true;
//    l.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'your-server/boomerang-0.9.0.js';
//    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(l);
//})();
//</script>

(function (w) {

    BOOMR = BOOMR || {};
    BOOMR.plugins = BOOMR.plugins || {};

    var impl = {
        complete: false,
        start: function () {
            if (w._vars && w._vars instanceof Array) {
                var _vars = w._vars;
                for (var i = 0; i < _vars.length; i++) {
                    var p = _vars[i];
                    if (p.length === 2) {
                        BOOMR.addVar(p[0], p[1]);
                    }
                }
            }
            impl.complete = true;
            BOOMR.sendBeacon();
        }
    };

    BOOMR.plugins.vars = {
        init: function () {
            BOOMR.subscribe("page_ready", impl.start, null, impl);
            return this;
        },
        is_complete: function () {
            return impl.complete;
        }
    };

}(window));
