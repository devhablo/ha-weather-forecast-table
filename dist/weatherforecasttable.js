/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, W = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = Symbol(), K = /* @__PURE__ */ new WeakMap();
let nt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== q)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (W && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const dt = (r) => new nt(typeof r == "string" ? r : r + "", void 0, q), pt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new nt(e, r, q);
}, ut = (r, t) => {
  if (W)
    r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const s = document.createElement("style"), i = M.litNonce;
      i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
    }
}, Z = W ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return dt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $t, defineProperty: _t, getOwnPropertyDescriptor: ft, getOwnPropertyNames: yt, getOwnPropertySymbols: gt, getPrototypeOf: mt } = Object, f = globalThis, G = f.trustedTypes, At = G ? G.emptyScript : "", L = f.reactiveElementPolyfillSupport, E = (r, t) => r, R = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? At : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, F = (r, t) => !$t(r, t), Q = { attribute: !0, type: String, converter: R, reflect: !1, hasChanged: F };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), f.litPropertyMetadata ?? (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class A extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Q) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && _t(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(o) {
      const a = i == null ? void 0 : i.call(this);
      n.call(this, o), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(E("elementProperties")))
      return;
    const t = mt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(E("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
      const e = this.properties, s = [...yt(e), ...gt(e)];
      for (const i of s)
        this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [s, i] of e)
          this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s)
        e.unshift(Z(i));
    } else
      t !== void 0 && e.push(Z(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys())
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ut(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EC(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : R).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((n = o.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? o.converter : R;
      this._$Em = i, this[i] = a.fromAttribute(e, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? F)(this[t], e))
        return;
      this.P(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep)
          this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [n, o] of i)
          o.wrapped !== !0 || this._$AL.has(n) || this[n] === void 0 || this.P(n, this[n], o);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EU();
    } catch (i) {
      throw t = !1, this._$EU(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[E("elementProperties")] = /* @__PURE__ */ new Map(), A[E("finalized")] = /* @__PURE__ */ new Map(), L == null || L({ ReactiveElement: A }), (f.reactiveElementVersions ?? (f.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis, N = C.trustedTypes, X = N ? N.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ot = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, ht = "?" + _, vt = `<${ht}>`, m = document, U = () => m.createComment(""), x = (r) => r === null || typeof r != "object" && typeof r != "function", at = Array.isArray, wt = (r) => at(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", j = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Y = /-->/g, tt = />/g, y = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), et = /'/g, st = /"/g, ct = /^(?:script|style|textarea|title)$/i, bt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), I = bt(1), v = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), it = /* @__PURE__ */ new WeakMap(), g = m.createTreeWalker(m, 129);
function lt(r, t) {
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return X !== void 0 ? X.createHTML(t) : t;
}
const St = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : "", o = S;
  for (let a = 0; a < e; a++) {
    const h = r[a];
    let l, p, c = -1, u = 0;
    for (; u < h.length && (o.lastIndex = u, p = o.exec(h), p !== null); )
      u = o.lastIndex, o === S ? p[1] === "!--" ? o = Y : p[1] !== void 0 ? o = tt : p[2] !== void 0 ? (ct.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = y) : p[3] !== void 0 && (o = y) : o === y ? p[0] === ">" ? (o = i ?? S, c = -1) : p[1] === void 0 ? c = -2 : (c = o.lastIndex - p[2].length, l = p[1], o = p[3] === void 0 ? y : p[3] === '"' ? st : et) : o === st || o === et ? o = y : o === Y || o === tt ? o = S : (o = y, i = void 0);
    const $ = o === y && r[a + 1].startsWith("/>") ? " " : "";
    n += o === S ? h + vt : c >= 0 ? (s.push(l), h.slice(0, c) + ot + h.slice(c) + _ + $) : h + _ + (c === -2 ? a : $);
  }
  return [lt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class T {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, h = this.parts, [l, p] = St(t, e);
    if (this.el = T.createElement(l, s), g.currentNode = this.el.content, e === 2) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = g.nextNode()) !== null && h.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const c of i.getAttributeNames())
            if (c.endsWith(ot)) {
              const u = p[o++], $ = i.getAttribute(c).split(_), O = /([.?@])?(.*)/.exec(u);
              h.push({ type: 1, index: n, name: O[2], strings: $, ctor: O[1] === "." ? Ct : O[1] === "?" ? Pt : O[1] === "@" ? Ut : k }), i.removeAttribute(c);
            } else
              c.startsWith(_) && (h.push({ type: 6, index: n }), i.removeAttribute(c));
        if (ct.test(i.tagName)) {
          const c = i.textContent.split(_), u = c.length - 1;
          if (u > 0) {
            i.textContent = N ? N.emptyScript : "";
            for (let $ = 0; $ < u; $++)
              i.append(c[$], U()), g.nextNode(), h.push({ type: 2, index: ++n });
            i.append(c[u], U());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === ht)
          h.push({ type: 2, index: n });
        else {
          let c = -1;
          for (; (c = i.data.indexOf(_, c + 1)) !== -1; )
            h.push({ type: 7, index: n }), c += _.length - 1;
        }
      n++;
    }
  }
  static createElement(t, e) {
    const s = m.createElement("template");
    return s.innerHTML = t, s;
  }
}
function w(r, t, e = r, s) {
  var o, a;
  if (t === v)
    return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = x(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = w(r, i._$AS(r, t.values), i, s)), t;
}
class Et {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? m).importNode(e, !0);
    g.currentNode = i;
    let n = g.nextNode(), o = 0, a = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new H(n, n.nextSibling, this, t) : h.type === 1 ? l = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (l = new xt(n, this, t)), this._$AV.push(l), h = s[++a];
      }
      o !== (h == null ? void 0 : h.index) && (n = g.nextNode(), o++);
    }
    return g.currentNode = m, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class H {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = w(this, t, e), x(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== v && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : wt(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== d && x(this._$AH) ? this._$AA.nextSibling.data = t : this.T(m.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = T.createElement(lt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i)
      this._$AH.p(e);
    else {
      const o = new Et(i, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = it.get(t.strings);
    return e === void 0 && it.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    at(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t)
      i === e.length ? e.push(s = new H(this.S(U()), this.S(U()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class k {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0)
      t = w(this, t, e, 0), o = !x(t) || t !== this._$AH && t !== v, o && (this._$AH = t);
    else {
      const a = t;
      let h, l;
      for (t = n[0], h = 0; h < n.length - 1; h++)
        l = w(this, a[s + h], e, h), l === v && (l = this._$AH[h]), o || (o = !x(l) || l !== this._$AH[h]), l === d ? t = d : t !== d && (t += (l ?? "") + n[h + 1]), this._$AH[h] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ct extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Pt extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Ut extends k {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = w(this, t, e, 0) ?? d) === v)
      return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class xt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    w(this, t);
  }
}
const z = C.litHtmlPolyfillSupport;
z == null || z(T, H), (C.litHtmlVersions ?? (C.litHtmlVersions = [])).push("3.1.3");
const Tt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new H(t.insertBefore(U(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class P extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Tt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return v;
  }
}
var rt;
P._$litElement$ = !0, P.finalized = !0, (rt = globalThis.litElementHydrateSupport) == null || rt.call(globalThis, { LitElement: P });
const B = globalThis.litElementPolyfillSupport;
B == null || B({ LitElement: P });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.5");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = { attribute: !0, type: String, converter: R, reflect: !1, hasChanged: F }, Mt = (r = Ot, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const h = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, h, r);
    }, init(a) {
      return a !== void 0 && this.P(o, void 0, r), a;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(a) {
      const h = this[o];
      t.call(this, a), this.requestUpdate(o, h, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(r) {
  return (t, e) => typeof e == "object" ? Mt(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o ? { ...s, wrapped: !0 } : s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
const V = (r) => r <= 0 ? 0 : r > 255 ? 255 : r, Rt = (r, t = -20, e = 50) => {
  if (t > e)
    throw new Error("minimum cannot be greater than maximum");
  r < t ? r = t : r > e && (r = e);
  const s = (r - t) / (e - t);
  let i = 255, n = 255, o = 255;
  const a = [1 / 4, 1 / 4 * 2, 1 / 4 * 3];
  return s <= a[0] ? (i = 0, n = 4 * s * 255.999, o = 255) : s > a[0] && s <= a[1] ? (i = 0, n = 255, o = 512 - 4 * s * 255.999) : s > a[1] && s <= a[2] ? (i = 512 - 4 * (1 - s) * 255.999, n = 255, o = 0) : (i = 255, n = 4 * (1 - s) * 255.999, o = 0), {
    r: V(Math.trunc(i)),
    g: V(Math.trunc(n)),
    b: V(Math.trunc(o))
  };
}, Nt = {
  clear: "weather-sunny",
  "clear-night": "weather-night",
  cloudy: "weather-cloudy",
  fog: "weather-fog",
  hail: "weather-hail",
  lightning: "weather-lightning",
  "lightning-rainy": "weather-lightning-rainy",
  partlycloudy: "weather-partly-cloudy",
  pouring: "weather-pouring",
  rainy: "weather-rainy",
  snowy: "weather-snowy",
  "snowy-rainy": "weather-snowy-rainy",
  sunny: "weather-sunny",
  windy: "weather-windy",
  "windy-variant": "weather-windy"
}, kt = (r) => Nt[r];
var Dt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, D = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Lt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Dt(t, e, i), i;
};
let b = class extends P {
  constructor() {
    super(...arguments), this.docsHint = "Click on the Vite and Lit logos to learn more";
  }
  setConfig(r) {
    this._config = r;
  }
  render() {
    if (!this._config || !this.hass)
      return I``;
    const r = this._config.entity, e = this.hass.states[r].attributes.forecast, s = (n) => {
      const { r: o, g: a, b: h } = Rt(n);
      return `rgb(${o},${a},${h})`;
    };
    var i = e.map((n) => {
      const o = new Date(n.datetime);
      return {
        day: o.toLocaleString("fr-FR", {
          weekday: "long",
          day: "numeric"
        }),
        time: o.toLocaleString("fr-FR", {
          timeStyle: "short"
        }),
        wind_bearing: n.wind_bearing,
        temperature: n.temperature,
        condition: n.condition,
        humidity: n.humidity,
        precipitation: n.precipitation,
        windBearing: n.wind_bearing,
        windSpeed: n.wind_speed
      };
    }).map((n) => I`<tr>
					<td>${n.day}</td>
					<td>${n.time}</td>
					<td style="color:#6e6e6e;background-color:${s(n.temperature)}">${n.temperature}</td>
					<td>  
            <div style="display:${n.windBearing ? "inline-block" : "hide"}; transform:rotate(${(n.windBearing || 0) + 180}deg)">
              <ha-icon icon="mdi:arrow-up" ></ha-icon>
            </div>
          </td>
					<td>${n.windSpeed || "-"}</td>
					<td>${n.precipitation || "-"}${n.precipitation ? "mm" : ""}</td>
					<td>${n.humidity}%</td>
					<td><ha-icon icon="mdi:${kt(n.condition)}"></ha-icon></td>
				</tr>`);
    return I` <ha-card header="Example-card">
      <div class="card-content">
        <table style="width:100%">
          <thead>
            <tr>
              <th rowspan="2">Jour</th>
              <th rowspan="2">Heure</th>
              <th rowspan="2">Temp.</th>
              <th colspan="2">Vent km/h</th>
              <th rowspan="2">Pluie</th>
              <th rowspan="2">Humidité</th>
              <th rowspan="2">Temps</th>
            </tr>
            <tr>
              <th>Dir.</th>
              <th>Vit.</th>
            </tr>
          </thead>
          <tbody>
            ${i}
          </tbody>
        </table>
      </div>
    </ha-card>`;
  }
};
b.styles = pt``;
D([
  J()
], b.prototype, "docsHint", 2);
D([
  J()
], b.prototype, "hass", 2);
D([
  J()
], b.prototype, "_config", 2);
b = D([
  Ht("content-card-example")
], b);
export {
  b as MyElement
};
