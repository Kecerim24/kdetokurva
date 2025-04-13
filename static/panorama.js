// mapy.cz - panorama-1.1.16 (28/1/2025)
(() => {
    "use strict";
    var t = {
            20: (t, e, i) => {
                i.d(e, { Z: () => o });
                var n = i(81),
                    r = i.n(n),
                    a = i(645),
                    s = i.n(a)()(r());
                s.push([
                    t.id,
                    '.panorama {\n  position: relative;\n  overflow: hidden;\n  font-family: Arial, Helvetica, sans-serif;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n@keyframes panorama-loader {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.panorama-loader {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-top: -40px;\n  margin-left: -40px;\n  display: block;\n  width: 80px;\n  height: 80px;\n}\n.panorama-loader:after {\n  content: " ";\n  display: block;\n  width: 64px;\n  height: 64px;\n  margin: 8px;\n  border-radius: 50%;\n  border: 6px solid #000;\n  border-color: #000 transparent #000 transparent;\n  animation: panorama-loader 1.2s linear infinite;\n}\n.panorama-nav {\n  position: absolute;\n  bottom: 40px;\n  left: 50%;\n}\n.panorama-nav > div > div {\n  height: 61px;\n}\n.panorama-nav .buttonset {\n  position: absolute;\n}\n.panorama-nav button {\n  width: 60px;\n  height: 60px;\n  cursor: pointer;\n  display: inline-block;\n  padding: 0;\n  margin: 0;\n  border: none;\n  margin-left: 30px;\n}\n.panorama.available {\n  cursor: pointer;\n}\n.panorama .copyright {\n  line-height: 12px;\n  color: rgba(47, 47, 47, 0.9);\n  text-shadow: #fff -1px -1px 0, #fff 1px -1px 0, #fff -1px 1px 0, #fff 1px 1px 0, #fff -1px 0 0, #fff 1px 0 0, #fff 0 1px 0, #fff 0 -1px 0;\n  position: absolute;\n  left: 9px;\n  bottom: 9px;\n  font-size: 10px;\n  max-width: 40%;\n}\n.panorama .pano-logo {\n  position: absolute;\n  right: 9px;\n  bottom: 6px;\n}\n.panorama .pano-logo img {\n  width: 100px;\n}\n.panorama .pano-timeline {\n  background: rgba(0, 0, 0, 0.4);\n  backdrop-filter: blur(10px);\n  border-radius: 8px;\n  padding: 6px 8px;\n  display: inline-block;\n  user-select: none;\n}\n.panorama .pano-timeline .header {\n  cursor: pointer;\n}\n.panorama .pano-timeline .header span,\n.panorama .pano-timeline .header svg {\n  display: inline-block;\n  vertical-align: top;\n}\n.panorama .pano-timeline .header span {\n  color: #fff;\n  font-size: 14px;\n  line-height: 20px;\n}\n.panorama .pano-timeline .header svg {\n  width: 14px;\n  height: 14px;\n  fill: #fff;\n  margin-left: 6px;\n  margin-top: 2px;\n  float: right;\n}\n.panorama .pano-timeline .header .disabled-year {\n  font-style: italic;\n  color: #ccc;\n}\n.panorama .pano-timeline .tooltip {\n  position: absolute;\n  display: none;\n  background: rgba(89, 92, 97, 0.98);\n  border-radius: 8px;\n  padding: 12px;\n  color: #fff;\n  line-height: 18px;\n  font-size: 14px;\n  width: 140px;\n  margin-left: -24px;\n  left: 0;\n  bottom: -16px;\n  transform: translateY(100%);\n}\n.panorama .pano-timeline .tooltip::after {\n  content: "";\n  position: absolute;\n  left: 50%;\n  top: -12px;\n  margin-left: -8px;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 0 8px 12px 8px;\n  border-color: transparent transparent rgba(89, 92, 97, 0.98) transparent;\n}\n.panorama .pano-timeline ul {\n  margin: 0;\n  padding: 0;\n  display: none;\n}\n.panorama .pano-timeline ul li {\n  display: block;\n  color: #fff;\n  cursor: pointer;\n  font-size: 14px;\n  line-height: 20px;\n  padding: 6px 8px;\n}\n.panorama .pano-timeline ul li svg {\n  width: 14px;\n  height: 14px;\n  fill: #fff;\n  margin-left: 6px;\n  position: relative;\n  top: 2px;\n}\n.panorama .pano-timeline ul li.active {\n  background: #000;\n}\n.panorama .pano-timeline ul li.active .disabled-year {\n  font-style: italic;\n  color: #ccc;\n}\n.panorama .pano-timeline.hide {\n  display: none;\n}\n.panorama .pano-timeline.open {\n  padding: 0;\n}\n.panorama .pano-timeline.open .header {\n  display: none;\n}\n.panorama .pano-timeline.open ul {\n  display: block;\n}\n.panorama .pano-timeline.open ul li:first-child {\n  border-top-left-radius: 8px;\n  border-top-right-radius: 8px;\n}\n.panorama .pano-timeline.open ul li:last-child {\n  border-bottom-left-radius: 8px;\n  border-bottom-right-radius: 8px;\n}\n.popup-holder {\n  align-items: center;\n  background: rgba(0, 0, 0, 0.5);\n  background: rgba(0, 0, 0, 0.7);\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  left: 0;\n  overflow: hidden;\n  position: fixed;\n  right: 0;\n  top: 0;\n  z-index: 1000;\n}\n.popup-holder .popup-info {\n  backdrop-filter: blur(27.1828px);\n  background: #fff;\n  border-radius: 12px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n  box-sizing: border-box;\n  flex: 0 0 auto;\n  padding: 40px;\n  width: 400px;\n}\n.popup-holder .popup-info p {\n  text-align: center;\n  font-size: 16px;\n  line-height: 20px;\n}\n.popup-holder .popup-info .buttons {\n  margin-top: 10px;\n  text-align: center;\n}\n.popup-holder .popup-info .buttons button {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  background: #fff;\n  color: #000;\n  font-size: 14px;\n  line-height: 20px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .panorama .pano-timeline:not(.open):hover .tooltip.has-disabled-year {\n    display: block;\n  }\n}\n@media only screen and (max-width: 600px) {\n  .panorama .copyright .date {\n    display: block;\n  }\n}\n',
                    "",
                ]);
                const o = s;
            },
            645: (t) => {
                t.exports = function (t) {
                    var e = [];
                    return (
                        (e.toString = function () {
                            return this.map(function (e) {
                                var i = "",
                                    n = void 0 !== e[5];
                                return (
                                    e[4] && (i += "@supports (".concat(e[4], ") {")),
                                    e[2] && (i += "@media ".concat(e[2], " {")),
                                    n && (i += "@layer".concat(e[5].length > 0 ? " ".concat(e[5]) : "", " {")),
                                    (i += t(e)),
                                    n && (i += "}"),
                                    e[2] && (i += "}"),
                                    e[4] && (i += "}"),
                                    i
                                );
                            }).join("");
                        }),
                        (e.i = function (t, i, n, r, a) {
                            "string" == typeof t && (t = [[null, t, void 0]]);
                            var s = {};
                            if (n)
                                for (var o = 0; o < this.length; o++) {
                                    var h = this[o][0];
                                    null != h && (s[h] = !0);
                                }
                            for (var l = 0; l < t.length; l++) {
                                var u = [].concat(t[l]);
                                (n && s[u[0]]) ||
                                    (void 0 !== a && (void 0 === u[5] || (u[1] = "@layer".concat(u[5].length > 0 ? " ".concat(u[5]) : "", " {").concat(u[1], "}")), (u[5] = a)),
                                    i && (u[2] ? ((u[1] = "@media ".concat(u[2], " {").concat(u[1], "}")), (u[2] = i)) : (u[2] = i)),
                                    r && (u[4] ? ((u[1] = "@supports (".concat(u[4], ") {").concat(u[1], "}")), (u[4] = r)) : (u[4] = "".concat(r))),
                                    e.push(u));
                            }
                        }),
                        e
                    );
                };
            },
            81: (t) => {
                t.exports = function (t) {
                    return t[1];
                };
            },
            379: (t) => {
                var e = [];
                function i(t) {
                    for (var i = -1, n = 0; n < e.length; n++)
                        if (e[n].identifier === t) {
                            i = n;
                            break;
                        }
                    return i;
                }
                function n(t, n) {
                    for (var a = {}, s = [], o = 0; o < t.length; o++) {
                        var h = t[o],
                            l = n.base ? h[0] + n.base : h[0],
                            u = a[l] || 0,
                            c = "".concat(l, " ").concat(u);
                        a[l] = u + 1;
                        var d = i(c),
                            p = { css: h[1], media: h[2], sourceMap: h[3], supports: h[4], layer: h[5] };
                        if (-1 !== d) e[d].references++, e[d].updater(p);
                        else {
                            var g = r(p, n);
                            (n.byIndex = o), e.splice(o, 0, { identifier: c, updater: g, references: 1 });
                        }
                        s.push(c);
                    }
                    return s;
                }
                function r(t, e) {
                    var i = e.domAPI(e);
                    i.update(t);
                    return function (e) {
                        if (e) {
                            if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap && e.supports === t.supports && e.layer === t.layer) return;
                            i.update((t = e));
                        } else i.remove();
                    };
                }
                t.exports = function (t, r) {
                    var a = n((t = t || []), (r = r || {}));
                    return function (t) {
                        t = t || [];
                        for (var s = 0; s < a.length; s++) {
                            var o = i(a[s]);
                            e[o].references--;
                        }
                        for (var h = n(t, r), l = 0; l < a.length; l++) {
                            var u = i(a[l]);
                            0 === e[u].references && (e[u].updater(), e.splice(u, 1));
                        }
                        a = h;
                    };
                };
            },
            569: (t) => {
                var e = {};
                t.exports = function (t, i) {
                    var n = (function (t) {
                        if (void 0 === e[t]) {
                            var i = document.querySelector(t);
                            if (window.HTMLIFrameElement && i instanceof window.HTMLIFrameElement)
                                try {
                                    i = i.contentDocument.head;
                                } catch (t) {
                                    i = null;
                                }
                            e[t] = i;
                        }
                        return e[t];
                    })(t);
                    if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    n.appendChild(i);
                };
            },
            216: (t) => {
                t.exports = function (t) {
                    var e = document.createElement("style");
                    return t.setAttributes(e, t.attributes), t.insert(e, t.options), e;
                };
            },
            565: (t, e, i) => {
                t.exports = function (t) {
                    var e = i.nc;
                    e && t.setAttribute("nonce", e);
                };
            },
            795: (t) => {
                t.exports = function (t) {
                    if ("undefined" == typeof document) return { update: function () {}, remove: function () {} };
                    var e = t.insertStyleElement(t);
                    return {
                        update: function (i) {
                            !(function (t, e, i) {
                                var n = "";
                                i.supports && (n += "@supports (".concat(i.supports, ") {")), i.media && (n += "@media ".concat(i.media, " {"));
                                var r = void 0 !== i.layer;
                                r && (n += "@layer".concat(i.layer.length > 0 ? " ".concat(i.layer) : "", " {")), (n += i.css), r && (n += "}"), i.media && (n += "}"), i.supports && (n += "}");
                                var a = i.sourceMap;
                                a && "undefined" != typeof btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a)))), " */")), e.styleTagTransform(n, t, e.options);
                            })(e, t, i);
                        },
                        remove: function () {
                            !(function (t) {
                                if (null === t.parentNode) return !1;
                                t.parentNode.removeChild(t);
                            })(e);
                        },
                    };
                };
            },
            589: (t) => {
                t.exports = function (t, e) {
                    if (e.styleSheet) e.styleSheet.cssText = t;
                    else {
                        for (; e.firstChild; ) e.removeChild(e.firstChild);
                        e.appendChild(document.createTextNode(t));
                    }
                };
            },
        },
        e = {};
    function i(n) {
        var r = e[n];
        if (void 0 !== r) return r.exports;
        var a = (e[n] = { id: n, exports: {} });
        return t[n](a, a.exports, i), a.exports;
    }
    (i.n = (t) => {
        var e = t && t.__esModule ? () => t.default : () => t;
        return i.d(e, { a: e }), e;
    }),
        (i.d = (t, e) => {
            for (var n in e) i.o(e, n) && !i.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
        }),
        (i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
        (i.r = (t) => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (i.nc = void 0);
    var n = {};
    (() => {
        i.r(n),
            i.d(n, {
                ICreatePanoFromPid: () => t.ICreatePanoFromPid,
                ICreatePanoFromPositionOpts: () => t.ICreatePanoFromPositionOpts,
                IOutput: () => t.IOutput,
                panoramaExists: () => We,
                panoramaFromImage: () => Ge,
                panoramaFromPid: () => Ke,
                panoramaFromPosition: () => He,
            });
        var t = {};
        i.r(t), i.d(t, { k: () => Xe, d: () => Ve });
        const e = "https://api.mapy.cz/v1/panorama/",
            r = 50,
            a = ["cs", "de", "el", "en", "es", "fr", "it", "nl", "pl", "pt", "ru", "sk", "tr", "uk"],
            s = { api: "mapyapi", apiKeyParam: "apikey", apiKeyHeader: "X-Mapy-Api-Key", headerName: "X-SZN-Sdk", key: "sdk", version: "Armstrong" },
            o = {
                geodis: "© GEODIS BRNO s.r.o",
                geodrom: "© Seznam.cz, a.s.",
                topgis: "© Seznam.cz, a.s.",
                stavinvex: "© Seznam.cz, a.s.",
                krosna: "© Seznam.cz, a.s.",
                stitcherweb: "© Seznam.cz, a.s.",
                gigapanorama: "© Seznam.cz, a.s.",
                cyclomedia: "© Seznam.cz, a.s., Cyclomedia&nbsp;Technology&nbsp;B.V.",
            },
            h = ["panoramika", "seznam"],
            l = { panoramas: {}, neighbors: {} },
            u = [-1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, 1],
            c = [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0],
            d = "active",
            p = "open",
            g = "disabled",
            m = 19,
            _ = "pano-timeline",
            f = { CYCLOMEDIA: "cyclomedia", GIGAPANORAMA: "gigapanorama", STITCHERWEB: "stitcherweb" },
            M = {
                cs: {
                    panoUnsupported: "3d není podporováno, omlouváme se.",
                    newest: "Nejnovější",
                    "pano.notAvail": "Pro vámi zvolený rok Panoramu nemáme. Zobrazujeme snímek z roku {year}.",
                    "pano.contextLost": "Problém se zobrazením panoramy, prosím restartujte prohlížeč a promažte si cookies. Pokud ani toto nepomůže, napište nám přes ikonku Chyba v mapě.",
                    "pano.contextRestore": "Z důvodů nečinnosti prohlížeč pozastavil zobrazení panoramy.",
                    "pano.restoreBtn": "Obnovit panoramu",
                    "pano.close": "Zavřít",
                    "pano.error.previewImage": "Nelze načíst náhled panoramy",
                    "pano.error.missingApiKey": "Chybí API klíč",
                    "pano.error.wrongApiKey": "Špatný API klíč",
                    "pano.error.wrongApiKey2": "Neplatný nebo nezadaný API klíč. Pro konzumaci Panorami zadejte platný API klíč.",
                    "pano.error.getBest": "Pro souřadnice lon {lon}, lat {lat} s radiusem {radius} nebyla nalezena žádná panorama",
                    "pano.error.getDetail": "Pro pid {pid} nebyla nalezena žádná panorama",
                },
                de: {
                    panoUnsupported: "3d ist nicht unterstützt, es tut uns leid.",
                    newest: "Letzte",
                    "pano.notAvail": "Für das von Ihnen gewählte Jahr haben wir kein Panorama. Dieses Bild ist aus dem Jahr {year}.",
                    "pano.contextLost": "Problem mit der Anzeige des Panoramas, bitte starten Sie Ihren Browser neu und löschen Sie Ihre Cookies. Sollte dies nicht helfen, kontaktieren Sie uns bitte über das Symbol Fehler in der Karte.",
                    "pano.contextRestore": "Aufgrund von Inaktivität hat der Browser die Anzeige der Panoramaansicht unterbrochen.",
                    "pano.restoreBtn": "Panorama wiederherstellen",
                    "pano.close": "Schließen",
                    "pano.error.previewImage": "Panorama-Vorschau kann nicht geladen werden",
                    "pano.error.missingApiKey": "Fehlender API-Schlüssel",
                    "pano.error.wrongApiKey": "Ungültiger API-Schlüssel",
                    "pano.error.getBest": "Es wurden keine Panoramen für die Koordinaten lon {lon}, lat {lat} mit Radius {radius} gefunden",
                    "pano.error.getDetail": "Keine Panoramen für pid {pid} gefunden",
                },
                en: {
                    panoUnsupported: "Sorry but 3d is not supported.",
                    newest: "Most recent",
                    "pano.notAvail": "We do not have a Panorama for the year you selected. We are displaying an image from {year}.",
                    "pano.contextLost": 'Problem with displaying panorama, please restart your browser and clear your cookies. If this does not help, please contact us via the "Error in map" icon.',
                    "pano.contextRestore": "The browser has stopped displaying the panorama due to inactivity.",
                    "pano.restoreBtn": "Refresh panorama",
                    "pano.close": "Close",
                    "pano.error.previewImage": "Unable to load panorama preview",
                    "pano.error.missingApiKey": "Missing API key",
                    "pano.error.wrongApiKey": "Wrong API key",
                    "pano.error.getBest": "No panorama found for lon {lon}, lat {lat} coordinates with radius {radius}",
                    "pano.error.getDetail": "No panorama found for pid {pid}",
                },
                es: { panoUnsupported: "3d no está apoyado, nosotros nos disculpamos.", newest: "newest" },
                fr: { panoUnsupported: "3d n’est pas supporté, on s’excuse.", newest: "newest" },
                hu: { panoUnsupported: "A 3D nem támogatott, elnézését kérjük.", newest: "Legújabbak", "pano.notAvail": "Sajnos nem áll rendeketésre panoráma az Ön által választott évben. Ez a kép a alábbi évből származik {year}." },
                it: { panoUnsupported: "panoUnsupported", newest: "newest" },
                nl: { panoUnsupported: "panoUnsupported", newest: "newest" },
                pl: {
                    panoUnsupported: "Przepraszamy, widok 3D nie jest obsługiwany.",
                    newest: "Najnowsze",
                    "pano.notAvail": "Nie mamy Panoramy z wybranego przez Ciebie roku. Pokazujemy zdjęcie z {year}.",
                    "pano.contextLost": "Problem z wyświetlaniem panoramy, zrestartuj przeglądarkę i usuń pliki cookie. Jeśli to też nie pomoże, napisz do nas za pomocą ikony błędu na mapie.",
                    "pano.contextRestore": "Z powodu braku aktywności przeglądarka wstrzymała widok panoramy.",
                    "pano.restoreBtn": "Odśwież panoramę",
                    "pano.close": "Zamknij",
                    "pano.error.previewImage": "Nie można załadować podglądu panoramy",
                    "pano.error.missingApiKey": "Brak klucza API",
                    "pano.error.wrongApiKey": "Zły klucz API",
                    "pano.error.getBest": "Nie znaleziono panoramy dla współrzędnych długość {lon}, szerokość {lat} o promieniu {radius}",
                    "pano.error.getDetail": "Nie znaleziono panoramy dla pid {pid}",
                },
                ru: {
                    panoUnsupported: "Извините, формат 3D не поддерживается.",
                    newest: "Самые новые",
                    "pano.notAvail": "У нас нет панорамы за выбранный вами год. Показан снимок за {year} год.",
                    "pano.contextLost": 'Проблема с отображением панорамы, перезапустите браузер и удалите файлы куки. Если это не поможет, напишите нам через иконку "Ошибка на карте".',
                    "pano.contextRestore": "Из-за отсутствия активности браузер приостановил просмотр панорамы.",
                    "pano.restoreBtn": "Обновить панорамный вид",
                    "pano.close": "Закрыть",
                    "pano.error.previewImage": "Не удалось загрузить предварительный просмотр панорамы",
                    "pano.error.missingApiKey": "Ключ API отсутствует",
                    "pano.error.wrongApiKey": "Неверный ключ API",
                    "pano.error.getBest": "Не найдена панорама для координат lon {lon}, lat {lat} с радиусом {radius}",
                    "pano.error.getDetail": "Для {pid} не найдена ни одна панорама",
                },
                sk: {
                    panoUnsupported: "3d nie je podporované, ospravedlňujeme sa.",
                    newest: "Najnovšie",
                    "pano.notAvail": "Pre vami zvolený rok Panorámu nemáme. Zobrazujeme snímku z roku {year}.",
                    "pano.contextLost": "Problém so zobrazením panorámy, prosím reštartujte prehliadač a premažte si cookies. Pokiaľ ani toto nepomôže, napíšte nám cez ikonku Chyba v mape.",
                    "pano.contextRestore": "Z dôvodu nečinnosti prehliadač pozastavil zobrazenie panorámy.",
                    "pano.restoreBtn": "Obnoviť panorámu",
                    "pano.close": "Zatvoriť",
                    "pano.error.missingApiKey": "Chýba API kľúč",
                    "pano.error.wrongApiKey": "Nesprávny API kľúč",
                },
                tr: { panoUnsupported: "panoUnsupported", newest: "newest" },
                uk: {
                    panoUnsupported: "Вибачте, 3D не підтримується.",
                    newest: "Найновіші",
                    "pano.notAvail": "Ми не маємо панорами за обраний вами рік. Показано зображення за {year} рік.",
                    "pano.contextLost": 'Проблема із зображенням панорами, перезавантажте браузер і видаліть файли cookie. Якщо це не допоможе, напишіть нам, натиснувши на значок "Помилка на карті".',
                    "pano.contextRestore": "Через відсутність активності браузер призупинив перегляд панорами.",
                    "pano.restoreBtn": "Відновити панораму",
                    "pano.close": "Закрити",
                    "pano.error.previewImage": "Не вдалося завантажити попередній перегляд панорами",
                    "pano.error.missingApiKey": "Відсутній ключ API",
                    "pano.error.wrongApiKey": "Недійсний ключ API",
                    "pano.error.getBest": "Для координат довгота {lon}, широта {lat} з радіусом {radius} не знайдено жодної панорами",
                    "pano.error.getDetail": "Для {pid} немає жодної панорами",
                },
            },
            y = 1e-6;
        let L = "undefined" != typeof Float32Array ? Float32Array : Array;
        Math.random;
        Math.PI;
        function v() {
            let t = new L(16);
            return (
                L != Float32Array && ((t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = 0), (t[6] = 0), (t[7] = 0), (t[8] = 0), (t[9] = 0), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0)), (t[0] = 1), (t[5] = 1), (t[10] = 1), (t[15] = 1), t
            );
        }
        function A(t) {
            return (t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = 0), (t[5] = 1), (t[6] = 0), (t[7] = 0), (t[8] = 0), (t[9] = 0), (t[10] = 1), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0), (t[15] = 1), t;
        }
        function j(t, e, i) {
            let n,
                r,
                a,
                s,
                o,
                h,
                l,
                u,
                c,
                d,
                p,
                g,
                m = i[0],
                _ = i[1],
                f = i[2];
            return (
                e === t
                    ? ((t[12] = e[0] * m + e[4] * _ + e[8] * f + e[12]), (t[13] = e[1] * m + e[5] * _ + e[9] * f + e[13]), (t[14] = e[2] * m + e[6] * _ + e[10] * f + e[14]), (t[15] = e[3] * m + e[7] * _ + e[11] * f + e[15]))
                    : ((n = e[0]),
                      (r = e[1]),
                      (a = e[2]),
                      (s = e[3]),
                      (o = e[4]),
                      (h = e[5]),
                      (l = e[6]),
                      (u = e[7]),
                      (c = e[8]),
                      (d = e[9]),
                      (p = e[10]),
                      (g = e[11]),
                      (t[0] = n),
                      (t[1] = r),
                      (t[2] = a),
                      (t[3] = s),
                      (t[4] = o),
                      (t[5] = h),
                      (t[6] = l),
                      (t[7] = u),
                      (t[8] = c),
                      (t[9] = d),
                      (t[10] = p),
                      (t[11] = g),
                      (t[12] = n * m + o * _ + c * f + e[12]),
                      (t[13] = r * m + h * _ + d * f + e[13]),
                      (t[14] = a * m + l * _ + p * f + e[14]),
                      (t[15] = s * m + u * _ + g * f + e[15])),
                t
            );
        }
        function b(t, e, i, n) {
            let r,
                a,
                s,
                o,
                h,
                l,
                u,
                c,
                d,
                p,
                g,
                m,
                _,
                f,
                M,
                L,
                v,
                A,
                j,
                b,
                w,
                x,
                S,
                N,
                I = n[0],
                D = n[1],
                E = n[2],
                C = Math.sqrt(I * I + D * D + E * E);
            return C < y
                ? null
                : ((C = 1 / C),
                  (I *= C),
                  (D *= C),
                  (E *= C),
                  (r = Math.sin(i)),
                  (a = Math.cos(i)),
                  (s = 1 - a),
                  (o = e[0]),
                  (h = e[1]),
                  (l = e[2]),
                  (u = e[3]),
                  (c = e[4]),
                  (d = e[5]),
                  (p = e[6]),
                  (g = e[7]),
                  (m = e[8]),
                  (_ = e[9]),
                  (f = e[10]),
                  (M = e[11]),
                  (L = I * I * s + a),
                  (v = D * I * s + E * r),
                  (A = E * I * s - D * r),
                  (j = I * D * s - E * r),
                  (b = D * D * s + a),
                  (w = E * D * s + I * r),
                  (x = I * E * s + D * r),
                  (S = D * E * s - I * r),
                  (N = E * E * s + a),
                  (t[0] = o * L + c * v + m * A),
                  (t[1] = h * L + d * v + _ * A),
                  (t[2] = l * L + p * v + f * A),
                  (t[3] = u * L + g * v + M * A),
                  (t[4] = o * j + c * b + m * w),
                  (t[5] = h * j + d * b + _ * w),
                  (t[6] = l * j + p * b + f * w),
                  (t[7] = u * j + g * b + M * w),
                  (t[8] = o * x + c * S + m * N),
                  (t[9] = h * x + d * S + _ * N),
                  (t[10] = l * x + p * S + f * N),
                  (t[11] = u * x + g * S + M * N),
                  e !== t && ((t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), (t[15] = e[15])),
                  t);
        }
        function w(t, e, i) {
            let n = Math.sin(i),
                r = Math.cos(i),
                a = e[0],
                s = e[1],
                o = e[2],
                h = e[3],
                l = e[8],
                u = e[9],
                c = e[10],
                d = e[11];
            return (
                e !== t && ((t[4] = e[4]), (t[5] = e[5]), (t[6] = e[6]), (t[7] = e[7]), (t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), (t[15] = e[15])),
                (t[0] = a * r - l * n),
                (t[1] = s * r - u * n),
                (t[2] = o * r - c * n),
                (t[3] = h * r - d * n),
                (t[8] = a * n + l * r),
                (t[9] = s * n + u * r),
                (t[10] = o * n + c * r),
                (t[11] = h * n + d * r),
                t
            );
        }
        const x = function (t, e, i, n, r) {
            const a = 1 / Math.tan(e / 2);
            if (((t[0] = a / i), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = 0), (t[5] = a), (t[6] = 0), (t[7] = 0), (t[8] = 0), (t[9] = 0), (t[11] = -1), (t[12] = 0), (t[13] = 0), (t[15] = 0), null != r && r !== 1 / 0)) {
                const e = 1 / (n - r);
                (t[10] = (r + n) * e), (t[14] = 2 * r * n * e);
            } else (t[10] = -1), (t[14] = -2 * n);
            return t;
        };
        function S() {
            let t = new L(3);
            return L != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0)), t;
        }
        function N(t, e, i) {
            let n = new L(3);
            return (n[0] = t), (n[1] = e), (n[2] = i), n;
        }
        function I(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
        }
        function D(t, e, i) {
            let n = e[0],
                r = e[1],
                a = e[2],
                s = i[0],
                o = i[1],
                h = i[2];
            return (t[0] = r * h - a * o), (t[1] = a * s - n * h), (t[2] = n * o - r * s), t;
        }
        const E = function (t) {
            let e = t[0],
                i = t[1],
                n = t[2];
            return Math.sqrt(e * e + i * i + n * n);
        };
        !(function () {
            let t = S();
        })();
        !(function () {
            let t = (function () {
                let t = new L(4);
                return L != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 0)), t;
            })();
        })();
        function C() {
            let t = new L(4);
            return L != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0)), (t[3] = 1), t;
        }
        function T(t, e, i, n) {
            let r,
                a,
                s,
                o,
                h,
                l = e[0],
                u = e[1],
                c = e[2],
                d = e[3],
                p = i[0],
                g = i[1],
                m = i[2],
                _ = i[3];
            return (
                l * p + u * g + c * m + d * _,
                a < 0 && (-a, -p, -g, -m, -_),
                1 - a > y ? (Math.acos(a), Math.sin(r), Math.sin((1 - n) * r) / s, Math.sin(n * r) / s) : (1 - n, n),
                (t[0] = o * l + h * p),
                (t[1] = o * u + h * g),
                (t[2] = o * c + h * m),
                (t[3] = o * d + h * _),
                t
            );
        }
        const z = function (t, e) {
            let i = e[0],
                n = e[1],
                r = e[2],
                a = e[3],
                s = i * i + n * n + r * r + a * a;
            return s > 0 && (s = 1 / Math.sqrt(s)), (t[0] = i * s), (t[1] = n * s), (t[2] = r * s), (t[3] = a * s), t;
        };
        (function () {
            let t = S(),
                e = N(1, 0, 0),
                i = N(0, 1, 0);
        })(),
            (function () {
                let t = C(),
                    e = C();
            })(),
            (function () {
                let t = (function () {
                    let t = new L(9);
                    return L != Float32Array && ((t[1] = 0), (t[2] = 0), (t[3] = 0), (t[5] = 0), (t[6] = 0), (t[7] = 0)), (t[0] = 1), (t[4] = 1), (t[8] = 1), t;
                })();
            })();
        function P(t, e) {
            const i = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
            if (!i) throw new Error("WebGL not supported");
            return i;
        }
        function O(t, e, i) {
            const n = t.createShader(e);
            if ((t.shaderSource(n, i), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS))) throw new Error("Could not compile shader: " + +t.getShaderInfoLog(n));
            return n;
        }
        function k(t, e, i) {
            const n = t.createProgram();
            if ((t.attachShader(n, e), t.attachShader(n, i), t.linkProgram(n), !t.getProgramParameter(n, t.LINK_STATUS))) throw new Error("Could not link the shader program");
            return n;
        }
        function U(t, e) {
            const i = t.createTexture();
            return (
                t.bindTexture(t.TEXTURE_2D, i),
                t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0),
                t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
                t.bindTexture(t.TEXTURE_2D, null),
                i
            );
        }
        function R(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e &&
                    (n = n.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    i.push.apply(i, n);
            }
            return i;
        }
        function Y(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? R(Object(i), !0).forEach(function (e) {
                          B(t, e, i[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
                    : R(Object(i)).forEach(function (e) {
                          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
                      });
            }
            return t;
        }
        function B(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        const F = (t) => {
            if ("undefined" == typeof window || void 0 === window.AbortController) return;
            const e = new AbortController();
            return setTimeout(() => e.abort(), t), e.signal;
        };
        function Q() {
            const t = new Date();
            t.setHours(0), t.setMinutes(0), t.setSeconds(1), t.setMilliseconds(0);
            const e = [s.api, s.version, (t.getTime() / 1e3) >>> 0].join(","),
                i = [];
            for (let t = 0, n = e.length, r = s.key.length, a = 0; t < n; t++) {
                const n = e[t].charCodeAt(0),
                    o = s.key[a].charCodeAt(0);
                i.push(String.fromCharCode(n ^ o)), a++, a === r && (a = 0);
            }
            return btoa(i.join(""));
        }
        function Z(t, e, i) {
            const n = new AbortController();
            return {
                promise: new Promise((r, a) => {
                    fetch(
                        t,
                        Y(
                            Y({}, e),
                            {},
                            { headers: Y(Y({ Accept: "application/json", [s.headerName]: Q() }, i && "string" == typeof i.apiKey ? { [s.apiKeyHeader]: i.apiKey } : {}), e.headers || {}), credentials: "include" },
                            i && "number" == typeof i.timeout ? { signal: F(i.timeout) } : { signal: n.signal }
                        )
                    )
                        .then(
                            (t) => {
                                r(t);
                            },
                            (t) => a(t)
                        )
                        .catch((t) => a(t));
                }),
                abort: () => n.abort(),
            };
        }
        function V(t, e, i) {
            const n = Z(t, e, i);
            return {
                promise: new Promise((t, e) => {
                    n.promise.then(
                        (i) => {
                            "application/json" === i.headers.get("content-type")
                                ? i.json().then(
                                      (n) => {
                                          i.status < 200 || i.status > 299 ? e(n) : t(n);
                                      },
                                      (t) => e(t)
                                  )
                                : (i.status < 200 || i.status, e(i));
                        },
                        (t) => e(t)
                    );
                }),
                abort: n.abort,
            };
        }
        function X(t, e) {
            let i = t;
            if ("function" == typeof window.URL) {
                const t = i.match(/^\/\/?/u);
                t && (i = "//" === t[0] ? location.protocol + i : location.origin + i);
                const n = new URL(i);
                return n.searchParams.append(s.key, Q()), e && n.searchParams.append(s.apiKeyParam, e), n.toString();
            }
            return `${i}${-1 === i.indexOf("?") ? "?" : "&"}${s.key}=${encodeURIComponent(Q())}${e ? `&${s.apiKeyParam}=${encodeURIComponent(e)}` : ""}`;
        }
        function W(t, e) {
            return `${t}x${e}`;
        }
        function H(t, e) {
            const i = 2 * Math.PI;
            let n = t - e;
            return n < -Math.PI && (n += i), n > Math.PI && (n -= i), n;
        }
        function K(t, e, i) {
            const n = e.replace(/.*\//u, ""),
                r = n.match(/x/gu),
                a = n.match(/y/gu);
            if (r && a) {
                const n = t[0].toString(16).padStart(r.length, "0"),
                    s = t[1].toString(16).padStart(a.length, "0");
                return X(e.replace(r.join(""), n).replace(a.join(""), s), i);
            }
            return X(e, i);
        }
        function G(t, e, i) {
            return { year: i, newestYear: !(!i || !e.length) && i === e[0], pid: t };
        }
        function q(t, e, i, n, r) {
            const a = i / 2,
                s = n / 2,
                o = (t - a) / a,
                h = (s - e) / s,
                l = r.fov,
                u = 1 / Math.tan(l / 2),
                c = u / (a / s),
                d = c * c,
                p = u * u,
                g = Math.sqrt(d * (p + h * h) + p * o * o),
                m = N((u * o) / g, (c * h) / g, (-c * u) / g),
                _ = C();
            !(function (t, e, i) {
                i *= 0.5;
                let n = e[0],
                    r = e[1],
                    a = e[2],
                    s = e[3],
                    o = Math.sin(i),
                    h = Math.cos(i);
                (t[0] = n * h - a * o), (t[1] = r * h + s * o), (t[2] = a * h + n * o), (t[3] = s * h - r * o);
            })(_, _, -r.yaw),
                (function (t, e, i) {
                    i *= 0.5;
                    let n = e[0],
                        r = e[1],
                        a = e[2],
                        s = e[3],
                        o = Math.sin(i),
                        h = Math.cos(i);
                    (t[0] = n * h + s * o), (t[1] = r * h + a * o), (t[2] = a * h - r * o), (t[3] = s * h - n * o);
                })(_, _, -r.pitch),
                (function (t, e, i) {
                    let n = i[0],
                        r = i[1],
                        a = i[2],
                        s = i[3],
                        o = e[0],
                        h = e[1],
                        l = e[2],
                        u = r * l - a * h,
                        c = a * o - n * l,
                        d = n * h - r * o,
                        p = r * d - a * c,
                        g = a * u - n * d,
                        m = n * c - r * u,
                        _ = 2 * s;
                    (u *= _), (c *= _), (d *= _), (p *= 2), (g *= 2), (m *= 2), (t[0] = o + u + p), (t[1] = h + c + g), (t[2] = l + d + m);
                })(m, m, _);
            return { pitch: -Math.asin(m[1]), yaw: Math.atan2(m[0], -m[2]) };
        }
        function J(t, e, i) {
            const n = t.getSize(),
                r = t.getCamera();
            return q(e, i, n.width, n.height, r);
        }
        function $(t, e) {
            const i = -1 === a.indexOf(t) ? a[0] : t;
            return i in M && e in M[i] ? M[i][e] : e;
        }
        function tt(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        class et {
            constructor() {
                tt(this, "_tilesQueue", void 0),
                    tt(this, "_runningRequests", void 0),
                    tt(this, "_maxImgRequests", void 0),
                    tt(this, "_timestamp", void 0),
                    tt(this, "_loadedUrls", void 0),
                    (this._tilesQueue = []),
                    (this._runningRequests = []),
                    (this._maxImgRequests = 4),
                    (this._timestamp = ""),
                    (this._loadedUrls = {});
            }
            setTimestamp(t) {
                this._timestamp = t;
            }
            addImage(t, e, i) {
                this._tilesQueue.push({ sphere: t, tile: e, url: i });
            }
            getLoadedImgsCount() {
                return Object.keys(this._loadedUrls).length;
            }
            clear() {
                for (this._tilesQueue.length = 0; this._runningRequests.length; ) {
                    this._runningRequests.pop().tile.abortImage();
                }
            }
            runQueue() {
                if (this._tilesQueue.length > 0 && this._runningRequests.length <= this._maxImgRequests) {
                    const t = this._tilesQueue.shift(),
                        e = new URL(t.url);
                    this._timestamp && e.searchParams.append("timestamp", this._timestamp);
                    const i = e.toString();
                    t.sphere.imageStart();
                    const n = () => {
                        const e = this._runningRequests.indexOf(t);
                        -1 !== e && this._runningRequests.splice(e, 1), t.sphere.imageDone(), (this._loadedUrls[i] = 1), this._runningRequests.length && this.runQueue();
                    };
                    this._runningRequests.push(t), t.tile.setImage(i).then(n, n), this.runQueue();
                }
            }
        }
        function it(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        class nt {
            constructor(t, e, i) {
                it(this, "_gl", void 0),
                    it(this, "_position", void 0),
                    it(this, "_id", void 0),
                    it(this, "_texture", void 0),
                    it(this, "_background", void 0),
                    it(this, "_count", void 0),
                    it(this, "_color", void 0),
                    it(this, "_loadingImg", void 0),
                    it(this, "_buffers", void 0),
                    (this._gl = t),
                    (this._position = e),
                    (this._id = W(this._position[0], this._position[1])),
                    (this._texture = null),
                    (this._background = null),
                    (this._count = i.vertices.length / 3),
                    (this._color = new Float32Array([0.5 + Math.random() / 2, 0.5 + Math.random() / 2, 0.5 + Math.random() / 2])),
                    (this._loadingImg = null),
                    (this._buffers = { vertices: this._gl.createBuffer(), bary: this._gl.createBuffer(), localUVs: this._gl.createBuffer(), globalUVs: this._gl.createBuffer() }),
                    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffers.vertices),
                    this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(i.vertices), this._gl.STATIC_DRAW);
                let n = [];
                const r = [0, 0, 1, 0, 1, 0, 1, 0, 0];
                for (; n.length < i.vertices.length; ) n = n.concat(r);
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffers.bary),
                    this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(n), this._gl.STATIC_DRAW),
                    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffers.localUVs),
                    this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(i.localUVs), this._gl.STATIC_DRAW),
                    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffers.globalUVs),
                    this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(i.globalUVs), this._gl.STATIC_DRAW);
            }
            destroy() {
                this.abortImage(),
                    (this._background = null),
                    this.setImage(null),
                    Object.keys(this._buffers).forEach((t) => {
                        this._gl.deleteBuffer(this._buffers[t]);
                    }),
                    (this._buffers = { vertices: null, bary: null, localUVs: null, globalUVs: null }),
                    (this._gl = null);
            }
            setBackgroundTexture(t) {
                this._texture || (this._background = t);
            }
            abortImage() {
                this._loadingImg && ((this._loadingImg.onload = null), (this._loadingImg.onerror = null), (this._loadingImg.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="));
            }
            getPosition() {
                return this._position;
            }
            getID() {
                return this._id;
            }
            hasTexture() {
                return !!this._texture;
            }
            setImage(t) {
                return new Promise((e, i) => {
                    this._texture && (this._gl.activeTexture(this._gl.TEXTURE0), this._gl.bindTexture(this._gl.TEXTURE_2D, null), this._gl.deleteTexture(this._texture), (this._texture = null)),
                        t
                            ? ((this._loadingImg = new Image()),
                              (this._loadingImg.crossOrigin = "anonymous"),
                              this._loadingImg.addEventListener("load", () => {
                                  (this._loadingImg.onload = null), this._gl ? ((this._texture = U(this._gl, this._loadingImg)), (this._loadingImg = null), e(this)) : (this._loadingImg = null);
                              }),
                              this._loadingImg.addEventListener("error", () => {
                                  this._loadingImg && ((this._loadingImg.onerror = null), (this._loadingImg = null)), i(this);
                              }),
                              (this._loadingImg.src = t))
                            : e(this);
                });
            }
            draw(t) {
                let e = null,
                    i = null;
                if (this._texture) (e = this._texture), (i = this._buffers.localUVs);
                else {
                    if (!this._background) return;
                    (e = this._background), (i = this._buffers.globalUVs);
                }
                this._gl.activeTexture(this._gl.TEXTURE0), this._gl.bindTexture(this._gl.TEXTURE_2D, e);
                let n = this._gl.getUniformLocation(t, "uSampler");
                this._gl.uniform1i(n, 0),
                    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, i),
                    (n = this._gl.getAttribLocation(t, "aTextureCoord")),
                    this._gl.vertexAttribPointer(n, 2, this._gl.FLOAT, !1, 0, 0),
                    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffers.vertices),
                    (n = this._gl.getAttribLocation(t, "aPosition")),
                    this._gl.vertexAttribPointer(n, 3, this._gl.FLOAT, !1, 0, 0),
                    this._gl.drawArrays(this._gl.TRIANGLES, 0, this._count);
            }
            drawDebug(t) {
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffers.vertices);
                let e = this._gl.getAttribLocation(t, "aPosition");
                this._gl.vertexAttribPointer(e, 3, this._gl.FLOAT, !1, 0, 0),
                    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffers.bary),
                    (e = this._gl.getAttribLocation(t, "aBaryPosition")),
                    this._gl.vertexAttribPointer(e, 3, this._gl.FLOAT, !1, 0, 0);
                const i = this._gl.getUniformLocation(t, "uColor");
                this._gl.uniform3fv(i, this._color), this._gl.drawArrays(this._gl.TRIANGLES, 0, this._count);
            }
        }
        function rt(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e &&
                    (n = n.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    i.push.apply(i, n);
            }
            return i;
        }
        function at(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        class st {
            constructor(t, e, i, n, r, a, s) {
                at(this, "_gl", void 0),
                    at(this, "_options", void 0),
                    at(this, "_template", void 0),
                    at(this, "_scene", void 0),
                    at(this, "_level", void 0),
                    at(this, "_panoImages", void 0),
                    at(this, "_tilesCache", void 0),
                    at(this, "_currentTiles", void 0),
                    at(this, "_currentTilesHash", void 0),
                    at(this, "_useTileImages", void 0),
                    at(this, "_dirty", void 0),
                    at(this, "_texture", void 0),
                    at(this, "_imagesToLoad", void 0),
                    at(this, "_tileCount", void 0),
                    at(this, "_apiKey", void 0),
                    (this._gl = t),
                    (this._options = (function (t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var i = null != arguments[e] ? arguments[e] : {};
                            e % 2
                                ? rt(Object(i), !0).forEach(function (e) {
                                      at(t, e, i[e]);
                                  })
                                : Object.getOwnPropertyDescriptors
                                ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
                                : rt(Object(i)).forEach(function (e) {
                                      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
                                  });
                        }
                        return t;
                    })({ radius: 1, segments: [40, 20], tileSize: [5, 5], maxCacheItems: 100 }, e)),
                    (this._template = i),
                    (this._scene = n),
                    (this._apiKey = n.getOptions().apiKey),
                    (this._level = r),
                    (this._panoImages = a),
                    (this._tilesCache = {}),
                    (this._currentTiles = []),
                    (this._currentTilesHash = ""),
                    (this._useTileImages = s),
                    (this._tileCount = [this._options.segments[0] / this._options.tileSize[0], this._options.segments[1] / this._options.tileSize[1]]),
                    (this._dirty = !1),
                    (this._texture = null),
                    (this._imagesToLoad = 0);
            }
            destroy() {
                Object.keys(this._tilesCache).forEach((t) => {
                    this._tilesCache[t].tile.destroy();
                }),
                    this._initCache(),
                    this._texture && this._gl && (this._gl.activeTexture(this._gl.TEXTURE0), this._gl.bindTexture(this._gl.TEXTURE_2D, null), this._gl.deleteTexture(this._texture), (this._texture = null));
            }
            preLoad() {
                this._getTiles();
            }
            isDirty() {
                return this._dirty && this._currentTiles.length > 0;
            }
            timestampRedraw() {
                this._initCache(), (this._dirty = !0), this._getTiles(), this._scene.getRenderer().redraw();
            }
            setImage(t) {
                return new Promise((e, i) => {
                    const n = new Image();
                    (n.crossOrigin = "anonymous"),
                        n.addEventListener("load", () => {
                            this._gl &&
                                ((this._texture = U(this._gl, n)),
                                0 === this._level &&
                                    this._currentTiles.forEach((t) => {
                                        t.setBackgroundTexture(this._texture);
                                    }),
                                (this._dirty = !0),
                                this._scene.getRenderer().redraw(),
                                e(this));
                        }),
                        n.addEventListener("error", (t) => {
                            i(t);
                        }),
                        (n.src = t);
                });
            }
            draw(t) {
                (this._dirty = !1), this._getTiles().forEach((e) => e.draw(t)), this._clearCache();
            }
            imageStart() {
                this._imagesToLoad++;
            }
            imageDone() {
                this._imagesToLoad--, this._gl && ((this._dirty = !0), this._scene.getRenderer().redraw());
            }
            drawDebug(t) {
                this._getTiles().forEach((e) => e.drawDebug(t));
            }
            _buildTile(t, e, i) {
                const n = t * i[0],
                    r = e * i[1],
                    a = n + i[0],
                    s = r + i[1],
                    o = [];
                for (let t = r; t <= s; t++) {
                    const e = [];
                    for (let i = n; i <= a; i++) {
                        const o = i / this._options.segments[0],
                            h = t / this._options.segments[1],
                            l = (i - n) / (a - n),
                            u = (t - r) / (s - r),
                            c = this._buildVertex(o, h);
                        e.push({ vertex: c, localUV: [l, 1 - u], globalUV: [o, 1 - h] });
                    }
                    o.push(e);
                }
                const h = [],
                    l = [],
                    u = [];
                for (let t = 0; t < i[1]; t++)
                    for (let n = 0; n < i[0]; n++) {
                        const r = o[t][n + 1],
                            a = o[t][n],
                            c = o[t + 1][n],
                            d = o[t + 1][n + 1],
                            p = [];
                        0 === t && 0 === e ? p.push(r, c, d) : t + 1 === i[1] && s === this._options.segments[1] ? p.push(r, a, c) : (p.push(r, a, c), p.push(r, c, d));
                        for (let t = 0; t < p.length; t++) {
                            const e = p[t];
                            h.push(e.vertex[0], e.vertex[1], e.vertex[2]), l.push(e.localUV[0], e.localUV[1]), u.push(e.globalUV[0], e.globalUV[1]);
                        }
                    }
                return new nt(this._gl, [t, e], { vertices: h, localUVs: l, globalUVs: u });
            }
            _buildVertex(t, e) {
                let i = t;
                i -= 0.25;
                const n = [];
                return (
                    (n[0] = -this._options.radius * Math.cos(2 * i * Math.PI) * Math.sin(e * Math.PI)),
                    (n[1] = this._options.radius * Math.cos(e * Math.PI)),
                    (n[2] = -this._options.radius * Math.sin(2 * i * Math.PI) * Math.sin(e * Math.PI)),
                    n
                );
            }
            _getTiles() {
                const t = this._scene.getCamera(),
                    e = t.fov / 2,
                    i = this._scene.getRenderer().getSize(),
                    n = Math.atan((Math.tan(e) * i.height) / i.width),
                    r = `${t.yaw}x${t.pitch}x${e}x${n}`;
                if (r === this._currentTilesHash) return this._currentTiles;
                const a = (this._scene.getPlace().getKappa() / 180) * Math.PI,
                    s = this._tileCount[0] - 1,
                    o = s / (2 * Math.PI),
                    h = t.yaw - Math.PI - e - a;
                let l = Math.floor(h * o);
                const u = t.yaw - Math.PI + e - a;
                let c = Math.ceil(u * o);
                for (; l < 0; ) l += s;
                for (; c < l; ) c += s;
                const d = this._tileCount[1] - 1,
                    p = Math.min(Math.max((t.pitch - n) / Math.PI + 0.5, 0), 1),
                    g = Math.min(Math.max((t.pitch + n) / Math.PI + 0.5, 0), 1);
                let m = Math.floor(p * d),
                    _ = Math.ceil(g * d);
                if (0 === this._level) {
                    let e = t.pitch < -0.5 || t.pitch > 0.5 ? 2 : 1;
                    i.width / i.height > 2 && (e = 2), (m = Math.max(0, m - 1)), (_ = Math.min(d, _ + 1)), (l -= e), (c += e), l < 0 && (l += s), c < l && (c += s);
                }
                const f = [];
                if (0 === m || _ === d) {
                    const e = 0 === m,
                        i = e ? t.pitch - n : t.pitch + n;
                    if ((e && i <= Math.PI / 4) || (!e && i >= Math.PI / 4)) {
                        const t = i / Math.PI + 0.5,
                            n = e ? Math.ceil(-1 * t * d) : Math.floor((2 - t) * d),
                            r = e ? n + 1 : d;
                        for (let t = e ? 0 : n - 1; t <= r; t++) f.push(t);
                    }
                }
                Object.keys(this._tilesCache).forEach((t) => {
                    this._tilesCache[t].visible = !1;
                });
                const M = [],
                    y = [],
                    L = (l + c) / 2,
                    v = (m + _) / 2;
                for (let t = m; t <= _; t++) {
                    let e = l,
                        i = c;
                    f.length && -1 !== f.indexOf(t) && ((e = 0), (i = s));
                    for (let n = e; n <= i; n++) {
                        const e = n > s ? n - s - 1 : n,
                            i = W(e, t);
                        let r = null;
                        if (i in this._tilesCache) (r = this._tilesCache[i].tile), this._tilesCache[i].used++, (this._tilesCache[i].visible = !0);
                        else {
                            (r = this._buildTile(e, t, this._options.tileSize)), this._texture && 0 === this._level && r.setBackgroundTexture(this._texture);
                            const n = Math.sqrt(Math.pow(e - L, 2) + Math.pow(t - v, 2));
                            y.push({ distance: n, args: [this, r, K(r.getPosition(), this._template, this._apiKey)] }), (this._tilesCache[i] = { tile: r, used: 1, visible: !0 });
                        }
                        M.push(r);
                    }
                }
                return (
                    (this._currentTiles = M),
                    (this._currentTilesHash = r),
                    this._useTileImages &&
                        (y.sort((t, e) => t.distance - e.distance),
                        y.forEach((t) => {
                            this._panoImages.addImage(t.args[0], t.args[1], t.args[2]);
                        })),
                    this._panoImages.runQueue(),
                    M
                );
            }
            _clearCache() {
                const t = Object.keys(this._tilesCache);
                if (t.length > this._options.maxCacheItems) {
                    t.sort((t, e) => this._tilesCache[t].used - this._tilesCache[e].used);
                    const e = t.splice(this._options.maxCacheItems);
                    for (let t = 0; t < e.length; t++) {
                        let i = this._tilesCache[e[t]];
                        i.tile.hasTexture() && !i.visible && (delete this._tilesCache[i.tile.getID()], i.tile.destroy(), (i.tile = null), (i = null));
                    }
                }
            }
            _initCache() {
                (this._tilesCache = {}), (this._currentTiles.length = 0), (this._currentTilesHash = ""), (this._currentTiles.length = 0);
            }
        }
        function ot(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e &&
                    (n = n.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    i.push.apply(i, n);
            }
            return i;
        }
        function ht(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? ot(Object(i), !0).forEach(function (e) {
                          lt(t, e, i[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
                    : ot(Object(i)).forEach(function (e) {
                          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
                      });
            }
            return t;
        }
        function lt(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        class ut {
            constructor(t) {
                lt(this, "_data", void 0),
                    lt(this, "_id", void 0),
                    lt(this, "_spheres", void 0),
                    lt(this, "_buildPromise", void 0),
                    lt(this, "_pitchLimit", void 0),
                    lt(this, "_panoImages", void 0),
                    lt(this, "_transform", void 0),
                    lt(this, "_moveTransform", void 0),
                    lt(this, "_dirty", void 0),
                    lt(this, "_opacity", void 0),
                    lt(this, "_useTileImages", void 0),
                    lt(this, "_lookDir", void 0),
                    lt(this, "_scene", void 0),
                    lt(this, "_saveStep", void 0),
                    lt(this, "_angle", void 0),
                    lt(this, "_storage", void 0),
                    lt(this, "_apiKey", void 0),
                    lt(this, "_optData", void 0),
                    (this._data = t),
                    (this._id = this._data ? `${this._data.provider}-${this._data.pid}` : Math.random().toString()),
                    (this._spheres = []),
                    (this._buildPromise = null),
                    (this._pitchLimit = "auto"),
                    (this._panoImages = new et()),
                    Array.isArray(this._data.timeline) && this._data.timeline.length && this._data.timeline.sort((t, e) => e - t),
                    -1 !== h.indexOf(this.getProvider()) && this.setPitchLimit(0.134 * Math.PI),
                    (this._transform = (function (t) {
                        let { phi: e = 0, omega: i = 0, kappa: n = 0 } = t;
                        const r = v();
                        return b(r, r, (-e * Math.PI) / 180, [0, 0, 1]), b(r, r, (i * Math.PI) / 180, [1, 0, 0]), b(r, r, (-n * Math.PI) / 180, [0, 1, 0]), r;
                    })({ phi: this._data.phi, omega: this._data.omega, kappa: this._data.kappa })),
                    (this._moveTransform = null),
                    (this._dirty = !1),
                    (this._opacity = 1),
                    (this._useTileImages = !0),
                    (this._lookDir = null),
                    (this._scene = null),
                    (this._angle = 0),
                    (this._storage = ""),
                    (this._apiKey = ""),
                    (this._optData = { azimuth: 0, lookDir: 0 });
            }
            set angle(t) {
                this._angle = t;
            }
            get angle() {
                return this._angle;
            }
            set optData(t) {
                this._optData = ht(ht({}, this._optData), t);
            }
            get optData() {
                return this._optData;
            }
            setTimestamp(t) {
                this._panoImages.setTimestamp(t), this._spheres.forEach((t) => t.timestampRedraw());
            }
            setTransformMartix(t) {
                this._transform = t;
            }
            getTransformMatrix() {
                return this._transform;
            }
            getLoadedImgsCount() {
                return this._panoImages.getLoadedImgsCount();
            }
            clearImages() {
                this._panoImages.clear();
            }
            movePlace(t, e, i) {
                if (this._scene && this._scene.isKeyDown()) return;
                if (!this._moveTransform) {
                    let t = 0;
                    (t = i ? (this._data.provider === f.CYCLOMEDIA || this._data.provider === f.STITCHERWEB ? ((360 - i) / 180) * Math.PI : ((i - this._data.kappa) / 180) * Math.PI) : e),
                        (this._saveStep = [0.4 * Math.sin(t), 0, 0.4 * Math.cos(t)]),
                        (this._moveTransform = (function (t) {
                            let e = new L(16);
                            return (
                                (e[0] = t[0]),
                                (e[1] = t[1]),
                                (e[2] = t[2]),
                                (e[3] = t[3]),
                                (e[4] = t[4]),
                                (e[5] = t[5]),
                                (e[6] = t[6]),
                                (e[7] = t[7]),
                                (e[8] = t[8]),
                                (e[9] = t[9]),
                                (e[10] = t[10]),
                                (e[11] = t[11]),
                                (e[12] = t[12]),
                                (e[13] = t[13]),
                                (e[14] = t[14]),
                                (e[15] = t[15]),
                                e
                            );
                        })(this._transform));
                }
                const n = this._saveStep.map((e) => {
                    return (i = t), (0.5 - 0.5 * Math.cos(i * Math.PI)) * e;
                    var i;
                });
                j(this._transform, this._moveTransform, n);
            }
            getID() {
                return this._id;
            }
            getTimeline() {
                return this._data.timeline || [];
            }
            setScene(t) {
                this._scene = t;
                const e = t.getOptions();
                (this._storage = `${e.url}tiles/#`), (this._apiKey = e.apiKey);
            }
            setTileImages(t) {
                return (this._useTileImages = t), this;
            }
            getMaxZoom() {
                return this._data.maxZoom;
            }
            build(t, e) {
                if (!this._buildPromise) {
                    const i = this._computeOptions(),
                        n = this.getBackgroundUrl();
                    for (let n = 0; n < i.length; n++) {
                        const r = this._getTileTemplate(n + 1),
                            a = new st(t, i[n], r, this._scene, n, this._panoImages, this._useTileImages);
                        0 === n && e && a.preLoad(), this._spheres.push(a);
                    }
                    this._spheres.length ? (this._buildPromise = this._spheres[0].setImage(n)) : (this._buildPromise = Promise.reject({}));
                }
                return this._buildPromise;
            }
            destroy() {
                for (this._panoImages.clear(); this._spheres.length; ) this._spheres.pop().destroy();
                this._buildPromise = null;
            }
            isDirty() {
                if (!this._spheres.length) return !1;
                let t = this._dirty;
                const e = this._getCurrentZoom(this._scene);
                for (let i = 0; i <= e; i++) t = t || this._spheres[i].isDirty();
                return t;
            }
            draw(t, e, i) {
                if (!this._spheres.length) return;
                this._dirty = !1;
                let n = t.getUniformLocation(e, "uOpacity");
                t.uniform1f(n, this._opacity), (n = t.getUniformLocation(e, "uMMatrix")), t.uniformMatrix4fv(n, !1, this._transform);
                const r = this._data.colorCorrection || { gamma: 1, grayworld: [1, 1, 1], saturation: null },
                    a = null === r.saturation ? 1 : r.saturation;
                (n = t.getUniformLocation(e, "uGamma")), t.uniform1f(n, 1 / r.gamma), (n = t.getUniformLocation(e, "uGrayworld")), t.uniform3fv(n, r.grayworld), (n = t.getUniformLocation(e, "uSaturation")), t.uniform1f(n, a);
                let s = this._getCurrentZoom(i);
                1 === this._opacity ? t.blendFunc(t.ONE, t.ZERO) : (t.blendFunc(t.ONE, t.ONE), (s = 0));
                for (let t = 0; t <= s; t++) this._spheres[t].draw(e);
            }
            drawDebug(t, e, i) {
                if (!this._spheres.length) return;
                const n = t.getUniformLocation(e, "uMMatrix");
                t.uniformMatrix4fv(n, !1, this._transform);
                const r = this._getCurrentZoom(i);
                this._spheres[r].drawDebug(e);
            }
            setOpacity(t) {
                return (this._opacity = t), (this._dirty = !0), this;
            }
            getId() {
                return this._data.pid;
            }
            getProvider() {
                return this._data.provider;
            }
            getDate() {
                return "string" == typeof this._data.createdAt ? new Date(this._data.createdAt) : this._data.createdAt;
            }
            getKappa() {
                return this._data.kappa;
            }
            getDefaultDirection() {
                const t = this._data.extra?.carDirection;
                return "number" == typeof t ? t : this._data.kappa;
            }
            setLookDir(t) {
                this._lookDir = t;
            }
            getLookDir() {
                return this._lookDir;
            }
            getData() {
                return this._data;
            }
            getMeta() {
                return { lon: this._data.mark.lon, lat: this._data.mark.lat, date: this._data.createdAt };
            }
            getCoords() {
                return [this._data.mark.lon, this._data.mark.lat];
            }
            _computeOptions() {
                const t = [];
                for (let e = 0; e < this._data.maxZoom; e++) {
                    let i = 0,
                        n = 0;
                    1 === this._data.maxZoom ? ((i = this._data.tileNumX), (n = this._data.tileNumY)) : this._data.extra.tileNumX && this._data.extra.tileNumY && ((i = this._data.extra.tileNumX[e]), (n = this._data.extra.tileNumY[e]));
                    const r = { segments: [i || 1, n || 1], tileSize: [1, 1].slice(), isNormal: 1 === this._data.maxZoom };
                    (r.segments[0] *= 8), (r.segments[1] *= 8), (r.tileSize[0] *= 8), (r.tileSize[1] *= 8), t.push(r);
                }
                return t;
            }
            getUrlTemplate() {
                const t = [this._storage.replace("#", this._data.domainPrefix), this._data.uriPath];
                return this._data.fileMask && t.push(this._data.fileMask), t.join("/");
            }
            getBackgroundUrl() {
                const t = this.getUrlTemplate(),
                    e = t.replace(/.*\//u, ""),
                    i = e.replace(/x/gu, "0").replace(/y/gu, "0").replace(/z/gu, "0");
                return X(t.replace(e, i), this._apiKey);
            }
            _getTileTemplate(t) {
                const e = t.toString().padStart(2, "0");
                return this.getUrlTemplate().replace("zz", e);
            }
            _getCurrentZoom(t) {
                const e = t.getCamera().fov;
                if (this._data.maxZoom > 1) {
                    const t = Math.atan(e / 2),
                        i = Math.atan(Math.PI / 6),
                        n = Math.floor(Math.log(i / t) / Math.log(2));
                    return Math.max(Math.min(n, this._spheres.length - 1), 0);
                }
                const i = e < Math.PI / 5 ? 1 : 0;
                return Math.min(i, this._spheres.length - 1);
            }
            setPitchLimit(t) {
                this._pitchLimit = t;
            }
            getPitchLimit() {
                return this._pitchLimit;
            }
            getDefaultView() {
                if (this._data.extra && this._data.extra.fov) {
                    const t = this._data.extra;
                    return { yaw: t.yaw || 0, pitch: t.pitch || 0, fov: t.fov };
                }
                return this._data.defaultView;
            }
        }
        function ct(t) {
            const e = {
                    pid: (1e7 * Math.random()) >>> 0,
                    kappa: 0,
                    omega: 0,
                    phi: 0,
                    mark: { alt: 0, lon: 0, lat: 0 },
                    createdAt: new Date().toString(),
                    tileNumX: 16,
                    tileNumY: 8,
                    domainPrefix: "",
                    fileMask: "",
                    maxZoom: 1,
                    provider: f.CYCLOMEDIA,
                    tileHeight: 512,
                    tileWidth: 512,
                    uriPath: "",
                },
                i = new ut(e);
            return (i.getBackgroundUrl = () => t), i.setTileImages(!1), i;
        }
        function dt(t) {
            const e = new ut(t);
            return (l.panoramas[e.getId()] = t), e;
        }
        function pt(t) {
            let { pid: i = 0, url: n = e, apiKey: r = "", webFlag: a = 0 } = t;
            return new Promise((t, e) => {
                V(`${n}detail?pid=${i}&force=${a}`, {}, { apiKey: r }).promise.then(
                    (e) => {
                        const i = dt(e);
                        t(i);
                    },
                    (t) => e(t)
                );
            });
        }
        function gt(t) {
            let { lon: i = 0, lat: n = 0, url: a = e, radius: s = r, nopenalties: o = 0, apiKey: h = "", year: l = 0 } = t;
            return new Promise((t, e) => {
                V(`${a}getbest?lon=${i}&lat=${n}&radius=${s || 50}&nopenalties=${o}`, {}, { apiKey: h }).promise.then(
                    (e) => {
                        const i = dt(e.panInfo);
                        (i.optData = { azimuth: e.azimuth, lookDir: e.lookDir }), t(i);
                    },
                    (t) => e(t)
                );
            });
        }
        function mt(t) {
            let { pid: i = 0, url: n = e, apiKey: r = "", year: a = 0 } = t;
            return (function (t, e, i) {
                const n = Z(t, e, i);
                return {
                    promise: new Promise((t, e) => {
                        n.promise.then(
                            (i) => {
                                i.status < 200 || i.status > 299
                                    ? e(i)
                                    : i.arrayBuffer().then(
                                          (e) => t(new Uint8Array(e)),
                                          (t) => e(t)
                                      );
                            },
                            (t) => e(t)
                        );
                    }),
                    abort: n.abort,
                };
            })(`${n}clickmask/${i}${a > 0 ? `&year=${a}` : ""}`, { headers: { Accept: "application/octet-stream" } }, { apiKey: r });
        }
        function _t(t, e) {
            let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
            return (
                l.neighbors[i] || (l.neighbors[i] = {}),
                (l.neighbors[i][t] = e),
                e.map((t) => {
                    const e = {};
                    return (
                        Object.keys(t).forEach((i) => {
                            let n = t[i];
                            ("near" !== i && "far" !== i) || (n = dt(n)), (e[i] = n);
                        }),
                        e
                    );
                })
            );
        }
        function ft(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        class Mt {
            constructor(t, e, i, n) {
                ft(this, "_panoScene", void 0),
                    ft(this, "_parentEl", void 0),
                    ft(this, "_eventsCb", void 0),
                    ft(this, "_dom", void 0),
                    ft(this, "_year", void 0),
                    ft(this, "_place", void 0),
                    ft(this, "_initSend", void 0),
                    ft(this, "_disabledYear", void 0),
                    ft(this, "_newestTrans", void 0),
                    ft(this, "_trans", void 0),
                    (this._panoScene = t),
                    (this._parentEl = e),
                    (this._eventsCb = i),
                    (this._dom = { container: document.createElement("div") }),
                    (this._year = 0),
                    (this._place = null),
                    (this._initSend = !1),
                    (this._disabledYear = 0),
                    (this._trans = n);
                try {
                    this._build();
                } catch (t) {
                    console.log(t);
                }
                this._panoScene.addListener((t, e) => this._panoPlaceSignal(t, e));
            }
            getContainer() {
                return this._dom.container;
            }
            getYear() {
                return this._year;
            }
            setYear(t) {
                this._year = t || 0;
            }
            isOpen() {
                return this._dom.container.classList.contains(p);
            }
            handleEvent(t) {
                "click" === t.type && (this._dom.container.contains(t.target) || (t.preventDefault(), t.stopPropagation(), this._close()));
            }
            setPlace(t) {
                if (this._place === t) return;
                this._place = t;
                const e = this._place.getTimeline(),
                    i = this._year ? this._place.getDate().getFullYear() : this._year;
                if (((this._disabledYear = this._year && this._year !== i ? this._year : 0), this._fill(e, i), this._colorYear(i), !this._initSend)) {
                    const t = G(this._place.getId(), e, i);
                    this._sendPanoTimelineEvent(t), this._sendEventsCb(_, t), (this._initSend = !0);
                }
            }
            _build() {
                this._dom.container.classList.add("pano-timeline"),
                    (this._dom.header = document.createElement("div")),
                    this._dom.header.classList.add("header"),
                    (this._dom.headerText = document.createElement("span")),
                    this._dom.headerText.classList.add("header-text"),
                    (this._dom.headerText.textContent = ""),
                    this._dom.header.addEventListener("click", () => {
                        this._open();
                    }),
                    (this._dom.list = document.createElement("ul")),
                    this._dom.list.addEventListener("click", (t) => {
                        this._listClick(t);
                    }),
                    (this._dom.tooltip = document.createElement("span")),
                    this._dom.tooltip.classList.add("tooltip"),
                    this._dom.container.appendChild(this._dom.header),
                    this._dom.container.appendChild(this._dom.tooltip),
                    this._dom.header.appendChild(this._dom.headerText),
                    this._dom.header.appendChild(
                        (function () {
                            const t = document.createElement("div");
                            return (
                                (t.innerHTML =
                                    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t<path fill-rule="evenodd" clip-rule="evenodd" d="M2 10C2 9.744 2.098 9.488 2.293 9.293L7.293 4.293C7.488 4.098 7.744 4 8 4C8.256 4 8.512 4.098 8.707 4.293L13.707 9.293C13.902 9.488 14 9.744 14 10C14 10.256 13.902 10.512 13.707 10.707C13.512 10.902 13.256 11 13 11C12.744 11 12.488 10.902 12.293 10.707L8 6.414L3.707 10.707C3.512 10.902 3.256 11 3 11C2.744 11 2.488 10.902 2.293 10.707C2.098 10.512 2 10.256 2 10Z" fill="white"/>\n\t</svg>'),
                                t.querySelector("svg")
                            );
                        })()
                    ),
                    this._dom.container.appendChild(this._dom.list),
                    this._parentEl.appendChild(this._dom.container);
            }
            _fill(t, e) {
                (this._dom.list.innerHTML = ""), this._dom.list.appendChild(this._createListItem(this._trans.newest, 0, e)), t.forEach((t) => this._dom.list.appendChild(this._createListItem(t.toString(), t, e)));
            }
            _colorYear(t) {
                this._dom.headerText.innerHTML = t ? (this._disabledYear ? `${t} <span class="disabled-year">(${this._disabledYear})</span>` : t.toString()) : this._trans.newest;
                const e = this._dom.list.querySelector(`.${d}`);
                e && e.classList.remove(d);
                const i = this._dom.list.querySelector(`li[data-year="${t}"]`);
                i && i.classList.add(d),
                    (this._dom.tooltip.textContent = this._disabledYear ? this._trans.notAvail.replace("{year}", t.toString()) : ""),
                    this._dom.tooltip.classList[this._disabledYear ? "add" : "remove"]("has-disabled-year");
            }
            _createListItem(t, e, i) {
                const n = document.createElement("li");
                return (
                    n.setAttribute("data-year", e.toString()),
                    (n.innerHTML = e === i && this._disabledYear ? `${t} <span class="disabled-year">(${this._disabledYear})</span>` : t),
                    0 === e &&
                        n.appendChild(
                            (function () {
                                const t = document.createElement("div");
                                return (
                                    (t.innerHTML =
                                        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t<path fill-rule="evenodd" clip-rule="evenodd" d="M14 6C14 6.256 13.902 6.512 13.707 6.707L8.707 11.707C8.512 11.902 8.256 12 8 12C7.744 12 7.488 11.902 7.293 11.707L2.293 6.707C2.098 6.512 2 6.256 2 6C2 5.744 2.098 5.488 2.293 5.293C2.488 5.098 2.744 5 3 5C3.256 5 3.512 5.098 3.707 5.293L8 9.586L12.293 5.293C12.488 5.098 12.744 5 13 5C13.256 5 13.512 5.098 13.707 5.293C13.902 5.488 14 5.744 14 6Z" fill="white"/>\n\t</svg>'),
                                    t.querySelector("svg")
                                );
                            })()
                        ),
                    n
                );
            }
            _open() {
                this._place.getTimeline().length > 0 && (this._dom.container.classList.add(p), document.addEventListener("click", this), this._sendEventsCb("pano-open", { years: [this._trans.newest, ...this._place.getTimeline()] }));
            }
            _close() {
                this._dom.container.classList.remove(p), document.removeEventListener("click", this), this._sendEventsCb("pano-close", { years: [this._trans.newest, ...this._place.getTimeline()] });
            }
            _listClick(t) {
                const e = t.target.closest("li"),
                    i = t.target.closest("svg");
                if ((this._close(), e && !i && !e.classList.contains(g))) {
                    const t = parseFloat(e.getAttribute("data-year"));
                    (this._year = t), this._disabledYear && (this._fill(this._place.getTimeline(), t), (this._disabledYear = 0)), this._sendEventsCb("pano-year-select", { year: t }), this._colorYear(t), this._loadPano(this._year);
                }
            }
            _loadPano(t) {
                const e = this._place.getCoords(),
                    i = this._panoScene.getOptions();
                gt({ lon: e[0], lat: e[1], url: i.url, apiKey: i.apiKey, radius: m, nopenalties: 1, year: t }).then(
                    (e) => {
                        this._panoScene.show(e, { yaw: null, forceShow: !0 });
                        const i = G(e.getId(), e.getTimeline(), t);
                        this._sendPanoTimelineEvent(i), this._sendEventsCb(_, i);
                    },
                    (t) => console.log(t)
                );
            }
            _sendPanoTimelineEvent(t) {
                this._panoScene.makeEvent("pano-timeline", t);
            }
            _sendEventsCb(t, e) {
                "function" == typeof this._eventsCb && this._eventsCb(t, e || {});
            }
            _panoPlaceSignal(t, e) {
                if ("pano-place" === t) {
                    const t = e;
                    this.setPlace(t.place);
                }
            }
        }
        function yt(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        class Lt {
            constructor() {
                yt(this, "_pMatrix", void 0), yt(this, "_vMatrix", void 0), (this._pMatrix = v()), (this._vMatrix = v());
            }
            configure(t, e, i, n) {
                x(this._pMatrix, t, e, i, n);
            }
            lookAt(t, e, i) {
                !(function (t, e, i, n) {
                    let r,
                        a,
                        s,
                        o,
                        h,
                        l,
                        u,
                        c,
                        d,
                        p,
                        g = e[0],
                        m = e[1],
                        _ = e[2],
                        f = n[0],
                        M = n[1],
                        L = n[2],
                        v = i[0],
                        j = i[1],
                        b = i[2];
                    Math.abs(g - v) < y && Math.abs(m - j) < y && Math.abs(_ - b) < y
                        ? A(t)
                        : ((u = g - v),
                          (c = m - j),
                          (d = _ - b),
                          (p = 1 / Math.sqrt(u * u + c * c + d * d)),
                          (u *= p),
                          (c *= p),
                          (d *= p),
                          (r = M * d - L * c),
                          (a = L * u - f * d),
                          (s = f * c - M * u),
                          (p = Math.sqrt(r * r + a * a + s * s)),
                          p ? ((p = 1 / p), (r *= p), (a *= p), (s *= p)) : ((r = 0), (a = 0), (s = 0)),
                          (o = c * s - d * a),
                          (h = d * r - u * s),
                          (l = u * a - c * r),
                          (p = Math.sqrt(o * o + h * h + l * l)),
                          p ? ((p = 1 / p), (o *= p), (h *= p), (l *= p)) : ((o = 0), (h = 0), (l = 0)),
                          (t[0] = r),
                          (t[1] = o),
                          (t[2] = u),
                          (t[3] = 0),
                          (t[4] = a),
                          (t[5] = h),
                          (t[6] = c),
                          (t[7] = 0),
                          (t[8] = s),
                          (t[9] = l),
                          (t[10] = d),
                          (t[11] = 0),
                          (t[12] = -(r * g + a * m + s * _)),
                          (t[13] = -(o * g + h * m + l * _)),
                          (t[14] = -(u * g + c * m + d * _)),
                          (t[15] = 1));
                })(this._vMatrix, t, e, i);
            }
            lookFrom(t, e, i, n) {
                const r = ((a = S()), (s = t), (o = -1), (a[0] = s[0] * o), (a[1] = s[1] * o), (a[2] = s[2] * o), a);
                var a, s, o;
                A(this._vMatrix),
                    (function (t, e, i) {
                        let n = Math.sin(i),
                            r = Math.cos(i),
                            a = e[4],
                            s = e[5],
                            o = e[6],
                            h = e[7],
                            l = e[8],
                            u = e[9],
                            c = e[10],
                            d = e[11];
                        e !== t && ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), (t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), (t[15] = e[15])),
                            (t[4] = a * r + l * n),
                            (t[5] = s * r + u * n),
                            (t[6] = o * r + c * n),
                            (t[7] = h * r + d * n),
                            (t[8] = l * r - a * n),
                            (t[9] = u * r - s * n),
                            (t[10] = c * r - o * n),
                            (t[11] = d * r - h * n);
                    })(this._vMatrix, this._vMatrix, e),
                    w(this._vMatrix, this._vMatrix, i),
                    (function (t, e, i) {
                        let n = Math.sin(i),
                            r = Math.cos(i),
                            a = e[0],
                            s = e[1],
                            o = e[2],
                            h = e[3],
                            l = e[4],
                            u = e[5],
                            c = e[6],
                            d = e[7];
                        e !== t && ((t[8] = e[8]), (t[9] = e[9]), (t[10] = e[10]), (t[11] = e[11]), (t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), (t[15] = e[15])),
                            (t[0] = a * r + l * n),
                            (t[1] = s * r + u * n),
                            (t[2] = o * r + c * n),
                            (t[3] = h * r + d * n),
                            (t[4] = l * r - a * n),
                            (t[5] = u * r - s * n),
                            (t[6] = c * r - o * n),
                            (t[7] = d * r - h * n);
                    })(this._vMatrix, this._vMatrix, n),
                    j(this._vMatrix, this._vMatrix, r);
            }
            getPMatrix() {
                return this._pMatrix;
            }
            getVMatrix() {
                return this._vMatrix;
            }
        }
        let vt = 0;
        function At() {
            return vt;
        }
        var jt = {
                d: (t, e) => {
                    for (var i in e) jt.o(e, i) && !jt.o(t, i) && Object.defineProperty(t, i, { enumerable: !0, get: e[i] });
                },
                o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
            },
            bt = {};
        jt.d(bt, { ZT: () => Dt, uu: () => xt, id: () => Et, b1: () => St, rB: () => It, Sn: () => Nt, Uq: () => Tt, SQ: () => Ct, i6: () => wt });
        const wt =
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MyIgaGVpZ2h0PSIyOCI+PGRlZnM+PGZpbHRlciBpZD0iYSIgd2lkdGg9IjEyNSUiIGhlaWdodD0iMTg1JSIgeD0iLTEyLjUlIiB5PSItMzAlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPjxmZU9mZnNldCBkeT0iMiIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPjxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIHN0ZERldmlhdGlvbj0iMiIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjIgMCIvPjxmZU1lcmdlPjxmZU1lcmdlTm9kZSBpbj0ic2hhZG93TWF0cml4T3V0ZXIxIi8+PGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+PC9mZU1lcmdlPjwvZmlsdGVyPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbHRlcj0idXJsKCNhKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNyAzKSI+PHBhdGggZmlsbD0iI0ZGRiIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjUiIGQ9Ik0xNC4xNCAzLjYyYy45Ni40OSAxLjg1Ljg4IDIuMyAxLjk3LjQ1IDEuMDctLjQ3IDUuNTgtLjQ2IDguNnYuNDNjLjA0IDEuMDgtLjM5IDMuMTgtMS4zIDIuNjktLjMtLjE2LS43Mi0xLjA2LTEuMDctMi4wOC0uNTUtMS42NS0uMS01LjczLS41Ni01LjgxYTIxLjYgMjEuNiAwIDAgMS0zLjM4IDIuODdjLTEuMjYuODEtMS42Ni0uMy0xLjg4LTEuMDRhMTMuODUgMTMuODUgMCAwIDAtMS41My0zLjAzYy0uMTUtLjEyLS4xNy4wNS0uMi4xNi0uMDcuMjYtLjQ3IDMtLjkgNC41LS40NyAxLjYxLTEuNTYgNC4yNy0yLjA3IDQuOS0uNTEuNjItMi42MyAxLjE1LTMuMDYgMS4xNy0uMjguMDYgMS41LTMuNTYgMS45MS01LjA5LjYtMS41NyAxLjUtNS4yIDEuNjItNy42NC4xLTEuNi0uMDQtMy4xLS4wNi0zLjUzIDAtLjU4LjYtLjkuOTMtLjk2LjM4LS4wOCAxLjIxLS4yNCAyLjA3LjcyQzcgMyA3Ljc4IDQuODcgOCA1LjMzYy4yNi41OCAxLjM5IDMuMTkgMS41NiAzLjguNTYtLjQgMS40LTEuMjIgMi4yNC0yLjE0LjkxLS45OSAxLjkyLTIuNjQgMi4wNC0zLjQ3LjEtLjAzLjIuMDQuMy4xem0yNy4yMyAxMS4ycy0uNDUtMy4wNS0uNDYtMy4yOWMtLjUtLjItMS4xMi0xLjItMS4yNC0yLjI2LS4yLTEuODMuMDMtMi44OC44Ny0zLjc4LjQyLS40Ni44LS4xNy43My40OS0uMDYuNjMtLjEgMS42NS0uMSAyLjA1LjE0IDIuOSA1LjkuNiA3LjIyLTEuMTcgMS4xNy0xLjU0IDEuNzQtMS40OSAxLjk0LS43OC4xNy42Mi4wNSAxLjc2LS4yIDIuNzZhMy45IDMuOSAwIDAgMS0xLjIyIDIuMTUgOS40NCA5LjQ0IDAgMCAxLTUuMTIgMS43Yy4yMSAxLjMuMDIgMy43OS4wMiAzLjc5LS4zMiAyLjQyLTEuMTIgMS42OS0xLjM5IDEuNDgtLjg2LS41LTEuMDUtMy4xMy0xLjA1LTMuMTN6bS0yLjg0LTIuODljLTEuMTQgMS4yNS00Ljc1Ljg3LTQuNyAxLjQ2LjA0LjQuNDMgMy4yMS0uMTMgMy43M3MtLjUyLjM1LTEuNzQtLjM2Yy0uOC0uNDYtLjktMS45Ni0uODctMy4zOC0xLjQ4LjEzLTMuMDQuMy0zLjE2LjMzLS4yLjA1LS40OS4wNi0uNjMuMjItLjE4LjItLjA4LjU0LjAyLjc2LjEyLjI2LjI2LjUzLjQuNzguMjUuNDYuNTcgMSAuNDUgMS41Ni0uMDguMzctLjMuNTgtLjcuNDMtLjQyLS4xNi0yLjczLTIuOC0zLTMuMDItLjIzLS4xOS0uNzUtLjEzLTEuMDQtLjEtLjc0LjA3LTIuOTcuMjQtMy4zNC4yNy0xLjAyLjA4LS45Ny4yOC0xLjcyIDEuMzUtLjE3LjI0LS44OCAxLjY3LS45NiAxLjQ3LS4xMy0uMzQtLjgzLS42OS0uODUtMS4yMi0uMDEtLjU0LjMtLjkxLjQ0LTEuMTMuMTUtLjI0LjE4LS43MS0uMS0uNzgtLjI4LS4wNi0uMjYtLjQ0LS4yNS0uNjYuMDEtLjI5LjA2LS41OS4xMS0uODguMDYtLjM0LjE3LS42Ni41NC0uNzUuMy0uMDcuNi0uMDMuOS0uMTEuMzMtLjA5LjQzLS4zMS41OC0uNTkuMS0uMiAyLjY3LTUuMDkgMi44LTUuNzUuMDUtLjI1LjQ0LS40LjczLS4xOS41LjM3IDIuODMgNC40IDMuMDYgNC43NS42NyAxLjAxLjggMS4wNCAxLjU2IDEuMDNsNC4zLS4wN2MuMDktMS4zLjI1LTEuODMuOC0xLjk0LjU3LS4xMiAxLjQ0LjUyIDIgMS45Ljc3LS4wNiAyLjMtLjEgMi40Ny0uNzkuMzgtMS41NC03Ljc0LTMuMzQtOS4zOC0xLjc3LS44Ni44MS0yLjIzLTEuNjUtMS41My0yLjA3IDIuODctMS43IDcuOS0uNSAxMC42Ny43OCAyLjc3IDEuMyAzIDMuOTUgMi4yNyA0Ljc0em0zNC40IDEuNzVhNDMuMTQgNDMuMTQgMCAwIDAgMi41NS0uMjUgOCA4IDAgMCAxIDMuODguMzRjLjIuMDguNC4xNy41Ny4yOC0uMy4zNC0uNzkuOC0xLjU3IDEuMTctMS42Ny43LTIuOTQgMS4wNC00LjQ4IDEuMjMtLjYuMDctMS4yLjE1LTEuODIuMmEyNy4zMyAyNy4zMyAwIDAgMS02LjM3LS4wOCAyLjU4IDIuNTggMCAwIDEtMS44MS0uOTFjLS4xNi0uMTgtLjI0LS40LS4zOS0uNTktLjA1LS4wNy0uOTguNDUtMS4wNi41LS40NC4yNC0uOS4zOC0xLjM2LjU2LS40NC4xOC0uODYuMy0xLjM0LjM5YTQuOSA0LjkgMCAwIDEtMy4zOC0uNTggNC43NSA0Ljc1IDAgMCAxLTEuOC0yIDUuNjcgNS42NyAwIDAgMSAuMjgtNS4zM2MuMi0uMzIuNDMtLjYyLjY5LS44OWE4LjE0IDguMTQgMCAwIDEgNi4xNy0yLjQ1Yy40OCAwIC45NC4wOSAxLjM0LjM0LjM2LjIyLjc2LjY3Ljc0IDEuMTMgMCAuMzctLjQyLjY3LS43My44My0uMS4wNC0xLjA3LjQ1LTEuMS4zOGwtLjItLjM0YTguODUgOC44NSAwIDAgMC0yLjk1IDEuMDMgNi44NyA2Ljg3IDAgMCAwLTIuMSAxLjc1Yy0uNS42OC0uOTMgMS42Ni0uMTcgMi4zNi4zNS4zMiAxLjAzLjMgMS40Ny4zLjg5LS4wNSAxLjc3LS4wNyAyLjY1LS4xNGwxLjMtLjExIDEuMzItLjE0LjIxLjE1Yy40NS0uMjcuOS0uNTQgMS4zNy0uNzYgMS4wNC0uNSAyLjExLS45IDMuMTctMS4zNCAxLjE0LS40NiAyLjMyLS44IDMuNDYtMS4yOC4zLS4xMiAxLjgtLjYgMS4yMy0xLjEtLjQ2LS40LTEuMi0uMjctMS43NS0uMjItLjc2LjA4LTEuNTEuMjEtMi4yNy4yOS0uNTUuMDUtMS4yOC4yMy0xLjczLS4yLS40Mi0uNC4wOC0xLjMuMi0xLjczLjItLjg2IDEuNy0uOSAyLjM5LS45OGExMy4yNyAxMy4yNyAwIDAgMSA0LjcuMmMxLjI4LjM5IDIuOTMgMS4xIDIuODQgMi42OC0uMDcgMS4zLTIuNTQgMS45LTIuNTQgMS45cy0yLjYzLjc0LTMuOTMgMS4yYy0uNDYuMTYtNC4yMiAxLjQtMy4xNSAyLjA4LjM3LjI0IDEuMTIuMjggMS41NS4zMiAxLjM0LjEyIDIuNi0uMSAzLjkxLS4yem0tMTkuNjUgMi4xMWMtLjAyLjQ4LS4yMi45LS41IDEuMjMtLjU4LjY4LTEuNjMuNjgtMi4xMy0uMTZhMi41NCAyLjU0IDAgMCAxLS4xMS0xLjljLjA5LS4yNS4yOC0uNTMuNDUtLjcuMzMtLjMxLjgtLjQgMS4yLS4zMi40My4xLjg3LjYyIDEuMDIgMS4xNGEyIDIgMCAwIDEgLjA3Ljcxem0tMjkuOTctNC40M2MuMDQtLjA1LS4wMS0uMTUtLjAxLS4xNWwtLjc5LTEuOThzLS4wMy0uMS0uMTItLjFjLS4xIDAtLjE3LjE3LS4xNy4xN2wtMS4xNiAxLjk3LS4wMS4wN3YuMDVsLjAxLjA1LjAzLjA0LjA0LjAzLjA2LjAyLjA4LjAxaC43NGwxLjEzLS4xMnMuMTIgMCAuMTctLjA2eiIvPjxwYXRoIGZpbGw9IiNDODIzMkEiIGQ9Ik0xNC4xNCAzLjYyYy45Ni40OSAxLjg1Ljg4IDIuMyAxLjk3LjQ1IDEuMDctLjQ3IDUuNTgtLjQ2IDguNnYuNDNjLjA0IDEuMDgtLjM5IDMuMTgtMS4zIDIuNjktLjMtLjE2LS43Mi0xLjA2LTEuMDctMi4wOC0uNTUtMS42NS0uMS01LjczLS41Ni01LjgxYTIxLjYgMjEuNiAwIDAgMS0zLjM4IDIuODdjLTEuMjYuODEtMS42Ni0uMy0xLjg4LTEuMDRhMTMuODUgMTMuODUgMCAwIDAtMS41My0zLjAzYy0uMTUtLjEyLS4xNy4wNS0uMi4xNi0uMDcuMjYtLjQ3IDMtLjkgNC41LS40NyAxLjYxLTEuNTYgNC4yNy0yLjA3IDQuOS0uNTEuNjItMi42MyAxLjE1LTMuMDYgMS4xNy0uMjguMDYgMS41LTMuNTYgMS45MS01LjA5LjYtMS41NyAxLjUtNS4yIDEuNjItNy42NC4xLTEuNi0uMDQtMy4xLS4wNi0zLjUzIDAtLjU4LjYtLjkuOTMtLjk2LjM4LS4wOCAxLjIxLS4yNCAyLjA3LjcyQzcgMyA3Ljc4IDQuODcgOCA1LjMzYy4yNi41OCAxLjM5IDMuMTkgMS41NiAzLjguNTYtLjQgMS40LTEuMjIgMi4yNC0yLjE0LjkxLS45OSAxLjkyLTIuNjQgMi4wNC0zLjQ3LjEtLjAzLjIuMDQuMy4xIi8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTQxLjM3IDE0Ljgzcy0uNDUtMy4wNi0uNDYtMy4zYy0uNS0uMi0xLjEyLTEuMi0xLjI0LTIuMjYtLjItMS44My4wMy0yLjg4Ljg3LTMuNzguNDItLjQ2LjgtLjE3LjczLjQ5LS4wNi42My0uMSAxLjY1LS4xIDIuMDUuMTQgMi45IDUuOS42IDcuMjItMS4xNyAxLjE3LTEuNTQgMS43NC0xLjQ5IDEuOTQtLjc4LjE3LjYyLjA1IDEuNzYtLjIgMi43NmEzLjkgMy45IDAgMCAxLTEuMjIgMi4xNSA5LjQ0IDkuNDQgMCAwIDEtNS4xMiAxLjdjLjIxIDEuMy4wMiAzLjc5LjAyIDMuNzktLjMyIDIuNDItMS4xMiAxLjY5LTEuMzkgMS40OC0uODYtLjUtMS4wNS0zLjEzLTEuMDUtMy4xM3ptLTIuODQtMi45Yy0xLjE0IDEuMjUtNC43NS44Ny00LjcgMS40Ni4wNC40LjQzIDMuMjEtLjEzIDMuNzNzLS41Mi4zNS0xLjc0LS4zNmMtLjgtLjQ2LS45LTEuOTYtLjg3LTMuMzgtMS40OC4xMy0zLjA0LjMtMy4xNi4zMy0uMi4wNS0uNDkuMDYtLjYzLjIyLS4xOC4yLS4wOC41NC4wMi43Ni4xMi4yNi4yNi41My40Ljc4LjI1LjQ2LjU3IDEgLjQ1IDEuNTYtLjA4LjM3LS4zLjU4LS43LjQzLS40Mi0uMTYtMi43My0yLjgtMy0zLjAyLS4yMy0uMTktLjc1LS4xMy0xLjA0LS4xLS43NC4wNy0yLjk3LjI0LTMuMzQuMjctMS4wMi4wOC0uOTcuMjgtMS43MiAxLjM1LS4xNy4yNC0uODggMS42Ny0uOTYgMS40Ny0uMTMtLjM0LS44My0uNjktLjg1LTEuMjItLjAxLS41NC4zLS45MS40NC0xLjEzLjE1LS4yNC4xOC0uNzEtLjEtLjc4LS4yOC0uMDYtLjI2LS40NC0uMjUtLjY2LjAxLS4yOS4wNi0uNTkuMTEtLjg4LjA2LS4zNC4xNy0uNjYuNTQtLjc1LjMtLjA3LjYtLjAzLjktLjExLjMzLS4wOS40My0uMzEuNTgtLjU5LjEtLjIgMi42Ny01LjA5IDIuOC01Ljc1LjA1LS4yNS40NC0uNC43My0uMTkuNS4zNyAyLjgzIDQuNCAzLjA2IDQuNzUuNjcgMS4wMS44IDEuMDQgMS41NiAxLjAzbDQuMy0uMDdjLjA5LTEuMy4yNS0xLjgzLjgtMS45NC41Ny0uMTIgMS40NC41MiAyIDEuOS43Ny0uMDYgMi4zLS4xIDIuNDctLjc5LjM4LTEuNTQtNy43NC0zLjM0LTkuMzgtMS43Ny0uODYuODEtMi4yMy0xLjY1LTEuNTMtMi4wNyAyLjg3LTEuNyA3LjktLjUgMTAuNjcuNzggMi43NyAxLjMgMyAzLjk1IDIuMjcgNC43NHptMzQuNCAxLjc1YTQzLjE0IDQzLjE0IDAgMCAwIDIuNTUtLjI1IDggOCAwIDAgMSAzLjg4LjM0Yy4yLjA4LjQuMTcuNTcuMjgtLjMuMzQtLjc5LjgtMS41NyAxLjE3LTEuNjcuNy0yLjk0IDEuMDQtNC40OCAxLjIzLS42LjA3LTEuMi4xNS0xLjgyLjJhMjcuMzMgMjcuMzMgMCAwIDEtNi4zNy0uMDggMi41OCAyLjU4IDAgMCAxLTEuODEtLjkxYy0uMTYtLjE4LS4yNC0uNC0uMzktLjU5LS4wNS0uMDctLjk4LjQ1LTEuMDYuNS0uNDQuMjQtLjkuMzgtMS4zNi41Ni0uNDQuMTgtLjg2LjMtMS4zNC4zOWE0LjkgNC45IDAgMCAxLTMuMzgtLjU4IDQuNzUgNC43NSAwIDAgMS0xLjgtMiA1LjY3IDUuNjcgMCAwIDEgLjI4LTUuMzNjLjItLjMyLjQzLS42Mi42OS0uODlhOC4xNCA4LjE0IDAgMCAxIDYuMTctMi40NWMuNDggMCAuOTQuMDkgMS4zNC4zNC4zNi4yMi43Ni42Ny43NCAxLjEzIDAgLjM3LS40Mi42Ny0uNzMuODMtLjEuMDQtMS4wNy40NS0xLjEuMzhsLS4yLS4zNGE4Ljg1IDguODUgMCAwIDAtMi45NSAxLjAzIDYuODcgNi44NyAwIDAgMC0yLjEgMS43NWMtLjUuNjgtLjkzIDEuNjYtLjE3IDIuMzYuMzUuMzIgMS4wMy4zIDEuNDcuMy44OS0uMDUgMS43Ny0uMDcgMi42NS0uMTRsMS4zLS4xMSAxLjMyLS4xNC4yMS4xNWMuNDUtLjI3LjktLjU0IDEuMzctLjc2IDEuMDQtLjUgMi4xMS0uOSAzLjE3LTEuMzQgMS4xNC0uNDYgMi4zMi0uOCAzLjQ2LTEuMjguMy0uMTIgMS44LS42IDEuMjMtMS4xLS40Ni0uNC0xLjItLjI3LTEuNzUtLjIyLS43Ni4wOC0xLjUxLjIxLTIuMjcuMjktLjU1LjA1LTEuMjguMjMtMS43My0uMi0uNDItLjQuMDgtMS4zLjItMS43My4yLS44NiAxLjctLjkgMi4zOS0uOThhMTMuMjcgMTMuMjcgMCAwIDEgNC43LjJjMS4yOC4zOSAyLjkzIDEuMSAyLjg0IDIuNjgtLjA3IDEuMy0yLjU0IDEuOS0yLjU0IDEuOXMtMi42My43NC0zLjkzIDEuMmMtLjQ2LjE2LTQuMjIgMS40LTMuMTUgMi4wOC4zNy4yNCAxLjEyLjI4IDEuNTUuMzIgMS4zNC4xMiAyLjYtLjEgMy45MS0uMnptLTE5LjY1IDIuMTFjLS4wMi40OC0uMjIuOS0uNSAxLjIzLS41OC42OC0xLjYzLjY4LTIuMTMtLjE2YTIuNTQgMi41NCAwIDAgMS0uMTEtMS45Yy4wOS0uMjUuMjgtLjUzLjQ1LS43LjMzLS4zMS44LS40IDEuMi0uMzIuNDMuMS44Ny42MiAxLjAyIDEuMTRhMiAyIDAgMCAxIC4wNy43MXptLTI5Ljk3LTQuNDNjLjA0LS4wNS0uMDEtLjE1LS4wMS0uMTVsLS43OS0xLjk4cy0uMDMtLjEtLjEyLS4xYy0uMSAwLS4xNy4xNy0uMTcuMTdsLTEuMTYgMS45Ny0uMDEuMDd2LjA1bC4wMS4wNS4wMy4wNC4wNC4wMy4wNi4wMi4wOC4wMWguNzRsMS4xMy0uMTJzLjEyIDAgLjE3LS4wNnoiLz48L2c+PC9zdmc+Cg==",
            xt =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAIJ0lEQVRoBeWbfUiVVxzH9aqYii9XszIbqGnRnOY2i0ajoCAJtM3sj8agItjcCBqMghVbf7QRg2K0ILY26A3G+iOLqUMWFElEQaOZor1ZM8hGvr/gNWfqvt+b5+F3j8+9V6/Pc6+rC/eet99zzu/znPdzfjc8zKbP2NhY9OPHjwt6e3vzR0dHFyKcFR4enoJvrMPhiGGxiB9EvAvfTsQ/RPyDxMTE+gULFtQhPGSHauFWZgrFE2/fvr1heHh4fWRk5OsAiAwkf7yI5/g0RUVF1SxZsqQS8L2B5GP2jCXArMmOjo5Po6OjV6CQCLOCphE3MjQ0dH327Nk/sOankY/70WkBP3r06O3u7u5dAM2briKTeR7gDUlJSQczMjJuTkbeTCYgYDRd561bt74C6DqzTFVcV1dX37179540Nzd33b9/v/fu3bt9nZ2dw/xSJiUlJYrfxYsXJ+Tk5CRmZ2cnL1q0aH5ycnKCysPMBfiFpUuXfo2m3m2W7ituysBovu/09PR8HxEREWuW8dOnT7tqa2ubz5w58xD9ecBMxl8c+m3c5s2bs1atWpUzb948p5n8yMiIC7X9GZr5NbN0b3FTAgbAVtTuLrzZCc+1tra2Hz169Mb58+f/8VZYIPGlpaVpO3bsWJaenp6qPw9dxqDKIbygU3qat/AExc0EkW9kQ0PDNxg1i/V0NtvTp0//eezYsb/1NCvD5eXlmVu2bCk0a+6YFarz8vK+BPxzf2X6BQZsAvrrz+ivuTIzTB1jZ8+evXHgwIFG9KlRmWaXHzo49u7dm7tp06ZlmPI8dIcOjejXHwG6z1f5Hg/pgqxZwP6iw7pcriGAXqyoqLC0+erlewuXlZWlAXxtbGxstJQZh/7QV037BK6vr/9Wb8ZtbW09O3fuvIAX0S8LC7YftRl/5MiRdXPmzEmSZbN55+fnfyHjpN8rMAcoCO6WwpheWrdt23ZRTSsyLRR+TmknT55ci+ksXSv/oLeBzBSYU09fX99PaBpGOmt248aNlTMFVgES+ty5cxtkTaMrjiUkJHxsNmU51IPKhayT86yEZZ9lM55psNSZOlE36qgYqDsZyKLilDsBmCsouajgaMwBKtR9Vils5lI36khdVToZyKLCyvUAbmlpeUtfLnLqCWQ0jouLc5w4ceJdLC3L+aWfcapgq13qSF1lvmQhk4wz+igj6+rqfoWQsRHgomLNmjUVgcyzBCwqKlomCwN4S0lJSWV/f/+IjLfKD90dly5dKpOLE+jeUFBQ8IEqw3jjWBq+KWEpwBVUILB8duXKlR4LFcZhY5BRVVW1IT4+3uotJLMPo67U2R0Y/yET2VScAdze3v6JiqTLtbEdy0W7oakzdZcsks0NjNEsEW+Cm3fjw42AEQjAc/Xq1UZvj9kNretONjJSHzcwj2XgN5oZt3jT3fVgqrjGPstCzD52QlN3MohyI8YZXwDzDEokhnE/K8OB+DkwcYACtNddlJ3QOoNidKCqo3ngJqG4eZfhQP3j0FWhgNYZyEhWBw/g5OkipyJU/0CgkPpzCvrOnTtBrWkykEXpQ0Y3K8+NVSRd1MYTGbbCr5p3sKF1FrI6sBxbKKF44CbDVvkHBgZG2aeDCa2zkJV9OEtC8XRRhq30C2ivY4SVA5nOQlYHNhYpEopHqTJstX8cugo1bTu0zkJWAnsctwZjC6igMbDYCq2zkBWD14uLLVWTupCKt9oldHFxcZWd0DoLWY21tNVAk8lv1qxZDnyjfMnyVg0fY5/rS3YyaRylB6Ugj0xk2C6/0+mMrK6ufj8zM/M1b2U0NTU1Y2T/fXBwcNSbjK94nYWsHKVd8iFdSKZZ5Q8GLHXVWchK4E4JwostGbbaHyxY6q2zkJWjtMdIyVs8qyFVfsGEZZk6C1k5Sj9QCtHllaUMW+UPNqwZC1kdtKmQUFjpzJdhK/yhgKXeOgtZHTQjwOhl3LrxAIz3s1aAMo9QwZJBHuaRkazsw0OY55okIC+jZThQf6hgqa/OQEayuhcetJaRUKtXr86W4UD8PJm0e571pZfOoBjdwKj+SjxsnBXPnTs3mTfvvjL0l3b48OEVdi4qfJVP3ckgZEbGGV+caaGqe3Gme10IhNHMQIan6l++fLnXVjLdFZQ/XXTdyUZGPmespWkHJTOiTQXNDGTcVPzPnj3710zebljqrNuDSDYDmCMY3kSDVJI2FTjTNWRkmj8/jkr/0mXshqWu1FmWSyayqTjjLJoRe/bsacFxZqlKjImJicbQPnz58uU2FTdZ98qVKx24wetKS0uLw1bQVVNTc3P79u21qHnLdj66Lvv27XujsLAwS8Zj8NyN8cQwzfC4TKMgLtS+w5syDM4wf40ho5pAbhBlwXb7afexf//+9VhNGUyo3Qu4SPtclm0kqkgssJ2NjY1/yDtiXjajdn6bqXfEtPc4fvz4e9LIhYZrubm5RRisPKz1JvRPCtDCDeBG02NGNCDRt1vqJYXSpU7UTcJSdzLosNRzAjAj0cmvQfgQ/epDGwoakMwkaOpCnaR9B/Wl7mRQukvXFJgCmKhP0QRICtNahgYkbEIyPhR+6kBddAse6kzdvek0oQ9LQbSMV8swjfCAfnVMD1Vts6ZfGeNSBU0XZ8hbAf/ymw9LaFrpBctAnFs8bddjqBIUA3FVGmrZSaMvuSJTadLl/SyvLP/XfwGQQDT6Qm3vBrhh2yXTrfZzIxCSP3noILSDomkQwG37G09qauqP2PZN2IHpuvgL+5yH/T2sp6OpJ2FgK6EByUv9Ry0dnGHAz8i/4v0HWQtIingm20wAAAAASUVORK5CYII=",
            St =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAANJQTFRFAAAA////4+Pj1NTU0tLS0dHR0tLS09PT1dXV////1tbW0dHR19fX5OTk0NDQ19fX4eHh0NDQ4ODg////0NDQxcXFn5+fe3t7VlZWLy8vHBwcCQkJ5OTk1NTUwMDAgYGBKSkpAAAAv7+/19fX1tbWvLy8UVFR////Z2dn////0NDQ1dXVBwcHzc3NU1NTwcHBLy8vs7OzExMTg4ODysrK2traqKio5eXlqKiopqampaWlAQEBrq6uo6OjgYGBwMDAtra2Xl5eWlpasbGxc3Nz////d/Vw+gAAAEZ0Uk5TAAc3ZYiqvcfQD12m1DCZ0TOnMhGOxqyai314cznKwp58ccNf07+KBJIOqdNzzYrEfrl20env3THc3Nx139vR5eHGxeDMEILXl4gAAAJ1SURBVHicpZdpd+ogEIZx36qt+27k1lpbt7Zqvd3tcv//X7oMEA0TIljeDzlnkvcxCDMDIUSrWDyRTKUz2WwmnUom4jG9S6dcvpA9U5Qt5HNWaLF0fqbRealoRC/KOlKoXDmKVmu+sd5ottqdbrfTbjUbdf9urRrN9vrCM/CGVNHQ+yOe9HtR7OWIG67GVKPxFX84utSi10kx3okOBU3E6JPXYfbmFp5MvVkUS+nMm4Ln9ib0Xs7OF9EoaDHnNH43H/Py7jhL6d2SjxzNFdy7fzCxlD7cg1OZtR7M89KCZTS8exRYsSqs79w4Zjly+N/9Q7ZAXk0Nc3XQAua85rMV+BueeLJar1dBJ45BHvj9PIdaqIv1XW2YHgMsirlmkC1lwW7hh2RerTeqG8dCEyC2HC5BPivmgxvHUpDnJWBzUPt+Law2qhvHUmPoDtBb8lCD+9uPyI1jqQGD8gwuHKYa9Be5cSwEE14gJAa9Llj7VvQQumKMxGGdlF99Qm4cc8FqxUmCXRv0ZLrBsASvxSY9mW7yykyxa4ueTLcYliJpdm1j2Ey3GZYmGXbthGD6jNw47jAsQ2ClumHYRHdhraLgl1dpftPHAtYP28TKYWsnzMjKCdMtlZmVS6VJEgtWJkk4PW1YmZ6hwrBiZWHgkrRjZUmiZmDH+s0AtSHs1bP7NqQ0wHfkxbHUvgEqrfcDeXEstW+9pBho+jvkxbEQb/rF0Hbzibw45gpuN+QisNF9fe9+gkYcg5SNzmmLddvcnY4Vbgcat6OU2yHO6fjodnAlTkdmcvSwPhBPog/rbp8JTJXff6CAtlGfRlsjCvr3+48yLrvPwf8vCGz4mG2IoQAAAABJRU5ErkJggg==",
            Nt =
                "data:image/png;base64,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",
            It =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAMBQTFRFAAAA////4+Pj1NTU0tLS0dHR0tLS09PT1dXV////1tbW0dHR19fX5OTk0NDQ19fX4eHh0NDQ4ODg////0NDQxcXFn5+fe3t7VlZWLy8vHBwcCQkJ5OTk1NTUwMDAgYGBKSkpAAAAv7+/19fX1tbWvLy8UVFR////Z2dn////0NDQ1dXVBwcHzc3NU1NTwcHBLy8vs7OzExMTAAAA7u7uAgICBAQE4+Pj////AwMD5eXlwsLCd3d3AQEBFhYW////k1IG8gAAAEB0Uk5TAAc3ZYiqvcfQD12m1DCZ0TOnMhGOxqyai314cznKwp58ccNf07+KBJIOqdNzzYrEfrl2cvdyc/L/czHRn3J4EDKqQIwAAAJrSURBVHicpZfpWuowEIbDvgnKvlPmiIiyqaWl5ejx/u/qZJJUGjqhPOb7EZ428zYhmZlMGCOVyebyhWKpXC4VC/lcNkNbUapUa+U7TeVatXITWm/c3xG6b9RT0YcmRUo1W1fRdicy7Pb6g+FoPB4NB/1eN3rbaZvZyVTazJw5aJo7f2TPdGJiHxfC4GkJhJZPonPxSKLPeTnfFYWiVnL2+eck+/KKPWtnY2IBNs4abV5fEuMKdrszo6jdVtCXY4s579+uswBvezHzi7XCd+8faSzAxztaaqs2wXXe38ByGsdexHasjfu7TZ2zmjn+7+nZW9Cv1tpauZEIeodr3onYFv4NR3UdDgL2fN8T8PGYoB20j/wcY6Gr9jfg4j+c9f2Qw+pZ0wa9pSnZE35I+dUhkNa+L+ljQNErJE4CbqA/QxwOFOyHx4Ck0c8byFYw9n9iQRoHXkQHJL3E7IC5pYoxeH6vrENFA03POFTlcC221EkaaBoXvMZYBnOdFvsaDTQ9x6yYYVncJ/2zcRoMNO5WluV42wMjDQa6x7GciMU+GGkw0H0RmQXeDi7hMw0GesCxAivydpiA3YgGAz3kWJGVeDtKwmn0iGMlhjs1JmD3ciz9eYx7ZQenTNvAqmlbLZjVVlk5iZV7WgWGVUhaJQO7NHQ1AXo0+5MAtdT7V9mqgT2XZM+pl9VjSf9T2YaKdUlWJP268bj5UmzqccMe4gfdv09s3a8w9AynpH7QEUfsNelHrN3hblVW2BU0dqWUXRFnVT7aFa7MqmRmV4v1mewxF+t21wSu1u8vKKiT6Wp0SkVR37+/lAnddh38DxVvctWAbcfBAAAAAElFTkSuQmCC",
            Dt =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAFCUlEQVRoBdWbz28UZRzGgSLULrWBwyZICVvFKjHxYGibkJSLQWs9eTE9G/8Q/xIlHpqUm1CpvbaENMWTobRpgOxBLNYErO1udVnR5zPubGaGfWd3dt+Zd/ZJns7u/Hjf97PvO9+Z90ePHklPx5X0Obkon5bPyEPyiYa1OVJruKrtM/m5vCs/keuydR21nOLrSu89+aJ8Vh6Qu9E/umhHfihvyYeyFdkCpiYvyyX5mGxTL5VYWf5JpuZ7Uq/Ao8r9igxwFgL4rvxLt5l1C1xQhldlmq8L0cxX5ErSzLsBLimTWflk0swsn/+30rstl5OkmzSofKjEP5GJwK5FGWhhRPqdTgvTKTDnXZMn5G5aRaflSXoeZSnJb8hl+V85Vp0A86j5XH47NiW3B3nWn5cfy7HP73bAHAf2TTnvGlYBKScBzVjT7YBpxnmuWRUvJKBPyY9CewNf4oAJUNyz/SaatzGQmYBLuohonKcApeJ0rAs686n8R/SKVq+BvFTwnO1XWBgpOwywhNQKmDeok6Gz+vMLDLCEFAXm3djK6+Lw8PDA0tLSZwcHB19jPrMvlHv6X2CBqalos/1CR6x0BACcmZn5qJmTPmxvb29OTk5+s7e3R/cvK9HhuOFnFqxhQK3Akvj09PQrEX58fPzS+vr6lyMjI1nWdIgrCEx/NnU5gm6y+cC8PpZs0q6urt4zpecAGjYYm6MT3Nw+PPt71tzc3I/cs6aEMoaGzQvGPiRjUFZFYCJACfqBKeGMoT1GgOlXMuBmXQ3ob3MCDeNxgIliqUVNH3pra8t1TcN4DmBetlNVAHrDlFFGzbsIMIPkqWt/f597+rpq2iX0aYCZEchEPvTm5qYr6DMAD2VC28gE6KmpqeuOoIcAZq4nUwWg75syTumePuEEGEigJyYmqOksoT1g04+c+v5CoTAwODgY2/d+IdXrdeOgXNJCUsOM/2SuYrH42tra2ldjY2PvmDLf2Nj4Wff7d5VK5aXpnIT7a06AHcHy23jA1YS/Uk+nO4Sl3FVqmJn3TOQYFsZnALPMIHXlABbG5wDvpk2bE1gwdwFmkCu1QbUcwcL4BGBm23Zk68oRLGww1gFGD//f2PvLyKSD52wcgMfoAzPFaOvh7mU6Pz//ccYvFXGwsMHYHLhjHVSZHbakvu8HprRSeIMyZeXvL+uDt9bLr2EOsA7Kmmq12l+tEnMASzGabEFgojW2ooWFhdVoQo5gQ1zRwbs9FfL9aEG7+b68vLyj3tBvo6Ojp6rV6v7i4uLK7Ozs94eHh9Z6Ph2Wa1nn/emfG51MY/+nspUZRD8Th1sC1VIw/2CT9vev6AOLvvpdMMASUrRJc/CF/LtMLbdqAdqde3Hb3JLhCKkVMCewNoKBgZLcj6JmW85rmYCB5FWMFW6pD9STmUUxBHzHlF4cMNeU5fMy65/6Qb+qkD/IxidBO2AufCyzwi3v0MDelGPH6NoB63qvN0V4Z4VbXps3zZiajYXV8Y5nDanpR40EL2ibl+hNuQhQ3LN8bqtOajiYCIHsqfyWzLyyS/Gc5dHTMhqbCtZtTRWU4FXZ1RsZtxg1W5ETqVtgPxMWfV2RrS138hM2bOkIOPknj2h5AGZpUEk+JtsUnfeyTBev595crzWsMoTE1Ou78kX5rJw0RugSTwy4ES8YlqH5ep13bXuWbeBggQhq1DyPMlYZMPHOD8L0LEY8RjCzH0wIpP6veP8BxyvgH9P8JIgAAAAASUVORK5CYII=",
            Et =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGlQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7u7u4+PjAQEB////wsLCd3d3FhYWAAAA0caGdQAAACN0Uk5TAAQfNUZYYmhuCTFVcRtPbxxWC0kgajJwA1dz9/Jy/9GfeArUpP5BAAABeklEQVR4nKWX2XKDMAxFzW5A7BBIQ0ja///IQkgGLwLU6r7Z4zP2WLsQqBzX84MwkjIKA99zHfwUpjhJJWiSaRKT0CwvAFGRZ6doWWHkqqo8ROtmH13U1Pts2x2zAF27x176Mxagv6Do4J+ji/zBZuMrjQW4WlYbyOxMm3cT3/x+ufFXf2EBtF9rCf+sqlcsVp/a92uWuu42bznxK0zNhy3V3dtNPzWOd5T++LkaC9MsMNYoXa1spt476fQ47dJrhOYWvNErjNL5yy+12J8Metqli8VLE32PTicznBp7ZDqd86Q0N6m0dIRrv4dKu8KzYSrt4bFIo30RYDCNDkSIwiQ6FBEOU+hIWJbST9+NtUpLHsx6NuvDWKZiOQnLPVmBwQpJVjLgpSFWAtRS78NgLSfdlFtJ/2mwsMu+kz6r3OiF7vtpHjsudKwSSyjuppTizmoreA0Nr5XiNXGs9pHXuApWyyx4zTpvTBCsAWURYzRa9PP/oewl2jj4C2KDpdY+i1wPAAAAAElFTkSuQmCC",
            Ct =
                "data:image/png;base64,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",
            Tt =
                "data:image/png;base64,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";
        var zt = bt.ZT,
            Pt = bt.uu,
            Ot = bt.id,
            kt = bt.b1,
            Ut = bt.rB,
            Rt = bt.Sn,
            Yt = bt.Uq,
            Bt = bt.SQ,
            Ft = bt.i6;
        function Qt(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e &&
                    (n = n.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    i.push.apply(i, n);
            }
            return i;
        }
        function Zt(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? Qt(Object(i), !0).forEach(function (e) {
                          Vt(t, e, i[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
                    : Qt(Object(i)).forEach(function (e) {
                          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
                      });
            }
            return t;
        }
        function Vt(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        class Xt {
            constructor(t, e) {
                Vt(this, "_scene", void 0),
                    Vt(this, "_canvas", void 0),
                    Vt(this, "_gl", void 0),
                    Vt(this, "_programs", void 0),
                    Vt(this, "_dirty", void 0),
                    Vt(this, "_loopId", void 0),
                    Vt(this, "_animation", void 0),
                    Vt(this, "_place", void 0),
                    Vt(this, "_neighbors", void 0),
                    Vt(this, "_neighbor", void 0),
                    Vt(this, "_circles", void 0),
                    Vt(this, "_camera", void 0),
                    Vt(this, "_canvasDataUrlPromise", void 0),
                    Vt(this, "_pointBuffer", void 0),
                    Vt(this, "_trans", void 0),
                    Vt(this, "_lostContext", void 0),
                    (this._scene = t),
                    (this._canvas = document.createElement("canvas")),
                    this._canvas.addEventListener("webglcontextlost", this),
                    (this._gl = null),
                    (this._programs = { normal: null, bary: null, pointer: null }),
                    (this._dirty = !1),
                    (this._loopId = null),
                    (this._trans = e),
                    (this._animation = { ts: 0, place: null, fromYaw: 0, toYaw: 0 }),
                    (this._place = null),
                    (this._neighbors = []),
                    (this._neighbor = { buffer: null, uvs: null }),
                    (this._circles = { normal: null, active: null }),
                    (this._lostContext = null),
                    this._createGL(),
                    this._createCircles(),
                    (this._camera = new Lt()),
                    (this._canvasDataUrlPromise = null),
                    this._scene.getContainer().appendChild(this._canvas),
                    this.syncPort(),
                    (this._tick = this._tick.bind(this));
            }
            destroy() {
                cancelAnimationFrame(this._loopId),
                    this._place && (this._place.destroy(), (this._place = null)),
                    this._animation.place && (this._animation.place.destroy(), (this._animation.place = null)),
                    this._gl &&
                        (this._gl.deleteBuffer(this._pointBuffer),
                        (this._pointBuffer = null),
                        Object.keys(this._programs).forEach((t) => this._gl.deleteProgram(this._programs[t])),
                        (this._programs = { normal: null, bary: null, pointer: null }),
                        Object.keys(this._neighbor).forEach((t) => this._gl.deleteBuffer(this._neighbor[t])),
                        (this._neighbor = { buffer: null, uvs: null }),
                        (this._gl = null)),
                    this._canvas.removeEventListener("webglcontextlost", this);
            }
            handleEvent(t) {
                if ("webglcontextlost" === t.type) {
                    const t = document.createElement("div");
                    t.classList.add("popup-holder");
                    const e = document.createElement("div");
                    e.classList.add("popup-info");
                    const i = document.createElement("p");
                    i.textContent = this._trans.contextLost;
                    const n = document.createElement("div");
                    n.classList.add("buttons");
                    const r = document.createElement("button");
                    (r.type = "button"),
                        (r.style.cursor = "pointer"),
                        (r.textContent = this._trans.restore),
                        r.addEventListener("click", () => {
                            this.restoreContext();
                        }),
                        t.appendChild(e),
                        e.appendChild(i),
                        e.appendChild(n),
                        n.appendChild(r),
                        document.body.appendChild(t),
                        (this._lostContext = t);
                }
            }
            getSize() {
                return { width: this._canvas.width, height: this._canvas.height };
            }
            getCanvas() {
                return this._canvas;
            }
            getCamera() {
                return this._camera;
            }
            lostContext() {
                this._gl && this._gl.getExtension("WEBGL_lose_context").loseContext();
            }
            restoreContext() {
                this._lostContext &&
                    (this._lostContext.remove(),
                    (this._lostContext = null),
                    this._canvas.removeEventListener("webglcontextlost", this),
                    this._canvas.remove(),
                    (this._canvas = document.createElement("canvas")),
                    this._canvas.addEventListener("webglcontextlost", this),
                    this._createGL(),
                    this._createCircles(),
                    this._place.destroy(),
                    this._place.build(this._gl, !1),
                    this.redraw(!0),
                    this._scene.getContainer().appendChild(this._canvas),
                    this.syncPort());
            }
            setPlace(t, e) {
                const i = this._scene.getOptions(),
                    n = t.build(this._gl, e.blend && i.blend && !!this._place);
                return (
                    e.blend && i.blend && this._place
                        ? n.then(
                              () => {
                                  this._blendTo(t, e.yaw);
                              },
                              () => {}
                          )
                        : n.then(
                              () => {
                                  this._switchPlace(t, e.yaw);
                              },
                              () => {}
                          ),
                    n
                );
            }
            setRotation(t, e) {
                return this._camera.lookFrom([0, 0, 0], t, e, 0), (this._dirty = !0), this;
            }
            setFOV(t) {
                return this._camera.configure(t, this._canvas.width / this._canvas.height, 0.1, 1e3), (this._dirty = !0), this;
            }
            setNeighbors(t) {
                return (
                    (this._neighbors = t.map((t) => {
                        const e = t.dx,
                            i = -t.dy,
                            n = t.dz,
                            r = Math.pow(e * e + n * n + i * i, 0.2) / 4,
                            a = v();
                        j(a, a, [e, n, i]);
                        let s = Math.atan2(-i, e);
                        return (
                            (s -= Math.PI / 2),
                            w(a, a, s),
                            (function (t, e, i) {
                                let n = i[0],
                                    r = i[1],
                                    a = i[2];
                                (t[0] = e[0] * n),
                                    (t[1] = e[1] * n),
                                    (t[2] = e[2] * n),
                                    (t[3] = e[3] * n),
                                    (t[4] = e[4] * r),
                                    (t[5] = e[5] * r),
                                    (t[6] = e[6] * r),
                                    (t[7] = e[7] * r),
                                    (t[8] = e[8] * a),
                                    (t[9] = e[9] * a),
                                    (t[10] = e[10] * a),
                                    (t[11] = e[11] * a),
                                    (t[12] = e[12]),
                                    (t[13] = e[13]),
                                    (t[14] = e[14]),
                                    (t[15] = e[15]);
                            })(a, a, [r, r, 2 * r]),
                            Zt(Zt({}, t), {}, { active: 0, transform: a })
                        );
                    })),
                    (this._dirty = !0),
                    this
                );
            }
            highlightNeighbor(t, e) {
                this._neighbors.forEach((t) => {
                    t.active = 0;
                }),
                    t > -1 && (this._neighbors[t].active = e || 1),
                    (this._dirty = !0);
            }
            redraw(t) {
                t && (this._dirty = !0), this._tick();
            }
            syncPort() {
                const t = this._canvas.parentNode;
                t && ((this._canvas.height = t.clientHeight), (this._canvas.width = t.clientWidth), this._gl.viewport(0, 0, this._canvas.width, this._canvas.height), this.setFOV(this._scene.getCamera().fov));
            }
            getDataUrl() {
                return (
                    (this._canvasDataUrlPromise = (function () {
                        let t = null,
                            e = null;
                        return {
                            promise: new Promise((i, n) => {
                                (t = i), (e = n);
                            }),
                            resolve: t,
                            reject: e,
                        };
                    })()),
                    this._canvasDataUrlPromise
                );
            }
            _blendTo(t, e) {
                if (((this._animation.ts = Date.now()), (this._animation.fromYaw = this._scene.getCamera().yaw), (this._animation.toYaw = e), this._animation.place)) {
                    if (this._animation.place === t) return;
                    this._place && this._place !== t && this._place.destroy(), (this._place = this._animation.place);
                }
                (this._animation.place = t), this.redraw();
            }
            _tick() {
                if ((this._loopId && (cancelAnimationFrame(this._loopId), (this._loopId = null)), (!this._place && !this._canvasDataUrlPromise) || !this._gl)) return;
                if (((this._loopId = requestAnimationFrame(this._tick)), (this._place.isDirty() || this._animation.ts || At()) && (this._dirty = !0), !this._dirty && !this._canvasDataUrlPromise)) return;
                (this._dirty = !1), this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
                const t = this._programs.normal;
                this._gl.useProgram(t);
                const e = this._gl.getUniformLocation(t, "uPMatrix");
                this._gl.uniformMatrix4fv(e, !1, this._camera.getPMatrix());
                const i = this._gl.getUniformLocation(t, "uVMatrix");
                if ((this._gl.uniformMatrix4fv(i, !1, this._camera.getVMatrix()), this._animation.ts)) {
                    const t = (Date.now() - this._animation.ts) / this._scene.getOptions().blend;
                    if (t < 1) {
                        this._drawFraction(t);
                        const e = (function (t, e, i) {
                            return t + i * (e - t);
                        })(this._animation.fromYaw, this._animation.toYaw, t);
                        this._place.movePlace(t, this._scene.getCamera().yaw, this._animation.place.angle), this._scene.setCamera({ yaw: e });
                    } else this._switchPlace(this._animation.place, this._animation.toYaw);
                }
                this._place.draw(this._gl, t, this._scene), this._drawNeighbors(), this._canvasDataUrlPromise && (this._canvasDataUrlPromise.resolve(this._canvas.toDataURL()), (this._canvasDataUrlPromise = null)), At() && this._drawDebug();
            }
            _drawFraction(t) {
                const e = 0 === (i = t) ? 0 : 1 === i ? 1 : i < 0.5 ? Math.pow(2, 20 * i - 10) / 2 : (2 - Math.pow(2, -20 * i + 10)) / 2;
                var i;
                this._animation.place.setOpacity(e), this._animation.place.draw(this._gl, this._programs.normal, this._scene), this._place.setOpacity(1 - e);
            }
            _createGL() {
                const t = P(this._canvas, { alpha: !0, premultipliedAlpha: !1 });
                let e = O(
                        t,
                        t.VERTEX_SHADER,
                        "\n\tattribute vec3 aPosition;\n\tattribute vec2 aTextureCoord;\n\tvarying vec2 vTextureCoord;\n\tvarying vec3 vBC;\n\tuniform mat4 uMMatrix;\n\tuniform mat4 uVMatrix;\n\tuniform mat4 uPMatrix;\n\tvoid main(void) {\n\t\tgl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);\n\t\tvTextureCoord = aTextureCoord;\n\t}\n"
                    ),
                    i = O(
                        t,
                        t.FRAGMENT_SHADER,
                        "\n\tprecision mediump float;\n\tvarying vec2 vTextureCoord;\n\tuniform sampler2D uSampler;\n\tuniform float uOpacity;\n\tuniform float uGamma;\n\tuniform vec3 uGrayworld;\n\tuniform float uSaturation;\n\tvoid main(void) {\n\t\tvec4 color = vec4(uGrayworld, 1.0) * texture2D(uSampler, vTextureCoord);\n\t\tif (uSaturation != 1.0) {\n\t\t\tfloat minc = min(min(color.r, color.g), color.b);\n\t\t\tfloat maxc = max(max(color.r, color.g), color.b);\n\t\t\tfloat chroma = maxc - minc;\n\t\t\tfloat lum = (maxc + minc) * 0.5;\n\t\t\tfloat max_chroma = 1.0 - abs(2.0 * lum - 1.0);\n\t\t\tfloat mul = min(uSaturation, max_chroma / chroma);\n\t\t\tvec4 lumv = vec4(lum, lum, lum, 0.0);\n\t\t\tcolor = (color - lumv) * vec4(mul, mul, mul, 1.0) + lumv;\n\t\t}\n\t\tgl_FragColor = uOpacity * pow(color, vec4(uGamma, uGamma, uGamma, 1.0));\n\t}\n"
                    );
                (this._programs.normal = k(t, e, i)), t.deleteShader(e), t.deleteShader(i);
                let n = t.getAttribLocation(this._programs.normal, "aPosition");
                t.enableVertexAttribArray(n),
                    (n = t.getAttribLocation(this._programs.normal, "aTextureCoord")),
                    t.enableVertexAttribArray(n),
                    (e = O(
                        t,
                        t.VERTEX_SHADER,
                        "\n\tattribute vec3 aPosition;\n\tattribute vec3 aBaryPosition;\n\tvarying vec3 vBC;\n\tuniform mat4 uMMatrix;\n\tuniform mat4 uVMatrix;\n\tuniform mat4 uPMatrix;\n\tvoid main(void) {\n\t\tgl_PointSize = 10.0;\n\t\tgl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);\n\t\tvBC = aBaryPosition;\n\t}\n"
                    )),
                    (i = O(
                        t,
                        t.FRAGMENT_SHADER,
                        "\n\tprecision mediump float;\n\tvarying vec3 vBC;\n\tuniform vec3 uColor;\n\tvoid main(void) {\n\t\tfloat dist = min(min(vBC.x, vBC.y), vBC.z);\n\t\tfloat limit = 0.05;\n\t\tif (dist < limit) {\n\t\t\tgl_FragColor = mix(vec4(uColor, 0.0), vec4(uColor, 1.0), 1.0-dist/limit);\n\t\t} else {\n\t\t\tdiscard;\n\t\t}\n\t}\n"
                    )),
                    (this._programs.bary = k(t, e, i)),
                    t.deleteShader(e),
                    t.deleteShader(i),
                    (n = t.getAttribLocation(this._programs.bary, "aPosition")),
                    t.enableVertexAttribArray(n),
                    (n = t.getAttribLocation(this._programs.bary, "aBaryPosition")),
                    t.enableVertexAttribArray(n),
                    (e = O(
                        t,
                        t.VERTEX_SHADER,
                        "\n\tattribute vec3 aPosition;\n\tuniform mat4 uVMatrix;\n\tuniform mat4 uPMatrix;\n\tvoid main(void) {\n\t\tgl_PointSize = 16.0;\n\t\tgl_Position = uPMatrix * uVMatrix * vec4(aPosition, 1.0);\n\t}\n"
                    )),
                    (i = O(
                        t,
                        t.FRAGMENT_SHADER,
                        "\n\tprecision mediump float;\n\tvoid main(void) {\n\t\tvec2 coords = gl_PointCoord - vec2(0.5);\n\t\tif (length(coords) < 0.5) {\n\t\t\tgl_FragColor = vec4(1.0, 0.2, 0.2, 0.7);\n\t\t} else {\n\t\t\tdiscard;\n\t\t}\n\t}\n"
                    )),
                    (this._programs.pointer = k(t, e, i)),
                    t.deleteShader(e),
                    t.deleteShader(i),
                    (n = t.getAttribLocation(this._programs.pointer, "aPosition")),
                    t.enableVertexAttribArray(n),
                    (this._pointBuffer = t.createBuffer()),
                    (this._neighbor.buffer = t.createBuffer()),
                    t.bindBuffer(t.ARRAY_BUFFER, this._neighbor.buffer),
                    t.bufferData(t.ARRAY_BUFFER, new Float32Array(u), t.STATIC_DRAW),
                    (this._neighbor.uvs = t.createBuffer()),
                    t.bindBuffer(t.ARRAY_BUFFER, this._neighbor.uvs),
                    t.bufferData(t.ARRAY_BUFFER, new Float32Array(c), t.STATIC_DRAW),
                    t.enable(t.BLEND),
                    t.clearColor(0, 0, 0, 1),
                    (this._gl = t);
            }
            _createCircles() {
                if (!this._gl) return;
                const t = this._circles,
                    e = new Image();
                (e.crossOrigin = "anonymous"),
                    e.addEventListener("load", () => {
                        this._gl && ((t.normal = U(this._gl, e)), (this._dirty = !0));
                    }),
                    (e.src = Bt);
                const i = new Image();
                (i.crossOrigin = "anonymous"),
                    i.addEventListener("load", () => {
                        this._gl && ((t.active = U(this._gl, i)), (this._dirty = !0));
                    }),
                    (i.src = Yt);
            }
            _switchPlace(t, e) {
                this._place && this._place.destroy(), (this._place = t), this._place.setOpacity(1), this._scene.setCamera({ yaw: e }), (this._animation.place = null), (this._animation.ts = 0), this.redraw();
            }
            _drawNeighbors() {
                if (!this._circles.normal || !this._circles.active) return;
                const t = this._programs.normal;
                let e = this._gl.getUniformLocation(t, "uOpacity");
                this._gl.uniform1f(e, 1),
                    this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA),
                    (e = this._gl.getUniformLocation(t, "uGamma")),
                    this._gl.uniform1f(e, 1),
                    (e = this._gl.getUniformLocation(t, "uGrayworld")),
                    this._gl.uniform3fv(e, [1, 1, 1]),
                    (e = this._gl.getUniformLocation(t, "uSaturation")),
                    this._gl.uniform1f(e, 1),
                    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._neighbor.uvs),
                    (e = this._gl.getAttribLocation(t, "aTextureCoord")),
                    this._gl.vertexAttribPointer(e, 2, this._gl.FLOAT, !1, 0, 0),
                    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._neighbor.buffer),
                    (e = this._gl.getAttribLocation(t, "aPosition")),
                    this._gl.vertexAttribPointer(e, 3, this._gl.FLOAT, !1, 0, 0),
                    this._neighbors.forEach((e) => {
                        if (!e.active) return;
                        this._gl.activeTexture(this._gl.TEXTURE0), this._gl.bindTexture(this._gl.TEXTURE_2D, this._circles[2 === e.active ? "active" : "normal"]);
                        let i = this._gl.getUniformLocation(t, "uSampler");
                        this._gl.uniform1i(i, 0), (i = this._gl.getUniformLocation(t, "uMMatrix")), this._gl.uniformMatrix4fv(i, !1, e.transform), this._gl.drawArrays(this._gl.TRIANGLES, 0, 6);
                    });
            }
            _drawDebug() {
                const t = this._programs.bary;
                this._gl.useProgram(t);
                let e = this._gl.getUniformLocation(t, "uPMatrix");
                this._gl.uniformMatrix4fv(e, !1, this._camera.getPMatrix());
                let i = this._gl.getUniformLocation(t, "uVMatrix");
                this._gl.uniformMatrix4fv(i, !1, this._camera.getVMatrix()), this._place.drawDebug(this._gl, t, this._scene);
                const n = this._scene.getNavigation();
                if (!n) return;
                const r = this._programs.pointer;
                this._gl.useProgram(r),
                    (e = this._gl.getUniformLocation(r, "uPMatrix")),
                    this._gl.uniformMatrix4fv(e, !1, this._camera.getPMatrix()),
                    (i = this._gl.getUniformLocation(r, "uVMatrix")),
                    this._gl.uniformMatrix4fv(i, !1, this._camera.getVMatrix());
                const a = n.getMousePos(),
                    s = J(this._scene, a.x, a.y),
                    o = -1 * Math.sin(s.pitch),
                    h = 1 * Math.cos(s.pitch) * Math.sin(s.yaw),
                    l = -1 * Math.cos(s.pitch) * Math.cos(s.yaw);
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._pointBuffer), this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([h, o, l]), this._gl.STATIC_DRAW);
                const u = this._gl.getAttribLocation(r, "aPosition");
                this._gl.vertexAttribPointer(u, 3, this._gl.FLOAT, !1, 0, 0), this._gl.drawArrays(this._gl.POINTS, 0, 1);
            }
        }
        function Wt(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        class Ht {
            constructor(t) {
                Wt(this, "_size", void 0), Wt(this, "_resolution", void 0), Wt(this, "_data", void 0), Wt(this, "_palette", void 0), (this._size = 0), (this._resolution = 0), (this._data = null), (this._palette = []), this._parse(t);
            }
            getPalette() {
                return this._palette;
            }
            getIndex(t, e) {
                const i = 100 / this._resolution,
                    n = t * i,
                    r = e * i,
                    a = this._size / 2,
                    s = Math.round(a + n),
                    o = Math.round(a - r);
                return this._getIndexForPixel(s, o);
            }
            _parse(t) {
                let e = 0;
                const i = String.fromCharCode(...t.slice(e, e + 2));
                if ("sz" !== i) throw new Error("No valid header found in clickmask binary data");
                e += i.length;
                const n = String.fromCharCode(t[e]),
                    r = "n" === n ? 1 : parseInt(n);
                e += 1;
                let a = t[e];
                (e += 1), (this._size = t[e] + 256 * t[e + 1]), (e += 2), (this._resolution = t[e]), (e += 1);
                const s = 1 + t[e] / 100;
                e += 1;
                const o = t[e] + 256 * t[e + 1];
                for (e += 2, this._data = t.slice(e, e + o), e += o; a--; ) {
                    const i = { pid: (0, 0), dx: 0, dy: 0, dz: 0 };
                    t.slice(e, e + 8).forEach((t, e) => {
                        i.pid += t * (1 << (8 * e));
                    }),
                        (e += 8),
                        (i.dx = t[e] + 256 * t[e + 1]),
                        (e += 2),
                        (i.dy = t[e] + 256 * t[e + 1]),
                        (e += 2),
                        i.dx >= 32768 && (i.dx -= 65536),
                        i.dy >= 32768 && (i.dy -= 65536),
                        (i.dx /= 100),
                        (i.dy /= 100),
                        r > 1 ? ((i.dz = t[e] + 256 * t[e + 1]), i.dz >= 32768 && (i.dz -= 65536), (i.dz /= 100), (e += 2)) : (i.dz = -s),
                        this._palette.push(i);
                }
            }
            _getIndexForPixel(t, e) {
                let i = 0,
                    n = 0,
                    r = 0;
                if (i >= this._size || n >= this._size) return null;
                for (; r < this._data.length; ) {
                    let a = this._data[r] + 1;
                    const s = this._data[r + 1];
                    for (; a; ) {
                        const r = Math.min(a, this._size - i);
                        if (((i += r), (a -= r), e === n && i > t)) return s ? s - 1 : null;
                        i === this._size && ((i = 0), n++);
                    }
                    r += 2;
                }
                return null;
            }
        }
        var Kt = 0.9996,
            Gt = 0.00669438,
            qt = Math.pow(Gt, 2),
            Jt = Math.pow(Gt, 3),
            $t = Gt / (1 - Gt),
            te = Math.sqrt(1 - Gt),
            ee = (1 - te) / (1 + te),
            ie = Math.pow(ee, 2),
            ne = Math.pow(ee, 3),
            re = Math.pow(ee, 4),
            ae = Math.pow(ee, 5),
            se = 1 - Gt / 4 - (3 * qt) / 64 - (5 * Jt) / 256,
            oe = (3 * Gt) / 8 + (3 * qt) / 32 + (45 * Jt) / 1024,
            he = (15 * qt) / 256 + (45 * Jt) / 1024,
            le = (35 * Jt) / 3072,
            ue = 1.5 * ee - (27 / 32) * ne + (269 / 512) * ae,
            ce = (21 / 16) * ie - (55 / 32) * re,
            de = (151 / 96) * ne - (417 / 128) * ae,
            pe = (1097 / 512) * re,
            ge = 6378137,
            me = "CDEFGHJKLMNPQRSTUVWXX";
        function _e(t, e, i) {
            if (t > 84 || t < -80) throw new RangeError("latitude out of range (must be between 80 deg S and 84 deg N)");
            if (e > 180 || e < -180) throw new RangeError("longitude out of range (must be between 180 deg W and 180 deg E)");
            var n,
                r = ye(t),
                a = Math.sin(r),
                s = Math.cos(r),
                o = Math.tan(r),
                h = Math.pow(o, 2),
                l = Math.pow(o, 4);
            n =
                void 0 === i
                    ? (function (t, e) {
                          if (56 <= t && t < 64 && 3 <= e && e < 12) return 32;
                          if (72 <= t && t <= 84 && e >= 0) {
                              if (e < 9) return 31;
                              if (e < 21) return 33;
                              if (e < 33) return 35;
                              if (e < 42) return 37;
                          }
                          return Math.floor((e + 180) / 6) + 1;
                      })(t, e)
                    : i;
            var u = (function (t) {
                    return -80 <= t && t <= 84 ? me[Math.floor((t + 80) / 8)] : null;
                })(t),
                c = ye(e),
                d = ye(fe(n)),
                p = ge / Math.sqrt(1 - Gt * a * a),
                g = $t * s * s,
                m = s * (c - d),
                _ = Math.pow(m, 2),
                f = Math.pow(m, 3),
                M = Math.pow(m, 4),
                y = Math.pow(m, 5),
                L = Math.pow(m, 6),
                v = ge * (se * r - oe * Math.sin(2 * r) + he * Math.sin(4 * r) - le * Math.sin(6 * r)),
                A = Kt * (v + p * o * (_ / 2 + (M / 24) * (5 - h + 9 * g + 4 * g * g) + (L / 720) * (61 - 58 * h + l + 600 * g - 330 * $t)));
            return t < 0 && (A += 1e7), { easting: Kt * p * (m + (f / 6) * (1 - h + g) + (y / 120) * (5 - 18 * h + l + 72 * g - 58 * $t)) + 5e5, northing: A, zoneNum: n, zoneLetter: u };
        }
        function fe(t) {
            return 6 * (t - 1) - 180 + 3;
        }
        function Me(t) {
            return (t / Math.PI) * 180;
        }
        function ye(t) {
            return (t * Math.PI) / 180;
        }
        function Le(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        class ve {
            constructor(t) {
                Le(this, "_scene", void 0),
                    Le(this, "_dom", void 0),
                    Le(this, "_sceneOptions", void 0),
                    Le(this, "_mouse", void 0),
                    Le(this, "_clickMask", void 0),
                    Le(this, "_cameraMoving", void 0),
                    Le(this, "_clickId", void 0),
                    Le(this, "_overControls", void 0),
                    Le(this, "_mouseDown", void 0),
                    Le(this, "_valid", void 0),
                    Le(this, "_firstLoad", void 0),
                    Le(this, "_neighbors", void 0),
                    Le(this, "_heading", void 0),
                    Le(this, "_keys", void 0),
                    Le(this, "_isKeyDown", void 0),
                    Le(this, "_url", void 0),
                    Le(this, "_apiKey", void 0),
                    (this._scene = t);
                const e = this._scene.getOptions();
                (this._url = e.url),
                    (this._apiKey = e.apiKey),
                    (this._dom = { container: document.createElement("div"), debug: document.createElement("div"), tilt: document.createElement("div"), rotate: document.createElement("div"), near: [], far: [] }),
                    (this._sceneOptions = { blend: !0, yaw: null }),
                    this._dom.container.classList.add("panorama-nav"),
                    (this._dom.debug.innerHTML = ""),
                    Object.assign(this._dom.debug.style, { position: "absolute", left: 0, top: 0, color: "#000", "text-shadow": "0 0 2px #fff" }),
                    (this._mouse = { x: 0, y: 0 }),
                    (this._clickMask = null),
                    (this._cameraMoving = !1),
                    (this._clickId = null),
                    (this._overControls = !1),
                    (this._mouseDown = !1),
                    (this._valid = !1),
                    (this._firstLoad = !0),
                    (this._neighbors = []),
                    (this._heading = null),
                    (this._keys = []),
                    (this._isKeyDown = !1),
                    this._dom.container.appendChild(this._dom.tilt),
                    this._dom.tilt.appendChild(this._dom.rotate),
                    (this._dom.container.style.perspective = "500px"),
                    this._dom.container.addEventListener("click", this, !1);
                const i = t.getContainer();
                i.appendChild(this._dom.container),
                    i.appendChild(this._dom.debug),
                    i.addEventListener("mousedown", this, !1),
                    i.addEventListener("mouseup", this, !1),
                    i.addEventListener("mousemove", this, !1),
                    i.addEventListener("click", this, !1),
                    window.addEventListener("keydown", this, !1),
                    window.addEventListener("keyup", this, !1),
                    this._dom.container.addEventListener("mouseover", this, !1),
                    this._dom.container.addEventListener("mouseout", this, !1);
            }
            destroy() {
                const t = this._scene.getContainer();
                t.removeEventListener("mousedown", this, !1),
                    t.removeEventListener("mouseup", this, !1),
                    t.removeEventListener("mousemove", this, !1),
                    t.removeEventListener("click", this, !1),
                    window.removeEventListener("keydown", this, !1),
                    window.removeEventListener("keyup", this, !1),
                    this._dom.container.removeEventListener("mouseover", this, !1),
                    this._dom.container.removeEventListener("mouseout", this, !1);
            }
            invalidate() {
                (this._valid = !1), (this._clickId = null), (this._clickMask = null), this._scene.getRenderer().setNeighbors([]);
            }
            isKeyDown() {
                return this._isKeyDown;
            }
            getMousePos() {
                return this._mouse;
            }
            update(t, e) {
                this._heading = null;
                for (let e = 0; e < this._neighbors.length; e++) {
                    const i = this._neighbors[e];
                    (i.near !== t && i.far !== t) || (this._heading = i.angle);
                }
                (this._neighbors = e), (this._valid = !0), (this._overControls = !1), (this._dom.rotate.innerHTML = ""), (this._dom.near = []), (this._dom.far = []);
                for (let t = 0; t < this._neighbors.length; t++) {
                    const e = this._neighbors[t];
                    let i = e.angle;
                    i -= 90;
                    const n = this._buildButtons(i, e.near);
                    this._dom.rotate.appendChild(n);
                }
                this._getClickMask(t);
            }
            updateCamera() {
                this._cameraMoving = !0;
                const t = this._scene.getCamera();
                let e = (180 * t.yaw) / Math.PI;
                (this._dom.rotate.style.transform = `rotate(${-e}deg)`), (e = 45 - (180 * t.pitch) / Math.PI / 2), (this._dom.tilt.style.transform = `rotateX(${e}deg)`), this._updateMouse();
            }
            handleEvent(t) {
                switch (t.type) {
                    case "keydown":
                        {
                            const e = t,
                                i = "IDCLIP";
                            this._keys.push(String.fromCharCode(e.keyCode)), this._keys.length > i.length && this._keys.shift(), this._keys.join("") === i && ((this._keys = []), (vt = 0 === vt ? 1 : 0));
                            const n = e.target.nodeName.toLowerCase();
                            if (-1 !== ["input", "select", "option", "textarea"].indexOf(n)) return;
                            if (-1 === [38, 40, 87, 83].indexOf(e.keyCode)) return;
                            e.preventDefault();
                            const r = this._scene.getCamera().yaw + (38 === e.keyCode || 87 === e.keyCode ? 0 : Math.PI);
                            (this._isKeyDown = !0), this._navToYaw(r % (2 * Math.PI));
                        }
                        break;
                    case "keyup":
                        this._isKeyDown = !1;
                        break;
                    case "click":
                        {
                            const e = t.target;
                            "button" === e.nodeName.toLowerCase() ? this._clickButton(e) : this._clickScene();
                        }
                        break;
                    case "mousedown":
                        {
                            if (((this._cameraMoving = !1), !this._valid)) return;
                            const e = t.target;
                            (this._mouseDown = !0), "button" === e.nodeName.toLowerCase() ? (e.classList.add("active"), (e.style.background = `transparent url(${e.classList.contains("double") ? Ot : zt})`)) : this._updateMouse();
                        }
                        break;
                    case "mouseup":
                        (this._mouseDown = !1),
                            this._dom.near.forEach((t) => {
                                t.classList.remove("active"), (t.style.background = `transparent url(${t.classList.contains("double") ? kt : Pt})`);
                            }),
                            this._updateMouse();
                        break;
                    case "mousemove":
                        {
                            const e = t,
                                i = this._scene.getContainer().getBoundingClientRect();
                            (this._mouse.x = e.clientX - i.left), (this._mouse.y = e.clientY - i.top), this._updateMouse();
                        }
                        break;
                    case "mouseover":
                        (this._overControls = !0), this._updateMouse();
                        break;
                    case "mouseout":
                        (this._overControls = !1), this._updateMouse();
                }
            }
            _clickScene() {
                if (!(!this._valid || this._cameraMoving || (this._scene.getTimeline() && this._scene.getTimeline().isOpen())))
                    if (null !== this._clickId && this._clickMask) {
                        const t = this._clickMask.getPalette()[this._clickId].pid,
                            e = J(this._scene, this._mouse.x, this._mouse.y);
                        this.invalidate(),
                            pt({ pid: t, url: this._url, apiKey: this._apiKey }).then((t) => {
                                (t.angle = (e.yaw / Math.PI) * 180), this._scene.show(t, this._sceneOptions);
                            });
                    } else if (!this._clickMask) {
                        const t = J(this._scene, this._mouse.x, this._mouse.y),
                            e = 2.4 / Math.atan(t.pitch);
                        if (e < 0) return;
                        const i = e * Math.sin(t.yaw),
                            n = e * Math.cos(t.yaw),
                            r = this._scene.getPlace().getCoords(),
                            a = _e(r[1], r[0], 33);
                        (a.easting += n), (a.northing += i);
                        const s = (function (t, e, i, n, r, a) {
                            if (((a = void 0 === a || a), !n && void 0 === r)) throw new Error("either zoneLetter or northern needs to be set");
                            if (n && void 0 !== r) throw new Error("set either zoneLetter or northern, but not both");
                            if (a) {
                                if (t < 1e5 || 1e6 <= t) throw new RangeError("easting out of range (must be between 100 000 m and 999 999 m)");
                                if (e < 0 || e > 1e7) throw new RangeError("northing out of range (must be between 0 m and 10 000 000 m)");
                            }
                            if (i < 1 || i > 60) throw new RangeError("zone number out of range (must be between 1 and 60)");
                            if (n) {
                                if (1 !== (n = n.toUpperCase()).length || -1 === me.indexOf(n)) throw new RangeError("zone letter out of range (must be between C and X)");
                                r = n >= "N";
                            }
                            var s = t - 5e5,
                                o = e;
                            r || (o -= 1e7);
                            var h = o / Kt / (ge * se),
                                l = h + ue * Math.sin(2 * h) + ce * Math.sin(4 * h) + de * Math.sin(6 * h) + pe * Math.sin(8 * h),
                                u = Math.sin(l),
                                c = Math.pow(u, 2),
                                d = Math.cos(l),
                                p = Math.tan(l),
                                g = Math.pow(p, 2),
                                m = Math.pow(p, 4),
                                _ = 1 - Gt * c,
                                f = Math.sqrt(_),
                                M = (1 - Gt) / _,
                                y = ee * d * d,
                                L = y * y,
                                v = s / ((ge / f) * Kt),
                                A = Math.pow(v, 2),
                                j = Math.pow(v, 3),
                                b = Math.pow(v, 4),
                                w = Math.pow(v, 5),
                                x = Math.pow(v, 6),
                                S = (v - (j / 6) * (1 + 2 * g + y) + (w / 120) * (5 - 2 * y + 28 * g - 3 * L + 8 * $t + 24 * m)) / d;
                            return { latitude: Me(l - (p / M) * (A / 2 - (b / 24) * (5 + 3 * g + 10 * y - 4 * L - 9 * $t)) + (x / 720) * (61 + 90 * g + 298 * y + 45 * m - 252 * $t - 3 * L)), longitude: Me(S) + fe(i) };
                        })(a.easting, a.northing, a.zoneNum, a.zoneLetter);
                        gt({ lon: s.longitude, lat: s.latitude, url: this._url, apiKey: this._apiKey }).then(
                            (t) => {
                                this._scene.show(t, this._sceneOptions);
                            },
                            (t) => console.log(t)
                        );
                    }
            }
            _updateMouse() {
                if (!this._clickMask) return;
                const t = J(this._scene, this._mouse.x, this._mouse.y),
                    e = 2.4 / Math.atan(t.pitch),
                    i = e * Math.sin(t.yaw),
                    n = e * Math.cos(t.yaw);
                let r = this._clickMask.getIndex(i, n);
                if (At()) {
                    const a = { yaw: t.yaw.toFixed(8), pitch: t.pitch.toFixed(8), dx: i.toFixed(8), dy: n.toFixed(8), dist: e.toFixed(8), id: r };
                    this._dom.debug.innerHTML = JSON.stringify(a);
                }
                if (((e < 0 || this._overControls) && (r = null), null !== r)) {
                    const t = this._clickMask.getPalette()[r];
                    Math.sqrt(t.dx * t.dx + t.dy * t.dy + t.dz * t.dz) < 7 && (r = null);
                }
                this._clickId = r;
                const a = null === r ? -1 : r;
                this._scene.getRenderer().highlightNeighbor(a, this._mouseDown ? 2 : 1), this._scene.getContainer().classList[r ? "add" : "remove"]("available");
            }
            _clickButton(t) {
                if (!this._valid || this._cameraMoving || (this._scene.getTimeline() && this._scene.getTimeline().isOpen())) return;
                const e = this._dom.near.indexOf(t);
                -1 !== e && this._navToNeighbor(this._neighbors[e].near, this._neighbors[e].angle);
            }
            _buildButtons(t, e) {
                const i = document.createElement("div");
                i.classList.add("buttonset"), i.classList.add("noprint"), (i.style.transformOrigin = "0 50%"), (i.style.transform = `rotate(${t}deg)`);
                const n = document.createElement("button");
                return (
                    2 === e.getData().arrow ? (n.classList.add("double"), (n.style.background = `transparent url(${kt})`)) : (n.style.background = `transparent url(${Pt})`),
                    n.addEventListener("pointerenter", () => {
                        n.classList.contains("active") ? (n.style.background = `transparent url(${n.classList.contains("active") ? Ot : zt})`) : (n.style.background = `transparent url(${n.classList.contains("active") ? Ut : Rt})`);
                    }),
                    n.addEventListener("pointerleave", () => {
                        n.style.background = `transparent url(${n.classList.contains("double") ? kt : Pt})`;
                    }),
                    this._dom.near.push(n),
                    i.appendChild(n),
                    i
                );
            }
            _navToYaw(t) {
                let e = 1 / 0,
                    i = null;
                for (let n = 0; n < this._neighbors.length; n++) {
                    let r = (t - (this._neighbors[n].angle * Math.PI) / 180 + 2 * Math.PI) % (2 * Math.PI);
                    r > Math.PI && (r = 2 * Math.PI - r), r > Math.PI / 2 || (r < e && ((e = r), (i = this._neighbors[n])));
                }
                i && this._navToNeighbor(i.near, i.angle);
            }
            _navToNeighbor(t, e) {
                (t.angle = e), null !== this._heading ? this._scene.show(t, { blend: !0, yaw: this._scene.getCamera().yaw }) : this._scene.show(t, this._sceneOptions);
            }
            _getClickMask(t) {
                if (((this._clickMask = null), this._scene.getContainer().classList.remove("available"), !t.getId())) return;
                const e = this._scene.getTimeline(),
                    i = e ? e.getYear() : 0;
                mt({ pid: t.getId(), url: this._url, apiKey: this._apiKey, year: i }).promise.then(
                    (t) => {
                        this._clickMaskResponse(t);
                    },
                    (t) => console.log(t)
                );
            }
            _clickMaskResponse(t) {
                try {
                    this._clickMask = new Ht(t);
                } catch (t) {
                    return void console.log(t);
                }
                this._scene.getRenderer().setNeighbors(this._clickMask.getPalette()), this._updateMouse(), this._firstLoad && ((this._firstLoad = !1), (this._cameraMoving = !1));
            }
        }
        var Ae = i(379),
            je = i.n(Ae),
            be = i(795),
            we = i.n(be),
            xe = i(569),
            Se = i.n(xe),
            Ne = i(565),
            Ie = i.n(Ne),
            De = i(216),
            Ee = i.n(De),
            Ce = i(589),
            Te = i.n(Ce),
            ze = i(20),
            Pe = {};
        (Pe.styleTagTransform = Te()), (Pe.setAttributes = Ie()), (Pe.insert = Se().bind(null, "head")), (Pe.domAPI = we()), (Pe.insertStyleElement = Ee());
        je()(ze.Z, Pe);
        ze.Z && ze.Z.locals && ze.Z.locals;
        function Oe(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e &&
                    (n = n.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    i.push.apply(i, n);
            }
            return i;
        }
        function ke(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? Oe(Object(i), !0).forEach(function (e) {
                          Ue(t, e, i[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
                    : Oe(Object(i)).forEach(function (e) {
                          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
                      });
            }
            return t;
        }
        function Ue(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        class Re {
            constructor(t, i) {
                if (
                    (Ue(this, "_node", void 0),
                    Ue(this, "_loader", void 0),
                    Ue(this, "_logoLink", void 0),
                    Ue(this, "_options", void 0),
                    Ue(this, "_raf", void 0),
                    Ue(this, "_raf2", void 0),
                    Ue(this, "_place", void 0),
                    Ue(this, "_event", void 0),
                    Ue(this, "_neighborsRequest", void 0),
                    Ue(this, "_timeline", void 0),
                    Ue(this, "_lastEvents", void 0),
                    Ue(this, "_lastTimestamp", void 0),
                    Ue(this, "_speed", void 0),
                    Ue(this, "_drift", void 0),
                    Ue(this, "_zoomData", void 0),
                    Ue(this, "_interval", void 0),
                    Ue(this, "_camera", void 0),
                    Ue(this, "_renderer", void 0),
                    Ue(this, "_copyNode", void 0),
                    Ue(this, "_navigation", void 0),
                    Ue(this, "_binds", void 0),
                    Ue(this, "_signals", void 0),
                    Ue(this, "_resizeObserver", void 0),
                    Ue(this, "_enableEvents", void 0),
                    (this._node = t),
                    this._node.classList.add("panorama"),
                    (this._options = ke(
                        {
                            url: e,
                            blend: 500,
                            nav: !0,
                            static: !1,
                            fov: 0.4 * Math.PI,
                            observeResize: !0,
                            resizeTimeout: 100,
                            fovRange: [Math.PI / 20, Math.PI / 2],
                            pitchRange: [0.3 * -Math.PI, 0.1 * Math.PI],
                            keyboardSpeed: Math.PI / 2,
                            webFlag: !1,
                            minDriftSpeed: 10,
                            maxDriftSpeed: 80,
                            driftSlowdown: 0.9,
                            fovInc: 0.1,
                            zoomDelay: 75,
                            zoomSlowdown: 0.85,
                            gigaMaxFovConst: 0.4,
                            onSignal: () => {},
                            lang: a[0],
                        },
                        i
                    )),
                    -1 === a.indexOf(this._options.lang) && (this._options.lang = a[0]),
                    (this._raf = null),
                    (this._raf2 = null),
                    (this._place = null),
                    (this._event = { x: 0, y: 0 }),
                    -1 !== navigator.userAgent.toLowerCase().indexOf("macintosh") && (this._options.fovInc /= 8),
                    (this._neighborsRequest = null),
                    (this._timeline = null),
                    (this._lastEvents = []),
                    (this._lastTimestamp = 0),
                    (this._speed = []),
                    (this._drift = { speed: 0, direction: 0, moved: 0 }),
                    (this._zoomData = { ts: 0, event: null, delta: 0 }),
                    (this._interval = null),
                    (this._camera = { yaw: 0, pitch: 0, fov: this._options.fov }),
                    (this._binds = { zoomStep: this._zoomStep.bind(this), driftStep: this._driftStep.bind(this) }),
                    !(function () {
                        const t = document.createElement("canvas");
                        try {
                            return P(t), !0;
                        } catch (t) {
                            return !1;
                        }
                    })())
                )
                    return void (this._node.innerHTML = $(this._options.lang, "panoUnsupported"));
                (this._renderer = new Xt(this, { contextLost: $(this._options.lang, "pano.contextRestore"), restore: $(this._options.lang, "pano.restoreBtn") })),
                    (this._signals = [this._options.onSignal]),
                    (this._resizeObserver = null),
                    (this._enableEvents = !0),
                    (this._loader = null),
                    (this._copyNode = document.createElement("span")),
                    this._copyNode.classList.add("copyright"),
                    this._node.appendChild(this._copyNode);
                const n = document.createElement("span"),
                    r = document.createElement("a"),
                    s = new Image();
                if (
                    ((r.href = "#"),
                    (r.target = "_blank"),
                    n.classList.add("pano-logo"),
                    (s.src = Ft),
                    r.append(s),
                    r.addEventListener("pointerdown", () => {
                        this._setMapyczLink(this._place);
                    }),
                    n.append(r),
                    this._node.append(n),
                    (this._logoLink = r),
                    this._options.static ||
                        (this._node.addEventListener("mousedown", this, !1),
                        this._node.addEventListener("touchstart", this, !1),
                        this._node.addEventListener("wheel", this, { passive: !1 }),
                        this._node.addEventListener("mousewheel", this, !1),
                        this._node.addEventListener("gesturechange", this, !1),
                        this._node.addEventListener("contextmenu", this, !1),
                        window.addEventListener("keydown", this, !1)),
                    (this._navigation = null),
                    this._options.nav && (this._navigation = new ve(this)),
                    this._options.observeResize && window.ResizeObserver)
                ) {
                    let t = null;
                    (this._resizeObserver = new ResizeObserver(() => {
                        t && (clearTimeout(t), (t = null)),
                            (t = setTimeout(() => {
                                (t = null), this.syncPort();
                            }, this._options.resizeTimeout));
                    })),
                        this._resizeObserver.observe(this._node);
                }
            }
            destroy() {
                this._stopStep(),
                    this._stopDrift(),
                    this._resizeObserver && (this._resizeObserver.unobserve(this._node), (this._resizeObserver = null)),
                    this._navigation && (this._navigation.destroy(), (this._navigation = null)),
                    this._renderer && (this._renderer.destroy(), (this._renderer = null)),
                    this._node.removeEventListener("mousedown", this, !1),
                    this._node.removeEventListener("touchstart", this, !1),
                    this._node.removeEventListener("wheel", this, !1),
                    this._node.removeEventListener("mousewheel", this, !1),
                    this._node.removeEventListener("gesturechange", this, !1),
                    this._node.removeEventListener("keydown", this, !1),
                    this._node.removeEventListener("contextmenu", this, !1),
                    (this._node.innerHTML = "");
            }
            addTimeline(t, e) {
                return (this._timeline = new Mt(this, t, e, { newest: $(this._options.lang, "newest"), notAvail: $(this._options.lang, "pano.notAvail") })), this._timeline.setPlace(this._place), this._timeline;
            }
            setEvents(t) {
                this._enableEvents = t;
            }
            addListener(t) {
                this._signals.push(t);
            }
            removeListener(t) {
                const e = this._signals.indexOf(t);
                -1 !== e && this._signals.splice(e, 1);
            }
            getNavigation() {
                return this._navigation;
            }
            removeNavigation() {
                this._navigation && (this._navigation.destroy(), (this._navigation = null), this.redraw());
            }
            addLoader() {
                this._node && ((this._loader = document.createElement("div")), this._loader.classList.add("panorama-loader"), this._node.append(this._loader));
            }
            removeLoader() {
                this._loader && (this._loader.remove(), (this._loader = null));
            }
            looseContext() {
                this._renderer && this._renderer.lostContext();
            }
            restoreContext() {
                this._renderer && this._renderer.restoreContext();
            }
            makeEvent(t, e) {
                this._signals.forEach((i) => i(t, e));
            }
            getTimeline() {
                return this._timeline;
            }
            getPlaceInfo() {
                if (this._place) {
                    const t = this._place.getData(),
                        e = [];
                    if (t.extra.tileNumX && t.extra.tileNumY)
                        for (let i = 0, n = t.extra.tileNumX.length; i < n; i++) {
                            const n = t.extra.tileNumX[i],
                                r = t.extra.tileNumY[i];
                            e.push({ zoom: i, width: n, height: r, count: n * r });
                        }
                    else e.push({ zoom: 0, width: t.tileNumX, height: t.tileNumY, count: t.tileNumX * t.tileNumY });
                    return { tilesCount: e, tilesLoaded: this._place.getLoadedImgsCount() };
                }
                return null;
            }
            async show(t, i) {
                const n = { changed: !1, error: !1 },
                    r = ke({ blend: !1, yaw: "auto", fov: "auto", pitch: "auto", year: 0 }, i);
                if ((!this._renderer || (this._place && t.getID() === this._place.getID())) && !r.forceShow) return n;
                this._place && this.isKeyDown() && this._place.clearImages(), this._place || null !== r.yaw || (r.yaw = "auto");
                const a = t.getDefaultView();
                if (null === r.yaw) r.yaw = this._camera.yaw;
                else if ("auto" === r.yaw) {
                    let e = 0;
                    (e = a ? a.yaw : null === t.getLookDir() ? t.getDefaultDirection() : t.getLookDir()), (r.yaw = (e * Math.PI) / 180);
                } else "point" === r.yaw && (r.yaw = (t.optData.lookDir * Math.PI) / 180);
                (null !== r.fov && "auto" !== r.fov) || (r.fov = "auto" === r.fov && a ? a.fov : this._camera.fov),
                    (null !== r.pitch && "auto" !== r.pitch) || (r.pitch = "auto" === r.pitch && a ? a.pitch : this._camera.pitch),
                    r.year && this._timeline && this._timeline.setYear(r.year),
                    (this._place = t),
                    this._setMapyczLink(t);
                const s = this._place.getProvider();
                switch (s) {
                    case f.GIGAPANORAMA: {
                        const t = this._place.getMaxZoom();
                        this._options.fovRange[0] = (this._options.gigaMaxFovConst * Math.PI) / Math.pow(2, t);
                        break;
                    }
                    case f.CYCLOMEDIA:
                        this._options.pitchRange[1] = Math.PI / 3;
                }
                const h = this._place.getDate() || new Date();
                let u = "";
                try {
                    u = new Intl.DateTimeFormat("cs-CZ", { year: "numeric", month: "numeric", day: "numeric" }).format(h);
                } catch (t) {
                    console.log(t), (u = `${h.getDate()}. ${h.getMonth() + 1}. ${h.getFullYear()}`);
                }
                if (((this._copyNode.innerHTML = `${o[s] || ""}<span class='date'> | ${u}</span>`), this._neighborsRequest && (this._neighborsRequest.abort(), (this._neighborsRequest = null)), this._navigation)) {
                    this._navigation.invalidate();
                    const i = t.getId();
                    if (i) {
                        const n = this._timeline ? this._timeline.getYear() : 0;
                        (this._neighborsRequest = (function (t) {
                            let { pid: i = 0, url: n = e, apiKey: r = "", webFlag: a = 0, year: s = 0 } = t;
                            const o = l.neighbors[s] || {};
                            if (i in o) {
                                const t = _t(i, o[i], s);
                                return { promise: Promise.resolve(t), abort: () => {} };
                            }
                            const h = V(`${n}getneighbours?pid=${i}&force=${a}`, {}, { apiKey: r });
                            return {
                                promise: new Promise((t, e) => {
                                    h.promise.then(
                                        (e) => {
                                            const n = _t(i, e.neighbours, s);
                                            t(n);
                                        },
                                        (t) => e(t)
                                    );
                                }),
                                abort: h.abort,
                            };
                        })({ pid: i, url: this._options.url, apiKey: this._options.apiKey, webFlag: this._options.webFlag ? 1 : 0, year: n })),
                            this._neighborsRequest.promise.then((e) => {
                                this._navigation && this._navigation.update(t, e), (this._neighborsRequest = null);
                            });
                    }
                }
                const c = t.getCoords();
                t.setScene(this), this.makeEvent("marker-set-coords", { lon: c[0], lat: c[1] }), this.makeEvent("pano-change", { camera: this.getCamera() }), this.makeEvent("pano-place", { place: t });
                try {
                    await this._renderer.setPlace(t, r), (n.changed = !0);
                } catch (t) {
                    console.log(t), (n.error = !0);
                }
                return this.removeLoader(), n;
            }
            getContainer() {
                return this._node;
            }
            getOptions() {
                return this._options;
            }
            getLang() {
                return this._options.lang;
            }
            getPlace() {
                return this._place;
            }
            getCamera() {
                return this._camera;
            }
            setCamera(t) {
                if (!this._place || !this._renderer) return this;
                this._camera = ke(ke({}, this._camera), t);
                const e = this._place.getPitchLimit();
                if (
                    ("fov" in t &&
                        ((this._camera.fov = Math.max(this._camera.fov, this._options.fovRange[0])),
                        (this._camera.fov = Math.min(this._camera.fov, this._options.fovRange[1])),
                        this._renderer.setFOV(this._camera.fov),
                        "auto" === e && -1 === [f.CYCLOMEDIA].indexOf(this._place.getProvider()) && this._fovToPitchRange()),
                    "pitch" in t || "yaw" in t)
                ) {
                    (this._camera.pitch = Math.max(this._camera.pitch, this._options.pitchRange[0])), (this._camera.pitch = Math.min(this._camera.pitch, "auto" === e ? this._options.pitchRange[1] : e));
                    const t = 2 * Math.PI;
                    (this._camera.yaw = this._camera.yaw % t), this._camera.yaw < 0 && (this._camera.yaw += t), this._updateMarker(), this._renderer.setRotation(this._camera.pitch, this._camera.yaw);
                }
                return this._navigation && this._navigation.updateCamera(), this.makeEvent("pano-change", { camera: this.getCamera() }), this;
            }
            getRenderer() {
                return this._renderer;
            }
            getSize() {
                return { width: this._node.offsetWidth, height: this._node.offsetHeight };
            }
            redraw(t) {
                const e = this.getRenderer();
                e && e.redraw(t);
            }
            isKeyDown() {
                return this._navigation && this._navigation.isKeyDown();
            }
            syncPort() {
                this._renderer.syncPort();
            }
            handleEvent(t) {
                if (this._enableEvents)
                    switch (t.type) {
                        case "keydown":
                            {
                                const e = t,
                                    i = e.target.nodeName.toLowerCase();
                                if (-1 !== ["input", "select", "option", "textarea"].indexOf(i)) return;
                                if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                                if (-1 === [37, 39, 65, 68].indexOf(e.keyCode)) break;
                                if ((t.preventDefault(), this._interval)) return;
                                const n = 37 === e.keyCode || 65 === e.keyCode ? -1 : 1;
                                (this._interval = setInterval(this._keyboardStep.bind(this, n), 30)), window.addEventListener("keyup", this, !1);
                            }
                            break;
                        case "keyup":
                            clearInterval(this._interval), (this._interval = null), window.removeEventListener("keyup", this, !1);
                            break;
                        case "touchstart": {
                            const e = t;
                            if (e.touches.length > 1) return;
                            (e.clientX = e.touches[0].clientX), (e.clientY = e.touches[0].clientY);
                        }
                        case "mousedown":
                            {
                                const e = t;
                                "mousedown" === t.type && t.preventDefault(),
                                    window.addEventListener("mousemove", this, !1),
                                    window.addEventListener("mouseup", this, !1),
                                    window.addEventListener("touchmove", this, !1),
                                    window.addEventListener("touchend", this, !1),
                                    (this._event.x = e.clientX),
                                    (this._event.y = e.clientY),
                                    this._drift.speed && this._stopDrift(),
                                    this._lastEvents.push({ x: e.clientX, y: e.clientY }),
                                    (this._lastTimestamp = Date.now());
                            }
                            break;
                        case "touchmove": {
                            const e = t;
                            if (e.touches.length > 1) return;
                            (e.clientX = e.touches[0].clientX), (e.clientY = e.touches[0].clientY);
                        }
                        case "mousemove":
                            {
                                const e = t,
                                    i = e.clientX - this._event.x,
                                    n = e.clientY - this._event.y;
                                if (!i && !n) return;
                                (this._event.x = e.clientX), (this._event.y = e.clientY);
                                const r = this.getSize().height,
                                    a = this._camera.pitch - (this._camera.fov * n) / r,
                                    s = this._camera.yaw - (this._camera.fov * i) / r,
                                    o = Date.now(),
                                    h = Math.sqrt(i * i + n * n) / (o - this._lastTimestamp);
                                Math.abs(h) === 1 / 0 || isNaN(h) || this._speed.push(h),
                                    this._lastEvents.push({ x: e.clientX, y: e.clientY }),
                                    this._lastEvents.length > 3 && this._lastEvents.shift(),
                                    this._speed.length > 2 && this._speed.shift(),
                                    (this._lastTimestamp = o),
                                    this.setCamera({ pitch: a, yaw: s });
                            }
                            break;
                        case "touchend":
                            if (t.touches.length > 1) return;
                        case "mouseup":
                            window.removeEventListener("mousemove", this, !1),
                                window.removeEventListener("mouseup", this, !1),
                                window.removeEventListener("touchmove", this, !1),
                                window.removeEventListener("touchend", this, !1),
                                this._speed.length && !this._drift.speed && this._startDrift();
                            break;
                        case "wheel":
                        case "mousewheel":
                        case "gesturechange":
                            {
                                t.preventDefault();
                                const e = t;
                                let i = 1;
                                e.wheelDelta && e.wheelDelta < 0 && (i = -1), e.deltaY && e.deltaY > 0 && (i = -1);
                                const n = "scale" in e ? e.scale - 1 : i,
                                    r = this._camera.fov * this._options.fovInc,
                                    a = { fov: this._camera.fov + r * -n };
                                "clientX" in t && this._adjustFOVrotation(t, a),
                                    a.fov !== this._camera.fov && this.setCamera(a),
                                    (this._zoomData.event = t),
                                    (this._zoomData.delta = n),
                                    (this._zoomData.ts = Date.now() + this._options.zoomDelay),
                                    (this._raf = requestAnimationFrame(this._binds.zoomStep));
                            }
                            break;
                        case "contextmenu":
                            t.preventDefault();
                    }
            }
            _adjustFOVrotation(t, e) {
                let i = e.fov;
                (i = Math.max(i, this._options.fovRange[0])), (i = Math.min(i, this._options.fovRange[1]));
                const n = this._camera.fov - i,
                    r = this._renderer.getCanvas().getBoundingClientRect(),
                    a = J(this, t.clientX - r.left, t.clientY - r.top),
                    s = H(a.yaw, this._camera.yaw),
                    o = H(a.pitch, this._camera.pitch),
                    h = (n * s) / this._camera.fov,
                    l = (n * o) / this._camera.fov;
                (e.fov = i), (e.yaw = this._camera.yaw + h), (e.pitch = this._camera.pitch + l);
            }
            _updateMarker() {
                const t = (180 * this._camera.yaw) / Math.PI;
                this.makeEvent("marker-set-angle", { angle: t });
            }
            _keyboardStep(t) {
                const e = (t * this._options.keyboardSpeed * 30) / 1e3,
                    i = this._camera.yaw + e;
                this.setCamera({ yaw: i });
            }
            _fovToPitchRange() {
                const t = Math.max(0.1 * Math.PI, this._options.fov - this._camera.fov);
                (this._options.pitchRange[1] = t / 2), (this._camera.pitch = Math.min(this._camera.pitch, this._options.pitchRange[1])), this._renderer.setRotation(this._camera.pitch, this._camera.yaw);
            }
            _startDrift() {
                let t = 0;
                if (this._speed.length < 2) return;
                for (let e = 0; e < this._speed.length; e++) t += this._speed[e];
                const e = (20 * t) / this._speed.length;
                if (((this._speed = []), e < this._options.minDriftSpeed)) return;
                (this._drift.speed = Math.min(e, this._options.maxDriftSpeed)), (this._drift.moved = 0);
                const i = this._lastEvents.pop(),
                    n = this._lastEvents.pop(),
                    r = i.x - n.x,
                    a = i.y - n.y;
                (this._drift.direction = Math.atan2(a, r)), (this._raf2 = requestAnimationFrame(this._binds.driftStep));
            }
            _driftStep() {
                if (!this._renderer) return;
                this._drift.speed *= this._options.driftSlowdown;
                const t = Math.round(this._drift.speed * Math.cos(this._drift.direction)),
                    e = Math.round(this._drift.speed * Math.sin(this._drift.direction));
                this._drift.moved += Math.sqrt(t * t + e * e);
                const i = this.getSize().height,
                    n = this._camera.pitch - (this._camera.fov * e) / i,
                    r = this._camera.yaw - (this._camera.fov * t) / i;
                this.setCamera({ pitch: n, yaw: r }), this._drift.speed <= 0.2 ? this._stopDrift() : requestAnimationFrame(this._binds.driftStep);
            }
            _stopDrift() {
                (this._drift.speed = 0), this._raf2 && cancelAnimationFrame(this._raf2), (this._raf2 = null);
            }
            _zoomStep() {
                if (Math.abs(this._zoomData.delta) <= 0.2) return;
                if (this._zoomData.ts - Date.now() > 0) {
                    this._zoomData.delta *= this._options.zoomSlowdown;
                    const t = this._zoomData.delta,
                        e = this._camera.fov * this._options.fovInc,
                        i = { fov: this._camera.fov + e * -t };
                    "clientX" in this._zoomData.event && this._adjustFOVrotation(this._zoomData.event, i), i.fov !== this._camera.fov && (this.setCamera(i), requestAnimationFrame(this._binds.zoomStep));
                } else this._stopStep();
            }
            _stopStep() {
                this._raf && cancelAnimationFrame(this._raf), (this._raf = null);
            }
            _setMapyczLink(t) {
                const e = t.getData();
                this._logoLink.href = (function (t) {
                    const e = new URL("https://mapy.cz");
                    return (
                        e.searchParams.append("x", t.lon.toString()),
                        e.searchParams.append("y", t.lat.toString()),
                        e.searchParams.append("z", "17"),
                        e.searchParams.append("yaw", t.camera.yaw.toString()),
                        e.searchParams.append("pitch", t.camera.pitch.toString()),
                        e.searchParams.append("fov", t.camera.fov.toString()),
                        e.searchParams.append("pid", t.pid.toString()),
                        e.searchParams.append("panorama", "1"),
                        e.toString()
                    );
                })({ lon: e.mark.lon, lat: e.mark.lat, pid: e.pid, camera: this._camera });
            }
        }
        function Ye(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e &&
                    (n = n.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    i.push.apply(i, n);
            }
            return i;
        }
        function Be(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? Ye(Object(i), !0).forEach(function (e) {
                          Fe(t, e, i[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
                    : Ye(Object(i)).forEach(function (e) {
                          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
                      });
            }
            return t;
        }
        function Fe(t, e, i) {
            return (
                (e = (function (t) {
                    var e = (function (t, e) {
                        if ("object" != typeof t || null === t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return ("string" === e ? String : Number)(t);
                    })(t, "string");
                    return "symbol" == typeof e ? e : String(e);
                })(e)) in t
                    ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = i),
                t
            );
        }
        function Qe(t, e) {
            if (e) {
                const i = document.createElement("span");
                (i.style.position = "absolute"),
                    (i.style.fontSize = "16px"),
                    (i.style.lineHeight = "20px"),
                    (i.style.left = "5%"),
                    (i.style.right = "5%"),
                    (i.style.top = "50%"),
                    (i.style.textAlign = "center"),
                    (i.style.transform = "translateY(-50%)"),
                    (i.textContent = t),
                    e.append(i);
            }
        }
        function Ze(t) {
            const e = [];
            let i = { yaw: -1, pitch: -1, fov: -1 };
            function n(t, i) {
                e.forEach((e) => {
                    e.name === t && e.callback(i);
                });
            }
            return (
                t.addListener((t, r) => {
                    if (0 !== e.length)
                        if ("pano-change" === t) {
                            const t = r.camera;
                            (t.yaw === i.yaw && t.pitch === i.pitch && t.fov === i.fov) || (n("pano-view", Be(Be({}, t), {}, { angle: (180 * t.yaw) / Math.PI })), (i = Be({}, t)));
                        } else if ("pano-place" === t) {
                            n("pano-place", { info: r.place.getMeta() }), (i.yaw = -1), (i.pitch = -1), (i.fov = -1);
                        }
                }),
                {
                    addListener: (t, i) => {
                        e.push({ name: t, callback: i });
                    },
                    removeListener: (t, i) => {
                        const n = e.findIndex((e) => e.name === t && e.callback === i);
                        -1 !== n && e.splice(n, 1);
                    },
                    getCamera: () => t.getCamera(),
                    setCamera: (e) => t.setCamera(e),
                    destroy: () => {
                        t.destroy();
                    },
                }
            );
        }
        async function Ve(t, i) {
            const n = new Re(i.parent, Be({ url: e, apiKey: i.apiKey, lang: i.lang, nav: i.showNavigation }, "number" == typeof i.resizeTimeout ? { observeResize: i.resizeTimeout > 0, resizeTimeout: i.resizeTimeout } : {})),
                a = Be(Be({}, Ze(n)), {}, { info: null, error: "", errorCode: "NONE" }),
                s = !0 !== i.hideErrors;
            if (i.apiKey)
                try {
                    n.addLoader();
                    let o = null;
                    switch (t) {
                        case "from-positon": {
                            const t = i,
                                n = t.radius || r;
                            o = await gt({ lon: t.lon, lat: t.lat, radius: n, url: e, apiKey: i.apiKey });
                            break;
                        }
                        case "from-pid": {
                            const t = i;
                            o = await pt({ pid: t.pid || 0, url: e, apiKey: i.apiKey });
                            break;
                        }
                        default:
                            return n.removeLoader(), (a.error = "Unknown type!"), (a.errorCode = "PANORAMA_NOT_FOUND"), s && Qe(a.error, i.parent), a;
                    }
                    (await n.show(o, { yaw: i.yaw ?? "auto" })).error
                        ? ((a.error = $(i.lang, "pano.error.wrongApiKey2")), (a.errorCode = "WRONG_API_KEY"), n.removeNavigation())
                        : (n.setCamera(Be(Be({}, "number" == typeof i.pitch ? { pitch: i.pitch } : {}), "number" == typeof i.fov ? { fov: i.fov } : {})),
                          (document.onvisibilitychange = () => {
                              n.restoreContext();
                          }),
                          (a.info = o.getMeta()));
                } catch (e) {
                    let s = "",
                        o = "PANORAMA_NOT_FOUND";
                    const h = e?.status || 0;
                    if (401 === h || 403 === h) (s = $(i.lang, "pano.error.wrongApiKey2")), (o = "WRONG_API_KEY");
                    else if ("from-positon" === t) {
                        const t = i,
                            e = t.radius || r;
                        s = $(i.lang, "pano.error.getBest").replace("{lon}", t.lon).replace("{lat}", t.lat).replace("{radius}", e);
                    } else if ("from-pid" === t) {
                        const t = i;
                        s = $(i.lang, "pano.error.getDetail").replace("{pid}", t.pid);
                    }
                    n.removeLoader(), (a.error = s), (a.errorCode = o);
                }
            else (a.error = $(i.lang, "pano.error.missingApiKey")), (a.errorCode = "MISSING_API_KEY");
            return s && a.error && Qe(a.error, i.parent), a;
        }
        async function Xe(t) {
            const i = new Re(t.parent, { url: e, nav: !1 }),
                n = Ze(i),
                r = ct(t.image);
            return (
                await i.show(r, { yaw: t.yaw ?? "auto" }),
                i.setCamera(Be(Be({}, "number" == typeof t.pitch ? { pitch: t.pitch } : {}), "number" == typeof t.fov ? { fov: t.fov } : {})),
                (document.onvisibilitychange = () => {
                    i.restoreContext();
                }),
                Be(
                    Be({}, n),
                    {},
                    {
                        setImage: (t) => {
                            const e = ct(t);
                            i.show(e);
                        },
                    }
                )
            );
        }
        async function We(t) {
            let i = { info: null, exists: !1 };
            try {
                const n = t.radius || r;
                return (i = { info: (await gt({ lon: t.lon, lat: t.lat, radius: n, url: e, apiKey: t.apiKey })).getMeta(), exists: !0 }), i;
            } catch (t) {}
            return i;
        }
        function He(t) {
            return Ve("from-positon", t);
        }
        function Ke(t) {
            return Ve("from-pid", t);
        }
        function Ge(t) {
            return Xe(t);
        }
    })(),
        (window.Panorama = n);
})();
