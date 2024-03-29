﻿//Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.
/**
 * Office UI Fabric JS 1.4.0
 * The JavaScript front-end framework for building experiences for Office 365.
 **/
var fabric;
! function (e) {
    var t = 33,
        i = function () {
            function e() { }
            return e.transition = function (t, i) {
                var n = {
                    element: t,
                    props: i,
                    transformations: {}
                };
                e._animationObjects.push(n), e._parseProperties(n), e._createTransition(n), setTimeout(e._setProperties, 0, n), e._setCallback(n)
            }, e.animation = function (t, i, n) {
                var s = {
                    element: t,
                    keyframes: i,
                    props: n
                };
                e._animationObjects.push(s), e._parseProperties(s), e._createAnimation(s), e._setCallback(s)
            }, e.scrollTo = function (t, i) {
                var n = {
                    element: t,
                    props: i,
                    step: 0
                };
                e._setScrollProperties(n), n.props.delay ? setTimeout(e._animationObjects, 1e3 * n.props.delay, n) : e._animateScroll(n), e._animationObjects.push(n)
            }, e._setScrollProperties = function (e) {
                e.beginTop = e.element.scrollTop, e.change = e.props.top - e.beginTop, e.props.duration = 1e3 * e.props.duration
            }, e._parseProperties = function (t) {
                var i = e._timeProps.concat(e._callbackProps);
                t.tweenObj = {};
                for (var n in t.props) e._contains(i, n) ? t[n] = t.props[n] : t.tweenObj[n] = t.props[n]
            }, e._animateScroll = function (i) {
                var n = i.props.duration / t,
                    s = e._easeOutExpo(i.step++, i.beginTop, i.change, n);
                i.element.scrollTop = s, i.step >= n ? (i.element.scrollTop = i.props.top, e._executeCallback(i.props), e._removeAnimationObject(i)) : setTimeout(function () {
                    requestAnimationFrame(function () {
                        e._animateScroll(i)
                    })
                }, t)
            }, e._createTransition = function (t) {
                var i = t.duration || 0,
                    n = t.delay || 0;
                t.element.style.transitionProperty = e._getTransitionProperties(t.tweenObj), t.element.style.transitionDuration = i.toString() + "s", t.element.style.transitionTimingFunction = t.ease || "linear", t.element.style.transitionDelay = n.toString() + "s"
            }, e._createAnimation = function (e) {
                var t = e.duration || 0,
                    i = e.delay || 0;
                e.element.style.animationName = e.keyframes, e.element.style.animationDuration = t.toString() + "s", e.element.style.animationTimingFunction = e.ease || "linear", e.element.style.animationDelay = i.toString() + "s", e.element.style.animationFillMode = "both"
            }, e._getTransitionProperties = function (t) {
                var i = !1,
                    n = !1,
                    s = [];
                for (var o in t) e._contains(e._transformProps, o) ? i = !0 : e._contains(e._filters, o) ? n = !0 : s.push(e._camelCaseToDash(o));
                return i && s.push("transform"), n && (s.push("-webkit-filter"), s.push("filter")), s.join(", ")
            }, e._setProperties = function (t) {
                for (var i in t.tweenObj) e._contains(e._transformProps, i) ? e._setTransformValues(t, i) : e._contains(e._filters, i) ? e._setFilterValues(t, i) : e._setRegularValues(t, i);
                t.transformations && e._setTransformations(t)
            }, e._setRegularValues = function (e, t) {
                var i = e.tweenObj[t];
                i.toString().indexOf("%") === -1 && (i += "opacity" !== t && "backgroundColor" !== t && "boxShadow" !== t ? "px" : ""), e.element.style[t] = i
            }, e._setFilterValues = function (t, i) {
                var n = t.tweenObj[i];
                n = "hueRotate" === i ? "(" + n + "deg)" : "blur" === i ? "(" + n + "px)" : "(" + n + "%)", i = e._camelCaseToDash(i), t.element.style.webkitFilter = i + n, t.element.style.filter = i + n
            }, e._setTransformValues = function (e, t) {
                /x|y|z|scaleX|scaleY|scaleZ|rotate|rotateX|rotateY|rotateZ|skewX|skewY/.test(t) && (e.transformations[t] = e.tweenObj[t])
            }, e._setTransformations = function (e) {
                var t = "",
                    i = "",
                    n = "",
                    s = "",
                    o = e.transformations;
                s += void 0 !== o.x && o.x ? "translateX(" + o.x + "px) " : "", s += void 0 !== o.y && o.y ? "translateY(" + o.y + "px) " : "", s += void 0 !== o.z && o.z ? "translateZ(" + o.z + "px) " : "", t += void 0 !== o.rotate && o.rotate ? "rotate(" + o.rotate + "deg) " : "", t += void 0 !== o.rotateX && o.rotateX ? "rotateX(" + o.rotateX + "deg) " : "", t += void 0 !== o.rotateY && o.rotateY ? "rotate(" + o.rotateY + "deg) " : "", t += void 0 !== o.rotateZ && o.rotateZ ? "rotate(" + o.rotateZ + "deg) " : "", i += void 0 !== o.scaleX && o.scaleX ? "scaleX(" + o.scaleX + ") " : "", i += void 0 !== o.scaleY && o.scaleY ? "scaleY(" + o.scaleY + ") " : "", i += void 0 !== o.scaleZ && o.scaleZ ? "scaleZ(" + o.scaleZ + ") " : "", n += void 0 !== o.skewX && o.skewX ? "skewX(" + o.skewX + "deg) " : "", n += void 0 !== o.skewY && o.skewY ? "skewY(" + o.skewY + "deg) " : "", e.element.style.transform = s + t + i + n
            }, e._setCallback = function (t) {
                t.element.addEventListener("webkitTransitionEnd", e._complete, !1), t.element.addEventListener("transitionend", e._complete, !1), t.element.addEventListener("webkitAnimationEnd", e._complete, !1), t.element.addEventListener("animationend", e._complete, !1)
            }, e._complete = function (t) {
                t.target.removeEventListener("webkitTransitionEnd", e._complete), t.target.removeEventListener("transitionend", e._complete), t.target.removeEventListener("webkitAnimationEnd", e._complete), t.target.removeEventListener("animationend", e._complete);
                var i = e._getAnimationObjByElement(t.target);
                e._executeCallback(i), e._removeAnimationObject(i)
            }, e._getAnimationObjByElement = function (t) {
                for (var i = e._animationObjects.length; i--;)
                    if (e._animationObjects[i].element === t) return e._animationObjects[i];
                return null
            }, e._removeAnimationObject = function (t) {
                for (var i = e._animationObjects.length; i--;) e._animationObjects[i] === t && e._animationObjects.splice(i, 1)
            }, e._executeCallback = function (e) {
                if (e.onEnd) {
                    var t = e.onEndArgs || [];
                    e.onEnd.apply(null, t)
                }
            }, e._contains = function (e, t) {
                for (var i = e.length; i--;)
                    if (t === e[i]) return !0;
                return !1
            }, e._camelCaseToDash = function (e) {
                return e.replace(/\W+/g, "-").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase()
            }, e._easeOutExpo = function (e, t, i, n) {
                return e === n ? t + i : i * (-Math.pow(2, -10 * e / n) + 1) + t
            }, e._transformProps = ["x", "y", "z", "scaleX", "scaleY", "scaleZ", "rotate", "rotateX", "rotateY", "rotateZ", "skewX", "skewY"], e._filters = ["blur", "brightness", "contrast", "dropShadow", "grayscale", "hueRotate", "invert", "saturate", "sepia"], e._timeProps = ["duration", "ease", "delay"], e._callbackProps = ["onEnd", "onEndArgs"], e._animationObjects = [], e
        }();
    e.Animate = i
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function e() { }
        return e.QUAD_EASE_IN = e.CB + "(0.550, 0.085, 0.680, 0.530)", e.CUBIC_EASE_IN = e.CB + "(0.550, 0.055, 0.675, 0.190)", e.QUART_EASE_IN = e.CB + "(0.895, 0.030, 0.685, 0.220)", e.QUINT_EASE_IN = e.CB + "(0.755, 0.050, 0.855, 0.060)", e.SINE_EASE_IN = e.CB + "(0.470, 0, 0.745, 0.715)", e.EXPO_EASE_IN = e.CB + "(0.950, 0.050, 0.795, 0.035)", e.CIRC_EASE_IN = e.CB + "(0.600, 0.040, 0.980, 0.335)", e.BACK_EASE_IN = e.CB + "(0.600, 0.040, 0.980, 0.335)", e.QUAD_EASE_OUT = e.CB + "(0.250, 0.460, 0.450, 0.940)", e.CUBIC_EASE_OUT = e.CB + "(0.215, 0.610, 0.355, 1)", e.QUART_EASE_OUT = e.CB + "(0.165, 0.840, 0.440, 1)", e.QUINT_EASE_OUT = e.CB + "(0.230, 1, 0.320, 1)", e.SINE_EASE_OUT = e.CB + "(0.390, 0.575, 0.565, 1)", e.EXPO_EASE_OUT = e.CB + "(0.190, 1, 0.220, 1)", e.CIRC_EASE_OUT = e.CB + "(0.075, 0.820, 0.165, 1)", e.BACK_EASE_OUT = e.CB + "(0.175, 0.885, 0.320, 1.275)", e.QUAD_EASE_IN_OUT = e.CB + "(0.455, 0.030, 0.515, 0.955)", e.CUBIC_EASE_IN_OUT = e.CB + "(0.645, 0.045, 0.355, 1)", e.QUART_EASE_IN_OUT = e.CB + "(0.770, 0, 0.175, 1)", e.QUINT_EASE_IN_OUT = e.CB + "(0.860, 0, 0.070, 1)", e.SINE_EASE_IN_OUT = e.CB + "(0.445, 0.050, 0.550, 0.950)", e.EXPO_EASE_IN_OUT = e.CB + "(1, 0, 0, 1)", e.CIRC_EASE_IN_OUT = e.CB + "(0.785, 0.135, 0.150, 0.860)", e.BACK_EASE_IN_OUT = e.CB + "(0.680, -0.550, 0.265, 1.550)", e.CB = "cubic-bezier", e
    }();
    e.Ease = t
}(fabric || (fabric = {})),
    function () {
        function e(e, t) {
            t = t || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
        }
        e.prototype = Event.prototype, window.CustomEvent = e
    }();
