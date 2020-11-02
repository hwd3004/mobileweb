/*! jQuery Mobile <%= version %> | Git HEADhash: 1f0cec9 <> 2018-09-10T04:34:35Z | (c) 2010, 2018 jQuery Foundation, Inc. | jquery.org/license */

!(function (a, b, c) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (d) {
        return c(d, a, b), d.mobile;
      })
    : c(a.jQuery, a, b);
})(this, document, function (a, b, c, d) {
  !(function (b) {
    "function" == typeof define && define.amd
      ? define("jquery-ui/version", ["jquery"], b)
      : b(a);
  })(function (a) {
    return (a.ui = a.ui || {}), (a.ui.version = "1.12.1");
  }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/widget", ["jquery", "./version"], b)
        : b(a);
    })(function (a) {
      var b = 0,
        c = Array.prototype.slice;
      return (
        (a.cleanData = (function (b) {
          return function (c) {
            var d, e, f;
            for (f = 0; null != (e = c[f]); f++)
              try {
                (d = a._data(e, "events")),
                  d && d.remove && a(e).triggerHandler("remove");
              } catch (g) {}
            b(c);
          };
        })(a.cleanData)),
        (a.widget = function (b, c, d) {
          var e,
            f,
            g,
            h = {},
            i = b.split(".")[0];
          b = b.split(".")[1];
          var j = i + "-" + b;
          return (
            d || ((d = c), (c = a.Widget)),
            a.isArray(d) && (d = a.extend.apply(null, [{}].concat(d))),
            (a.expr[":"][j.toLowerCase()] = function (b) {
              return !!a.data(b, j);
            }),
            (a[i] = a[i] || {}),
            (e = a[i][b]),
            (f = a[i][b] = function (a, b) {
              return this._createWidget
                ? void (arguments.length && this._createWidget(a, b))
                : new f(a, b);
            }),
            a.extend(f, e, {
              version: d.version,
              _proto: a.extend({}, d),
              _childConstructors: [],
            }),
            (g = new c()),
            (g.options = a.widget.extend({}, g.options)),
            a.each(d, function (b, d) {
              return a.isFunction(d)
                ? void (h[b] = (function () {
                    function a() {
                      return c.prototype[b].apply(this, arguments);
                    }
                    function e(a) {
                      return c.prototype[b].apply(this, a);
                    }
                    return function () {
                      var b,
                        c = this._super,
                        f = this._superApply;
                      return (
                        (this._super = a),
                        (this._superApply = e),
                        (b = d.apply(this, arguments)),
                        (this._super = c),
                        (this._superApply = f),
                        b
                      );
                    };
                  })())
                : void (h[b] = d);
            }),
            (f.prototype = a.widget.extend(
              g,
              { widgetEventPrefix: e ? g.widgetEventPrefix || b : b },
              h,
              { constructor: f, namespace: i, widgetName: b, widgetFullName: j }
            )),
            e
              ? (a.each(e._childConstructors, function (b, c) {
                  var d = c.prototype;
                  a.widget(d.namespace + "." + d.widgetName, f, c._proto);
                }),
                delete e._childConstructors)
              : c._childConstructors.push(f),
            a.widget.bridge(b, f),
            f
          );
        }),
        (a.widget.extend = function (b) {
          for (
            var e, f, g = c.call(arguments, 1), h = 0, i = g.length;
            i > h;
            h++
          )
            for (e in g[h])
              (f = g[h][e]),
                g[h].hasOwnProperty(e) &&
                  f !== d &&
                  (a.isPlainObject(f)
                    ? (b[e] = a.isPlainObject(b[e])
                        ? a.widget.extend({}, b[e], f)
                        : a.widget.extend({}, f))
                    : (b[e] = f));
          return b;
        }),
        (a.widget.bridge = function (b, e) {
          var f = e.prototype.widgetFullName || b;
          a.fn[b] = function (g) {
            var h = "string" == typeof g,
              i = c.call(arguments, 1),
              j = this;
            return (
              h
                ? this.length || "instance" !== g
                  ? this.each(function () {
                      var c,
                        e = a.data(this, f);
                      return "instance" === g
                        ? ((j = e), !1)
                        : e
                        ? a.isFunction(e[g]) && "_" !== g.charAt(0)
                          ? ((c = e[g].apply(e, i)),
                            c !== e && c !== d
                              ? ((j = c && c.jquery ? j.pushStack(c.get()) : c),
                                !1)
                              : void 0)
                          : a.error(
                              "no such method '" +
                                g +
                                "' for " +
                                b +
                                " widget instance"
                            )
                        : a.error(
                            "cannot call methods on " +
                              b +
                              " prior to initialization; attempted to call method '" +
                              g +
                              "'"
                          );
                    })
                  : (j = d)
                : (i.length && (g = a.widget.extend.apply(null, [g].concat(i))),
                  this.each(function () {
                    var b = a.data(this, f);
                    b
                      ? (b.option(g || {}), b._init && b._init())
                      : a.data(this, f, new e(g, this));
                  })),
              j
            );
          };
        }),
        (a.Widget = function () {}),
        (a.Widget._childConstructors = []),
        (a.Widget.prototype = {
          widgetName: "widget",
          widgetEventPrefix: "",
          defaultElement: "<div>",
          options: { classes: {}, disabled: !1, create: null },
          _createWidget: function (c, d) {
            (d = a(d || this.defaultElement || this)[0]),
              (this.element = a(d)),
              (this.uuid = b++),
              (this.eventNamespace = "." + this.widgetName + this.uuid),
              (this.bindings = a()),
              (this.hoverable = a()),
              (this.focusable = a()),
              (this.classesElementLookup = {}),
              d !== this &&
                (a.data(d, this.widgetFullName, this),
                this._on(!0, this.element, {
                  remove: function (a) {
                    a.target === d && this.destroy();
                  },
                }),
                (this.document = a(
                  d.style ? d.ownerDocument : d.document || d
                )),
                (this.window = a(
                  this.document[0].defaultView || this.document[0].parentWindow
                ))),
              (this.options = a.widget.extend(
                {},
                this.options,
                this._getCreateOptions(),
                c
              )),
              this._create(),
              this.options.disabled &&
                this._setOptionDisabled(this.options.disabled),
              this._trigger("create", null, this._getCreateEventData()),
              this._init();
          },
          _getCreateOptions: function () {
            return {};
          },
          _getCreateEventData: a.noop,
          _create: a.noop,
          _init: a.noop,
          destroy: function () {
            var b = this;
            this._destroy(),
              a.each(this.classesElementLookup, function (a, c) {
                b._removeClass(c, a);
              }),
              this.element
                .off(this.eventNamespace)
                .removeData(this.widgetFullName),
              this.widget()
                .off(this.eventNamespace)
                .removeAttr("aria-disabled"),
              this.bindings.off(this.eventNamespace);
          },
          _destroy: a.noop,
          widget: function () {
            return this.element;
          },
          option: function (b, c) {
            var e,
              f,
              g,
              h = b;
            if (0 === arguments.length)
              return a.widget.extend({}, this.options);
            if ("string" == typeof b)
              if (((h = {}), (e = b.split(".")), (b = e.shift()), e.length)) {
                for (
                  f = h[b] = a.widget.extend({}, this.options[b]), g = 0;
                  g < e.length - 1;
                  g++
                )
                  (f[e[g]] = f[e[g]] || {}), (f = f[e[g]]);
                if (((b = e.pop()), 1 === arguments.length))
                  return f[b] === d ? null : f[b];
                f[b] = c;
              } else {
                if (1 === arguments.length)
                  return this.options[b] === d ? null : this.options[b];
                h[b] = c;
              }
            return this._setOptions(h), this;
          },
          _setOptions: function (a) {
            var b;
            for (b in a) this._setOption(b, a[b]);
            return this;
          },
          _setOption: function (a, b) {
            return (
              "classes" === a && this._setOptionClasses(b),
              (this.options[a] = b),
              "disabled" === a && this._setOptionDisabled(b),
              this
            );
          },
          _setOptionClasses: function (b) {
            var c, d, e;
            for (c in b)
              (e = this.classesElementLookup[c]),
                b[c] !== this.options.classes[c] &&
                  e &&
                  e.length &&
                  ((d = a(e.get())),
                  this._removeClass(e, c),
                  d.addClass(
                    this._classes({ element: d, keys: c, classes: b, add: !0 })
                  ));
          },
          _setOptionDisabled: function (a) {
            this._toggleClass(
              this.widget(),
              this.widgetFullName + "-disabled",
              null,
              !!a
            ),
              a &&
                (this._removeClass(this.hoverable, null, "ui-state-hover"),
                this._removeClass(this.focusable, null, "ui-state-focus"));
          },
          enable: function () {
            return this._setOptions({ disabled: !1 });
          },
          disable: function () {
            return this._setOptions({ disabled: !0 });
          },
          _classes: function (b) {
            function c(c, f) {
              var g, h;
              for (h = 0; h < c.length; h++)
                (g = e.classesElementLookup[c[h]] || a()),
                  (g = a(
                    b.add
                      ? a.unique(g.get().concat(b.element.get()))
                      : g.not(b.element).get()
                  )),
                  (e.classesElementLookup[c[h]] = g),
                  d.push(c[h]),
                  f && b.classes[c[h]] && d.push(b.classes[c[h]]);
            }
            var d = [],
              e = this;
            return (
              (b = a.extend(
                { element: this.element, classes: this.options.classes || {} },
                b
              )),
              this._on(b.element, { remove: "_untrackClassesElement" }),
              b.keys && c(b.keys.match(/\S+/g) || [], !0),
              b.extra && c(b.extra.match(/\S+/g) || []),
              d.join(" ")
            );
          },
          _untrackClassesElement: function (b) {
            var c = this;
            a.each(c.classesElementLookup, function (d, e) {
              -1 !== a.inArray(b.target, e) &&
                (c.classesElementLookup[d] = a(e.not(b.target).get()));
            });
          },
          _removeClass: function (a, b, c) {
            return this._toggleClass(a, b, c, !1);
          },
          _addClass: function (a, b, c) {
            return this._toggleClass(a, b, c, !0);
          },
          _toggleClass: function (a, b, c, d) {
            d = "boolean" == typeof d ? d : c;
            var e = "string" == typeof a || null === a,
              f = {
                extra: e ? b : c,
                keys: e ? a : b,
                element: e ? this.element : a,
                add: d,
              };
            return f.element.toggleClass(this._classes(f), d), this;
          },
          _on: function (b, c, d) {
            var e,
              f = this;
            "boolean" != typeof b && ((d = c), (c = b), (b = !1)),
              d
                ? ((c = e = a(c)), (this.bindings = this.bindings.add(c)))
                : ((d = c), (c = this.element), (e = this.widget())),
              a.each(d, function (d, g) {
                function h() {
                  return b ||
                    (f.options.disabled !== !0 &&
                      !a(this).hasClass("ui-state-disabled"))
                    ? ("string" == typeof g ? f[g] : g).apply(f, arguments)
                    : void 0;
                }
                "string" != typeof g &&
                  (h.guid = g.guid = g.guid || h.guid || a.guid++);
                var i = d.match(/^([\w:-]*)\s*(.*)$/),
                  j = i[1] + f.eventNamespace,
                  k = i[2];
                k ? e.on(j, k, h) : c.on(j, h);
              });
          },
          _off: function (b, c) {
            (c =
              (c || "").split(" ").join(this.eventNamespace + " ") +
              this.eventNamespace),
              b.off(c).off(c),
              (this.bindings = a(this.bindings.not(b).get())),
              (this.focusable = a(this.focusable.not(b).get())),
              (this.hoverable = a(this.hoverable.not(b).get()));
          },
          _delay: function (a, b) {
            function c() {
              return ("string" == typeof a ? d[a] : a).apply(d, arguments);
            }
            var d = this;
            return setTimeout(c, b || 0);
          },
          _hoverable: function (b) {
            (this.hoverable = this.hoverable.add(b)),
              this._on(b, {
                mouseenter: function (b) {
                  this._addClass(a(b.currentTarget), null, "ui-state-hover");
                },
                mouseleave: function (b) {
                  this._removeClass(a(b.currentTarget), null, "ui-state-hover");
                },
              });
          },
          _focusable: function (b) {
            (this.focusable = this.focusable.add(b)),
              this._on(b, {
                focusin: function (b) {
                  this._addClass(a(b.currentTarget), null, "ui-state-focus");
                },
                focusout: function (b) {
                  this._removeClass(a(b.currentTarget), null, "ui-state-focus");
                },
              });
          },
          _trigger: function (b, c, d) {
            var e,
              f,
              g = this.options[b];
            if (
              ((d = d || {}),
              (c = a.Event(c)),
              (c.type = (b === this.widgetEventPrefix
                ? b
                : this.widgetEventPrefix + b
              ).toLowerCase()),
              (c.target = this.element[0]),
              (f = c.originalEvent))
            )
              for (e in f) e in c || (c[e] = f[e]);
            return (
              this.element.trigger(c, d),
              !(
                (a.isFunction(g) &&
                  g.apply(this.element[0], [c].concat(d)) === !1) ||
                c.isDefaultPrevented()
              )
            );
          },
        }),
        a.each({ show: "fadeIn", hide: "fadeOut" }, function (b, c) {
          a.Widget.prototype["_" + b] = function (d, e, f) {
            "string" == typeof e && (e = { effect: e });
            var g,
              h = e
                ? e === !0 || "number" == typeof e
                  ? c
                  : e.effect || c
                : b;
            (e = e || {}),
              "number" == typeof e && (e = { duration: e }),
              (g = !a.isEmptyObject(e)),
              (e.complete = f),
              e.delay && d.delay(e.delay),
              g && a.effects && a.effects.effect[h]
                ? d[b](e)
                : h !== b && d[h]
                ? d[h](e.duration, e.easing, f)
                : d.queue(function (c) {
                    a(this)[b](), f && f.call(d[0]), c();
                  });
          };
        }),
        a.widget
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("ns", ["jquery"], b)
        : b(a);
    })(function (a) {
      return (a.mobile = { version: "@VERSION" }), a.mobile;
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/keycode", ["jquery", "./version"], b)
        : b(a);
    })(function (a) {
      return (a.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("helpers", ["jquery", "./ns", "jquery-ui/keycode"], b)
        : b(a);
    })(function (a) {
      var d = function (b, c) {
        var d = b.parent(),
          e = [],
          f = function () {
            var b = a(this),
              c =
                a.mobile.toolbar && b.data("mobile-toolbar")
                  ? b.toolbar("option")
                  : {
                      position: b.attr("data-" + a.mobile.ns + "position"),
                      updatePagePadding:
                        b.attr(
                          "data-" + a.mobile.ns + "update-page-padding"
                        ) !== !1,
                    };
            return !("fixed" === c.position && c.updatePagePadding === !0);
          },
          g = d.children(":jqmData(type='header')").filter(f),
          h = b.children(":jqmData(type='header')"),
          i = d.children(":jqmData(type='footer')").filter(f),
          j = b.children(":jqmData(type='footer')");
        return (
          0 === h.length && g.length > 0 && (e = e.concat(g.toArray())),
          0 === j.length && i.length > 0 && (e = e.concat(i.toArray())),
          a.each(e, function (b, d) {
            c -= a(d).outerHeight();
          }),
          Math.max(0, c)
        );
      };
      return (
        a.extend(a.mobile, {
          window: a(b),
          document: a(c),
          keyCode: a.ui.keyCode,
          behaviors: {},
          focusPage: function (a) {
            var b = a.find("[autofocus]");
            b.length || (b = a.find(".ui-title").eq(0)),
              b.length || (b = a),
              b.focus();
          },
          silentScroll: function (c) {
            a.mobile.window.scrollTop() > 0 ||
              ("number" !== a.type(c) && (c = a.mobile.defaultHomeScroll),
              (a.event.special.scrollstart.enabled = !1),
              setTimeout(function () {
                b.scrollTo(0, c),
                  a.mobile.document.trigger("silentscroll", { x: 0, y: c });
              }, 20),
              setTimeout(function () {
                a.event.special.scrollstart.enabled = !0;
              }, 150));
          },
          getClosestBaseUrl: function (b) {
            var c = a(b).closest(".ui-page").jqmData("url"),
              d = a.mobile.path.documentBase.hrefNoHash;
            return (
              (a.mobile.base.dynamicBaseEnabled &&
                c &&
                a.mobile.path.isPath(c)) ||
                (c = d),
              a.mobile.path.makeUrlAbsolute(c, d)
            );
          },
          removeActiveLinkClass: function (b) {
            !a.mobile.activeClickedLink ||
              (a.mobile.activeClickedLink.closest(".ui-page-active").length &&
                !b) ||
              a.mobile.activeClickedLink.removeClass("ui-button-active"),
              (a.mobile.activeClickedLink = null);
          },
          enhanceable: function (a) {
            return this.haveParents(a, "enhance");
          },
          hijackable: function (a) {
            return this.haveParents(a, "ajax");
          },
          haveParents: function (b, c) {
            if (!a.mobile.ignoreContentEnabled) return b;
            var d,
              e,
              f,
              g,
              h,
              i = b.length,
              j = a();
            for (g = 0; i > g; g++) {
              for (e = b.eq(g), f = !1, d = b[g]; d; ) {
                if (
                  ((h = d.getAttribute
                    ? d.getAttribute("data-" + a.mobile.ns + c)
                    : ""),
                  "false" === h)
                ) {
                  f = !0;
                  break;
                }
                d = d.parentNode;
              }
              f || (j = j.add(e));
            }
            return j;
          },
          getScreenHeight: function () {
            return b.innerHeight || a.mobile.window.height();
          },
          resetActivePageHeight: function (c) {
            var e = a(".ui-page-active"),
              f = e.height(),
              g = e.outerHeight(!0);
            (c = d(e, "number" == typeof c ? c : a(b).height())),
              e.css("min-height", ""),
              e.height() < c && e.css("min-height", c - (g - f));
          },
          loading: function () {
            var b = this.loading._widget || a.mobile.loader().element,
              c = b.loader.apply(b, arguments);
            return (this.loading._widget = b), c;
          },
          isElementCurrentlyVisible: function (d) {
            if (((d = "string" == typeof d ? a(d)[0] : d[0]), !d)) return !0;
            var e = d.getBoundingClientRect();
            return (
              e.bottom > 0 &&
              e.right > 0 &&
              e.top < (b.innerHeight || c.documentElement.clientHeight) &&
              e.left < (b.innerWidth || c.documentElement.clientWidth)
            );
          },
        }),
        (a.addDependents = function (b, c) {
          var d = a(b),
            e = d.jqmData("dependents") || a();
          d.jqmData("dependents", a(e).add(c));
        }),
        a.fn.extend({
          removeWithDependents: function () {
            a.removeWithDependents(this);
          },
          addDependents: function (b) {
            a.addDependents(this, b);
          },
          getEncodedText: function () {
            return a("<a>").text(this.text()).html();
          },
          jqmEnhanceable: function () {
            return a.mobile.enhanceable(this);
          },
          jqmHijackable: function () {
            return a.mobile.hijackable(this);
          },
        }),
        (a.removeWithDependents = function (b) {
          var c = a(b);
          (c.jqmData("dependents") || a()).remove(), c.remove();
        }),
        (a.addDependents = function (b, c) {
          var d = a(b),
            e = d.jqmData("dependents") || a();
          d.jqmData("dependents", a(e).add(c));
        }),
        (a.find.matches = function (b, c) {
          return a.find(b, null, null, c);
        }),
        (a.find.matchesSelector = function (b, c) {
          return a.find(c, null, null, [b]).length > 0;
        }),
        a.mobile
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("defaults", ["jquery", "./ns"], b)
        : b(a);
    })(function (a) {
      return a.extend(a.mobile, {
        hideUrlBar: !0,
        keepNative: ":jqmData(role='none'), :jqmData(role='nojs')",
        ajaxEnabled: !0,
        hashListeningEnabled: !0,
        linkBindingEnabled: !0,
        defaultPageTransition: "fade",
        maxTransitionWidth: !1,
        defaultDialogTransition: "pop",
        pageLoadErrorMessage: "Error Loading Page",
        pageLoadErrorMessageTheme: "a",
        phonegapNavigationEnabled: !1,
        autoInitializePage: !0,
        pushStateEnabled: !0,
        ignoreContentEnabled: !1,
        pageContainer: a(),
        allowCrossDomainPages: !1,
        dialogHashKey: "&ui-state=dialog",
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("data", ["jquery", "./ns"], b)
        : b(a);
    })(function (a) {
      var c = {},
        e = a.find,
        f = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        g = /:jqmData\(([^)]*)\)/g;
      return (
        a.extend(a.mobile, {
          ns: a.mobileBackcompat === !1 ? "ui-" : "",
          getAttribute: function (c, d) {
            var e;
            (c = c.jquery ? c[0] : c),
              c &&
                c.getAttribute &&
                (e = c.getAttribute("data-" + a.mobile.ns + d));
            try {
              e =
                "true" === e
                  ? !0
                  : "false" === e
                  ? !1
                  : "null" === e
                  ? null
                  : +e + "" === e
                  ? +e
                  : f.test(e)
                  ? b.JSON.parse(e)
                  : e;
            } catch (g) {}
            return e;
          },
          nsNormalizeDict: c,
          nsNormalize: function (b) {
            return c[b] || (c[b] = a.camelCase(a.mobile.ns + b));
          },
          closestPageData: function (a) {
            return a
              .closest(":jqmData(role='page'), :jqmData(role='dialog')")
              .data("mobile-page");
          },
        }),
        (a.fn.jqmData = function (b, c) {
          var e;
          return (
            "undefined" != typeof b &&
              (b && (b = a.mobile.nsNormalize(b)),
              (e =
                arguments.length < 2 || c === d
                  ? this.data(b)
                  : this.data(b, c))),
            e
          );
        }),
        (a.jqmData = function (b, c, d) {
          var e;
          return (
            "undefined" != typeof c &&
              (e = a.data(b, c ? a.mobile.nsNormalize(c) : c, d)),
            e
          );
        }),
        (a.fn.jqmRemoveData = function (b) {
          return this.removeData(a.mobile.nsNormalize(b));
        }),
        (a.jqmRemoveData = function (b, c) {
          return a.removeData(b, a.mobile.nsNormalize(c));
        }),
        (a.find = function (b, c, d, f) {
          return (
            b.indexOf(":jqmData") > -1 &&
              (b = b.replace(g, "[data-" + (a.mobile.ns || "") + "$1]")),
            e.call(this, b, c, d, f)
          );
        }),
        a.extend(a.find, e),
        a.mobile
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("core", ["./defaults", "./data", "./helpers"], b)
        : b(a);
    })(function () {}),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widget", ["jquery", "./ns", "jquery-ui/widget", "./data"], b)
        : b(a);
    })(function (a) {
      return (a.mobile.widget = a.mobile.widget || {});
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/widget.theme", ["jquery", "../core", "../widget"], b)
        : b(a);
    })(function (a) {
      return (
        (a.mobile.widget.theme = {
          _create: function () {
            var b = this;
            this._super(),
              a.each(this._themeElements(), function (a, c) {
                b._addClass(
                  c.element,
                  null,
                  c.prefix + b.options[c.option || "theme"]
                );
              });
          },
          _setOption: function (b, c) {
            var d = this;
            a.each(this._themeElements(), function (a, e) {
              var f = e.option || "theme";
              f === b &&
                d
                  ._removeClass(
                    e.element,
                    null,
                    e.prefix + d.options[e.option || "theme"]
                  )
                  ._addClass(e.element, null, e.prefix + c);
            }),
              this._superApply(arguments);
          },
        }),
        a.mobile.widget.theme
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/loader", [
            "jquery",
            "../helpers",
            "../defaults",
            "./widget.theme",
            "../widget",
          ], b)
        : b(a);
    })(function (a) {
      var b = a("html");
      return (
        a.widget("mobile.loader", {
          version: "@VERSION",
          options: {
            classes: {
              "ui-loader": "ui-corner-all",
              "ui-loader-icon": "ui-icon-loading",
            },
            enhanced: !1,
            theme: "a",
            textVisible: !1,
            text: "loading",
          },
          _create: function () {
            (this.loader = {}),
              this.options.enhanced
                ? ((this.loader.span = this.element.children("span")),
                  (this.loader.header = this.element.children("h1")))
                : ((this.loader.span = a("<span>")),
                  (this.loader.header = a("<h1>"))),
              this._addClass("ui-loader"),
              this._addClass(this.loader.span, "ui-loader-icon"),
              this._addClass(this.loader.header, "ui-loader-header"),
              this.options.enhanced ||
                this.element
                  .append(this.loader.span)
                  .append(this.loader.header);
          },
          _themeElements: function () {
            return [{ element: this.element, prefix: "ui-body-" }];
          },
          show: function (c, d, e) {
            var f, g, h, i;
            "object" === a.type(c)
              ? ((h = a.extend({}, this.options, c)), (c = h.theme))
              : ((h = this.options), (c = c || h.theme)),
              (g = d || (h.text === !1 ? "" : h.text)),
              this._addClass(b, "ui-loading"),
              (f = h.textVisible),
              (i = this.element.attr("class").match(/\bui-body-[a-z]\b/) || []),
              this._removeClass
                .apply(
                  this,
                  [
                    "ui-loader-verbose ui-loader-default ui-loader-textonly",
                  ].concat(i)
                )
                ._addClass(
                  "ui-loader-" +
                    (f || d || c.text ? "verbose" : "default") +
                    (h.textonly || e ? " ui-loader-textonly" : ""),
                  "ui-body-" + c
                ),
              this.loader.header.text(g),
              this.element.appendTo(
                a(a.mobile.pagecontainer ? ":mobile-pagecontainer" : "body")
              );
          },
          hide: function () {
            this._removeClass(b, "ui-loading");
          },
        }),
        a.widget("mobile.loader", a.mobile.loader, a.mobile.widget.theme)
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/loader.backcompat", ["jquery", "./loader"], b)
        : b(a);
    })(function (a) {
      return (
        a.mobileBackcompat !== !1 &&
          a.widget("mobile.loader", a.mobile.loader, {
            options: { html: "" },
            fakeFixLoader: a.noop,
            checkLoaderPosition: a.noop,
            show: function (b) {
              var c;
              this.resetHtml(),
                this._superApply(arguments),
                (c = ("object" === a.type(b) && b.html) || this.options.html),
                c && this.element.html(c);
            },
            resetHtml: function () {
              this.element
                .empty()
                .append(this.loader.span)
                .append(this.loader.header.empty());
            },
          }),
        a.mobile.loader
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("media", ["jquery", "./core"], b)
        : b(a);
    })(function (a) {
      return (
        (b.matchMedia =
          b.matchMedia ||
          (function (a, b) {
            var c,
              d = a.documentElement,
              e = d.firstElementChild || d.firstChild,
              f = a.createElement("body"),
              g = a.createElement("div");
            return (
              (g.id = "mq-test-1"),
              (g.style.cssText = "position:absolute;top:-100em"),
              (f.style.background = "none"),
              f.appendChild(g),
              function (a) {
                return (
                  (g.innerHTML =
                    '&shy;<style media="' +
                    a +
                    '"> #mq-test-1 { width: 42px; }</style>'),
                  d.insertBefore(f, e),
                  (c = 42 === g.offsetWidth),
                  d.removeChild(f),
                  { matches: c, media: a }
                );
              }
            );
          })(c)),
        (a.mobile.media = function (a) {
          var c = b.matchMedia(a);
          return c && c.matches;
        }),
        a.mobile.media
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("support/touch", ["jquery", "../ns"], b)
        : b(a);
    })(function (a) {
      var b = { touch: "ontouchend" in c };
      return (
        (a.mobile.support = a.mobile.support || {}),
        a.extend(a.support, b),
        a.extend(a.mobile.support, b),
        a.support
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("support/orientation", ["jquery"], b)
        : b(a);
    })(function (a) {
      return (
        a.extend(a.support, {
          orientation: "orientation" in b && "onorientationchange" in b,
        }),
        a.support
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("support", [
            "jquery",
            "./core",
            "./media",
            "./support/touch",
            "./support/orientation",
          ], b)
        : b(a);
    })(function (a) {
      function e(a) {
        var b,
          c = a.charAt(0).toUpperCase() + a.substr(1),
          e = (a + " " + n.join(c + " ") + c).split(" ");
        for (b in e) if (m[e[b]] !== d) return !0;
      }
      function f() {
        var c = b,
          d = !(
            !c.document.createElementNS ||
            !c.document.createElementNS("http://www.w3.org/2000/svg", "svg")
              .createSVGRect ||
            (c.opera && -1 === navigator.userAgent.indexOf("Chrome"))
          ),
          e = function (b) {
            (b && d) || a("html").addClass("ui-nosvg");
          },
          f = new c.Image();
        (f.onerror = function () {
          e(!1);
        }),
          (f.onload = function () {
            e(1 === f.width && 1 === f.height);
          }),
          (f.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==");
      }
      function g() {
        var e,
          f,
          g,
          h = "transform-3d",
          i = a.mobile.media(
            "(-" + n.join("-" + h + "),(-") + "-" + h + "),(" + h + ")"
          );
        if (i) return !!i;
        (e = c.createElement("div")),
          (f = { MozTransform: "-moz-transform", transform: "transform" }),
          l.append(e);
        for (g in f)
          e.style[g] !== d &&
            ((e.style[g] = "translate3d( 100px, 1px, 1px )"),
            (i = b.getComputedStyle(e).getPropertyValue(f[g])));
        return !!i && "none" !== i;
      }
      function h() {
        var a,
          d = c.createElement("x"),
          e = c.documentElement,
          f = b.getComputedStyle;
        return "pointerEvents" in d.style
          ? ((d.style.pointerEvents = "auto"),
            (d.style.pointerEvents = "x"),
            e.appendChild(d),
            (a = f && "auto" === f(d, "").pointerEvents),
            e.removeChild(d),
            !!a)
          : !1;
      }
      function i() {
        var a = c.createElement("div");
        return "undefined" != typeof a.getBoundingClientRect;
      }
      function j() {
        var a = b,
          c = navigator.userAgent,
          d = navigator.platform,
          e = c.match(/AppleWebKit\/([0-9]+)/),
          f = !!e && e[1],
          g = c.match(/Fennec\/([0-9]+)/),
          h = !!g && g[1],
          i = c.match(/Opera Mobi\/([0-9]+)/),
          j = !!i && i[1];
        return ((d.indexOf("iPhone") > -1 ||
          d.indexOf("iPad") > -1 ||
          d.indexOf("iPod") > -1) &&
          f &&
          534 > f) ||
          (a.operamini &&
            "[object OperaMini]" === {}.toString.call(a.operamini)) ||
          (i && 7458 > j) ||
          (c.indexOf("Android") > -1 && f && 533 > f) ||
          (h && 6 > h) ||
          ("palmGetResource" in b && f && 534 > f) ||
          (c.indexOf("MeeGo") > -1 && c.indexOf("NokiaBrowser/8.5.0") > -1)
          ? !1
          : !0;
      }
      var k,
        l = a("<body>").prependTo("html"),
        m = l[0].style,
        n = ["Webkit", "Moz", "O"],
        o = "palmGetResource" in b,
        p =
          b.operamini && "[object OperaMini]" === {}.toString.call(b.operamini),
        q = b.blackberry && !e("-webkit-transform");
      return (
        a.extend(a.mobile, { browser: {} }),
        (a.mobile.browser.oldIE = (function () {
          var a = 3,
            b = c.createElement("div"),
            d = b.all || [];
          do b.innerHTML = "<!--[if gt IE " + ++a + "]><br><![endif]-->";
          while (d[0]);
          return a > 4 ? a : !a;
        })()),
        (a.mobile.browser.newIEMobile = (function () {
          var b = c.createElement("div");
          return (
            !a.mobile.browser.oldIE &&
            "onmsgesturehold" in b &&
            "ontouchstart" in b &&
            "onpointerdown" in b
          );
        })()),
        a.extend(a.support, {
          pushState:
            "pushState" in history &&
            "replaceState" in history &&
            !(b.navigator.userAgent.indexOf("Firefox") >= 0 && b.top !== b) &&
            -1 === b.navigator.userAgent.search(/CriOS/),
          mediaquery: a.mobile.media("only all"),
          cssPseudoElement: !!e("content"),
          touchOverflow: !!e("overflowScrolling"),
          cssTransform3d: g(),
          boxShadow: !!e("boxShadow") && !q,
          fixedPosition: j(),
          scrollTop:
            ("pageXOffset" in b ||
              "scrollTop" in c.documentElement ||
              "scrollTop" in l[0]) &&
            !o &&
            !p,
          cssPointerEvents: h(),
          boundingRect: i(),
          inlineSVG: f,
        }),
        l.remove(),
        (k = (function () {
          var a = b.navigator.userAgent;
          return (
            a.indexOf("Nokia") > -1 &&
            (a.indexOf("Symbian/3") > -1 || a.indexOf("Series60/5") > -1) &&
            a.indexOf("AppleWebKit") > -1 &&
            a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)
          );
        })()),
        (a.mobile.gradeA = function () {
          return (
            ((a.support.mediaquery && a.support.cssPseudoElement) ||
              (a.mobile.browser.oldIE && a.mobile.browser.oldIE >= 8)) &&
            (a.support.boundingRect ||
              null !== a.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/))
          );
        }),
        (a.mobile.ajaxBlacklist = (b.blackberry && !b.WebKitPoint) || p || k),
        k &&
          a(function () {
            a("head link[rel='stylesheet']")
              .attr("rel", "alternate stylesheet")
              .attr("rel", "stylesheet");
          }),
        a.support.boxShadow || a("html").addClass("ui-noboxshadow"),
        a.support
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("events/navigate", ["jquery", "./../ns", "./../support"], b)
        : b(a);
    })(function (a) {
      var b,
        c = a.mobile.window,
        e = function () {};
      return (
        (a.event.special.beforenavigate = {
          setup: function () {
            c.on("navigate", e);
          },
          teardown: function () {
            c.off("navigate", e);
          },
        }),
        (a.event.special.navigate = b = {
          bound: !1,
          pushStateEnabled: !0,
          originalEventName: d,
          isPushStateEnabled: function () {
            return (
              a.support.pushState &&
              a.mobile.pushStateEnabled === !0 &&
              this.isHashChangeEnabled()
            );
          },
          isHashChangeEnabled: function () {
            return a.mobile.hashListeningEnabled === !0;
          },
          popstate: function (b) {
            var d, e, f;
            b.isDefaultPrevented() ||
              ((d = new a.Event("navigate")),
              (e = new a.Event("beforenavigate")),
              (f = b.originalEvent.state || {}),
              (e.originalEvent = b),
              c.trigger(e),
              e.isDefaultPrevented() ||
                (b.historyState && a.extend(f, b.historyState),
                (d.originalEvent = b),
                setTimeout(function () {
                  c.trigger(d, { state: f });
                }, 0)));
          },
          hashchange: function (b) {
            var d = new a.Event("navigate"),
              e = new a.Event("beforenavigate");
            (e.originalEvent = b),
              c.trigger(e),
              e.isDefaultPrevented() ||
                ((d.originalEvent = b),
                c.trigger(d, { state: b.hashchangeState || {} }));
          },
          setup: function () {
            b.bound ||
              ((b.bound = !0),
              b.isPushStateEnabled()
                ? ((b.originalEventName = "popstate"),
                  c.bind("popstate.navigate", b.popstate))
                : b.isHashChangeEnabled() &&
                  ((b.originalEventName = "hashchange"),
                  c.bind("hashchange.navigate", b.hashchange)));
          },
        }),
        a.event.special.navigate
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("vmouse", ["jquery"], b)
        : b(a);
    })(function (a) {
      function b(a) {
        for (; a && "undefined" != typeof a.originalEvent; )
          a = a.originalEvent;
        return a;
      }
      function e(c, e) {
        var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o = c.type;
        if (
          ((c = a.Event(c)),
          (c.type = e),
          (f = c.originalEvent),
          (g = C),
          o.search(/^(mouse|click)/) > -1 && (g = E),
          f)
        )
          for (l = g.length; l; ) (i = g[--l]), (c[i] = f[i]);
        if (
          (o.search(/mouse(down|up)|click/) > -1 && !c.which && (c.which = 1),
          -1 !== o.search(/^touch/) &&
            ((h = b(f)),
            (o = h.touches),
            (j = h.changedTouches),
            (k = o && o.length ? o[0] : j && j.length ? j[0] : d)))
        )
          for (m = 0, n = A.length; n > m; m++) (i = A[m]), (c[i] = k[i]);
        return c;
      }
      function f(b) {
        for (var c, d, e = {}; b; ) {
          c = a.data(b, y);
          for (d in c) c[d] && (e[d] = e.hasVirtualBinding = !0);
          b = b.parentNode;
        }
        return e;
      }
      function g(b, c) {
        for (var d; b; ) {
          if (((d = a.data(b, y)), d && (!c || d[c]))) return b;
          b = b.parentNode;
        }
        return null;
      }
      function h() {
        M = !1;
      }
      function i() {
        M = !0;
      }
      function j() {
        (Q = 0), (K.length = 0), (L = !1), i();
      }
      function k() {
        h();
      }
      function l() {
        G && (clearTimeout(G), (G = 0));
      }
      function m() {
        l(),
          (G = setTimeout(function () {
            (G = 0), j();
          }, a.vmouse.resetTimerDuration));
      }
      function n(b, c, d) {
        var f;
        return (
          ((d && d[b]) || (!d && g(c.target, b))) &&
            ((f = e(c, b)), a(c.target).trigger(f)),
          f
        );
      }
      function o(b) {
        var c,
          d = a.data(b.target, z);
        "click" === b.type &&
          "touchstart" === a.data(b.target, "lastTouchType") &&
          setTimeout(function () {
            "touchstart" === a.data(b.target, "lastTouchType") &&
              (j(), delete a.data(b.target).lastTouchType, o(b));
          }, a.vmouse.maximumTimeBetweenTouches),
          L ||
            (Q && Q === d) ||
            ((c = n("v" + b.type, b)),
            c &&
              (c.isDefaultPrevented() && b.preventDefault(),
              c.isPropagationStopped() && b.stopPropagation(),
              c.isImmediatePropagationStopped() &&
                b.stopImmediatePropagation()));
      }
      function p(c) {
        var d,
          e,
          g,
          h = b(c).touches;
        h &&
          1 === h.length &&
          ((d = c.target),
          (e = f(d)),
          a.data(c.target, "lastTouchType", c.type),
          e.hasVirtualBinding &&
            ((Q = P++),
            a.data(d, z, Q),
            l(),
            k(),
            (J = !1),
            (g = b(c).touches[0]),
            (H = g.pageX),
            (I = g.pageY),
            n("vmouseover", c, e),
            n("vmousedown", c, e)));
      }
      function q(b) {
        M ||
          (J || n("vmousecancel", b, f(b.target)),
          a.data(b.target, "lastTouchType", b.type),
          (J = !0),
          m());
      }
      function r(c) {
        if (!M) {
          var d = b(c).touches[0],
            e = J,
            g = a.vmouse.moveDistanceThreshold,
            h = f(c.target);
          a.data(c.target, "lastTouchType", c.type),
            (J = J || Math.abs(d.pageX - H) > g || Math.abs(d.pageY - I) > g),
            J && !e && n("vmousecancel", c, h),
            n("vmousemove", c, h),
            m();
        }
      }
      function s(c) {
        if (!M && a.data(c.target, "lastTouchType") !== d) {
          i(), delete a.data(c.target).lastTouchType;
          var e,
            g,
            h = f(c.target);
          n("vmouseup", c, h),
            J ||
              ((e = n("vclick", c, h)),
              e &&
                e.isDefaultPrevented() &&
                ((g = b(c).changedTouches[0]),
                K.push({ touchID: Q, x: g.clientX, y: g.clientY }),
                (L = !0))),
            n("vmouseout", c, h),
            (J = !1),
            m();
        }
      }
      function t(b) {
        var c,
          d = a.data(b, y);
        if (d) for (c in d) if (d[c]) return !0;
        return !1;
      }
      function u() {}
      function v(b) {
        var c = b.substr(1);
        return {
          setup: function () {
            t(this) || a.data(this, y, {});
            var d = a.data(this, y);
            (d[b] = !0),
              (F[b] = (F[b] || 0) + 1),
              1 === F[b] && O.bind(c, o),
              a(this).bind(c, u),
              N &&
                ((F.touchstart = (F.touchstart || 0) + 1),
                1 === F.touchstart &&
                  O.bind("touchstart", p)
                    .bind("touchend", s)
                    .bind("touchmove", r)
                    .bind("scroll", q));
          },
          teardown: function () {
            --F[b],
              F[b] || O.unbind(c, o),
              N &&
                (--F.touchstart,
                F.touchstart ||
                  O.unbind("touchstart", p)
                    .unbind("touchmove", r)
                    .unbind("touchend", s)
                    .unbind("scroll", q));
            var d = a(this),
              e = a.data(this, y);
            e && (e[b] = !1), d.unbind(c, u), t(this) || d.removeData(y);
          },
        };
      }
      var w,
        x,
        y = "virtualMouseBindings",
        z = "virtualTouchID",
        A = "clientX clientY pageX pageY screenX screenY".split(" "),
        B = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(
          " "
        ),
        C = "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
          " "
        ),
        D = a.event.mouseHooks ? a.event.mouseHooks.props : [],
        E = C.concat(D),
        F = {},
        G = 0,
        H = 0,
        I = 0,
        J = !1,
        K = [],
        L = !1,
        M = !1,
        N = "addEventListener" in c,
        O = a(c),
        P = 1,
        Q = 0;
      for (
        a.vmouse = {
          moveDistanceThreshold: 10,
          clickDistanceThreshold: 10,
          resetTimerDuration: 1500,
          maximumTimeBetweenTouches: 100,
        },
          x = 0;
        x < B.length;
        x++
      )
        a.event.special[B[x]] = v(B[x]);
      N &&
        c.addEventListener(
          "click",
          function (b) {
            var c,
              d,
              e,
              f,
              g,
              h,
              i = K.length,
              j = b.target;
            if (i)
              for (
                c = b.clientX,
                  d = b.clientY,
                  w = a.vmouse.clickDistanceThreshold,
                  e = j;
                e;

              ) {
                for (f = 0; i > f; f++)
                  if (
                    ((g = K[f]),
                    (h = 0),
                    (e === j &&
                      Math.abs(g.x - c) < w &&
                      Math.abs(g.y - d) < w) ||
                      a.data(e, z) === g.touchID)
                  )
                    return b.preventDefault(), void b.stopPropagation();
                e = e.parentNode;
              }
          },
          !0
        );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("events/touch", ["jquery", "../vmouse", "../support/touch"], b)
        : b(a);
    })(function (a) {
      function e(b, c, e, f) {
        var g = e.type;
        (e.type = c),
          f ? a.event.trigger(e, d, b) : a.event.dispatch.call(b, e),
          (e.type = g);
      }
      var f = a(c),
        g = a.mobile.support.touch,
        h = g ? "touchstart" : "mousedown",
        i = g ? "touchend" : "mouseup",
        j = g ? "touchmove" : "mousemove";
      return (
        a.each(
          "touchstart touchmove touchend tap taphold swipe swipeleft swiperight".split(
            " "
          ),
          function (b, c) {
            (a.fn[c] = function (a) {
              return a ? this.bind(c, a) : this.trigger(c);
            }),
              a.attrFn && (a.attrFn[c] = !0);
          }
        ),
        (a.event.special.tap = {
          tapholdThreshold: 750,
          emitTapOnTaphold: !0,
          setup: function () {
            var b = this,
              c = a(b),
              d = !1;
            c.bind("vmousedown", function (g) {
              function h() {
                j && (c.bind("vclick", k), clearTimeout(j));
              }
              function i() {
                h(),
                  c.unbind("vclick", k).unbind("vmouseup", h),
                  f.unbind("vmousecancel", i);
              }
              if (((d = !1), g.which && 1 !== g.which)) return !0;
              var j,
                k,
                l = g.target;
              (k = function (a) {
                i(),
                  d || l !== a.target
                    ? d && a.preventDefault()
                    : e(b, "tap", a);
              }),
                c.bind("vmouseup", h),
                f.bind("vmousecancel", i),
                (j = setTimeout(function () {
                  a.event.special.tap.emitTapOnTaphold || (d = !0),
                    (j = 0),
                    e(b, "taphold", a.Event("taphold", { target: l }));
                }, a.event.special.tap.tapholdThreshold));
            });
          },
          teardown: function () {
            a(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),
              f.unbind("vmousecancel");
          },
        }),
        (a.event.special.swipe = {
          scrollSupressionThreshold: 30,
          durationThreshold: 1e3,
          horizontalDistanceThreshold: b.devicePixelRatio >= 2 ? 15 : 30,
          verticalDistanceThreshold: b.devicePixelRatio >= 2 ? 15 : 30,
          getLocation: function (a) {
            var c = b.pageXOffset,
              d = b.pageYOffset,
              e = a.clientX,
              f = a.clientY;
            return (
              (0 === a.pageY && Math.floor(f) > Math.floor(a.pageY)) ||
              (0 === a.pageX && Math.floor(e) > Math.floor(a.pageX))
                ? ((e -= c), (f -= d))
                : (f < a.pageY - d || e < a.pageX - c) &&
                  ((e = a.pageX - c), (f = a.pageY - d)),
              { x: e, y: f }
            );
          },
          start: function (b) {
            var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
              d = a.event.special.swipe.getLocation(c);
            return {
              time: new Date().getTime(),
              coords: [d.x, d.y],
              origin: a(b.target),
            };
          },
          stop: function (b) {
            var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
              d = a.event.special.swipe.getLocation(c);
            return { time: new Date().getTime(), coords: [d.x, d.y] };
          },
          handleSwipe: function (b, c, d, f) {
            if (
              c.time - b.time < a.event.special.swipe.durationThreshold &&
              Math.abs(b.coords[0] - c.coords[0]) >
                a.event.special.swipe.horizontalDistanceThreshold &&
              Math.abs(b.coords[1] - c.coords[1]) <
                a.event.special.swipe.verticalDistanceThreshold
            ) {
              var g = b.coords[0] > c.coords[0] ? "swipeleft" : "swiperight";
              return (
                e(
                  d,
                  "swipe",
                  a.Event("swipe", { target: f, swipestart: b, swipestop: c }),
                  !0
                ),
                e(
                  d,
                  g,
                  a.Event(g, { target: f, swipestart: b, swipestop: c }),
                  !0
                ),
                !0
              );
            }
            return !1;
          },
          eventInProgress: !1,
          setup: function () {
            var b,
              c = this,
              d = a(c),
              e = {};
            (b = a.data(this, "mobile-events")),
              b || ((b = { length: 0 }), a.data(this, "mobile-events", b)),
              b.length++,
              (b.swipe = e),
              (e.start = function (b) {
                if (!a.event.special.swipe.eventInProgress) {
                  a.event.special.swipe.eventInProgress = !0;
                  var d,
                    g = a.event.special.swipe.start(b),
                    h = b.target,
                    k = !1;
                  (e.move = function (b) {
                    g &&
                      !b.isDefaultPrevented() &&
                      ((d = a.event.special.swipe.stop(b)),
                      k ||
                        ((k = a.event.special.swipe.handleSwipe(g, d, c, h)),
                        k && (a.event.special.swipe.eventInProgress = !1)),
                      Math.abs(g.coords[0] - d.coords[0]) >
                        a.event.special.swipe.scrollSupressionThreshold &&
                        b.preventDefault());
                  }),
                    (e.stop = function () {
                      (k = !0),
                        (a.event.special.swipe.eventInProgress = !1),
                        f.off(j, e.move),
                        (e.move = null);
                    }),
                    f.on(j, e.move).one(i, e.stop);
                }
              }),
              d.on(h, e.start);
          },
          teardown: function () {
            var b, c;
            (b = a.data(this, "mobile-events")),
              b &&
                ((c = b.swipe),
                delete b.swipe,
                b.length--,
                0 === b.length && a.removeData(this, "mobile-events")),
              c &&
                (c.start && a(this).off(h, c.start),
                c.move && f.off(j, c.move),
                c.stop && f.off(i, c.stop));
          },
        }),
        a.each(
          {
            taphold: "tap",
            swipeleft: "swipe.left",
            swiperight: "swipe.right",
          },
          function (b, c) {
            a.event.special[b] = {
              setup: function () {
                a(this).bind(c, a.noop);
              },
              teardown: function () {
                a(this).unbind(c);
              },
            };
          }
        ),
        a.event.special
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("events/scroll", ["jquery"], b)
        : b(a);
    })(function (a) {
      var b = "touchmove scroll";
      return (
        a.each(["scrollstart", "scrollstop"], function (b, c) {
          (a.fn[c] = function (a) {
            return a ? this.bind(c, a) : this.trigger(c);
          }),
            a.attrFn && (a.attrFn[c] = !0);
        }),
        (a.event.special.scrollstart = {
          enabled: !0,
          setup: function () {
            function c(b, c) {
              var e = b.type;
              (d = c),
                (b.type = d ? "scrollstart" : "scrollstop"),
                a.event.dispatch.call(f, b),
                (b.type = e);
            }
            var d,
              e,
              f = this,
              g = a(f),
              h = (a.event.special.scrollstart.handler = function (b) {
                a.event.special.scrollstart.enabled &&
                  (d || c(b, !0),
                  clearTimeout(e),
                  (e = setTimeout(function () {
                    c(b, !1);
                  }, 50)));
              });
            g.on(b, h);
          },
          teardown: function () {
            a(this).off(b, a.event.special.scrollstart.handler);
          },
        }),
        a.each({ scrollstop: "scrollstart" }, function (b, c) {
          a.event.special[b] = {
            setup: function () {
              a(this).bind(c, a.noop);
            },
            teardown: function () {
              a(this).unbind(c);
            },
          };
        }),
        a.event.special
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("events/throttledresize", ["jquery"], b)
        : b(a);
    })(function (a) {
      var b,
        c,
        d,
        e = 250,
        f = 0,
        g = function () {
          (c = new Date().getTime()),
            (d = c - f),
            d >= e
              ? ((f = c), a(this).trigger("throttledresize"))
              : (b && clearTimeout(b), (b = setTimeout(g, e - d)));
        };
      return (
        (a.event.special.throttledresize = {
          setup: function () {
            a(this).bind("resize", g);
          },
          teardown: function () {
            a(this).unbind("resize", g);
          },
        }),
        a.event.special.throttledresize
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("events/orientationchange", [
            "jquery",
            "../support/orientation",
            "./throttledresize",
          ], b)
        : b(a);
    })(function (a) {
      function d() {
        var a = e();
        a !== f && ((f = a), l.trigger(m));
      }
      var e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = a(b),
        m = "orientationchange",
        n = { 0: !0, 180: !0 };
      return (
        a.support.orientation &&
          ((i = b.innerWidth || l.width()),
          (j = b.innerHeight || l.height()),
          (k = 50),
          (g = i > j && i - j > k),
          (h = n[b.orientation]),
          ((g && h) || (!g && !h)) && (n = { "-90": !0, 90: !0 })),
        (a.event.special.orientationchange = a.extend(
          {},
          a.event.special.orientationchange,
          {
            setup: function () {
              return a.support.orientation &&
                !a.event.special.orientationchange.disabled
                ? !1
                : ((f = e()), void l.bind("throttledresize", d));
            },
            teardown: function () {
              return a.support.orientation &&
                !a.event.special.orientationchange.disabled
                ? !1
                : void l.unbind("throttledresize", d);
            },
            add: function (a) {
              var b = a.handler;
              a.handler = function (a) {
                return (a.orientation = e()), b.apply(this, arguments);
              };
            },
          }
        )),
        (a.event.special.orientationchange.orientation = e = function () {
          var d = !0,
            e = c.documentElement;
          return (
            (d = a.support.orientation
              ? n[b.orientation]
              : e && e.clientWidth / e.clientHeight < 1.1),
            d ? "portrait" : "landscape"
          );
        }),
        (a.fn[m] = function (a) {
          return a ? this.bind(m, a) : this.trigger(m);
        }),
        a.attrFn && (a.attrFn[m] = !0),
        a.event.special
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("events", [
            "jquery",
            "./events/navigate",
            "./events/touch",
            "./events/scroll",
            "./events/orientationchange",
          ], b)
        : b(a);
    })(function () {}),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("navigation/path", ["jquery", "./../ns"], b)
        : b(a);
    })(function (a) {
      var c,
        e,
        f = "&ui-state=dialog";
      return (
        (a.mobile.path = c = {
          uiStateKey: "&ui-state",
          urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
          getLocation: function (a) {
            var b = this.parseUrl(a || location.href),
              c = a ? b : location,
              d = b.hash;
            return (
              (d = "#" === d ? "" : d),
              c.protocol +
                b.doubleSlash +
                c.host +
                ("" !== c.protocol && "/" !== c.pathname.substring(0, 1)
                  ? "/"
                  : "") +
                c.pathname +
                c.search +
                d
            );
          },
          getDocumentUrl: function (b) {
            return b ? a.extend({}, c.documentUrl) : c.documentUrl.href;
          },
          parseLocation: function () {
            return this.parseUrl(this.getLocation());
          },
          parseUrl: function (b) {
            if ("object" === a.type(b)) return b;
            var d = c.urlParseRE.exec(b || "") || [];
            return {
              href: d[0] || "",
              hrefNoHash: d[1] || "",
              hrefNoSearch: d[2] || "",
              domain: d[3] || "",
              protocol: d[4] || "",
              doubleSlash: d[5] || "",
              authority: d[6] || "",
              username: d[8] || "",
              password: d[9] || "",
              host: d[10] || "",
              hostname: d[11] || "",
              port: d[12] || "",
              pathname: d[13] || "",
              directory: d[14] || "",
              filename: d[15] || "",
              search: d[16] || "",
              hash: d[17] || "",
            };
          },
          makePathAbsolute: function (a, b) {
            var c, d, e, f;
            if (a && "/" === a.charAt(0)) return a;
            for (
              a = a || "",
                b = b ? b.replace(/^\/|(\/[^\/]*|[^\/]+)$/g, "") : "",
                c = b ? b.split("/") : [],
                d = a.split("/"),
                e = 0;
              e < d.length;
              e++
            )
              switch ((f = d[e])) {
                case ".":
                  break;
                case "..":
                  c.length && c.pop();
                  break;
                default:
                  c.push(f);
              }
            return "/" + c.join("/");
          },
          isSameDomain: function (a, b) {
            return (
              c.parseUrl(a).domain.toLowerCase() ===
              c.parseUrl(b).domain.toLowerCase()
            );
          },
          isRelativeUrl: function (a) {
            return "" === c.parseUrl(a).protocol;
          },
          isAbsoluteUrl: function (a) {
            return "" !== c.parseUrl(a).protocol;
          },
          makeUrlAbsolute: function (a, b) {
            if (!c.isRelativeUrl(a)) return a;
            b === d && (b = this.documentBase);
            var e = c.parseUrl(a),
              f = c.parseUrl(b),
              g = e.protocol || f.protocol,
              h = e.protocol ? e.doubleSlash : e.doubleSlash || f.doubleSlash,
              i = e.authority || f.authority,
              j = "" !== e.pathname,
              k = c.makePathAbsolute(e.pathname || f.filename, f.pathname),
              l = e.search || (!j && f.search) || "",
              m = e.hash;
            return g + h + i + k + l + m;
          },
          addSearchParams: function (b, d) {
            var e = c.parseUrl(b),
              f = "object" == typeof d ? a.param(d) : d,
              g = e.search || "?";
            return (
              e.hrefNoSearch +
              g +
              ("?" !== g.charAt(g.length - 1) ? "&" : "") +
              f +
              (e.hash || "")
            );
          },
          convertUrlToDataUrl: function (a) {
            var d = a,
              e = c.parseUrl(a);
            return (
              c.isEmbeddedPage(e)
                ? (d = e.hash
                    .split(f)[0]
                    .replace(/^#/, "")
                    .replace(/\?.*$/, ""))
                : c.isSameDomain(e, this.documentBase) &&
                  (d = e.hrefNoHash
                    .replace(this.documentBase.domain, "")
                    .split(f)[0]),
              b.decodeURIComponent(d)
            );
          },
          get: function (a) {
            return (
              a === d && (a = c.parseLocation().hash),
              c.stripHash(a).replace(/[^\/]*\.[^\/*]+$/, "")
            );
          },
          set: function (a) {
            location.hash = a;
          },
          isPath: function (a) {
            return /\//.test(a);
          },
          clean: function (a) {
            return a.replace(this.documentBase.domain, "");
          },
          stripHash: function (a) {
            return a.replace(/^#/, "");
          },
          stripQueryParams: function (a) {
            return a.replace(/\?.*$/, "");
          },
          cleanHash: function (a) {
            return c.stripHash(a.replace(/\?.*$/, "").replace(f, ""));
          },
          isHashValid: function (a) {
            return /^#[^#]+$/.test(a);
          },
          isExternal: function (a) {
            var b = c.parseUrl(a);
            return !(
              !b.protocol ||
              b.domain.toLowerCase() === this.documentUrl.domain.toLowerCase()
            );
          },
          hasProtocol: function (a) {
            return /^(:?\w+:)/.test(a);
          },
          isEmbeddedPage: function (a) {
            var b = c.parseUrl(a);
            return "" !== b.protocol
              ? !this.isPath(b.hash) &&
                  b.hash &&
                  (b.hrefNoHash === this.documentUrl.hrefNoHash ||
                    (this.documentBaseDiffers &&
                      b.hrefNoHash === this.documentBase.hrefNoHash))
              : /^#/.test(b.href);
          },
          squash: function (a, b) {
            var d,
              e,
              f,
              g,
              h,
              i = this.isPath(a),
              j = this.parseUrl(a),
              k = j.hash,
              l = "";
            return (
              b ||
                (i
                  ? (b = c.getLocation())
                  : ((h = c.getDocumentUrl(!0)),
                    (b = c.isPath(h.hash) ? c.squash(h.href) : h.href))),
              (e = i ? c.stripHash(a) : a),
              (e = c.isPath(j.hash) ? c.stripHash(j.hash) : e),
              (g = e.indexOf(this.uiStateKey)),
              g > -1 && ((l = e.slice(g)), (e = e.slice(0, g))),
              (d = c.makeUrlAbsolute(e, b)),
              (f = this.parseUrl(d).search),
              i
                ? ((c.isPath(k) ||
                    0 === k.replace("#", "").indexOf(this.uiStateKey)) &&
                    (k = ""),
                  l && -1 === k.indexOf(this.uiStateKey) && (k += l),
                  -1 === k.indexOf("#") && "" !== k && (k = "#" + k),
                  (d = c.parseUrl(d)),
                  (d =
                    d.protocol + d.doubleSlash + d.host + d.pathname + f + k))
                : (d += d.indexOf("#") > -1 ? l : "#" + l),
              d
            );
          },
          isPreservableHash: function (a) {
            return 0 === a.replace("#", "").indexOf(this.uiStateKey);
          },
          hashToSelector: function (a) {
            var b = "#" === a.substring(0, 1);
            return (
              b && (a = a.substring(1)),
              (b ? "#" : "") +
                a.replace(/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g, "\\$1")
            );
          },
          getFilePath: function (a) {
            return a && a.split(f)[0];
          },
          isFirstPageUrl: function (b) {
            var e = c.parseUrl(c.makeUrlAbsolute(b, this.documentBase)),
              f =
                e.hrefNoHash === this.documentUrl.hrefNoHash ||
                (this.documentBaseDiffers &&
                  e.hrefNoHash === this.documentBase.hrefNoHash),
              g = a.mobile.firstPage,
              h = g && g[0] ? g[0].id : d;
            return (
              f &&
              (!e.hash ||
                "#" === e.hash ||
                (h && e.hash.replace(/^#/, "") === h))
            );
          },
          isPermittedCrossDomainRequest: function (b, c) {
            return (
              a.mobile.allowCrossDomainPages &&
              ("file:" === b.protocol || "content:" === b.protocol) &&
              -1 !== c.search(/^https?:/)
            );
          },
        }),
        (c.documentUrl = c.parseLocation()),
        (e = a("head").find("base")),
        (c.documentBase = e.length
          ? c.parseUrl(c.makeUrlAbsolute(e.attr("href"), c.documentUrl.href))
          : c.documentUrl),
        (c.documentBaseDiffers =
          c.documentUrl.hrefNoHash !== c.documentBase.hrefNoHash),
        (c.getDocumentBase = function (b) {
          return b ? a.extend({}, c.documentBase) : c.documentBase.href;
        }),
        c
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("navigation/history", ["jquery", "./../ns", "./path"], b)
        : b(a);
    })(function (a) {
      return (
        (a.mobile.History = function (a, b) {
          (this.stack = a || []), (this.activeIndex = b || 0);
        }),
        a.extend(a.mobile.History.prototype, {
          getActive: function () {
            return this.stack[this.activeIndex];
          },
          getLast: function () {
            return this.stack[this.previousIndex];
          },
          getNext: function () {
            return this.stack[this.activeIndex + 1];
          },
          getPrev: function () {
            return this.stack[this.activeIndex - 1];
          },
          add: function (a, b) {
            (b = b || {}),
              this.getNext() && this.clearForward(),
              b.hash && -1 === b.hash.indexOf("#") && (b.hash = "#" + b.hash),
              (b.url = a),
              this.stack.push(b),
              (this.activeIndex = this.stack.length - 1);
          },
          clearForward: function () {
            this.stack = this.stack.slice(0, this.activeIndex + 1);
          },
          find: function (a, b, c) {
            b = b || this.stack;
            var d,
              e,
              f,
              g = b.length;
            for (e = 0; g > e; e++)
              if (
                ((d = b[e]),
                (decodeURIComponent(a) === decodeURIComponent(d.url) ||
                  decodeURIComponent(a) === decodeURIComponent(d.hash)) &&
                  ((f = e), c))
              )
                return f;
            return f;
          },
          _findById: function (a) {
            var b,
              c = this.stack.length;
            for (b = 0; c > b && this.stack[b].id !== a; b++);
            return c > b ? b : d;
          },
          closest: function (a, b) {
            var c = b === d ? d : this._findById(b),
              e = this.activeIndex;
            return c !== d
              ? c
              : ((c = this.find(a, this.stack.slice(0, e))),
                c === d &&
                  ((c = this.find(a, this.stack.slice(e), !0)),
                  (c = c === d ? c : c + e)),
                c);
          },
          direct: function (b) {
            var c = this.closest(b.url, b.id),
              e = this.activeIndex;
            c !== d && ((this.activeIndex = c), (this.previousIndex = e)),
              e > c
                ? (b.present || b.back || a.noop)(this.getActive(), "back")
                : c > e
                ? (b.present || b.forward || a.noop)(
                    this.getActive(),
                    "forward"
                  )
                : c === d && b.missing && b.missing(this.getActive());
          },
        }),
        a.mobile.History
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("navigation/navigator", [
            "jquery",
            "./../ns",
            "../events/navigate",
            "./path",
            "./history",
          ], b)
        : b(a);
    })(function (a) {
      var d = a.mobile.path,
        e = location.href;
      return (
        (a.mobile.Navigator = function (b) {
          (this.history = b),
            (this.ignoreInitialHashChange = !0),
            a.mobile.window.bind({
              "popstate.history": a.proxy(this.popstate, this),
              "hashchange.history": a.proxy(this.hashchange, this),
            });
        }),
        a.extend(a.mobile.Navigator.prototype, {
          historyEntryId: 0,
          squash: function (f, g) {
            var h,
              i,
              j = d.isPath(f) ? d.stripHash(f) : f;
            return (
              (i = d.squash(f)),
              (h = a.extend({ id: ++this.historyEntryId, hash: j, url: i }, g)),
              b.history &&
                b.history.replaceState &&
                b.history.replaceState(h, h.title || c.title, i),
              this.ignoreInitialHashChange && (e = i),
              h
            );
          },
          hash: function (a, b) {
            var c, e, f, g;
            return (
              (c = d.parseUrl(a)),
              (e = d.parseLocation()),
              e.pathname + e.search === c.pathname + c.search
                ? (f = c.hash ? c.hash : c.pathname + c.search)
                : d.isPath(a)
                ? ((g = d.parseUrl(b)),
                  (f =
                    g.pathname +
                    g.search +
                    (d.isPreservableHash(g.hash)
                      ? g.hash.replace("#", "")
                      : "")))
                : (f = a),
              f
            );
          },
          go: function (e, f, g) {
            var h,
              i,
              j,
              k,
              l = a.event.special.navigate.isPushStateEnabled();
            (i = d.squash(e)),
              (j = this.hash(e, i)),
              g &&
                j !== d.stripHash(d.parseLocation().hash) &&
                (this.preventNextHashChange = g),
              (this.preventHashAssignPopState = !0),
              (b.location.hash = j),
              (this.preventHashAssignPopState = !1),
              (h = a.extend({ url: i, hash: j, title: c.title }, f)),
              l &&
                ((k = new a.Event("popstate")),
                (k.originalEvent = new a.Event("popstate", { state: null })),
                (h.id = (this.squash(e, h) || {}).id),
                g || ((this.ignorePopState = !0), a.mobile.window.trigger(k))),
              this.history.add(h.url, h);
          },
          popstate: function (b) {
            var c, f;
            if (a.event.special.navigate.isPushStateEnabled())
              return this.preventHashAssignPopState
                ? ((this.preventHashAssignPopState = !1),
                  void b.stopImmediatePropagation())
                : this.ignorePopState
                ? void (this.ignorePopState = !1)
                : !b.originalEvent.state &&
                  1 === this.history.stack.length &&
                  this.ignoreInitialHashChange &&
                  ((this.ignoreInitialHashChange = !1), location.href === e)
                ? void b.preventDefault()
                : ((c = d.parseLocation().hash),
                  !b.originalEvent.state && c
                    ? ((f = this.squash(c)),
                      this.history.add(f.url, f),
                      void (b.historyState = f))
                    : void this.history.direct({
                        id: (b.originalEvent.state || {}).id,
                        url: (b.originalEvent.state || {}).url || c,
                        present: function (c, d) {
                          (b.historyState = a.extend({}, c)),
                            (b.historyState.direction = d);
                        },
                      }));
          },
          hashchange: function (b) {
            var e, f;
            if (
              a.event.special.navigate.isHashChangeEnabled() &&
              !a.event.special.navigate.isPushStateEnabled()
            ) {
              if (this.preventNextHashChange)
                return (
                  (this.preventNextHashChange = !1),
                  void b.stopImmediatePropagation()
                );
              (e = this.history),
                (f = d.parseLocation().hash),
                this.history.direct({
                  url: f,
                  present: function (c, d) {
                    (b.hashchangeState = a.extend({}, c)),
                      (b.hashchangeState.direction = d);
                  },
                  missing: function () {
                    e.add(f, { hash: f, title: c.title });
                  },
                });
            }
          },
        }),
        a.mobile.Navigator
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("navigation/method", [
            "jquery",
            "./path",
            "./history",
            "./navigator",
          ], b)
        : b(a);
    })(function (a) {
      (a.mobile.navigate = function (b, c, d) {
        a.mobile.navigate.navigator.go(b, c, d);
      }),
        (a.mobile.navigate.history = new a.mobile.History()),
        (a.mobile.navigate.navigator = new a.mobile.Navigator(
          a.mobile.navigate.history
        ));
      var b = a.mobile.path.parseLocation();
      return (
        a.mobile.navigate.history.add(b.href, { hash: b.hash }),
        a.mobile.navigate
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/safe-active-element", ["jquery", "./version"], b)
        : b(a);
    })(function (a) {
      return (a.ui.safeActiveElement = function (a) {
        var b;
        try {
          b = a.activeElement;
        } catch (c) {
          b = a.body;
        }
        return b || (b = a.body), b.nodeName || (b = a.body), b;
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/safe-blur", ["jquery", "./version"], b)
        : b(a);
    })(function (a) {
      return (a.ui.safeBlur = function (b) {
        b && "body" !== b.nodeName.toLowerCase() && a(b).trigger("blur");
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("navigation/base", ["jquery", "./path", "./../ns"], b)
        : b(a);
    })(function (a) {
      var b,
        c = a("head").children("base"),
        e = function () {
          return a.mobile.dynamicBaseEnabled !== d
            ? a.mobile.dynamicBaseEnabled
            : b.dynamicBaseEnabled;
        };
      return (
        (b = {
          dynamicBaseEnabled: !0,
          element: function () {
            return (
              (c && c.length) ||
                (c = a("<base>", {
                  href: a.mobile.path.documentBase.hrefNoSearch,
                }).prependTo(a("head"))),
              c
            );
          },
          set: function (c) {
            e() &&
              b
                .element()
                .attr(
                  "href",
                  a.mobile.path.makeUrlAbsolute(c, a.mobile.path.documentBase)
                );
          },
          reset: function () {
            e() &&
              b.element().attr("href", a.mobile.path.documentBase.hrefNoSearch);
          },
        }),
        (a.mobile.base = b),
        b
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/enhancer", ["jquery"], b)
        : b(a);
    })(function (a) {
      var b,
        c = !1;
      return (
        a.fn.extend({
          enhance: function () {
            return a.enhance.enhance(this);
          },
          enhanceWithin: function () {
            return this.children().enhance(), this;
          },
          enhanceOptions: function () {
            return a.enhance.getOptions(this);
          },
          enhanceRoles: function () {
            return a.enhance.getRoles(this);
          },
        }),
        (a.enhance = a.enhance || {}),
        a.extend(a.enhance, {
          enhance: function (b) {
            var c,
              d = b.find("[" + a.enhance.defaultProp() + "]").addBack();
            for (
              a.enhance._filter && (d = a.enhance._filter(d)), c = 0;
              c < a.enhance.hooks.length;
              c++
            )
              a.enhance.hooks[c].call(b, d);
            return a.enhance.defaultFunction.call(b, d), b;
          },
          hooks: a.enhance.hooks || [],
          _filter: a.enhance._filter || !1,
          defaultProp:
            a.enhance.defaultProp ||
            function () {
              return "data-ui-role";
            },
          defaultFunction: function (b) {
            b.each(function () {
              var b,
                c = a(this).enhanceRoles();
              for (b = 0; b < c.length; b++) a.fn[c[b]] && a(this)[c[b]]();
            });
          },
          cache: !0,
          roleCache: {},
          getRoles: function (b) {
            if (!b.length) return [];
            var c,
              e = a.enhance.roleCache[b[0].id ? b[0].id : d];
            return e
              ? e
              : ((c = b.attr(a.enhance.defaultProp())),
                (e = c ? c.match(/\S+/g) : []),
                (a.enhance.roleCache[b[0].id] = e),
                e);
          },
          optionCache: {},
          getOptions: function (b) {
            var c,
              e = a.enhance.optionCache[b[0].id ? b[0].id : d];
            return e
              ? e
              : ((e = {}),
                (c = (a.mobile.ns || "ui-").replace("-", "")),
                a.each(a(b).data(), function (a, b) {
                  (a = a.replace(c, "")),
                    (a = a.charAt(0).toLowerCase() + a.slice(1)),
                    (e[a] = b);
                }),
                (a.enhance.optionCache[b[0].id] = e),
                e);
          },
          _installWidget: function () {
            a.Widget &&
              !c &&
              (a.extend(a.Widget.prototype, {
                _getCreateOptions: function (a) {
                  var b,
                    c,
                    e = this.element.enhanceOptions();
                  a = a || {};
                  for (b in this.options) (c = e[b]), c !== d && (a[b] = c);
                  return a;
                },
              }),
              (c = !0));
          },
        }),
        a.Widget
          ? a.enhance._installWidget()
          : Object.defineProperty(a, "Widget", {
              configurable: !0,
              enumerable: !0,
              get: function () {
                return b;
              },
              set: function (c) {
                c &&
                  ((b = c),
                  setTimeout(function () {
                    a.enhance._installWidget();
                  }));
              },
            }),
        a.enhance
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/enhancer.widgetCrawler", [
            "jquery",
            "../core",
            "widgets/enhancer",
          ], b)
        : b(a);
    })(function (a) {
      var b = function (c, d) {
          a.each(d, function (d, e) {
            var f,
              g = e.prototype,
              h = a.enhance,
              i = h.initGenerator(g);
            i &&
              ((f = c.find(i)),
              h._filter && (f = h._filter(f)),
              f[g.widgetName](),
              e._childConstructors &&
                e._childConstructors.length > 0 &&
                b(c, e._childConstructors));
          });
        },
        c = function () {
          a.enhance.initGenerator &&
            a.Widget &&
            b(this.addBack(), a.Widget._childConstructors);
        };
      return a.enhance.hooks.push(c), a.enhance;
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/enhancer.backcompat", [
            "jquery",
            "widgets/enhancer",
            "widgets/enhancer.widgetCrawler",
          ], b)
        : b(a);
    })(function (a) {
      if (a.mobileBackcompat !== !1) {
        var b = function (b) {
            return (
              (b = b.not(a.mobile.keepNative)),
              a.mobile.ignoreContentEnabled &&
                b.each(function () {
                  a(this).closest("[data-" + a.mobile.ns + "enhance='false']")
                    .length && (b = b.not(this));
                }),
              b
            );
          },
          c = function (b) {
            return (
              b.initSelector ||
              a[b.namespace][b.widgetName].prototype.initSelector ||
              !1
            );
          };
        (a.enhance._filter = b),
          (a.enhance.defaultProp = function () {
            return "data-" + a.mobile.ns + "role";
          }),
          (a.enhance.initGenerator = c);
      }
      return a.enhance;
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/page", [
            "jquery",
            "../widget",
            "./widget.theme",
            "../core",
            "widgets/enhancer",
            "widgets/enhancer.backcompat",
            "widgets/enhancer.widgetCrawler",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget("mobile.page", {
          version: "@VERSION",
          options: {
            theme: "a",
            domCache: !1,
            enhanceWithin: !0,
            enhanced: !1,
          },
          _create: function () {
            return this._trigger("beforecreate") === !1
              ? !1
              : (this._establishStructure(),
                this._setAttributes(),
                this._attachToDOM(),
                this._addHandlers(),
                void (
                  this.options.enhanceWithin && this.element.enhanceWithin()
                ));
          },
          _establishStructure: a.noop,
          _setAttributes: function () {
            this.options.role &&
              this.element.attr(
                "data-" + a.mobile.ns + "role",
                this.options.role
              ),
              this.element.attr("tabindex", "0"),
              this._addClass("ui-page");
          },
          _attachToDOM: a.noop,
          _addHandlers: function () {
            this._on(this.element, {
              pagebeforehide: "_handlePageBeforeHide",
              pagebeforeshow: "_handlePageBeforeShow",
            });
          },
          bindRemove: function (b) {
            var c = this.element;
            !c.data("mobile-page").options.domCache &&
              c.is(":jqmData(external-page='true')") &&
              this._on(this.document, {
                pagecontainerhide:
                  b ||
                  function (b, c) {
                    if (c.prevPage[0] === this.element[0] && !c.samePage) {
                      var d = new a.Event("pageremove");
                      this._trigger("remove", d),
                        d.isDefaultPrevented() ||
                          this.element.removeWithDependents();
                    }
                  },
              });
          },
          _themeElements: function () {
            return [{ element: this.element, prefix: "ui-page-theme-" }];
          },
          _handlePageBeforeShow: function () {
            this._setContainerSwatch(this.options.theme);
          },
          _handlePageBeforeHide: function () {
            this._setContainerSwatch("none");
          },
          _setContainerSwatch: function (a) {
            var b = this.element.parent().pagecontainer("instance");
            b && b.option("theme", a);
          },
        }),
        a.widget("mobile.page", a.mobile.page, a.mobile.widget.theme),
        a.mobile.page
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/pagecontainer", [
            "jquery",
            "../core",
            "jquery-ui/safe-active-element",
            "jquery-ui/safe-blur",
            "jquery-ui/widget",
            "../navigation/path",
            "../navigation/base",
            "../events/navigate",
            "../navigation/history",
            "../navigation/navigator",
            "../navigation/method",
            "../events/scroll",
            "../support",
            "../widgets/page",
          ], b)
        : b(a);
    })(function (a) {
      var e = [],
        f = !1;
      return (
        a.widget("mobile.pagecontainer", {
          version: "@VERSION",
          options: {
            theme: "a",
            changeOptions: {
              transition: d,
              reverse: !1,
              changeUrl: !0,
              changeHash: !0,
              fromHashChange: !1,
              duplicateCachedPage: d,
              showLoadMsg: !0,
              dataUrl: d,
              fromPage: d,
              allowSamePageTransition: !1,
            },
          },
          initSelector: !1,
          _create: function () {
            var b = this.options;
            (b.changeUrl = b.changeUrl ? b.changeUrl : b.changeHash ? !0 : !1),
              (a.mobile.pagecontainers = (a.mobile.pagecontainers
                ? a.mobile.pagecontainers
                : []
              ).concat([this])),
              (a.mobile.pagecontainers.active = this),
              this._trigger("beforecreate"),
              (this.setLastScrollEnabled = !0),
              this._on(this.window, {
                navigate: "_disableRecordScroll",
                scrollstop: "_delayedRecordScroll",
              }),
              this._on(this.window, { navigate: "_filterNavigateEvents" }),
              this._on({ pagechange: "_afterContentChange" }),
              this._addClass("ui-pagecontainer", "ui-mobile-viewport"),
              this.window.one(
                "navigate",
                a.proxy(function () {
                  this.setLastScrollEnabled = !0;
                }, this)
              );
          },
          _setOptions: function (a) {
            a.theme !== d && "none" !== a.theme
              ? this._removeClass(
                  null,
                  "ui-overlay-" + this.options.theme
                )._addClass(null, "ui-overlay-" + a.theme)
              : a.theme !== d &&
                this._removeClass(null, "ui-overlay-" + this.options.theme),
              this._super(a);
          },
          _disableRecordScroll: function () {
            this.setLastScrollEnabled = !1;
          },
          _enableRecordScroll: function () {
            this.setLastScrollEnabled = !0;
          },
          _afterContentChange: function () {
            (this.setLastScrollEnabled = !0),
              this._off(this.window, "scrollstop"),
              this._on(this.window, { scrollstop: "_delayedRecordScroll" });
          },
          _recordScroll: function () {
            if (this.setLastScrollEnabled) {
              var a,
                b,
                c = this._getActiveHistory();
              c &&
                ((a = this._getScroll()),
                (b = this._getDefaultScroll()),
                (c.lastScroll = b > a ? b : a));
            }
          },
          _delayedRecordScroll: function () {
            setTimeout(a.proxy(this, "_recordScroll"), 100);
          },
          _getScroll: function () {
            return this.window.scrollTop();
          },
          _getDefaultScroll: function () {
            return a.mobile.defaultHomeScroll;
          },
          _filterNavigateEvents: function (b, c) {
            var d;
            (b.originalEvent && b.originalEvent.isDefaultPrevented()) ||
              ((d =
                b.originalEvent.type.indexOf("hashchange") > -1
                  ? c.state.hash
                  : c.state.url),
              d || (d = this._getHash()),
              (d &&
                "#" !== d &&
                0 !== d.indexOf("#" + a.mobile.path.uiStateKey)) ||
                (d = location.href),
              this._handleNavigate(d, c.state));
          },
          _getHash: function () {
            return a.mobile.path.parseLocation().hash;
          },
          getActivePage: function () {
            return this.activePage;
          },
          _getInitialContent: function () {
            return a.mobile.firstPage;
          },
          _getHistory: function () {
            return a.mobile.navigate.history;
          },
          _getActiveHistory: function () {
            return this._getHistory().getActive();
          },
          _getDocumentBase: function () {
            return a.mobile.path.documentBase;
          },
          back: function () {
            this.go(-1);
          },
          forward: function () {
            this.go(1);
          },
          go: function (c) {
            if (a.mobile.hashListeningEnabled) b.history.go(c);
            else {
              var d = a.mobile.navigate.history.activeIndex,
                e = d + parseInt(c, 10),
                f = a.mobile.navigate.history.stack[e].url,
                g = c >= 1 ? "forward" : "back";
              (a.mobile.navigate.history.activeIndex = e),
                (a.mobile.navigate.history.previousIndex = d),
                this.change(f, {
                  direction: g,
                  changeUrl: !1,
                  fromHashChange: !0,
                });
            }
          },
          _handleDestination: function (b) {
            var c;
            return (
              "string" === a.type(b) && (b = a.mobile.path.stripHash(b)),
              b &&
                ((c = this._getHistory()),
                (b = a.mobile.path.isPath(b)
                  ? b
                  : a.mobile.path.makeUrlAbsolute(
                      "#" + b,
                      this._getDocumentBase()
                    ))),
              b || this._getInitialContent()
            );
          },
          _optionFromHistory: function (a, b, c) {
            var d = this._getHistory(),
              e = "back" === a ? d.getLast() : d.getActive();
            return (e && e[b]) || c;
          },
          _handleDialog: function (b, c) {
            var d,
              e,
              f = this.getActivePage();
            return f && !f.data("mobile-dialog")
              ? ("back" === c.direction ? this.back() : this.forward(), !1)
              : ((d = c.pageUrl),
                (e = this._getActiveHistory()),
                a.extend(b, {
                  role: e.role,
                  transition: this._optionFromHistory(
                    c.direction,
                    "transition",
                    b.transition
                  ),
                  reverse: "back" === c.direction,
                }),
                d);
          },
          _handleNavigate: function (b, c) {
            var d = a.mobile.path.stripHash(b),
              e = this._getHistory(),
              f =
                0 === e.stack.length
                  ? "none"
                  : this._optionFromHistory(c.direction, "transition"),
              g = {
                changeUrl: !1,
                fromHashChange: !0,
                reverse: "back" === c.direction,
              };
            a.extend(g, c, {
              transition: f,
              allowSamePageTransition: this._optionFromHistory(
                c.direction,
                "allowSamePageTransition"
              ),
            }),
              (e.activeIndex > 0 &&
                d.indexOf(a.mobile.dialogHashKey) > -1 &&
                ((d = this._handleDialog(g, c)), d === !1)) ||
                this.change(this._handleDestination(d), g);
          },
          _getBase: function () {
            return a.mobile.base;
          },
          _getNs: function () {
            return a.mobile.ns;
          },
          _enhance: function (a, b) {
            return a.page({ role: b });
          },
          _include: function (a, b) {
            a.appendTo(this.element),
              this._enhance(a, b.role),
              a.page("bindRemove");
          },
          _find: function (b) {
            var c,
              d = this._createFileUrl(b),
              e = this._createDataUrl(b),
              f = this._getInitialContent();
            return (
              (c = this.element.children(
                "[data-" +
                  this._getNs() +
                  "url='" +
                  a.mobile.path.hashToSelector(e) +
                  "']"
              )),
              0 === c.length &&
                e &&
                !a.mobile.path.isPath(e) &&
                (c = this.element
                  .children(a.mobile.path.hashToSelector("#" + e))
                  .attr("data-" + this._getNs() + "url", e)
                  .jqmData("url", e)),
              0 === c.length &&
                a.mobile.path.isFirstPageUrl(d) &&
                f &&
                f.parent().length &&
                (c = a(f)),
              c
            );
          },
          _getLoader: function () {
            return a.mobile.loading();
          },
          _showLoading: function (b, c, d, e) {
            this._loadMsg ||
              (this._loadMsg = setTimeout(
                a.proxy(function () {
                  this._getLoader().loader("show", c, d, e),
                    (this._loadMsg = 0);
                }, this),
                b
              ));
          },
          _hideLoading: function () {
            clearTimeout(this._loadMsg),
              (this._loadMsg = 0),
              this._getLoader().loader("hide");
          },
          _showError: function () {
            this._hideLoading(),
              this._showLoading(
                0,
                a.mobile.pageLoadErrorMessageTheme,
                a.mobile.pageLoadErrorMessage,
                !0
              ),
              setTimeout(a.proxy(this, "_hideLoading"), 1500);
          },
          _parse: function (b, c) {
            var d,
              e = a("<div></div>");
            return (
              (e.get(0).innerHTML = b),
              (d = e
                .find(":jqmData(role='page'), :jqmData(role='dialog')")
                .first()),
              d.length ||
                (d = a(
                  "<div data-" +
                    this._getNs() +
                    "role='page'>" +
                    (b.split(/<\/?body[^>]*>/gim)[1] || "") +
                    "</div>"
                )),
              d
                .attr("data-" + this._getNs() + "url", this._createDataUrl(c))
                .attr("data-" + this._getNs() + "external-page", !0),
              d
            );
          },
          _setLoadedTitle: function (b, c) {
            var d = c.match(/<title[^>]*>([^<]*)/) && RegExp.$1;
            d &&
              !b.jqmData("title") &&
              ((d = a("<div>" + d + "</div>").text()), b.jqmData("title", d));
          },
          _createDataUrl: function (b) {
            return a.mobile.path.convertUrlToDataUrl(b);
          },
          _createFileUrl: function (b) {
            return a.mobile.path.getFilePath(b);
          },
          _triggerWithDeprecated: function (b, c, d) {
            var e = a.Event("page" + b),
              f = a.Event(this.widgetName + b);
            return (
              (d || this.element).trigger(e, c),
              this._trigger(b, f, c),
              { deprecatedEvent: e, event: f }
            );
          },
          _loadSuccess: function (b, c, e, f) {
            var g = this._createFileUrl(b);
            return a.proxy(function (h, i, j) {
              var k,
                l = new RegExp(
                  "(<[^>]+\\bdata-" +
                    this._getNs() +
                    "role=[\"']?page[\"']?[^>]*>)"
                ),
                m = new RegExp(
                  "\\bdata-" + this._getNs() + "url=[\"']?([^\"'>]*)[\"']?"
                );
              l.test(h) &&
                RegExp.$1 &&
                m.test(RegExp.$1) &&
                RegExp.$1 &&
                ((g = a.mobile.path.getFilePath(
                  a("<div>" + RegExp.$1 + "</div>").text()
                )),
                (g = this.window[0].encodeURIComponent(g))),
                e.prefetch === d && this._getBase().set(g),
                (k = this._parse(h, g)),
                this._setLoadedTitle(k, h),
                (c.xhr = j),
                (c.textStatus = i),
                (c.page = k),
                (c.content = k),
                (c.toPage = k),
                this._triggerWithDeprecated(
                  "load",
                  c
                ).event.isDefaultPrevented() ||
                  (this._include(k, e),
                  e.showLoadMsg && this._hideLoading(),
                  f.resolve(b, e, k));
            }, this);
          },
          _loadDefaults: {
            type: "get",
            data: d,
            reload: !1,
            role: d,
            showLoadMsg: !1,
            loadMsgDelay: 50,
          },
          load: function (b, c) {
            var e,
              f,
              g,
              h,
              i = (c && c.deferred) || a.Deferred(),
              j = a.extend({}, this._loadDefaults, c),
              k = null,
              l = a.mobile.path.makeUrlAbsolute(b, this._findBaseWithDefault());
            return (
              j.data &&
                "get" === j.type &&
                ((l = a.mobile.path.addSearchParams(l, j.data)), (j.data = d)),
              j.data && "post" === j.type && (j.reload = !0),
              (e = this._createFileUrl(l)),
              (f = this._createDataUrl(l)),
              (k = this._find(l)),
              0 === k.length &&
              a.mobile.path.isEmbeddedPage(e) &&
              !a.mobile.path.isFirstPageUrl(e)
                ? (i.reject(l, j), i.promise())
                : (this._getBase().reset(),
                  k.length && !j.reload
                    ? (this._enhance(k, j.role),
                      i.resolve(l, j, k),
                      j.prefetch || this._getBase().set(b),
                      i.promise())
                    : ((h = {
                        url: b,
                        absUrl: l,
                        toPage: b,
                        prevPage: c ? c.fromPage : d,
                        dataUrl: f,
                        deferred: i,
                        options: j,
                      }),
                      (g = this._triggerWithDeprecated("beforeload", h)),
                      g.deprecatedEvent.isDefaultPrevented() ||
                      g.event.isDefaultPrevented()
                        ? i.promise()
                        : (j.showLoadMsg && this._showLoading(j.loadMsgDelay),
                          j.prefetch === d && this._getBase().reset(),
                          a.mobile.allowCrossDomainPages ||
                          a.mobile.path.isSameDomain(
                            a.mobile.path.documentUrl,
                            l
                          )
                            ? (a.ajax({
                                url: e,
                                type: j.type,
                                data: j.data,
                                contentType: j.contentType,
                                dataType: "html",
                                success: this._loadSuccess(l, h, j, i),
                                error: this._loadError(l, h, j, i),
                              }),
                              i.promise())
                            : (i.reject(l, j), i.promise()))))
            );
          },
          _loadError: function (b, c, d, e) {
            return a.proxy(function (f, g, h) {
              this._getBase().set(a.mobile.path.get()),
                (c.xhr = f),
                (c.textStatus = g),
                (c.errorThrown = h),
                this._hideLoading(),
                this._releaseTransitionLock();
              var i = this._triggerWithDeprecated("loadfailed", c);
              i.deprecatedEvent.isDefaultPrevented() ||
                i.event.isDefaultPrevented() ||
                (d.showLoadMsg && this._showError(), e.reject(b, d));
            }, this);
          },
          _getTransitionHandler: function (b) {
            return (
              (b = a.mobile._maybeDegradeTransition(b)),
              a.mobile.transitionHandlers[b] ||
                a.mobile.defaultTransitionHandler
            );
          },
          _triggerCssTransitionEvents: function (b, c, d) {
            var e = !1;
            (d = d || ""),
              c &&
                (b[0] === c[0] && (e = !0),
                this._triggerWithDeprecated(
                  d + "hide",
                  { nextPage: b, toPage: b, prevPage: c, samePage: e },
                  c
                )),
              this._triggerWithDeprecated(
                d + "show",
                { prevPage: c || a(""), toPage: b },
                b
              );
          },
          _performTransition: function (b, c, d, e) {
            var f = a.Deferred();
            return (
              e && e.removeClass("ui-page-active"),
              d && d.addClass("ui-page-active"),
              this._delay(function () {
                f.resolve(b, c, d, e, !1);
              }, 0),
              f.promise()
            );
          },
          _cssTransition: function (b, c, d) {
            var e,
              f = d.transition,
              g = d.reverse,
              h = d.deferred;
            this._triggerCssTransitionEvents(b, c, "before"),
              this._hideLoading(),
              (e = this._performTransition(f, g, b, c)),
              e.done(
                a.proxy(function () {
                  this._triggerCssTransitionEvents(b, c);
                }, this)
              ),
              e.done(function () {
                h.resolve.apply(h, arguments);
              });
          },
          _releaseTransitionLock: function () {
            (f = !1), e.length > 0 && this.change.apply(this, e.pop());
          },
          _removeActiveLinkClass: function (b) {
            a.mobile.removeActiveLinkClass(b);
          },
          _loadUrl: function (b, c, d) {
            return (
              (d.target = b),
              (d.deferred = a.Deferred()),
              this.load(b, d),
              d.deferred.done(
                a.proxy(function (a, b, d) {
                  (f = !1), (b.absUrl = c.absUrl), this.transition(d, c, b);
                }, this)
              ),
              d.deferred.fail(
                a.proxy(function () {
                  this._removeActiveLinkClass(!0),
                    this._releaseTransitionLock(),
                    this._triggerWithDeprecated("changefailed", c);
                }, this)
              ),
              d.deferred.promise()
            );
          },
          _triggerPageBeforeChange: function (b, c, d) {
            var e;
            return (
              (c.prevPage = this.activePage),
              a.extend(c, { toPage: b, options: d }),
              "string" === a.type(b)
                ? (c.absUrl = a.mobile.path.makeUrlAbsolute(
                    b,
                    this._findBaseWithDefault()
                  ))
                : (c.absUrl = d.absUrl),
              (e = this._triggerWithDeprecated("beforechange", c)),
              e.event.isDefaultPrevented() ||
              e.deprecatedEvent.isDefaultPrevented()
                ? !1
                : !0
            );
          },
          change: function (b, c) {
            if (f) return void e.unshift(arguments);
            var d = a.extend({}, this.options.changeOptions, c),
              g = {};
            return (
              (d.fromPage = d.fromPage || this.activePage),
              this._triggerPageBeforeChange(b, g, d)
                ? ((b = g.toPage),
                  "string" === a.type(b)
                    ? ((f = !0), this._loadUrl(b, g, d))
                    : this.transition(b, g, d))
                : void 0
            );
          },
          transition: function (b, g, h) {
            var i, j, k, l, m, n, o, p, q, r, s, t, u, v;
            if (f) return void e.unshift([b, h]);
            if (
              this._triggerPageBeforeChange(b, g, h) &&
              ((g.prevPage = h.fromPage),
              (v = this._triggerWithDeprecated("beforetransition", g)),
              !v.deprecatedEvent.isDefaultPrevented() &&
                !v.event.isDefaultPrevented())
            )
              return (
                (f = !0),
                b[0] !== a.mobile.firstPage[0] ||
                  h.dataUrl ||
                  (h.dataUrl = a.mobile.path.documentUrl.hrefNoHash),
                (i = h.fromPage),
                (j =
                  (h.dataUrl && a.mobile.path.convertUrlToDataUrl(h.dataUrl)) ||
                  b.jqmData("url")),
                (k = j),
                (l = a.mobile.path.getFilePath(j)),
                (m = a.mobile.navigate.history.getActive()),
                (n = 0 === a.mobile.navigate.history.activeIndex),
                (o = 0),
                (p = c.title),
                (q =
                  ("dialog" === h.role || "dialog" === b.jqmData("role")) &&
                  b.jqmData("dialog") !== !0),
                i && i[0] === b[0] && !h.allowSamePageTransition
                  ? ((f = !1),
                    this._triggerWithDeprecated("transition", g),
                    this._triggerWithDeprecated("change", g),
                    void (
                      h.fromHashChange &&
                      a.mobile.navigate.history.direct({ url: j })
                    ))
                  : (b.page({ role: h.role }),
                    h.fromHashChange && (o = "back" === h.direction ? -1 : 1),
                    a.ui.safeBlur(a.ui.safeActiveElement(this.document[0])),
                    (r = !1),
                    q &&
                      m &&
                      (m.url &&
                        m.url.indexOf(a.mobile.dialogHashKey) > -1 &&
                        this.activePage &&
                        !this.activePage.hasClass("ui-page-dialog") &&
                        a.mobile.navigate.history.activeIndex > 0 &&
                        ((h.changeUrl = !1), (r = !0)),
                      (j = m.url || ""),
                      (j +=
                        !r && j.indexOf("#") > -1
                          ? a.mobile.dialogHashKey
                          : "#" + a.mobile.dialogHashKey)),
                    (s = m
                      ? b.jqmData("title") ||
                        b
                          .children(":jqmData(type='header')")
                          .find(".ui-toolbar-title")
                          .text()
                      : p),
                    s && p === c.title && (p = s),
                    b.jqmData("title") || b.jqmData("title", p),
                    (h.transition =
                      h.transition ||
                      (o && !n ? m.transition : d) ||
                      (q
                        ? a.mobile.defaultDialogTransition
                        : a.mobile.defaultPageTransition)),
                    !o &&
                      r &&
                      (a.mobile.navigate.history.getActive().pageUrl = k),
                    j &&
                      !h.fromHashChange &&
                      (!a.mobile.path.isPath(j) &&
                        j.indexOf("#") < 0 &&
                        (j = "#" + j),
                      (t = {
                        allowSamePageTransition: h.allowSamePageTransition,
                        transition: h.transition,
                        title: p,
                        pageUrl: k,
                        role: h.role,
                      }),
                      h.changeUrl !== !1 && a.mobile.hashListeningEnabled
                        ? a.mobile.navigate(this.window[0].encodeURI(j), t, !0)
                        : b[0] !== a.mobile.firstPage[0] &&
                          a.mobile.navigate.history.add(j, t)),
                    (c.title = p),
                    (a.mobile.activePage = b),
                    (this.activePage = b),
                    (h.reverse = h.reverse || 0 > o),
                    (u = a.Deferred()),
                    this._cssTransition(b, i, {
                      transition: h.transition,
                      reverse: h.reverse,
                      deferred: u,
                    }),
                    u.done(
                      a.proxy(function (c, d, e, f, i) {
                        a.mobile.removeActiveLinkClass(),
                          h.duplicateCachedPage &&
                            h.duplicateCachedPage.remove(),
                          i || a.mobile.focusPage(b),
                          this._releaseTransitionLock(),
                          this._triggerWithDeprecated("transition", g),
                          this._triggerWithDeprecated("change", g);
                      }, this)
                    ),
                    u.promise())
              );
          },
          _findBaseWithDefault: function () {
            var b =
              this.activePage && a.mobile.getClosestBaseUrl(this.activePage);
            return b || a.mobile.path.documentBase.hrefNoHash;
          },
          _themeElements: function () {
            return [{ element: this.element, prefix: "ui-overlay-" }];
          },
          _destroy: function () {
            var b;
            a.mobile.pagecontainers &&
              ((b = a.inArray(this.element, a.mobile.pagecontainers)),
              b >= 0 &&
                (a.mobile.pagecontainers.splice(b, 1),
                a.mobile.pagecontainers.length
                  ? (a.mobile.pagecontainers.active =
                      a.mobile.pagecontainers[0])
                  : (a.mobile.pagecontainers.active = d))),
              this._super();
          },
        }),
        (a.mobile.navreadyDeferred = a.Deferred()),
        a.widget(
          "mobile.pagecontainer",
          a.mobile.pagecontainer,
          a.mobile.widget.theme
        ),
        a.mobile.pagecontainer
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("animationComplete", ["jquery"], b)
        : b(a);
    })(function (a) {
      var b = { animation: {}, transition: {} },
        e = c.createElement("a"),
        f = ["", "webkit-", "moz-", "o-"],
        g = {};
      return (
        a.each(["animation", "transition"], function (c, g) {
          var h = 0 === c ? g + "-name" : g;
          a.each(f, function (c, f) {
            return e.style[a.camelCase(f + h)] !== d
              ? ((b[g].prefix = f), !1)
              : void 0;
          }),
            (b[g].duration = a.camelCase(b[g].prefix + g + "-duration")),
            (b[g].event = a.camelCase(b[g].prefix + g + "-end")),
            "" === b[g].prefix && (b[g].event = b[g].event.toLowerCase());
        }),
        (a.support.cssTransitions = b.transition.prefix !== d),
        (a.support.cssAnimations = b.animation.prefix !== d),
        a(e).remove(),
        a.fn.extend({
          animationComplete: function (e, f, h) {
            var i,
              j,
              k = this,
              l = function () {
                clearTimeout(i), e.apply(this, arguments);
              },
              m = f && "animation" !== f ? "transition" : "animation";
            return this.length
              ? (a.support.cssTransitions && "transition" === m) ||
                (a.support.cssAnimations && "animation" === m)
                ? (h === d &&
                    (this.context !== c &&
                      (j = 3e3 * parseFloat(this.css(b[m].duration))),
                    (0 === j || j === d || isNaN(j)) &&
                      (j = a.fn.animationComplete.defaultDuration)),
                  (i = setTimeout(function () {
                    k.off(b[m].event, l).each(function () {
                      e.apply(this);
                    });
                  }, j)),
                  (g[e] = { event: b[m].event, binding: l }),
                  this.one(b[m].event, l))
                : (setTimeout(function () {
                    k.each(function () {
                      e.apply(this);
                    });
                  }, 0),
                  this)
              : this;
          },
          removeAnimationComplete: function (a) {
            var b = g[a];
            return b ? this.off(b.event, b.binding) : this;
          },
        }),
        (a.fn.animationComplete.defaultDuration = 1e3),
        a
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/transition", [
            "jquery",
            "../core",
            "../events/scroll",
            "../animationComplete",
          ], b)
        : b(a);
    })(function (a) {
      return (
        (a.mobile.Transition = function () {
          this.init.apply(this, arguments);
        }),
        a.extend(a.mobile.Transition.prototype, {
          toPreClass: " ui-page-pre-in",
          init: function (b, c, d, e) {
            a.extend(this, {
              name: b,
              reverse: c,
              $to: d,
              $from: e,
              deferred: new a.Deferred(),
            });
          },
          cleanFrom: function () {
            this.$from
              .removeClass("ui-page-active out in reverse " + this.name)
              .height("");
          },
          beforeDoneIn: function () {},
          beforeDoneOut: function () {},
          beforeStartOut: function () {},
          doneIn: function () {
            this.beforeDoneIn(),
              this.$to.removeClass("out in reverse " + this.name).height(""),
              this.toggleViewportClass(),
              a.mobile.window.scrollTop() !== this.toScroll &&
                this.scrollPage(),
              this.sequential || this.$to.addClass("ui-page-active"),
              this.deferred.resolve(
                this.name,
                this.reverse,
                this.$to,
                this.$from,
                !0
              );
          },
          doneOut: function (a, b, c, d) {
            this.beforeDoneOut(), this.startIn(a, b, c, d);
          },
          hideIn: function (a) {
            this.$to.css("z-index", -10),
              a.call(this),
              this.$to.css("z-index", "");
          },
          scrollPage: function () {
            (a.event.special.scrollstart.enabled = !1),
              (a.mobile.hideUrlBar ||
                this.toScroll !== a.mobile.defaultHomeScroll) &&
                b.scrollTo(0, this.toScroll),
              setTimeout(function () {
                a.event.special.scrollstart.enabled = !0;
              }, 150);
          },
          startIn: function (b, c, d, e) {
            this.hideIn(function () {
              this.$to.addClass("ui-page-active" + this.toPreClass),
                e || a.mobile.focusPage(this.$to),
                this.$to.height(b + this.toScroll),
                d || this.scrollPage();
            }),
              this.$to
                .removeClass(this.toPreClass)
                .addClass(this.name + " in " + c),
              d
                ? this.doneIn()
                : this.$to.animationComplete(
                    a.proxy(function () {
                      this.doneIn();
                    }, this)
                  );
          },
          startOut: function (b, c, d) {
            this.beforeStartOut(b, c, d),
              this.$from
                .height(b + a.mobile.window.scrollTop())
                .addClass(this.name + " out" + c);
          },
          toggleViewportClass: function () {
            this.$to
              .closest(".ui-pagecontainer")
              .toggleClass(
                "ui-mobile-viewport-transitioning viewport-" + this.name
              );
          },
          transition: function (c) {
            var d,
              e = this.reverse ? " reverse" : "",
              f = a(b).height(),
              g =
                a.mobile.maxTransitionWidth !== !1 &&
                a.mobile.window.width() > a.mobile.maxTransitionWidth;
            return (
              (this.toScroll = c ? c : 0),
              (d =
                !a.support.cssTransitions ||
                !a.support.cssAnimations ||
                g ||
                !this.name ||
                "none" === this.name ||
                Math.max(a.mobile.window.scrollTop(), this.toScroll) >
                  a.mobile.getMaxScrollForTransition()),
              this.toggleViewportClass(),
              this.$from && !d
                ? this.startOut(f, e, d)
                : this.doneOut(f, e, d, !0),
              this.deferred.promise()
            );
          },
        }),
        a.mobile.Transition
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/serial", [
            "jquery",
            "../animationComplete",
            "./transition",
          ], b)
        : b(a);
    })(function (a) {
      return (
        (a.mobile.SerialTransition = function () {
          this.init.apply(this, arguments);
        }),
        a.extend(
          a.mobile.SerialTransition.prototype,
          a.mobile.Transition.prototype,
          {
            sequential: !0,
            beforeDoneOut: function () {
              this.$from && this.cleanFrom();
            },
            beforeStartOut: function (b, c, d) {
              this.$from.animationComplete(
                a.proxy(function () {
                  this.doneOut(b, c, d);
                }, this)
              );
            },
          }
        ),
        a.mobile.SerialTransition
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/concurrent", ["jquery", "./transition"], b)
        : b(a);
    })(function (a) {
      return (
        (a.mobile.ConcurrentTransition = function () {
          this.init.apply(this, arguments);
        }),
        a.extend(
          a.mobile.ConcurrentTransition.prototype,
          a.mobile.Transition.prototype,
          {
            sequential: !1,
            beforeDoneIn: function () {
              this.$from && this.cleanFrom();
            },
            beforeStartOut: function (a, b, c) {
              this.doneOut(a, b, c);
            },
          }
        ),
        a.mobile.ConcurrentTransition
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/handlers", [
            "jquery",
            "../core",
            "./serial",
            "./concurrent",
          ], b)
        : b(a);
    })(function (a) {
      var c = function () {
        return 3 * a(b).height();
      };
      return (
        (a.mobile.transitionHandlers = {
          sequential: a.mobile.SerialTransition,
          simultaneous: a.mobile.ConcurrentTransition,
        }),
        (a.mobile.defaultTransitionHandler =
          a.mobile.transitionHandlers.sequential),
        (a.mobile.transitionFallbacks = {}),
        (a.mobile._maybeDegradeTransition = function (b) {
          return (
            b &&
              !a.support.cssTransform3d &&
              a.mobile.transitionFallbacks[b] &&
              (b = a.mobile.transitionFallbacks[b]),
            b
          );
        }),
        (a.mobile.getMaxScrollForTransition =
          a.mobile.getMaxScrollForTransition || c),
        a.mobile.transitionHandlers
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/pagecontainer.transitions", [
            "jquery",
            "./pagecontainer",
            "../navigation/method",
            "../transitions/handlers",
          ], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.pagecontainer", a.mobile.pagecontainer, {
        _getTransitionHandler: function (b) {
          return (
            (b = a.mobile._maybeDegradeTransition(b)),
            a.mobile.transitionHandlers[b] || a.mobile.defaultTransitionHandler
          );
        },
        _performTransition: function (b, c, d, e) {
          var f = this._getTransitionHandler(b);
          return new f(b, c, d, e).transition(
            a.mobile.navigate.history.getActive().lastScroll ||
              a.mobile.defaultHomeScroll
          );
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/visuals/flip", ["jquery", "../handlers"], b)
        : b(a);
    })(function (a) {
      a.mobile.transitionFallbacks.flip = "fade";
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/visuals/flow", ["jquery", "../handlers"], b)
        : b(a);
    })(function (a) {
      a.mobile.transitionFallbacks.flow = "fade";
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/visuals/pop", ["jquery", "../handlers"], b)
        : b(a);
    })(function (a) {
      a.mobile.transitionFallbacks.pop = "fade";
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/visuals/slide", ["jquery", "../handlers"], b)
        : b(a);
    })(function (a) {
      (a.mobile.transitionHandlers.slide =
        a.mobile.transitionHandlers.simultaneous),
        (a.mobile.transitionFallbacks.slide = "fade");
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/visuals/slidedown", ["jquery", "../handlers"], b)
        : b(a);
    })(function (a) {
      a.mobile.transitionFallbacks.slidedown = "fade";
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/visuals/slidefade", ["jquery", "../handlers"], b)
        : b(a);
    })(function (a) {
      a.mobile.transitionFallbacks.slidefade = "fade";
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/visuals/slideup", ["jquery", "../handlers"], b)
        : b(a);
    })(function (a) {
      a.mobile.transitionFallbacks.slideup = "fade";
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/visuals/turn", ["jquery", "../handlers"], b)
        : b(a);
    })(function (a) {
      a.mobile.transitionFallbacks.turn = "fade";
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("transitions/visuals", [
            "./visuals/flip",
            "./visuals/flow",
            "./visuals/pop",
            "./visuals/slide",
            "./visuals/slidedown",
            "./visuals/slidefade",
            "./visuals/slideup",
            "./visuals/turn",
          ], b)
        : b(a);
    })(function () {}),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("navigation", [
            "jquery",
            "./core",
            "./navigation/path",
            "./events/navigate",
            "./navigation/history",
            "./navigation/navigator",
            "./navigation/method",
            "./support",
            "./animationComplete",
            "./widgets/pagecontainer",
            "./widgets/page",
            "./transitions/handlers",
          ], b)
        : b(a);
    })(function (a) {
      function e(a) {
        for (
          ;
          a &&
          ("string" != typeof a.nodeName || "a" !== a.nodeName.toLowerCase());

        )
          a = a.parentNode;
        return a;
      }
      var f = a.Deferred(),
        g = a.Deferred(),
        h = function () {
          g.resolve(), (g = null);
        },
        i = a.mobile.path,
        j = i.documentUrl,
        k = null;
      return (
        (a.mobile.back = function () {
          var c = b.navigator;
          this.phonegapNavigationEnabled && c && c.app && c.app.backHistory
            ? c.app.backHistory()
            : a.mobile.pagecontainers.active.back();
        }),
        (a.mobile._maybeDegradeTransition =
          a.mobile._maybeDegradeTransition ||
          function (a) {
            return a;
          }),
        (a.mobile._registerInternalEvents = function () {
          var c = function (b, c) {
            var d,
              e,
              f,
              g,
              h = !0;
            return !a.mobile.ajaxEnabled ||
              b.is(":jqmData(ajax='false')") ||
              !b.jqmHijackable().length ||
              b.attr("target")
              ? !1
              : ((d = (k && k.attr("formaction")) || b.attr("action")),
                (g = (b.attr("method") || "get").toLowerCase()),
                d ||
                  ((d = a.mobile.getClosestBaseUrl(b)),
                  "get" === g && (d = i.parseUrl(d).hrefNoSearch),
                  d === i.documentBase.hrefNoHash && (d = j.hrefNoSearch)),
                (d = i.makeUrlAbsolute(d, a.mobile.getClosestBaseUrl(b))),
                i.isExternal(d) && !i.isPermittedCrossDomainRequest(j, d)
                  ? !1
                  : (c ||
                      ((e = b.serializeArray()),
                      k &&
                        k[0].form === b[0] &&
                        ((f = k.attr("name")),
                        f &&
                          (a.each(e, function (a, b) {
                            return b.name === f ? ((f = ""), !1) : void 0;
                          }),
                          f && e.push({ name: f, value: k.attr("value") }))),
                      (h = {
                        url: d,
                        options: {
                          type: g,
                          data: a.param(e),
                          transition: b.jqmData("transition"),
                          reverse: "reverse" === b.jqmData("direction"),
                          reloadPage: !0,
                        },
                      })),
                    h));
          };
          a.mobile.document.delegate("form", "submit", function (b) {
            var d;
            b.isDefaultPrevented() ||
              ((d = c(a(this))),
              d &&
                (a(this)
                  .closest(".ui-pagecontainer")
                  .pagecontainer("change", d.url, d.options),
                b.preventDefault()));
          }),
            a.mobile.document.bind("vclick", function (b) {
              var d,
                f = b.target;
              if (!(b.which > 1) && a.mobile.linkBindingEnabled) {
                if (((k = a(f)), a.data(f, "ui-button"))) {
                  if (!c(a(f).closest("form"), !0)) return;
                } else {
                  if (
                    ((f = e(f)),
                    !f ||
                      ("#" === i.parseUrl(f.getAttribute("href") || "#").hash &&
                        "back" !==
                          f.getAttribute("data-" + a.mobile.ns + "rel")))
                  )
                    return;
                  if (!a(f).jqmHijackable().length) return;
                }
                (d = a(f).closest(".ui-button")),
                  d.length > 0 &&
                    !d.hasClass("ui-state-disabled") &&
                    (a.mobile.removeActiveLinkClass(!0),
                    (a.mobile.activeClickedLink = d),
                    a.mobile.activeClickedLink.addClass("ui-button-active"));
              }
            }),
            a.mobile.document.bind("click", function (c) {
              if (a.mobile.linkBindingEnabled && !c.isDefaultPrevented()) {
                var f,
                  g,
                  h,
                  k,
                  l,
                  m,
                  n,
                  o = e(c.target),
                  p = a(o),
                  q = function () {
                    b.setTimeout(function () {
                      a.mobile.removeActiveLinkClass(!0);
                    }, 200);
                  };
                if (
                  (a.mobile.activeClickedLink &&
                    a.mobile.activeClickedLink[0] === c.target &&
                    q(),
                  o && !(c.which > 1) && p.jqmHijackable().length)
                ) {
                  if (p.is(":jqmData(rel='back')")) return a.mobile.back(), !1;
                  if (
                    ((f = a.mobile.getClosestBaseUrl(p)),
                    (g = i.makeUrlAbsolute(p.attr("href") || "#", f)),
                    !a.mobile.ajaxEnabled && !i.isEmbeddedPage(g))
                  )
                    return void q();
                  if (
                    !(
                      -1 === g.search("#") ||
                      (i.isExternal(g) && i.isAbsoluteUrl(g))
                    )
                  ) {
                    if (((g = g.replace(/[^#]*#/, "")), !g))
                      return void c.preventDefault();
                    g = i.isPath(g)
                      ? i.makeUrlAbsolute(g, f)
                      : i.makeUrlAbsolute("#" + g, j.hrefNoHash);
                  }
                  if (
                    ((h =
                      p.is("[rel='external']") ||
                      p.is(":jqmData(ajax='false')") ||
                      p.is("[target]")),
                    (k =
                      h ||
                      (i.isExternal(g) &&
                        !i.isPermittedCrossDomainRequest(j, g))))
                  )
                    return void q();
                  (l = p.jqmData("transition")),
                    (m =
                      "reverse" === p.jqmData("direction") ||
                      p.jqmData("back")),
                    (n = p.attr("data-" + a.mobile.ns + "rel") || d),
                    p
                      .closest(".ui-pagecontainer")
                      .pagecontainer("change", g, {
                        transition: l,
                        reverse: m,
                        role: n,
                        link: p,
                      }),
                    c.preventDefault();
                }
              }
            }),
            a.mobile.document.delegate(
              ".ui-page",
              "page.prefetch",
              function () {
                var b = [],
                  c = this;
                a(this)
                  .find("a:jqmData(prefetch)")
                  .each(function () {
                    var d = a(this),
                      e = d.attr("href");
                    e &&
                      -1 === a.inArray(e, b) &&
                      (b.push(e),
                      a(c)
                        .closest(".ui-pagecontainer")
                        .pagecontainer("load", e, {
                          role: d.attr("data-" + a.mobile.ns + "rel"),
                          prefetch: !0,
                        }));
                  });
              }
            ),
            a.mobile.document.bind("pageshow", function () {
              g
                ? g.done(a.mobile.resetActivePageHeight)
                : a.mobile.resetActivePageHeight();
            }),
            a.mobile.window.bind(
              "throttledresize",
              a.mobile.resetActivePageHeight
            );
        }),
        a(function () {
          f.resolve();
        }),
        "complete" === c.readyState ? h() : a.mobile.window.on("load", h),
        a.when(f, a.mobile.navreadyDeferred).done(function () {
          a.mobile._registerInternalEvents();
        }),
        a.mobile
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("degradeInputs", ["jquery", "defaults"], b)
        : b(a);
    })(function (a) {
      (a.mobile.degradeInputs = { range: "number", search: "text" }),
        (a.mobile.degradeInputsWithin = function (b) {
          (b = "string" == typeof b ? a(b) : b),
            b
              .find("input")
              .not(a.mobile.keepNative)
              .each(function () {
                var b,
                  c,
                  d,
                  e = a(this),
                  f = this.getAttribute("type"),
                  g = a.mobile.degradeInputs[f] || "text";
                a.mobile.degradeInputs[f] &&
                  ((b = a("<div>").html(e.clone()).html()),
                  (c = /\s+type=["']?\w+['"]?/),
                  (d =
                    ' type="' +
                    g +
                    '" data-' +
                    a.mobile.ns +
                    'type="' +
                    f +
                    '"'),
                  e.replaceWith(b.replace(c, d)));
              });
        });
      var b = function () {
        a.mobile.degradeInputsWithin(this.addBack());
      };
      return (
        (a.enhance = a.extend(
          a.enhance,
          a.extend({ hooks: [] }, a.enhance)
        )).hooks.unshift(b),
        a.mobile.degradeInputsWithin
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/page.dialog", [
            "jquery",
            "../widget",
            "./page",
            "../navigation",
          ], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.page", a.mobile.page, {
        options: {
          classes: {
            "ui-page-dialog-close-button":
              "ui-button ui-corner-all ui-button-icon-only",
            "ui-page-dialog-close-button-icon": "ui-icon-delete ui-icon",
            "ui-page-dialog-contain": "ui-overlay-shadow ui-corner-all",
          },
          closeBtn: "left",
          closeBtnText: "Close",
          overlayTheme: "a",
          dialog: !1,
        },
        _create: function () {
          return (this.dialog = {}), this._superApply(arguments);
        },
        _establishStructure: function () {
          var b = this._superApply(arguments);
          return (
            this.options.dialog &&
              (this.options.enhanced
                ? ((this.dialog.wrapper = this.element
                    .children(".ui-page-dialog-contain")
                    .eq(0)),
                  "none" !== this.options.closeBtn &&
                    ((this.dialog.button = this.dialog.wrapper
                      .children(".ui-toolbar-header")
                      .children("a.ui-page-dialog-close-button")),
                    (this.dialog.icon = this.dialog.button.children(
                      ".ui-page-dialog-close-button-icon"
                    ))))
                : ((this.dialog.wrapper = a("<div>")),
                  this.dialog.wrapper.append(this.element.contents()),
                  this._setCloseButton(
                    this.options.closeBtn,
                    this.options.closeBtnText
                  ))),
            b
          );
        },
        _themeElements: function () {
          var a = this._super();
          return (
            this.options.dialog &&
              a.push({ element: this.dialog.wrapper, prefix: "ui-body-" }),
            a
          );
        },
        _setAttributes: function () {
          var a = this._superApply(arguments);
          return (
            this.options.dialog &&
              (this._addClass("ui-page-dialog", null),
              this._addClass(
                this.dialog.wrapper,
                "ui-page-dialog-contain",
                null
              ),
              this.dialog.wrapper.attr("role", "dialog")),
            this.dialog.button &&
              this.options.enhanced &&
              this._toggleButtonClasses(!0, this.options.closeBtn),
            a
          );
        },
        _attachToDOM: function () {
          var a = this._superApply(arguments);
          return (
            this.options.dialog &&
              !this.options.enhanced &&
              this.element.append(this.dialog.wrapper),
            a
          );
        },
        _toggleButtonClasses: function (a, b) {
          this._toggleClass(
            this.dialog.button,
            "ui-page-dialog-close-button",
            "ui-toolbar-header-button-" + b,
            a
          ),
            this._toggleClass(
              this.dialog.icon,
              "ui-page-dialog-close-button-icon",
              null,
              a
            );
        },
        _setOptions: function (b) {
          var c, e;
          this._super(b),
            this.options.dialog &&
              (b.overlayTheme !== d &&
                a.mobile.activePage[0] === this.element[0] &&
                this._handlePageBeforeShow(),
              b.closeBtnText !== d &&
                ((c = this.options.closeBtn), (e = b.closeBtnText)),
              b.closeBtn !== d &&
                ((c = b.closeBtn), (e = e || this.options.closeBtnText)),
              c && this._setCloseButton(c, e));
        },
        _toggleCloseButtonClickability: function (a) {
          this.dialog.button &&
            (a
              ? (this.dialog.button.css("pointer-events", ""),
                this.dialog.button.removeAttr("tabindex"))
              : (this.dialog.button.css("pointer-events", "none"),
                this.dialog.button.attr("tabindex", -1)));
        },
        _handlePageBeforeShow: function () {
          this._toggleCloseButtonClickability(!0),
            this.options.overlayTheme && this.options.dialog
              ? this._setContainerSwatch(this.options.overlayTheme)
              : this._super();
        },
        _handleButtonClick: function () {
          this._toggleCloseButtonClickability(!1);
        },
        _setCloseButton: function (b, c) {
          var d;
          (b = "left" === b ? "left" : "right" === b ? "right" : "none"),
            this.dialog.button
              ? "none" === b
                ? (this._toggleButtonClasses(!1, b),
                  this._off(this.dialog.button, "click"),
                  this.dialog.button.remove(),
                  (this.dialog.button = null),
                  (this.dialog.icon = null))
                : (this._removeClass(
                    this.dialog.button,
                    null,
                    "ui-toolbar-header-button-left ui-toolbar-header-button-right"
                  )._addClass(
                    this.dialog.button,
                    null,
                    "ui-toolbar-header-button-" + b
                  ),
                  c &&
                    (this.dialog.button
                      .contents()
                      .filter(function () {
                        return 3 === this.nodeType;
                      })
                      .remove(),
                    this.dialog.button.prepend(c)))
              : "none" !== b &&
                ((d = this.dialog.wrapper
                  .children(
                    ".ui-toolbar-header,[data-" + a.mobile.ns + "type='header']"
                  )
                  .first()),
                d.length &&
                  ((this.dialog.button = a(
                    "<a href='#' data-" + a.mobile.ns + "rel='back'></a>"
                  ).text(c || this.options.closeBtnText || "")),
                  (this.dialog.icon = a("<span>").appendTo(this.dialog.button)),
                  this._toggleButtonClasses(!0, b),
                  this.dialog.button.prependTo(d),
                  this._on(this.dialog.button, {
                    click: "_handleButtonClick",
                  })));
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/widget.backcompat", [
            "jquery",
            "../ns",
            "../widget",
            "jquery-ui/widget",
          ], b)
        : b(a);
    })(function (a) {
      if (a.mobileBackcompat !== !1) {
        var b = /\S+/g;
        a.mobile.widget = a.extend(
          {},
          {
            backcompat: {
              _boolOptions: {
                inline: "ui-button-inline",
                mini: "ui-mini",
                shadow: "ui-shadow",
                corners: "ui-corner-all",
              },
              _create: function () {
                this._setInitialOptions(),
                  this._super(),
                  !this.options.enhanced &&
                    this.options.wrapperClass &&
                    this._addClass(
                      this.widget(),
                      null,
                      this.options.wrapperClass
                    );
              },
              _classesToOption: function (c) {
                if (this.classProp && "string" == typeof c[this.classProp]) {
                  var e = this,
                    f = c[this.classProp].match(b) || [];
                  a.each(this._boolOptions, function (b, c) {
                    e.options[b] !== d &&
                      (-1 !== a.inArray(c, f)
                        ? (e.options[b] = !0)
                        : (e.options[b] = !1));
                  });
                }
              },
              _getClassValue: function (c, d, e) {
                var f = this.options.classes[c] || "",
                  g = f.match(b) || [];
                return (
                  e
                    ? -1 === a.inArray(d, g) && g.push(d)
                    : g.splice(a.inArray(d, g), 1),
                  g.join(" ")
                );
              },
              _optionsToClasses: function (a, b) {
                var c = this.classProp,
                  d = this._boolOptions[a];
                c && this.option("classes." + c, this._getClassValue(c, d, b));
              },
              _setInitialOptions: function () {
                var c,
                  e = this.options,
                  f = a[this.namespace][this.widgetName].prototype.options,
                  g = this.classProp,
                  h = this;
                g &&
                  ((c = (e.classes[g] || "").match(b) || []),
                  f.classes[g] !== e.classes[g]
                    ? a.each(this._boolOptions, function (b, f) {
                        e[b] !== d && (e[b] = -1 !== a.inArray(f, c));
                      })
                    : a.each(this._boolOptions, function (a, b) {
                        e[a] !== f[a] &&
                          (e.classes[g] = h._getClassValue(g, b, e[a]));
                      }));
              },
              _setOption: function (a, b) {
                var c;
                "classes" === a && this._classesToOption(b),
                  this._boolOptions[a] && this._optionsToClasses(a, b),
                  "wrapperClass" === a &&
                    ((c = this.widget()),
                    this._removeClass(
                      c,
                      null,
                      this.options.wrapperClass
                    )._addClass(c, null, b)),
                  this._superApply(arguments);
              },
            },
          },
          a.mobile.widget
        );
      } else a.mobile.widget.backcompat = {};
      return a.mobile.widget;
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/page.dialog.backcompat", [
            "jquery",
            "./widget.backcompat",
            "./page.dialog",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.mobileBackcompat !== !1 &&
          (a.widget("mobile.page", a.mobile.page, {
            options: { corners: !0 },
            classProp: "ui-page-dialog-contain",
            _create: function () {
              ("dialog" === a.mobile.getAttribute(this.element[0], "role") ||
                "dialog" === this.options.role) &&
                (a.data(this.element[0], "mobile-dialog", !0),
                (this.options.dialog = !0)),
                this._super();
            },
          }),
          a.widget("mobile.page", a.mobile.page, a.mobile.widget.backcompat)),
        a.mobile.page
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/collapsible", ["jquery", "../core", "../widget"], b)
        : b(a);
    })(function (a) {
      var b = /([A-Z])/g;
      return (
        a.widget("mobile.collapsible", {
          version: "@VERSION",
          options: {
            enhanced: !1,
            expandCueText: null,
            collapseCueText: null,
            collapsed: !0,
            heading: "h1,h2,h3,h4,h5,h6,legend",
            collapsedIcon: null,
            expandedIcon: null,
            iconpos: null,
            theme: null,
            contentTheme: null,
            inset: null,
            corners: null,
            mini: null,
          },
          _create: function () {
            var b = this.element,
              c = {
                accordion: b
                  .closest(
                    ":jqmData(role='collapsible-set'),:jqmData(role='collapsibleset')" +
                      (a.mobile.collapsibleset
                        ? ", :mobile-collapsibleset"
                        : "")
                  )
                  .addClass("ui-collapsible-set"),
              };
            (this._ui = c),
              (this._renderedOptions = this._getOptions(this.options)),
              this.options.enhanced
                ? ((c.heading = this.element.children(
                    ".ui-collapsible-heading"
                  )),
                  (c.content = c.heading.next()),
                  (c.anchor = c.heading.children()),
                  (c.status = c.anchor.children(
                    ".ui-collapsible-heading-status"
                  )),
                  (c.icon = c.anchor.children(".ui-icon")))
                : this._enhance(b, c),
              this._on(c.heading, {
                tap: function () {
                  c.heading.find("a").first().addClass("ui-button-active");
                },
                click: function (a) {
                  this._handleExpandCollapse(
                    !c.heading.hasClass("ui-collapsible-heading-collapsed")
                  ),
                    a.preventDefault(),
                    a.stopPropagation();
                },
              });
          },
          _getOptions: function (c) {
            var d,
              e = this._ui.accordion,
              f = this._ui.accordionWidget;
            (c = a.extend({}, c)),
              e.length &&
                !f &&
                (this._ui.accordionWidget = f = e.data(
                  "mobile-collapsibleset"
                ));
            for (d in c)
              (c[d] =
                null != c[d]
                  ? c[d]
                  : f
                  ? f.options[d]
                  : e.length
                  ? a.mobile.getAttribute(
                      e[0],
                      d.replace(b, "-$1").toLowerCase()
                    )
                  : null),
                null == c[d] && (c[d] = a.mobile.collapsible.defaults[d]);
            return c;
          },
          _themeClassFromOption: function (a, b) {
            return b ? ("none" === b ? "" : a + b) : "";
          },
          _enhance: function (b, c) {
            var d = this._renderedOptions,
              e = this._themeClassFromOption("ui-body-", d.contentTheme);
            return (
              b.addClass(
                "ui-collapsible " +
                  (d.inset ? "ui-collapsible-inset " : "") +
                  (d.inset && d.corners ? "ui-corner-all " : "") +
                  (e ? "ui-collapsible-themed-content " : "")
              ),
              (c.originalHeading = b.children(this.options.heading).first()),
              (c.content = b
                .wrapInner(
                  "<div class='ui-collapsible-content " + e + "'></div>"
                )
                .children(".ui-collapsible-content")),
              (c.heading = c.originalHeading),
              c.heading.is("legend") &&
                ((c.heading = a(
                  "<div role='heading'>" + c.heading.html() + "</div>"
                )),
                (c.placeholder = a(
                  "<div><!-- placeholder for legend --></div>"
                ).insertBefore(c.originalHeading)),
                c.originalHeading.remove()),
              (c.status = a(
                "<span class='ui-collapsible-heading-status'></span>"
              )),
              (c.anchor = c.heading
                .detach()
                .addClass("ui-collapsible-heading")
                .append(c.status)
                .wrapInner(
                  "<a href='#' class='ui-collapsible-heading-toggle'></a>"
                )
                .find("a")
                .first()
                .addClass(
                  "ui-button " +
                    this._themeClassFromOption("ui-button-", d.theme) +
                    " " +
                    (d.mini ? "ui-mini " : "")
                )),
              this._updateIcon(),
              c.heading.insertBefore(c.content),
              this._handleExpandCollapse(this.options.collapsed),
              c
            );
          },
          _updateIcon: function () {
            var b = this._ui,
              c = this._getOptions(this.options),
              d = c.collapsed
                ? c.collapsedIcon
                  ? " ui-icon-" + c.collapsedIcon
                  : ""
                : c.expandedIcon
                ? " ui-icon-" + c.expandedIcon
                : "",
              e = "bottom" === c.iconpos ? "append" : "prepend";
            b.icon && b.icon.remove(),
              b.space && b.space.remove(),
              (b.icon = a(
                "<span class='ui-icon" + (d ? d + " " : "") + "'></span>"
              )),
              "left" === c.iconpos ||
              "right" === c.iconpos ||
              null === c.iconpos
                ? ((b.space = a("<span class='ui-icon-space'> </span>")),
                  b.anchor[e](b.space))
                : b.icon.addClass("ui-widget-icon-block"),
              b.anchor[e](b.icon),
              "right" === c.iconpos &&
                b.icon.addClass("ui-collapsible-icon-right");
          },
          refresh: function () {
            this._applyOptions(this.options),
              (this._renderedOptions = this._getOptions(this.options)),
              this._updateIcon();
          },
          _applyOptions: function (a) {
            var b,
              c,
              e,
              f,
              g = this.element,
              h = this._renderedOptions,
              i = this._ui,
              j = i.anchor,
              k = i.status,
              l = this._getOptions(a);
            a.collapsed !== d && this._handleExpandCollapse(a.collapsed),
              (b = g.hasClass("ui-collapsible-collapsed")),
              b
                ? l.expandCueText !== d && k.text(l.expandCueText)
                : l.collapseCueText !== d && k.text(l.collapseCueText),
              l.theme !== d &&
                ((e = this._themeClassFromOption("ui-button-", h.theme)),
                (c = this._themeClassFromOption("ui-button-", l.theme)),
                j.removeClass(e).addClass(c)),
              l.contentTheme !== d &&
                ((e = this._themeClassFromOption("ui-body-", h.contentTheme)),
                (c = this._themeClassFromOption("ui-body-", l.contentTheme)),
                i.content.removeClass(e).addClass(c)),
              l.inset !== d &&
                (g.toggleClass("ui-collapsible-inset", l.inset),
                (f = !(!l.inset || (!l.corners && !h.corners)))),
              l.corners !== d && (f = !(!l.corners || (!l.inset && !h.inset))),
              f !== d && g.toggleClass("ui-corner-all", f),
              l.mini !== d && j.toggleClass("ui-mini", l.mini);
          },
          _setOptions: function (a) {
            this._applyOptions(a),
              this._super(a),
              (this._renderedOptions = this._getOptions(this.options)),
              (a.iconpos !== d ||
                a.collapsedIcon !== d ||
                a.expandedIcon !== d) &&
                this._updateIcon();
          },
          _handleExpandCollapse: function (a) {
            var b = this._renderedOptions,
              c = this._ui;
            c.status.text(a ? b.expandCueText : b.collapseCueText),
              c.heading
                .toggleClass("ui-collapsible-heading-collapsed", a)
                .find("a")
                .first()
                .removeClass("ui-button-active"),
              c.heading
                .toggleClass("ui-collapsible-heading-collapsed", a)
                .find("a")
                .first()
                .removeClass("ui-button-active"),
              c.icon &&
                c.icon
                  .toggleClass("ui-icon-" + b.expandedIcon, !a)
                  .toggleClass(
                    "ui-icon-" + b.collapsedIcon,
                    a || b.expandedIcon === b.collapsedIcon
                  ),
              this.element.toggleClass("ui-collapsible-collapsed", a),
              c.content
                .toggleClass("ui-collapsible-content-collapsed", a)
                .attr("aria-hidden", a)
                .trigger("updatelayout"),
              (this.options.collapsed = a),
              this._trigger(a ? "collapse" : "expand");
          },
          expand: function () {
            this._handleExpandCollapse(!1);
          },
          collapse: function () {
            this._handleExpandCollapse(!0);
          },
          _destroy: function () {
            var a = this._ui,
              b = this.options;
            b.enhanced ||
              (a.placeholder
                ? (a.originalHeading.insertBefore(a.placeholder),
                  a.placeholder.remove(),
                  a.heading.remove())
                : (a.status.remove(),
                  a.heading
                    .removeClass(
                      "ui-collapsible-heading ui-collapsible-heading-collapsed"
                    )
                    .children()
                    .contents()
                    .unwrap()),
              a.icon && a.icon.remove(),
              a.space && a.space.remove(),
              a.anchor.contents().unwrap(),
              a.content.contents().unwrap(),
              this.element.removeClass(
                "ui-collapsible ui-collapsible-collapsed ui-collapsible-themed-content ui-collapsible-inset ui-corner-all"
              ));
          },
        }),
        (a.mobile.collapsible.defaults = {
          expandCueText: " click to expand contents",
          collapseCueText: " click to collapse contents",
          collapsedIcon: "plus",
          contentTheme: "inherit",
          expandedIcon: "minus",
          iconpos: "left",
          inset: !0,
          corners: !0,
          theme: "inherit",
          mini: !1,
        }),
        a.mobile.collapsible
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/addFirstLastClasses", ["jquery", "../core"], b)
        : b(a);
    })(function (a) {
      function b(b) {
        var d,
          e = b.length,
          f = [];
        for (d = 0; e > d; d++) b[d].className.match(c) || f.push(b[d]);
        return a(f);
      }
      var c = /\bui-screen-hidden\b/;
      return (
        (a.mobile.behaviors.addFirstLastClasses = {
          _getVisibles: function (a, c) {
            var d;
            return (
              c
                ? (d = b(a))
                : ((d = a.filter(":visible")), 0 === d.length && (d = b(a))),
              d
            );
          },
          _addFirstLastClasses: function (a, b, c) {
            a.removeClass("ui-first-child ui-last-child"),
              b
                .eq(0)
                .addClass("ui-first-child")
                .end()
                .last()
                .addClass("ui-last-child"),
              c || this.element.trigger("updatelayout");
          },
          _removeFirstLastClasses: function (a) {
            a.removeClass("ui-first-child ui-last-child");
          },
        }),
        a.mobile.behaviors.addFirstLastClasses
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/collapsibleSet", [
            "jquery",
            "../widget",
            "./collapsible",
            "./addFirstLastClasses",
          ], b)
        : b(a);
    })(function (a) {
      return a.widget(
        "mobile.collapsibleset",
        a.extend(
          {
            version: "@VERSION",
            options: a.extend({ enhanced: !1 }, a.mobile.collapsible.defaults),
            _handleCollapsibleExpand: function (b) {
              var c = a(b.target).closest(".ui-collapsible");
              c
                .parent()
                .is(
                  ":mobile-collapsibleset, :jqmData(role='collapsibleset')"
                ) &&
                c
                  .siblings(".ui-collapsible:not(.ui-collapsible-collapsed)")
                  .collapsible("collapse");
            },
            _create: function () {
              var b = this.element,
                c = this.options;
              a.extend(this, { _classes: "" }),
                (this.childCollapsiblesSelector =
                  ":mobile-collapsible, " +
                  ("[data-" + a.mobile.ns + "role='collapsible']")),
                c.enhanced ||
                  (b.addClass(
                    "ui-collapsible-set " +
                      this._themeClassFromOption("ui-group-theme-", c.theme) +
                      " " +
                      (c.corners && c.inset ? "ui-corner-all " : "")
                  ),
                  this.element
                    .find(this.childCollapsiblesSelector)
                    .collapsible()),
                this._on(b, { collapsibleexpand: "_handleCollapsibleExpand" });
            },
            _themeClassFromOption: function (a, b) {
              return b ? ("none" === b ? "" : a + b) : "";
            },
            _init: function () {
              this._refresh(!0),
                this.element
                  .children(this.childCollapsiblesSelector)
                  .filter(":jqmData(collapsed='false')")
                  .collapsible("expand");
            },
            _setOptions: function (a) {
              var b,
                c,
                e = this.element,
                f = this._themeClassFromOption("ui-group-theme-", a.theme);
              return (
                f &&
                  e
                    .removeClass(
                      this._themeClassFromOption(
                        "ui-group-theme-",
                        this.options.theme
                      )
                    )
                    .addClass(f),
                a.inset !== d &&
                  (c = !(!a.inset || (!a.corners && !this.options.corners))),
                a.corners !== d &&
                  (c = !(!a.corners || (!a.inset && !this.options.inset))),
                c !== d && e.toggleClass("ui-corner-all", c),
                (b = this._super(a)),
                this.element
                  .children(":mobile-collapsible")
                  .collapsible("refresh"),
                b
              );
            },
            _destroy: function () {
              var a = this.element;
              this._removeFirstLastClasses(
                a.children(this.childCollapsiblesSelector)
              ),
                a
                  .removeClass(
                    "ui-collapsible-set ui-corner-all " +
                      this._themeClassFromOption(
                        "ui-group-theme-",
                        this.options.theme
                      )
                  )
                  .children(":mobile-collapsible")
                  .collapsible("destroy");
            },
            _refresh: function (a) {
              var b = this.element.children(this.childCollapsiblesSelector);
              this.element
                .find(this.childCollapsiblesSelector)
                .not(".ui-collapsible")
                .collapsible(),
                this._addFirstLastClasses(b, this._getVisibles(b, a), a);
            },
            refresh: function () {
              this._refresh(!1);
            },
          },
          a.mobile.behaviors.addFirstLastClasses
        )
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("grid", ["jquery"], b)
        : b(a);
    })(function (a) {
      return (
        (a.fn.grid = function (b) {
          return this.each(function () {
            var c,
              d,
              e = a(this),
              f = a.extend({ grid: null }, b),
              g = e.children(),
              h = { solo: 1, a: 2, b: 3, c: 4, d: 5 },
              i = f.grid;
            if (!i)
              if (g.length <= 5) for (d in h) h[d] === g.length && (i = d);
              else (i = "a"), e.addClass("ui-grid-duo");
            (c = h[i]),
              e.addClass("ui-grid-" + i),
              g.filter(":nth-child(" + c + "n+1)").addClass("ui-block-a"),
              c > 1 &&
                g.filter(":nth-child(" + c + "n+2)").addClass("ui-block-b"),
              c > 2 &&
                g.filter(":nth-child(" + c + "n+3)").addClass("ui-block-c"),
              c > 3 &&
                g.filter(":nth-child(" + c + "n+4)").addClass("ui-block-d"),
              c > 4 &&
                g.filter(":nth-child(" + c + "n+5)").addClass("ui-block-e");
          });
        }),
        a.fn.grid
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/widgets/controlgroup", ["jquery", "../widget"], b)
        : b(a);
    })(function (a) {
      var b = /ui-corner-([a-z]){2,6}/g;
      return a.widget("ui.controlgroup", {
        version: "1.12.1",
        defaultElement: "<div>",
        options: {
          direction: "horizontal",
          disabled: null,
          onlyVisible: !0,
          items: {
            button:
              "input[type=button], input[type=submit], input[type=reset], button, a",
            controlgroupLabel: ".ui-controlgroup-label",
            checkboxradio: "input[type='checkbox'], input[type='radio']",
            selectmenu: "select",
            spinner: ".ui-spinner-input",
          },
        },
        _create: function () {
          this._enhance();
        },
        _enhance: function () {
          this.element.attr("role", "toolbar"), this.refresh();
        },
        _destroy: function () {
          this._callChildMethod("destroy"),
            this.childWidgets.removeData("ui-controlgroup-data"),
            this.element.removeAttr("role"),
            this.options.items.controlgroupLabel &&
              this.element
                .find(this.options.items.controlgroupLabel)
                .find(".ui-controlgroup-label-contents")
                .contents()
                .unwrap();
        },
        _initWidgets: function () {
          var b = this,
            c = [];
          a.each(this.options.items, function (d, e) {
            var f,
              g = {};
            return e
              ? "controlgroupLabel" === d
                ? ((f = b.element.find(e)),
                  f.each(function () {
                    var b = a(this);
                    b.children(".ui-controlgroup-label-contents").length ||
                      b
                        .contents()
                        .wrapAll(
                          "<span class='ui-controlgroup-label-contents'></span>"
                        );
                  }),
                  b._addClass(
                    f,
                    null,
                    "ui-widget ui-widget-content ui-state-default"
                  ),
                  void (c = c.concat(f.get())))
                : void (
                    a.fn[d] &&
                    ((g = b["_" + d + "Options"]
                      ? b["_" + d + "Options"]("middle")
                      : { classes: {} }),
                    b.element.find(e).each(function () {
                      var e = a(this),
                        f = e[d]("instance"),
                        h = a.widget.extend({}, g);
                      if ("button" !== d || !e.parent(".ui-spinner").length) {
                        f || (f = e[d]()[d]("instance")),
                          f &&
                            (h.classes = b._resolveClassesValues(h.classes, f)),
                          e[d](h);
                        var i = e[d]("widget");
                        a.data(
                          i[0],
                          "ui-controlgroup-data",
                          f ? f : e[d]("instance")
                        ),
                          c.push(i[0]);
                      }
                    }))
                  )
              : void 0;
          }),
            (this.childWidgets = a(a.unique(c))),
            this._addClass(this.childWidgets, "ui-controlgroup-item");
        },
        _callChildMethod: function (b) {
          this.childWidgets.each(function () {
            var c = a(this),
              d = c.data("ui-controlgroup-data");
            d && d[b] && d[b]();
          });
        },
        _updateCornerClass: function (a, b) {
          var c =
              "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",
            d = this._buildSimpleOptions(b, "label").classes.label;
          this._removeClass(a, null, c), this._addClass(a, null, d);
        },
        _buildSimpleOptions: function (a, b) {
          var c = "vertical" === this.options.direction,
            d = { classes: {} };
          return (
            (d.classes[b] = {
              middle: "",
              first: "ui-corner-" + (c ? "top" : "left"),
              last: "ui-corner-" + (c ? "bottom" : "right"),
              only: "ui-corner-all",
            }[a]),
            d
          );
        },
        _spinnerOptions: function (a) {
          var b = this._buildSimpleOptions(a, "ui-spinner");
          return (
            (b.classes["ui-spinner-up"] = ""),
            (b.classes["ui-spinner-down"] = ""),
            b
          );
        },
        _buttonOptions: function (a) {
          return this._buildSimpleOptions(a, "ui-button");
        },
        _checkboxradioOptions: function (a) {
          return this._buildSimpleOptions(a, "ui-checkboxradio-label");
        },
        _selectmenuOptions: function (a) {
          var b = "vertical" === this.options.direction;
          return {
            width: b ? "auto" : !1,
            classes: {
              middle: {
                "ui-selectmenu-button-open": "",
                "ui-selectmenu-button-closed": "",
              },
              first: {
                "ui-selectmenu-button-open": "ui-corner-" + (b ? "top" : "tl"),
                "ui-selectmenu-button-closed":
                  "ui-corner-" + (b ? "top" : "left"),
              },
              last: {
                "ui-selectmenu-button-open": b ? "" : "ui-corner-tr",
                "ui-selectmenu-button-closed":
                  "ui-corner-" + (b ? "bottom" : "right"),
              },
              only: {
                "ui-selectmenu-button-open": "ui-corner-top",
                "ui-selectmenu-button-closed": "ui-corner-all",
              },
            }[a],
          };
        },
        _resolveClassesValues: function (c, d) {
          var e = {};
          return (
            a.each(c, function (f) {
              var g = d.options.classes[f] || "";
              (g = a.trim(g.replace(b, ""))),
                (e[f] = (g + " " + c[f]).replace(/\s+/g, " "));
            }),
            e
          );
        },
        _setOption: function (a, b) {
          return (
            "direction" === a &&
              this._removeClass("ui-controlgroup-" + this.options.direction),
            this._super(a, b),
            "disabled" === a
              ? void this._callChildMethod(b ? "disable" : "enable")
              : void this.refresh()
          );
        },
        refresh: function () {
          var b,
            c = this;
          this._addClass(
            "ui-controlgroup ui-controlgroup-" + this.options.direction
          ),
            "horizontal" === this.options.direction &&
              this._addClass(null, "ui-helper-clearfix"),
            this._initWidgets(),
            (b = this.childWidgets),
            this.options.onlyVisible && (b = b.filter(":visible")),
            b.length &&
              (a.each(["first", "last"], function (a, d) {
                var e = b[d]().data("ui-controlgroup-data");
                if (e && c["_" + e.widgetName + "Options"]) {
                  var f = c["_" + e.widgetName + "Options"](
                    1 === b.length ? "only" : d
                  );
                  (f.classes = c._resolveClassesValues(f.classes, e)),
                    e.element[e.widgetName](f);
                } else c._updateCornerClass(b[d](), d);
              }),
              this._callChildMethod("refresh"));
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/escape-selector", ["jquery", "./version"], b)
        : b(a);
    })(function (a) {
      return (a.ui.escapeSelector = (function () {
        var a = /([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;
        return function (b) {
          return b.replace(a, "\\$1");
        };
      })());
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/form", ["jquery", "./version"], b)
        : b(a);
    })(function (a) {
      return (a.fn.form = function () {
        return "string" == typeof this[0].form
          ? this.closest("form")
          : a(this[0].form);
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/form-reset-mixin", [
            "jquery",
            "./form",
            "./version",
          ], b)
        : b(a);
    })(function (a) {
      return (a.ui.formResetMixin = {
        _formResetHandler: function () {
          var b = a(this);
          setTimeout(function () {
            var c = b.data("ui-form-reset-instances");
            a.each(c, function () {
              this.refresh();
            });
          });
        },
        _bindFormResetHandler: function () {
          if (((this.form = this.element.form()), this.form.length)) {
            var a = this.form.data("ui-form-reset-instances") || [];
            a.length ||
              this.form.on("reset.ui-form-reset", this._formResetHandler),
              a.push(this),
              this.form.data("ui-form-reset-instances", a);
          }
        },
        _unbindFormResetHandler: function () {
          if (this.form.length) {
            var b = this.form.data("ui-form-reset-instances");
            b.splice(a.inArray(this, b), 1),
              b.length
                ? this.form.data("ui-form-reset-instances", b)
                : this.form
                    .removeData("ui-form-reset-instances")
                    .off("reset.ui-form-reset");
          }
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/labels", [
            "jquery",
            "./version",
            "./escape-selector",
          ], b)
        : b(a);
    })(function (a) {
      return (a.fn.labels = function () {
        var b, c, d, e, f;
        return this[0].labels && this[0].labels.length
          ? this.pushStack(this[0].labels)
          : ((e = this.eq(0).parents("label")),
            (d = this.attr("id")),
            d &&
              ((b = this.eq(0).parents().last()),
              (f = b.add(b.length ? b.siblings() : this.siblings())),
              (c = "label[for='" + a.ui.escapeSelector(d) + "']"),
              (e = e.add(f.find(c).addBack(c)))),
            this.pushStack(e));
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/widgets/checkboxradio", [
            "jquery",
            "../escape-selector",
            "../form-reset-mixin",
            "../labels",
            "../widget",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget("ui.checkboxradio", [
          a.ui.formResetMixin,
          {
            version: "1.12.1",
            options: {
              disabled: null,
              label: null,
              icon: !0,
              classes: {
                "ui-checkboxradio-label": "ui-corner-all",
                "ui-checkboxradio-icon": "ui-corner-all",
              },
            },
            _getCreateOptions: function () {
              var b,
                c,
                d = this,
                e = this._super() || {};
              return (
                this._readType(),
                (c = this.element.labels()),
                (this.label = a(c[c.length - 1])),
                this.label.length ||
                  a.error("No label found for checkboxradio widget"),
                (this.originalLabel = ""),
                this.label
                  .contents()
                  .not(this.element[0])
                  .each(function () {
                    d.originalLabel +=
                      3 === this.nodeType ? a(this).text() : this.outerHTML;
                  }),
                this.originalLabel && (e.label = this.originalLabel),
                (b = this.element[0].disabled),
                null != b && (e.disabled = b),
                e
              );
            },
            _create: function () {
              var a = this.element[0].checked;
              this._bindFormResetHandler(),
                null == this.options.disabled &&
                  (this.options.disabled = this.element[0].disabled),
                this._setOption("disabled", this.options.disabled),
                this._addClass(
                  "ui-checkboxradio",
                  "ui-helper-hidden-accessible"
                ),
                this._addClass(
                  this.label,
                  "ui-checkboxradio-label",
                  "ui-button ui-widget"
                ),
                "radio" === this.type &&
                  this._addClass(this.label, "ui-checkboxradio-radio-label"),
                this.options.label && this.options.label !== this.originalLabel
                  ? this._updateLabel()
                  : this.originalLabel &&
                    (this.options.label = this.originalLabel),
                this._enhance(),
                a &&
                  (this._addClass(
                    this.label,
                    "ui-checkboxradio-checked",
                    "ui-state-active"
                  ),
                  this.icon &&
                    this._addClass(this.icon, null, "ui-state-hover")),
                this._on({
                  change: "_toggleClasses",
                  focus: function () {
                    this._addClass(
                      this.label,
                      null,
                      "ui-state-focus ui-visual-focus"
                    );
                  },
                  blur: function () {
                    this._removeClass(
                      this.label,
                      null,
                      "ui-state-focus ui-visual-focus"
                    );
                  },
                });
            },
            _readType: function () {
              var b = this.element[0].nodeName.toLowerCase();
              (this.type = this.element[0].type),
                ("input" === b && /radio|checkbox/.test(this.type)) ||
                  a.error(
                    "Can't create checkboxradio on element.nodeName=" +
                      b +
                      " and element.type=" +
                      this.type
                  );
            },
            _enhance: function () {
              this._updateIcon(this.element[0].checked);
            },
            widget: function () {
              return this.label;
            },
            _getRadioGroup: function () {
              var b,
                c = this.element[0].name,
                d = "input[name='" + a.ui.escapeSelector(c) + "']";
              return c
                ? ((b = this.form.length
                    ? a(this.form[0].elements).filter(d)
                    : a(d).filter(function () {
                        return 0 === a(this).form().length;
                      })),
                  b.not(this.element))
                : a([]);
            },
            _toggleClasses: function () {
              var b = this.element[0].checked;
              this._toggleClass(
                this.label,
                "ui-checkboxradio-checked",
                "ui-state-active",
                b
              ),
                this.options.icon &&
                  "checkbox" === this.type &&
                  this._toggleClass(
                    this.icon,
                    null,
                    "ui-icon-check ui-state-checked",
                    b
                  )._toggleClass(this.icon, null, "ui-icon-blank", !b),
                "radio" === this.type &&
                  this._getRadioGroup().each(function () {
                    var b = a(this).checkboxradio("instance");
                    b &&
                      b._removeClass(
                        b.label,
                        "ui-checkboxradio-checked",
                        "ui-state-active"
                      );
                  });
            },
            _destroy: function () {
              this._unbindFormResetHandler(),
                this.icon && (this.icon.remove(), this.iconSpace.remove());
            },
            _setOption: function (a, b) {
              return "label" !== a || b
                ? (this._super(a, b),
                  "disabled" === a
                    ? (this._toggleClass(
                        this.label,
                        null,
                        "ui-state-disabled",
                        b
                      ),
                      void (this.element[0].disabled = b))
                    : void this.refresh())
                : void 0;
            },
            _updateIcon: function (b) {
              var c = "ui-icon ui-icon-background ";
              this.options.icon
                ? (this.icon ||
                    ((this.icon = a("<span>")),
                    (this.iconSpace = a("<span> </span>")),
                    this._addClass(
                      this.iconSpace,
                      "ui-checkboxradio-icon-space"
                    )),
                  "checkbox" === this.type
                    ? ((c += b
                        ? "ui-icon-check ui-state-checked"
                        : "ui-icon-blank"),
                      this._removeClass(
                        this.icon,
                        null,
                        b ? "ui-icon-blank" : "ui-icon-check"
                      ))
                    : (c += "ui-icon-blank"),
                  this._addClass(this.icon, "ui-checkboxradio-icon", c),
                  b ||
                    this._removeClass(
                      this.icon,
                      null,
                      "ui-icon-check ui-state-checked"
                    ),
                  this.icon.prependTo(this.label).after(this.iconSpace))
                : this.icon !== d &&
                  (this.icon.remove(),
                  this.iconSpace.remove(),
                  delete this.icon);
            },
            _updateLabel: function () {
              var a = this.label.contents().not(this.element[0]);
              this.icon && (a = a.not(this.icon[0])),
                this.iconSpace && (a = a.not(this.iconSpace[0])),
                a.remove(),
                this.label.append(this.options.label);
            },
            refresh: function () {
              var a = this.element[0].checked,
                b = this.element[0].disabled;
              this._updateIcon(a),
                this._toggleClass(
                  this.label,
                  "ui-checkboxradio-checked",
                  "ui-state-active",
                  a
                ),
                null !== this.options.label && this._updateLabel(),
                b !== this.options.disabled &&
                  this._setOptions({ disabled: b });
            },
          },
        ]),
        a.ui.checkboxradio
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/widgets/button", [
            "jquery",
            "./controlgroup",
            "./checkboxradio",
            "../keycode",
            "../widget",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget("ui.button", {
          version: "1.12.1",
          defaultElement: "<button>",
          options: {
            classes: { "ui-button": "ui-corner-all" },
            disabled: null,
            icon: null,
            iconPosition: "beginning",
            label: null,
            showLabel: !0,
          },
          _getCreateOptions: function () {
            var a,
              b = this._super() || {};
            return (
              (this.isInput = this.element.is("input")),
              (a = this.element[0].disabled),
              null != a && (b.disabled = a),
              (this.originalLabel = this.isInput
                ? this.element.val()
                : this.element.html()),
              this.originalLabel && (b.label = this.originalLabel),
              b
            );
          },
          _create: function () {
            !this.option.showLabel & !this.options.icon &&
              (this.options.showLabel = !0),
              null == this.options.disabled &&
                (this.options.disabled = this.element[0].disabled || !1),
              (this.hasTitle = !!this.element.attr("title")),
              this.options.label &&
                this.options.label !== this.originalLabel &&
                (this.isInput
                  ? this.element.val(this.options.label)
                  : this.element.html(this.options.label)),
              this._addClass("ui-button", "ui-widget"),
              this._setOption("disabled", this.options.disabled),
              this._enhance(),
              this.element.is("a") &&
                this._on({
                  keyup: function (b) {
                    b.keyCode === a.ui.keyCode.SPACE &&
                      (b.preventDefault(),
                      this.element[0].click
                        ? this.element[0].click()
                        : this.element.trigger("click"));
                  },
                });
          },
          _enhance: function () {
            this.element.is("button") || this.element.attr("role", "button"),
              this.options.icon &&
                (this._updateIcon("icon", this.options.icon),
                this._updateTooltip());
          },
          _updateTooltip: function () {
            (this.title = this.element.attr("title")),
              this.options.showLabel ||
                this.title ||
                this.element.attr("title", this.options.label);
          },
          _updateIcon: function (b, c) {
            var d = "iconPosition" !== b,
              e = d ? this.options.iconPosition : c,
              f = "top" === e || "bottom" === e;
            this.icon
              ? d && this._removeClass(this.icon, null, this.options.icon)
              : ((this.icon = a("<span>")),
                this._addClass(this.icon, "ui-button-icon", "ui-icon"),
                this.options.showLabel ||
                  this._addClass("ui-button-icon-only")),
              d && this._addClass(this.icon, null, c),
              this._attachIcon(e),
              f
                ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
                  this.iconSpace && this.iconSpace.remove())
                : (this.iconSpace ||
                    ((this.iconSpace = a("<span> </span>")),
                    this._addClass(this.iconSpace, "ui-button-icon-space")),
                  this._removeClass(this.icon, null, "ui-wiget-icon-block"),
                  this._attachIconSpace(e));
          },
          _destroy: function () {
            this.element.removeAttr("role"),
              this.icon && this.icon.remove(),
              this.iconSpace && this.iconSpace.remove(),
              this.hasTitle || this.element.removeAttr("title");
          },
          _attachIconSpace: function (a) {
            this.icon[/^(?:end|bottom)/.test(a) ? "before" : "after"](
              this.iconSpace
            );
          },
          _attachIcon: function (a) {
            this.element[/^(?:end|bottom)/.test(a) ? "append" : "prepend"](
              this.icon
            );
          },
          _setOptions: function (a) {
            var b = a.showLabel === d ? this.options.showLabel : a.showLabel,
              c = a.icon === d ? this.options.icon : a.icon;
            b || c || (a.showLabel = !0), this._super(a);
          },
          _setOption: function (a, b) {
            "icon" === a &&
              (b
                ? this._updateIcon(a, b)
                : this.icon &&
                  (this.icon.remove(),
                  this.iconSpace && this.iconSpace.remove())),
              "iconPosition" === a && this._updateIcon(a, b),
              "showLabel" === a &&
                (this._toggleClass("ui-button-icon-only", null, !b),
                this._updateTooltip()),
              "label" === a &&
                (this.isInput
                  ? this.element.val(b)
                  : (this.element.html(b),
                    this.icon &&
                      (this._attachIcon(this.options.iconPosition),
                      this._attachIconSpace(this.options.iconPosition)))),
              this._super(a, b),
              "disabled" === a &&
                (this._toggleClass(null, "ui-state-disabled", b),
                (this.element[0].disabled = b),
                b && this.element.blur());
          },
          refresh: function () {
            var a = this.element.is("input, button")
              ? this.element[0].disabled
              : this.element.hasClass("ui-button-disabled");
            a !== this.options.disabled && this._setOptions({ disabled: a }),
              this._updateTooltip();
          },
        }),
        a.uiBackCompat !== !1 &&
          (a.widget("ui.button", a.ui.button, {
            options: { text: !0, icons: { primary: null, secondary: null } },
            _create: function () {
              this.options.showLabel &&
                !this.options.text &&
                (this.options.showLabel = this.options.text),
                !this.options.showLabel &&
                  this.options.text &&
                  (this.options.text = this.options.showLabel),
                this.options.icon ||
                (!this.options.icons.primary && !this.options.icons.secondary)
                  ? this.options.icon &&
                    (this.options.icons.primary = this.options.icon)
                  : this.options.icons.primary
                  ? (this.options.icon = this.options.icons.primary)
                  : ((this.options.icon = this.options.icons.secondary),
                    (this.options.iconPosition = "end")),
                this._super();
            },
            _setOption: function (a, b) {
              return "text" === a
                ? void this._super("showLabel", b)
                : ("showLabel" === a && (this.options.text = b),
                  "icon" === a && (this.options.icons.primary = b),
                  "icons" === a &&
                    (b.primary
                      ? (this._super("icon", b.primary),
                        this._super("iconPosition", "beginning"))
                      : b.secondary &&
                        (this._super("icon", b.secondary),
                        this._super("iconPosition", "end"))),
                  void this._superApply(arguments));
            },
          }),
          (a.fn.button = (function (b) {
            return function () {
              return !this.length ||
                (this.length && "INPUT" !== this[0].tagName) ||
                (this.length &&
                  "INPUT" === this[0].tagName &&
                  "checkbox" !== this.attr("type") &&
                  "radio" !== this.attr("type"))
                ? b.apply(this, arguments)
                : (a.ui.checkboxradio ||
                    a.error("Checkboxradio widget missing"),
                  0 === arguments.length
                    ? this.checkboxradio({ icon: !1 })
                    : this.checkboxradio.apply(this, arguments));
            };
          })(a.fn.button)),
          (a.fn.buttonset = function () {
            return (
              a.ui.controlgroup || a.error("Controlgroup widget missing"),
              "option" === arguments[0] &&
              "items" === arguments[1] &&
              arguments[2]
                ? this.controlgroup.apply(this, [
                    arguments[0],
                    "items.button",
                    arguments[2],
                  ])
                : "option" === arguments[0] && "items" === arguments[1]
                ? this.controlgroup.apply(this, [arguments[0], "items.button"])
                : ("object" == typeof arguments[0] &&
                    arguments[0].items &&
                    (arguments[0].items = { button: arguments[0].items }),
                  this.controlgroup.apply(this, arguments))
            );
          })),
        a.ui.button
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/button", [
            "jquery",
            "../../core",
            "../../widget",
            "../widget.theme",
            "jquery-ui/widgets/button",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget("ui.button", a.ui.button, {
          options: { enhanced: !1, theme: null },
          _enhance: function () {
            this.options.enhanced
              ? this.options.icon &&
                (this.icon = this.element.find("ui-button-icon"))
              : this._super();
          },
          _themeElements: function () {
            return (
              (this.options.theme = this.options.theme
                ? this.options.theme
                : "inherit"),
              [{ element: this.widget(), prefix: "ui-button-" }]
            );
          },
        }),
        a.widget("ui.button", a.ui.button, a.mobile.widget.theme),
        (a.ui.button.prototype.options.classes = {
          "ui-button": "ui-shadow ui-corner-all",
        }),
        a.ui.button
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/navbar", ["jquery", "./forms/button", "../widget"], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.navbar", {
        version: "@VERSION",
        options: { iconpos: "top", maxbutton: 5 },
        _create: function () {
          var a = this,
            b = a.element,
            c = b.find("a"),
            e = c.length,
            f = this.options.maxbutton,
            g = c.filter(":jqmData(icon)").length ? a.options.iconpos : d;
          b.addClass("ui-navbar").attr("role", "navigation").find("ul"),
            (this.navbar = b),
            (this.navButtons = c),
            (this.numButtons = e),
            (this.maxButton = f),
            (this.iconpos = g),
            f >= e
              ? c.each(function () {
                  a._makeNavButton(this, g);
                })
              : this._createNavRows();
        },
        _createNavRows: function () {
          var b,
            c,
            d,
            e,
            f,
            g,
            h = this.navbar.find("li"),
            i = this.numButtons,
            j = this.maxButton;
          for (
            b = i % j === 0 ? i / j : Math.floor(i / j) + 1, d = 1;
            b > d;
            d++
          )
            (g = a("<ul>")),
              this._addClass(g, "ui-navbar-row ui-navbar-row-" + d),
              g.appendTo(this.navbar);
          for (d = 0; i > d; d++)
            (e = h.eq(d)),
              this._makeNavButton(e.find("a"), this.iconpos),
              d + 1 > j &&
                (e.detach(),
                (c =
                  (d + 1) % j === 0
                    ? Math.floor(d / j)
                    : Math.floor((d + 1) / j)),
                (f = "ul.ui-navbar-row-" + c),
                this.navbar.find(f).append(e));
        },
        _makeNavButton: function (b, c) {
          var d = !1;
          a(b).hasClass("ui-state-disabled") && (d = !0),
            a(b).button({ iconPosition: c, disabled: d });
        },
        refresh: function () {
          var a = this;
          (this.navButtons = this.navbar.find("a")),
            (this.numButtons = this.navButtons.length),
            this._addClass(this.navbar, "ui-navbar"),
            this.navbar.attr("role", "navigation").find("ul"),
            this.numButtons <= this.maxButton
              ? this.navButtons.each(function () {
                  a._makeNavButton(this, a.iconpos);
                })
              : this._createNavRows();
        },
        _destroy: function () {
          var b;
          this.numButtons > this.maxButton &&
            ((b = this.navbar.find(".ui-navbar-row li").detach()),
            a(".ui-navbar-row").remove(),
            this.navbar.find("ul").append(b)),
            this._removeClass(this.navbar, "ui-navbar"),
            this.navButtons.each(function () {
              a(this).button("destroy");
            });
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/navbar.backcompat", [
            "jquery",
            "./navbar",
            "./widget.backcompat",
          ], b)
        : b(a);
    })(function (a) {
      return a.mobileBackcompat !== !1
        ? a.widget("mobile.navbar", a.mobile.navbar, {
            _create: function () {
              var b = this;
              this._super(),
                b._on(b.element, {
                  "vclick a": function (d) {
                    var e = a(d.target);
                    e.hasClass("ui-state-disabled") ||
                      e.hasClass("ui-button-active") ||
                      (b.navButtons.removeClass("ui-button-active"),
                      e.addClass("ui-button-active"),
                      a(c).one("pagehide", function () {
                        e.removeClass("ui-button-active");
                      }));
                  },
                }),
                b.navbar
                  .closest(".ui-page")
                  .bind("pagebeforeshow", function () {
                    b.navButtons
                      .filter(".ui-state-persist")
                      .addClass("ui-button-active");
                  });
            },
          })
        : void 0;
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/focusable", ["jquery", "./version"], b)
        : b(a);
    })(function (a) {
      function b(a) {
        for (var b = a.css("visibility"); "inherit" === b; )
          (a = a.parent()), (b = a.css("visibility"));
        return "hidden" !== b;
      }
      return (
        (a.ui.focusable = function (c, d) {
          var e,
            f,
            g,
            h,
            i,
            j = c.nodeName.toLowerCase();
          return "area" === j
            ? ((e = c.parentNode),
              (f = e.name),
              c.href && f && "map" === e.nodeName.toLowerCase()
                ? ((g = a("img[usemap='#" + f + "']")),
                  g.length > 0 && g.is(":visible"))
                : !1)
            : (/^(input|select|textarea|button|object)$/.test(j)
                ? ((h = !c.disabled),
                  h &&
                    ((i = a(c).closest("fieldset")[0]), i && (h = !i.disabled)))
                : (h = "a" === j ? c.href || d : d),
              h && a(c).is(":visible") && b(a(c)));
        }),
        a.extend(a.expr[":"], {
          focusable: function (b) {
            return a.ui.focusable(b, null != a.attr(b, "tabindex"));
          },
        }),
        a.ui.focusable
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/popup", [
            "jquery",
            "jquery-ui/focusable",
            "jquery-ui/safe-active-element",
            "jquery-ui/safe-blur",
            "../widget",
            "./widget.theme",
            "../support",
            "../events/navigate",
            "../navigation/path",
            "../navigation/history",
            "../navigation/navigator",
            "../navigation/method",
            "../animationComplete",
            "../navigation",
          ], b)
        : b(a);
    })(function (a) {
      function c(a, b, c) {
        return a >= c.x && a <= c.x + c.cx && b >= c.y && b <= c.y + c.cy;
      }
      function e(a, b) {
        var d = a.offset(),
          e = a.outerWidth(!0),
          f = a.outerHeight(!0);
        return !(
          c(d.left, d.top, b) ||
          c(d.left + e, d.top, b) ||
          c(d.left + e, d.top + f, b) ||
          c(d.left, d.top + f, b)
        );
      }
      function f(a, b, c, d) {
        var e = d;
        return (e =
          b > a
            ? c + (a - b) / 2
            : Math.min(Math.max(c, d - b / 2), c + a - b));
      }
      function g(a) {
        return {
          x: a.scrollLeft(),
          y: a.scrollTop(),
          cx: a[0].innerWidth || a.width(),
          cy: a[0].innerHeight || a.height(),
        };
      }
      var h = function () {
        a(this)
          .find("a")
          .jqmEnhanceable()
          .filter(":jqmData(rel='popup')[href][href!='']")
          .each(function () {
            var a = this,
              b = a.getAttribute("href").substring(1);
            b &&
              (a.setAttribute("aria-haspopup", !0),
              a.setAttribute("aria-owns", b),
              a.setAttribute("aria-expanded", !1));
          });
      };
      return (
        (a.enhance = a.extend(
          a.enhance,
          a.extend({ hooks: [] }, a.enhance)
        )).hooks.push(h),
        a.widget("mobile.popup", {
          version: "@VERSION",
          options: {
            classes: { "ui-popup": "ui-corner-all ui-overlay-shadow" },
            theme: "inherit",
            overlayTheme: "inherit",
            transition: "none",
            positionTo: "origin",
            tolerance: null,
            closeLinkSelector: "a[data-ui-rel='back']",
            dismissible: !0,
            enhanced: !1,
            history: !(a.mobile.browser.oldIE || a.mobile.browser.newIEMobile),
          },
          _handleDocumentVmousedown: function (b) {
            this._isOpen &&
              a.contains(this._ui.container[0], b.target) &&
              this._ignoreResizeEvents();
          },
          _create: function () {
            var b = this.element,
              c = b.attr("id"),
              d = this.options;
            (d.history =
              d.history &&
              a.mobile.ajaxEnabled &&
              a.mobile.hashListeningEnabled),
              a.extend(this, {
                _scrollTop: 0,
                _page: b.closest(".ui-page"),
                _ui: null,
                _fallbackTransition: "",
                _currentTransition: !1,
                _prerequisites: null,
                _isOpen: !1,
                _tolerance: null,
                _resizeData: null,
                _ignoreResizeTo: 0,
                _orientationchangeInProgress: !1,
              }),
              0 === this._page.length && (this._page = a("body")),
              d.enhanced
                ? ((this._ui = {
                    container: b.parent(),
                    screen: b.parent().prev(),
                    placeholder: a(
                      this.document[0].getElementById(c + "-placeholder")
                    ),
                  }),
                  this._addClasses())
                : (this._enhance(), this._applyTransition(d.transition)),
              (this._setTolerance(
                d.tolerance
              )._ui.focusElement = this._ui.container),
              this._on(this._ui.screen, { vclick: "_eatEventAndClose" }),
              this._on(this.window, {
                orientationchange: "_handleWindowOrientationchange",
                resize: "_handleWindowResize",
                keyup: "_handleWindowKeyUp",
              }),
              this._on(this.document, {
                vmousedown: "_handleDocumentVmousedown",
                focusin: "_handleDocumentFocusIn",
              });
          },
          _themeElements: function () {
            return [
              {
                element: this._ui.screen,
                prefix: "ui-overlay-",
                option: "overlayTheme",
              },
              { element: this.element, prefix: "ui-body-" },
            ];
          },
          _addClasses: function () {
            this._addClass(this._ui.placeholder, null, "ui-screen-hidden"),
              this._addClass(
                this._ui.screen,
                "ui-popup-screen",
                "ui-screen-hidden"
              ),
              this._addClass(
                this._ui.container,
                "ui-popup-container ui-popup-hidden ui-popup-truncate"
              ),
              this._addClass("ui-popup");
          },
          _enhance: function () {
            var b = this.element.attr("id"),
              c = "placeholder",
              d = {
                screen: a("<div>"),
                placeholder: a("<div>"),
                container: a("<div>"),
              },
              e = this.document[0].createDocumentFragment();
            return (
              (this._ui = d),
              e.appendChild(d.screen[0]),
              e.appendChild(d.container[0]),
              b &&
                (d.screen.attr("id", b + "-screen"),
                d.container.attr("id", b + "-popup"),
                d.placeholder.attr("id", b + "-placeholder"),
                (c = "placeholder for " + b)),
              d.placeholder
                .html("<!-- " + c + " -->")
                .insertBefore(this.element),
              this.element.detach(),
              this._addClasses(),
              this.element.appendTo(d.container),
              this._page[0].appendChild(e),
              d
            );
          },
          _eatEventAndClose: function (a) {
            return (
              a.preventDefault(),
              a.stopImmediatePropagation(),
              this.options.dismissible && this.close(),
              !1
            );
          },
          _resizeScreen: function () {
            var a = this._ui.screen,
              b = this._ui.container.outerHeight(!0),
              c = a.removeAttr("style").height(),
              d = this.document.height() - 1;
            d > c ? a.height(d) : b > c && a.height(b);
          },
          _handleWindowKeyUp: function (b) {
            return this._isOpen && b.keyCode === a.mobile.keyCode.ESCAPE
              ? this._eatEventAndClose(b)
              : void 0;
          },
          _expectResizeEvent: function () {
            var a = g(this.window);
            if (this._resizeData) {
              if (
                a.x === this._resizeData.windowCoordinates.x &&
                a.y === this._resizeData.windowCoordinates.y &&
                a.cx === this._resizeData.windowCoordinates.cx &&
                a.cy === this._resizeData.windowCoordinates.cy
              )
                return !1;
              clearTimeout(this._resizeData.timeoutId);
            }
            return (
              (this._resizeData = {
                timeoutId: this._delay("_resizeTimeout", 200),
                windowCoordinates: a,
              }),
              !0
            );
          },
          _resizeTimeout: function () {
            this._isOpen
              ? this._expectResizeEvent() ||
                (this._ui.container.hasClass("ui-popup-hidden") &&
                  (this._removeClass(
                    this._ui.container,
                    "ui-popup-hidden ui-popup-truncate"
                  ),
                  this.reposition({ positionTo: "window" }),
                  this._ignoreResizeEvents()),
                this._resizeScreen(),
                (this._resizeData = null),
                (this._orientationchangeInProgress = !1))
              : ((this._resizeData = null),
                (this._orientationchangeInProgress = !1));
          },
          _stopIgnoringResizeEvents: function () {
            this._ignoreResizeTo = 0;
          },
          _ignoreResizeEvents: function () {
            this._ignoreResizeTo && clearTimeout(this._ignoreResizeTo),
              (this._ignoreResizeTo = this._delay(
                "_stopIgnoringResizeEvents",
                1e3
              ));
          },
          _handleWindowResize: function () {
            this._isOpen &&
              0 === this._ignoreResizeTo &&
              e(this._ui.container, g(this.window)) &&
              (this._expectResizeEvent() ||
                this._orientationchangeInProgress) &&
              !this._ui.container.hasClass("ui-popup-hidden") &&
              (this._addClass(
                this._ui.container,
                "ui-popup-hidden ui-popup-truncate"
              ),
              this._ui.container.removeAttr("style"));
          },
          _handleWindowOrientationchange: function () {
            !this._orientationchangeInProgress &&
              this._isOpen &&
              0 === this._ignoreResizeTo &&
              (this._expectResizeEvent(),
              (this._orientationchangeInProgress = !0));
          },
          _handleDocumentFocusIn: function (b) {
            var c,
              d = b.target,
              e = this._ui;
            if (this._isOpen) {
              if (d !== e.container[0]) {
                if (((c = a(d)), !a.contains(e.container[0], d)))
                  return (
                    a(a.ui.safeActiveElement(this.document[0])).one(
                      "focus",
                      a.proxy(function () {
                        a.ui.safeBlur(d);
                      }, this)
                    ),
                    e.focusElement.focus(),
                    b.preventDefault(),
                    b.stopImmediatePropagation(),
                    !1
                  );
                e.focusElement[0] === e.container[0] && (e.focusElement = c);
              }
              this._ignoreResizeEvents();
            }
          },
          _applyTransition: function (b) {
            return (
              b &&
                (this._removeClass(
                  this._ui.container,
                  null,
                  this._fallbackTransition
                ),
                "none" !== b &&
                  ((this._fallbackTransition = a.mobile._maybeDegradeTransition(
                    b
                  )),
                  "none" === this._fallbackTransition &&
                    (this._fallbackTransition = ""),
                  this._addClass(
                    this._ui.container,
                    null,
                    this._fallbackTransition
                  ))),
              this
            );
          },
          _setOptions: function (a) {
            return (
              a.transition !== d &&
                (this._currentTransition ||
                  this._applyTransition(a.transition)),
              a.tolerance !== d && this._setTolerance(a.tolerance),
              a.disabled !== d && a.disabled && this.close(),
              this._super(a)
            );
          },
          _setTolerance: function (b) {
            var c,
              e = { t: 30, r: 15, b: 30, l: 15 };
            if (b !== d)
              switch (
                ((c = String(b).split(",")),
                a.each(c, function (a, b) {
                  c[a] = parseInt(b, 10);
                }),
                c.length)
              ) {
                case 1:
                  isNaN(c[0]) || (e.t = e.r = e.b = e.l = c[0]);
                  break;
                case 2:
                  isNaN(c[0]) || (e.t = e.b = c[0]),
                    isNaN(c[1]) || (e.l = e.r = c[1]);
                  break;
                case 4:
                  isNaN(c[0]) || (e.t = c[0]),
                    isNaN(c[1]) || (e.r = c[1]),
                    isNaN(c[2]) || (e.b = c[2]),
                    isNaN(c[3]) || (e.l = c[3]);
              }
            return (this._tolerance = e), this;
          },
          _clampPopupWidth: function (a) {
            var b,
              c = g(this.window),
              d = {
                x: this._tolerance.l,
                y: c.y + this._tolerance.t,
                cx: c.cx - this._tolerance.l - this._tolerance.r,
                cy: c.cy - this._tolerance.t - this._tolerance.b,
              };
            return (
              a || this._ui.container.css("max-width", d.cx),
              (b = {
                cx: this._ui.container.outerWidth(!0),
                cy: this._ui.container.outerHeight(!0),
              }),
              { rc: d, menuSize: b }
            );
          },
          _calculateFinalLocation: function (a, b) {
            var c,
              d = b.rc,
              e = b.menuSize;
            return (
              (c = {
                left: f(d.cx, e.cx, d.x, a.x),
                top: f(d.cy, e.cy, d.y, a.y),
              }),
              (c.top = Math.max(0, c.top)),
              (c.top -= Math.min(
                c.top,
                Math.max(0, c.top + e.cy - this.document.height())
              )),
              c
            );
          },
          _placementCoords: function (a) {
            return this._calculateFinalLocation(a, this._clampPopupWidth());
          },
          _createPrerequisites: function (b, c, d) {
            var e,
              f = this;
            (e = { screen: a.Deferred(), container: a.Deferred() }),
              e.screen.done(function () {
                e === f._prerequisites && b();
              }),
              e.container.done(function () {
                e === f._prerequisites && c();
              }),
              a.when(e.screen, e.container).done(function () {
                e === f._prerequisites && ((f._prerequisites = null), d());
              }),
              (f._prerequisites = e);
          },
          _animate: function (b) {
            return (
              this._removeClass(
                this._ui.screen,
                null,
                b.classToRemove
              )._addClass(this._ui.screen, null, b.screenClassToAdd),
              b.prerequisites.screen.resolve(),
              b.transition &&
              "none" !== b.transition &&
              (b.applyTransition && this._applyTransition(b.transition),
              this._fallbackTransition)
                ? (this._addClass(
                    this._ui.container,
                    null,
                    b.containerClassToAdd
                  )._removeClass(this._ui.container, null, b.classToRemove),
                  void this._ui.container.animationComplete(
                    a.proxy(b.prerequisites.container, "resolve")
                  ))
                : (this._removeClass(this._ui.container, null, b.classToRemove),
                  void b.prerequisites.container.resolve())
            );
          },
          _desiredCoords: function (b) {
            var c,
              d = null,
              e = g(this.window),
              f = b.x,
              h = b.y,
              i = b.positionTo;
            if (i && "origin" !== i)
              if ("window" === i) (f = e.cx / 2 + e.x), (h = e.cy / 2 + e.y);
              else {
                try {
                  d = a(i);
                } catch (j) {
                  d = null;
                }
                d && (d.filter(":visible"), 0 === d.length && (d = null));
              }
            return (
              d &&
                ((c = d.offset()),
                (f = c.left + d.outerWidth() / 2),
                (h = c.top + d.outerHeight() / 2)),
              ("number" !== a.type(f) || isNaN(f)) && (f = e.cx / 2 + e.x),
              ("number" !== a.type(h) || isNaN(h)) && (h = e.cy / 2 + e.y),
              { x: f, y: h }
            );
          },
          _reposition: function (a) {
            (a = { x: a.x, y: a.y, positionTo: a.positionTo }),
              this._trigger("beforeposition", d, a),
              this._ui.container.offset(
                this._placementCoords(this._desiredCoords(a))
              );
          },
          reposition: function (a) {
            this._isOpen && this._reposition(a);
          },
          _openPrerequisitesComplete: function () {
            var b = this.element.attr("id"),
              c = this._ui.container.find(":focusable").first(),
              d = a.ui.safeActiveElement(this.document[0]);
            this._addClass(this._ui.container, "ui-popup-active"),
              (this._isOpen = !0),
              this._resizeScreen(),
              d && !a.contains(this._ui.container[0], d) && a.ui.safeBlur(d),
              c.length > 0 && (this._ui.focusElement = c),
              this._ignoreResizeEvents(),
              b &&
                this.document
                  .find(
                    "[aria-haspopup='true'][aria-owns='" +
                      a.mobile.path.hashToSelector(b) +
                      "']"
                  )
                  .attr("aria-expanded", !0),
              this._ui.container.attr("tabindex", 0),
              this._trigger("afteropen");
          },
          _open: function (b) {
            var c = a.extend({}, this.options, b),
              d = (function () {
                var a = navigator.userAgent,
                  b = a.match(/AppleWebKit\/([0-9\.]+)/),
                  c = !!b && b[1],
                  d = a.match(/Android (\d+(?:\.\d+))/),
                  e = !!d && d[1],
                  f = a.indexOf("Chrome") > -1;
                return null !== d && "4.0" === e && c && c > 534.13 && !f
                  ? !0
                  : !1;
              })();
            this._createPrerequisites(
              a.noop,
              a.noop,
              a.proxy(this, "_openPrerequisitesComplete")
            ),
              (this._currentTransition = c.transition),
              this._applyTransition(c.transition),
              this._removeClass(this._ui.screen, null, "ui-screen-hidden"),
              this._removeClass(this._ui.container, "ui-popup-truncate"),
              this._reposition(c),
              this._removeClass(this._ui.container, "ui-popup-hidden"),
              this.options.overlayTheme &&
                d &&
                this._addClass(
                  this.element.closest(".ui-page"),
                  "ui-popup-open"
                ),
              this._animate({
                additionalCondition: !0,
                transition: c.transition,
                classToRemove: "",
                screenClassToAdd: "in",
                containerClassToAdd: "in",
                applyTransition: !1,
                prerequisites: this._prerequisites,
              });
          },
          _closePrerequisiteScreen: function () {
            this._removeClass(this._ui.screen, null, "out")._addClass(
              this._ui.screen,
              null,
              "ui-screen-hidden"
            );
          },
          _closePrerequisiteContainer: function () {
            this._removeClass(
              this._ui.container,
              null,
              "reverse out"
            )._addClass(
              this._ui.container,
              "ui-popup-hidden ui-popup-truncate"
            ),
              this._ui.container.removeAttr("style");
          },
          _closePrerequisitesDone: function () {
            var b = this._ui.container,
              c = this.element.attr("id");
            (a.mobile.popup.active = d),
              a(":focus", b[0]).add(b[0]).blur(),
              c &&
                this.document
                  .find(
                    "[aria-haspopup='true'][aria-owns='" +
                      a.mobile.path.hashToSelector(c) +
                      "']"
                  )
                  .attr("aria-expanded", !1),
              this._ui.container.removeAttr("tabindex"),
              this._trigger("afterclose");
          },
          _close: function (b) {
            this._removeClass(
              this._ui.container,
              "ui-popup-active"
            )._removeClass(this._page, "ui-popup-open"),
              (this._isOpen = !1),
              this._createPrerequisites(
                a.proxy(this, "_closePrerequisiteScreen"),
                a.proxy(this, "_closePrerequisiteContainer"),
                a.proxy(this, "_closePrerequisitesDone")
              ),
              this._animate({
                additionalCondition: this._ui.screen.hasClass("in"),
                transition: b ? "none" : this._currentTransition,
                classToRemove: "in",
                screenClassToAdd: "out",
                containerClassToAdd: "reverse out",
                applyTransition: !0,
                prerequisites: this._prerequisites,
              });
          },
          _unenhance: function () {
            this.options.enhanced ||
              (this.element.detach().insertAfter(this._ui.placeholder),
              this._ui.screen.remove(),
              this._ui.container.remove(),
              this._ui.placeholder.remove());
          },
          _destroy: function () {
            this.options.enhanced && (this.classesElementLookup = {}),
              a.mobile.popup.active === this
                ? (this.element.one(
                    "popupafterclose",
                    a.proxy(this, "_unenhance")
                  ),
                  this.close())
                : this._unenhance();
          },
          _closePopup: function (c, d) {
            var e,
              f,
              g = !1;
            a.mobile.popup.active !== this ||
              (c &&
                (c.isDefaultPrevented() ||
                  ("navigate" === c.type &&
                    d &&
                    d.state &&
                    d.state.url &&
                    d.state.url === this._myUrl))) ||
              !this._isOpen ||
              (b.scrollTo(0, this._scrollTop),
              c &&
                "pagebeforechange" === c.type &&
                d &&
                ((e =
                  "string" == typeof d.toPage
                    ? d.toPage
                    : d.toPage.jqmData("url")),
                (e = a.mobile.path.parseUrl(e)),
                (f = e.pathname + e.search + e.hash),
                this._pageUrl !== a.mobile.path.makeUrlAbsolute(f) ||
                d.options.reloadPage
                  ? (g = !0)
                  : c.preventDefault()),
              this._off(this.window, "navigate pagebeforechange"),
              this._off(this.element, "click"),
              this._close(g));
          },
          _bindContainerClose: function () {
            this._on(!0, this.window, {
              navigate: "_closePopup",
              pagebeforechange: "_closePopup",
            });
          },
          widget: function () {
            return this._ui.container;
          },
          _handleCloseLink: function (a) {
            this.close(), a.preventDefault();
          },
          open: function (b) {
            var c,
              d,
              e,
              f,
              g,
              h,
              i = {},
              j = this,
              k = this.options;
            return a.mobile.popup.active || k.disabled
              ? this
              : ((a.mobile.popup.active = this),
                (this._scrollTop = this.window.scrollTop()),
                k.history
                  ? ((h = a.mobile.navigate.history),
                    (d = a.mobile.dialogHashKey),
                    (e = a.mobile.activePage),
                    (f = e ? e.hasClass("ui-page-dialog") : !1),
                    (this._pageUrl = c = h.getActive().url),
                    (g = c.indexOf(d) > -1 && !f && h.activeIndex > 0)
                      ? (j._open(b), j._bindContainerClose(), this)
                      : (-1 !== c.indexOf(d) || f
                          ? (c = a.mobile.path.parseLocation().hash + d)
                          : (c += c.indexOf("#") > -1 ? d : "#" + d),
                        this.window.one("beforenavigate", function (a) {
                          a.preventDefault(),
                            j._open(b),
                            j._bindContainerClose();
                        }),
                        (this.urlAltered = !0),
                        (this._myUrl = c),
                        a.mobile.navigate(c, { role: "dialog" }),
                        this))
                  : (j._open(b),
                    j._bindContainerClose(),
                    (i["click " + k.closeLinkSelector] = "_handleCloseLink"),
                    this._on(i),
                    this));
          },
          close: function () {
            return a.mobile.popup.active !== this
              ? this
              : ((this._scrollTop = this.window.scrollTop()),
                this.options.history && this.urlAltered
                  ? (a.mobile.back(), (this.urlAltered = !1))
                  : this._closePopup(),
                this);
          },
        }),
        a.widget("mobile.popup", a.mobile.popup, a.mobile.widget.theme),
        (a.mobile.popup.handleLink = function (b) {
          var c,
            d = a.mobile.path,
            e = a(d.hashToSelector(d.parseUrl(b.attr("href")).hash)).first();
          e.length > 0 &&
            e.data("mobile-popup") &&
            ((c = b.offset()),
            e.popup("open", {
              x: c.left + b.outerWidth() / 2,
              y: c.top + b.outerHeight() / 2,
              transition: b.jqmData("transition"),
              positionTo: b.jqmData("position-to"),
            })),
            setTimeout(function () {
              b.removeClass("ui-button-active");
            }, 300);
        }),
        a.mobile.document.on("pagebeforechange", function (b, c) {
          "popup" === c.options.role &&
            (a.mobile.popup.handleLink(c.options.link), b.preventDefault());
        }),
        a.mobile.popup
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/listview", [
            "jquery",
            "../widget",
            "./addFirstLastClasses",
          ], b)
        : b(a);
    })(function (a) {
      function b(a, b, c, d) {
        var e = [c].concat(d ? [d] : []).join("|");
        a[e] || (a[e] = []), a[e].push(b);
      }
      function c() {
        var a,
          b,
          c = { a: !0, A: !0 };
        for (a = this.firstChild; a; a = a.nextSibling) {
          if (a.className && a.className.match(f)) return !0;
          c[a.nodeName] && ((b = a), (a = a.firstChild)),
            !a && b && ((a = b), (b = null));
        }
      }
      var e = a.mobile.getAttribute,
        f = /\bui-listview-item-count-bubble\b/;
      return a.widget(
        "mobile.listview",
        a.extend(
          {
            version: "@VERSION",
            options: {
              classes: { "ui-listview-inset": "ui-corner-all ui-shadow" },
              theme: "inherit",
              dividerTheme: "inherit",
              icon: "caret-r",
              splitIcon: "caret-r",
              splitTheme: "inherit",
              inset: !1,
              enhanced: !1,
            },
            _create: function () {
              this._addClass("ui-listview"),
                this.options.inset && this._addClass("ui-listview-inset"),
                this._refresh(!0);
            },
            _themeElements: function () {
              return [{ element: this.element, prefix: "ui-group-theme-" }];
            },
            _setOption: function (a, b) {
              return (
                "inset" === a &&
                  this._toggleClass(
                    this.element,
                    "ui-listview-inset",
                    null,
                    !!b
                  ),
                this._superApply(arguments)
              );
            },
            _getChildrenByTagName: function (b, c, d) {
              var e = [],
                f = {};
              for (f[c] = f[d] = !0, b = b.firstChild; b; )
                f[b.nodeName] && e.push(b), (b = b.nextSibling);
              return a(e);
            },
            _beforeListviewRefresh: a.noop,
            _afterListviewRefresh: a.noop,
            updateItems: function (a) {
              this._refresh(!1, a);
            },
            refresh: function () {
              this._refresh();
            },
            _processListItem: function () {
              return !0;
            },
            _processListItemAnchor: function () {
              return !0;
            },
            _refresh: function (f, g) {
              var h,
                i,
                j,
                k,
                l,
                m,
                n,
                o,
                p,
                q,
                r,
                s,
                t,
                u,
                v,
                w,
                x,
                y,
                z,
                A = this.options,
                B = this.element,
                C = !!a.nodeName(B[0], "ol"),
                D = B.attr("start"),
                E = {};
              for (
                C &&
                  (D || 0 === D) &&
                  B.css(
                    "counter-reset",
                    "listnumbering " + (parseInt(D, 10) - 1)
                  ),
                  this._beforeListviewRefresh(),
                  y = this._getChildrenByTagName(B[0], "li", "LI"),
                  v = g || y,
                  i = 0,
                  j = v.length;
                j > i;
                i++
              )
                (k = v.eq(i)),
                  (l = "ui-listview-item"),
                  (m = d),
                  (f || this._processListItem(k)) &&
                    ((q = this._getChildrenByTagName(k[0], "a", "A")),
                    (r = "list-divider" === e(k[0], "role")),
                    (s = k.attr("value")),
                    (n = e(k[0], "theme")),
                    q.length && ((this._processListItemAnchor(q) && !r) || f)
                      ? ((o = e(k[0], "icon")),
                        (p = o === !1 ? !1 : o || A.icon),
                        (h = "ui-button"),
                        n && (h += " ui-button-" + n),
                        q.length > 1
                          ? ((l += " ui-listview-item-has-alternate"),
                            (t = q.last()),
                            (u = e(t[0], "theme") || A.splitTheme || n),
                            (z = !1),
                            (x = t.children(".ui-listview-item-split-icon")),
                            x.length || ((x = a("<span>")), (z = !0)),
                            b(
                              E,
                              x[0],
                              "ui-listview-item-split-icon",
                              "ui-icon ui-icon-" +
                                (e(t[0], "icon") || o || A.splitIcon)
                            ),
                            b(
                              E,
                              t[0],
                              "ui-listview-item-split-button",
                              "ui-button ui-button-icon-only" +
                                (u ? " ui-button-" + u : "")
                            ),
                            t.attr("title", a.trim(t.getEncodedText())),
                            z && t.empty().prepend(x),
                            (q = q.first()))
                          : p &&
                            ((z = !1),
                            (x = q.children(".ui-listview-item-icon")),
                            x.length || ((x = a("<span>")), (z = !0)),
                            b(
                              E,
                              x[0],
                              "ui-listview-item-icon",
                              "ui-icon ui-icon-" +
                                p +
                                " ui-widget-icon-floatend"
                            ),
                            z && q.prepend(x)),
                        b(E, q[0], "ui-listview-item-button", h))
                      : r
                      ? ((l += " ui-listview-item-divider"),
                        (m =
                          "ui-bar-" +
                          (n || A.dividerTheme || A.theme || "inherit")),
                        k.attr("role", "heading"))
                      : q.length <= 0 &&
                        ((l += " ui-listview-item-static"),
                        (m = "ui-body-" + (n ? n : "inherit"))),
                    C &&
                      s &&
                      k.css(
                        "counter-reset",
                        "listnumbering " + (parseInt(s, 10) - 1)
                      )),
                  b(E, k[0], l, m);
              for (w in E)
                this._addClass.apply(this, [a(E[w])].concat(w.split("|")));
              this._addClass(v.filter(c), "ui-listview-item-has-count"),
                this._afterListviewRefresh(),
                this._addFirstLastClasses(y, this._getVisibles(y, f), f);
            },
          },
          a.mobile.behaviors.addFirstLastClasses
        )
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/navbar.morebutton", [
            "jquery",
            "./navbar",
            "./popup",
            "./listview",
            "../widget",
          ], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.navbar", a.mobile.navbar, {
        options: {
          morebutton: !1,
          morebuttontext: "...",
          morebuttoniconpos: "top",
          morebuttonicon: null,
        },
        _create: function () {
          this._super(),
            this.options.morebutton &&
              this.numButtons > this.maxButton &&
              this._createNavPopup();
        },
        _id: function () {
          return this.element.attr("id") || this.widgetName + this.uuid;
        },
        _createNavRows: function () {
          this.options.morebutton || this._super();
        },
        _createNavPopup: function () {
          var b,
            c,
            d,
            e,
            f,
            g = this._id() + "-popup",
            h = this.navbar.find("li"),
            i = h.length,
            j = this.maxButton,
            k = this.iconpos,
            l = this.options.morebuttonicon;
          for (
            b = a("<div id='" + g + "'></div>"),
              this._addClass(b, "ui-navbar-popup"),
              c = a("<ul>"),
              this._addClass(c, "ui-navbar-popupnav"),
              c.appendTo(b),
              e = 0;
            i > e;
            e++
          )
            (f = h.eq(e)),
              this._makeNavButton(f.find("a"), k),
              e + 1 === j &&
                ((d = a("<li></li>").append(
                  a("<button></button>")
                    .attr("data-rel", "popup")
                    .button({
                      icon: l,
                      iconPosition: this.options.morebuttoniconpos,
                      label: this.options.morebuttontext,
                    })
                )),
                this._on(d, { click: "_openMoreButton" }),
                this.navbar.find("ul").first().append(d)),
              e + 1 >= j && (f.detach(), c.append(f)),
              c.listview();
          b.appendTo(this.navbar),
            b.popup({ positionTo: d }),
            (this.moreButton = d),
            (this.popupDiv = b);
        },
        _openMoreButton: function () {
          a("#" + this._id() + "-popup").popup("open");
        },
        refresh: function () {
          var a,
            b = this,
            c = this.iconpos;
          return this.options.morebutton
            ? (this.popupDiv &&
                ((a = this.moreButton.parent().nextAll()),
                a.find("a").each(function () {
                  b._makeNavButton(this, c);
                }),
                a.appendTo(this.popupDiv.find("ul"))),
              void this._createNavPopup())
            : void this._super();
        },
        _destroy: function () {
          var b;
          return this.options.morebutton
            ? void (
                this.popupDiv &&
                ((b = this.popupDiv.find("li").detach()),
                this.popupDiv.remove(),
                this.moreButton.parent().remove(),
                this.navbar.find("ul").append(b),
                this.navbar.removeClass("ui-navbar"),
                (this.navButtons = this.navbar.find("a")),
                this.navButtons.each(function () {
                  a(this).button("destroy");
                }))
              )
            : void this._super();
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/listview.backcompat", [
            "jquery",
            "./widget.theme",
            "./widget.backcompat",
            "./listview",
          ], b)
        : b(a);
    })(function (a) {
      if (a.mobileBackcompat !== !1) {
        var b = /\bui-listview-item-static\b|\bui-listview-item-divider\b/,
          c = /\bui-button\b/;
        a.widget("mobile.listview", a.mobile.listview, {
          options: { corners: !0, shadow: !0 },
          classProp: "ui-listview-inset",
          _processListItem: function (a) {
            return !b.test(a[0].className);
          },
          _processListItemAnchor: function (a) {
            return !c.test(a[0].className);
          },
        }),
          a.widget(
            "mobile.listview",
            a.mobile.listview,
            a.mobile.widget.backcompat
          );
      }
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/listview.autodividers", ["jquery", "./listview"], b)
        : b(a);
    })(function (a) {
      function b(b) {
        var c = a.trim(b.text()) || null;
        return c ? (c = c.slice(0, 1).toUpperCase()) : null;
      }
      var d = /\bui-listview-item-divider\b/;
      return a.widget("mobile.listview", a.mobile.listview, {
        options: { autodividers: !1, autodividersSelector: b },
        _beforeListviewRefresh: function () {
          return (
            this.options.autodividers && this._replaceDividers(),
            this._superApply(arguments)
          );
        },
        _replaceDividers: function () {
          var b,
            e,
            f,
            g = this._getChildrenByTagName(this.element[0], "li", "LI");
          g.each(
            a.proxy(function (h, i) {
              var j, k;
              if (
                ((i = a(i)),
                (i[0].className && i[0].className.match(d)) ||
                  "list-divider" ===
                    i[0].getAttribute("data-" + a.mobile.ns + "role"))
              ) {
                if (h === g.length - 1) return i.remove(), !1;
                b && b.remove(),
                  (b = i),
                  (e = i.text()),
                  e === f && (b.remove(), (b = null), (e = null));
              } else (k = this.options.autodividersSelector(i)), b && (e === k ? (f = e) : b.remove(), (b = null), (e = null)), k && f !== k && ((j = c.createElement("li")), j.appendChild(c.createTextNode(k)), j.setAttribute("data-" + a.mobile.ns + "role", "list-divider"), i.before(j)), (f = k);
            }, this)
          );
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/listview.hidedividers", ["jquery", "./listview"], b)
        : b(a);
    })(function (a) {
      var b = /(^|\s)ui-listview-item-divider($|\s)/,
        c = /(^|\s)ui-screen-hidden($|\s)/;
      return a.widget("mobile.listview", a.mobile.listview, {
        options: { hideDividers: !1 },
        _afterListviewRefresh: function () {
          var a,
            d,
            e,
            f = !0;
          if ((this._superApply(arguments), this.options.hideDividers))
            for (
              a = this._getChildrenByTagName(this.element[0], "li", "LI"),
                d = a.length - 1;
              d > -1;
              d--
            )
              (e = a[d]),
                e.className.match(b)
                  ? (f && (e.className = e.className + " ui-screen-hidden"),
                    (f = !0))
                  : e.className.match(c) || (f = !1);
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("nojs", ["jquery", "./ns"], b)
        : b(a);
    })(function (a) {
      return (
        (a.mobile.nojs = function (b) {
          a(":jqmData(role='nojs')", b).addClass("ui-nojs");
        }),
        a.mobile.nojs
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/unique-id", ["jquery", "./version"], b)
        : b(a);
    })(function (a) {
      return a.fn.extend({
        uniqueId: (function () {
          var a = 0;
          return function () {
            return this.each(function () {
              this.id || (this.id = "ui-id-" + ++a);
            });
          };
        })(),
        removeUniqueId: function () {
          return this.each(function () {
            /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id");
          });
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/widgets/accordion", [
            "jquery",
            "../version",
            "../keycode",
            "../unique-id",
            "../widget",
          ], b)
        : b(a);
    })(function (a) {
      return a.widget("ui.accordion", {
        version: "1.12.1",
        options: {
          active: 0,
          animate: {},
          classes: {
            "ui-accordion-header": "ui-corner-top",
            "ui-accordion-header-collapsed": "ui-corner-all",
            "ui-accordion-content": "ui-corner-bottom",
          },
          collapsible: !1,
          event: "click",
          header: "> li > :first-child, > :not(li):even",
          heightStyle: "auto",
          icons: {
            activeHeader: "ui-icon-triangle-1-s",
            header: "ui-icon-triangle-1-e",
          },
          activate: null,
          beforeActivate: null,
        },
        hideProps: {
          borderTopWidth: "hide",
          borderBottomWidth: "hide",
          paddingTop: "hide",
          paddingBottom: "hide",
          height: "hide",
        },
        showProps: {
          borderTopWidth: "show",
          borderBottomWidth: "show",
          paddingTop: "show",
          paddingBottom: "show",
          height: "show",
        },
        _create: function () {
          var b = this.options;
          (this.prevShow = this.prevHide = a()),
            this._addClass("ui-accordion", "ui-widget ui-helper-reset"),
            this.element.attr("role", "tablist"),
            b.collapsible ||
              (b.active !== !1 && null != b.active) ||
              (b.active = 0),
            this._processPanels(),
            b.active < 0 && (b.active += this.headers.length),
            this._refresh();
        },
        _getCreateEventData: function () {
          return {
            header: this.active,
            panel: this.active.length ? this.active.next() : a(),
          };
        },
        _createIcons: function () {
          var b,
            c,
            d = this.options.icons;
          d &&
            ((b = a("<span>")),
            this._addClass(
              b,
              "ui-accordion-header-icon",
              "ui-icon " + d.header
            ),
            b.prependTo(this.headers),
            (c = this.active.children(".ui-accordion-header-icon")),
            this._removeClass(c, d.header)
              ._addClass(c, null, d.activeHeader)
              ._addClass(this.headers, "ui-accordion-icons"));
        },
        _destroyIcons: function () {
          this._removeClass(this.headers, "ui-accordion-icons"),
            this.headers.children(".ui-accordion-header-icon").remove();
        },
        _destroy: function () {
          var a;
          this.element.removeAttr("role"),
            this.headers
              .removeAttr(
                "role aria-expanded aria-selected aria-controls tabIndex"
              )
              .removeUniqueId(),
            this._destroyIcons(),
            (a = this.headers
              .next()
              .css("display", "")
              .removeAttr("role aria-hidden aria-labelledby")
              .removeUniqueId()),
            "content" !== this.options.heightStyle && a.css("height", "");
        },
        _setOption: function (a, b) {
          return "active" === a
            ? void this._activate(b)
            : ("event" === a &&
                (this.options.event &&
                  this._off(this.headers, this.options.event),
                this._setupEvents(b)),
              this._super(a, b),
              "collapsible" !== a ||
                b ||
                this.options.active !== !1 ||
                this._activate(0),
              void (
                "icons" === a &&
                (this._destroyIcons(), b && this._createIcons())
              ));
        },
        _setOptionDisabled: function (a) {
          this._super(a),
            this.element.attr("aria-disabled", a),
            this._toggleClass(null, "ui-state-disabled", !!a),
            this._toggleClass(
              this.headers.add(this.headers.next()),
              null,
              "ui-state-disabled",
              !!a
            );
        },
        _keydown: function (b) {
          if (!b.altKey && !b.ctrlKey) {
            var c = a.ui.keyCode,
              d = this.headers.length,
              e = this.headers.index(b.target),
              f = !1;
            switch (b.keyCode) {
              case c.RIGHT:
              case c.DOWN:
                f = this.headers[(e + 1) % d];
                break;
              case c.LEFT:
              case c.UP:
                f = this.headers[(e - 1 + d) % d];
                break;
              case c.SPACE:
              case c.ENTER:
                this._eventHandler(b);
                break;
              case c.HOME:
                f = this.headers[0];
                break;
              case c.END:
                f = this.headers[d - 1];
            }
            f &&
              (a(b.target).attr("tabIndex", -1),
              a(f).attr("tabIndex", 0),
              a(f).trigger("focus"),
              b.preventDefault());
          }
        },
        _panelKeyDown: function (b) {
          b.keyCode === a.ui.keyCode.UP &&
            b.ctrlKey &&
            a(b.currentTarget).prev().trigger("focus");
        },
        refresh: function () {
          var b = this.options;
          this._processPanels(),
            (b.active === !1 && b.collapsible === !0) || !this.headers.length
              ? ((b.active = !1), (this.active = a()))
              : b.active === !1
              ? this._activate(0)
              : this.active.length &&
                !a.contains(this.element[0], this.active[0])
              ? this.headers.length ===
                this.headers.find(".ui-state-disabled").length
                ? ((b.active = !1), (this.active = a()))
                : this._activate(Math.max(0, b.active - 1))
              : (b.active = this.headers.index(this.active)),
            this._destroyIcons(),
            this._refresh();
        },
        _processPanels: function () {
          var a = this.headers,
            b = this.panels;
          (this.headers = this.element.find(this.options.header)),
            this._addClass(
              this.headers,
              "ui-accordion-header ui-accordion-header-collapsed",
              "ui-state-default"
            ),
            (this.panels = this.headers
              .next()
              .filter(":not(.ui-accordion-content-active)")
              .hide()),
            this._addClass(
              this.panels,
              "ui-accordion-content",
              "ui-helper-reset ui-widget-content"
            ),
            b &&
              (this._off(a.not(this.headers)), this._off(b.not(this.panels)));
        },
        _refresh: function () {
          var b,
            c = this.options,
            d = c.heightStyle,
            e = this.element.parent();
          (this.active = this._findActive(c.active)),
            this._addClass(
              this.active,
              "ui-accordion-header-active",
              "ui-state-active"
            )._removeClass(this.active, "ui-accordion-header-collapsed"),
            this._addClass(this.active.next(), "ui-accordion-content-active"),
            this.active.next().show(),
            this.headers
              .attr("role", "tab")
              .each(function () {
                var b = a(this),
                  c = b.uniqueId().attr("id"),
                  d = b.next(),
                  e = d.uniqueId().attr("id");
                b.attr("aria-controls", e), d.attr("aria-labelledby", c);
              })
              .next()
              .attr("role", "tabpanel"),
            this.headers
              .not(this.active)
              .attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1,
              })
              .next()
              .attr({ "aria-hidden": "true" })
              .hide(),
            this.active.length
              ? this.active
                  .attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0,
                  })
                  .next()
                  .attr({ "aria-hidden": "false" })
              : this.headers.eq(0).attr("tabIndex", 0),
            this._createIcons(),
            this._setupEvents(c.event),
            "fill" === d
              ? ((b = e.height()),
                this.element.siblings(":visible").each(function () {
                  var c = a(this),
                    d = c.css("position");
                  "absolute" !== d && "fixed" !== d && (b -= c.outerHeight(!0));
                }),
                this.headers.each(function () {
                  b -= a(this).outerHeight(!0);
                }),
                this.headers
                  .next()
                  .each(function () {
                    a(this).height(
                      Math.max(0, b - a(this).innerHeight() + a(this).height())
                    );
                  })
                  .css("overflow", "auto"))
              : "auto" === d &&
                ((b = 0),
                this.headers
                  .next()
                  .each(function () {
                    var c = a(this).is(":visible");
                    c || a(this).show(),
                      (b = Math.max(b, a(this).css("height", "").height())),
                      c || a(this).hide();
                  })
                  .height(b));
        },
        _activate: function (b) {
          var c = this._findActive(b)[0];
          c !== this.active[0] &&
            ((c = c || this.active[0]),
            this._eventHandler({
              target: c,
              currentTarget: c,
              preventDefault: a.noop,
            }));
        },
        _findActive: function (b) {
          return "number" == typeof b ? this.headers.eq(b) : a();
        },
        _setupEvents: function (b) {
          var c = { keydown: "_keydown" };
          b &&
            a.each(b.split(" "), function (a, b) {
              c[b] = "_eventHandler";
            }),
            this._off(this.headers.add(this.headers.next())),
            this._on(this.headers, c),
            this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
            this._hoverable(this.headers),
            this._focusable(this.headers);
        },
        _eventHandler: function (b) {
          var c,
            d,
            e = this.options,
            f = this.active,
            g = a(b.currentTarget),
            h = g[0] === f[0],
            i = h && e.collapsible,
            j = i ? a() : g.next(),
            k = f.next(),
            l = {
              oldHeader: f,
              oldPanel: k,
              newHeader: i ? a() : g,
              newPanel: j,
            };
          b.preventDefault(),
            (h && !e.collapsible) ||
              this._trigger("beforeActivate", b, l) === !1 ||
              ((e.active = i ? !1 : this.headers.index(g)),
              (this.active = h ? a() : g),
              this._toggle(l),
              this._removeClass(
                f,
                "ui-accordion-header-active",
                "ui-state-active"
              ),
              e.icons &&
                ((c = f.children(".ui-accordion-header-icon")),
                this._removeClass(c, null, e.icons.activeHeader)._addClass(
                  c,
                  null,
                  e.icons.header
                )),
              h ||
                (this._removeClass(
                  g,
                  "ui-accordion-header-collapsed"
                )._addClass(g, "ui-accordion-header-active", "ui-state-active"),
                e.icons &&
                  ((d = g.children(".ui-accordion-header-icon")),
                  this._removeClass(d, null, e.icons.header)._addClass(
                    d,
                    null,
                    e.icons.activeHeader
                  )),
                this._addClass(g.next(), "ui-accordion-content-active")));
        },
        _toggle: function (b) {
          var c = b.newPanel,
            d = this.prevShow.length ? this.prevShow : b.oldPanel;
          this.prevShow.add(this.prevHide).stop(!0, !0),
            (this.prevShow = c),
            (this.prevHide = d),
            this.options.animate
              ? this._animate(c, d, b)
              : (d.hide(), c.show(), this._toggleComplete(b)),
            d.attr({ "aria-hidden": "true" }),
            d
              .prev()
              .attr({ "aria-selected": "false", "aria-expanded": "false" }),
            c.length && d.length
              ? d.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
              : c.length &&
                this.headers
                  .filter(function () {
                    return 0 === parseInt(a(this).attr("tabIndex"), 10);
                  })
                  .attr("tabIndex", -1),
            c
              .attr("aria-hidden", "false")
              .prev()
              .attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0,
              });
        },
        _animate: function (a, b, c) {
          var d,
            e,
            f,
            g = this,
            h = 0,
            i = a.css("box-sizing"),
            j = a.length && (!b.length || a.index() < b.index()),
            k = this.options.animate || {},
            l = (j && k.down) || k,
            m = function () {
              g._toggleComplete(c);
            };
          return (
            "number" == typeof l && (f = l),
            "string" == typeof l && (e = l),
            (e = e || l.easing || k.easing),
            (f = f || l.duration || k.duration),
            b.length
              ? a.length
                ? ((d = a.show().outerHeight()),
                  b.animate(this.hideProps, {
                    duration: f,
                    easing: e,
                    step: function (a, b) {
                      b.now = Math.round(a);
                    },
                  }),
                  void a.hide().animate(this.showProps, {
                    duration: f,
                    easing: e,
                    complete: m,
                    step: function (a, c) {
                      (c.now = Math.round(a)),
                        "height" !== c.prop
                          ? "content-box" === i && (h += c.now)
                          : "content" !== g.options.heightStyle &&
                            ((c.now = Math.round(d - b.outerHeight() - h)),
                            (h = 0));
                    },
                  }))
                : b.animate(this.hideProps, f, e, m)
              : a.animate(this.showProps, f, e, m)
          );
        },
        _toggleComplete: function (a) {
          var b = a.oldPanel,
            c = b.prev();
          this._removeClass(b, "ui-accordion-content-active"),
            this._removeClass(c, "ui-accordion-header-active")._addClass(
              c,
              "ui-accordion-header-collapsed"
            ),
            b.length && (b.parent()[0].className = b.parent()[0].className),
            this._trigger("activate", null, a);
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/button.backcompat", [
            "jquery",
            "../../core",
            "../../widget",
            "../widget.backcompat",
            "./button",
          ], b)
        : b(a);
    })(function (a) {
      return a.mobileBackcompat !== !1
        ? (a.widget("ui.button", a.ui.button, {
            initSelector:
              "input[type='button'], input[type='submit'], input[type='reset'], button, [data-role='button']",
            options: {
              iconpos: "left",
              mini: !1,
              wrapperClass: null,
              inline: null,
              shadow: !0,
              corners: !0,
            },
            classProp: "ui-button",
            _create: function () {
              this.options.iconPosition !==
              a.ui.button.prototype.options.iconPosition
                ? this._seticonPosition(this.options.iconPosition)
                : this.options.iconpos !==
                    a.ui.button.prototype.options.iconpos &&
                  this._seticonpos(this.options.iconpos),
                this._super();
            },
            _seticonPosition: function (a) {
              "end" === a
                ? (this.options.iconpos = "right")
                : "left" !== a && (this.options.iconpos = a);
            },
            _seticonpos: function (a) {
              "right" === a
                ? this._setOption("iconPosition", "end")
                : "left" !== a && this._setOption("iconPosition", a);
            },
            _setOption: function (a, b) {
              ("iconPosition" === a || "iconpos" === a) && this["_set" + a](b),
                this._superApply(arguments);
            },
          }),
          a.widget("ui.button", a.ui.button, a.mobile.widget.backcompat))
        : void 0;
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/checkboxradio", [
            "jquery",
            "../../core",
            "../../widget",
            "jquery-ui/widgets/checkboxradio",
            "../widget.theme",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget("ui.checkboxradio", a.ui.checkboxradio, {
          options: { enhanced: !1, theme: "inherit" },
          _enhance: function () {
            this.options.enhanced
              ? this.options.icon &&
                (this.icon = this.element
                  .parent()
                  .find(".ui-checkboxradio-icon"))
              : this._super();
          },
          _themeElements: function () {
            return [{ element: this.widget(), prefix: "ui-button-" }];
          },
        }),
        a.widget("ui.checkboxradio", a.ui.checkboxradio, a.mobile.widget.theme),
        a.ui.checkboxradio
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/checkboxradio.backcompat", [
            "jquery",
            "../../core",
            "../../widget",
            "../widget.theme",
            "../widget.backcompat",
            "./checkboxradio",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.mobileBackcompat !== !1 &&
          (a.widget("ui.checkboxradio", a.ui.checkboxradio, {
            initSelector:
              "input[type='radio'],input[type='checkbox']:not(:jqmData(role='flipswitch'))",
            options: { iconpos: "left", mini: !1, wrapperClass: null },
            classProp: "ui-checkboxradio-label",
          }),
          a.widget(
            "ui.checkboxradio",
            a.ui.checkboxradio,
            a.mobile.widget.backcompat
          )),
        a.ui.checkboxradio
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("zoom", ["jquery", "./core"], b)
        : b(a);
    })(function (a) {
      var b = a("meta[name=viewport]"),
        c = b.attr("content"),
        d = c + ",maximum-scale=1, user-scalable=no",
        e = c + ",maximum-scale=10, user-scalable=yes",
        f = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(
          c
        );
      return (
        (a.mobile.zoom = a.extend(
          {},
          {
            enabled: !f,
            locked: !1,
            disable: function (c) {
              f ||
                a.mobile.zoom.locked ||
                (b.attr("content", d),
                (a.mobile.zoom.enabled = !1),
                (a.mobile.zoom.locked = c || !1));
            },
            enable: function (c) {
              f ||
                (a.mobile.zoom.locked && c !== !0) ||
                (b.attr("content", e),
                (a.mobile.zoom.enabled = !0),
                (a.mobile.zoom.locked = !1));
            },
            restore: function () {
              f || (b.attr("content", c), (a.mobile.zoom.enabled = !0));
            },
          }
        )),
        a.mobile.zoom
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/textinput", [
            "jquery",
            "../../core",
            "../../widget",
            "../../degradeInputs",
            "../widget.theme",
            "../../zoom",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget("mobile.textinput", {
          version: "@VERSION",
          options: {
            classes: {
              "ui-textinput": "ui-corner-all ui-shadow-inset",
              "ui-textinput-search-icon": "ui-icon ui-alt-icon ui-icon-search",
            },
            theme: "inherit",
            preventFocusZoom:
              /iPhone|iPad|iPod/.test(navigator.platform) &&
              navigator.userAgent.indexOf("AppleWebKit") > -1,
            enhanced: !1,
          },
          _create: function () {
            var b = this.options,
              c = this.element.is("[type='search'], :jqmData(type='search')"),
              e = "textarea" === this.element[0].nodeName.toLowerCase();
            this.element.prop("disabled") && (b.disabled = !0),
              a.extend(this, { isSearch: c, isTextarea: e }),
              this._autoCorrect(),
              b.enhanced
                ? ((this._outer = e ? this.element : this.element.parent()),
                  c &&
                    (this._searchIcon = this._outer.children(
                      ".ui-textinput-search-icon"
                    )))
                : this._enhance(),
              this._addClass(
                this._outer,
                "ui-textinput ui-textinput-" +
                  (this.isSearch ? "search" : "text")
              ),
              this._searchIcon &&
                this._addClass(this._searchIcon, "ui-textinput-search-icon"),
              this._on({ focus: "_handleFocus", blur: "_handleBlur" }),
              b.disabled !== d &&
                (this.element.prop("disabled", !!b.disabled),
                this._toggleClass(
                  this._outer,
                  null,
                  "ui-state-disabled",
                  !!b.disabled
                ));
          },
          refresh: function () {
            this._setOptions({ disabled: this.element.is(":disabled") });
          },
          _themeElements: function () {
            return [{ element: this._outer, prefix: "ui-body-" }];
          },
          _enhance: function () {
            var b;
            this.isTextarea
              ? (b = this.element)
              : ((b = a("<div>")),
                this.isSearch && (this._searchIcon = a("<span>").prependTo(b))),
              (this._outer = b),
              this.isTextarea ||
                b.insertBefore(this.element).append(this.element);
          },
          widget: function () {
            return this._outer;
          },
          _autoCorrect: function () {
            "undefined" == typeof this.element[0].autocorrect ||
              a.support.touchOverflow ||
              (this.element[0].setAttribute("autocorrect", "off"),
              this.element[0].setAttribute("autocomplete", "off"));
          },
          _handleBlur: function () {
            this._removeClass(this._outer, null, "ui-focus"),
              this.options.preventFocusZoom && a.mobile.zoom.enable(!0);
          },
          _handleFocus: function () {
            this.options.preventFocusZoom && a.mobile.zoom.disable(!0),
              this._addClass(this._outer, null, "ui-focus");
          },
          _setOptions: function (a) {
            return (
              a.disabled !== d &&
                (this.element.prop("disabled", !!a.disabled),
                this._toggleClass(
                  this._outer,
                  null,
                  "ui-state-disabled",
                  !!a.disabled
                )),
              this._superApply(arguments)
            );
          },
          _destroy: function () {
            return this.options.enhanced
              ? void (this.classesElementLookup = {})
              : (this._searchIcon && this._searchIcon.remove(),
                void (this.isTextarea || this.element.unwrap()));
          },
        }),
        a.widget("mobile.textinput", a.mobile.textinput, a.mobile.widget.theme)
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/reset", ["jquery", "../../core"], b)
        : b(a);
    })(function (a) {
      return (
        (a.mobile.behaviors.formReset = {
          _handleFormReset: function () {
            this._on(this.element.closest("form"), {
              reset: function () {
                this._delay("_reset");
              },
            });
          },
        }),
        a.mobile.behaviors.formReset
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/slider", [
            "jquery",
            "../../core",
            "../../widget",
            "./textinput",
            "../../vmouse",
            "../widget.theme",
            "./reset",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget(
          "mobile.slider",
          a.extend(
            {
              version: "@VERSION",
              initSelector:
                "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",
              widgetEventPrefix: "slide",
              options: {
                theme: "inherit",
                trackTheme: "inherit",
                classes: {
                  "ui-slider-track": "ui-shadow-inset ui-corner-all",
                  "ui-slider-input": "ui-shadow-inset ui-corner-all",
                },
              },
              _create: function () {
                var e,
                  f = this.element,
                  g = f[0].nodeName.toLowerCase(),
                  h = f.parent().is(":jqmData(role='rangeslider')"),
                  i = f.attr("id"),
                  j = a("[for='" + i + "']"),
                  k = j.attr("id") || i + "-label",
                  l = parseFloat(f.attr("min")),
                  m = parseFloat(f.attr("max")),
                  n = b.parseFloat(f.attr("step") || 1),
                  o = c.createElement("a"),
                  p = a(o),
                  q = c.createElement("div"),
                  r = a(q);
                j.attr("id", k),
                  o.setAttribute("href", "#"),
                  q.setAttribute("role", "application"),
                  this._addClass(r, "ui-slider-track"),
                  this._addClass(p, "ui-slider-handle"),
                  q.appendChild(o),
                  p.attr({
                    role: "slider",
                    "aria-valuemin": l,
                    "aria-valuemax": m,
                    "aria-valuenow": this._value(),
                    "aria-valuetext": this._value(),
                    title: this._value(),
                    "aria-labelledby": k,
                  }),
                  a.extend(this, {
                    slider: r,
                    handle: p,
                    control: f,
                    type: g,
                    step: n,
                    max: m,
                    min: l,
                    isRangeslider: h,
                    dragging: !1,
                    beforeStart: null,
                    userModified: !1,
                    mouseMoved: !1,
                  }),
                  this._addClass("ui-slider-input"),
                  this._on(f, {
                    change: "_controlChange",
                    keyup: "_controlKeyup",
                    blur: "_controlBlur",
                    vmouseup: "_controlVMouseUp",
                  }),
                  r
                    .bind("vmousedown", a.proxy(this._sliderVMouseDown, this))
                    .bind("vclick", !1),
                  this._on(c, { vmousemove: "_preventDocumentDrag" }),
                  this._on(r.add(c), { vmouseup: "_sliderVMouseUp" }),
                  r.insertAfter(f),
                  h ||
                    ((e = "<div class='ui-slider'></div>"),
                    f.add(r).wrapAll(e)),
                  this._on(this.handle, {
                    vmousedown: "_handleVMouseDown",
                    keydown: "_handleKeydown",
                    keyup: "_handleKeyup",
                  }),
                  this.handle.bind("vclick", !1),
                  this._handleFormReset(),
                  this.refresh(d, d, !0);
              },
              _setOptions: function (a) {
                a.disabled !== d && this._setDisabled(a.disabled),
                  this._super(a);
              },
              _controlChange: function (a) {
                return this._trigger("controlchange", a) === !1
                  ? !1
                  : void (this.mouseMoved || this.refresh(this._value(), !0));
              },
              _controlKeyup: function () {
                this.refresh(this._value(), !0, !0);
              },
              _controlBlur: function () {
                this.refresh(this._value(), !0);
              },
              _controlVMouseUp: function () {
                this._checkedRefresh();
              },
              _handleVMouseDown: function () {
                this.handle.focus();
              },
              _handleKeydown: function (b) {
                var c = this._value();
                if (!this.options.disabled) {
                  switch (b.keyCode) {
                    case a.mobile.keyCode.HOME:
                    case a.mobile.keyCode.END:
                    case a.mobile.keyCode.PAGE_UP:
                    case a.mobile.keyCode.PAGE_DOWN:
                    case a.mobile.keyCode.UP:
                    case a.mobile.keyCode.RIGHT:
                    case a.mobile.keyCode.DOWN:
                    case a.mobile.keyCode.LEFT:
                      b.preventDefault(),
                        this._keySliding ||
                          ((this._keySliding = !0),
                          this._addClass(this.handle, null, "ui-state-active"));
                  }
                  switch (b.keyCode) {
                    case a.mobile.keyCode.HOME:
                      this.refresh(this.min);
                      break;
                    case a.mobile.keyCode.END:
                      this.refresh(this.max);
                      break;
                    case a.mobile.keyCode.PAGE_UP:
                    case a.mobile.keyCode.UP:
                    case a.mobile.keyCode.RIGHT:
                      this.refresh(c + this.step);
                      break;
                    case a.mobile.keyCode.PAGE_DOWN:
                    case a.mobile.keyCode.DOWN:
                    case a.mobile.keyCode.LEFT:
                      this.refresh(c - this.step);
                  }
                }
              },
              _handleKeyup: function () {
                this._keySliding &&
                  ((this._keySliding = !1),
                  this._removeClass(this.handle, null, "ui-state-active"));
              },
              _sliderVMouseDown: function (a) {
                return this.options.disabled ||
                  (1 !== a.which && 0 !== a.which && a.which !== d)
                  ? !1
                  : this._trigger("beforestart", a) === !1
                  ? !1
                  : ((this.dragging = !0),
                    (this.userModified = !1),
                    (this.mouseMoved = !1),
                    this.refresh(a),
                    this._trigger("start"),
                    !1);
              },
              _sliderVMouseUp: function () {
                return this.dragging
                  ? ((this.dragging = !1),
                    (this.mouseMoved = !1),
                    this._trigger("stop"),
                    !1)
                  : void 0;
              },
              _preventDocumentDrag: function (a) {
                return this._trigger("drag", a) === !1
                  ? !1
                  : this.dragging && !this.options.disabled
                  ? ((this.mouseMoved = !0),
                    this.refresh(a),
                    (this.userModified =
                      this.beforeStart !== this.element[0].selectedIndex),
                    !1)
                  : void 0;
              },
              _checkedRefresh: function () {
                this.value !== this._value() && this.refresh(this._value());
              },
              _value: function () {
                return parseFloat(this.element.val());
              },
              _reset: function () {
                this.refresh(d, !1, !0);
              },
              refresh: function (b, c, d) {
                var e,
                  f,
                  g,
                  h,
                  i,
                  j,
                  k,
                  l,
                  m,
                  n,
                  o,
                  p,
                  q,
                  r,
                  s,
                  t,
                  u,
                  v,
                  w = this;
                if (
                  (this._addClass(w.slider, "ui-slider-track"),
                  (this.options.disabled || this.element.prop("disabled")) &&
                    this.disable(),
                  (this.value = this._value()),
                  this._addClass(this.handle, null, "ui-button ui-shadow"),
                  (k = this.element),
                  (l = parseFloat(k.attr("min"))),
                  (m = parseFloat(k.attr("max"))),
                  (n =
                    parseFloat(k.attr("step")) > 0
                      ? parseFloat(k.attr("step"))
                      : 1),
                  "object" == typeof b)
                ) {
                  if (
                    ((g = b),
                    (h = 8),
                    (e = this.slider.offset().left),
                    (f = this.slider.width()),
                    (i = f / ((m - l) / n)),
                    !this.dragging || g.pageX < e - h || g.pageX > e + f + h)
                  )
                    return;
                  j =
                    i > 1
                      ? ((g.pageX - e) / f) * 100
                      : Math.round(((g.pageX - e) / f) * 100);
                } else
                  null == b && (b = parseFloat(k.val() || 0)),
                    (j = ((parseFloat(b) - l) / (m - l)) * 100);
                if (
                  !isNaN(j) &&
                  ((o = (j / 100) * (m - l) + l),
                  (p = (o - l) % n),
                  (q = o - p),
                  2 * Math.abs(p) >= n && (q += p > 0 ? n : -n),
                  (r = 100 / ((m - l) / n)),
                  (o = parseFloat(q.toFixed(5))),
                  "undefined" == typeof i && (i = f / ((m - l) / n)),
                  i > 1 && (j = (o - l) * r * (1 / n)),
                  0 > j && (j = 0),
                  j > 100 && (j = 100),
                  l > o && (o = l),
                  o > m && (o = m),
                  this.handle.css("left", j + "%"),
                  this.handle[0].setAttribute("aria-valuenow", o),
                  this.handle[0].setAttribute("aria-valuetext", o),
                  this.handle[0].setAttribute("title", o),
                  this.valuebg && this.valuebg.css("width", j + "%"),
                  this._labels &&
                    ((s = (this.handle.width() / this.slider.width()) * 100),
                    (t = j && s + ((100 - s) * j) / 100),
                    (u = 100 === j ? 0 : Math.min(s + 100 - t, 100)),
                    this._labels.each(function () {
                      var b = a(this).hasClass("ui-slider-label-a");
                      a(this).width((b ? t : u) + "%");
                    })),
                  !d)
                ) {
                  if (
                    ((v = !1),
                    (v = parseFloat(k.val()) !== o),
                    k.val(o),
                    this._trigger("beforechange", b) === !1)
                  )
                    return !1;
                  !c && v && k.trigger("change");
                }
              },
              _themeElements: function () {
                return [
                  { element: this.handle, prefix: "ui-button-" },
                  { element: this.control, prefix: "ui-body-" },
                  {
                    element: this.slider,
                    prefix: "ui-body-",
                    option: "trackTheme",
                  },
                  { element: this.element, prefix: "ui-body-" },
                ];
              },
              _setDisabled: function (a) {
                (a = !!a),
                  this.element.prop("disabled", a),
                  this._toggleClass(this.slider, null, "ui-state-disabled", a),
                  this.slider.attr("aria-disabled", a),
                  this._toggleClass(null, "ui-state-disabled", a);
              },
            },
            a.mobile.behaviors.formReset
          )
        ),
        a.widget("mobile.slider", a.mobile.slider, a.mobile.widget.theme)
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/slider.backcompat", [
            "jquery",
            "../widget.backcompat",
            "./slider",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.mobileBackcompat !== !1 &&
          (a.widget("mobile.slider", a.mobile.slider, {
            options: { corners: !0, mini: !1, highlight: !1 },
            classProp: "ui-slider",
            _create: function () {
              this._super(),
                this.options.mini &&
                  this._addClass(this.slider, "ui-mini", null),
                this.options.highlight &&
                  this._setHighlight(this.options.highlight),
                this.options.corners !== d &&
                  this._setCorners(this.options.corners);
            },
            refresh: function (b, d, e) {
              this._super(b, d, e),
                this.options.highlight &&
                  0 === this.slider.find(".ui-slider-bg").length &&
                  (this.valuebg = (function (b) {
                    var d = c.createElement("div");
                    return (
                      (d.className = "ui-slider-bg ui-button-active"),
                      a(d).prependTo(b)
                    );
                  })(this.slider));
            },
            _setHighlight: function (a) {
              a
                ? ((this.options.highlight = !!a), this.refresh())
                : this.valuebg && (this.valuebg.remove(), (this.valuebg = !1));
            },
            _setCorners: function (a) {
              this._toggleClass(this.slider, null, "ui-corner-all", a),
                this._toggleClass(this.element, null, "ui-corner-all", a);
            },
          }),
          a.widget(
            "mobile.slider",
            a.mobile.slider,
            a.mobile.widget.backcompat
          )),
        a.mobile.slider
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/slider.tooltip", ["jquery", "./slider"], b)
        : b(a);
    })(function (a) {
      function b() {
        return (
          c ||
            (c = a("<div></div>", {
              class: "ui-slider-popup ui-shadow ui-corner-all",
            })),
          c.clone()
        );
      }
      var c;
      return a.widget("mobile.slider", a.mobile.slider, {
        options: { popupEnabled: !1, showValue: !1 },
        _create: function () {
          this._super(),
            a.extend(this, {
              _currentValue: null,
              _popup: null,
              _popupVisible: !1,
            }),
            this._setOption("popupEnabled", this.options.popupEnabled),
            this._on(this.handle.add(this.slider), {
              vmousedown: "_showPopup",
            }),
            this._on(this.slider.add(this.document), {
              vmouseup: "_hidePopup",
            }),
            this._refresh();
        },
        _positionPopup: function () {
          var a = this.handle.offset();
          this._popup.offset({
            left: a.left + (this.handle.width() - this._popup.width()) / 2,
            top: a.top - this._popup.outerHeight() - 5,
          });
        },
        _setOption: function (a, c) {
          this._super(a, c),
            "showValue" === a
              ? this.handle.html(c && !this.options.mini ? this._value() : "")
              : "popupEnabled" === a &&
                c &&
                !this._popup &&
                (this._popup = b()
                  .addClass("ui-body-" + (this.options.theme || "a"))
                  .hide()
                  .insertBefore(this.element));
        },
        refresh: function () {
          this._super.apply(this, arguments), this._refresh();
        },
        _refresh: function () {
          var a,
            b = this.options;
          b.popupEnabled && this.handle.removeAttr("title"),
            (a = this._value()),
            a !== this._currentValue &&
              ((this._currentValue = a),
              b.popupEnabled &&
                this._popup &&
                (this._positionPopup(), this._popup.html(a)),
              b.showValue && !this.options.mini && this.handle.html(a));
        },
        _showPopup: function () {
          this.options.popupEnabled &&
            !this._popupVisible &&
            (this._popup.show(),
            this._positionPopup(),
            (this._popupVisible = !0));
        },
        _hidePopup: function () {
          var a = this.options;
          a.popupEnabled &&
            this._popupVisible &&
            (a.showValue && !a.mini && this.handle.html(this._value()),
            this._popup.hide(),
            (this._popupVisible = !1));
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/flipswitch", [
            "jquery",
            "../../core",
            "../../widget",
            "../../zoom",
            "./reset",
          ], b)
        : b(a);
    })(function (a) {
      var b = /([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;
      return a.widget(
        "mobile.flipswitch",
        a.extend(
          {
            version: "@VERSION",
            options: {
              onText: "On",
              offText: "Off",
              theme: null,
              enhanced: !1,
              classes: {
                "ui-flipswitch": "ui-shadow-inset ui-corner-all",
                "ui-flipswitch-on": "ui-shadow",
              },
            },
            _create: function () {
              var b;
              (this._originalTabIndex = this.element.attr("tabindex")),
                (this.type = this.element[0].nodeName.toLowerCase()),
                this.options.enhanced
                  ? a.extend(this, {
                      flipswitch: this.element.parent(),
                      on: this.element.find(".ui-flipswitch-on").eq(0),
                      off: this.element.find(".ui-flipswitch-off").eq(0),
                    })
                  : this._enhance(),
                this._handleFormReset(),
                this.element.attr("tabindex", "-1"),
                this._on({ focus: "_handleInputFocus" }),
                this.element.is(":disabled") &&
                  this._setOptions({ disabled: !0 }),
                this._on(this.flipswitch, {
                  click: "_toggle",
                  swipeleft: "_left",
                  swiperight: "_right",
                }),
                this._on(this.on, { keydown: "_keydown" }),
                this._on({ change: "refresh" }),
                "select" === this.element[0].nodeName.toLowerCase() &&
                  ((b = this._findLabels()),
                  b.length &&
                    this._on(b, {
                      click: function (a) {
                        this.element.click(), a.preventDefault();
                      },
                    }));
            },
            _handleInputFocus: function () {
              this.on.focus();
            },
            widget: function () {
              return this.flipswitch;
            },
            _left: function () {
              this.flipswitch.removeClass("ui-flipswitch-active"),
                "select" === this.type
                  ? (this.element.get(0).selectedIndex = 0)
                  : this.element.prop("checked", !1),
                this.element.trigger("change");
            },
            _right: function () {
              this._addClass(this.flipswitch, "ui-flipswitch-active"),
                "select" === this.type
                  ? (this.element.get(0).selectedIndex = 1)
                  : this.element.prop("checked", !0),
                this.element.trigger("change");
            },
            _enhance: function () {
              var b = a("<div>"),
                c = this.options,
                d = this.element,
                e = this._originalTabIndex || 0,
                f = c.theme ? c.theme : "inherit",
                g = a("<span tabindex='" + e + "'></span>"),
                h = a("<span></span>"),
                i =
                  "input" === this.type
                    ? c.onText
                    : d.find("option").eq(1).text(),
                j =
                  "input" === this.type
                    ? c.offText
                    : d.find("option").eq(0).text();
              this._addClass(
                g,
                "ui-flipswitch-on",
                "ui-button ui-button-inherit"
              ),
                g.text(i),
                this._addClass(h, "ui-flipswitch-off"),
                h.text(j),
                this._addClass(
                  b,
                  "ui-flipswitch",
                  "ui-bar-" +
                    f +
                    " " +
                    (d.is(":checked") || d.find("option").eq(1).is(":selected")
                      ? "ui-flipswitch-active"
                      : "") +
                    (d.is(":disabled") ? " ui-state-disabled" : "")
                ),
                b.append(g, h),
                this._addClass("ui-flipswitch-input"),
                d.after(b).appendTo(b),
                a.extend(this, { flipswitch: b, on: g, off: h });
            },
            _reset: function () {
              this.refresh();
            },
            refresh: function () {
              var a,
                b = this.flipswitch.hasClass("ui-flipswitch-active")
                  ? "_right"
                  : "_left";
              (a =
                "select" === this.type
                  ? this.element.get(0).selectedIndex > 0
                    ? "_right"
                    : "_left"
                  : this.element.prop("checked")
                  ? "_right"
                  : "_left"),
                a !== b && this[a]();
            },
            _findLabels: function () {
              var c = this.element[0],
                d = c.labels;
              return (
                d && d.length
                  ? (d = a(d))
                  : ((d = this.element.closest("label")),
                    0 === d.length &&
                      (d = a(
                        this.document[0].getElementsByTagName("label")
                      ).filter(
                        "[for='" +
                          c.getAttribute("id").replace(b, "\\$1") +
                          "']"
                      ))),
                d
              );
            },
            _toggle: function () {
              var a = this.flipswitch.hasClass("ui-flipswitch-active")
                ? "_left"
                : "_right";
              this[a]();
            },
            _keydown: function (b) {
              b.which === a.mobile.keyCode.LEFT
                ? this._left()
                : b.which === a.mobile.keyCode.RIGHT
                ? this._right()
                : b.which === a.mobile.keyCode.SPACE &&
                  (this._toggle(), b.preventDefault());
            },
            _setOptions: function (a) {
              if (a.theme !== d) {
                var b = this.options.theme ? this.options.theme : "inherit",
                  c = a.theme ? a.theme : "inherit";
                this._removeClass(this.flipswitch, null, "ui-bar-" + b),
                  this._addClass(this.flipswitch, null, "ui-bar-" + c);
              }
              a.onText !== d && this.on.text(a.onText),
                a.offText !== d && this.off.text(a.offText),
                a.disabled !== d &&
                  this._toggleClass(
                    this.flipswitch,
                    null,
                    "ui-state-disabled",
                    a.disabled
                  ),
                this._super(a);
            },
            _destroy: function () {
              this.options.enhanced ||
                (null != this._originalTabIndex
                  ? this.element.attr("tabindex", this._originalTabIndex)
                  : this.element.removeAttr("tabindex"),
                this.on.remove(),
                this.off.remove(),
                this.element.unwrap(),
                this.element.removeClass("ui-flipswitch-input"),
                this.flipswitch.remove());
            },
          },
          a.mobile.behaviors.formReset
        )
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/flipswitch.backcompat", [
            "jquery",
            "../widget.backcompat",
            "./flipswitch",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.mobileBackcompat !== !1 &&
          (a.widget("mobile.flipswitch", a.mobile.flipswitch, {
            options: { corners: !0, mini: !1, wrapperClass: null },
            classProp: "ui-flipswitch",
          }),
          a.widget(
            "mobile.flipswitch",
            a.mobile.flipswitch,
            a.mobile.widget.backcompat
          )),
        a.mobile.flipswitch
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/rangeslider", [
            "jquery",
            "../../core",
            "../../widget",
            "./textinput",
            "../../vmouse",
            "./reset",
            "../widget.theme",
            "./slider",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget(
          "mobile.rangeslider",
          a.extend(
            {
              version: "@VERSION",
              options: { theme: "inherit", trackTheme: "inherit" },
              _create: function () {
                var b = this.element.find("input").first(),
                  c = this.element.find("input").last(),
                  d = this.element.find("label").first(),
                  e =
                    a.data(b.get(0), "mobile-slider") ||
                    a.data(b.slider().get(0), "mobile-slider"),
                  f =
                    a.data(c.get(0), "mobile-slider") ||
                    a.data(c.slider().get(0), "mobile-slider"),
                  g = e.slider,
                  h = f.slider,
                  i = e.handle,
                  j = a("<div>");
                this._addClass(j, "ui-rangeslider-sliders"),
                  j.appendTo(this.element),
                  this._addClass(b, "ui-rangeslider-first"),
                  this._addClass(c, "ui-rangeslider-last"),
                  this._addClass("ui-rangeslider"),
                  g.appendTo(j),
                  h.appendTo(j),
                  d.insertBefore(this.element),
                  i.prependTo(h),
                  a.extend(this, {
                    _inputFirst: b,
                    _inputLast: c,
                    _sliderFirst: g,
                    _sliderLast: h,
                    _label: d,
                    _targetVal: null,
                    _sliderTarget: !1,
                    _sliders: j,
                    _proxy: !1,
                  }),
                  this.refresh(),
                  this._on(this.element.find("input.ui-slider-input"), {
                    slidebeforestart: "_slidebeforestart",
                    slidestop: "_slidestop",
                    slidedrag: "_slidedrag",
                    slidebeforechange: "_change",
                    blur: "_change",
                    keyup: "_change",
                  }),
                  this._on({ mousedown: "_change" }),
                  this._on(this.element.closest("form"), {
                    reset: "_handleReset",
                  }),
                  this._on(i, { vmousedown: "_dragFirstHandle" });
              },
              _handleReset: function () {
                var a = this;
                setTimeout(function () {
                  a._updateHighlight();
                }, 0);
              },
              _dragFirstHandle: function (b) {
                return (
                  (a.data(
                    this._inputFirst.get(0),
                    "mobile-slider"
                  ).dragging = !0),
                  a.data(this._inputFirst.get(0), "mobile-slider").refresh(b),
                  a
                    .data(this._inputFirst.get(0), "mobile-slider")
                    ._trigger("start"),
                  !1
                );
              },
              _slidedrag: function (b) {
                var c = a(b.target).is(this._inputFirst),
                  d = c ? this._inputLast : this._inputFirst;
                return (
                  (this._sliderTarget = !1),
                  ("first" === this._proxy && c) ||
                  ("last" === this._proxy && !c)
                    ? ((a.data(d.get(0), "mobile-slider").dragging = !0),
                      a.data(d.get(0), "mobile-slider").refresh(b),
                      !1)
                    : void 0
                );
              },
              _slidestop: function (b) {
                var c = a(b.target).is(this._inputFirst);
                (this._proxy = !1),
                  this.element.find("input").trigger("vmouseup"),
                  this._sliderFirst.css("z-index", c ? 1 : "");
              },
              _slidebeforestart: function (b) {
                (this._sliderTarget = !1),
                  a(b.originalEvent.target).hasClass("ui-slider-track") &&
                    ((this._sliderTarget = !0),
                    (this._targetVal = a(b.target).val()));
              },
              _setOptions: function (a) {
                a.theme !== d && this._setTheme(a.theme),
                  a.trackTheme !== d && this._setTrackTheme(a.trackTheme),
                  a.disabled !== d && this._setDisabled(a.disabled),
                  this._super(a),
                  this.refresh();
              },
              refresh: function () {
                var a = this.element,
                  b = this.options;
                (this._inputFirst.is(":disabled") ||
                  this._inputLast.is(":disabled")) &&
                  (this.options.disabled = !0),
                  a
                    .find("input")
                    .slider({
                      theme: b.theme,
                      trackTheme: b.trackTheme,
                      disabled: b.disabled,
                    })
                    .slider("refresh"),
                  this._updateHighlight();
              },
              _change: function (b) {
                if ("keyup" === b.type) return this._updateHighlight(), !1;
                var c = this,
                  d = parseFloat(this._inputFirst.val(), 10),
                  e = parseFloat(this._inputLast.val(), 10),
                  f = a(b.target).hasClass("ui-rangeslider-first"),
                  g = f ? this._inputFirst : this._inputLast,
                  h = f ? this._inputLast : this._inputFirst;
                if (
                  this._inputFirst.val() > this._inputLast.val() &&
                  "mousedown" === b.type &&
                  !a(b.target).hasClass("ui-slider-handle")
                )
                  g.blur();
                else if ("mousedown" === b.type) return;
                return (
                  d > e && !this._sliderTarget
                    ? (g.val(f ? e : d).slider("refresh"),
                      this._trigger("normalize"))
                    : d > e &&
                      (g.val(this._targetVal).slider("refresh"),
                      setTimeout(function () {
                        h.val(f ? d : e).slider("refresh"),
                          a.data(h.get(0), "mobile-slider").handle.focus(),
                          c._sliderFirst.css("z-index", f ? "" : 1),
                          c._trigger("normalize");
                      }, 0),
                      (this._proxy = f ? "first" : "last")),
                  d === e
                    ? (a
                        .data(g.get(0), "mobile-slider")
                        .handle.css("z-index", 1),
                      a
                        .data(h.get(0), "mobile-slider")
                        .handle.css("z-index", 0))
                    : (a
                        .data(h.get(0), "mobile-slider")
                        .handle.css("z-index", ""),
                      a
                        .data(g.get(0), "mobile-slider")
                        .handle.css("z-index", "")),
                  this._updateHighlight(),
                  d > e ? !1 : void 0
                );
              },
              _themeElements: function () {
                return [
                  {
                    element: this.element.find(".ui-slider-track"),
                    prefix: "ui-bar-",
                  },
                ];
              },
              _updateHighlight: function () {
                var b = parseInt(
                    a
                      .data(this._inputFirst.get(0), "mobile-slider")
                      .handle.get(0).style.left,
                    10
                  ),
                  c = parseInt(
                    a
                      .data(this._inputLast.get(0), "mobile-slider")
                      .handle.get(0).style.left,
                    10
                  ),
                  d = c - b;
                this.element
                  .find(".ui-slider-bg")
                  .css({ "margin-left": b + "%", width: d + "%" });
              },
              _setTheme: function (a) {
                this._inputFirst.slider("option", "theme", a),
                  this._inputLast.slider("option", "theme", a);
              },
              _setTrackTheme: function (a) {
                this._inputFirst.slider("option", "trackTheme", a),
                  this._inputLast.slider("option", "trackTheme", a);
              },
              _setDisabled: function (a) {
                this._inputFirst.prop("disabled", a),
                  this._inputLast.prop("disabled", a);
              },
              _destroy: function () {
                this._label.prependTo(this.element),
                  this._inputFirst.after(this._sliderFirst),
                  this._inputLast.after(this._sliderLast),
                  this._sliders.remove(),
                  this.element.find("input").slider("destroy");
              },
            },
            a.mobile.behaviors.formReset
          )
        ),
        a.widget(
          "mobile.rangeslider",
          a.mobile.rangeslider,
          a.mobile.widget.theme
        )
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/rangeslider.backcompat", [
            "jquery",
            "../widget.backcompat",
            "./rangeslider",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.mobileBackcompat !== !1 &&
          (a.widget("mobile.rangeslider", a.mobile.rangeslider, {
            options: { corners: !0, mini: !1, highlight: !0 },
            classProp: "ui-rangeslider",
            _create: function () {
              this._super(),
                this.element
                  .find("input")
                  .slider({
                    mini: this.options.mini,
                    highlight: this.options.highlight,
                  })
                  .slider("refresh"),
                this._updateHighlight(),
                this.options.mini &&
                  (this._addClass("ui-mini", null),
                  this._addClass(this._sliderFirst, "ui-mini", null),
                  this._addClass(this._sliderLast, "ui-mini", null));
            },
          }),
          a.widget(
            "mobile.rangeslider",
            a.mobile.rangeslider,
            a.mobile.widget.backcompat
          )),
        a.mobile.rangeslider
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/textinput.backcompat", [
            "jquery",
            "../widget.backcompat",
            "./textinput",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.mobileBackcompat !== !1 &&
          (a.widget("mobile.textinput", a.mobile.textinput, {
            initSelector:
              "input[type='text'],input[type='search'],:jqmData(type='search'),input[type='number']:not(:jqmData(type='range')),:jqmData(type='number'),input[type='password'],input[type='email'],input[type='url'],input[type='tel'],textarea,input[type='time'],input[type='date'],input[type='month'],input[type='week'],input[type='datetime'],input[type='datetime-local'],input[type='color'],input:not([type]),input[type='file']",
            options: { corners: !0, mini: !1, wrapperClass: null },
            classProp: "ui-textinput",
          }),
          a.widget(
            "mobile.textinput",
            a.mobile.textinput,
            a.mobile.widget.backcompat
          )),
        a.mobile.textinput
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/clearButton", ["jquery", "./textinput"], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.textinput", a.mobile.textinput, {
        options: {
          classes: { "ui-textinput-clear-button": "ui-corner-all" },
          clearBtn: !1,
          clearBtnText: "Clear text",
        },
        _create: function () {
          this._super(),
            this.isSearch && (this.options.clearBtn = !0),
            this.options.clearBtn &&
              !this.isTextarea &&
              (this.options.enhanced
                ? ((this._clearButton = this._outer.children(
                    ".ui-textinput-clear-button"
                  )),
                  (this._clearButtonIcon = this._clearButton.children(
                    ".ui-textinput-clear-button-icon"
                  )),
                  this._toggleClasses(!0),
                  this._bindClearEvents())
                : this._addClearButton());
        },
        _clearButtonClick: function (a) {
          this.element.val("").focus().trigger("change"), a.preventDefault();
        },
        _toggleClasses: function (a) {
          this._toggleClass(
            this._outer,
            "ui-textinput-has-clear-button",
            null,
            a
          ),
            this._toggleClass(
              this._clearButton,
              "ui-textinput-clear-button",
              "ui-button ui-button-icon-only ui-button-right",
              a
            ),
            this._toggleClass(
              this._clearButtonIcon,
              "ui-textinput-clear-button-icon",
              "ui-icon-delete ui-icon",
              a
            ),
            this._toggleClass("ui-textinput-hide-clear", null, a);
        },
        _addClearButton: function () {
          (this._clearButtonIcon = a("<span>")),
            (this._clearButton = a(
              "<a href='#' tabindex='-1' aria-hidden='true'></a>"
            )
              .attr("title", this.options.clearBtnText)
              .text(this.options.clearBtnText)
              .append(this._clearButtonIcon)),
            this._toggleClasses(!0),
            this._clearButton.appendTo(this._outer),
            this._bindClearEvents(),
            this._toggleClear();
        },
        _removeClearButton: function () {
          this._toggleClasses(!1),
            this._unbindClearEvents(),
            this._clearButton.remove(),
            clearTimeout(this._toggleClearDelay),
            delete this._toggleClearDelay;
        },
        _bindClearEvents: function () {
          this._on(this._clearButton, { click: "_clearButtonClick" }),
            this._on({
              keyup: "_toggleClear",
              change: "_toggleClear",
              input: "_toggleClear",
              focus: "_toggleClear",
              blur: "_toggleClear",
              cut: "_toggleClear",
              paste: "_toggleClear",
            });
        },
        _unbindClearEvents: function () {
          this._off(this._clearButton, "click"),
            this._off(this.element, "keyup change input focus blur cut paste");
        },
        _setOptions: function (a) {
          this._super(a),
            a.clearBtn === d ||
              this.isTextarea ||
              (a.clearBtn ? this._addClearButton() : this._removeClearButton()),
            a.clearBtnText !== d &&
              this._clearButton !== d &&
              this._clearButton
                .text(a.clearBtnText)
                .attr("title", a.clearBtnText);
        },
        _toggleClear: function () {
          this._toggleClearDelay = this._delay("_toggleClearClass", 0);
        },
        _toggleClearClass: function () {
          this._toggleClass(
            this._clearButton,
            "ui-textinput-clear-button-hidden",
            d,
            !this.element.val()
          ),
            this._clearButton.attr("aria-hidden", !this.element.val()),
            delete this._toggleClearDelay;
        },
        _destroy: function () {
          this._super(),
            !this.options.enhanced &&
              this._clearButton &&
              this._removeClearButton();
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/autogrow", ["jquery", "./textinput"], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.textinput", a.mobile.textinput, {
        options: { autogrow: !0, keyupTimeoutBuffer: 100 },
        _create: function () {
          this._super(),
            this.options.autogrow && this.isTextarea && this._autogrow();
        },
        _autogrow: function () {
          this._addClass("ui-textinput-autogrow"),
            this._on({
              keyup: "_timeout",
              change: "_timeout",
              input: "_timeout",
              paste: "_timeout",
            }),
            this._handleShow("create"),
            this._on(!0, this.document, {
              popupbeforeposition: "_handleShow",
              updatelayout: "_handleShow",
              panelopen: "_handleShow",
            });
        },
        _handleShow: function (b) {
          ("create" === b ||
            (a.contains(b.target, this.element[0]) &&
              this.element.is(":visible"))) &&
            ("create" !== b &&
              "popupbeforeposition" !== b.type &&
              (this._addClass("ui-textinput-autogrow-resize"),
              this.element.animationComplete(
                a.proxy(function () {
                  this._removeClass("ui-textinput-autogrow-resize");
                }, this),
                "transition"
              )),
            this._prepareHeightUpdate());
        },
        _unbindAutogrow: function () {
          this._removeClass("ui-textinput-autogrow"),
            this._off(this.element, "keyup change input paste"),
            this._off(
              this.document,
              "pageshow popupbeforeposition updatelayout panelopen"
            );
        },
        keyupTimeout: null,
        _prepareHeightUpdate: function (a) {
          this.keyupTimeout && clearTimeout(this.keyupTimeout),
            a === d
              ? this._updateHeight()
              : (this.keyupTimeout = this._delay("_updateHeight", a));
        },
        _timeout: function () {
          this._prepareHeightUpdate(this.options.keyupTimeoutBuffer);
        },
        _updateHeight: function () {
          var a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j = this.window.scrollTop();
          (this.keyupTimeout = 0),
            "onpage" in this.element[0] ||
              this.element.css({ height: 0, "min-height": 0, "max-height": 0 }),
            (d = this.element[0].scrollHeight),
            (e = this.element[0].clientHeight),
            (f = parseFloat(this.element.css("border-top-width"))),
            (g = parseFloat(this.element.css("border-bottom-width"))),
            (h = f + g),
            (i = d + h + 15),
            0 === e &&
              ((a = parseFloat(this.element.css("padding-top"))),
              (b = parseFloat(this.element.css("padding-bottom"))),
              (c = a + b),
              (i += c)),
            this.element.css({ height: i, "min-height": "", "max-height": "" }),
            this.window.scrollTop(j);
        },
        refresh: function () {
          this.options.autogrow && this.isTextarea && this._updateHeight();
        },
        _setOptions: function (a) {
          this._super(a),
            a.autogrow !== d &&
              this.isTextarea &&
              (a.autogrow ? this._autogrow() : this._unbindAutogrow());
        },
        _destroy: function () {
          this._unbindAutogrow(), this._super();
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/select", [
            "jquery",
            "jquery-ui/labels",
            "../../core",
            "../../widget",
            "../../zoom",
            "../../navigation/path",
            "../widget.theme",
            "jquery-ui/form-reset-mixin",
          ], b)
        : b(a);
    })(function (a) {
      var c = a.widget("mobile.selectmenu", [
        {
          version: "@VERSION",
          options: {
            classes: { "ui-selectmenu-button": "ui-corner-all ui-shadow" },
            theme: "inherit",
            icon: "caret-d",
            iconpos: "right",
            nativeMenu: !0,
            preventFocusZoom:
              /iPhone|iPad|iPod/.test(navigator.platform) &&
              navigator.userAgent.indexOf("AppleWebKit") > -1,
          },
          _button: function () {
            return a("<div/>");
          },
          _themeElements: function () {
            return [{ element: this.button, prefix: "ui-button-" }];
          },
          _setDisabled: function (a) {
            return (
              this.element.prop("disabled", a),
              this.button.attr("aria-disabled", a),
              this._setOption("disabled", a)
            );
          },
          _focusButton: function () {
            var a = this;
            setTimeout(function () {
              a.button.focus();
            }, 40);
          },
          _selectOptions: function () {
            return this.element.find("option");
          },
          _preExtension: function () {
            var b = "";
            (this.element = this.element),
              (this.selectWrapper = a("<div>")),
              this._addClass(this.selectWrapper, "ui-selectmenu", b),
              this.selectWrapper.insertBefore(this.element),
              this.element.detach(),
              (this.selectId =
                this.element.attr("id") || "select-" + this.uuid),
              (this.buttonId = this.selectId + "-button"),
              (this.isMultiple = this.element[0].multiple),
              this.element.appendTo(this.selectWrapper),
              (this.label = this.element.labels().first());
          },
          _destroy: function () {
            this.selectWrapper.length > 0 &&
              (this.element.insertAfter(this.selectWrapper),
              this.selectWrapper.remove()),
              this._unbindFormResetHandler();
          },
          _create: function () {
            var c = this.options,
              d = c.icon
                ? c.iconpos ||
                  this.element.attr("data-" + this._ns() + "iconpos")
                : !1;
            this._preExtension(),
              (this.button = this._button()),
              this.button.attr("id", this.buttonId),
              this._addClass(this.button, "ui-selectmenu-button", "ui-button"),
              this.button.insertBefore(this.element),
              this.options.icon &&
                ((this.icon = a("<span>")),
                this._addClass(
                  this.icon,
                  "ui-selectmenu-button-icon",
                  "ui-icon-" +
                    c.icon +
                    " ui-icon ui-widget-icon-float" +
                    ("right" === d ? "end" : "beginning")
                ),
                this.button.prepend(this.icon)),
              this.setButtonText(),
              c.nativeMenu &&
                b.opera &&
                b.opera.version &&
                this._addClass(this.button, "ui-selectmenu-nativeonly"),
              this.isMultiple &&
                ((this.buttonCount = a("<span>").hide()),
                this._addClass(
                  this.buttonCount,
                  "ui-selectmenu-count-bubble",
                  "ui-listview-item-count-bubble ui-body-inherit"
                ),
                this._addClass(this.button, null, "ui-listview-item-has-count"),
                this.buttonCount.appendTo(this.button)),
              (c.disabled || this.element.prop("disabled")) && this.disable(),
              this._on(this.element, { change: "refresh" }),
              this._bindFormResetHandler(),
              this._on(this.button, { keydown: "_handleKeydown" }),
              this.build();
          },
          build: function () {
            var b = this;
            this.element
              .appendTo(b.button)
              .bind("vmousedown", function () {
                b.button.addClass("ui-button-active");
              })
              .bind("focus", function () {
                b.button.addClass("ui-focus");
              })
              .bind("blur", function () {
                b.button.removeClass("ui-focus");
              })
              .bind("focus vmouseover", function () {
                b.button.trigger("vmouseover");
              })
              .bind("vmousemove", function () {
                b.button.removeClass("ui-button-active");
              })
              .bind("change blur vmouseout", function () {
                b.button.trigger("vmouseout").removeClass("ui-button-active");
              }),
              b.button.bind("vmousedown", function () {
                b.options.preventFocusZoom && a.mobile.zoom.disable(!0);
              }),
              b.label.bind("click focus", function () {
                b.options.preventFocusZoom && a.mobile.zoom.disable(!0);
              }),
              b.element.bind("focus", function () {
                b.options.preventFocusZoom && a.mobile.zoom.disable(!0);
              }),
              b.button.bind("mouseup", function () {
                b.options.preventFocusZoom &&
                  setTimeout(function () {
                    a.mobile.zoom.enable(!0);
                  }, 0);
              }),
              b.element.bind("blur", function () {
                b.options.preventFocusZoom && a.mobile.zoom.enable(!0);
              });
          },
          selected: function () {
            return this._selectOptions().filter(":selected");
          },
          selectedIndices: function () {
            var a = this;
            return this.selected()
              .map(function () {
                return a._selectOptions().index(this);
              })
              .get();
          },
          setButtonText: function () {
            var b = this,
              c = this.selected(),
              d = this.placeholder,
              e = a("<span>");
            this.button
              .children("span")
              .not(".ui-selectmenu-count-bubble,.ui-selectmenu-button-icon")
              .remove()
              .end()
              .end()
              .append(
                (function () {
                  return (
                    c.length &&
                      (d = c
                        .map(function () {
                          return a(this).text();
                        })
                        .get()
                        .join(", ")),
                    d ? e.text(d) : e.html("&#160;"),
                    e.attr("aria-hidden", "true"),
                    b._addClass(
                      e,
                      "ui-selectmenu-button-text",
                      [b.element.attr("class"), c.attr("class")].join(" ")
                    ),
                    b._removeClass(e, null, "ui-screen-hidden"),
                    e
                  );
                })()
              );
          },
          setButtonCount: function () {
            var a = this.selected();
            this.isMultiple &&
              this.buttonCount[a.length > 1 ? "show" : "hide"]().text(a.length);
          },
          _handleKeydown: function () {
            this._delay("_refreshButton");
          },
          _refreshButton: function () {
            this.setButtonText(), this.setButtonCount();
          },
          refresh: function () {
            this._refreshButton();
          },
          open: a.noop,
          close: a.noop,
          disable: function () {
            this._setDisabled(!0), this.button.addClass("ui-state-disabled");
          },
          enable: function () {
            this._setDisabled(!1), this.button.removeClass("ui-state-disabled");
          },
        },
        a.ui.formResetMixin,
      ]);
      return a.widget("mobile.selectmenu", c, a.mobile.widget.theme);
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/select.backcompat", [
            "jquery",
            "../widget.backcompat",
            "./select",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.mobileBackcompat !== !1 &&
          (a.widget("mobile.selectmenu", a.mobile.selectmenu, {
            options: { inline: !1, corners: !0, shadow: !0, mini: !1 },
            initSelector:
              "select:not( :jqmData(role='slider')):not( :jqmData(role='flipswitch') )",
            classProp: "ui-selectmenu-button",
          }),
          a.widget(
            "mobile.selectmenu",
            a.mobile.selectmenu,
            a.mobile.widget.backcompat
          )),
        a.mobile.selectmenu
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/toolbar", [
            "jquery",
            "../widget",
            "../core",
            "../navigation",
            "./widget.theme",
            "../zoom",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget("mobile.toolbar", {
          version: "@VERSION",
          options: {
            theme: "inherit",
            addBackBtn: !1,
            backBtnTheme: null,
            backBtnText: "Back",
            type: "toolbar",
            ariaRole: null,
          },
          _create: function () {
            var b,
              c,
              d = this.options.type,
              e = this.element.closest(".ui-page"),
              f =
                null === this.options.ariaRole
                  ? "header" === d
                    ? "banner"
                    : "footer" === d
                    ? "contentinfo"
                    : "toolbar"
                  : this.options.ariaRole;
            0 === e.length &&
              ((e = !1), this._on(this.document, { pageshow: "refresh" })),
              a.extend(this, {
                role: d,
                page: e,
                leftbutton: b,
                rightbutton: c,
              }),
              this.element.attr("role", f),
              this._addClass("ui-toolbar" + ("toolbar" !== d ? "-" + d : "")),
              this.refresh(),
              this._setOptions(this.options);
          },
          _setOptions: function (a) {
            a.addBackBtn && this._updateBackButton(),
              a.backBtnText !== d &&
                this.element
                  .find(".ui-toolbar-back-button .ui-button-text")
                  .text(a.backBtnText),
              this._super(a);
          },
          refresh: function () {
            this.page ||
              (this._setRelative(),
              "footer" === this.role
                ? this.element.appendTo("body")
                : "header" === this.role && this._updateBackButton()),
              this._addHeadingClasses();
          },
          _setRelative: function () {
            a("[data-" + a.mobile.ns + "role='page']").css({
              position: "relative",
            });
          },
          _updateBackButton: function () {
            var b,
              c = this.options,
              d = c.backBtnTheme || c.theme;
            (b = this._backButton = this._backButton || {}),
              this.options.addBackBtn &&
              "header" === this.role &&
              a(".ui-page").length > 1 &&
              (this.page
                ? this.page[0].getAttribute("data-" + a.mobile.ns + "url") !==
                  a.mobile.path.stripHash(location.hash)
                : a.mobile.navigate &&
                  a.mobile.navigate.history &&
                  a.mobile.navigate.history.activeIndex > 0) &&
              !this.leftbutton
                ? b.attached ||
                  ((this.backButton = b.element = (
                    b.element ||
                    a(
                      "<a role='button' href='#' class='ui-button ui-corner-all ui-shadow ui-toolbar-header-button-left " +
                        (d ? "ui-button-" + d + " " : "") +
                        "ui-toolbar-back-button ui-icon-carat-l ui-icon-beginning' data-" +
                        a.mobile.ns +
                        "rel='back'>" +
                        c.backBtnText +
                        "</a>"
                    )
                  ).prependTo(this.element)),
                  (b.attached = !0))
                : b.element && (b.element.detach(), (b.attached = !1));
          },
          _addHeadingClasses: function () {
            (this.headerElements = this.element.children(
              "h1, h2, h3, h4, h5, h6"
            )),
              this._addClass(this.headerElements, "ui-toolbar-title"),
              this.headerElements.attr({ role: "heading", "aria-level": "1" });
          },
          _destroy: function () {
            var a;
            this.headerElements.removeAttr("role aria-level"),
              "header" === this.role &&
                this.backButton &&
                this.backButton.remove(),
              (a = this.options.theme ? this.options.theme : "inherit"),
              this.element.removeAttr("role");
          },
          _themeElements: function () {
            var a = [{ element: this.element, prefix: "ui-bar-" }];
            return (
              this.options.addBackBtn &&
                this.backButton !== d &&
                a.push({
                  element: this.backButton,
                  prefix: "ui-button-",
                  option: "backBtnTheme",
                }),
              a
            );
          },
        }),
        a.widget("mobile.toolbar", a.mobile.toolbar, a.mobile.widget.theme)
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/select.custom", [
            "jquery",
            "../../core",
            "../../navigation",
            "./select",
            "../toolbar",
            "../listview",
            "../page.dialog.backcompat",
            "../popup",
          ], b)
        : b(a);
    })(function (a) {
      var b =
        ".ui-disabled,.ui-state-disabled,.ui-listview-item-divider,.ui-screen-hidden";
      return a.widget("mobile.selectmenu", a.mobile.selectmenu, {
        options: {
          classes: {
            "ui-selectmenu-custom-header-close-button": "ui-corner-all",
          },
          overlayTheme: null,
          dividerTheme: null,
          hidePlaceholderMenuItems: !0,
          closeText: "Close",
        },
        _ns: function () {
          return "ui-";
        },
        _create: function () {
          var a = this.options;
          return (
            (this._origTabIndex =
              this.element.attr("tabindex") === d
                ? !1
                : this.element.attr("tabindex")),
            (a.nativeMenu =
              a.nativeMenu ||
              this.element.closest(
                "[data-" + this._ns() + "role='popup'],:mobile-popup"
              ).length > 0),
            this._super()
          );
        },
        _handleSelectFocus: function () {
          this.element.blur(), this.button.focus();
        },
        _handleKeydown: function (a) {
          this._super(a), this._handleButtonVclickKeydown(a);
        },
        _handleButtonVclickKeydown: function (b) {
          this.options.disabled ||
            this.isOpen ||
            this.options.nativeMenu ||
            (("vclick" === b.type ||
              (b.keyCode &&
                (b.keyCode === a.ui.keyCode.ENTER ||
                  b.keyCode === a.ui.keyCode.SPACE))) &&
              (this._decideFormat(),
              "overlay" === this.menuType
                ? this.button
                    .attr("href", "#" + this.popupId)
                    .attr("data-" + this._ns() + "rel", "popup")
                : this.button
                    .attr("href", "#" + this.dialogId)
                    .attr("data-" + this._ns() + "rel", "dialog"),
              (this.isOpen = !0)));
        },
        _handleListFocus: function (b) {
          var c =
            "focusin" === b.type
              ? { tabindex: "0", event: "vmouseover" }
              : { tabindex: "-1", event: "vmouseout" };
          a(b.target).attr("tabindex", c.tabindex).trigger(c.event);
        },
        _goToAdjacentItem: function (a, c, d) {
          var e = a[d + "All"]()
            .not(b + ",[data-" + this._ns() + "role='placeholder']")
            .first();
          e.length &&
            (c.blur().attr("tabindex", "-1"), e.find("a").first().focus());
        },
        _handleListKeydown: function (b) {
          var c = a(b.target),
            d = c.closest("li");
          switch (b.keyCode) {
            case 38:
              return this._goToAdjacentItem(d, c, "prev"), !1;
            case 40:
              return this._goToAdjacentItem(d, c, "next"), !1;
            case 13:
            case 32:
              return c.trigger("click"), !1;
          }
        },
        _handleBeforeTransition: function (b, c) {
          var d;
          c &&
            c.prevPage &&
            c.prevPage[0] === this.menuPage[0] &&
            ((d = a.proxy(function () {
              this._delay(function () {
                this._focusButton();
              });
            }, this)),
            c.options && c.options.transition && "none" !== c.options.transition
              ? c.prevPage.animationComplete(d)
              : d());
        },
        _handleHeaderCloseClick: function () {
          return "overlay" === this.menuType ? (this.close(), !1) : void 0;
        },
        _handleListItemClick: function (b) {
          var c,
            d = a(b.target).closest("li"),
            e = this.element[0].selectedIndex,
            f = a.mobile.getAttribute(d, "option-index"),
            g = this._selectOptions().eq(f)[0];
          (g.selected = this.isMultiple ? !g.selected : !0),
            this.isMultiple &&
              ((c = d.find("a")),
              this._toggleClass(c, null, "ui-checkbox-on", g.selected),
              this._toggleClass(c, null, "ui-checkbox-off", !g.selected)),
            this.isMultiple || e === f || (this._triggerChange = !0),
            this.isMultiple
              ? (this.element.trigger("change"),
                this.list
                  .find("li:not(.ui-listview-item-divider)")
                  .eq(f)
                  .find("a")
                  .first()
                  .focus())
              : this.close(),
            b.preventDefault();
        },
        build: function () {
          if (this.options.nativeMenu) return this._super();
          var b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w = this.options;
          return (
            (b = this.selectId),
            (c = b + "-listbox"),
            (d = b + "-dialog"),
            (e = this.label),
            (f = this.element.closest(".ui-page")),
            (g = this.element[0].multiple),
            (h = b + "-menu"),
            (i = w.theme
              ? " data-" + this._ns() + "theme='" + w.theme + "'"
              : ""),
            (j = w.overlayTheme || w.theme || null),
            (k = j ? " data-" + this._ns() + "overlay-theme='" + j + "'" : ""),
            (l =
              w.dividerTheme && this.element.children("optgroup").length > 0
                ? " data-" +
                  this._ns() +
                  "divider-theme='" +
                  w.dividerTheme +
                  "'"
                : ""),
            (m = a(
              "<div data-" +
                this._ns() +
                "role='page' data-" +
                this._ns() +
                "dialog='true'><div></div></div>"
            ).attr("id", d)),
            (s = m.children()),
            (n = a(
              "<div data-" + this._ns() + "type='header'><h1></h1></div>"
            ).prependTo(m)),
            (o = a("<div></div>")
              .attr("id", c)
              .insertAfter(this.element)
              .popup()),
            (p = a(
              "<ul role='listbox' aria-labelledby='" +
                this.buttonId +
                "'" +
                i +
                l +
                "></ul>"
            )
              .attr("id", h)
              .appendTo(o)),
            (q = a("<div>").prependTo(o)),
            (r = a("<h1></h1>").appendTo(q)),
            m.page(),
            n.add(q).toolbar({ type: "header" }),
            this._addClass(m, "ui-selectmenu-custom"),
            this._addClass(s, null, "ui-content"),
            this._addClass(o, null, "ui-selectmenu-custom"),
            this._addClass(p, null, "ui-selectmenu-custom-list"),
            this.isMultiple &&
              ((u = a("<a>", { role: "button", href: "#" })),
              (v = a("<span>")),
              this._addClass(
                v,
                "ui-selectmenu-custom-header-close-button-icon",
                "ui-icon ui-icon-delete"
              ),
              u.append(v),
              this._addClass(
                u,
                "ui-selectmenu-custom-header-close-button",
                "ui-button ui-toolbar-header-button-left ui-button-icon-only"
              ),
              u.appendTo(q)),
            a.extend(this, {
              selectId: b,
              menuId: h,
              popupId: c,
              dialogId: d,
              thisPage: f,
              menuPage: m,
              menuPageHeader: n,
              label: e,
              isMultiple: g,
              theme: w.theme,
              listbox: o,
              list: p,
              header: q,
              headerTitle: r,
              headerClose: u,
              menuPageContent: s,
              menuPageClose: t,
              placeholder: "",
            }),
            this.refresh(),
            this.element.attr("tabindex", "-1"),
            this._on(this.element, { focus: "_handleSelectFocus" }),
            this._on(this.button, { vclick: "_handleButtonVclickKeydown" }),
            this.list.attr("role", "listbox"),
            this._on(this.list, {
              focusin: "_handleListFocus",
              focusout: "_handleListFocus",
              keydown: "_handleListKeydown",
              "click li:not(.ui-disabled,.ui-state-disabled,.ui-listview-item-divider)":
                "_handleListItemClick",
            }),
            this._on(this.listbox, { popupafterclose: "_popupClosed" }),
            this.isMultiple &&
              this._on(this.headerClose, { click: "_handleHeaderCloseClick" }),
            this._on(this.document, {
              pagecontainerbeforetransition: "_handleBeforeTransition",
            }),
            this
          );
        },
        _popupClosed: function () {
          this.close(), this._delayedTrigger();
        },
        _delayedTrigger: function () {
          this._triggerChange && this.element.trigger("change"),
            (this._triggerChange = !1);
        },
        _isRebuildRequired: function () {
          var a = this.list.find("li"),
            b = this._selectOptions().not(".ui-screen-hidden");
          return b.text() !== a.text();
        },
        selected: function () {
          return this._selectOptions().filter(
            ":selected:not( [data-" + this._ns() + "placeholder='true'] )"
          );
        },
        refresh: function (b) {
          var c, d;
          return this.options.nativeMenu
            ? this._super(b)
            : ((b || this._isRebuildRequired()) && this._buildList(),
              (c = this.selectedIndices()),
              this.setButtonText(),
              this.setButtonCount(),
              (d = this.list.find("li:not(.ui-listview-item-divider)")),
              this._removeClass(d.find("a"), null, "ui-button-active"),
              d.attr("aria-selected", !1),
              void d.each(
                a.proxy(function (b, d) {
                  var e,
                    f = a(d);
                  a.inArray(b, c) > -1
                    ? (f.attr("aria-selected", !0),
                      this.isMultiple
                        ? ((e = f.find("a")),
                          this._removeClass(e, null, "ui-checkbox-off"),
                          this._addClass(e, null, "ui-checkbox-on"))
                        : f.hasClass("ui-screen-hidden")
                        ? this._addClass(
                            f.next().find("a"),
                            null,
                            "ui-button-active"
                          )
                        : this._addClass(f.find("a"), null, "ui-button-active"))
                    : this.isMultiple &&
                      ((e = f.find("a")),
                      this._removeClass(e, null, "ui-checkbox-on"),
                      this._addClass(e, null, "ui-checkbox-off"));
                }, this)
              ));
        },
        close: function () {
          !this.options.disabled &&
            this.isOpen &&
            ("page" === this.menuType
              ? this.menuPage.hasClass("ui-page-active") && a.mobile.back()
              : this.listbox.popup("close"),
            this._focusButton(),
            (this.isOpen = !1));
        },
        open: function () {
          this.button.click();
        },
        _focusMenuItem: function () {
          var a = this.list.find("a.ui-button-active");
          0 === a.length &&
            (a = this.list.find(
              "li:not(" +
                b +
                ",[data-" +
                this._ns() +
                "role='placeholder'] ) a.ui-button"
            )),
            a.first().focus();
        },
        _setTheme: function (a, b) {
          this.listbox.popup("option", a, b),
            "inherit" !== b && this.menuPage.page("option", a, b),
            "theme" === a &&
              (this.header.toolbar("option", a, b),
              this.menuPageHeader.toolbar("option", a, b));
        },
        _setOption: function (a, b) {
          return (
            this.options.nativeMenu ||
              ("theme" !== a && "overlayTheme" !== a) ||
              this._setTheme(a, b),
            "hidePlaceholderMenuItems" === a
              ? (this._superApply(arguments), void this.refresh(!0))
              : ("closeText" === a && this.headerClose.text(b),
                this._superApply(arguments))
          );
        },
        _decideFormat: function () {
          var b,
            c = this.window,
            d = this.list.parent(),
            e = d.outerHeight(),
            f = c.scrollTop(),
            g = this.button.offset().top,
            h = c.height();
          e > h - 80 || !a.support.scrollTop
            ? (this.menuPage.appendTo(
                this.element.closest(".ui-pagecontainer")
              ),
              (this.menuPageClose = this.menuPage.find(".ui-toolbar-header a")),
              (b = this.thisPage.page("instance")),
              b._off(b.document, "pagecontainerhide"),
              0 === f &&
                g > h &&
                this.thisPage.one("pagehide", function () {
                  a(this).data(a.camelCase(this._ns() + "lastScroll"), g);
                }),
              this._on(this.document, {
                pagecontainershow: "_handlePageContainerShow",
                pagecontainerhide: "_handlePageContainerHide",
              }),
              (this.menuType = "page"),
              this.menuPageContent.append(this.list),
              this.menuPage
                .find("div .ui-toolbar-title")
                .text(this.label.getEncodedText() || this.placeholder))
            : ((this.menuType = "overlay"),
              this.listbox.one({
                popupafteropen: a.proxy(this, "_focusMenuItem"),
              })),
            this._setTheme("theme", this.options.theme),
            this._setTheme("overlayTheme", this.options.overlayTheme);
        },
        _handlePageContainerShow: function (a, b) {
          b.toPage[0] === this.menuPage[0] &&
            (this._off(this.document, "pagecontainershow"),
            this._focusMenuItem());
        },
        _handlePageContainerHide: function (a, b) {
          b.prevPage[0] === this.menuPage[0] &&
            (this._off(this.document, "pagecontainershow"),
            this._delayedTrigger(),
            this.thisPage.page("bindRemove"),
            this.menuPage.detach(),
            this.list.appendTo(this.listbox),
            this.close());
        },
        _buildList: function () {
          var b,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q = this.options,
            r = this.placeholder,
            s = !0,
            t = "false",
            u = "data-" + this._ns(),
            v = u + "option-index",
            w = u + "icon",
            x = u + "role",
            y = u + "placeholder",
            z = c.createDocumentFragment(),
            A = !1;
          for (
            this.list.empty().filter(".ui-listview").listview("destroy"),
              b = this._selectOptions(),
              d = b.length,
              e = this.element[0],
              g = 0;
            d > g;
            g++, A = !1
          )
            (h = b[g]),
              (i = a(h)),
              i.hasClass("ui-screen-hidden") ||
                ((j = h.parentNode),
                (m = []),
                (k = i.text()),
                (l = c.createElement("a")),
                l.setAttribute("href", "#"),
                l.appendChild(c.createTextNode(k)),
                j !== e &&
                  "optgroup" === j.nodeName.toLowerCase() &&
                  ((n = j.getAttribute("label")),
                  n !== f &&
                    ((o = c.createElement("li")),
                    o.setAttribute(x, "list-divider"),
                    o.setAttribute("role", "option"),
                    o.setAttribute("tabindex", "-1"),
                    o.appendChild(c.createTextNode(n)),
                    z.appendChild(o),
                    (f = n))),
                !s ||
                  (h.getAttribute("value") &&
                    0 !== k.length &&
                    !i.data(a.camelCase(this._ns() + "placeholder"))) ||
                  ((s = !1),
                  (A = !0),
                  null === h.getAttribute(y) &&
                    (this._removePlaceholderAttr = !0),
                  h.setAttribute(y, !0),
                  q.hidePlaceholderMenuItems && m.push("ui-screen-hidden"),
                  r !== k && (r = this.placeholder = k)),
                (p = c.createElement("li")),
                h.disabled &&
                  (m.push("ui-state-disabled"),
                  p.setAttribute("aria-disabled", !0)),
                p.setAttribute(v, g),
                p.setAttribute(w, t),
                A && p.setAttribute(y, !0),
                (p.className = m.join(" ")),
                p.setAttribute("role", "option"),
                l.setAttribute("tabindex", "-1"),
                this.isMultiple &&
                  this._addClass(
                    a(l),
                    null,
                    "ui-button ui-checkbox-off ui-icon-end"
                  ),
                p.appendChild(l),
                z.appendChild(p));
          this.list[0].appendChild(z),
            this.isMultiple || r.length
              ? this.headerTitle.text(this.placeholder)
              : this._addClass(this.header, null, "ui-screen-hidden"),
            this.list.listview();
        },
        _button: function () {
          var b = {
            href: "#",
            role: "button",
            id: this.buttonId,
            "aria-haspopup": "true",
            "aria-owns": this.menuId,
          };
          return (
            (b["data-" + this._ns() + "transition"] = "pop"),
            this._origTabIndex && (b.tabindex = this._origTabIndex),
            this.options.nativeMenu ? this._super() : a("<a>", b)
          );
        },
        _destroy: function () {
          this.options.nativeMenu ||
            (this.close(),
            this._origTabIndex !== d &&
              (this._origTabIndex !== !1
                ? this.element.attr("tabindex", this._origTabIndex)
                : this.element.removeAttr("tabindex")),
            this._removePlaceholderAttr &&
              this._selectOptions().removeAttr(
                "data-" + this._ns() + "placeholder"
              ),
            this.listbox.remove(),
            this.menuPage.remove()),
            this._super();
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/forms/select.custom.backcompat", [
            "jquery",
            "./select.custom",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.mobileBackcompat !== !1 &&
          a.widget("mobile.selectmenu", a.mobile.selectmenu, {
            _ns: function () {
              return a.mobile.ns || "";
            },
          }),
        a.mobile.selectmenu
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/controlgroup", [
            "jquery",
            "jquery-ui/widget",
            "./widget.theme",
            "jquery-ui/widgets/controlgroup",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget("ui.controlgroup", a.ui.controlgroup, {
          options: { theme: "inherit" },
          _create: function () {
            this._super(),
              this._on(this.document, {
                pagecontainershow: function (b, c) {
                  a.contains(c.toPage[0], this.element[0]) && this.refresh();
                },
              });
          },
          container: function () {
            return this.element;
          },
          _themeElements: function () {
            return [{ element: this.widget(), prefix: "ui-group-theme-" }];
          },
        }),
        a.widget("ui.controlgroup", a.ui.controlgroup, a.mobile.widget.theme),
        a.ui.controlgroup
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/controlgroup.backcompat", [
            "jquery",
            "jquery-ui/widget",
            "./widget.theme",
            "jquery-ui/widgets/controlgroup",
            "./controlgroup",
            "./widget.backcompat",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget("ui.controlgroup", a.ui.controlgroup, {
          options: {
            shadow: !1,
            direction: "vertical",
            type: "vertical",
            mini: !1,
          },
          _create: function () {
            this.options.direction !==
            a.ui.controlgroup.prototype.options.direction
              ? (this.options.type = this.options.direction)
              : this.options.type !==
                  a.ui.controlgroup.prototype.options.type &&
                this._setOption("direction", this.options.type),
              this._super();
          },
          classProp: "ui-controlgroup",
          _setOption: function (a, b) {
            "direction" === a && (this.options.type = b),
              "type" === a && this._setOption("direction", b),
              this._superApply(arguments);
          },
        }),
        a.widget(
          "ui.controlgroup",
          a.ui.controlgroup,
          a.mobile.widget.backcompat
        ),
        a.ui.controlgroup
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/controlgroup.selectmenu", [
            "jquery",
            "./controlgroup",
          ], b)
        : b(a);
    })(function (a) {
      var b = /ui-button-inline/g,
        c = /ui-shadow/g;
      return a.widget("ui.controlgroup", a.ui.controlgroup, {
        _selectmenuOptions: function (a) {
          var b = "vertical" === this.options.direction,
            c = b ? "" : "ui-button-inline";
          return {
            classes: {
              middle: { "ui-selectmenu": c, "ui-selectmenu-button": "" },
              first: {
                "ui-selectmenu": c,
                "ui-selectmenu-button": "ui-corner-" + (b ? "top" : "left"),
              },
              last: {
                "ui-selectmenu": c,
                "ui-selectmenu-button": "ui-corner-" + (b ? "bottom" : "right"),
              },
              only: {
                "ui-selectmenu": c,
                "ui-selectmenu-button": "ui-corner-all",
              },
            }[a],
          };
        },
        _initWidgets: function () {
          this._superApply(arguments),
            (this.childWidgets = this.childWidgets.map(function () {
              var d = a.data(this, "mobile-selectmenu");
              return d
                ? (a.data(
                    this.parentNode,
                    "ui-controlgroup-data",
                    a.data(this, "ui-controlgroup-data")
                  ),
                  a.removeData(this, "ui-controlgroup-data"),
                  d.option(
                    "classes.ui-selectmenu",
                    d.option("classes.ui-selectmenu").replace(b, "").trim()
                  ),
                  d.option(
                    "classes.ui-selectmenu-button",
                    d
                      .option("classes.ui-selectmenu-button")
                      .replace(c, "")
                      .trim()
                  ),
                  this.parentNode)
                : this;
            }));
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/fixedToolbar", [
            "jquery",
            "../widget",
            "../core",
            "../animationComplete",
            "../navigation",
            "./page",
            "./toolbar",
            "../zoom",
          ], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.toolbar", a.mobile.toolbar, {
        options: {
          position: null,
          visibleOnPageShow: !0,
          disablePageZoom: !0,
          transition: "slide",
          fullscreen: !1,
          updatePagePadding: !0,
        },
        _create: function () {
          this._super(),
            "fixed" === this.options.position &&
              ((this.pagecontainer = this.element.closest(
                ".ui-mobile-viewport"
              )),
              this._makeFixed());
        },
        _makeFixed: function () {
          this._addClass("ui-toolbar-" + this.role + "-fixed"),
            this.updatePagePadding(),
            this._addTransitionClass(),
            this._bindPageEvents();
        },
        _setOptions: function (b) {
          if (
            ("fixed" === b.position &&
              "fixed" !== this.options.position &&
              this._makeFixed(),
            "fixed" === this.options.position)
          ) {
            var c = a(".ui-page-active"),
              e = this.page ? this.page : c.length ? c : a(".ui-page").eq(0);
            b.fullscreen !== d &&
              (b.fullscreen
                ? (this._addClass("ui-toolbar-" + this.role + "-fullscreen"),
                  this._addClass(
                    e,
                    "ui-toolbar-page-" + this.role + "-fullscreen"
                  ))
                : (this._removeClass("ui-toolbar-" + this.role + "-fullscreen"),
                  this._removeClass(
                    e,
                    "ui-toolbar-page-" + this.role + "-fullscreen"
                  ),
                  this._addClass(
                    e,
                    "ui-toolbar-page-" + this.role + "-fixed"
                  )));
          }
          this._super(b);
        },
        _addTransitionClass: function () {
          var a = this.options.transition;
          a &&
            "none" !== a &&
            ("slide" === a &&
              (a = "header" === this.role ? "slidedown" : "slideup"),
            this._addClass(null, a));
        },
        _bindPageEvents: function () {
          var a = this.page ? this.element.closest(".ui-page") : this.document;
          this._on(a, {
            pagebeforeshow: "_handlePageBeforeShow",
            webkitAnimationStart: "_handleAnimationStart",
            animationstart: "_handleAnimationStart",
            updatelayout: "_handleAnimationStart",
            pageshow: "_handlePageShow",
            pagebeforehide: "_handlePageBeforeHide",
          });
        },
        _handlePageBeforeShow: function () {
          var b = this.options;
          b.disablePageZoom && a.mobile.zoom.disable(!0),
            b.visibleOnPageShow || this.hide(!0);
        },
        _handleAnimationStart: function () {
          this.options.updatePagePadding &&
            this.updatePagePadding(this.page ? this.page : ".ui-page-active");
        },
        _handlePageShow: function () {
          this.updatePagePadding(this.page ? this.page : ".ui-page-active"),
            this.options.updatePagePadding &&
              this._on(this.window, { throttledresize: "updatePagePadding" });
        },
        _handlePageBeforeHide: function () {
          this.options.disablePageZoom && a.mobile.zoom.enable(!0),
            this.options.updatePagePadding &&
              this._off(this.window, "throttledresize");
        },
        _visible: !0,
        updatePagePadding: function (b) {
          var c = this.element,
            e = "header" === this.role,
            f = parseFloat(c.css(e ? "top" : "bottom"));
          this.options.fullscreen ||
            ((b =
              (b && b.type === d && b) || this.page || c.closest(".ui-page")),
            (b = this.page ? this.page : ".ui-page-active"),
            a(b).css("padding-" + (e ? "top" : "bottom"), c.outerHeight() + f));
        },
        _useTransition: function (c) {
          var d = this.window,
            e = this.element,
            f = d.scrollTop(),
            g = e.height(),
            h = this.page
              ? e.closest(".ui-page").height()
              : a(".ui-page-active").height(),
            i = a(b).height();
          return (
            !c &&
            ((this.options.transition &&
              "none" !== this.options.transition &&
              (("header" === this.role && !this.options.fullscreen && f > g) ||
                ("footer" === this.role &&
                  !this.options.fullscreen &&
                  h - g > f + i))) ||
              this.options.fullscreen)
          );
        },
        show: function (b) {
          this._useTransition(b)
            ? ((this._animationInProgress = "show"),
              this._removeClass(null, "out"),
              this._removeClass("ui-toolbar-fixed-hidden"),
              this._addClass(null, "in"),
              this.element.animationComplete(
                a.proxy(function () {
                  "show" === this._animationInProgress &&
                    ((this._animationInProgress = !1),
                    this._removeClass(null, "in"));
                }, this)
              ))
            : this._removeClass("ui-toolbar-fixed-hidden"),
            (this._visible = !0);
        },
        hide: function (b) {
          var c = "slide" === this.options.transition ? " reverse" : "";
          this._useTransition(b)
            ? ((this._animationInProgress = "hide"),
              this._addClass(null, "out"),
              this._addClass(null, c),
              this._removeClass(null, "in"),
              this.element.animationComplete(
                a.proxy(function () {
                  "hide" === this._animationInProgress &&
                    ((this._animationInProgress = !1),
                    this._addClass("ui-toolbar-fixed-hidden"),
                    this._removeClass(null, "out"),
                    this._removeClass(null, c));
                }, this)
              ))
            : this._addClass("ui-toolbar-fixed-hidden")._removeClass(null, c),
            (this._visible = !1);
        },
        toggle: function () {
          this[this._visible ? "hide" : "show"]();
        },
        _setRelative: function () {
          "fixed" !== this.options.position && this._super();
        },
        _destroy: function () {
          var b,
            c,
            d,
            e,
            f,
            g = this.pagecontainer.pagecontainer("getActivePage");
          this._super(),
            "fixed" === this.options.position &&
              ((d =
                a("body>.ui-" + this.role + "-fixed")
                  .add(g.find(".ui-" + this.role + "-fixed"))
                  .not(this.element).length > 0),
              (f =
                a("body>.ui-" + this.role + "-fixed")
                  .add(g.find(".ui-" + this.role + "-fullscreen"))
                  .not(this.element).length > 0),
              (c =
                "ui-header-fixed ui-footer-fixed ui-header-fullscreen in out ui-footer-fullscreen fade slidedown slideup ui-fixed-hidden"),
              this._removeClass(c),
              f || (b = "ui-page-" + this.role + "-fullscreen"),
              d ||
                ((e = "header" === this.role),
                (b += " ui-page-" + this.role + "-fixed"),
                g.css("padding-" + (e ? "top" : "bottom"), "")),
              this._removeClass(g, b));
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/fixedToolbar.backcompat", [
            "jquery",
            "./fixedToolbar",
          ], b)
        : b(a);
    })(function (a) {
      return a.mobileBackcompat !== !1
        ? a.widget("mobile.toolbar", a.mobile.toolbar, {
            options: {
              hideDuringFocus: "input, textarea, select",
              tapToggle: !0,
              supportBlacklist: function () {
                return a.noop;
              },
            },
            _hideDuringFocusData: { delayShow: 0, delayHide: 0, isVisible: !0 },
            _handlePageFocusinFocusout: function (b) {
              var c = this._hideDuringFocusData;
              this.options.hideDuringFocus &&
                screen.width < 1025 &&
                a(b.target).is(this.options.hideDuringFocus) &&
                !a(b.target).closest(
                  ".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed"
                ).length &&
                ("focusout" !== b.type || c.isVisible
                  ? "focusin" === b.type &&
                    c.isVisible &&
                    (clearTimeout(c.delayShow),
                    (c.isVisible = !1),
                    (c.delayHide = this._delay("hide", 0)))
                  : ((c.isVisible = !0),
                    clearTimeout(c.delayHide),
                    (c.delayShow = this._delay("show", 0))));
            },
            _attachToggleHandlersToPage: function (a) {
              return (
                this._on(a, {
                  focusin: "_handlePageFocusinFocusout",
                  focusout: "_handlePageFocusinFocusout",
                }),
                this._superApply(arguments)
              );
            },
            _makeFixed: function () {
              this._super(), this._workarounds();
            },
            _workarounds: function () {
              var a = navigator.userAgent,
                b = a.match(/AppleWebKit\/([0-9]+)/),
                c = !!b && b[1],
                d = null,
                e = this;
              a.indexOf("Android") > -1 &&
                ((d = "android"),
                "android" === d &&
                  c &&
                  534 > c &&
                  (e._bindScrollWorkaround(), e._bindListThumbWorkaround()));
            },
            _viewportOffset: function () {
              var a = this.element,
                b = a.hasClass("ui-toolbar-header"),
                c = Math.abs(a.offset().top - this.window.scrollTop());
              return (
                b ||
                  (c =
                    Math.round(c - this.window.height() + a.outerHeight()) -
                    60),
                c
              );
            },
            _bindScrollWorkaround: function () {
              var a = this;
              this._on(this.window, {
                scrollstop: function () {
                  var b = a._viewportOffset();
                  b > 2 && a._visible && a._triggerRedraw();
                },
              });
            },
            _bindListThumbWorkaround: function () {
              var b = a(".ui-page-active"),
                c = this.page ? this.page : b.length ? b : a(".ui-page").eq(0);
              this._addClass(c, "ui-toolbar-android-2x-fix");
            },
            _triggerRedraw: function () {
              var b = parseFloat(a(".ui-page-active").css("padding-bottom"));
              a(".ui-page-active").css("padding-bottom", b + 1 + "px"),
                setTimeout(function () {
                  a(".ui-page-active").css("padding-bottom", b + "px");
                }, 0);
            },
            destroy: function () {
              this._super();
              var b = a(".ui-page-active"),
                c = this.page ? this.page : b.length ? b : a(".ui-page").eq(0);
              this._removeClass(c, "ui-toolbar-android-2x-fix");
            },
          })
        : void 0;
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/popup.backcompat", [
            "jquery",
            "./widget.backcompat",
            "./popup",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.mobileBackcompat !== !1 &&
          (a.widget("mobile.popup", a.mobile.popup, {
            options: {
              wrapperClass: null,
              closeLinkSelector: "a:jqmData(rel='back')",
              shadow: !0,
              corners: !0,
            },
            classProp: "ui-popup",
          }),
          a.widget("mobile.popup", a.mobile.popup, a.mobile.widget.backcompat),
          (a.mobile.popup.prototype._boolOptions.shadow = "ui-overlay-shadow")),
        a.mobile.popup
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/popup.arrow", ["jquery", "./popup"], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.popup", a.mobile.popup, {
        options: {
          classes: { "ui-popup-arrow": "ui-overlay-shadow" },
          arrow: "",
        },
        _create: function () {
          var a,
            b = this._superApply(arguments);
          return (
            this.options.arrow &&
              (this.options.enhanced
                ? ((a = {
                    gd: this.element.children(".ui-popup-arrow-guide"),
                    ct: this.element.children(".ui-popup-arrow-container"),
                  }),
                  (a.ar = a.ct.children(".ui-popup-arrow")),
                  (a.arEls = a.ct.add(a.gd)),
                  this._addArrowClasses(a))
                : (a = this._addArrow()),
              (this._ui.arrow = a)),
            b
          );
        },
        _addArrowClasses: function (b) {
          this._addClass(b.gd, "ui-popup-arrow-guide"),
            this._addClass(
              b.ct,
              "ui-popup-arrow-container",
              a.mobile.browser.oldIE && a.mobile.browser.oldIE <= 8 ? "ie" : ""
            ),
            this._addClass(b.ar, "ui-popup-arrow", "ui-body-inherit");
        },
        _addArrow: function () {
          var b = this.document[0].createElement("div"),
            c = this.document[0].createElement("div"),
            d = this.document[0].createElement("div"),
            e = { arEls: a([b, d]), gd: a(d), ct: a(b), ar: a(c) };
          return (
            b.appendChild(c),
            this._addArrowClasses(e),
            e.arEls.hide().appendTo(this.element),
            e
          );
        },
        _unenhance: function () {
          var a = this._ui.arrow;
          return a && a.arEls.remove(), this._super();
        },
        _tryAnArrow: function (a, b, c, d, e) {
          var f,
            g,
            h,
            i = {},
            j = {};
          return d.arFull[a.dimKey] > d.guideDims[a.dimKey]
            ? e
            : ((i[a.fst] =
                c[a.fst] +
                (d.arHalf[a.oDimKey] + d.menuHalf[a.oDimKey]) * a.offsetFactor -
                d.contentBox[a.fst] +
                (d.clampInfo.menuSize[a.oDimKey] - d.contentBox[a.oDimKey]) *
                  a.arrowOffsetFactor),
              (i[a.snd] = c[a.snd]),
              (f = d.result || this._calculateFinalLocation(i, d.clampInfo)),
              (g = { x: f.left, y: f.top }),
              (j[a.fst] = g[a.fst] + d.contentBox[a.fst] + a.tipOffset),
              (j[a.snd] = Math.max(
                f[a.prop] + d.guideOffset[a.prop] + d.arHalf[a.dimKey],
                Math.min(
                  f[a.prop] +
                    d.guideOffset[a.prop] +
                    d.guideDims[a.dimKey] -
                    d.arHalf[a.dimKey],
                  c[a.snd]
                )
              )),
              (h = Math.abs(c.x - j.x) + Math.abs(c.y - j.y)),
              (!e || h < e.diff) &&
                ((j[a.snd] -=
                  d.arHalf[a.dimKey] + f[a.prop] + d.contentBox[a.snd]),
                (e = {
                  dir: b,
                  diff: h,
                  result: f,
                  posProp: a.prop,
                  posVal: j[a.snd],
                })),
              e);
        },
        _getPlacementState: function (a) {
          var b,
            c,
            d = this._ui.arrow,
            e = {
              clampInfo: this._clampPopupWidth(!a),
              arFull: { cx: d.ct.width(), cy: d.ct.height() },
              guideDims: { cx: d.gd.width(), cy: d.gd.height() },
              guideOffset: d.gd.offset(),
            };
          return (
            (b = this.element.offset()),
            d.gd.css({ left: 0, top: 0, right: 0, bottom: 0 }),
            (c = d.gd.offset()),
            (e.contentBox = {
              x: c.left - b.left,
              y: c.top - b.top,
              cx: d.gd.width(),
              cy: d.gd.height(),
            }),
            d.gd.removeAttr("style"),
            (e.guideOffset = {
              left: e.guideOffset.left - b.left,
              top: e.guideOffset.top - b.top,
            }),
            (e.arHalf = { cx: e.arFull.cx / 2, cy: e.arFull.cy / 2 }),
            (e.menuHalf = {
              cx: e.clampInfo.menuSize.cx / 2,
              cy: e.clampInfo.menuSize.cy / 2,
            }),
            e
          );
        },
        _placementCoords: function (b) {
          var c,
            d,
            e,
            f = this.options.arrow,
            g = this._ui.arrow;
          return g
            ? (g.arEls.show(),
              (c = this._getPlacementState(!0)),
              (e = {
                l: {
                  fst: "x",
                  snd: "y",
                  prop: "top",
                  dimKey: "cy",
                  oDimKey: "cx",
                  offsetFactor: 1,
                  tipOffset: -c.arHalf.cx,
                  arrowOffsetFactor: 0,
                },
                r: {
                  fst: "x",
                  snd: "y",
                  prop: "top",
                  dimKey: "cy",
                  oDimKey: "cx",
                  offsetFactor: -1,
                  tipOffset: c.arHalf.cx + c.contentBox.cx,
                  arrowOffsetFactor: 1,
                },
                b: {
                  fst: "y",
                  snd: "x",
                  prop: "left",
                  dimKey: "cx",
                  oDimKey: "cy",
                  offsetFactor: -1,
                  tipOffset: c.arHalf.cy + c.contentBox.cy,
                  arrowOffsetFactor: 1,
                },
                t: {
                  fst: "y",
                  snd: "x",
                  prop: "left",
                  dimKey: "cx",
                  oDimKey: "cy",
                  offsetFactor: 1,
                  tipOffset: -c.arHalf.cy,
                  arrowOffsetFactor: 0,
                },
              }),
              a.each(
                (f === !0 ? "l,t,r,b" : f).split(","),
                a.proxy(function (a, f) {
                  d = this._tryAnArrow(e[f], f, b, c, d);
                }, this)
              ),
              d
                ? (this._removeClass(
                    g.ct,
                    "ui-popup-arrow-l ui-popup-arrow-t ui-popup-arrow-r ui-popup-arrow-b"
                  )._addClass(g.ct, "ui-popup-arrow-" + d.dir),
                  g.ct.removeAttr("style").css(d.posProp, d.posVal).show(),
                  d.result)
                : (g.arEls.hide(), this._super(b)))
            : this._super(b);
        },
        _setOptions: function (a) {
          var b = this._ui.arrow,
            c = this._super(a);
          if (a.arrow !== d) {
            if (!b && a.arrow) return void (this._ui.arrow = this._addArrow());
            b && !a.arrow && (b.arEls.remove(), delete this._ui.arrow);
          }
          return c;
        },
        _destroy: function () {
          var a = this._ui.arrow;
          return a && a.arEls.remove(), this._super();
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/popup.arrow.backcompat", [
            "jquery",
            "./popup.backcompat",
            "./popup.arrow",
          ], b)
        : b(a);
    })(function (a) {
      var b = /\bui-overlay-shadow\b/;
      return (
        a.mobileBackcompat !== !1 &&
          a.widget("mobile.popup", a.mobile.popup, {
            _setInitialOptions: function () {
              var b = this.options.classes;
              this._super(),
                b["ui-popup-arrow"] ===
                  a[this.namespace][this.widgetName].prototype.options.classes[
                    "ui-popup-arrow"
                  ] &&
                  (b["ui-popup-arrow"] = this._getClassValue(
                    b["ui-popup-arrow"],
                    "ui-overlay-shadow",
                    this.options.shadow
                  ));
            },
            _setOption: function (a, c) {
              var d;
              return (
                "classes" === a &&
                  ((d = c["ui-popup"].match(b)),
                  c["ui-popup-arrow"].match(b) !== d &&
                    (c["ui-popup-arrow"] = this._getClassValue(
                      c["ui-popup-arrow"],
                      "ui-overlay-shadow",
                      d
                    ))),
                this._superApply(arguments)
              );
            },
          }),
        a.mobile.popup
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/panel", ["jquery", "../widget", "./page"], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.panel", {
        version: "@VERSION",
        options: {
          classes: {},
          animate: !0,
          theme: null,
          position: "left",
          dismissible: !0,
          display: "reveal",
          swipeClose: !0,
          positionFixed: !1,
        },
        _closeLink: null,
        _parentPage: null,
        _page: null,
        _modal: null,
        _panelInner: null,
        _wrapper: null,
        _fixedToolbars: null,
        _create: function () {
          var b = this.element,
            c = b.closest(".ui-page, :jqmData(role='page')");
          a.extend(this, {
            _closeLink: b.find(":jqmData(rel='close')"),
            _parentPage: c.length > 0 ? c : !1,
            _openedPage: null,
            _page: this._getPage,
            _panelInner: this._getPanelInner(),
            _fixedToolbars: this._getFixedToolbars,
          }),
            "overlay" !== this.options.display && this._getWrapper(),
            this._addClass("ui-panel ui-panel-closed", this._getPanelClasses()),
            a.support.cssTransform3d &&
              this.options.animate &&
              this._addClass("ui-panel-animate"),
            this._bindUpdateLayout(),
            this._bindCloseEvents(),
            this._bindLinkListeners(),
            this._bindPageEvents(),
            this.options.dismissible && this._createModal(),
            this._bindSwipeEvents(),
            this._superApply(arguments);
        },
        _safelyWrap: function (b, c, d) {
          return d.length
            ? (d.eq(0).before(c), c.append(d), d.parent())
            : a(c).appendTo(b);
        },
        _getPanelInner: function () {
          var b = this.element.find(".ui-panel-inner");
          return (
            0 === b.length &&
              ((b = a("<div>")),
              this._addClass(b, "ui-panel-inner"),
              (b = this._safelyWrap(this.element, b, this.element.children()))),
            b
          );
        },
        _createModal: function () {
          var b = this,
            c = b._parentPage ? b._parentPage.parent() : b.element.parent();
          (b._modal = a("<div>")),
            b._addClass(b._modal, "ui-panel-dismiss"),
            b._modal
              .on("mousedown", function () {
                b.close();
              })
              .appendTo(c);
        },
        _getPage: function () {
          var b = this._openedPage || this._parentPage || a(".ui-page-active");
          return b;
        },
        _getWrapper: function () {
          var b,
            c = this._page().find(".ui-panel-wrapper");
          0 === c.length &&
            ((b = this._page()),
            (c = a("<div>")),
            this._addClass(c, "ui-panel-wrapper"),
            (c = this._safelyWrap(
              b,
              c,
              this._page().children(
                ".ui-toolbar-header:not(.ui-toolbar-header-fixed), [data-" +
                  a.mobile.ns +
                  "role='toolbar'],.ui-content:not(.ui-popup),.ui-toolbar-footer:not(.ui-toolbar-footer-fixed)"
              )
            ))),
            (this._wrapper = c);
        },
        _getFixedToolbars: function () {
          var b = a("body").children(
              ".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed"
            ),
            c = this._page().find(
              ".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed"
            ),
            d = b.add(c);
          return this._addClass(d, "ui-panel-fixed-toolbar"), d;
        },
        _getPosDisplayClasses: function (a) {
          return (
            a +
            "-position-" +
            this.options.position +
            " " +
            a +
            "-display-" +
            this.options.display
          );
        },
        _getPanelClasses: function () {
          var a =
            this._getPosDisplayClasses("ui-panel") +
            " ui-body-" +
            (this.options.theme ? this.options.theme : "inherit");
          return this.options.positionFixed && (a += " ui-panel-fixed"), a;
        },
        _handleCloseClick: function (a) {
          a.isDefaultPrevented() || this.close();
        },
        _bindCloseEvents: function () {
          this._on(this._closeLink, { click: "_handleCloseClick" }),
            this._on({ "click a:jqmData(ajax='false')": "_handleCloseClick" });
        },
        _positionPanel: function (b) {
          var c,
            d,
            e = this,
            f = e._panelInner.outerHeight(),
            g = f > this.window.height();
          g || !e.options.positionFixed
            ? (g
                ? (e._unfixPanel(), a.mobile.resetActivePageHeight(f))
                : this._parentPage ||
                  ((c = this.element.outerHeight(!0)),
                  c < this.document.height() &&
                    ((d = this.element.outerHeight()),
                    this.element.outerHeight(
                      this.document.height() - (c - d)
                    ))),
              b !== !0 ||
                a.mobile.isElementCurrentlyVisible(".ui-content") ||
                this.window[0].scrollTo(0, a.mobile.defaultHomeScroll))
            : e._fixPanel();
        },
        _bindFixListener: function () {
          this._on(this.window, { throttledresize: "_positionPanel" });
        },
        _unbindFixListener: function () {
          this._off(this.window, "throttledresize");
        },
        _unfixPanel: function () {
          this.options.positionFixed &&
            a.support.fixedPosition &&
            this._removeClass("ui-panel-fixed");
        },
        _fixPanel: function () {
          this.options.positionFixed &&
            a.support.fixedPosition &&
            this._addClass("ui-panel-fixed");
        },
        _bindUpdateLayout: function () {
          var a = this;
          a.element.on("updatelayout", function () {
            a._open && a._positionPanel();
          });
        },
        _bindLinkListeners: function () {
          this._on("body", { "click a": "_handleClick" });
        },
        _handleClick: function (b) {
          var c,
            e = this.element.attr("id"),
            f = this;
          b.currentTarget.href.split("#")[1] === e &&
            e !== d &&
            (b.preventDefault(),
            (c = a(b.target)),
            c.hasClass("ui-button") &&
              (this._addClass(c, null, "ui-button-active"),
              this.element.one("panelopen panelclose", function () {
                f._removeClass(c, null, "ui-button-active");
              })),
            this.toggle());
        },
        _handleSwipe: function (a) {
          a.isDefaultPrevented() || this.close();
        },
        _bindSwipeEvents: function () {
          var a = {};
          this.options.swipeClose &&
            ((a["swipe" + this.options.position] = "_handleSwipe"),
            this._on(
              this._modal ? this.element.add(this._modal) : this.element,
              a
            ));
        },
        _bindPageEvents: function () {
          var a = this;
          this.document
            .on("panelbeforeopen", function (b) {
              a._open && b.target !== a.element[0] && a.close();
            })
            .on("keyup.panel", function (b) {
              27 === b.keyCode && a._open && a.close();
            }),
            this._parentPage ||
              "overlay" === this.options.display ||
              this._on(this.document, {
                pageshow: function () {
                  (this._openedPage = null), this._getWrapper();
                },
              }),
            a._parentPage
              ? this.document.on(
                  "pagehide",
                  ":jqmData(role='page')",
                  function () {
                    a._open && a.close(!0);
                  }
                )
              : this.document.on("pagebeforehide", function () {
                  a._open && a.close(!0);
                });
        },
        _open: !1,
        _pageContentOpenClasses: null,
        _modalOpenClasses: null,
        open: function (b) {
          if (!this._open) {
            var c = this,
              d = c.options,
              e = function () {
                c._open &&
                  ("overlay" !== d.display &&
                    (c._addClass(c._wrapper, "ui-panel-page-content-open"),
                    c._addClass(
                      c._fixedToolbars(),
                      "ui-panel-page-content-open"
                    )),
                  c._bindFixListener(),
                  c._trigger("open"),
                  (c._openedPage = c._page()));
              },
              f = function () {
                c._off(c.document, "panelclose"),
                  c._page().jqmData("panel", "open"),
                  a.support.cssTransform3d &&
                    d.animate &&
                    "overlay" !== d.display &&
                    (c._addClass(c._wrapper, "ui-panel-animate"),
                    c._addClass(c._fixedToolbars(), "ui-panel-animate")),
                  !b && a.support.cssTransform3d && d.animate
                    ? (c._wrapper || c.element).animationComplete(
                        e,
                        "transition"
                      )
                    : setTimeout(e, 0),
                  d.theme &&
                    "overlay" !== d.display &&
                    c._addClass(
                      c._page().parent(),
                      "ui-panel-page-container-themed ui-panel-page-container-" +
                        d.theme
                    ),
                  c._removeClass("ui-panel-closed")._addClass("ui-panel-open"),
                  c._positionPanel(!0),
                  (c._pageContentOpenClasses = c._getPosDisplayClasses(
                    "ui-panel-page-content"
                  )),
                  "overlay" !== d.display &&
                    (c._addClass(c._page().parent(), "ui-panel-page-container"),
                    c._addClass(c._wrapper, c._pageContentOpenClasses),
                    c._addClass(c._fixedToolbars(), c._pageContentOpenClasses)),
                  (c._modalOpenClasses =
                    c._getPosDisplayClasses("ui-panel-dismiss") +
                    " ui-panel-dismiss-open"),
                  c._modal &&
                    (c._addClass(c._modal, c._modalOpenClasses),
                    c._modal.height(
                      Math.max(c._modal.height(), c.document.height())
                    ));
              };
            c._trigger("beforeopen"),
              "open" === c._page().jqmData("panel")
                ? c._on(c.document, { panelclose: f })
                : f(),
              (c._open = !0);
          }
        },
        close: function (b) {
          if (this._open) {
            var c = this,
              d = c._page(),
              e = this.options,
              f = function () {
                e.theme &&
                  "overlay" !== e.display &&
                  c._removeClass(
                    d.parent(),
                    "ui-panel-page-container-themed ui-panel-page-container-" +
                      e.theme
                  ),
                  c._addClass("ui-panel-closed"),
                  c._positionPanel(!0),
                  "overlay" !== e.display &&
                    (c._removeClass(d.parent(), "ui-panel-page-container"),
                    c._removeClass(c._wrapper, "ui-panel-page-content-open"),
                    c._removeClass(
                      c._fixedToolbars(),
                      "ui-panel-page-content-open"
                    )),
                  a.support.cssTransform3d &&
                    e.animate &&
                    "overlay" !== e.display &&
                    (c._removeClass(c._wrapper, "ui-panel-animate"),
                    c._removeClass(c._fixedToolbars(), "ui-panel-animate")),
                  c._fixPanel(),
                  c._unbindFixListener(),
                  a.mobile.resetActivePageHeight(),
                  d.jqmRemoveData("panel"),
                  c._trigger("close"),
                  (c._openedPage = null);
              },
              g = function () {
                c._removeClass("ui-panel-open"),
                  "overlay" !== e.display &&
                    (c._removeClass(c._wrapper, c._pageContentOpenClasses),
                    c._removeClass(
                      c._fixedToolbars(),
                      c._pageContentOpenClasses
                    )),
                  !b && a.support.cssTransform3d && e.animate
                    ? (c._wrapper || c.element).animationComplete(
                        f,
                        "transition"
                      )
                    : setTimeout(f, 0),
                  c._modal &&
                    (c._removeClass(c._modal, c._modalOpenClasses),
                    c._modal.height(""));
              };
            c._trigger("beforeclose"), g(), (c._open = !1);
          }
        },
        toggle: function () {
          this[this._open ? "close" : "open"]();
        },
        _destroy: function () {
          var b,
            c = this.options,
            d =
              a("body > :mobile-panel").length +
                a.mobile.activePage.find(":mobile-panel").length >
              1;
          "overlay" !== c.display &&
            ((b = a("body > :mobile-panel").add(
              a.mobile.activePage.find(":mobile-panel")
            )),
            0 === b.not(".ui-panel-display-overlay").not(this.element).length &&
              this._wrapper.children().unwrap(),
            this._open &&
              (this._removeClass(
                this._fixedToolbars(),
                "ui-panel-page-content-open"
              ),
              a.support.cssTransform3d &&
                c.animate &&
                this._removeClass(this._fixedToolbars(), "ui-panel-animate"),
              this._removeClass(
                this._page().parent(),
                "ui-panel-page-container"
              ),
              c.theme &&
                this._removeClass(
                  this._page().parent(),
                  "ui-panel-page-container-themed ui-panel-page-container-" +
                    c.theme
                ))),
            d || this.document.off("panelopen panelclose"),
            this._open && this._page().jqmRemoveData("panel"),
            this._panelInner.children().unwrap(),
            this._removeClass(
              "ui-panel ui-panel-closed ui-panel-open ui-panel-animate",
              this._getPanelClasses()
            ),
            this.element.off(
              "panelbeforeopen panelhide keyup.panel updatelayout"
            ),
            this._modal && this._modal.remove(),
            this._superApply(arguments);
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/table", ["jquery", "../widget", "./page"], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.table", {
        version: "@VERSION",
        options: { classes: { "ui-table": "" }, enhanced: !1 },
        headers: null,
        allHeaders: null,
        _create: function () {
          var a = this.options;
          a.enhanced ||
            this._addClass("ui-table", a.disabled ? " ui-state-disabled" : ""),
            this.refresh();
        },
        _setOptions: function (a) {
          return (
            a.disabled !== d &&
              this._toggleClass(null, "ui-state-disabled", a.disabled),
            this._super(a)
          );
        },
        _setHeaders: function () {
          (this.headerRows = this.element.children("thead").children("tr")),
            (this.headers = this.headerRows.first().children()),
            (this.allHeaders = this.headerRows.children()),
            (this.allRowsExceptFirst = this.element
              .children("thead,tbody")
              .children("tr")
              .not(this.headerRows.eq(0)));
        },
        rebuild: function () {
          this.refresh();
        },
        _refreshHeaderCell: function (b, c, d) {
          var e,
            f = parseInt(c.getAttribute("colspan"), 10),
            g = ":nth-child(" + (d + 1) + ")";
          if (f)
            for (e = 0; f - 1 > e; e++)
              d++, (g += ", :nth-child(" + (d + 1) + ")");
          return (
            a(c).jqmData("cells", this.allRowsExceptFirst.not(c).children(g)), d
          );
        },
        _refreshHeaderRow: function (b, c) {
          var d = 0;
          a(c)
            .children()
            .each(
              a.proxy(function (a, b) {
                d = this._refreshHeaderCell(a, b, d) + 1;
              }, this)
            );
        },
        refresh: function () {
          this._setHeaders(),
            this.headerRows.each(a.proxy(this, "_refreshHeaderRow"));
        },
        _destroy: function () {
          var b = this.element;
          b.find("thead tr")
            .children()
            .each(function () {
              a(this).jqmRemoveData("cells");
            });
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/table.columntoggle", ["jquery", "./table"], b)
        : b(a);
    })(function (a, b) {
      return a.widget("mobile.table", a.mobile.table, {
        options: {
          mode: "columntoggle",
          classes: {
            "ui-table-cell-hidden": "",
            "ui-table-cell-visible": "",
            "ui-table-priority-": "",
            "ui-table-columntoggle": "",
          },
        },
        _create: function () {
          (this._instantiating = !0),
            this._super(),
            "columntoggle" === this.options.mode &&
              (this.options.enhanced || this._enhanceColumnToggle(),
              (this._instantiating = !1));
        },
        _enhanceColumnToggle: function () {
          this._addClass("ui-table-columntoggle"),
            this._updateHeaderPriorities();
        },
        _updateVariableColumn: function (a, b, c) {
          this._addClass(b, "ui-table-priority-" + c);
        },
        _updateHeaderPriorities: function (b) {
          this.headers.each(
            a.proxy(function (c, d) {
              var e = a(d),
                f = a.mobile.getAttribute(d, "priority");
              f &&
                this._updateVariableColumn(e, e.add(e.jqmData("cells")), f, b);
            }, this)
          );
        },
        _setColumnVisibility: function (a, b) {
          var c = a.jqmData("cells");
          c &&
            ((c = c.add(a)),
            this._unlock(c),
            this._addClass(
              c,
              b ? "ui-table-cell-visible" : "ui-table-cell-hidden"
            ));
        },
        setColumnVisibility: function (b, c) {
          var d;
          "number" === a.type(b)
            ? (d = this.headers.eq(b))
            : b.length > 0 &&
              (this.headers.index(b[0]) >= 0
                ? (d = b.first())
                : this.headers.each(
                    a.proxy(function (c, e) {
                      var f = a(e),
                        g = f.jqmData("cells");
                      return (g ? g.index(b[0]) : -1) >= 0
                        ? ((d = f), !1)
                        : void 0;
                    }, this)
                  )),
            d && this._setColumnVisibility(d, c);
        },
        _unlock: function (a) {
          var b =
            a ||
            this.element
              .children("thead, tbody")
              .children("tr")
              .children(".ui-table-cell-hidden, .ui-table-cell-visible");
          this._removeClass(b, "ui-table-cell-hidden ui-table-cell-visible");
        },
        _recordLockedColumns: a.noop,
        _restoreLockedColumns: a.noop,
        refresh: function () {
          var a;
          this._super(),
            this._instantiating ||
              "columntoggle" !== this.options.mode ||
              ((a = this._recordLockedColumns()),
              this._unlock(),
              this._updateHeaderPriorities(),
              this._restoreLockedColumns(a));
        },
        _destroy: function () {
          return (
            "columntoggle" === this.options.mode &&
              (this.options.enhanced ||
                this.headers.each(
                  a.proxy(function (b, c) {
                    var d,
                      e = a.mobile.getAttribute(c, "priority");
                    e && ((d = a(c)), d.add(d.jqmData("cells")));
                  }, this)
                )),
            this._superApply(arguments)
          );
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/table.columntoggle.popup", [
            "jquery",
            "./table.columntoggle",
            "./popup",
            "./controlgroup",
            "./forms/button",
            "./widget.theme",
            "./forms/checkboxradio",
          ], b)
        : b(a);
    })(function (a, b) {
      return a.widget("mobile.table", a.mobile.table, {
        options: {
          columnButton: !0,
          columnButtonTheme: null,
          columnPopupTheme: null,
          columnButtonText: "Columns...",
          columnUi: !0,
          classes: {
            "ui-table-columntoggle-popup": "",
            "ui-table-columntoggle-btn": "ui-corner-all ui-shadow ui-mini",
          },
        },
        _create: function () {
          var b, c;
          (this.options.columnButtonTheme = this.options.columnButtonTheme
            ? this.options.columnButtonTheme
            : "inherit"),
            this._super(),
            "columntoggle" === this.options.mode &&
              this.options.columnUi &&
              this.options.enhanced &&
              ((b = this._id()),
              (c = a(this.document[0].getElementById(b + "-popup"))),
              (this._ui = {
                popup: c,
                menu: c.children().first(),
                button: a(this.document[0].getElementById(b + "-button")),
              }),
              this._updateHeaderPriorities({ keep: !0 }));
        },
        _updateVariableColumn: function (b, c, d, e) {
          var f;
          return (
            (this.options.columnUi || (e && e.turningOnUI)) &&
              ((f = e.keep
                ? e.inputs.eq(e.checkboxIndex++)
                : a(
                    "<label><input type='checkbox' checked />" +
                      (b.children("abbr").first().attr("title") || b.text()) +
                      "</label>"
                  )
                    .appendTo(e.container)
                    .children(0)
                    .checkboxradio({ theme: this.options.columnPopupTheme })),
              f.jqmData("header", b).jqmData("cells", c),
              b.jqmData("input", f)),
            e && e.turningOnUI ? this : this._superApply(arguments)
          );
        },
        _updateHeaderPriorities: function (b) {
          var c, d, e;
          return (
            (b = b || {}),
            this.options.columnUi || b.turningOnUI
              ? ((d = this._ui.menu.controlgroup("container")),
                b.keep ? (c = d.find("input")) : d.empty(),
                (e = this._super(
                  a.extend(b, { checkboxIndex: 0, container: d, inputs: c })
                )),
                b.keep || this._ui.menu.controlgroup("refresh"),
                this._setupEvents(),
                this._setToggleState())
              : (e = this._superApply(arguments)),
            e
          );
        },
        _id: function () {
          return this.element.attr("id") || this.widgetName + this.uuid;
        },
        _themeClassFromOption: function (a, b) {
          return b ? ("none" === b ? "" : a + b) : "";
        },
        _removeColumnUi: function (b) {
          var c = this._ui.menu.find("input");
          c.each(function () {
            var c = a(this),
              d = c.jqmData("header");
            b && c.jqmRemoveData("cells").jqmRemoveData("header"),
              d.jqmRemoveData("input");
          }),
            b ||
              (this._ui.menu.remove(),
              this._ui.popup.remove(),
              this._ui.button && this._ui.button.remove());
        },
        _setOptions: function (a) {
          var b = this.options.columnUi;
          return (
            "columntoggle" === this.options.mode &&
              (null != a.columnUi &&
                (this.options.columnUi && !a.columnUi
                  ? this._removeColumnUi(!1)
                  : !this.options.columnUi &&
                    a.columnUi &&
                    this._addColumnUI({
                      callback: this._updateHeaderPriorities,
                      callbackContext: this,
                      callbackArguments: [{ turningOnUI: !0 }],
                    }),
                (b = a.columnUi)),
              b &&
                (null != a.disabled &&
                  (this._ui.popup.popup("option", "disabled", a.disabled),
                  this._ui.button &&
                    (this._toggleClass(
                      this._ui.button,
                      "ui-state-disabled",
                      null,
                      a.disabled
                    ),
                    a.disabled
                      ? this._ui.button.attr("tabindex", -1)
                      : this._ui.button.removeAttr("tabindex"))),
                null != a.columnButtonTheme &&
                  this._ui.button &&
                  (this._removeClass(
                    this._ui.button,
                    null,
                    this._themeClassFromOption(
                      "ui-button-",
                      this.options.columnButtonTheme
                    )
                  ),
                  this._addClass(
                    this._ui.button,
                    null,
                    this._themeClassFromOption(
                      "ui-button-",
                      a.columnButtonTheme
                    )
                  )),
                null != a.columnPopupTheme &&
                  this._ui.popup.popup("option", "theme", a.columnPopupTheme),
                null != a.columnButtonText &&
                  this._ui.button &&
                  this._ui.button.text(a.columnButtonText),
                null != a.columnButton &&
                  (a.columnButton
                    ? ((this._ui.button && 0 !== this._ui.button.length) ||
                        (this._ui.button = this._columnsButton()),
                      this._ui.button.insertBefore(this.element))
                    : this._ui.button && this._ui.button.detach()))),
            this._superApply(arguments)
          );
        },
        _setColumnVisibility: function (a, b, c) {
          var d;
          return (
            !c &&
              this.options.columnUi &&
              ((d = a.jqmData("input")),
              d && d.prop("checked", b).checkboxradio("refresh")),
            this._superApply(arguments)
          );
        },
        _setupEvents: function () {
          this._on(this.window, { throttledresize: "_setToggleState" }),
            this._on(this._ui.menu, { "change input": "_menuInputChange" });
        },
        _menuInputChange: function (b) {
          var c = a(b.target);
          this._setColumnVisibility(c.jqmData("header"), c.prop("checked"), !0);
        },
        _columnsButton: function () {
          var b = this._id(),
            c = this.options,
            d = a(
              "<a href='#" +
                b +
                "-popup' id='" +
                b +
                "-button' data-" +
                a.mobile.ns +
                "rel='popup' data-theme='" +
                c.columnButtonTheme +
                "'>" +
                c.columnButtonText +
                "</a>"
            );
          return (
            d.button(),
            this._addClass(d, "ui-table-columntoggle-btn"),
            this._on(d, { click: "_handleButtonClicked" }),
            d
          );
        },
        _addColumnUI: function (b) {
          var c, d, e, f, g, h, i, j;
          return (
            (d = this._id()),
            (e = d + "-popup"),
            (f = this.element),
            (g = this.options),
            (h = g.columnPopupTheme
              ? " data-" + a.mobile.ns + "theme='" + g.columnPopupTheme + "'"
              : ""),
            (i = this.document[0].createDocumentFragment()),
            (c = this._ui = {
              button: this.options.columnButton ? this._columnsButton() : null,
              popup: a("<div id='" + e + "'" + h + "></div>"),
              menu: a("<fieldset></fieldset>").controlgroup(),
            }),
            this._addClass(c.popup, "ui-table-columntoggle-popup"),
            (j = b.callback.apply(b.callbackContext, b.callbackArguments)),
            c.menu.appendTo(c.popup),
            i.appendChild(c.popup[0]),
            c.button && i.appendChild(c.button[0]),
            f.before(i),
            c.popup.popup(),
            j
          );
        },
        _enhanceColumnToggle: function () {
          return this.options.columnUi
            ? this._addColumnUI({
                callback: this._superApply,
                callbackContext: this,
                callbackArguments: arguments,
              })
            : this._superApply(arguments);
        },
        _handleButtonClicked: function (b) {
          a.mobile.popup.handleLink(this._ui.button), b.preventDefault();
        },
        _setToggleState: function () {
          this._ui.menu.find("input").each(function () {
            var b = a(this);
            b.prop(
              "checked",
              "table-cell" === b.jqmData("cells").eq(0).css("display")
            ).checkboxradio("refresh");
          });
        },
        _recordLockedColumns: function () {
          var b = this.headers,
            c = [];
          return (
            this._ui.menu.find("input").each(function () {
              var d = a(this),
                e = d.jqmData("header"),
                f = -1;
              e && (f = b.index(e[0])),
                f > -1 &&
                  ((c = c.concat(
                    e.hasClass("ui-table-cell-visible")
                      ? [{ index: f, visible: !0 }]
                      : e.hasClass("ui-table-cell-hidden")
                      ? [{ index: f, visible: !1 }]
                      : []
                  )),
                  c.push(f));
            }),
            c
          );
        },
        _restoreLockedColumns: function (a) {
          var b, c, d;
          for (b = a.length - 1; b > -1; b--)
            (c = a[b]),
              (d = this.headers.eq(c.index).jqmData("input")),
              d &&
                d
                  .prop("checked", c.visible)
                  .checkboxradio("refresh")
                  .trigger("change");
        },
        _destroy: function () {
          return (
            "columntoggle" === this.options.mode &&
              this.options.columnUi &&
              this._removeColumnUi(this.options.enhanced),
            this._superApply(arguments)
          );
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/table.reflow", ["jquery", "./table"], b)
        : b(a);
    })(function (a) {
      return a.widget("mobile.table", a.mobile.table, {
        options: {
          mode: "reflow",
          classes: {
            "ui-table-reflow": "",
            "ui-table-cell-label": "",
            "ui-table-cell-label-top": "",
          },
        },
        _create: function () {
          return (
            "reflow" !== this.options.mode ||
              this.options.enhanced ||
              this._addClass("ui-table-reflow"),
            this._superApply(arguments)
          );
        },
        _refreshHeaderCell: function (b, c, d) {
          return (
            c.setAttribute("data-" + a.mobile.ns + "colstart", d + 1),
            this._superApply(arguments)
          );
        },
        refresh: function () {
          this._superApply(arguments),
            "reflow" === this.options.mode &&
              a(this.allHeaders.get().reverse()).each(
                a.proxy(this, "_updateCellsFromHeader")
              );
        },
        _updateCellsFromHeader: function (b, c) {
          var d,
            e,
            f,
            g,
            h = a(c),
            i = h.clone().contents();
          i.length > 0 &&
            ((g = "ui-table-cell-label"),
            (e = h.jqmData("cells")),
            (f = a.mobile.getAttribute(c, "colstart")),
            e.not(c).filter("thead th").length > 0 &&
              ((g += " ui-table-cell-label-top"),
              (d = parseInt(c.getAttribute("colspan"), 10)),
              d && (e = e.filter("td:nth-child(" + d + "n + " + f + ")"))),
            this._addLabels(e, g, i));
        },
        _addLabels: function (b, c, d) {
          var e = a("<b>");
          1 === d.length &&
            "abbr" === d[0].nodeName.toLowerCase() &&
            (d = d.eq(0).attr("title")),
            this._addClass(e, c),
            e.append(d),
            b.not(":has(b." + c.split(" ").join(".") + ")").prepend(e);
        },
        _destroy: function () {
          var b;
          return (
            "reflow" === this.options.mode &&
              ((b = "data-" + a.mobile.ns + "colstart"),
              this.options.enhanced ||
                this.element
                  .children("thead")
                  .find("[" + b + "]")
                  .removeAttr(b)
                  .end()
                  .end()
                  .children("tbody")
                  .find("b.ui-table-cell-label")
                  .remove()),
            this._superApply(arguments)
          );
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/filterable", ["jquery", "../widget"], b)
        : b(a);
    })(function (a) {
      var c = function (b, c) {
        var d,
          e = a.mobile.getAttribute(this, "filtertext");
        return (
          e || ((d = a(this)), (e = d.text()), e || (e = d.val() || "")),
          -1 === ("" + e).toLowerCase().indexOf(c)
        );
      };
      return a.widget("mobile.filterable", {
        version: "@VERSION",
        initSelector: ":jqmData(filter='true')",
        options: {
          filterReveal: !1,
          filterCallback: c,
          enhanced: !1,
          input: null,
          children:
            "> li, > option, > optgroup option, > tbody tr, > .ui-controlgroup > .ui-btn, > .ui-controlgroup > .ui-checkbox, > .ui-controlgroup > .ui-radio",
        },
        _create: function () {
          var b = this.options;
          a.extend(this, { _search: null, _timer: 0 }),
            this._setInput(b.input),
            b.enhanced ||
              this._filterItems(
                ((this._search && this._search.val()) || "").toLowerCase()
              );
        },
        _onKeyUp: function () {
          var c,
            d,
            e = this._search;
          if (e) {
            if (
              ((c = e.val().toLowerCase()),
              (d = a.mobile.getAttribute(e[0], "lastval") + ""),
              d && d === c)
            )
              return;
            this._timer && (b.clearTimeout(this._timer), (this._timer = 0)),
              (this._timer = this._delay(function () {
                return this._trigger("beforefilter", null, { input: e }) === !1
                  ? !1
                  : (e[0].setAttribute("data-" + a.mobile.ns + "lastval", c),
                    this._filterItems(c),
                    void (this._timer = 0));
              }, 250));
          }
        },
        _getFilterableItems: function () {
          var b = this.element,
            c = this.options.children,
            d = c
              ? a.isFunction(c)
                ? c()
                : c.nodeName
                ? a(c)
                : c.jquery
                ? c
                : this.element.find(c)
              : { length: 0 };
          return 0 === d.length && (d = b.children()), d;
        },
        _filterItems: function (b) {
          var d,
            e,
            f,
            g,
            h = [],
            i = [],
            j = this.options,
            k = this._getFilterableItems();
          if (null != b)
            for (e = j.filterCallback || c, f = k.length, d = 0; f > d; d++)
              (g = e.call(k[d], d, b) ? i : h), g.push(k[d]);
          0 === i.length
            ? k[j.filterReveal && 0 === b.length ? "addClass" : "removeClass"](
                "ui-screen-hidden"
              )
            : (a(i).addClass("ui-screen-hidden"),
              a(h).removeClass("ui-screen-hidden")),
            this._refreshChildWidget(),
            this._trigger("filter", null, { items: k });
        },
        _refreshChildWidget: function () {
          var b,
            c,
            d = ["collapsibleset", "selectmenu", "controlgroup", "listview"];
          for (c = d.length - 1; c > -1; c--)
            (b = d[c]),
              a.mobile[b] &&
                ((b = this.element.data("mobile-" + b)),
                b && a.isFunction(b.refresh) && b.refresh());
        },
        _setInput: function (c) {
          var d = this._search;
          this._timer && (b.clearTimeout(this._timer), (this._timer = 0)),
            d &&
              (this._off(d, "keyup keydown keypress change input"), (d = null)),
            c &&
              ((d = c.jquery ? c : c.nodeName ? a(c) : this.document.find(c)),
              this._on(d, {
                keydown: "_onKeyDown",
                keypress: "_onKeyPress",
                keyup: "_onKeyUp",
                change: "_onKeyUp",
                input: "_onKeyUp",
              })),
            (this._search = d);
        },
        _onKeyDown: function (b) {
          (this._preventKeyPress = !1),
            b.keyCode === a.ui.keyCode.ENTER &&
              (b.preventDefault(), (this._preventKeyPress = !0));
        },
        _onKeyPress: function (a) {
          this._preventKeyPress &&
            (a.preventDefault(), (this._preventKeyPress = !1));
        },
        _setOptions: function (a) {
          var b = !(
            a.filterReveal === d &&
            a.filterCallback === d &&
            a.children === d
          );
          this._super(a),
            a.input !== d && (this._setInput(a.input), (b = !0)),
            b && this.refresh();
        },
        _destroy: function () {
          var a = this.options,
            b = this._getFilterableItems();
          a.enhanced
            ? b.toggleClass("ui-screen-hidden", a.filterReveal)
            : b.removeClass("ui-screen-hidden");
        },
        refresh: function () {
          this._timer && (b.clearTimeout(this._timer), (this._timer = 0)),
            this._filterItems(
              ((this._search && this._search.val()) || "").toLowerCase()
            );
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("jquery-ui/widgets/tabs", [
            "jquery",
            "../escape-selector",
            "../keycode",
            "../safe-active-element",
            "../unique-id",
            "../version",
            "../widget",
          ], b)
        : b(a);
    })(function (a) {
      return (
        a.widget("ui.tabs", {
          version: "1.12.1",
          delay: 300,
          options: {
            active: null,
            classes: {
              "ui-tabs": "ui-corner-all",
              "ui-tabs-nav": "ui-corner-all",
              "ui-tabs-panel": "ui-corner-bottom",
              "ui-tabs-tab": "ui-corner-top",
            },
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null,
          },
          _isLocal: (function () {
            var a = /#.*$/;
            return function (b) {
              var c, d;
              (c = b.href.replace(a, "")), (d = location.href.replace(a, ""));
              try {
                c = decodeURIComponent(c);
              } catch (e) {}
              try {
                d = decodeURIComponent(d);
              } catch (e) {}
              return b.hash.length > 1 && c === d;
            };
          })(),
          _create: function () {
            var b = this,
              c = this.options;
            (this.running = !1),
              this._addClass("ui-tabs", "ui-widget ui-widget-content"),
              this._toggleClass("ui-tabs-collapsible", null, c.collapsible),
              this._processTabs(),
              (c.active = this._initialActive()),
              a.isArray(c.disabled) &&
                (c.disabled = a
                  .unique(
                    c.disabled.concat(
                      a.map(this.tabs.filter(".ui-state-disabled"), function (
                        a
                      ) {
                        return b.tabs.index(a);
                      })
                    )
                  )
                  .sort()),
              this.options.active !== !1 && this.anchors.length
                ? (this.active = this._findActive(c.active))
                : (this.active = a()),
              this._refresh(),
              this.active.length && this.load(c.active);
          },
          _initialActive: function () {
            var b = this.options.active,
              c = this.options.collapsible,
              d = location.hash.substring(1);
            return (
              null === b &&
                (d &&
                  this.tabs.each(function (c, e) {
                    return a(e).attr("aria-controls") === d
                      ? ((b = c), !1)
                      : void 0;
                  }),
                null === b &&
                  (b = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
                (null === b || -1 === b) && (b = this.tabs.length ? 0 : !1)),
              b !== !1 &&
                ((b = this.tabs.index(this.tabs.eq(b))),
                -1 === b && (b = c ? !1 : 0)),
              !c && b === !1 && this.anchors.length && (b = 0),
              b
            );
          },
          _getCreateEventData: function () {
            return {
              tab: this.active,
              panel: this.active.length
                ? this._getPanelForTab(this.active)
                : a(),
            };
          },
          _tabKeydown: function (b) {
            var c = a(a.ui.safeActiveElement(this.document[0])).closest("li"),
              d = this.tabs.index(c),
              e = !0;
            if (!this._handlePageNav(b)) {
              switch (b.keyCode) {
                case a.ui.keyCode.RIGHT:
                case a.ui.keyCode.DOWN:
                  d++;
                  break;
                case a.ui.keyCode.UP:
                case a.ui.keyCode.LEFT:
                  (e = !1), d--;
                  break;
                case a.ui.keyCode.END:
                  d = this.anchors.length - 1;
                  break;
                case a.ui.keyCode.HOME:
                  d = 0;
                  break;
                case a.ui.keyCode.SPACE:
                  return (
                    b.preventDefault(),
                    clearTimeout(this.activating),
                    void this._activate(d)
                  );
                case a.ui.keyCode.ENTER:
                  return (
                    b.preventDefault(),
                    clearTimeout(this.activating),
                    void this._activate(d === this.options.active ? !1 : d)
                  );
                default:
                  return;
              }
              b.preventDefault(),
                clearTimeout(this.activating),
                (d = this._focusNextTab(d, e)),
                b.ctrlKey ||
                  b.metaKey ||
                  (c.attr("aria-selected", "false"),
                  this.tabs.eq(d).attr("aria-selected", "true"),
                  (this.activating = this._delay(function () {
                    this.option("active", d);
                  }, this.delay)));
            }
          },
          _panelKeydown: function (b) {
            this._handlePageNav(b) ||
              (b.ctrlKey &&
                b.keyCode === a.ui.keyCode.UP &&
                (b.preventDefault(), this.active.trigger("focus")));
          },
          _handlePageNav: function (b) {
            return b.altKey && b.keyCode === a.ui.keyCode.PAGE_UP
              ? (this._activate(
                  this._focusNextTab(this.options.active - 1, !1)
                ),
                !0)
              : b.altKey && b.keyCode === a.ui.keyCode.PAGE_DOWN
              ? (this._activate(
                  this._focusNextTab(this.options.active + 1, !0)
                ),
                !0)
              : void 0;
          },
          _findNextTab: function (b, c) {
            function d() {
              return b > e && (b = 0), 0 > b && (b = e), b;
            }
            for (
              var e = this.tabs.length - 1;
              -1 !== a.inArray(d(), this.options.disabled);

            )
              b = c ? b + 1 : b - 1;
            return b;
          },
          _focusNextTab: function (a, b) {
            return (
              (a = this._findNextTab(a, b)), this.tabs.eq(a).trigger("focus"), a
            );
          },
          _setOption: function (a, b) {
            return "active" === a
              ? void this._activate(b)
              : (this._super(a, b),
                "collapsible" === a &&
                  (this._toggleClass("ui-tabs-collapsible", null, b),
                  b || this.options.active !== !1 || this._activate(0)),
                "event" === a && this._setupEvents(b),
                void ("heightStyle" === a && this._setupHeightStyle(b)));
          },
          _sanitizeSelector: function (a) {
            return a
              ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&")
              : "";
          },
          refresh: function () {
            var b = this.options,
              c = this.tablist.children(":has(a[href])");
            (b.disabled = a.map(c.filter(".ui-state-disabled"), function (a) {
              return c.index(a);
            })),
              this._processTabs(),
              b.active !== !1 && this.anchors.length
                ? this.active.length &&
                  !a.contains(this.tablist[0], this.active[0])
                  ? this.tabs.length === b.disabled.length
                    ? ((b.active = !1), (this.active = a()))
                    : this._activate(
                        this._findNextTab(Math.max(0, b.active - 1), !1)
                      )
                  : (b.active = this.tabs.index(this.active))
                : ((b.active = !1), (this.active = a())),
              this._refresh();
          },
          _refresh: function () {
            this._setOptionDisabled(this.options.disabled),
              this._setupEvents(this.options.event),
              this._setupHeightStyle(this.options.heightStyle),
              this.tabs
                .not(this.active)
                .attr({
                  "aria-selected": "false",
                  "aria-expanded": "false",
                  tabIndex: -1,
                }),
              this.panels
                .not(this._getPanelForTab(this.active))
                .hide()
                .attr({ "aria-hidden": "true" }),
              this.active.length
                ? (this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0,
                  }),
                  this._addClass(
                    this.active,
                    "ui-tabs-active",
                    "ui-state-active"
                  ),
                  this._getPanelForTab(this.active)
                    .show()
                    .attr({ "aria-hidden": "false" }))
                : this.tabs.eq(0).attr("tabIndex", 0);
          },
          _processTabs: function () {
            var b = this,
              c = this.tabs,
              d = this.anchors,
              e = this.panels;
            (this.tablist = this._getList().attr("role", "tablist")),
              this._addClass(
                this.tablist,
                "ui-tabs-nav",
                "ui-helper-reset ui-helper-clearfix ui-widget-header"
              ),
              this.tablist
                .on("mousedown" + this.eventNamespace, "> li", function (b) {
                  a(this).is(".ui-state-disabled") && b.preventDefault();
                })
                .on(
                  "focus" + this.eventNamespace,
                  ".ui-tabs-anchor",
                  function () {
                    a(this).closest("li").is(".ui-state-disabled") &&
                      this.blur();
                  }
                ),
              (this.tabs = this.tablist
                .find("> li:has(a[href])")
                .attr({ role: "tab", tabIndex: -1 })),
              this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"),
              (this.anchors = this.tabs
                .map(function () {
                  return a("a", this)[0];
                })
                .attr({ role: "presentation", tabIndex: -1 })),
              this._addClass(this.anchors, "ui-tabs-anchor"),
              (this.panels = a()),
              this.anchors.each(function (c, d) {
                var e,
                  f,
                  g,
                  h = a(d).uniqueId().attr("id"),
                  i = a(d).closest("li"),
                  j = i.attr("aria-controls");
                b._isLocal(d)
                  ? ((e = d.hash),
                    (g = e.substring(1)),
                    (f = b.element.find(b._sanitizeSelector(e))))
                  : ((g = i.attr("aria-controls") || a({}).uniqueId()[0].id),
                    (e = "#" + g),
                    (f = b.element.find(e)),
                    f.length ||
                      ((f = b._createPanel(g)),
                      f.insertAfter(b.panels[c - 1] || b.tablist)),
                    f.attr("aria-live", "polite")),
                  f.length && (b.panels = b.panels.add(f)),
                  j && i.data("ui-tabs-aria-controls", j),
                  i.attr({ "aria-controls": g, "aria-labelledby": h }),
                  f.attr("aria-labelledby", h);
              }),
              this.panels.attr("role", "tabpanel"),
              this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"),
              c &&
                (this._off(c.not(this.tabs)),
                this._off(d.not(this.anchors)),
                this._off(e.not(this.panels)));
          },
          _getList: function () {
            return this.tablist || this.element.find("ol, ul").eq(0);
          },
          _createPanel: function (b) {
            return a("<div>").attr("id", b).data("ui-tabs-destroy", !0);
          },
          _setOptionDisabled: function (b) {
            var c, d, e;
            for (
              a.isArray(b) &&
                (b.length
                  ? b.length === this.anchors.length && (b = !0)
                  : (b = !1)),
                e = 0;
              (d = this.tabs[e]);
              e++
            )
              (c = a(d)),
                b === !0 || -1 !== a.inArray(e, b)
                  ? (c.attr("aria-disabled", "true"),
                    this._addClass(c, null, "ui-state-disabled"))
                  : (c.removeAttr("aria-disabled"),
                    this._removeClass(c, null, "ui-state-disabled"));
            (this.options.disabled = b),
              this._toggleClass(
                this.widget(),
                this.widgetFullName + "-disabled",
                null,
                b === !0
              );
          },
          _setupEvents: function (b) {
            var c = {};
            b &&
              a.each(b.split(" "), function (a, b) {
                c[b] = "_eventHandler";
              }),
              this._off(this.anchors.add(this.tabs).add(this.panels)),
              this._on(!0, this.anchors, {
                click: function (a) {
                  a.preventDefault();
                },
              }),
              this._on(this.anchors, c),
              this._on(this.tabs, { keydown: "_tabKeydown" }),
              this._on(this.panels, { keydown: "_panelKeydown" }),
              this._focusable(this.tabs),
              this._hoverable(this.tabs);
          },
          _setupHeightStyle: function (b) {
            var c,
              d = this.element.parent();
            "fill" === b
              ? ((c = d.height()),
                (c -= this.element.outerHeight() - this.element.height()),
                this.element.siblings(":visible").each(function () {
                  var b = a(this),
                    d = b.css("position");
                  "absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0));
                }),
                this.element
                  .children()
                  .not(this.panels)
                  .each(function () {
                    c -= a(this).outerHeight(!0);
                  }),
                this.panels
                  .each(function () {
                    a(this).height(
                      Math.max(0, c - a(this).innerHeight() + a(this).height())
                    );
                  })
                  .css("overflow", "auto"))
              : "auto" === b &&
                ((c = 0),
                this.panels
                  .each(function () {
                    c = Math.max(c, a(this).height("").height());
                  })
                  .height(c));
          },
          _eventHandler: function (b) {
            var c = this.options,
              d = this.active,
              e = a(b.currentTarget),
              f = e.closest("li"),
              g = f[0] === d[0],
              h = g && c.collapsible,
              i = h ? a() : this._getPanelForTab(f),
              j = d.length ? this._getPanelForTab(d) : a(),
              k = { oldTab: d, oldPanel: j, newTab: h ? a() : f, newPanel: i };
            b.preventDefault(),
              f.hasClass("ui-state-disabled") ||
                f.hasClass("ui-tabs-loading") ||
                this.running ||
                (g && !c.collapsible) ||
                this._trigger("beforeActivate", b, k) === !1 ||
                ((c.active = h ? !1 : this.tabs.index(f)),
                (this.active = g ? a() : f),
                this.xhr && this.xhr.abort(),
                j.length ||
                  i.length ||
                  a.error("jQuery UI Tabs: Mismatching fragment identifier."),
                i.length && this.load(this.tabs.index(f), b),
                this._toggle(b, k));
          },
          _toggle: function (b, c) {
            function d() {
              (f.running = !1), f._trigger("activate", b, c);
            }
            function e() {
              f._addClass(
                c.newTab.closest("li"),
                "ui-tabs-active",
                "ui-state-active"
              ),
                g.length && f.options.show
                  ? f._show(g, f.options.show, d)
                  : (g.show(), d());
            }
            var f = this,
              g = c.newPanel,
              h = c.oldPanel;
            (this.running = !0),
              h.length && this.options.hide
                ? this._hide(h, this.options.hide, function () {
                    f._removeClass(
                      c.oldTab.closest("li"),
                      "ui-tabs-active",
                      "ui-state-active"
                    ),
                      e();
                  })
                : (this._removeClass(
                    c.oldTab.closest("li"),
                    "ui-tabs-active",
                    "ui-state-active"
                  ),
                  h.hide(),
                  e()),
              h.attr("aria-hidden", "true"),
              c.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false",
              }),
              g.length && h.length
                ? c.oldTab.attr("tabIndex", -1)
                : g.length &&
                  this.tabs
                    .filter(function () {
                      return 0 === a(this).attr("tabIndex");
                    })
                    .attr("tabIndex", -1),
              g.attr("aria-hidden", "false"),
              c.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0,
              });
          },
          _activate: function (b) {
            var c,
              d = this._findActive(b);
            d[0] !== this.active[0] &&
              (d.length || (d = this.active),
              (c = d.find(".ui-tabs-anchor")[0]),
              this._eventHandler({
                target: c,
                currentTarget: c,
                preventDefault: a.noop,
              }));
          },
          _findActive: function (b) {
            return b === !1 ? a() : this.tabs.eq(b);
          },
          _getIndex: function (b) {
            return (
              "string" == typeof b &&
                (b = this.anchors.index(
                  this.anchors.filter(
                    "[href$='" + a.ui.escapeSelector(b) + "']"
                  )
                )),
              b
            );
          },
          _destroy: function () {
            this.xhr && this.xhr.abort(),
              this.tablist.removeAttr("role").off(this.eventNamespace),
              this.anchors.removeAttr("role tabIndex").removeUniqueId(),
              this.tabs.add(this.panels).each(function () {
                a.data(this, "ui-tabs-destroy")
                  ? a(this).remove()
                  : a(this).removeAttr(
                      "role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded"
                    );
              }),
              this.tabs.each(function () {
                var b = a(this),
                  c = b.data("ui-tabs-aria-controls");
                c
                  ? b
                      .attr("aria-controls", c)
                      .removeData("ui-tabs-aria-controls")
                  : b.removeAttr("aria-controls");
              }),
              this.panels.show(),
              "content" !== this.options.heightStyle &&
                this.panels.css("height", "");
          },
          enable: function (b) {
            var c = this.options.disabled;
            c !== !1 &&
              (b === d
                ? (c = !1)
                : ((b = this._getIndex(b)),
                  (c = a.isArray(c)
                    ? a.map(c, function (a) {
                        return a !== b ? a : null;
                      })
                    : a.map(this.tabs, function (a, c) {
                        return c !== b ? c : null;
                      }))),
              this._setOptionDisabled(c));
          },
          disable: function (b) {
            var c = this.options.disabled;
            if (c !== !0) {
              if (b === d) c = !0;
              else {
                if (((b = this._getIndex(b)), -1 !== a.inArray(b, c))) return;
                c = a.isArray(c) ? a.merge([b], c).sort() : [b];
              }
              this._setOptionDisabled(c);
            }
          },
          load: function (b, c) {
            b = this._getIndex(b);
            var d = this,
              e = this.tabs.eq(b),
              f = e.find(".ui-tabs-anchor"),
              g = this._getPanelForTab(e),
              h = { tab: e, panel: g },
              i = function (a, b) {
                "abort" === b && d.panels.stop(!1, !0),
                  d._removeClass(e, "ui-tabs-loading"),
                  g.removeAttr("aria-busy"),
                  a === d.xhr && delete d.xhr;
              };
            this._isLocal(f[0]) ||
              ((this.xhr = a.ajax(this._ajaxSettings(f, c, h))),
              this.xhr &&
                "canceled" !== this.xhr.statusText &&
                (this._addClass(e, "ui-tabs-loading"),
                g.attr("aria-busy", "true"),
                this.xhr
                  .done(function (a, b, e) {
                    setTimeout(function () {
                      g.html(a), d._trigger("load", c, h), i(e, b);
                    }, 1);
                  })
                  .fail(function (a, b) {
                    setTimeout(function () {
                      i(a, b);
                    }, 1);
                  })));
          },
          _ajaxSettings: function (b, c, d) {
            var e = this;
            return {
              url: b.attr("href").replace(/#.*$/, ""),
              beforeSend: function (b, f) {
                return e._trigger(
                  "beforeLoad",
                  c,
                  a.extend({ jqXHR: b, ajaxSettings: f }, d)
                );
              },
            };
          },
          _getPanelForTab: function (b) {
            var c = a(b).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + c));
          },
        }),
        a.uiBackCompat !== !1 &&
          a.widget("ui.tabs", a.ui.tabs, {
            _processTabs: function () {
              this._superApply(arguments), this._addClass(this.tabs, "ui-tab");
            },
          }),
        a.ui.tabs
      );
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("widgets/tabs.ajax", [
            "jquery",
            "../defaults",
            "../navigation/path",
            "../navigation/base",
            "jquery-ui/widgets/tabs",
          ], b)
        : b(a);
    })(function (a) {
      return a.widget("ui.tabs", a.ui.tabs, {
        _create: function () {
          this._super(),
            this.active.find("a.ui-tabs-anchor").addClass("ui-button-active");
        },
        _isLocal: function (b) {
          var c, d, e;
          return a.mobile.ajaxEnabled
            ? ((c = a.mobile.path),
              (d = c.parseUrl(a.mobile.base.element().attr("href"))),
              (e = c.parseUrl(c.makeUrlAbsolute(b.getAttribute("href"), d))),
              c.isSameDomain(e.href, d.href) && e.pathname === d.pathname)
            : this._superApply(arguments);
        },
      });
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("zoom/iosorientationfix", ["jquery", "../core", "../zoom"], b)
        : b(a);
    })(function (a) {
      function c(a) {
        (e = a.originalEvent),
          (i = e.accelerationIncludingGravity),
          (f = Math.abs(i.x)),
          (g = Math.abs(i.y)),
          (h = Math.abs(i.z)),
          !b.orientation &&
          (f > 7 || (((h > 6 && 8 > g) || (8 > h && g > 6)) && f > 5))
            ? d.enabled && d.disable()
            : d.enabled || d.enable();
      }
      a.mobile.iosorientationfixEnabled = !0;
      var d,
        e,
        f,
        g,
        h,
        i,
        j = navigator.userAgent;
      return /iPhone|iPad|iPod/.test(navigator.platform) &&
        /OS [1-5]_[0-9_]* like Mac OS X/i.test(j) &&
        j.indexOf("AppleWebKit") > -1
        ? ((d = a.mobile.zoom),
          void a.mobile.document.on("mobileinit", function () {
            a.mobile.iosorientationfixEnabled &&
              a.mobile.window
                .bind("orientationchange.iosorientationfix", d.enable)
                .bind("devicemotion.iosorientationfix", c);
          }))
        : void (a.mobile.iosorientationfixEnabled = !1);
    }),
    (function (b) {
      "function" == typeof define && define.amd
        ? define("init", [
            "jquery",
            "./defaults",
            "./helpers",
            "./data",
            "./support",
            "./widgets/enhancer",
            "./events/navigate",
            "./navigation/path",
            "./navigation/method",
            "./navigation",
            "./widgets/loader",
            "./vmouse",
          ], b)
        : b(a);
    })(function (a) {
      function e() {
        f.removeClass("ui-mobile-rendering");
      }
      var f = a("html"),
        g = a.mobile.window;
      a.mobile.document.trigger("mobileinit"),
        a.mobile.gradeA() &&
          (a.mobile.ajaxBlacklist && (a.mobile.ajaxEnabled = !1),
          f.addClass("ui-mobile ui-mobile-rendering"),
          setTimeout(e, 5e3),
          a.extend(a.mobile, {
            initializePage: function () {
              var b,
                f = a.mobile.path,
                h = a(":jqmData(role='page'), :jqmData(role='dialog')"),
                i = f.stripHash(f.stripQueryParams(f.parseLocation().hash)),
                j = a.mobile.path.parseLocation(),
                k = i ? c.getElementById(i) : d;
              h.length ||
                (h = a("body")
                  .wrapInner("<div data-" + a.mobile.ns + "role='page'></div>")
                  .children(0)),
                h.each(function () {
                  var b = a(this);
                  b[0].getAttribute("data-" + a.mobile.ns + "url") ||
                    b.attr(
                      "data-" + a.mobile.ns + "url",
                      b.attr("id") ||
                        f.convertUrlToDataUrl(j.pathname + j.search)
                    );
                }),
                (a.mobile.firstPage = h.first()),
                (b = a.mobile.firstPage.parent().pagecontainer()),
                a.mobile.navreadyDeferred.resolve(),
                a.mobile.loading("show"),
                e(),
                a.mobile.hashListeningEnabled &&
                a.mobile.path.isHashValid(location.hash) &&
                (a(k).is(":jqmData(role='page')") ||
                  a.mobile.path.isPath(i) ||
                  i === a.mobile.dialogHashKey)
                  ? a.event.special.navigate.isPushStateEnabled()
                    ? ((a.mobile.navigate.history.stack = []),
                      a.mobile.navigate(
                        a.mobile.path.isPath(location.hash)
                          ? location.hash
                          : location.href
                      ))
                    : g.trigger("hashchange", [!0])
                  : (a.event.special.navigate.isPushStateEnabled() &&
                      a.mobile.navigate.navigator.squash(
                        f.parseLocation().href
                      ),
                    b.pagecontainer("change", a.mobile.firstPage, {
                      transition: "none",
                      reverse: !0,
                      changeUrl: !1,
                      fromHashChange: !0,
                    }));
            },
          }),
          a(function () {
            a.support.inlineSVG(),
              a.mobile.hideUrlBar && b.scrollTo(0, 1),
              (a.mobile.defaultHomeScroll =
                a.support.scrollTop && 1 !== a.mobile.window.scrollTop()
                  ? 1
                  : 0),
              a.mobile.autoInitializePage && a.mobile.initializePage(),
              a.support.cssPointerEvents ||
                a.mobile.document.delegate(
                  ".ui-state-disabled,.ui-disabled",
                  "vclick",
                  function (a) {
                    a.preventDefault(), a.stopImmediatePropagation();
                  }
                );
          }));
    });
});
//# sourceMappingURL=jquery.mobile-1.5.0-rc1.min.map
