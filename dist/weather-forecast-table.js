/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, q = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = Symbol(), G = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== F)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (q && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = G.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && G.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const gt = (r) => new ht(typeof r == "string" ? r : r + "", void 0, F), ct = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new ht(e, r, F);
}, yt = (r, t) => {
  if (q)
    r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const s = document.createElement("style"), i = D.litNonce;
      i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
    }
}, Q = q ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return gt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: mt, defineProperty: bt, getOwnPropertyDescriptor: At, getOwnPropertyNames: vt, getOwnPropertySymbols: wt, getPrototypeOf: St } = Object, g = globalThis, X = g.trustedTypes, Et = X ? X.emptyScript : "", B = g.reactiveElementPolyfillSupport, T = (r, t) => r, k = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Et : null;
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
} }, J = (r, t) => !mt(r, t), Y = { attribute: !0, type: String, converter: k, reflect: !1, hasChanged: J };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class v extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && bt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = At(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(n) {
      const h = i == null ? void 0 : i.call(this);
      o.call(this, n), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties")))
      return;
    const t = St(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, s = [...vt(e), ...wt(e)];
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
        e.unshift(Q(i));
    } else
      t !== void 0 && e.push(Q(t));
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
    return yt(t, this.constructor.elementStyles), t;
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
    var o;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : k).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), h = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : k;
      this._$Em = i, this[i] = h.fromAttribute(e, n.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? J)(this[t], e))
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
        for (const [o, n] of this._$Ep)
          this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [o, n] of i)
          n.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], n);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
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
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[T("elementProperties")] = /* @__PURE__ */ new Map(), v[T("finalized")] = /* @__PURE__ */ new Map(), B == null || B({ ReactiveElement: v }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, I = U.trustedTypes, tt = I ? I.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, lt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, dt = "?" + f, Pt = `<${dt}>`, b = document, x = () => b.createComment(""), M = (r) => r === null || typeof r != "object" && typeof r != "function", ut = Array.isArray, Ct = (r) => ut(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", z = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, st = />/g, y = RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), it = /'/g, rt = /"/g, pt = /^(?:script|style|textarea|title)$/i, Tt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = Tt(1), E = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), m = b.createTreeWalker(b, 129);
function $t(r, t) {
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return tt !== void 0 ? tt.createHTML(t) : t;
}
const Ut = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : "", n = C;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let d, u, c = -1, $ = 0;
    for (; $ < a.length && (n.lastIndex = $, u = n.exec(a), u !== null); )
      $ = n.lastIndex, n === C ? u[1] === "!--" ? n = et : u[1] !== void 0 ? n = st : u[2] !== void 0 ? (pt.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = y) : u[3] !== void 0 && (n = y) : n === y ? u[0] === ">" ? (n = i ?? C, c = -1) : u[1] === void 0 ? c = -2 : (c = n.lastIndex - u[2].length, d = u[1], n = u[3] === void 0 ? y : u[3] === '"' ? rt : it) : n === rt || n === it ? n = y : n === et || n === st ? n = C : (n = y, i = void 0);
    const _ = n === y && r[h + 1].startsWith("/>") ? " " : "";
    o += n === C ? a + Pt : c >= 0 ? (s.push(d), a.slice(0, c) + lt + a.slice(c) + f + _) : a + f + (c === -2 ? h : _);
  }
  return [$t(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [d, u] = Ut(t, e);
    if (this.el = O.createElement(d, s), m.currentNode = this.el.content, e === 2) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const c of i.getAttributeNames())
            if (c.endsWith(lt)) {
              const $ = u[n++], _ = i.getAttribute(c).split(f), N = /([.?@])?(.*)/.exec($);
              a.push({ type: 1, index: o, name: N[2], strings: _, ctor: N[1] === "." ? Mt : N[1] === "?" ? Ot : N[1] === "@" ? Ht : L }), i.removeAttribute(c);
            } else
              c.startsWith(f) && (a.push({ type: 6, index: o }), i.removeAttribute(c));
        if (pt.test(i.tagName)) {
          const c = i.textContent.split(f), $ = c.length - 1;
          if ($ > 0) {
            i.textContent = I ? I.emptyScript : "";
            for (let _ = 0; _ < $; _++)
              i.append(c[_], x()), m.nextNode(), a.push({ type: 2, index: ++o });
            i.append(c[$], x());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === dt)
          a.push({ type: 2, index: o });
        else {
          let c = -1;
          for (; (c = i.data.indexOf(f, c + 1)) !== -1; )
            a.push({ type: 7, index: o }), c += f.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function P(r, t, e = r, s) {
  var n, h;
  if (t === E)
    return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = M(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = P(r, i._$AS(r, t.values), i, s)), t;
}
class xt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? b).importNode(e, !0);
    m.currentNode = i;
    let o = m.nextNode(), n = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new H(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new Rt(o, this, t)), this._$AV.push(d), a = s[++h];
      }
      n !== (a == null ? void 0 : a.index) && (o = m.nextNode(), n++);
    }
    return m.currentNode = b, i;
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
    this.type = 2, this._$AH = l, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = P(this, t, e), M(t) ? t === l || t == null || t === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ct(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== l && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement($t(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i)
      this._$AH.p(e);
    else {
      const n = new xt(i, this), h = n.u(this.options);
      n.p(e), this.T(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    ut(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t)
      i === e.length ? e.push(s = new H(this.S(x()), this.S(x()), this, this.options)) : s = e[i], s._$AI(o), i++;
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
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = l;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0)
      t = P(this, t, e, 0), n = !M(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const h = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        d = P(this, h[s + a], e, a), d === E && (d = this._$AH[a]), n || (n = !M(d) || d !== this._$AH[a]), d === l ? t = l : t !== l && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === l ? void 0 : t;
  }
}
class Ot extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== l);
  }
}
class Ht extends L {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? l) === E)
      return;
    const s = this._$AH, i = t === l && s !== l || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== l && (s === l || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Rt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const V = U.litHtmlPolyfillSupport;
V == null || V(O, H), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.1.3");
const Nt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new H(t.insertBefore(x(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class w extends v {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Nt(e, this.renderRoot, this.renderOptions);
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
    return E;
  }
}
var at;
w._$litElement$ = !0, w.finalized = !0, (at = globalThis.litElementHydrateSupport) == null || at.call(globalThis, { LitElement: w });
const W = globalThis.litElementPolyfillSupport;
W == null || W({ LitElement: w });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.5");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = { attribute: !0, type: String, converter: k, reflect: !1, hasChanged: J }, kt = (r = Dt, t, e) => {
  const { kind: s, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), o.set(e.name, r), s === "accessor") {
    const { name: n } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(n, a, r);
    }, init(h) {
      return h !== void 0 && this.P(n, void 0, r), h;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(h) {
      const a = this[n];
      t.call(this, h), this.requestUpdate(n, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function K(r) {
  return (t, e) => typeof e == "object" ? kt(r, t, e) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, n ? { ...s, wrapped: !0 } : s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Z(r) {
  return K({ ...r, state: !0, attribute: !1 });
}
const S = (r) => r <= 0 ? 0 : r > 255 ? 255 : r, ot = (r, t, e) => {
  var s = Math.round((r * 299 + t * 587 + e * 114) / 1e3);
  return s > 128 ? "black" : "white";
}, It = (r, t = -10, e = 42) => {
  if (t > e)
    throw new Error("minimum cannot be greater than maximum");
  r < t ? r = t : r > e && (r = e);
  const s = (r - t) / (e - t);
  let i = 255, o = 255, n = 255;
  const h = [1 / 4, 1 / 4 * 2, 1 / 4 * 3];
  return s <= h[0] ? (i = 0, o = 4 * s * 255.999, n = 255) : s > h[0] && s <= h[1] ? (i = 0, o = 255, n = 512 - 4 * s * 255.999) : s > h[1] && s <= h[2] ? (i = 512 - 4 * (1 - s) * 255.999, o = 255, n = 0) : (i = 255, o = 4 * (1 - s) * 255.999, n = 0), {
    r: S(Math.trunc(i)),
    g: S(Math.trunc(o)),
    b: S(Math.trunc(n))
  };
}, jt = (r, t = 0.1, e = 4) => {
  if (t > e)
    throw new Error("minimum cannot be greater than maximum");
  r < t ? r = t : r > e && (r = e);
  const s = 255 - Math.floor(255 / (e - t) * r);
  return {
    r: S(Math.trunc(0)),
    g: S(Math.trunc(s)),
    b: S(Math.trunc(255))
  };
}, Lt = {
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
}, Bt = (r) => Lt[r];
var zt = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, ft = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Vt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && zt(t, e, i), i;
};
let j = class extends w {
  constructor() {
    super(...arguments), this.forecast = [], this.getStyleTemp = (r) => {
      const { r: t, g: e, b: s } = It(r);
      return `color:${ot(t, e, s)};background-color:rgb(${t},${e},${s})`;
    }, this.getStylePrecipitation = (r) => {
      if (!r)
        return;
      const { r: t, g: e, b: s } = jt(r);
      return `color:${ot(t, e, s)};background-color:rgb(${t},${e},${s})`;
    }, this.formatData = (r) => {
      const t = new Date(r.datetime);
      return {
        day: t.toLocaleString("fr-FR", {
          weekday: "short",
          day: "2-digit"
        }),
        time: t.toLocaleString("fr-FR", {
          timeStyle: "short"
        }),
        wind_bearing: r.wind_bearing,
        temperature: Math.round(r.temperature),
        condition: r.condition,
        humidity: r.humidity,
        precipitation: r.precipitation,
        windBearing: r.wind_bearing,
        windSpeed: Math.round(r.wind_speed)
      };
    }, this.renderDay = (r, t, e) => e.map((s, i) => this.renderItem(i, r, e.length, s, t)), this.renderItem = (r, t, e, s, i) => p`<tr class="${i}">
            ${r == 0 ? p`<td rowspan="${e}">${t}</td>` : p``}
            <td>${s.time}</td>
            <td class="temperature" style="${this.getStyleTemp(s.temperature)}">${s.temperature}°C</td>
            <td> ${s.windBearing ? p`<div style="transform:rotate(${(s.windBearing || 0) + 180}deg)">
                                            <ha-icon icon="mdi:navigation" ></ha-icon>
                                          </div>` : l}
        </td>
            <td>${s.windSpeed || "-"}</td>
            <td style="${this.getStylePrecipitation(s.precipitation)}">${s.precipitation || "-"}${s.precipitation ? " mm" : ""}</td>
            <td>${s.humidity} %</td>
            <td class="condition"><ha-icon class="weatherIcon" icon="mdi:${Bt(s.condition)}"></ha-icon></td>
        </tr>`, this.groupByDay = (r) => r.reduce((t, e) => {
      const { day: s } = e;
      return t[s] = t[s] ?? [], t[s].push(e), t;
    }, {});
  }
  render() {
    const r = this.forecast.map(this.formatData), t = this.groupByDay(r);
    let e = p``, s = 0;
    for (const i in t)
      s++, e = p`${e}${this.renderDay(i, s % 2 ? "even" : "odd", t[i])}`;
    return p`<table class="forecastTable">
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
            ${e}
            </tbody>
        </table>`;
  }
};
j.styles = ct`
    .temperature{
      color:#333;
    }

    .condition{
      color: var(--paper-item-icon-color)
    }

    .forecastTable{
      width:100%;
    }
    .forecastTable tr{
      text-align:center;
    }
    .forecastTable tr.odd{
      background-color: var(--table-row-background-color);
      }
    .forecastTable tr.even{
      background-color:var(--table-row-alternative-background-color);
    }
    .weatherIcon[icon="mdi:weather-lightning"],
     .weatherIcon[icon="mdi:weather-lightning-rainy"],
      .weatherIcon[icon="mdi:weather-hail"]{
      color:orange;
    }  
  `;
ft([
  K({ type: Array })
], j.prototype, "forecast", 2);
j = ft([
  _t("forecast-table")
], j);
var Wt = Object.defineProperty, qt = Object.getOwnPropertyDescriptor, R = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? qt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && Wt(t, e, i), i;
};
let A = class extends w {
  constructor() {
    super(...arguments), this._forecast = [];
  }
  setConfig(r) {
    if (!(r != null && r.entity))
      throw new Error("Le paramètre 'entity' est obligatoire");
    this._unsubscribe(), this._config = r, this._forecast = [], this._error = void 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe();
  }
  willUpdate(r) {
    this._subscribe();
  }
  _subscribe() {
    if (this._unsub || !this.hass || !this._config)
      return;
    const { entity: r, forecast_type: t = "hourly" } = this._config;
    if (!this.hass.states[r]) {
      this._error = `Entité introuvable : ${r}`;
      return;
    }
    this._unsub = this.hass.connection.subscribeMessage(
      (e) => {
        this._forecast = e.forecast ?? [], this._error = void 0;
      },
      { type: "weather/subscribe_forecast", forecast_type: t, entity_id: r }
    ), this._unsub.catch((e) => {
      this._unsub = void 0, this._error = (e == null ? void 0 : e.message) ?? "Impossible de récupérer les prévisions";
    });
  }
  _unsubscribe() {
    var r;
    (r = this._unsub) == null || r.then((t) => t()).catch(() => {
    }), this._unsub = void 0;
  }
  render() {
    return !this._config || !this.hass ? p`Pas de configuration` : this._error ? p`<ha-card><div class="card-content">${this._error}</div></ha-card>` : p`<ha-card header="${this._config.name ?? ""}">
      <div class="card-content">
        <forecast-table .forecast="${this._forecast}"></forecast-table>
      </div>
    </ha-card>`;
  }
};
A.styles = ct``;
R([
  K({ attribute: !1 })
], A.prototype, "hass", 2);
R([
  Z()
], A.prototype, "_config", 2);
R([
  Z()
], A.prototype, "_forecast", 2);
R([
  Z()
], A.prototype, "_error", 2);
A = R([
  _t("weather-forecast-table")
], A);
export {
  A as WeatherForecastTable
};
