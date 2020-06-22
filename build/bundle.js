!(function (e) {
  var t = {};
  function r(i) {
    if (t[i]) return t[i].exports;
    var n = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function (e, t, i) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (r.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var n in e)
          r.d(
            i,
            n,
            function (t) {
              return e[t];
            }.bind(null, n)
          );
      return i;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 1));
})([
  function (e, t) {
    !(function (e, t) {
      for (var r in t) e[r] = t[r];
    })(
      this,
      (function (e) {
        function t(i) {
          if (r[i]) return r[i].exports;
          var n = (r[i] = { i: i, l: !1, exports: {} });
          return e[i].call(n.exports, n, n.exports, t), (n.l = !0), n.exports;
        }
        var r = {};
        return (
          (t.m = e),
          (t.c = r),
          (t.i = function (e) {
            return e;
          }),
          (t.d = function (e, t, r) {
            Object.defineProperty(e, t, {
              configurable: !1,
              enumerable: !0,
              get: r,
            });
          }),
          (t.n = function (e) {
            var r =
              e && e.__esModule
                ? function () {
                    return e.default;
                  }
                : function () {
                    return e;
                  };
            return t.d(r, "a", r), r;
          }),
          (t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }),
          (t.p = "/"),
          t((t.s = 2))
        );
      })([
        function (e, t, r) {
          "use strict";
          var i = r(1),
            n = (function () {
              function e(e, t) {
                (this.root = e), (this.delegate = t), (this.idMap = {});
              }
              return (
                (e.prototype.initialize = function (e, t) {
                  this.idMap[e] = this.root;
                  for (var r = 0; r < t.length; r++)
                    this.deserializeNode(t[r], this.root);
                }),
                (e.prototype.applyChanged = function (e, t, r, i) {
                  var n = this;
                  t.forEach(function (e) {
                    var t = n.deserializeNode(e),
                      r = n.deserializeNode(e.parentNode);
                    n.deserializeNode(e.previousSibling),
                      !1 === t.contains(r) &&
                        t instanceof HTMLElement == 1 &&
                        r instanceof HTMLElement == 1 &&
                        t.parentNode &&
                        t.parentNode.removeChild(t);
                  }),
                    e.forEach(function (e) {
                      var t = n.deserializeNode(e);
                      t.parentNode && t.parentNode.removeChild(t);
                    }),
                    t.forEach(function (e) {
                      var t = n.deserializeNode(e),
                        r = n.deserializeNode(e.parentNode),
                        i = n.deserializeNode(e.previousSibling);
                      try {
                        t.contains(r) ||
                        t instanceof HTMLElement != 1 ||
                        r instanceof HTMLElement != 1
                          ? t instanceof HTMLElement &&
                            "HTML" === t.nodeName &&
                            n.root instanceof HTMLDocument &&
                            !1 === n.root.contains(t) &&
                            n.root.appendChild(t)
                          : r.insertBefore(t, i ? i.nextSibling : r.firstChild);
                      } catch (e) {
                        r instanceof HTMLDocument &&
                          i instanceof HTMLElement &&
                          r.contains(i) &&
                          (i.firstChild
                            ? i.insertBefore(t, i.firstChild)
                            : i.appendChild(t)),
                          n.debug && console.log(e);
                      }
                    }),
                    r.forEach(function (e) {
                      var t = n.deserializeNode(e);
                      Object.keys(e.attributes).forEach(function (r) {
                        var i = e.attributes[r];
                        if (null === i) t.removeAttribute(r);
                        else
                          try {
                            (n.delegate &&
                              n.delegate.setAttribute &&
                              n.delegate.setAttribute(t, r, i)) ||
                              t.setAttribute(r, i);
                          } catch (e) {}
                      });
                    }),
                    i.forEach(function (e) {
                      n.deserializeNode(e).textContent = e.textContent;
                    }),
                    e.forEach(function (e) {
                      delete n.idMap[e.id];
                    });
                }),
                (e.prototype.deserializeNode = function (e, t) {
                  var r = this;
                  if (null === e) return null;
                  var i = this.idMap[e.id];
                  if (i) return i;
                  var n = this.root.ownerDocument;
                  switch ((null === n && (n = this.root), e.nodeType)) {
                    case Node.COMMENT_NODE:
                      i = n.createComment(e.textContent);
                      break;
                    case Node.TEXT_NODE:
                      i = n.createTextNode(e.textContent);
                      break;
                    case Node.DOCUMENT_TYPE_NODE:
                      i = n.implementation.createDocumentType(
                        e.name,
                        e.publicId,
                        e.systemId
                      );
                      break;
                    case Node.ELEMENT_NODE:
                      this.delegate &&
                        this.delegate.createElement &&
                        (i = this.delegate.createElement(e.tagName)),
                        i || (i = n.createElement(e.tagName)),
                        Object.keys(e.attributes).forEach(function (t) {
                          try {
                            (r.delegate &&
                              r.delegate.setAttribute &&
                              r.delegate.setAttribute(i, t, e.attributes[t])) ||
                              i.setAttribute(t, e.attributes[t]);
                          } catch (e) {}
                        });
                  }
                  if (!i) throw "ouch";
                  if (
                    ((this.idMap[e.id] = i),
                    t && t.appendChild(i),
                    e.childNodes)
                  )
                    for (var a = 0; a < e.childNodes.length; a++)
                      this.deserializeNode(e.childNodes[a], i);
                  return i;
                }),
                e
              );
            })(),
            a = (function () {
              function e(e, t, r) {
                var n = this;
                (this.target = e),
                  (this.mirror = t),
                  (this.nextId = 1),
                  (this.knownNodes = new i.MutationSummary.NodeMap()),
                  void 0 === this.mirror &&
                    (this.mirror = n.getDefaultMirror());
                for (
                  var a = this.serializeNode(e).id, o = [], s = e.firstChild;
                  s;
                  s = s.nextSibling
                )
                  o.push(this.serializeNode(s, !0));
                this.mirror.initialize(a, o);
                var h,
                  c = [{ all: !0 }];
                r && (c = c.concat(r));
                try {
                  h =
                    "undefined" != typeof WebKitMutationObserver
                      ? WebKitMutationObserver
                      : MutationObserver;
                } catch (e) {
                  h = void 0;
                }
                void 0 !== h &&
                  (this.mutationSummary = new i.MutationSummary({
                    rootNode: e,
                    callback: function (e) {
                      n.applyChanged(e);
                    },
                    queries: c,
                  }));
              }
              return (
                (e.prototype.getDefaultMirror = function () {
                  return {
                    initialize: function (e, t) {},
                    applyChanged: function (e, t, r, i) {},
                  };
                }),
                (e.prototype.disconnect = function () {
                  this.mutationSummary &&
                    (this.mutationSummary.disconnect(),
                    (this.mutationSummary = void 0));
                }),
                (e.prototype.rememberNode = function (e) {
                  var t = this.nextId++;
                  return this.knownNodes.set(e, t), t;
                }),
                (e.prototype.forgetNode = function (e) {
                  this.knownNodes.delete(e);
                }),
                (e.prototype.serializeNode = function (e, t) {
                  if (null === e) return null;
                  var r = this.knownNodes.get(e);
                  if (void 0 !== r) return { id: r };
                  var i = { nodeType: e.nodeType, id: this.rememberNode(e) };
                  switch (i.nodeType) {
                    case Node.DOCUMENT_TYPE_NODE:
                      var n = e;
                      (i.name = n.name),
                        (i.publicId = n.publicId),
                        (i.systemId = n.systemId);
                      break;
                    case Node.COMMENT_NODE:
                    case Node.TEXT_NODE:
                      i.textContent = e.textContent;
                      break;
                    case Node.ELEMENT_NODE:
                      var a = e;
                      (i.tagName = a.tagName), (i.attributes = {});
                      for (var o = 0; o < a.attributes.length; o++) {
                        var s = a.attributes[o];
                        i.attributes[s.name] = s.value;
                      }
                      if (t && a.childNodes.length) {
                        i.childNodes = [];
                        for (var h = a.firstChild; h; h = h.nextSibling)
                          i.childNodes.push(this.serializeNode(h, !0));
                      }
                  }
                  return i;
                }),
                (e.prototype.serializeAddedAndMoved = function (e, t, r) {
                  var n = this,
                    a = e.concat(t).concat(r),
                    o = new i.MutationSummary.NodeMap();
                  a.forEach(function (e) {
                    var t = e.parentNode,
                      r = o.get(t);
                    r || ((r = new i.MutationSummary.NodeMap()), o.set(t, r)),
                      r.set(e, !0);
                  });
                  var s = [];
                  return (
                    o.keys().forEach(function (e) {
                      for (var t = o.get(e), r = t.keys(); r.length; ) {
                        for (
                          var i = r[0];
                          i.previousSibling && t.has(i.previousSibling);

                        )
                          i = i.previousSibling;
                        for (; i && t.has(i); ) {
                          var a = n.serializeNode(i);
                          (a.previousSibling = n.serializeNode(
                            i.previousSibling
                          )),
                            (a.parentNode = n.serializeNode(i.parentNode)),
                            s.push(a),
                            t.delete(i),
                            (i = i.nextSibling);
                        }
                        r = t.keys();
                      }
                    }),
                    s
                  );
                }),
                (e.prototype.serializeAttributeChanges = function (e) {
                  var t = this,
                    r = new i.MutationSummary.NodeMap();
                  return (
                    Object.keys(e).forEach(function (i) {
                      e[i].forEach(function (e) {
                        var n = r.get(e);
                        n ||
                          (((n = t.serializeNode(e)).attributes = {}),
                          r.set(e, n)),
                          (n.attributes[i] = e.getAttribute(i));
                      });
                    }),
                    r.keys().map(function (e) {
                      return r.get(e);
                    })
                  );
                }),
                (e.prototype.applyChanged = function (e) {
                  var t = this,
                    r = e[0],
                    i = r.removed.map(function (e) {
                      return t.serializeNode(e);
                    }),
                    n = this.serializeAddedAndMoved(
                      r.added,
                      r.reparented,
                      r.reordered
                    ),
                    a = this.serializeAttributeChanges(r.attributeChanged),
                    o = r.characterDataChanged.map(function (e) {
                      var r = t.serializeNode(e);
                      return (r.textContent = e.textContent), r;
                    });
                  this.mirror.applyChanged(i, n, a, o),
                    r.removed.forEach(function (e) {
                      t.forgetNode(e);
                    });
                }),
                e
              );
            })();
          e.exports = { TreeMirror: n, TreeMirrorClient: a };
        },
        function (e, t) {
          "use strict";
          function r(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          }
          function i() {
            (this.added = new g()),
              (this.removed = new g()),
              (this.maybeMoved = new g()),
              (this.oldPrevious = new g()),
              (this.moved = void 0);
          }
          function n(e, t, r, i, n) {
            (this.rootNode = e),
              (this.mutations = t),
              (this.selectors = r),
              (this.calcReordered = i),
              (this.calcOldPreviousSibling = n),
              (this.treeChanges = new b(e, t)),
              (this.entered = []),
              (this.exited = []),
              (this.stayedIn = new g()),
              (this.visited = new g()),
              (this.childListChangeMap = void 0),
              (this.characterDataOnly = void 0),
              (this.matchCache = void 0),
              this.processMutations();
          }
          function a(e, t) {
            var r = this;
            if (
              ((this.projection = e),
              (this.added = []),
              (this.removed = []),
              (this.reparented = t.all || t.element ? [] : void 0),
              (this.reordered = t.all ? [] : void 0),
              e.getChanged(this, t.elementFilter, t.characterData),
              t.all || t.attribute || t.attributeList)
            ) {
              var i = t.attribute ? [t.attribute] : t.attributeList,
                n = e.attributeChangedNodes(i);
              t.attribute
                ? (this.valueChanged = n[t.attribute] || [])
                : ((this.attributeChanged = n),
                  t.attributeList &&
                    t.attributeList.forEach(function (e) {
                      r.attributeChanged.hasOwnProperty(e) ||
                        (r.attributeChanged[e] = []);
                    }));
            }
            if (t.all || t.characterData) {
              var a = e.getCharacterDataChanged();
              t.characterData
                ? (this.valueChanged = a)
                : (this.characterDataChanged = a);
            }
            this.reordered &&
              (this.getOldPreviousSibling = e.getOldPreviousSibling.bind(e));
          }
          function o(e) {
            return '"' + e.replace(/"/, '\\"') + '"';
          }
          function s() {}
          function h() {
            (this.nextUid = 1),
              (this.uid = this.nextUid++),
              (this.qualifiers = []);
          }
          function c(e) {
            if ("string" != typeof e)
              throw Error(
                "Invalid request opion. attribute must be a non-zero length string."
              );
            if (!(e = e.trim()))
              throw Error(
                "Invalid request opion. attribute must be a non-zero length string."
              );
            if (!e.match(C))
              throw Error(
                "Invalid request option. invalid attribute name: " + e
              );
            return e;
          }
          function l(e) {
            if (!e.trim().length)
              throw Error(
                "Invalid request option: elementAttributes must contain at least one attribute."
              );
            for (
              var t = {}, r = {}, i = e.split(/\s+/), n = 0;
              n < i.length;
              n++
            ) {
              if ((a = i[n])) {
                var a,
                  o = (a = c(a)).toLowerCase();
                if (t[o])
                  throw Error(
                    "Invalid request option: observing multiple case variations of the same attribute is not supported."
                  );
                (r[a] = !0), (t[o] = !0);
              }
            }
            return Object.keys(r);
          }
          function d(e) {
            var t = this;
            (this.connected = !1),
              (this.options = this.validateOptions(e)),
              (this.observerOptions = this.createObserverOptions(
                this.options.queries
              )),
              (this.root = this.options.rootNode),
              (this.callback = this.options.callback),
              (this.elementFilter = Array.prototype.concat.apply(
                [],
                this.options.queries.map(function (e) {
                  return e.elementFilter ? e.elementFilter : [];
                })
              )),
              this.elementFilter.length || (this.elementFilter = void 0),
              (this.calcReordered = this.options.queries.some(function (e) {
                return e.all;
              })),
              (this.queryValidators = []),
              this.createQueryValidator &&
                (this.queryValidators = this.options.queries.map(function (e) {
                  return this.createQueryValidator(t.root, e);
                })),
              (this.observer = new u(function (e) {
                t.observerCallback(e);
              })),
              this.reconnect();
          }
          var u,
            f = (function () {
              function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r];
                  (i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i);
                }
              }
              return function (t, r, i) {
                return r && e(t.prototype, r), i && e(t, i), t;
              };
            })();
          try {
            u =
              "undefined" != typeof WebKitMutationObserver
                ? WebKitMutationObserver
                : MutationObserver;
          } catch (e) {
            u = void 0;
          }
          var p,
            g = (function () {
              function e() {
                r(this, e),
                  (this.nodes = []),
                  (this.values = []),
                  (this.ID_PROP = "__mutation_summary_node_map_id__"),
                  (this.nextId_ = 1);
              }
              return (
                f(e, [
                  {
                    key: "isIndex",
                    value: function (e) {
                      return +e == e >>> 0;
                    },
                  },
                  {
                    key: "nodeId",
                    value: function (e) {
                      var t = e[this.ID_PROP];
                      return t || (t = e[this.ID_PROP] = this.nextId_++), t;
                    },
                  },
                  {
                    key: "set",
                    value: function (e, t) {
                      var r = this.nodeId(e);
                      (this.nodes[r] = e), (this.values[r] = t);
                    },
                  },
                  {
                    key: "get",
                    value: function (e) {
                      var t = this.nodeId(e);
                      return this.values[t];
                    },
                  },
                  {
                    key: "has",
                    value: function (e) {
                      return this.nodeId(e) in this.nodes;
                    },
                  },
                  {
                    key: "delete",
                    value: function (e) {
                      var t = this.nodeId(e);
                      delete this.nodes[t], (this.values[t] = void 0);
                    },
                  },
                  {
                    key: "keys",
                    value: function () {
                      var e = [];
                      for (var t in this.nodes)
                        this.isIndex(t) && e.push(this.nodes[t]);
                      return e;
                    },
                  },
                ]),
                e
              );
            })();
          !(function (e) {
            (e[(e.STAYED_OUT = 0)] = "STAYED_OUT"),
              (e[(e.ENTERED = 1)] = "ENTERED"),
              (e[(e.STAYED_IN = 2)] = "STAYED_IN"),
              (e[(e.REPARENTED = 3)] = "REPARENTED"),
              (e[(e.REORDERED = 4)] = "REORDERED"),
              (e[(e.EXITED = 5)] = "EXITED");
          })(p || (p = {}));
          var v = (function () {
              function e(t) {
                var i =
                    arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1],
                  n =
                    arguments.length > 2 &&
                    void 0 !== arguments[2] &&
                    arguments[2],
                  a =
                    arguments.length > 3 &&
                    void 0 !== arguments[3] &&
                    arguments[3],
                  o =
                    arguments.length > 4 && void 0 !== arguments[4]
                      ? arguments[4]
                      : null,
                  s =
                    arguments.length > 5 &&
                    void 0 !== arguments[5] &&
                    arguments[5],
                  h =
                    arguments.length > 6 && void 0 !== arguments[6]
                      ? arguments[6]
                      : null,
                  c =
                    arguments.length > 7 && void 0 !== arguments[7]
                      ? arguments[7]
                      : null;
                r(this, e),
                  (this.node = t),
                  (this.childList = i),
                  (this.attributes = n),
                  (this.characterData = a),
                  (this.oldParentNode = o),
                  (this.added = s),
                  (this.attributeOldValues = h),
                  (this.characterDataOldValue = c),
                  (this.isCaseInsensitive =
                    this.node.nodeType === Node.ELEMENT_NODE &&
                    this.node instanceof HTMLElement &&
                    this.node.ownerDocument instanceof HTMLDocument);
              }
              return (
                f(e, [
                  {
                    key: "getAttributeOldValue",
                    value: function (e) {
                      if (this.attributeOldValues)
                        return (
                          this.isCaseInsensitive && (e = e.toLowerCase()),
                          this.attributeOldValues[e]
                        );
                    },
                  },
                  {
                    key: "getAttributeNamesMutated",
                    value: function () {
                      var e = [];
                      if (!this.attributeOldValues) return e;
                      for (var t in this.attributeOldValues) e.push(t);
                      return e;
                    },
                  },
                  {
                    key: "attributeMutated",
                    value: function (e, t) {
                      (this.attributes = !0),
                        (this.attributeOldValues =
                          this.attributeOldValues || {}),
                        e in this.attributeOldValues ||
                          (this.attributeOldValues[e] = t);
                    },
                  },
                  {
                    key: "characterDataMutated",
                    value: function (e) {
                      this.characterData ||
                        ((this.characterData = !0),
                        (this.characterDataOldValue = e));
                    },
                  },
                  {
                    key: "removedFromParent",
                    value: function (e) {
                      (this.childList = !0),
                        this.added || this.oldParentNode
                          ? (this.added = !1)
                          : (this.oldParentNode = e);
                    },
                  },
                  {
                    key: "insertedIntoParent",
                    value: function () {
                      (this.childList = !0), (this.added = !0);
                    },
                  },
                  {
                    key: "getOldParent",
                    value: function () {
                      if (this.childList) {
                        if (this.oldParentNode) return this.oldParentNode;
                        if (this.added) return null;
                      }
                      return this.node.parentNode;
                    },
                  },
                ]),
                e
              );
            })(),
            b = (function (e) {
              function t(e, i) {
                r(this, t);
                var n = (function (e, t) {
                  if (!e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    );
                  return !t || ("object" != typeof t && "function" != typeof t)
                    ? e
                    : t;
                })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                (n.rootNode = e),
                  (n.reachableCache = void 0),
                  (n.wasReachableCache = void 0),
                  (n.anyParentsChanged = !1),
                  (n.anyAttributesChanged = !1),
                  (n.anyCharacterDataChanged = !1);
                for (var a = 0; a < i.length; a++) {
                  var o = i[a];
                  switch (o.type) {
                    case "childList":
                      n.anyParentsChanged = !0;
                      for (var s = 0; s < o.removedNodes.length; s++) {
                        (h = o.removedNodes[s]) &&
                          n.getChange(h).removedFromParent(o.target);
                      }
                      for (s = 0; s < o.addedNodes.length; s++) {
                        var h;
                        (h = o.addedNodes[s]) &&
                          n.getChange(h).insertedIntoParent();
                      }
                      break;
                    case "attributes":
                      (n.anyAttributesChanged = !0),
                        n
                          .getChange(o.target)
                          .attributeMutated(o.attributeName, o.oldValue);
                      break;
                    case "characterData":
                      (n.anyCharacterDataChanged = !0),
                        n.getChange(o.target).characterDataMutated(o.oldValue);
                  }
                }
                return n;
              }
              return (
                (function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " +
                        typeof t
                    );
                  (e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    t &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, t)
                        : (e.__proto__ = t));
                })(t, e),
                f(t, [
                  {
                    key: "getChange",
                    value: function (e) {
                      var t = this.get(e);
                      return t || ((t = new v(e)), this.set(e, t)), t;
                    },
                  },
                  {
                    key: "getOldParent",
                    value: function (e) {
                      if (!e) return null;
                      var t = this.get(e);
                      return t ? t.getOldParent() : e.parentNode;
                    },
                  },
                  {
                    key: "getIsReachable",
                    value: function (e) {
                      if (e === this.rootNode) return !0;
                      if (!e) return !1;
                      this.reachableCache = this.reachableCache || new g();
                      var t = this.reachableCache.get(e);
                      return (
                        void 0 === t &&
                          ((t = this.getIsReachable(e.parentNode)),
                          this.reachableCache.set(e, t)),
                        t
                      );
                    },
                  },
                  {
                    key: "getWasReachable",
                    value: function (e) {
                      var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : [];
                      if (e === this.rootNode) return !0;
                      if (!e) return !1;
                      this.wasReachableCache =
                        this.wasReachableCache || new g();
                      var r = this.wasReachableCache.get(e);
                      if (void 0 === r) {
                        var i = this.getOldParent(e);
                        if ((t.push(e), t.indexOf(i) >= 0))
                          return this.wasReachableCache.set(e, !1), !1;
                        (r = this.getWasReachable(i, t)),
                          this.wasReachableCache.set(e, r);
                      }
                      return r;
                    },
                  },
                  {
                    key: "reachabilityChange",
                    value: function (e) {
                      return this.getIsReachable(e)
                        ? this.getWasReachable(e)
                          ? 2
                          : 1
                        : this.getWasReachable(e)
                        ? 5
                        : 0;
                    },
                  },
                ]),
                t
              );
            })(g);
          (n.prototype.processMutations = function () {
            if (
              this.treeChanges.anyParentsChanged ||
              this.treeChanges.anyAttributesChanged
            )
              for (var e = this.treeChanges.keys(), t = 0; t < e.length; t++)
                this.visitNode(e[t], void 0);
          }),
            (n.prototype.visitNode = function (e, t) {
              if (!this.visited.has(e)) {
                this.visited.set(e, !0);
                var r = this.treeChanges.get(e),
                  i = t;
                if (
                  (((r && r.childList) || null == i) &&
                    (i = this.treeChanges.reachabilityChange(e)),
                  0 !== i)
                ) {
                  if ((this.matchabilityChange(e), 1 === i))
                    this.entered.push(e);
                  else if (5 === i)
                    this.exited.push(e),
                      this.ensureHasOldPreviousSiblingIfNeeded(e);
                  else if (2 === i) {
                    var n = 2;
                    r &&
                      r.childList &&
                      (r.oldParentNode !== e.parentNode
                        ? ((n = 3), this.ensureHasOldPreviousSiblingIfNeeded(e))
                        : this.calcReordered &&
                          this.wasReordered(e) &&
                          (n = 4)),
                      this.stayedIn.set(e, n);
                  }
                  if (2 !== i)
                    for (var a = e.firstChild; a; a = a.nextSibling)
                      this.visitNode(a, i);
                }
              }
            }),
            (n.prototype.ensureHasOldPreviousSiblingIfNeeded = function (e) {
              if (this.calcOldPreviousSibling) {
                this.processChildlistChanges();
                var t = e.parentNode,
                  r = this.treeChanges.get(e);
                r && r.oldParentNode && (t = r.oldParentNode);
                var n = this.childListChangeMap.get(t);
                n || ((n = new i()), this.childListChangeMap.set(t, n)),
                  n.oldPrevious.has(e) ||
                    n.oldPrevious.set(e, e.previousSibling);
              }
            }),
            (n.prototype.getChanged = function (e, t, r) {
              (this.selectors = t), (this.characterDataOnly = r);
              for (var i = 0; i < this.entered.length; i++) {
                var n = this.entered[i];
                (1 !== (s = this.matchabilityChange(n)) && 2 !== s) ||
                  e.added.push(n);
              }
              var a = this.stayedIn.keys();
              for (i = 0; i < a.length; i++) {
                n = a[i];
                if (1 === (s = this.matchabilityChange(n))) e.added.push(n);
                else if (5 === s) e.removed.push(n);
                else if (2 === s && (e.reparented || e.reordered)) {
                  var o = this.stayedIn.get(n);
                  e.reparented && 3 === o
                    ? e.reparented.push(n)
                    : e.reordered && 4 === o && e.reordered.push(n);
                }
              }
              for (i = 0; i < this.exited.length; i++) {
                var s;
                n = this.exited[i];
                (5 !== (s = this.matchabilityChange(n)) && 2 !== s) ||
                  e.removed.push(n);
              }
            }),
            (n.prototype.getOldParentNode = function (e) {
              var t = this.treeChanges.get(e);
              if (t && t.childList)
                return t.oldParentNode ? t.oldParentNode : null;
              var r = this.treeChanges.reachabilityChange(e);
              if (0 === r || 1 === r)
                throw Error("getOldParentNode requested on invalid node.");
              return e.parentNode;
            }),
            (n.prototype.getOldPreviousSibling = function (e) {
              var t = e.parentNode,
                r = this.treeChanges.get(e);
              r && r.oldParentNode && (t = r.oldParentNode);
              var i = this.childListChangeMap.get(t);
              if (!i)
                throw Error("getOldPreviousSibling requested on invalid node.");
              return i.oldPrevious.get(e);
            }),
            (n.prototype.getOldAttribute = function (e, t) {
              var r = this.treeChanges.get(e);
              if (!r || !r.attributes)
                throw Error("getOldAttribute requested on invalid node.");
              var i = r.getAttributeOldValue(t);
              if (void 0 === i)
                throw Error(
                  "getOldAttribute requested for unchanged attribute name."
                );
              return i;
            }),
            (n.prototype.attributeChangedNodes = function (e) {
              if (!this.treeChanges.anyAttributesChanged) return {};
              var t, r;
              if (e) {
                (t = {}), (r = {});
                for (var i = 0; i < e.length; i++) {
                  (t[(d = e[i])] = !0), (r[d.toLowerCase()] = d);
                }
              }
              var n = {},
                a = this.treeChanges.keys();
              for (i = 0; i < a.length; i++) {
                var o = a[i],
                  s = this.treeChanges.get(o);
                if (
                  s.attributes &&
                  2 === this.treeChanges.reachabilityChange(o) &&
                  2 === this.matchabilityChange(o)
                )
                  for (
                    var h = o, c = s.getAttributeNamesMutated(), l = 0;
                    l < c.length;
                    l++
                  ) {
                    var d = c[l];
                    if (!t || t[d] || (s.isCaseInsensitive && r[d]))
                      s.getAttributeOldValue(d) !== h.getAttribute(d) &&
                        (r && s.isCaseInsensitive && (d = r[d]),
                        (n[d] = n[d] || []),
                        n[d].push(h));
                  }
              }
              return n;
            }),
            (n.prototype.getOldCharacterData = function (e) {
              var t = this.treeChanges.get(e);
              if (!t || !t.characterData)
                throw Error("getOldCharacterData requested on invalid node.");
              return t.characterDataOldValue;
            }),
            (n.prototype.getCharacterDataChanged = function () {
              if (!this.treeChanges.anyCharacterDataChanged) return [];
              for (
                var e = this.treeChanges.keys(), t = [], r = 0;
                r < e.length;
                r++
              ) {
                var i = e[r];
                if (2 === this.treeChanges.reachabilityChange(i)) {
                  var n = this.treeChanges.get(i);
                  n.characterData &&
                    i.textContent != n.characterDataOldValue &&
                    t.push(i);
                }
              }
              return t;
            }),
            (n.prototype.computeMatchabilityChange = function (e, t) {
              this.matchCache || (this.matchCache = []),
                this.matchCache[e.uid] || (this.matchCache[e.uid] = new g());
              var r = this.matchCache[e.uid],
                i = r.get(t);
              return (
                void 0 === i &&
                  ((i = e.matchabilityChange(t, this.treeChanges.get(t))),
                  r.set(t, i)),
                i
              );
            }),
            (n.prototype.matchabilityChange = function (e) {
              var t = this;
              if (this.characterDataOnly)
                switch (e.nodeType) {
                  case Node.COMMENT_NODE:
                  case Node.TEXT_NODE:
                    return 2;
                  default:
                    return 0;
                }
              if (!this.selectors) return 2;
              if (e.nodeType !== Node.ELEMENT_NODE) return 0;
              for (
                var r = e,
                  i = this.selectors.map(function (e) {
                    return t.computeMatchabilityChange(e, r);
                  }),
                  n = 0,
                  a = 0;
                2 !== n && a < i.length;

              ) {
                switch (i[a]) {
                  case 2:
                    n = 2;
                    break;
                  case 1:
                    n = 5 === n ? 2 : 1;
                    break;
                  case 5:
                    n = 1 === n ? 2 : 5;
                }
                a++;
              }
              return n;
            }),
            (n.prototype.getChildlistChange = function (e) {
              var t = this.childListChangeMap.get(e);
              return t || ((t = new i()), this.childListChangeMap.set(e, t)), t;
            }),
            (n.prototype.processChildlistChanges = function () {
              var e = this;
              if (!this.childListChangeMap) {
                this.childListChangeMap = new g();
                for (
                  var t = function () {
                      function t(e, t) {
                        !e ||
                          n.oldPrevious.has(e) ||
                          n.added.has(e) ||
                          n.maybeMoved.has(e) ||
                          (t && (n.added.has(t) || n.maybeMoved.has(t))) ||
                          n.oldPrevious.set(e, t);
                      }
                      if ("childList" != (i = e.mutations[r]).type)
                        return "continue";
                      if (
                        2 !== e.treeChanges.reachabilityChange(i.target) &&
                        !e.calcOldPreviousSibling
                      )
                        return "continue";
                      for (
                        n = e.getChildlistChange(i.target),
                          a = i.previousSibling,
                          o = 0;
                        o < i.removedNodes.length;
                        o++
                      )
                        t((s = i.removedNodes[o]), a),
                          n.added.has(s)
                            ? n.added.delete(s)
                            : (n.removed.set(s, !0), n.maybeMoved.delete(s)),
                          (a = s);
                      for (
                        t(i.nextSibling, a), o = 0;
                        o < i.addedNodes.length;
                        o++
                      )
                        (s = i.addedNodes[o]),
                          n.removed.has(s)
                            ? (n.removed.delete(s), n.maybeMoved.set(s, !0))
                            : n.added.set(s, !0);
                    },
                    r = 0;
                  r < this.mutations.length;
                  r++
                ) {
                  var i, n, a, o, s;
                  t();
                }
              }
            }),
            (n.prototype.wasReordered = function (e) {
              function t(e) {
                if (!e) return !1;
                if (!o.maybeMoved.has(e)) return !1;
                var t = o.moved.get(e);
                return (
                  void 0 !== t ||
                    (s.has(e) ? (t = !0) : (s.set(e, !0), (t = i(e) !== r(e))),
                    s.has(e)
                      ? (s.delete(e), o.moved.set(e, t))
                      : (t = o.moved.get(e))),
                  t
                );
              }
              function r(e) {
                var i = h.get(e);
                if (void 0 !== i) return i;
                for (
                  i = o.oldPrevious.get(e);
                  i && (o.removed.has(i) || t(i));

                )
                  i = r(i);
                return void 0 === i && (i = e.previousSibling), h.set(e, i), i;
              }
              function i(e) {
                if (c.has(e)) return c.get(e);
                for (var r = e.previousSibling; r && (o.added.has(r) || t(r)); )
                  r = r.previousSibling;
                return c.set(e, r), r;
              }
              if (!this.treeChanges.anyParentsChanged) return !1;
              this.processChildlistChanges();
              var n = e.parentNode,
                a = this.treeChanges.get(e);
              a && a.oldParentNode && (n = a.oldParentNode);
              var o = this.childListChangeMap.get(n);
              if (!o) return !1;
              if (o.moved) return o.moved.get(e);
              o.moved = new g();
              var s = new g(),
                h = new g(),
                c = new g();
              return o.maybeMoved.keys().forEach(t), o.moved.get(e);
            }),
            (a.prototype.getOldParentNode = function (e) {
              return this.projection.getOldParentNode(e);
            }),
            (a.prototype.getOldAttribute = function (e, t) {
              return this.projection.getOldAttribute(e, t);
            }),
            (a.prototype.getOldCharacterData = function (e) {
              return this.projection.getOldCharacterData(e);
            }),
            (a.prototype.getOldPreviousSibling = function (e) {
              return this.projection.getOldPreviousSibling(e);
            });
          var m = /[a-zA-Z_]+/,
            y = /[a-zA-Z0-9_\-]+/;
          (s.prototype.matches = function (e) {
            if (null === e) return !1;
            if (void 0 === this.attrValue) return !0;
            if (!this.contains) return this.attrValue == e;
            for (var t = e.split(" "), r = 0; r < t.length; r++)
              if (this.attrValue === t[r]) return !0;
            return !1;
          }),
            (s.prototype.toString = function () {
              return "class" === this.attrName && this.contains
                ? "." + this.attrValue
                : "id" !== this.attrName || this.contains
                ? this.contains
                  ? "[" + this.attrName + "~=" + o(this.attrValue) + "]"
                  : "attrValue" in this
                  ? "[" + this.attrName + "=" + o(this.attrValue) + "]"
                  : "[" + this.attrName + "]"
                : "#" + this.attrValue;
            }),
            Object.defineProperty(h.prototype, "caseInsensitiveTagName", {
              get: function () {
                return this.tagName.toUpperCase();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(h.prototype, "selectorString", {
              get: function () {
                return this.tagName + this.qualifiers.join("");
              },
              enumerable: !0,
              configurable: !0,
            }),
            (h.prototype.isMatching = function (e) {
              return e[this.matchesSelector](this.selectorString);
            }),
            (h.prototype.wasMatching = function (e, t, r) {
              if (!t || !t.attributes) return r;
              var i = t.isCaseInsensitive
                ? this.caseInsensitiveTagName
                : this.tagName;
              if ("*" !== i && i !== e.tagName) return !1;
              for (var n = [], a = !1, o = 0; o < this.qualifiers.length; o++) {
                var s = this.qualifiers[o],
                  h = t.getAttributeOldValue(s.attrName);
                n.push(h), (a = a || void 0 !== h);
              }
              if (!a) return r;
              for (o = 0; o < this.qualifiers.length; o++) {
                s = this.qualifiers[o];
                if (
                  (void 0 === (h = n[o]) && (h = e.getAttribute(s.attrName)),
                  !s.matches(h))
                )
                  return !1;
              }
              return !0;
            }),
            (h.prototype.matchabilityChange = function (e, t) {
              var r = this.isMatching(e);
              return r
                ? this.wasMatching(e, t, r)
                  ? 2
                  : 1
                : this.wasMatching(e, t, r)
                ? 5
                : 0;
            }),
            (h.parseSelectors = function (e) {
              function t() {
                i && (n && (i.qualifiers.push(n), (n = void 0)), o.push(i)),
                  (i = new h());
              }
              function r() {
                n && i.qualifiers.push(n), (n = new s());
              }
              for (
                var i,
                  n,
                  a,
                  o = [],
                  c = /\s/,
                  l = "Invalid or unsupported selector syntax.",
                  d = 1,
                  u = 0;
                u < e.length;

              ) {
                var f = e[u++];
                switch (d) {
                  case 1:
                    if (f.match(m)) {
                      t(), (i.tagName = f), (d = 2);
                      break;
                    }
                    if ("*" == f) {
                      t(), (i.tagName = "*"), (d = 3);
                      break;
                    }
                    if ("." == f) {
                      t(),
                        r(),
                        (i.tagName = "*"),
                        (n.attrName = "class"),
                        (n.contains = !0),
                        (d = 4);
                      break;
                    }
                    if ("#" == f) {
                      t(), r(), (i.tagName = "*"), (n.attrName = "id"), (d = 4);
                      break;
                    }
                    if ("[" == f) {
                      t(), r(), (i.tagName = "*"), (n.attrName = ""), (d = 6);
                      break;
                    }
                    if (f.match(c)) break;
                    throw Error(l);
                  case 2:
                    if (f.match(y)) {
                      i.tagName += f;
                      break;
                    }
                    if ("." == f) {
                      r(), (n.attrName = "class"), (n.contains = !0), (d = 4);
                      break;
                    }
                    if ("#" == f) {
                      r(), (n.attrName = "id"), (d = 4);
                      break;
                    }
                    if ("[" == f) {
                      r(), (n.attrName = ""), (d = 6);
                      break;
                    }
                    if (f.match(c)) {
                      d = 14;
                      break;
                    }
                    if ("," == f) {
                      d = 1;
                      break;
                    }
                    throw Error(l);
                  case 3:
                    if ("." == f) {
                      r(), (n.attrName = "class"), (n.contains = !0), (d = 4);
                      break;
                    }
                    if ("#" == f) {
                      r(), (n.attrName = "id"), (d = 4);
                      break;
                    }
                    if ("[" == f) {
                      r(), (n.attrName = ""), (d = 6);
                      break;
                    }
                    if (f.match(c)) {
                      d = 14;
                      break;
                    }
                    if ("," == f) {
                      d = 1;
                      break;
                    }
                    throw Error(l);
                  case 4:
                    if (f.match(m)) {
                      (n.attrValue = f), (d = 5);
                      break;
                    }
                    throw Error(l);
                  case 5:
                    if (f.match(y)) {
                      n.attrValue += f;
                      break;
                    }
                    if ("." == f) {
                      r(), (n.attrName = "class"), (n.contains = !0), (d = 4);
                      break;
                    }
                    if ("#" == f) {
                      r(), (n.attrName = "id"), (d = 4);
                      break;
                    }
                    if ("[" == f) {
                      r(), (d = 6);
                      break;
                    }
                    if (f.match(c)) {
                      d = 14;
                      break;
                    }
                    if ("," == f) {
                      d = 1;
                      break;
                    }
                    throw Error(l);
                  case 6:
                    if (f.match(m)) {
                      (n.attrName = f), (d = 7);
                      break;
                    }
                    if (f.match(c)) break;
                    throw Error(l);
                  case 7:
                    if (f.match(y)) {
                      n.attrName += f;
                      break;
                    }
                    if (f.match(c)) {
                      d = 8;
                      break;
                    }
                    if ("~" == f) {
                      (n.contains = !0), (d = 9);
                      break;
                    }
                    if ("=" == f) {
                      (n.attrValue = ""), (d = 11);
                      break;
                    }
                    if ("]" == f) {
                      d = 3;
                      break;
                    }
                    throw Error(l);
                  case 8:
                    if ("~" == f) {
                      (n.contains = !0), (d = 9);
                      break;
                    }
                    if ("=" == f) {
                      (n.attrValue = ""), (d = 11);
                      break;
                    }
                    if ("]" == f) {
                      d = 3;
                      break;
                    }
                    if (f.match(c)) break;
                    throw Error(l);
                  case 9:
                    if ("=" == f) {
                      (n.attrValue = ""), (d = 11);
                      break;
                    }
                    throw Error(l);
                  case 10:
                    if ("]" == f) {
                      d = 3;
                      break;
                    }
                    if (f.match(c)) break;
                    throw Error(l);
                  case 11:
                    if (f.match(c)) break;
                    if ('"' == f || "'" == f) {
                      (a = f), (d = 13);
                      break;
                    }
                    (n.attrValue += f), (d = 12);
                    break;
                  case 12:
                    if (f.match(c)) {
                      d = 10;
                      break;
                    }
                    if ("]" == f) {
                      d = 3;
                      break;
                    }
                    if ("'" == f || '"' == f) throw Error(l);
                    n.attrValue += f;
                    break;
                  case 13:
                    if (f == a) {
                      d = 10;
                      break;
                    }
                    n.attrValue += f;
                    break;
                  case 14:
                    if (f.match(c)) break;
                    if ("," == f) {
                      d = 1;
                      break;
                    }
                    throw Error(l);
                }
              }
              switch (d) {
                case 1:
                case 2:
                case 3:
                case 5:
                case 14:
                  t();
                  break;
                default:
                  throw Error(l);
              }
              if (!o.length) throw Error(l);
              return o;
            }),
            (h.matchesSelector = function () {
              var e = document.createElement("div");
              return "function" == typeof e.webkitMatchesSelector
                ? "webkitMatchesSelector"
                : "function" == typeof e.mozMatchesSelector
                ? "mozMatchesSelector"
                : "function" == typeof e.msMatchesSelector
                ? "msMatchesSelector"
                : "matchesSelector";
            });
          var C = /^([a-zA-Z:_]+[a-zA-Z0-9_\-:\.]*)$/;
          (d.prototype.createObserverOptions = function (e) {
            function t(e) {
              if (!i.attributes || r) {
                if (((i.attributes = !0), (i.attributeOldValue = !0), !e))
                  return void (r = void 0);
                (r = r || {}),
                  e.forEach(function (e) {
                    (r[e] = !0), (r[e.toLowerCase()] = !0);
                  });
              }
            }
            var r,
              i = { childList: !0, subtree: !0 };
            return (
              e.forEach(function (e) {
                if (e.characterData)
                  return (
                    (i.characterData = !0), void (i.characterDataOldValue = !0)
                  );
                if (e.all)
                  return (
                    t(),
                    (i.characterData = !0),
                    void (i.characterDataOldValue = !0)
                  );
                if (e.attribute) t([e.attribute.trim()]);
                else {
                  var r = (function (e) {
                    var t = {};
                    return (
                      e.forEach(function (e) {
                        e.qualifiers.forEach(function (e) {
                          t[e.attrName] = !0;
                        });
                      }),
                      Object.keys(t)
                    );
                  })(e.elementFilter).concat(e.attributeList || []);
                  r.length && t(r);
                }
              }),
              r && (i.attributeFilter = Object.keys(r)),
              i
            );
          }),
            (d.prototype.validateOptions = function (e) {
              for (var t in e)
                if (!(t in d.optionKeys)) throw Error("Invalid option: " + t);
              if ("function" != typeof e.callback)
                throw Error(
                  "Invalid options: callback is required and must be a function"
                );
              if (!e.queries || !e.queries.length)
                throw Error(
                  "Invalid options: queries must contain at least one query request object."
                );
              for (
                var r = {
                    callback: e.callback,
                    rootNode: e.rootNode || document,
                    observeOwnChanges: !!e.observeOwnChanges,
                    oldPreviousSibling: !!e.oldPreviousSibling,
                    queries: [],
                  },
                  i = 0;
                i < e.queries.length;
                i++
              ) {
                var n = e.queries[i];
                if (n.all) {
                  if (Object.keys(n).length > 1)
                    throw Error("Invalid request option. all has no options.");
                  r.queries.push({ all: !0 });
                } else if ("attribute" in n) {
                  if (
                    (((o = {
                      attribute: c(n.attribute),
                    }).elementFilter = h.parseSelectors(
                      "*[" + o.attribute + "]"
                    )),
                    Object.keys(n).length > 1)
                  )
                    throw Error(
                      "Invalid request option. attribute has no options."
                    );
                  r.queries.push(o);
                } else if ("element" in n) {
                  var a = Object.keys(n).length,
                    o = {
                      element: n.element,
                      elementFilter: h.parseSelectors(n.element),
                    };
                  if (
                    (n.hasOwnProperty("elementAttributes") &&
                      ((o.attributeList = l(n.elementAttributes)), a--),
                    a > 1)
                  )
                    throw Error(
                      "Invalid request option. element only allows elementAttributes option."
                    );
                  r.queries.push(o);
                } else {
                  if (!n.characterData)
                    throw Error(
                      "Invalid request option. Unknown query request."
                    );
                  if (Object.keys(n).length > 1)
                    throw Error(
                      "Invalid request option. characterData has no options."
                    );
                  r.queries.push({ characterData: !0 });
                }
              }
              return r;
            }),
            (d.prototype.createSummaries = function (e) {
              if (!e || !e.length) return [];
              for (
                var t = new n(
                    this.root,
                    e,
                    this.elementFilter,
                    this.calcReordered,
                    this.options.oldPreviousSibling
                  ),
                  r = [],
                  i = 0;
                i < this.options.queries.length;
                i++
              )
                r.push(new a(t, this.options.queries[i]));
              return r;
            }),
            (d.prototype.checkpointQueryValidators = function () {
              this.queryValidators.forEach(function (e) {
                e && e.recordPreviousState();
              });
            }),
            (d.prototype.runQueryValidators = function (e) {
              this.queryValidators.forEach(function (t, r) {
                t && t.validate(e[r]);
              });
            }),
            (d.prototype.changesToReport = function (e) {
              return e.some(function (e) {
                if (
                  [
                    "added",
                    "removed",
                    "reordered",
                    "reparented",
                    "valueChanged",
                    "characterDataChanged",
                  ].some(function (t) {
                    return e[t] && e[t].length;
                  })
                )
                  return !0;
                if (
                  e.attributeChanged &&
                  Object.keys(e.attributeChanged).some(function (t) {
                    return !!e.attributeChanged[t].length;
                  })
                )
                  return !0;
                return !1;
              });
            }),
            (d.prototype.observerCallback = function (e) {
              this.options.observeOwnChanges || this.observer.disconnect();
              var t = this.createSummaries(e);
              this.runQueryValidators(t),
                this.options.observeOwnChanges &&
                  this.checkpointQueryValidators(),
                this.changesToReport(t) && this.callback(t),
                !this.options.observeOwnChanges &&
                  this.connected &&
                  (this.checkpointQueryValidators(),
                  this.observer.observe(this.root, this.observerOptions));
            }),
            (d.prototype.reconnect = function () {
              if (this.connected) throw Error("Already connected");
              this.observer.observe(this.root, this.observerOptions),
                (this.connected = !0),
                this.checkpointQueryValidators();
            }),
            (d.prototype.takeSummaries = function () {
              if (!this.connected) throw Error("Not connected");
              var e = this.createSummaries(this.observer.takeRecords());
              return this.changesToReport(e) ? e : void 0;
            }),
            (d.prototype.disconnect = function () {
              var e = this.takeSummaries();
              return this.observer.disconnect(), (this.connected = !1), e;
            }),
            (d.NodeMap = g),
            (d.parseElementFilter = h.parseSelectors),
            (d.optionKeys = {
              callback: !0,
              queries: !0,
              rootNode: !0,
              oldPreviousSibling: !0,
              observeOwnChanges: !0,
            }),
            (e.exports = { MutationSummary: d });
        },
        function (e, t, r) {
          "use strict";
          var i = r(0);
          (function () {
            if (void 0 !== e && e.exports)
              var t = (e.exports = {
                TreeMirror: i.TreeMirror,
                TreeMirrorClient: i.TreeMirrorClient,
              });
            (t.TreeMirror = i.TreeMirror),
              (t.TreeMirrorClient = i.TreeMirrorClient);
          }.call(void 0));
        },
      ])
    );
  },
  function (e, t, r) {
    "use strict";
    var i, n, a;
    function o() {
      i.innerHTML = "Code for Screen Sharing";
    }
    function s(e, t) {
      var r = document.createElement("div");
      (r.id = "screenSharingDiv"),
        (r.style.position = "fixed"),
        (r.style.bottom = "0%"),
        (r.style.right = "0%"),
        (r.style.opacity = "0.9"),
        (r.style.borderRadius = "10px 30px 0px"),
        (r.style.backgroundImage =
          "linear-gradient(120deg, #0a0a68ec, #03031fde)"),
        e.appendChild(r),
        (function (e, t) {
          (i = document.createElement("p")),
            (n = document.createElement("button")),
            (a = document.createElement("button")),
            (i.innerHTML = "Code for Screen Sharing"),
            (i.style.backgroundColor = "white"),
            (i.style.padding = "5px"),
            (i.style.margin = "15px"),
            (a.innerText = "End"),
            (a.style.padding = "5px"),
            (a.style.margin = "15px"),
            (a.style.display = "inline-block"),
            (a.style.fontSize = "12px"),
            (n.innerText = "Start"),
            (n.style.padding = "5px"),
            (n.style.margin = "15px"),
            (n.style.display = "inline-block"),
            (n.style.fontSize = "12px"),
            e.appendChild(i),
            e.appendChild(n),
            e.appendChild(a);
        })(r);
    }
    r.r(t);
    var h,
      c = r(0),
      l = r.n(c),
      d = (function () {
        function e() {
          (this.subscriptions = []),
            (this.listners = []),
            (this.state = "OFF"),
            (this.socket = null),
            (this.peer = null),
            (this.dataChannel = null),
            (this.dataChannelConnected = !1);
        }
        return (
          (e.prototype.bindListners = function () {
            this.listners.forEach(function (e) {
              e.element.addEventListener(e.event, e.fn);
            });
          }),
          (e.prototype.addListener = function (e) {
            this.listners.push(e);
          }),
          (e.prototype.open = function () {
            var e = this;
            if ("ON" !== this.state) {
              this.state = "ON";
              var t,
                r,
                n = Math.floor(899999 * Math.random()) + 1e5;
              (t =
                "https://jovial-chandrasekhar-84cf9f.netlify.app/screen?hash=" +
                n),
                (i.innerHTML =
                  '<a href="' + t + '" target="_blank">' + t + "</a>"),
                (this.socket = new WebSocket(
                  "wss://screen-sharing-hero.herokuapp.com/screenShareClient?hash=" +
                    n
                )),
                (this.socket.onmessage = function (t) {
                  var i = JSON.parse(t.data);
                  if ((console.log(i), "offer" === i.type)) {
                    console.log("Peer Creation");
                    (e.peer = new RTCPeerConnection({
                      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
                    })),
                      (e.peer.onicecandidate = function (t) {
                        t && t.candidate
                          ? e.socket.send(
                              JSON.stringify({
                                type: "candidate",
                                value: t.candidate,
                              })
                            )
                          : console.log(t.candidate);
                      }),
                      e.peer.setRemoteDescription(
                        new RTCSessionDescription(i.value)
                      );
                    e.peer
                      .createAnswer({
                        offerToReceiveAudio: !1,
                        offerToReceiveVideo: !1,
                      })
                      .then(function (t) {
                        console.log("Sending Answer"),
                          e.peer.setLocalDescription(t),
                          e.socket.send(
                            JSON.stringify({ type: "answer", value: t })
                          );
                      }, null),
                      (e.peer.onconnectionstatechange = function (t) {
                        "connected" === e.peer.connectionState &&
                          console.log("Peer Connected");
                      }),
                      (e.peer.ondatachannel = function (t) {
                        (e.dataChannel = t.channel),
                          (e.dataChannel.onmessage = function (t) {
                            console.log("Message");
                            var r = JSON.parse(t.data);
                            e.subscriptions.forEach(function (e) {
                              return e(r);
                            });
                          }),
                          (e.dataChannel.onopen = function () {
                            console.log("Data Channel Opened on Client"),
                              (e.dataChannelConnected = !0),
                              e.publish({
                                type: "clear",
                                payload: { clear: !0 },
                              }),
                              e.publish({
                                type: "base",
                                payload: {
                                  base: window.location.href.match(
                                    /^(.*\/)[^/]*$/
                                  )[1],
                                },
                              }),
                              (r = new l.a.TreeMirrorClient(
                                document,
                                {
                                  initialize: function (t, r) {
                                    e.publish({
                                      type: "treeMirror",
                                      payload: {
                                        f: "initialize",
                                        args: [t, r],
                                      },
                                    });
                                  },
                                  applyChanged: function (t, r, i, n) {
                                    e.publish({
                                      type: "treeMirror",
                                      payload: {
                                        f: "applyChanged",
                                        args: [t, r, i, n],
                                      },
                                    });
                                  },
                                },
                                null
                              )),
                              e.bindListners();
                          }),
                          (e.dataChannel.onclose = function () {
                            console.log("Data Channel Closed on Client"),
                              (e.dataChannelConnected = !1),
                              r.disconnect(),
                              e.listners.forEach(function (e) {
                                e.element.removeEventListener(e.event, e.fn);
                              });
                          });
                      });
                  }
                  "candidate" === i.type &&
                    (console.log("Processing ICE"),
                    e.peer.addIceCandidate(new RTCIceCandidate(i.value)));
                }),
                (this.socket.onclose = function () {
                  console.log("Screen Sharing Socket Close");
                });
            }
          }),
          (e.prototype.publish = function (e) {
            this.dataChannelConnected &&
              this.dataChannel.send(JSON.stringify(e));
          }),
          (e.prototype.subscribe = function (e) {
            this.subscriptions.push(e);
          }),
          (e.prototype.close = function () {
            "OFF" !== this.state &&
              ((this.state = "OFF"),
              this.socket.close(),
              (this.socket = null),
              (this.dataChannelConnected = !1),
              this.peer.close(),
              (this.peer = null),
              (this.dataChannel = null));
          }),
          e
        );
      })(),
      u = !1;
    function f(e) {
      var t = e.type,
        r = e.payload;
      if ("mouse" == t) {
        var i =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
          n =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight,
          a = (r.x / r.width) * i,
          o = (r.y / r.height) * n;
        (h.style.left = a + "px"), (h.style.top = o + "px");
      }
    }
    function p() {
      u && (h.remove(), (u = !1));
    }
    function g(e) {
      e.subscribe(function (t) {
        var r = t.type;
        t.payload;
        "terminate" === r && (e.close(), o(), p());
      }),
        e.subscribe(function (e) {
          var t = e.type,
            r = e.payload;
          "scroll" === t &&
            (document.documentElement.scrollTop = document.body.scrollTop =
              r.scroll);
        }),
        e.subscribe(function (e) {
          var t = e.type,
            r = e.payload;
          if ("click" == t) {
            var i = document.createEvent("MouseEvent"),
              n =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth,
              a =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight,
              o = (r.clickX / r.width) * n,
              s = (r.clickY / r.height) * a,
              h = document.elementFromPoint(o, s);
            console.log(h),
              i.initMouseEvent(
                "click",
                !0,
                !0,
                window,
                null,
                r.clickX,
                r.clickY,
                0,
                0,
                !1,
                !1,
                !1,
                !1,
                0,
                null
              ),
              h.dispatchEvent(i);
          }
        }),
        e.subscribe(function (t) {
          var r = t.type;
          t.payload;
          "mouse" === r &&
            (function (e, t) {
              !1 === u &&
                (((h = document.createElement("div")).id =
                  "ClientScreenSharingCursor"),
                (h.innerHTML = "X"),
                (h.style.position = "absolute"),
                (h.style.pointerEvents = "none"),
                (h.style.height = "20px"),
                (h.style.width = "20px"),
                e.appendChild(h),
                (u = !0),
                setTimeout(function () {
                  console.log("Sending Visibility Event"),
                    t.publish({
                      type: "setMouseVisibility",
                      payload: { msg: "To make the agent cursor invisible" },
                    });
                }, 200),
                t.subscribe(f));
            })(document.body, e);
        });
    }
    window.addEventListener("DOMContentLoaded", function () {
      var e = new d();
      !(function (e) {
        e.addListener({
          element: window,
          event: "scroll",
          fn: function () {
            var t =
              document.documentElement.scrollTop || document.body.scrollTop;
            e.publish({ type: "scroll", payload: { scroll: t } });
          },
        }),
          e.addListener({
            element: document,
            event: "mousemove",
            fn: function (t) {
              var r =
                  window.innerWidth ||
                  document.documentElement.clientWidth ||
                  document.body.clientWidth,
                i =
                  window.innerHeight ||
                  document.documentElement.clientHeight ||
                  document.body.clientHeight,
                n = { x: t.pageX, y: t.pageY, width: r, height: i };
              e.publish({ type: "mouse", payload: n });
            },
          });
      })(e),
        g(e),
        s(document.body),
        n.addEventListener("click", function () {
          console.log("start"), e.open();
        }),
        a.addEventListener("click", function () {
          console.log("end"),
            e.publish({
              type: "terminate",
              payload: { msg: "Client terminates connection" },
            }),
            e.close(),
            o(),
            p();
        });
    });
  },
]);