var fabric;
! function (e) {
    "use strict";
    var t = function () {
        function e(e, t) {
            this._container = e, t && (this._clickHandler = t, this._setClick())
        }
        return e.prototype.disposeEvents = function () {
            this._container.removeEventListener("click", this._clickHandler, !1)
        }, e.prototype._setClick = function () {
            this._container.addEventListener("click", this._clickHandler, !1)
        }, e
    }();
    e.Button = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    "use strict";
    var t = function () {
        function e(e) {
            this._currentMaxItems = 0, this._itemCollection = [], this._tabIndex = 2, this.container = e, this._onResize = this._onResize.bind(this), this._openOverflow = this._openOverflow.bind(this), this._overflowKeyPress = this._overflowKeyPress.bind(this), this._closeOverflow = this._closeOverflow.bind(this), this.removeOutlinesOnClick = this.removeOutlinesOnClick.bind(this), this.init()
        }
        return e.prototype.removeOutlinesOnClick = function () {
            this._breadcrumbList.blur()
        }, e.prototype.addItem = function (e, t) {
            this._itemCollection.push({
                text: e,
                link: t
            }), this._updateBreadcrumbs()
        }, e.prototype.removeItemByLabel = function (e) {
            for (var t = this._itemCollection.length; t--;) this._itemCollection[t].text === e && this._itemCollection.splice(t, 1);
            this._updateBreadcrumbs()
        }, e.prototype.removeItemByPosition = function (e) {
            this._itemCollection.splice(e, 1), this._updateBreadcrumbs()
        }, e.prototype.init = function () {
            this._cacheDOM(), this._setListeners(), this._createItemCollection(), this._onResize()
        }, e.prototype._createItemCollection = function () {
            var e, t, i, n, s = this._listItems.length,
                o = 0;
            for (o; o < s; o++) e = this._listItems[o].querySelector(".ms-Breadcrumb-itemLink"), t = e.textContent, i = e.getAttribute("href"), n = parseInt(e.getAttribute("tabindex"), 10), this._itemCollection.push({
                link: i,
                tabIndex: n,
                text: t
            })
        }, e.prototype._onResize = function () {
            this._closeOverflow(null), this._renderList()
        }, e.prototype._renderList = function () {
            var t = window.innerWidth > e.MEDIUM ? 4 : 2;
            t !== this._currentMaxItems && this._updateBreadcrumbs(), this._currentMaxItems = t
        }, e.prototype._updateBreadcrumbs = function () {
            this._tabIndex = 2;
            var t = window.innerWidth > e.MEDIUM ? 4 : 2;
            this._itemCollection.length > t ? this._breadcrumb.classList.add("is-overflow") : this._breadcrumb.classList.remove("is-overflow"), this._addItemsToOverflow(t), this._addBreadcrumbItems(t)
        }, e.prototype._addItemsToOverflow = function (e) {
            var t = this;
            this._resetList(this._contextMenu);
            var i = this._itemCollection.length - e,
                n = this._itemCollection.slice(0, i);
            n.forEach(function (e) {
                var i = document.createElement("li");
                i.className = "ms-ContextualMenu-item";
                var n = document.createElement("a");
                n.className = "ms-ContextualMenu-link", null !== e.link && n.setAttribute("href", e.link), n.setAttribute("tabindex", (t._tabIndex++).toString()), n.textContent = e.text, i.appendChild(n), t._contextMenu.appendChild(i)
            })
        }, e.prototype._addBreadcrumbItems = function (e) {
            this._resetList(this._breadcrumbList);
            var t = this._itemCollection.length - e;
            if (t = t < 0 ? 0 : t, t >= 0)
                for (t; t < this._itemCollection.length; t++) {
                    var i = document.createElement("li"),
                        n = this._itemCollection[t],
                        s = document.createElement("a"),
                        o = document.createElement("i");
                    i.className = "ms-Breadcrumb-listItem", s.className = "ms-Breadcrumb-itemLink", null !== n.link && s.setAttribute("href", n.link), s.setAttribute("tabindex", (this._tabIndex++).toString()), s.textContent = n.text, o.className = "ms-Breadcrumb-chevron ms-Icon ms-IconChevronRight", i.appendChild(s), i.appendChild(o), this._breadcrumbList.appendChild(i)
                }
        }, e.prototype._resetList = function (e) {
            for (; e.firstChild;) e.removeChild(e.firstChild)
        }, e.prototype._openOverflow = function (e) {
            this._overflowMenu.className.indexOf(" is-open") === -1 && (this._overflowMenu.classList.add("is-open"), this.removeOutlinesOnClick(), this._overflowButton.focus())
        }, e.prototype._overflowKeyPress = function (e) {
            13 === e.keyCode && this._openOverflow(e)
        }, e.prototype._closeOverflow = function (e) {
            e && e.target === this._overflowButton || this._overflowMenu.classList.remove("is-open")
        }, e.prototype._cacheDOM = function () {
            this._breadcrumb = this.container, this._breadcrumbList = this._breadcrumb.querySelector(".ms-Breadcrumb-list"), this._listItems = this._breadcrumb.querySelectorAll(".ms-Breadcrumb-listItem"), this._contextMenu = this._breadcrumb.querySelector(".ms-ContextualMenu"), this._overflowButton = this._breadcrumb.querySelector(".ms-Breadcrumb-overflowButton"), this._overflowMenu = this._breadcrumb.querySelector(".ms-Breadcrumb-overflowMenu")
        }, e.prototype._setListeners = function () {
            window.addEventListener("resize", this._onResize, !1), this._overflowButton.addEventListener("click", this._openOverflow, !1), this._overflowButton.addEventListener("keypress", this._overflowKeyPress, !1), document.addEventListener("click", this._closeOverflow, !1), this._breadcrumbList.addEventListener("click", this.removeOutlinesOnClick, !1)
        }, e.MEDIUM = 639, e
    }();
    e.Breadcrumb = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = "is-open",
        i = "is-positioned",
        n = "ms-ContextualHost-main",
        s = "ms-ContextualHost-beak",
        o = "ms-ContextualHost--arrowLeft",
        r = "ms-ContextualHost--arrowTop",
        a = "ms-ContextualHost--arrowBottom",
        c = "ms-ContextualHost--arrowRight",
        l = "ms-ContextualHost--",
        h = 28,
        d = 8,
        p = function () {
            function e(t, i, o, r, a, c, h) {
                if (void 0 === r && (r = !0), this._resizeAction = this._resizeAction.bind(this), this._dismissAction = this._dismissAction.bind(this), this._handleKeyUpDismiss = this._handleKeyUpDismiss.bind(this), this._matchTargetWidth = c || !1, this._direction = i, this._container = this.createContainer(), this._contextualHost = this._container, this._contextualHostMain = this._contextualHost.getElementsByClassName(n)[0], this._contextualHostMain.appendChild(t), this._hasArrow = r, this._arrow = this._container.getElementsByClassName(s)[0], this._targetElement = o, this._openModal(), this._setResizeDisposal(), h && (this._disposalCallback = h), a)
                    for (var d = 0; d < a.length; d++) this._container.classList.add(l + a[d]);
                e.hosts || (e.hosts = []), e.hosts.push(this)
            }
            return e.prototype.disposeModal = function () {
                if (e.hosts.length > 0) {
                    window.removeEventListener("resize", this._resizeAction, !1), document.removeEventListener("click", this._dismissAction, !0), document.removeEventListener("keyup", this._handleKeyUpDismiss, !0), this._container.parentNode.removeChild(this._container), this._disposalCallback && this._disposalCallback();
                    var t = e.hosts.indexOf(this);
                    e.hosts.splice(t, 1);
                    for (var i = e.hosts.length; i--;) e.hosts[i].disposeModal(), e.hosts.splice(i, 1)
                }
            }, e.prototype.setChildren = function (e) {
                this._children || (this._children = []), this._children.push(e)
            }, e.prototype.contains = function (e) {
                return this._container.contains(e)
            }, e.prototype.createContainer = function () {
                var e = document.createElement("div");
                e.setAttribute("class", "ms-ContextualHost"), e.innerHTML += " ";
                var t = document.createElement("div");
                t.setAttribute("class", n), t.innerHTML += " ", e.appendChild(t), e.innerHTML += " ";
                var i = document.createElement("div");
                return i.setAttribute("class", s), e.appendChild(i), e.innerHTML += "", e
            }, e.prototype._openModal = function () {
                var e = this;
                this._copyModalToBody(), this._saveModalSize(), this._findAvailablePosition(), this._showModal(), setTimeout(function () {
                    e._setDismissClick()
                }, 100)
            }, e.prototype._findAvailablePosition = function () {
                var e;
                switch (this._direction) {
                    case "left":
                        e = this._positionOk(this._tryPosModalLeft.bind(this), this._tryPosModalRight.bind(this), this._tryPosModalBottom.bind(this), this._tryPosModalTop.bind(this)), this._setPosition(e);
                        break;
                    case "right":
                        e = this._positionOk(this._tryPosModalRight.bind(this), this._tryPosModalLeft.bind(this), this._tryPosModalBottom.bind(this), this._tryPosModalTop.bind(this)), this._setPosition(e);
                        break;
                    case "top":
                        e = this._positionOk(this._tryPosModalTop.bind(this), this._tryPosModalBottom.bind(this)), this._setPosition(e);
                        break;
                    case "bottom":
                        e = this._positionOk(this._tryPosModalBottom.bind(this), this._tryPosModalTop.bind(this)), this._setPosition(e);
                        break;
                    default:
                        this._setPosition()
                }
            }, e.prototype._showModal = function () {
                this._container.classList.add(t)
            }, e.prototype._positionOk = function (e, t, i, n) {
                var s;
                return s = e(), s || (s = t(), !s && i && (s = i(), !s && n && (s = n()))), s
            }, e.prototype._calcLeft = function (e, t, i) {
                var n = e / 2,
                    s = t / 2,
                    o = i + s - n;
                return o = o < n ? i : o
            }, e.prototype._calcTop = function (e, t, i) {
                var n = e / 2,
                    s = t / 2,
                    o = i + s - n;
                return o = o < n ? i : o
            }, e.prototype._setPosition = function (e) {
                var t, n, s, l, p = this._targetElement.getBoundingClientRect(),
                    u = p.left,
                    _ = p.right,
                    m = p.top,
                    f = p.width,
                    v = p.height,
                    y = "",
                    b = window.scrollX ? window.scrollX : 0,
                    g = window.scrollY ? window.scrollY : 0,
                    C = this._hasArrow ? h : 0;
                switch (this._matchTargetWidth && (y = "width: " + this._modalWidth + "px;"), e) {
                    case "left":
                        t = u - this._modalWidth - C, n = this._calcTop(this._modalHeight, v, m), n += window.scrollY ? window.scrollY : 0, this._container.setAttribute("style", "top: " + n + "px; left: " + t + "px;" + y), this._container.classList.add(i), this._hasArrow && (this._container.classList.add(c), s = m + g - n + d, this._arrow.setAttribute("style", "top: " + s + "px;"));
                        break;
                    case "right":
                        n = this._calcTop(this._modalHeight, v, m), n += g, t = _ + C, this._container.setAttribute("style", "top: " + n + "px; left: " + t + "px;" + y), this._container.classList.add(i), this._hasArrow && (s = g + m - n + d, this._arrow.setAttribute("style", "top: " + s + "px;"), this._container.classList.add(o));
                        break;
                    case "top":
                        t = this._calcLeft(this._modalWidth, this._teWidth, u), n = m - this._modalHeight - C, n += g, this._container.setAttribute("style", "top: " + n + "px; left: " + t + "px;" + y), this._container.classList.add(i), this._hasArrow && (s = this._modalHeight - C / 2, l = Math.max(b + u - t + (f - C) / 2, d), this._arrow.setAttribute("style", "top: " + s + "px; left: " + l + "px;"), this._container.classList.add(a));
                        break;
                    case "bottom":
                        t = t = this._calcLeft(this._modalWidth, this._teWidth, u), n = m + v + C, n += window.scrollY ? window.scrollY : 0, this._container.setAttribute("style", "top: " + n + "px; left: " + t + "px;" + y), this._container.classList.add(i), this._hasArrow && (l = Math.max(b + u - t + (f - C) / 2, d), this._arrow.setAttribute("style", "left: " + l + "px;"), this._container.classList.add(r));
                        break;
                    default:
                        this._container.setAttribute("style", "top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);")
                }
            }, e.prototype._tryPosModalLeft = function () {
                var e = this._targetElement.getBoundingClientRect().left;
                return !(e < this._modalWidth) && "left"
            }, e.prototype._tryPosModalRight = function () {
                var e = this._targetElement.getBoundingClientRect().right,
                    t = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                return !(t - e < this._modalWidth) && "right"
            }, e.prototype._tryPosModalBottom = function () {
                var e = window.innerHeight - this._targetElement.getBoundingClientRect().bottom;
                return !(e < this._modalHeight) && "bottom"
            }, e.prototype._tryPosModalTop = function () {
                var e = this._targetElement.getBoundingClientRect().top;
                return !(e < this._modalHeight) && "top"
            }, e.prototype._copyModalToBody = function () {
                document.body.appendChild(this._container)
            }, e.prototype._saveModalSize = function () {
                var e = window.getComputedStyle(this._container);
                if (this._container.setAttribute("style", "opacity: 0; z-index: -1"), this._container.classList.add(i), this._container.classList.add(t), this._matchTargetWidth) {
                    var n = window.getComputedStyle(this._targetElement);
                    this._modalWidth = this._targetElement.getBoundingClientRect().width + (parseInt(n.marginLeft, 10) + parseInt(n.marginLeft, 10))
                } else this._modalWidth = this._container.getBoundingClientRect().width + (parseInt(e.marginLeft, 10) + parseInt(e.marginRight, 10)), this._container.setAttribute("style", "");
                this._modalHeight = this._container.getBoundingClientRect().height + (parseInt(e.marginTop, 10) + parseInt(e.marginBottom, 10)), this._container.classList.remove(i), this._container.classList.remove(t), this._teWidth = this._targetElement.getBoundingClientRect().width, this._teHeight = this._targetElement.getBoundingClientRect().height
            }, e.prototype._dismissAction = function (e) {
                if (!this._container.contains(e.target) && e.target !== this._container)
                    if (void 0 !== this._children) {
                        var t = !1;
                        this._children.map(function (i) {
                            void 0 !== i && (t = i.contains(e.target))
                        }), t || this.disposeModal()
                    } else this.disposeModal()
            }, e.prototype._setDismissClick = function () {
                document.addEventListener("click", this._dismissAction, !0), document.addEventListener("keyup", this._handleKeyUpDismiss, !0)
            }, e.prototype._handleKeyUpDismiss = function (e) {
                32 !== e.keyCode && 27 !== e.keyCode || this._dismissAction(e)
            }, e.prototype._resizeAction = function () {
                this.disposeModal()
            }, e.prototype._setResizeDisposal = function () {
                window.addEventListener("resize", this._resizeAction, !1)
            }, e
        }();
    e.ContextualHost = p
}(fabric || (fabric = {}));
var STATE_HIDDEN = "is-hidden",
    CLOSE_BUTTON_CLASS = ".ms-Callout-close",
    MODIFIER_OOBE_CLASS = "ms-Callout--OOBE",
    fabric;
