'use strict'
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
;(() => {
    var exports = {}
    exports.id = 'pages/_app'
    exports.ids = ['pages/_app']
    exports.modules = {
        /***/ './api/build-client.js':
            /*!*****************************!*\
  !*** ./api/build-client.js ***!
  \*****************************/
            /***/ (module, __webpack_exports__, __webpack_require__) => {
                eval(
                    '__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ req })=>{\n    if (true) {\n        // We are on the server\n        // TODO: get url name then remove the bottom create method and add it to the baseURL field\n        // return axios.create({\n        //     baseURL:\n        //         \'\',\n        //     headers: req.headers,\n        // });\n        return axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({\n            baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",\n            headers: req.headers\n        });\n    } else {}\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcGkvYnVpbGQtY2xpZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTBCO0FBRTFCLGlFQUFlLENBQUMsRUFBRUMsR0FBRyxFQUFFO0lBQ25CLElBQUksSUFBa0IsRUFBYTtRQUMvQix1QkFBdUI7UUFDdkIsMEZBQTBGO1FBQzFGLHdCQUF3QjtRQUN4QixlQUFlO1FBQ2YsY0FBYztRQUNkLDRCQUE0QjtRQUM1QixNQUFNO1FBRU4sT0FBT0Qsb0RBQVksQ0FBQztZQUNoQkcsU0FDSTtZQUNKQyxTQUFTSCxJQUFJRyxPQUFPO1FBQ3hCO0lBQ0osT0FBTyxFQUtOO0FBQ0wsR0FBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL2FwaS9idWlsZC1jbGllbnQuanM/YzZmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgZGVmYXVsdCAoeyByZXEgfSkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBXZSBhcmUgb24gdGhlIHNlcnZlclxuICAgICAgICAvLyBUT0RPOiBnZXQgdXJsIG5hbWUgdGhlbiByZW1vdmUgdGhlIGJvdHRvbSBjcmVhdGUgbWV0aG9kIGFuZCBhZGQgaXQgdG8gdGhlIGJhc2VVUkwgZmllbGRcbiAgICAgICAgLy8gcmV0dXJuIGF4aW9zLmNyZWF0ZSh7XG4gICAgICAgIC8vICAgICBiYXNlVVJMOlxuICAgICAgICAvLyAgICAgICAgICcnLFxuICAgICAgICAvLyAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMsXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xuICAgICAgICAgICAgYmFzZVVSTDpcbiAgICAgICAgICAgICAgICAnaHR0cDovL2luZ3Jlc3MtbmdpbngtY29udHJvbGxlci5pbmdyZXNzLW5naW54LnN2Yy5jbHVzdGVyLmxvY2FsJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLFxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBtdXN0IGJlIG9uIHRoZSBicm93c2VyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xuICAgICAgICAgICAgYmFzZVVybDogJy8nLFxuICAgICAgICB9KTtcbiAgICB9XG59O1xuIl0sIm5hbWVzIjpbImF4aW9zIiwicmVxIiwiY3JlYXRlIiwiYmFzZVVSTCIsImhlYWRlcnMiLCJiYXNlVXJsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./api/build-client.js\n'
                )

                /***/
            },

        /***/ './components/header.js':
            /*!******************************!*\
  !*** ./components/header.js ***!
  \******************************/
            /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ currentUser })=>{\n    const links = [\n        !currentUser && {\n            label: "Sign Up",\n            href: "/auth/signup"\n        },\n        !currentUser && {\n            label: "Sign In",\n            href: "/auth/signin"\n        },\n        currentUser && {\n            label: "Add Item",\n            href: "/items/new"\n        },\n        currentUser && {\n            label: "My Orders",\n            href: "/orders"\n        },\n        currentUser && {\n            label: "Sign Out",\n            href: "/auth/signout"\n        }\n    ].filter((linkConfig)=>linkConfig).map(({ label, href })=>{\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {\n            className: "nav-item",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                className: "nav-link",\n                href: href,\n                children: label\n            }, void 0, false, {\n                fileName: "/mnt/c/Users/Flavio/Documents/Webstorm_Projects/orion-webapp/client/components/header.js",\n                lineNumber: 14,\n                columnNumber: 17\n            }, undefined)\n        }, href, false, {\n            fileName: "/mnt/c/Users/Flavio/Documents/Webstorm_Projects/orion-webapp/client/components/header.js",\n            lineNumber: 13,\n            columnNumber: 20\n        }, undefined);\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("nav", {\n        className: "navbar navbar-light bg-light",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                href: "/",\n                className: "navbar-brand",\n                children: " App Name"\n            }, void 0, false, {\n                fileName: "/mnt/c/Users/Flavio/Documents/Webstorm_Projects/orion-webapp/client/components/header.js",\n                lineNumber: 21,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                className: "d-flex justify-content-end",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {\n                    className: "nav d-flex align-items-center",\n                    children: links\n                }, void 0, false, {\n                    fileName: "/mnt/c/Users/Flavio/Documents/Webstorm_Projects/orion-webapp/client/components/header.js",\n                    lineNumber: 23,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: "/mnt/c/Users/Flavio/Documents/Webstorm_Projects/orion-webapp/client/components/header.js",\n                lineNumber: 22,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: "/mnt/c/Users/Flavio/Documents/Webstorm_Projects/orion-webapp/client/components/header.js",\n        lineNumber: 20,\n        columnNumber: 9\n    }, undefined);\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2hlYWRlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBNEI7QUFFNUIsaUVBQWUsQ0FBQyxFQUFDQyxXQUFXLEVBQUM7SUFDekIsTUFBTUMsUUFBUTtRQUNWLENBQUNELGVBQWU7WUFBRUUsT0FBTztZQUFXQyxNQUFNO1FBQWU7UUFDekQsQ0FBQ0gsZUFBZTtZQUFFRSxPQUFPO1lBQVdDLE1BQU07UUFBZTtRQUN6REgsZUFBZTtZQUFFRSxPQUFPO1lBQVlDLE1BQU07UUFBYTtRQUN2REgsZUFBZTtZQUFFRSxPQUFPO1lBQWFDLE1BQU07UUFBVTtRQUNyREgsZUFBZTtZQUFFRSxPQUFPO1lBQVlDLE1BQU07UUFBZ0I7S0FDN0QsQ0FDSUMsTUFBTSxDQUFDQyxDQUFBQSxhQUFjQSxZQUNyQkMsR0FBRyxDQUFDLENBQUMsRUFBQ0osS0FBSyxFQUFFQyxJQUFJLEVBQUM7UUFDZixxQkFBTyw4REFBQ0k7WUFBY0MsV0FBVztzQkFDN0IsNEVBQUNULGtEQUFJQTtnQkFBQ1MsV0FBVztnQkFBWUwsTUFBTUE7MEJBQzlCRDs7Ozs7O1dBRk9DOzs7OztJQUtwQjtJQUNKLHFCQUNJLDhEQUFDTTtRQUFJRCxXQUFXOzswQkFDWiw4REFBQ1Qsa0RBQUlBO2dCQUFDSSxNQUFLO2dCQUFJSyxXQUFXOzBCQUFnQjs7Ozs7OzBCQUMxQyw4REFBQ0U7Z0JBQUlGLFdBQVc7MEJBQ1osNEVBQUNHO29CQUFHSCxXQUFXOzhCQUNWUDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNckIsR0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL2NvbXBvbmVudHMvaGVhZGVyLmpzP2MwOTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuXG5leHBvcnQgZGVmYXVsdCAoe2N1cnJlbnRVc2VyfSkgPT4ge1xuICAgIGNvbnN0IGxpbmtzID0gW1xuICAgICAgICAhY3VycmVudFVzZXIgJiYgeyBsYWJlbDogJ1NpZ24gVXAnLCBocmVmOiAnL2F1dGgvc2lnbnVwJyB9LFxuICAgICAgICAhY3VycmVudFVzZXIgJiYgeyBsYWJlbDogJ1NpZ24gSW4nLCBocmVmOiAnL2F1dGgvc2lnbmluJyB9LFxuICAgICAgICBjdXJyZW50VXNlciAmJiB7IGxhYmVsOiAnQWRkIEl0ZW0nLCBocmVmOiAnL2l0ZW1zL25ldycgfSxcbiAgICAgICAgY3VycmVudFVzZXIgJiYgeyBsYWJlbDogJ015IE9yZGVycycsIGhyZWY6ICcvb3JkZXJzJyB9LFxuICAgICAgICBjdXJyZW50VXNlciAmJiB7IGxhYmVsOiAnU2lnbiBPdXQnLCBocmVmOiAnL2F1dGgvc2lnbm91dCcgfSxcbiAgICBdXG4gICAgICAgIC5maWx0ZXIobGlua0NvbmZpZyA9PiBsaW5rQ29uZmlnKVxuICAgICAgICAubWFwKCh7bGFiZWwsIGhyZWZ9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aHJlZn0gY2xhc3NOYW1lPXsnbmF2LWl0ZW0nfT5cbiAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9eyduYXYtbGluayd9IGhyZWY9e2hyZWZ9PlxuICAgICAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgfSlcbiAgICByZXR1cm4gKFxuICAgICAgICA8bmF2IGNsYXNzTmFtZT17J25hdmJhciBuYXZiYXItbGlnaHQgYmctbGlnaHQnfT5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9Jy8nIGNsYXNzTmFtZT17J25hdmJhci1icmFuZCd9PiBBcHAgTmFtZTwvTGluaz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnZC1mbGV4IGp1c3RpZnktY29udGVudC1lbmQnfT5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXsnbmF2IGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXInfT5cbiAgICAgICAgICAgICAgICAgICAge2xpbmtzfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L25hdj5cbiAgICApXG59XG5cbiJdLCJuYW1lcyI6WyJMaW5rIiwiY3VycmVudFVzZXIiLCJsaW5rcyIsImxhYmVsIiwiaHJlZiIsImZpbHRlciIsImxpbmtDb25maWciLCJtYXAiLCJsaSIsImNsYXNzTmFtZSIsIm5hdiIsImRpdiIsInVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/header.js\n'
                )

                /***/
            },

        /***/ './pages/_app.js':
            /*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
            /***/ (module, __webpack_exports__, __webpack_require__) => {
                eval(
                    '__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _api_build_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/build-client */ "./api/build-client.js");\n/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/header */ "./components/header.js");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_build_client__WEBPACK_IMPORTED_MODULE_2__]);\n_api_build_client__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nconst AppComponent = ({ Component, pageProps, currentUser })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_header__WEBPACK_IMPORTED_MODULE_3__["default"], {\n                currentUser: currentUser\n            }, void 0, false, {\n                fileName: "/mnt/c/Users/Flavio/Documents/Webstorm_Projects/orion-webapp/client/pages/_app.js",\n                lineNumber: 8,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                className: "container",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    currentUser: currentUser,\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: "/mnt/c/Users/Flavio/Documents/Webstorm_Projects/orion-webapp/client/pages/_app.js",\n                    lineNumber: 10,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: "/mnt/c/Users/Flavio/Documents/Webstorm_Projects/orion-webapp/client/pages/_app.js",\n                lineNumber: 9,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: "/mnt/c/Users/Flavio/Documents/Webstorm_Projects/orion-webapp/client/pages/_app.js",\n        lineNumber: 7,\n        columnNumber: 9\n    }, undefined);\n};\nAppComponent.getInitialProps = async (appContext)=>{\n    const client = (0,_api_build_client__WEBPACK_IMPORTED_MODULE_2__["default"])(appContext.ctx);\n    const { data } = await client.get("/api/users/currentuser");\n    let pageProps = {};\n    if (appContext.Component.getInitialProps) {\n        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);\n    }\n    return {\n        pageProps,\n        ...data\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppComponent);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTBDO0FBQ0k7QUFDSjtBQUUxQyxNQUFNRSxlQUFlLENBQUMsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUVDLFdBQVcsRUFBRTtJQUN2RCxxQkFDSSw4REFBQ0M7OzBCQUNHLDhEQUFDTCwwREFBTUE7Z0JBQUNJLGFBQWFBOzs7Ozs7MEJBQ3JCLDhEQUFDQztnQkFBSUMsV0FBVTswQkFDWCw0RUFBQ0o7b0JBQVVFLGFBQWFBO29CQUFjLEdBQUdELFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSWxFO0FBRUFGLGFBQWFNLGVBQWUsR0FBRyxPQUFPQztJQUNsQyxNQUFNQyxTQUFTViw2REFBV0EsQ0FBQ1MsV0FBV0UsR0FBRztJQUN6QyxNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHLE1BQU1GLE9BQU9HLEdBQUcsQ0FBQztJQUVsQyxJQUFJVCxZQUFZLENBQUM7SUFDakIsSUFBSUssV0FBV04sU0FBUyxDQUFDSyxlQUFlLEVBQUU7UUFDdENKLFlBQVksTUFBTUssV0FBV04sU0FBUyxDQUFDSyxlQUFlLENBQ2xEQyxXQUFXRSxHQUFHLEVBQ2RELFFBQ0FFLEtBQUtQLFdBQVc7SUFFeEI7SUFFQSxPQUFPO1FBQ0hEO1FBQ0EsR0FBR1EsSUFBSTtJQUNYO0FBQ0o7QUFFQSxpRUFBZVYsWUFBWUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcbmltcG9ydCBidWlsZENsaWVudCBmcm9tICcuLi9hcGkvYnVpbGQtY2xpZW50JztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9oZWFkZXInO1xuXG5jb25zdCBBcHBDb21wb25lbnQgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcywgY3VycmVudFVzZXIgfSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8SGVhZGVyIGN1cnJlbnRVc2VyPXtjdXJyZW50VXNlcn0gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPENvbXBvbmVudCBjdXJyZW50VXNlcj17Y3VycmVudFVzZXJ9IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbkFwcENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoYXBwQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IGNsaWVudCA9IGJ1aWxkQ2xpZW50KGFwcENvbnRleHQuY3R4KTtcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGNsaWVudC5nZXQoJy9hcGkvdXNlcnMvY3VycmVudHVzZXInKTtcblxuICAgIGxldCBwYWdlUHJvcHMgPSB7fTtcbiAgICBpZiAoYXBwQ29udGV4dC5Db21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKSB7XG4gICAgICAgIHBhZ2VQcm9wcyA9IGF3YWl0IGFwcENvbnRleHQuQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyhcbiAgICAgICAgICAgIGFwcENvbnRleHQuY3R4LFxuICAgICAgICAgICAgY2xpZW50LFxuICAgICAgICAgICAgZGF0YS5jdXJyZW50VXNlclxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhZ2VQcm9wcyxcbiAgICAgICAgLi4uZGF0YSxcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwQ29tcG9uZW50O1xuIl0sIm5hbWVzIjpbImJ1aWxkQ2xpZW50IiwiSGVhZGVyIiwiQXBwQ29tcG9uZW50IiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiY3VycmVudFVzZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJnZXRJbml0aWFsUHJvcHMiLCJhcHBDb250ZXh0IiwiY2xpZW50IiwiY3R4IiwiZGF0YSIsImdldCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n'
                )

                /***/
            },

        /***/ 'next/dist/compiled/next-server/pages.runtime.dev.js':
            /*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
            /***/ (module) => {
                module.exports = require('next/dist/compiled/next-server/pages.runtime.dev.js')

                /***/
            },

        /***/ react:
            /*!************************!*\
  !*** external "react" ***!
  \************************/
            /***/ (module) => {
                module.exports = require('react')

                /***/
            },

        /***/ 'react/jsx-dev-runtime':
            /*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
            /***/ (module) => {
                module.exports = require('react/jsx-dev-runtime')

                /***/
            },

        /***/ axios:
            /*!************************!*\
  !*** external "axios" ***!
  \************************/
            /***/ (module) => {
                module.exports = import('axios')

                /***/
            },
    }
    // load runtime
    var __webpack_require__ = require('../webpack-runtime.js')
    __webpack_require__.C(exports)
    var __webpack_exec__ = (moduleId) => __webpack_require__((__webpack_require__.s = moduleId))
    var __webpack_exports__ = __webpack_require__.X(
        0,
        ['vendor-chunks/next', 'vendor-chunks/@swc', 'vendor-chunks/bootstrap'],
        () => __webpack_exec__('./pages/_app.js')
    )
    module.exports = __webpack_exports__
})()