! function (e) {
    "use strict";
    var t = function () {
        function t(e, t, i) {
            this._container = e, this._addTarget = t, this._position = i, this._closeButton = document.querySelector(CLOSE_BUTTON_CLASS), this._setOpener()
        }
        return t.prototype._setOpener = function () {
            this._addTarget.addEventListener("click", this._clickHandler.bind(this), !0)
        }, t.prototype._openContextMenu = function () {
            var t = [];
            this._hasModifier(MODIFIER_OOBE_CLASS) && t.push("primaryArrow"), this._container.classList.remove(STATE_HIDDEN), this._contextualHost = new e.ContextualHost(this._container, this._position, this._addTarget, (!0), t), this._closeButton && this._closeButton.addEventListener("click", this._closeHandler.bind(this), !1)
        }, t.prototype._hasModifier = function (e) {
            return this._container.classList.contains(e)
        }, t.prototype._closeHandler = function (e) {
            this._contextualHost.disposeModal(), this._closeButton.removeEventListener("click", this._closeHandler.bind(this), !1), this._addTarget.removeEventListener("click", this._clickHandler.bind(this), !0)
        }, t.prototype._clickHandler = function (e) {
            this._openContextMenu()
        }, t
    }();
    e.Callout = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function e(e) {
            this._container = e, this._choiceField = this._container.querySelector(".ms-CheckBox-field"), this._choiceInput = this._container.querySelector(".ms-CheckBox-input"), this._choiceInput.checked && this._choiceField.setAttribute("aria-checked", "true"), "true" === this._choiceField.getAttribute("aria-checked") && this._choiceField.classList.add("is-checked"), this._addListeners()
        }
        return e.prototype.getValue = function () {
            return "true" === this._choiceField.getAttribute("aria-checked")
        }, e.prototype.toggle = function () {
            this.getValue() ? this.unCheck() : this.check(), this._choiceInput.click()
        }, e.prototype.check = function () {
            this._choiceField.setAttribute("aria-checked", "true"), this._choiceField.classList.add("is-checked")
        }, e.prototype.unCheck = function () {
            this._choiceField.setAttribute("aria-checked", "false"), this._choiceField.classList.remove("is-checked")
        }, e.prototype.removeListeners = function () {
            this._choiceField.removeEventListener("focus", this._FocusHandler.bind(this)), this._choiceField.removeEventListener("blur", this._BlurHandler.bind(this)), this._choiceField.removeEventListener("click", this._ClickHandler.bind(this)), this._choiceField.removeEventListener("keydown", this._KeydownHandler.bind(this))
        }, e.prototype._addListeners = function (e) {
            var t = e && e.ignore;
            t && t.indexOf("focus") > -1 || this._choiceField.addEventListener("focus", this._FocusHandler.bind(this), !1), t && t.indexOf("blur") > -1 || this._choiceField.addEventListener("blur", this._BlurHandler.bind(this), !1), t && t.indexOf("click") > -1 || this._choiceField.addEventListener("click", this._ClickHandler.bind(this), !1), t && t.indexOf("keydown") > -1 || this._choiceField.addEventListener("keydown", this._KeydownHandler.bind(this), !1)
        }, e.prototype._FocusHandler = function () {
            this._choiceField.classList.add("in-focus")
        }, e.prototype._BlurHandler = function () {
            this._choiceField.classList.remove("in-focus")
        }, e.prototype._ClickHandler = function (e) {
            e.stopPropagation(), e.preventDefault(), this._choiceField.classList.contains("is-disabled") || this.toggle()
        }, e.prototype._KeydownHandler = function (e) {
            32 === e.keyCode && (e.stopPropagation(), e.preventDefault(), this._choiceField.classList.contains("is-disabled") || this.toggle())
        }, e
    }();
    e.CheckBox = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function e(e) {
            this._container = e, this._choiceField = this._container.querySelector(".ms-RadioButton-field"), this._choiceInput = this._container.querySelector(".ms-RadioButton-input"), "true" === this._choiceField.getAttribute("aria-checked") && this._choiceField.classList.add("is-checked"), this._addListeners()
        }
        return e.prototype.getValue = function () {
            return "true" === this._choiceField.getAttribute("aria-checked")
        }, e.prototype.toggle = function () {
            this.getValue() ? this.unCheck() : this.check()
        }, e.prototype.check = function () {
            this._choiceField.setAttribute("aria-checked", "true"), this._choiceField.classList.add("is-checked"), this._choiceInput.checked = !0
        }, e.prototype.unCheck = function () {
            this._choiceField.setAttribute("aria-checked", "false"), this._choiceField.classList.remove("is-checked"), this._choiceInput.checked = !1
        }, e.prototype.removeListeners = function () {
            this._choiceField.removeEventListener("focus", this._FocusHandler.bind(this)), this._choiceField.removeEventListener("blur", this._BlurHandler.bind(this)), this._choiceField.removeEventListener("click", this._RadioClickHandler.bind(this)), this._choiceField.addEventListener("keydown", this._RadioKeydownHandler.bind(this))
        }, e.prototype._addListeners = function () {
            this._choiceField.addEventListener("focus", this._FocusHandler.bind(this), !1), this._choiceField.addEventListener("blur", this._BlurHandler.bind(this), !1), this._choiceField.addEventListener("click", this._RadioClickHandler.bind(this), !1), this._choiceField.addEventListener("keydown", this._RadioKeydownHandler.bind(this), !1)
        }, e.prototype._RadioClickHandler = function (e) {
            e.stopPropagation(), e.preventDefault(), this._choiceField.classList.contains("is-disabled") || this._dispatchSelectEvent()
        }, e.prototype._dispatchSelectEvent = function () {
            var e = {
                bubbles: !0,
                cancelable: !0,
                detail: {
                    name: this._choiceField.getAttribute("name"),
                    item: this
                }
            };
            this._choiceField.dispatchEvent(new CustomEvent("msChoicefield", e))
        }, e.prototype._RadioKeydownHandler = function (e) {
            32 === e.keyCode && (e.stopPropagation(), e.preventDefault(), this._choiceField.classList.contains("is-disabled") || this._dispatchSelectEvent())
        }, e.prototype._FocusHandler = function () {
            this._choiceField.classList.add("in-focus")
        }, e.prototype._BlurHandler = function () {
            this._choiceField.classList.remove("in-focus")
        }, e
    }();
    e.RadioButton = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function t(e) {
            this._choiceFieldGroup = e, this._choiceFieldComponents = [], this._initalSetup(), this._addListeners()
        }
        return t.prototype.removeListeners = function () {
            this._choiceFieldGroup.removeEventListener("msChoicefield", this._ChoiceFieldHandler.bind(this))
        }, t.prototype._initalSetup = function () {
            for (var t = this._choiceFieldGroup.querySelectorAll(".ms-RadioButton"), i = 0; i < t.length; i++) this._choiceFieldComponents[i] = new e.RadioButton(t[i])
        }, t.prototype._addListeners = function () {
            document.addEventListener("msChoicefield", this._ChoiceFieldHandler.bind(this), !1)
        }, t.prototype._ChoiceFieldHandler = function (e) {
            var t = e.detail.name,
                i = e.detail.item;
            if (this._choiceFieldGroup.id === t) {
                for (var n = 0; n < this._choiceFieldComponents.length; n++) this._choiceFieldComponents[n].unCheck();
                i.check()
            }
        }, t
    }();
    e.ChoiceFieldGroup = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = ".ms-SearchBox-field",
        i = ".ms-SearchBox-clear",
        n = ".ms-SearchBox-exit",
        s = "has-text",
        o = "is-active",
        r = "is-animated",
        a = function () {
            function e(e) {
                var t = this;
                this._container = e, this._saveDOMRefs(this._container), this._boundExpandSearchHandler = this._expandSearchHandler.bind(this), this._boundEnableClose = this._enableClose.bind(this), this._boundCollapseSearchBox = this._collapseSearchBox.bind(this), this._boundClearSearchBox = this._clearSearchBox.bind(this), this._boundHandleBlur = this._handleBlur.bind(this), this._boundExitSearchBox = this._exitSearchBox.bind(this), this._setHasText(), this._setFocusAction(this._container), this._setClearButtonAction(), this._setBlurAction(), this._clearOnly = !1, setTimeout(function () {
                    t._checkState(), t._addAnimation()
                }, 10)
            }
            return e.prototype.setCollapsedListeners = function () {
                this._disposeListeners(), this._searchBox.addEventListener("click", this._boundExpandSearchHandler, !1), this._searchBoxField.addEventListener("focus", this._boundExpandSearchHandler, !0)
            }, e.prototype.getInputField = function () {
                return this._searchBoxField
            }, e.prototype._saveDOMRefs = function (e) {
                this._searchBox = e, this._searchBoxField = this._searchBox.querySelector(t), this._searchBoxClearButton = this._searchBox.querySelector(i), this._searchBoxExitButton = this._searchBox.querySelector(n)
            }, e.prototype._disposeListeners = function () {
                this._searchBox.removeEventListener("click", this._boundExpandSearchHandler), this._searchBoxField.removeEventListener("focus", this._boundExpandSearchHandler)
            }, e.prototype._exitSearchBox = function (e) {
                e.stopPropagation(), e.target.blur(), this._clearSearchBox(), this._collapseSearchBox(), this._searchBox.removeEventListener("keyup", this._boundEnableClose), this.setCollapsedListeners()
            }, e.prototype._collapseSearchBox = function () {
                this._searchBox.classList.remove("is-active");
                var e = document.createEvent("Event");
                e.initEvent("searchCollapse", !0, !0), this._searchBoxField.dispatchEvent(e)
            }, e.prototype._expandSearchHandler = function () {
                this._disposeListeners(), this._searchBox.classList.add("is-active"), this._searchBoxField.focus()
            }, e.prototype._enableClose = function () {
                this._setHasText()
            }, e.prototype._setHasText = function () {
                this._searchBoxField.value.length > 0 ? this._searchBox.classList.add(s) : this._searchBox.classList.remove(s)
            }, e.prototype._setFocusAction = function (e) {
                var t = this;
                this._searchBoxField.addEventListener("focus", function () {
                    t._setHasText(), t._searchBox.addEventListener("keyup", t._boundEnableClose, !1), t._searchBox.classList.add(o), t._searchBox.classList.add(o)
                }, !0)
            }, e.prototype._clearSearchBox = function (e) {
                var t = this;
                this._clearOnly = !0, this._searchBoxField.value = "", this._setHasText(), setTimeout(function () {
                    t._clearOnly = !1
                }, 10)
            }, e.prototype._setClearButtonAction = function () {
                var e = this;
                this._searchBoxExitButton && this._searchBoxExitButton.addEventListener("click", this._boundExitSearchBox, !1), this._searchBoxClearButton.addEventListener("mousedown", this._boundClearSearchBox, !1), this._searchBoxClearButton.addEventListener("keydown", function (t) {
                    var i = t.keyCode;
                    13 === i && e._clearSearchBox(t)
                }, !1)
            }, e.prototype._handleBlur = function (e) {
                var t = this;
                this._clearOnly ? this._searchBoxField.focus() : (this._searchBox.removeEventListener("keyup", this._boundEnableClose), setTimeout(function () {
                    t._searchBox.contains(document.activeElement) || (t._clearSearchBox(), t._collapseSearchBox(), t.setCollapsedListeners())
                }, 10)), this._clearOnly = !1
            }, e.prototype._setBlurAction = function () {
                this._searchBoxField.addEventListener("blur", this._boundHandleBlur, !0), this._searchBoxClearButton.addEventListener("blur", this._boundHandleBlur, !0)
            }, e.prototype._checkState = function () {
                this._searchBox.classList.contains("is-collapsed") && this.setCollapsedListeners()
            }, e.prototype._addAnimation = function () {
                this._container.classList.add(r)
            }, e
        }();
    e.SearchBox = a
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = ".ms-ContextualMenu",
        i = ".ms-CommandButton-splitIcon",
        n = ".ms-CommandButton-button",
        s = "bottom",
        o = function () {
            function o(e, s) {
                this._container = e, this._command = this._container, this._commandButton = this._command.querySelector(n), this._splitButton = this._command.querySelector(i), s ? this._contextualMenu = s : this._contextualMenu = this._container.querySelector(t), this._checkForMenu()
            }
            return o.prototype._createModalHostView = function () {
                this._modalHostView = new e.ContextualHost(this._contextualMenu, s, this._command, (!1))
            }, o.prototype._setClick = function () {
                this._splitButton ? this._splitButton.addEventListener("click", this._createModalHostView.bind(this), !1) : this._commandButton.addEventListener("click", this._createModalHostView.bind(this), !1)
            }, o.prototype._checkForMenu = function () {
                this._contextualMenu && this._setClick()
            }, o
        }();
    e.CommandButton = o
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    "use strict";
    var t = ".ms-ContextualMenu",
        i = ".ms-ContextualMenu-item",
        n = ".ms-ContextualMenu-link",
        s = ".ms-SearchBox",
        o = ".ms-CommandBar-mainArea",
        r = ".ms-CommandBar-sideCommands",
        a = ".ms-CommandBar-overflowButton",
        c = "ms-CommandButton--noLabel",
        l = ".ms-SearchBox-closeField",
        h = ".ms-CommandButton",
        d = ".ms-CommandButton-label",
        p = ".ms-Icon",
        u = 40,
        _ = 30,
        m = function () {
            function m(e) {
                this.responsiveSizes = {
                    "sm-min": 320,
                    "md-min": 480,
                    "lg-min": 640,
                    "xl-min": 1024,
                    "xxl-min": 1366,
                    "xxxl-min": 1920
                }, this.visibleCommands = [], this.commandWidths = [], this.overflowCommands = [], this.itemCollection = [], this._sideAreaCollection = [], this.breakpoint = "sm", this._container = e, this.responsiveSizes["sm-max"] = this.responsiveSizes["md-min"] - 1, this.responsiveSizes["md-max"] = this.responsiveSizes["lg-min"] - 1, this.responsiveSizes["lg-max"] = this.responsiveSizes["xl-min"] - 1, this.responsiveSizes["xl-max"] = this.responsiveSizes["xxl-min"] - 1, this.responsiveSizes["xxl-max"] = this.responsiveSizes["xxxl-min"] - 1, this._setElements(), this._setBreakpoint(), this._elements.overflowCommand && this._initOverflow(), this._setUIState()
            }
            return m.prototype._runsSearchBox = function (e) {
                void 0 === e && (e = "add"), this._changeSearchState("is-collapsed", e)
            }, m.prototype._runOverflow = function () {
                this._elements.overflowCommand && (this._saveCommandWidths(), this._redrawMenu(), this._updateCommands(), this._drawCommands(), this._checkOverflow())
            }, m.prototype._initOverflow = function () {
                this._createContextualRef(), this._createItemCollection(this.itemCollection, o), this._createItemCollection(this._sideAreaCollection, r), this._saveCommandWidths(), this._updateCommands(), this._drawCommands(), this._setWindowEvent(), this._checkOverflow()
            }, m.prototype._hasClass = function (e, t) {
                return (" " + e.className + " ").indexOf(" " + t + " ") > -1
            }, m.prototype._onSearchExpand = function () {
                "lg" === this.breakpoint && (this._container.classList.add("search-expanded"), this._doResize())
            }, m.prototype._onSearchCollapse = function () {
                "lg" === this.breakpoint && (this._container.classList.remove("search-expanded"), this._doResize())
            }, m.prototype._getScreenSize = function () {
                var e = window,
                    t = {
                        x: 0,
                        y: 0
                    },
                    i = document,
                    n = i.documentElement,
                    s = i.getElementsByTagName("body")[0];
                return t.x = e.innerWidth || n.clientWidth || s.clientWidth, t.y = e.innerHeight || n.clientHeight || s.clientHeight, t
            }, m.prototype._setBreakpoint = function () {
                var e = this._getScreenSize().x;
                switch (!0) {
                    case e <= this.responsiveSizes["sm-max"]:
                        this.breakpoint = "sm";
                        break;
                    case e >= this.responsiveSizes["md-min"] && e <= this.responsiveSizes["md-max"]:
                        this.breakpoint = "md";
                        break;
                    case e >= this.responsiveSizes["lg-min"] && e <= this.responsiveSizes["lg-max"]:
                        this.breakpoint = "lg";
                        break;
                    case e >= this.responsiveSizes["xl-min"] && e <= this.responsiveSizes["xl-max"]:
                        this.breakpoint = "xl";
                        break;
                    case e >= this.responsiveSizes["xxl-min"] && e <= this.responsiveSizes["xxl-max"]:
                        this.breakpoint = "xxl";
                        break;
                    case e >= this.responsiveSizes["xxxl-min"]:
                        this.breakpoint = "xxxl"
                }
            }, m.prototype._createSearchInstance = function () {
                return !!this._elements.searchBox && new e.SearchBox(this._elements.searchBox)
            }, m.prototype._changeSearchState = function (e, t) {
                if (this._elements.searchBox) switch (t) {
                    case "remove":
                        this._elements.searchBox.classList.remove(e);
                        break;
                    case "add":
                        this._elements.searchBox.classList.add(e)
                }
            }, m.prototype._setElements = function () {
                var e = this;
                this._elements = {
                    mainArea: this._container.querySelector(o)
                }, this._container.querySelector(r) && (this._elements.sideCommandArea = this._container.querySelector(r)), this._container.querySelector(a) && (this._elements.overflowCommand = this._container.querySelector(a), this._elements.contextMenu = this._container.querySelector(a).querySelector(t)), this._container.querySelector(o + " " + s) && (this._elements.searchBox = this._container.querySelector(o + " " + s), this._elements.searchBoxClose = this._container.querySelector(l), this.searchBoxInstance = this._createSearchInstance(), this.searchBoxInstance.getInputField().addEventListener("focus", function () {
                    e._onSearchExpand()
                }, !1), this.searchBoxInstance.getInputField().addEventListener("searchCollapse", function () {
                    e._onSearchCollapse()
                }, !1))
            }, m.prototype._createItemCollection = function (t, i) {
                var n, s, o, r, l = this._container.querySelectorAll(i + " > " + h + ":not(" + a + ")");
                this._commandButtonInstance = new e.CommandButton(this._elements.overflowCommand);
                for (var u = 0; u < l.length; u++) {
                    n = l[u], s = n.querySelector(d).textContent;
                    var _ = n.querySelector(p);
                    if (_) {
                        o = _.className, r = o.split(" ");
                        for (var m = 0; m < r.length; m++)
                            if (r[m].indexOf(p.replace(".", "") + "--") > -1) {
                                _ = r[m];
                                break
                            }
                    }
                    t.push({
                        item: n,
                        label: s,
                        icon: _,
                        isCollapsed: !!n.classList.contains(c),
                        commandButtonRef: new e.CommandButton(n)
                    })
                }
            }, m.prototype._createContextualRef = function () {
                this.contextualItemContainerRef = this._elements.contextMenu.querySelector(i).cloneNode(!0), this.contextualItemLink = this._elements.contextMenu.querySelector(n).cloneNode(!1), this.contextualItemIcon = this._elements.contextMenu.querySelector(".ms-Icon").cloneNode(!1), this._elements.contextMenu.innerHTML = ""
            }, m.prototype._getElementWidth = function (e) {
                var t, i;
                return null === e.offsetParent && e.setAttribute("style", "position: absolute; opacity: 0; display: block;"), t = e.getBoundingClientRect().width, i = window.getComputedStyle(e), t += parseInt(i.marginLeft, 10) + parseInt(i.marginRight, 10), e.setAttribute("style", ""), t
            }, m.prototype._saveCommandWidths = function () {
                for (var e = 0; e < this.itemCollection.length; e++) {
                    var t = this.itemCollection[e].item,
                        i = this._getElementWidth(t);
                    this.commandWidths[e] = i
                }
            }, m.prototype._updateCommands = function () {
                var e = 0,
                    t = this._elements.mainArea.getBoundingClientRect().width;
                this._elements.searchBox && (e = this._getElementWidth(this._elements.searchBox));
                var i = e + u + _,
                    n = t - i;
                this.visibleCommands = [], this.overflowCommands = [];
                for (var s = 0, o = 0; o < this.itemCollection.length; o++) s += this.commandWidths[o], s < n ? this.visibleCommands.push(this.itemCollection[o]) : this.overflowCommands.push(this.itemCollection[o])
            }, m.prototype._drawCommands = function () {
                this._elements.contextMenu.innerHTML = "";
                for (var e = 0; e < this.overflowCommands.length; e++) {
                    this.overflowCommands[e].item.classList.add("is-hidden");
                    var t = this.contextualItemContainerRef.cloneNode(!1),
                        i = this.contextualItemLink.cloneNode(!1),
                        n = this.overflowCommands[e].icon;
                    if (i.innerText = this.overflowCommands[e].label, t.appendChild(i), n) {
                        var s = this.contextualItemIcon.cloneNode(!1);
                        s.className = p.replace(".", "") + " " + n, t.appendChild(s)
                    }
                    this._elements.contextMenu.appendChild(t)
                }
                for (var o = 0; o < this.visibleCommands.length; o++) this.visibleCommands[o].item.classList.remove("is-hidden")
            }, m.prototype._setWindowEvent = function () {
                var e = this;
                window.addEventListener("resize", function () {
                    e._doResize()
                }, !1)
            }, m.prototype._processCollapsedClasses = function (e) {
                for (var t = 0; t < this.itemCollection.length; t++) {
                    var i = this.itemCollection[t];
                    i.isCollapsed || ("add" === e ? i.item.classList.add(c) : i.item.classList.remove(c))
                }
                for (var t = 0; t < this._sideAreaCollection.length; t++) {
                    var i = this._sideAreaCollection[t];
                    i.isCollapsed || ("add" === e ? i.item.classList.add(c) : i.item.classList.remove(c))
                }
            }, m.prototype._setUIState = function () {
                switch (this.breakpoint) {
                    case "sm":
                        this._runsSearchBox(), this._processCollapsedClasses("add"), this._runOverflow();
                        break;
                    case "md":
                        this._runsSearchBox(), this._processCollapsedClasses("add"), this._runOverflow();
                        break;
                    case "lg":
                        this._runsSearchBox(), this._processCollapsedClasses("remove"), this._runOverflow();
                        break;
                    case "xl":
                        this._runsSearchBox("remove"), this._processCollapsedClasses("remove"), this._runOverflow();
                        break;
                    default:
                        this._runsSearchBox("remove"), this._processCollapsedClasses("remove"), this._runOverflow()
                }
            }, m.prototype._checkOverflow = function () {
                this.overflowCommands.length > 0 ? this._elements.overflowCommand.classList.remove("is-hidden") : (this._elements.overflowCommand.classList.add("is-hidden"), this.activeCommand === this._elements.overflowCommand && this._elements.contextMenu.classList.remove("is-open"))
            }, m.prototype._redrawMenu = function () {
                var e;
                this._hasClass(this._elements.contextMenu, "is-open") && (e = this.activeCommand.getBoundingClientRect().left, this._drawOverflowMenu(e))
            }, m.prototype._drawOverflowMenu = function (e) {
                this._elements.contextMenu.setAttribute("style", "left: " + e + "px; transform: translateX(-50%)")
            }, m.prototype._doResize = function () {
                this._setBreakpoint(), this._setUIState()
            }, m
        }();
    e.CommandBar = m
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = "bottom",
        i = "right",
        n = function () {
            function n(e, i, n) {
                this._container = e, this._hostTarget = i, this._position = n ? n : t, this._isOpen = !1, this._setOpener(i), this._init()
            }
            return n.prototype.getHost = function () {
                return this._host
            }, n.prototype._init = function () {
                this._container.addEventListener("click", this._onContextualMenuClick.bind(this), !0), document.addEventListener("click", this._onDocumentClick.bind(this), !1)
            }, n.prototype._onDocumentClick = function (e) {
                var t = e.target,
                    i = t.classList;
                this._hostTarget.contains(t) || i.contains("ms-ContextualMenu-link") || (this._isOpen = !1)
            }, n.prototype._onContextualMenuClick = function (e) {
                var t = e.target,
                    i = t.classList;
                i.contains("ms-ContextualMenu-link") && !i.contains("is-disabled") && (this._container.classList.contains("ms-ContextualMenu--multiselect") ? this._multiSelect(t) : (this._singleSelect(t), t.parentElement.classList.contains("ms-ContextualMenu-item--hasMenu") || (this._host.disposeModal(), this._isOpen = !1)))
            }, n.prototype._multiSelect = function (e) {
                e.classList.contains("is-selected") ? e.classList.remove("is-selected") : e.classList.add("is-selected")
            }, n.prototype._singleSelect = function (e) {
                for (var t = this._container.querySelectorAll(".is-selected"), i = t.length; i--;) t[i].classList.remove("is-selected");
                e.classList.add("is-selected")
            }, n.prototype._toggleMenu = function (e) {
                this._isOpen ? this._host.disposeModal() : this._openContextMenu(e), this._isOpen = !this._isOpen
            }, n.prototype._setOpener = function (e) {
                var t = this;
                e.addEventListener("click", function (e) {
                    e.preventDefault(), t._toggleMenu(e)
                })
            }, n.prototype._openContextMenu = function (e) {
                this._createModalHostView(this._container, this._position, this._hostTarget), this._checkForSubmenus(this._container)
            }, n.prototype._checkForSubmenus = function (t) {
                var n = this,
                    s = t.querySelectorAll(".ms-ContextualMenu-item.ms-ContextualMenu-item--hasMenu"),
                    o = s.length;
                if (s.length)
                    for (var r = function () {
                        var t = s[o].querySelector(".ms-ContextualMenu-link"),
                            r = s[o].querySelector(".ms-ContextualMenu");
                        if (r) {
                            var a = new e.ContextualMenu(r, t, i);
                            r.addEventListener("hostAdded", function () {
                                n._host.setChildren(a.getHost())
                            })
                        }
                    }; o--;) r()
            }, n.prototype._createModalHostView = function (t, i, n) {
                t.classList.remove("is-hidden"), this._host = new e.ContextualHost(t, i, n, (!1));
                var s = document.createEvent("Event");
                s.initEvent("hostAdded", !0, !0), t.dispatchEvent(s)
            }, n
        }();
    e.ContextualMenu = n
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function e(e, t) {
            var i = this,
                n = $(e),
                s = n.find(".ms-TextField-field").pickadate($.extend({
                    weekdaysShort: ["S", "M", "T", "W", "T", "F", "S"],
                    clear: "",
                    close: "",
                    today: "",
                    onStart: function () {
                        i.initCustomView(n)
                    },
                    klass: {
                        input: "ms-DatePicker-input",
                        active: "ms-DatePicker-input--active",
                        picker: "ms-DatePicker-picker",
                        opened: "ms-DatePicker-picker--opened",
                        focused: "ms-DatePicker-picker--focused",
                        holder: "ms-DatePicker-holder",
                        frame: "ms-DatePicker-frame",
                        wrap: "ms-DatePicker-wrap",
                        box: "ms-DatePicker-dayPicker",
                        header: "ms-DatePicker-header",
                        month: "ms-DatePicker-month",
                        year: "ms-DatePicker-year",
                        table: "ms-DatePicker-table",
                        weekdays: "ms-DatePicker-weekday",
                        day: "ms-DatePicker-day",
                        disabled: "ms-DatePicker-day--disabled",
                        selected: "ms-DatePicker-day--selected",
                        highlighted: "ms-DatePicker-day--highlighted",
                        now: "ms-DatePicker-day--today",
                        infocus: "ms-DatePicker-day--infocus",
                        outfocus: "ms-DatePicker-day--outfocus"
                    }
                }, t || {})),
                o = s.pickadate("picker");
            this.picker = o, o.on({
                render: function () {
                    i.updateCustomView(n)
                }
            })
        }
        return e.prototype.initCustomView = function (e) {
            var t = this,
                i = e.find(".ms-DatePicker-monthComponents"),
                n = e.find(".ms-DatePicker-goToday"),
                s = e.find(".ms-DatePicker-monthPicker"),
                o = e.find(".ms-DatePicker-yearPicker"),
                r = e.find(".ms-DatePicker-wrap"),
                a = e.find(".ms-TextField-field").pickadate("picker");
            i.appendTo(r), n.appendTo(r), s.appendTo(r), o.appendTo(r), this.updateCustomView(e), a.on("open", function (e) {
                var t = document.createEvent("MouseEvents");
                t.initEvent("click", !0, !0), document.dispatchEvent(t)
            }), i.on("click", ".js-prevMonth", function (e) {
                e.preventDefault();
                var i = a.get("highlight").month - 1;
                t.changeHighlightedDate([null, i, null])
            }), i.on("click", ".js-nextMonth", function (e) {
                e.preventDefault();
                var i = a.get("highlight").month + 1;
                t.changeHighlightedDate([null, i, null])
            }), s.on("click", ".js-prevYear", function (e) {
                e.preventDefault();
                var i = a.get("highlight").year - 1;
                t.changeHighlightedDate([i, null, null])
            }), s.on("click", ".js-nextYear", function (e) {
                e.preventDefault();
                var i = a.get("highlight").year + 1;
                t.changeHighlightedDate([i, null, null])
            }), o.on("click", ".js-prevDecade", function (e) {
                e.preventDefault();
                var i = a.get("highlight").year - 10;
                t.changeHighlightedDate([i, null, null])
            }), o.on("click", ".js-nextDecade", function (e) {
                e.preventDefault();
                var i = a.get("highlight").year + 10;
                t.changeHighlightedDate([i, null, null])
            }), n.click(function (t) {
                t.preventDefault();
                var i = new Date;
                a.set("select", [i.getFullYear(), i.getMonth(), i.getDate()]), e.removeClass("is-pickingMonths").removeClass("is-pickingYears")
            }), s.on("click", ".js-changeDate", function (i) {
                i.preventDefault();
                var n = $(i.target),
                    s = n.attr("data-year"),
                    o = n.attr("data-month"),
                    r = n.attr("data-day");
                t.changeHighlightedDate([s, o, r]), e.hasClass("is-pickingMonths") && e.removeClass("is-pickingMonths")
            }), o.on("click", ".js-changeDate", function (i) {
                i.preventDefault();
                var n = $(i.target),
                    s = n.attr("data-year"),
                    o = n.attr("data-month"),
                    r = n.attr("data-day");
                t.changeHighlightedDate([s, o, r]), e.hasClass("is-pickingYears") && e.removeClass("is-pickingYears")
            }), s.on("click", ".js-showDayPicker", function () {
                e.removeClass("is-pickingMonths"), e.removeClass("is-pickingYears")
            }), i.on("click", ".js-showMonthPicker", function () {
                e.toggleClass("is-pickingMonths")
            }), s.on("click", ".js-showYearPicker", function () {
                e.toggleClass("is-pickingYears")
            })
        }, e.prototype.changeHighlightedDate = function (e) {
            var t = this.setDateAttributes(e);
            this.picker.set("highlight", t)
        }, e.prototype.updateCustomView = function (e) {
            var t = e.find(".ms-DatePicker-monthPicker"),
                i = e.find(".ms-DatePicker-yearPicker"),
                n = e.find(".ms-TextField-field").pickadate("picker");
            t.find(".ms-DatePicker-currentYear").text(n.get("view").year), t.find(".ms-DatePicker-monthOption").removeClass("is-highlighted"), t.find(".ms-DatePicker-monthOption[data-month='" + n.get("highlight").month + "']").addClass("is-highlighted"), i.find(".ms-DatePicker-currentDecade").remove(), i.find(".ms-DatePicker-optionGrid").remove();
            var s = n.get("highlight").year - 11,
                o = s + " - " + (s + 11),
                r = "<div class='ms-DatePicker-currentDecade'>" + o + "</div>";
            r += "<div class='ms-DatePicker-optionGrid'>";
            for (var a = s; a < s + 12; a++) r += "<span class='ms-DatePicker-yearOption js-changeDate' data-year='" + a + "'>" + a + "</span>";
            r += "</div>", i.append(r), i.find(".ms-DatePicker-yearOption").removeClass("is-highlighted"), i.find(".ms-DatePicker-yearOption[data-year='" + n.get("highlight").year + "']").addClass("is-highlighted")
        }, e.prototype.setDateAttributes = function (e) {
            var t = e[0],
                i = e[1],
                n = e[2];
            return "undefined" != typeof t && null !== t || (t = this.picker.get("highlight").year), "undefined" != typeof i && null !== i || (i = this.picker.get("highlight").month), "undefined" != typeof n && null !== n || (n = this.picker.get("highlight").date), [t, i, n]
        }, e
    }();
    e.DatePicker = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function e(e) {
            if (e) this.overlayElement = e;
            else {
                var t = document.createElement("div");
                t.setAttribute("class", "ms-Overlay"), this.overlayElement = t
            }
            this.overlayElement.addEventListener("click", this.hide.bind(this), !1)
        }
        return e.prototype.remove = function () {
            this.overlayElement.parentElement.removeChild(this.overlayElement)
        }, e.prototype.show = function () {
            this.overlayElement.classList.add("is-visible"), document.body.classList.add("ms-u-overflowHidden")
        }, e.prototype.hide = function () {
            this.overlayElement.classList.remove("is-visible"), document.body.classList.remove("ms-u-overflowHidden")
        }, e
    }();
    e.Overlay = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function t(e) {
            this._dialog = e, this._closeButtonElement = this._dialog.querySelector(".ms-Dialog-buttonClose"), this._actionButtonElements = this._dialog.querySelectorAll(".ms-Dialog-action"), this._closeButtonElement && this._closeButtonElement.addEventListener("click", this.close.bind(this), !1);
            for (var t = 0; t < this._actionButtonElements.length; t++) this._actionButtonElements[t].addEventListener("click", this.close.bind(this), !1)
        }
        return t.prototype.close = function () {
            this._overlay.remove(), this._dialog.classList.remove("is-open"), document.body.classList.remove("ms-u-overflowHidden"), this._overlay.overlayElement.removeEventListener("click", this.close.bind(this))
        }, t.prototype.open = function () {
            this._dialog.classList.add("is-open"), this._overlay = new e.Overlay, this._dialog.classList.contains("ms-Dialog--blocking") || (this._overlay.overlayElement.addEventListener("click", this.close.bind(this), !1), this._overlay.show(), document.body.classList.add("ms-u-overflowHidden")), this._dialog.parentElement.appendChild(this._overlay.overlayElement)
        }, t
    }();
    e.Dialog = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function e() { }
        return e
    }();
    e.DialogHost = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = "ms-PanelHost",
        i = function () {
            function i(e, t) {
                this._layer = e, this._callBack = t, this._createElements(), this._renderElements()
            }
            return i.prototype.dismiss = function () {
                this.overlay.hide(), document.body.removeChild(this.panelHost)
            }, i.prototype.update = function (e, t) {
                this.panelHost.replaceChild(e, this._layer), t && t()
            }, i.prototype._renderElements = function () {
                document.body.appendChild(this.panelHost), this._callBack && this._callBack(this._layer)
            }, i.prototype._createElements = function () {
                this.panelHost = document.createElement("div"), this.panelHost.classList.add(t), this.panelHost.appendChild(this._layer), this.overlay = new e.Overlay(this._overlayContainer), this.overlay.show(), this.panelHost.appendChild(this.overlay.overlayElement)
            }, i
        }();
    e.PanelHost = i
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = "animate-in",
        i = "animate-out",
        n = 400,
        s = function () {
            function s(t, i, n) {
                this._panel = t, this._direction = i || "right", this._animateOverlay = n || !0, this.panelHost = new e.PanelHost(this._panel, this._animateInPanel), this._closeButton = this._panel.querySelector(".ms-PanelAction-close"), this._clickHandler = this.dismiss.bind(this, null), this._setEvents(), document.body.setAttribute("style", "height: 100%; overflow: hidden;")
            }
            return s.prototype.dismiss = function (e) {
                var t = this;
                this._panel.classList.add(i), setTimeout(function () {
                    t._panel.classList.remove(i), t._panel.classList.remove("is-open"), t.panelHost.dismiss(), e && e(), document.body.setAttribute("style", "")
                }, n), null !== this._closeButton && this._closeButton.removeEventListener("click", this._clickHandler)
            }, s.prototype._setEvents = function () {
                this.panelHost.overlay.overlayElement.addEventListener("click", this._clickHandler), null !== this._closeButton && this._closeButton.addEventListener("click", this._clickHandler)
            }, s.prototype._animateInPanel = function (e) {
                e.classList.add(t), e.classList.add("is-open"), setTimeout(function () {
                    e.classList.remove(t)
                }, n)
            }, s
        }();
    e.Panel = s
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = "ms-Dropdown",
        i = "ms-Dropdown-title",
        n = "ms-Dropdown-truncator",
        s = "ms-Dropdown-items",
        o = "ms-Dropdown-item",
        r = ".ms-Dropdown-select",
        a = "ms-Panel",
        c = "is-open",
        l = "is-disabled",
        h = "is-selected",
        d = "animate-in",
        p = 479,
        u = function () {
            function u(e) {
                this._container = e, this._dropdownLabelHelper = document.createElement("span"), this._dropdownLabelHelper.classList.add(n), this._dropdownLabelHelper.classList.add(i), this._newDropdownLabel = document.createElement("span"), this._newDropdownLabel.classList.add(i), this._newDropdown = document.createElement("ul"), this._newDropdown.classList.add(s), this._dropdownItems = [], this._originalDropdown = e.querySelector(r);
                var t = this._originalDropdown.querySelectorAll("option");
                this._onCloseDropdown = this._onCloseDropdown.bind(this), this._onItemSelection = this._onItemSelection.bind(this), this._onOpenDropdown = this._onOpenDropdown.bind(this);
                for (var a = 0; a < t.length; ++a) {
                    var c = t[a];
                    c.selected && (this._newDropdownLabel.innerHTML = c.text);
                    var h = document.createElement("li");
                    h.classList.add(o), c.disabled && h.classList.add(l), h.innerHTML = c.text, h.addEventListener("click", this._onItemSelection), this._newDropdown.appendChild(h), this._dropdownItems.push({
                        oldOption: c,
                        newItem: h
                    })
                }
                e.appendChild(this._newDropdownLabel), e.appendChild(this._newDropdown), e.appendChild(this._dropdownLabelHelper), this._newDropdownLabel.addEventListener("click", this._onOpenDropdown), this._checkTruncation(), this._setWindowEvent()
            }
            return u.prototype._setWindowEvent = function () {
                var e = this;
                window.addEventListener("resize", function () {
                    e._doResize(), e._checkTruncation()
                }, !1)
            }, u.prototype._checkTruncation = function () {
                var e = this._newDropdown.querySelector("." + h),
                    t = e ? e.textContent : this._newDropdown.querySelectorAll("." + o)[0].textContent;
                if (this._dropdownLabelHelper.textContent = t, this._dropdownLabelHelper.offsetHeight > this._newDropdownLabel.offsetHeight) {
                    var i = 0,
                        n = "...",
                        s = void 0;
                    do i-- , s = t.slice(0, i), this._dropdownLabelHelper.textContent = s + n; while (this._dropdownLabelHelper.offsetHeight > this._newDropdownLabel.offsetHeight)
                }
                this._newDropdownLabel.textContent = this._dropdownLabelHelper.textContent
            }, u.prototype._getScreenSize = function () {
                var e = window,
                    t = {
                        x: 0,
                        y: 0
                    },
                    i = document,
                    n = i.documentElement,
                    s = i.getElementsByTagName("body")[0];
                return t.x = e.innerWidth || n.clientWidth || s.clientWidth, t.y = e.innerHeight || n.clientHeight || s.clientHeight, t
            }, u.prototype._doResize = function () {
                var e = this._container.classList.contains(c);
                if (e) {
                    var t = this._getScreenSize().x;
                    t <= p ? this._openDropdownAsPanel() : this._removeDropdownAsPanel()
                }
            }, u.prototype._openDropdownAsPanel = function () {
                void 0 === this._panel && (this._panelContainer = document.createElement("div"), this._panelContainer.classList.add(a), this._panelContainer.classList.add(t), this._panelContainer.classList.add(c), this._panelContainer.classList.add(d), this._panelContainer.appendChild(this._newDropdown), this._panel = new e.Panel(this._panelContainer))
            }, u.prototype._removeDropdownAsPanel = function (e) {
                var t = this;
                void 0 !== this._panel && (e && e.target === this._panel.panelHost.overlay.overlayElement ? this._container.appendChild(this._newDropdown) : this._panel.dismiss(function () {
                    t._container.appendChild(t._newDropdown)
                }), this._panel = void 0)
            }, u.prototype._onOpenDropdown = function (e) {
                var t = this._container.classList.contains(l),
                    i = this._container.classList.contains(c);
                if (!t && !i) {
                    e.stopPropagation(), this._closeOtherDropdowns(), this._container.classList.add(c), document.addEventListener("click", this._onCloseDropdown);
                    var n = this._getScreenSize().x;
                    n <= p && this._openDropdownAsPanel()
                }
            }, u.prototype._closeOtherDropdowns = function () {
                for (var e = document.querySelectorAll("." + t + "." + c), i = 0; i < e.length; i++) e[i].classList.remove(c)
            }, u.prototype._onCloseDropdown = function (e) {
                this._removeDropdownAsPanel(e), this._container.classList.remove(c), document.removeEventListener("click", this._onCloseDropdown)
            }, u.prototype._onItemSelection = function (e) {
                var t = e.target,
                    i = this._container.classList.contains(l),
                    n = t.classList.contains(l);
                if (!i && !n) {
                    for (var s = 0; s < this._dropdownItems.length; ++s) this._dropdownItems[s].newItem === t ? (this._dropdownItems[s].newItem.classList.add(h), this._dropdownItems[s].oldOption.selected = !0) : (this._dropdownItems[s].newItem.classList.remove(h), this._dropdownItems[s].oldOption.selected = !1);
                    this._newDropdownLabel.innerHTML = t.textContent, this._checkTruncation();
                    var o = document.createEvent("HTMLEvents");
                    o.initEvent("change", !1, !0), this._originalDropdown.dispatchEvent(o)
                }
            }, u
        }();
    e.Dropdown = u
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function t(e) {
            this._container = e;
            var t = this._container.querySelector(".ms-PersonaCard-action.is-active"),
                i = t.getAttribute("data-action-id");
            this._actions = this._container.querySelector(".ms-PersonaCard-actions"), this._expander = this._container.querySelector(".ms-PersonaCard-detailExpander"), this._actionDetailBox = this._container.querySelector(".ms-PersonaCard-actionDetailBox"), this._setDetail(i), this._boundOnActionClick = this._onActionClick.bind(this), this._boundOnExpanderClick = this._onExpanderClick.bind(this), this._boundOnTab = this._onTab.bind(this), this._addListeners()
        }
        return t.prototype.removeListeners = function () {
            this._actions.removeEventListener("click", this._boundOnActionClick), this._expander.removeEventListener("click", this._boundOnExpanderClick), this._container.removeEventListener("keydown", this._boundOnTab)
        }, t.prototype._addListeners = function () {
            this._actions.addEventListener("click", this._boundOnActionClick, !1), this._expander.addEventListener("click", this._boundOnExpanderClick, !1), this._container.addEventListener("keydown", this._boundOnTab, !1)
        }, t.prototype._onTab = function (e) {
            var t = e.target;
            9 === e.keyCode && t.classList.contains("ms-PersonaCard-action") && this._onActionClick(e)
        }, t.prototype._onExpanderClick = function (e) {
            var t = e.target.parentElement;
            t.classList.contains("is-collapsed") ? t.classList.remove("is-collapsed") : t.classList.add("is-collapsed");
            var i = t.clientHeight;
            this._animateDetail(i)
        }, t.prototype._onActionClick = function (e) {
            var t = e.target,
                i = t.getAttribute("data-action-id");
            i && t.className.indexOf("is-active") === -1 && (this._setAction(t), this._setDetail(i))
        }, t.prototype._setAction = function (e) {
            var t = this._container.querySelector(".ms-PersonaCard-action.is-active");
            t.classList.remove("is-active"), e.classList.add("is-active")
        }, t.prototype._setDetail = function (e) {
            var t = ".ms-PersonaCard-details[data-detail-id='" + e + "']",
                i = this._container.querySelector(".ms-PersonaCard-details.is-active"),
                n = this._container.querySelector(t);
            i && i.classList.remove("is-active"), n.classList.add("is-active");
            var s = n.clientHeight;
            this._animateDetail(s)
        }, t.prototype._animateDetail = function (t) {
            var i = this;
            this._actionDetailBox.style.overflowY = "hidden", e.Animate.transition(this._actionDetailBox, {
                height: t,
                duration: .25,
                ease: e.Ease.SINE_EASE_OUT,
                onEnd: function () {
                    i._actionDetailBox.style.overflowY = "auto"
                }
            })
        }, t
    }();
    e.PersonaCard = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = "top",
        i = function () {
            function i(e) {
                this._persona = e, this._personaCard = this._persona.querySelector(".ms-PersonaCard"), this._personaCard && (this._assignEvents(), this._personaCard.setAttribute("style", "display: none;"), this._createPersonaCard())
            }
            return i.prototype._createPersonaCard = function () {
                this._personaCardInstance = new e.PersonaCard(this._personaCard)
            }, i.prototype._createContextualHostInstance = function () {
                this._personaCard.setAttribute("style", "display: block;"), this._contextualHostInstance = new e.ContextualHost(this._personaCard, t, this._persona)
            }, i.prototype._personaEventHandler = function () {
                this._createContextualHostInstance()
            }, i.prototype._assignEvents = function () {
                var e = this;
                this._persona.addEventListener("click", this._personaEventHandler.bind(this), !1), this._persona.addEventListener("keyup", function (t) {
                    return 32 === t.keyCode ? e._personaEventHandler() : null
                }, !1)
            }, i
        }();
    e.Persona = i
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = ".ms-Persona--facePile",
        i = ".ms-Persona-initials",
        n = ".ms-Persona-image",
        s = ".ms-Persona-primaryText",
        o = ".ms-Persona-secondaryText",
        r = function () {
            function r(e) {
                this._personaCollection = [], this._facePile = e, this._createPersonaCollection()
            }
            return r.prototype._createPersonaCollection = function () {
                for (var r = document.querySelectorAll(t), a = 0; a < r.length; a++) {
                    var c = r[a];
                    this._personaCollection.push({
                        item: c,
                        initials: c.querySelector(i).textContent,
                        image: c.querySelector(n) ? c.querySelector(n).getAttribute("src") : null,
                        primaryText: c.querySelector(s) ? c.querySelector(s).textContent : "",
                        secondaryText: c.querySelector(o) ? c.querySelector(o).textContent : "",
                        personaInstance: new e.Persona(c)
                    })
                }
            }, r
        }();
    e.FacePile = r
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function e(e) {
            this._container = e, this._toggleElement = this._container.querySelector(".ms-ListItem-selectionTarget"), this._addListeners()
        }
        return e.prototype.removeListeners = function () {
            this._toggleElement.removeEventListener("click", this._toggleHandler.bind(this))
        }, e.prototype._addListeners = function () {
            this._toggleElement.addEventListener("click", this._toggleHandler.bind(this), !1)
        }, e.prototype._toggleHandler = function () {
            this._container.classList.toggle("is-selected")
        }, e
    }();
    e.ListItem = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function t(t) {
            this._container = t, this._listItemComponents = [];
            for (var i = this._container.querySelectorAll(".ms-ListItem"), n = 0; n < i.length; n++) this._listItemComponents[n] = new e.ListItem(i[n])
        }
        return t
    }();
    e.List = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    "use strict";
    var t = function () {
        function e(e) {
            this._textContainerMaxWidth = 700, this._bufferElementsWidth = 88, this._bufferElementsWidthSmall = 35, this.SMALL_BREAK_POINT = 480, this.container = e, this.init()
        }
        return e.prototype.init = function () {
            this._cacheDOM(), this._setListeners(), this._clientWidth = this._errorBanner.offsetWidth, this._initTextWidth = this._clipper.offsetWidth, this._onResize()
        }, e.prototype.showBanner = function () {
            this._errorBanner.className = "ms-MessageBanner"
        }, e.prototype._onResize = function () {
            this._clientWidth = this._errorBanner.offsetWidth, window.innerWidth >= this.SMALL_BREAK_POINT ? this._resizeRegular() : this._resizeSmall()
        }, e.prototype._resizeRegular = function () {
            this._clientWidth - this._bufferSize > this._initTextWidth && this._initTextWidth < this._textContainerMaxWidth ? (this._textWidth = "auto", this._chevronButton.className = "ms-MessageBanner-expand", this._collapse()) : (this._textWidth = Math.min(this._clientWidth - this._bufferSize, this._textContainerMaxWidth) + "px", this._chevronButton.className.indexOf("is-visible") === -1 && (this._chevronButton.className += " is-visible")), this._clipper.style.width = this._textWidth
        }, e.prototype._resizeSmall = function () {
            this._clientWidth - (this._bufferElementsWidthSmall + this._closeButton.offsetWidth) > this._initTextWidth ? (this._textWidth = "auto", this._collapse()) : this._textWidth = this._clientWidth - (this._bufferElementsWidthSmall + this._closeButton.offsetWidth) + "px", this._clipper.style.width = this._textWidth
        }, e.prototype._cacheDOM = function () {
            this._errorBanner = this.container, this._clipper = this.container.querySelector(".ms-MessageBanner-clipper"), this._chevronButton = this.container.querySelector(".ms-MessageBanner-expand"), this._actionButton = this.container.querySelector(".ms-MessageBanner-action"), this._bufferSize = this._actionButton.offsetWidth + this._bufferElementsWidth, this._closeButton = this.container.querySelector(".ms-MessageBanner-close")
        }, e.prototype._expand = function () {
            var e = this._chevronButton.querySelector(".ms-Icon");
            this._errorBanner.className += " is-expanded", e.className = "ms-Icon ms-IconDoubleChevronUp"
        }, e.prototype._collapse = function () {
            var e = this._chevronButton.querySelector(".ms-Icon");
            this._errorBanner.className = "ms-MessageBanner", e.className = "ms-Icon ms-IconDoubleChevronDown"
        }, e.prototype._toggleExpansion = function () {
            this._errorBanner.className.indexOf("is-expanded") > -1 ? this._collapse() : this._expand()
        }, e.prototype._hideMessageBanner = function () {
            this._errorBanner.className = "ms-MessageBanner is-hidden"
        }, e.prototype._hideBanner = function () {
            this._errorBanner.className.indexOf("hide") === -1 && (this._errorBanner.className += " hide", setTimeout(this._hideMessageBanner.bind(this), 500))
        }, e.prototype._setListeners = function () {
            window.addEventListener("resize", this._onResize.bind(this), !1), this._chevronButton.addEventListener("click", this._toggleExpansion.bind(this), !1), this._closeButton.addEventListener("click", this._hideBanner.bind(this), !1)
        }, e
    }();
    e.MessageBanner = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = "bottom",
        i = "ms-Persona--token",
        n = function () {
            function n(e) {
                this._container = e, this._peoplePickerMenu = this._container.querySelector(".ms-PeoplePicker-results"), this._peoplePickerSearch = this._container.querySelector(".ms-TextField-field"), this._peoplePickerSearchBox = this._container.querySelector(".ms-PeoplePicker-searchBox"), this._selectedPeople = this._container.querySelector(".ms-PeoplePicker-selectedPeople"), this._assignClicks(), this._selectedPeople && (this._assignRemoveHandler(), this._selectedCount = this._container.querySelector(".ms-PeoplePicker-selectedCount"), this._selectedPlural = this._container.querySelector(".ms-PeoplePicker-selectedCountPlural")), this._peoplePickerMenu && this._peoplePickerMenu.setAttribute("style", "display: none;")
            }
            return n.prototype._createModalHost = function (i) {
                i.stopPropagation(), this._peoplePickerMenu.setAttribute("style", "display: block;"), this._contextualHostView = new e.ContextualHost(this._peoplePickerMenu, t, this._peoplePickerSearchBox, (!1), [""], (!0), this._contextHostCallBack.bind(this)), this._peoplePickerSearchBox.classList.add("is-active"), this._isContextualMenuOpen = !0
            }, n.prototype._clickHandler = function (e) {
                this._createModalHost(e);
                var t = this._peoplePickerMenu.querySelector(".ms-PeoplePicker-result"),
                    i = t.parentNode,
                    n = i.cloneNode(!0);
                i.parentNode.replaceChild(n, i), this._peoplePickerResults = this._peoplePickerMenu.querySelectorAll(".ms-PeoplePicker-result");
                for (var s = 0; s < this._peoplePickerResults.length; s++) {
                    var o = this._peoplePickerResults[s].querySelector(".ms-Persona"),
                        r = this._peoplePickerResults[s].querySelector(".ms-PeoplePicker-resultAction");
                    o.addEventListener("click", this._selectResult.bind(this), !0), r.addEventListener("click", this._removeItem.bind(this), !0)
                }
            }, n.prototype._selectResult = function (e) {
                e.stopPropagation();
                var t = this._findElement(e.target, "ms-Persona"),
                    i = t.cloneNode(!0);
                this._container.classList.contains("ms-PeoplePicker--facePile") ? this._addResultToMembers(i) : this._tokenizeResult(i), this._updateCount(), this._contextualHostView.disposeModal()
            }, n.prototype._findElement = function (e, t) {
                for (var i = e.parentNode; !i.classList.contains(t);) i = i.parentNode;
                return i
            }, n.prototype._addRemoveBtn = function (e, t) {
                var i, n = document.createElement("i");
                t ? (i = document.createElement("div"), i.classList.add("ms-Persona-actionIcon"), i.addEventListener("click", this._removeToken.bind(this), !0)) : (i = document.createElement("button"), i.classList.add("ms-PeoplePicker-resultAction"), i.addEventListener("click", this._removeResult.bind(this), !0)),
                    n.classList.add("ms-Icon", "ms-IconCancel"), i.appendChild(n), e.appendChild(i)
            }, n.prototype._removeToken = function (e) {
                var t = this._findElement(e.target, "ms-Persona");
                t.remove()
            }, n.prototype._removeResult = function (e) {
                var t = this._findElement(e.target, "ms-PeoplePicker-selectedPerson");
                t.remove(), this._updateCount()
            }, n.prototype._removeItem = function (e) {
                var t = this._findElement(e.target, "ms-PeoplePicker-result");
                t.remove()
            }, n.prototype._updateCount = function () {
                if (this._selectedPeople) {
                    var e = this._selectedPeople.querySelectorAll(".ms-PeoplePicker-selectedPerson").length;
                    this._selectedCount.textContent = e.toString(), this._selectedPlural.style.display = 1 === e ? "none" : "inline"
                }
            }, n.prototype._tokenizeResult = function (e) {
                var t = this._container.querySelector(".ms-PeoplePicker-searchBox"),
                    n = t.querySelector(".ms-TextField");
                e.classList.add(i, "ms-PeoplePicker-persona"), this._addRemoveBtn(e, !0), e.classList.contains("ms-Persona--sm") && (e.classList.remove("ms-Persona--sm"), e.classList.add("ms-Persona--xs")), t.insertBefore(e, n)
            }, n.prototype._addResultToMembers = function (e) {
                var t = this._container.querySelector(".ms-PeoplePicker-selectedPeople"),
                    i = t.querySelector(".ms-PeoplePicker-selectedPerson"),
                    n = document.createElement("li");
                n.classList.add("ms-PeoplePicker-selectedPerson"), n.tabIndex = 1, n.appendChild(e), this._addRemoveBtn(n, !1), n.querySelector(".ms-PeoplePicker-resultAction").addEventListener("click", this._removeResult.bind(this), !0), t.insertBefore(n, i)
            }, n.prototype._assignClicks = function () {
                var e = this;
                this._peoplePickerSearch.addEventListener("click", this._clickHandler.bind(this), !0), this._peoplePickerSearch.addEventListener("keyup", function (t) {
                    27 === t.keyCode || e._isContextualMenuOpen || e._clickHandler(t)
                }, !0)
            }, n.prototype._assignRemoveHandler = function () {
                for (var e = this._selectedPeople.querySelectorAll(".ms-PeoplePicker-selectedPerson"), t = 0; t < e.length; t++) e[t].querySelector(".ms-PeoplePicker-resultAction").addEventListener("click", this._removeResult.bind(this), !0)
            }, n.prototype._contextHostCallBack = function () {
                this._peoplePickerSearchBox.classList.remove("is-active"), this._isContextualMenuOpen = !1
            }, n
        }();
    e.PeoplePicker = n
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function e(e) {
            this._container = e, this._addListeners();
            var t = this._container.querySelector(".ms-Pivot-content");
            t.style.display = "block"
        }
        return e.prototype.removeListeners = function () {
            this._container.removeEventListener("click", this._selectTab.bind(this))
        }, e.prototype._addListeners = function () {
            var e = this;
            this._container.querySelector(".ms-Pivot-links").addEventListener("click", this._selectTabMouse.bind(this), !1), this._container.addEventListener("keyup", function (t) {
                13 === t.keyCode && e._selectTabKeyboard(t)
            }, !0)
        }, e.prototype._selectTab = function (e) {
            if (e.classList.contains("ms-Pivot-link") && !e.querySelector(".ms-Pivot-ellipsis")) {
                for (var t = e.parentElement.firstElementChild; t;) t.classList.remove("is-selected"), t = t.nextElementSibling;
                e.classList.add("is-selected");
                var i = this._container.querySelectorAll(".ms-Pivot-content");
                Array.prototype.forEach.call(i, function (e, t) {
                    e.style.display = "none"
                });
                var n = e.getAttribute("data-content"),
                    s = this._container.querySelector(".ms-Pivot-content[data-content='" + n + "']");
                s.style.display = "block"
            }
        }, e.prototype._selectTabMouse = function (e) {
            e.preventDefault();
            var t = e.target;
            this._selectTab(t)
        }, e.prototype._selectTabKeyboard = function (e) {
            e.preventDefault();
            var t = e.target;
            this._selectTab(t)
        }, e
    }();
    e.Pivot = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    "use strict";
    var t = function () {
        function e(e) {
            this.container = e, this.cacheDOM()
        }
        return e.prototype.setProgressPercent = function (e) {
            this._progressBar.style.width = Math.round(this._width * e) + "px"
        }, e.prototype.setProgress = function (e) {
            this._progress = e;
            var t = this._progress / this._total;
            this.setProgressPercent(t)
        }, e.prototype.setTotal = function (e) {
            this._total = e
        }, e.prototype.setName = function (e) {
            this._itemName.innerHTML = e
        }, e.prototype.setDescription = function (e) {
            this._itemDescription.innerHTML = e
        }, e.prototype.cacheDOM = function () {
            this._itemName = this.container.querySelector(".ms-ProgressIndicator-itemName") || null, this._itemDescription = this.container.querySelector(".ms-ProgressIndicator-itemDescription") || null, this._progressBar = this.container.querySelector(".ms-ProgressIndicator-progressBar");
            var e = this.container.querySelector(".ms-ProgressIndicator-itemProgress");
            this._width = e.offsetWidth
        }, e
    }();
    e.ProgressIndicator = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function e(e, t) {
            this.element = e, this.j = t
        }
        return e
    }(),
        i = function () {
            function e(e) {
                this.eightSize = .2, this.animationSpeed = 90, this.parentSize = 20, this.fadeIncrement = 0, this.circleObjects = [], this._target = e, this._init()
            }
            return e.prototype.start = function () {
                var e = this;
                this.stop(), this.interval = setInterval(function () {
                    for (var t = e.circleObjects.length; t--;) e._fade(e.circleObjects[t])
                }, this.animationSpeed)
            }, e.prototype.stop = function () {
                clearInterval(this.interval)
            }, e.prototype._init = function () {
                this._setTargetElement(), this._setPropertiesForSize(), this._createCirclesAndArrange(), this._initializeOpacities(), this.start()
            }, e.prototype._setPropertiesForSize = function () {
                this.spinner.className.indexOf("large") > -1 && (this.parentSize = 28, this.eightSize = .179), this.offsetSize = this.eightSize, this.numCircles = 8
            }, e.prototype._setTargetElement = function () {
                this._target.className.indexOf("ms-Spinner") === -1 ? (this.spinner = document.createElement("div"), this.spinner.className = "ms-Spinner", this._target.appendChild(this.spinner)) : this.spinner = this._target
            }, e.prototype._initializeOpacities = function () {
                var e, t = 0,
                    i = 1;
                for (this.fadeIncrement = 1 / this.numCircles, t; t < this.numCircles; t++) {
                    var n = this.circleObjects[t];
                    e = this.fadeIncrement * i++ , this._setOpacity(n.element, e)
                }
            }, e.prototype._fade = function (e) {
                var t = this._getOpacity(e.element) - this.fadeIncrement;
                t <= 0 && (t = 1), this._setOpacity(e.element, t)
            }, e.prototype._getOpacity = function (e) {
                return parseFloat(window.getComputedStyle(e).getPropertyValue("opacity"))
            }, e.prototype._setOpacity = function (e, t) {
                e.style.opacity = t.toString()
            }, e.prototype._createCircle = function () {
                var e = document.createElement("div");
                return e.className = "ms-Spinner-circle", e.style.width = e.style.height = this.parentSize * this.offsetSize + "px", e
            }, e.prototype._createCirclesAndArrange = function () {
                for (var e, i = 0, n = this.parentSize * this.offsetSize, s = 2 * Math.PI / this.numCircles, o = this.numCircles, r = .5 * (this.parentSize - n); o--;) {
                    var a = this._createCircle(),
                        c = Math.round(.5 * this.parentSize + r * Math.cos(i) - .5 * a.clientWidth) - .5 * n,
                        l = Math.round(.5 * this.parentSize + r * Math.sin(i) - .5 * a.clientHeight) - .5 * n;
                    this.spinner.appendChild(a), a.style.left = c + "px", a.style.top = l + "px", i += s, e = new t(a, o), this.circleObjects.push(e)
                }
            }, e
        }();
    e.Spinner = i
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    "use strict";
    var t = function () {
        function e(e) {
            this.container = e, this.container.className.indexOf("ms-Table--selectable") !== -1 && this._addListeners()
        }
        return e.prototype._addListeners = function () {
            this.container.addEventListener("click", this._toggleRowSelection.bind(this), !1)
        }, e.prototype._toggleRowSelection = function (e) {
            var t = e.target.parentElement,
                i = "is-selected";
            t.className === i ? t.className = "" : t.className = i
        }, e
    }();
    e.Table = t
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t;
    ! function (e) {
        ! function (e) {
            e[e.Placeholder = 0] = "Placeholder", e[e.Underlined = 1] = "Underlined"
        }(e.Type || (e.Type = {}));
        e.Type
    }(t || (t = {}));
    var i = function () {
        function e(e) {
            this._container = e, this._type = [], this._textField = this._container.querySelector(".ms-TextField-field"), this._textFieldLabel = this._container.querySelector(".ms-Label"), this._setTextFieldType(), this._addListeners()
        }
        return e.prototype._setTextFieldType = function () {
            this._container.classList.contains("ms-TextField--placeholder") && this._type.push(t.Type.Placeholder), this._container.classList.contains("ms-TextField--underlined") && this._type.push(t.Type.Underlined)
        }, e.prototype._addListeners = function () {
            var e = this;
            this._textFieldLabel.addEventListener("click", function (t) {
                e._textField.focus()
            }), this._type.indexOf(t.Type.Placeholder) >= 0 && (this._textField.addEventListener("focus", function (t) {
                e._textFieldLabel.style.display = "none"
            }), this._textField.addEventListener("blur", function (t) {
                0 === e._textField.value.length && (e._textFieldLabel.style.display = "block")
            })), this._type.indexOf(t.Type.Underlined) >= 0 && (this._textField.addEventListener("focus", function (t) {
                e._container.classList.add("is-active")
            }), this._textField.addEventListener("blur", function (t) {
                e._container.classList.remove("is-active")
            }))
        }, e
    }();
    e.TextField = i
}(fabric || (fabric = {}));
var fabric;
! function (e) {
    var t = function () {
        function e(e) {
            this._container = e, this._toggleField = this._container.querySelector(".ms-Toggle-field"), this._addListeners()
        }
        return e.prototype.removeListeners = function () {
            this._toggleField.removeEventListener("click", this._toggleHandler.bind(this))
        }, e.prototype._addListeners = function () {
            var e = this;
            this._toggleField.addEventListener("click", this._toggleHandler.bind(this), !1), this._toggleField.addEventListener("keyup", function (t) {
                return 32 === t.keyCode ? e._toggleHandler() : null
            }, !1)
        }, e.prototype._toggleHandler = function () {
            this._toggleField.classList.toggle("is-selected")
        }, e
    }();
    e.Toggle = t
}(fabric || (fabric = {}));