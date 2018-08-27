"use strict";var support={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};function isDataView(e){return e&&DataView.prototype.isPrototypeOf(e)}if(support.arrayBuffer)var viewClasses=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],isArrayBufferView=ArrayBuffer.isView||function(e){return e&&-1<viewClasses.indexOf(Object.prototype.toString.call(e))};function normalizeName(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function normalizeValue(e){return"string"!=typeof e&&(e=String(e)),e}function iteratorFor(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return support.iterable&&(e[Symbol.iterator]=function(){return e}),e}function Headers$1(t){this.map={},t instanceof Headers$1?t.forEach(function(e,t){this.append(t,e)},this):Array.isArray(t)?t.forEach(function(e){this.append(e[0],e[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function consumed(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function fileReaderReady(r){return new Promise(function(e,t){r.onload=function(){e(r.result)},r.onerror=function(){t(r.error)}})}function readBlobAsArrayBuffer(e){var t=new FileReader,r=fileReaderReady(t);return t.readAsArrayBuffer(e),r}function readBlobAsText(e){var t=new FileReader,r=fileReaderReady(t);return t.readAsText(e),r}function readArrayBufferAsText(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}function bufferClone(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function Body(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e)if("string"==typeof e)this._bodyText=e;else if(support.blob&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(support.formData&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(support.searchParams&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(support.arrayBuffer&&support.blob&&isDataView(e))this._bodyArrayBuffer=bufferClone(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!support.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(e)&&!isArrayBufferView(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=bufferClone(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):support.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},support.blob&&(this.blob=function(){var e=consumed(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?consumed(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(readBlobAsArrayBuffer)}),this.text=function(){var e=consumed(this);if(e)return e;if(this._bodyBlob)return readBlobAsText(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},support.formData&&(this.formData=function(){return this.text().then(decode)}),this.json=function(){return this.text().then(JSON.parse)},this}Headers$1.prototype.append=function(e,t){e=normalizeName(e),t=normalizeValue(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},Headers$1.prototype.delete=function(e){delete this.map[normalizeName(e)]},Headers$1.prototype.get=function(e){return e=normalizeName(e),this.has(e)?this.map[e]:null},Headers$1.prototype.has=function(e){return this.map.hasOwnProperty(normalizeName(e))},Headers$1.prototype.set=function(e,t){this.map[normalizeName(e)]=normalizeValue(t)},Headers$1.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},Headers$1.prototype.keys=function(){var r=[];return this.forEach(function(e,t){r.push(t)}),iteratorFor(r)},Headers$1.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),iteratorFor(t)},Headers$1.prototype.entries=function(){var r=[];return this.forEach(function(e,t){r.push([t,e])}),iteratorFor(r)},support.iterable&&(Headers$1.prototype[Symbol.iterator]=Headers$1.prototype.entries);var methods=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function normalizeMethod(e){var t=e.toUpperCase();return-1<methods.indexOf(t)?t:e}function Request$1(e,t){var r=(t=t||{}).body;if(e instanceof Request$1){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new Headers$1(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new Headers$1(t.headers)),this.method=normalizeMethod(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function decode(e){var o=new FormData;return e.trim().split("&").forEach(function(e){if(e){var t=e.split("="),r=t.shift().replace(/\+/g," "),n=t.join("=").replace(/\+/g," ");o.append(decodeURIComponent(r),decodeURIComponent(n))}}),o}function parseHeaders(e){var o=new Headers$1;return e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var t=e.split(":"),r=t.shift().trim();if(r){var n=t.join(":").trim();o.append(r,n)}}),o}function Response(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new Headers$1(t.headers),this.url=t.url||"",this._initBody(e)}Request$1.prototype.clone=function(){return new Request$1(this,{body:this._bodyInit})},Body.call(Request$1.prototype),Body.call(Response.prototype),Response.prototype.clone=function(){return new Response(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new Headers$1(this.headers),url:this.url})},Response.error=function(){var e=new Response(null,{status:0,statusText:""});return e.type="error",e};var redirectStatuses=[301,302,303,307,308];Response.redirect=function(e,t){if(-1===redirectStatuses.indexOf(t))throw new RangeError("Invalid status code");return new Response(null,{status:t,headers:{location:e}})};var DOMException=self.DOMException;try{new DOMException}catch(e){(DOMException=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack}).prototype=Object.create(Error.prototype),DOMException.prototype.constructor=DOMException}function fetch$1(i,a){return new Promise(function(r,e){var t=new Request$1(i,a);if(t.signal&&t.signal.aborted)return e(new DOMException("Aborted","AbortError"));var n=new XMLHttpRequest;function o(){n.abort()}n.onload=function(){var e={status:n.status,statusText:n.statusText,headers:parseHeaders(n.getAllResponseHeaders()||"")};e.url="responseURL"in n?n.responseURL:e.headers.get("X-Request-URL");var t="response"in n?n.response:n.responseText;r(new Response(t,e))},n.onerror=function(){e(new TypeError("Network request failed"))},n.ontimeout=function(){e(new TypeError("Network request failed"))},n.onabort=function(){e(new DOMException("Aborted","AbortError"))},n.open(t.method,t.url,!0),"include"===t.credentials?n.withCredentials=!0:"omit"===t.credentials&&(n.withCredentials=!1),"responseType"in n&&support.blob&&(n.responseType="blob"),t.headers.forEach(function(e,t){n.setRequestHeader(t,e)}),t.signal&&(t.signal.addEventListener("abort",o),n.onreadystatechange=function(){4===n.readyState&&t.signal.removeEventListener("abort",o)}),n.send(void 0===t._bodyInit?null:t._bodyInit)})}fetch$1.polyfill=!0,self.fetch||(self.fetch=fetch$1,self.Headers=Headers$1,self.Request=Request$1,self.Response=Response);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},jsx=function(){var l="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(e,t,r,n){var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&o)for(var a in o)void 0===t[a]&&(t[a]=o[a]);else t||(t=o||{});if(1===i)t.children=n;else if(1<i){for(var s=Array(i),u=0;u<i;u++)s[u]=arguments[u+3];t.children=s}return{$$typeof:l,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}}(),asyncIterator=function(e){if("function"==typeof Symbol){if(Symbol.asyncIterator){var t=e[Symbol.asyncIterator];if(null!=t)return t.call(e)}if(Symbol.iterator)return e[Symbol.iterator]()}throw new TypeError("Object is not async iterable")},asyncGenerator=function(){function l(e){this.value=e}function t(o){var i,a;function s(e,t){try{var r=o[e](t),n=r.value;n instanceof l?Promise.resolve(n.value).then(function(e){s("next",e)},function(e){s("throw",e)}):u(r.done?"return":"normal",r.value)}catch(e){u("throw",e)}}function u(e,t){switch(e){case"return":i.resolve({value:t,done:!0});break;case"throw":i.reject(t);break;default:i.resolve({value:t,done:!1})}(i=i.next)?s(i.key,i.arg):a=null}this._invoke=function(n,o){return new Promise(function(e,t){var r={key:n,arg:o,resolve:e,reject:t,next:null};a?a=a.next=r:(i=a=r,s(n,o))})},"function"!=typeof o.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(e){return this._invoke("next",e)},t.prototype.throw=function(e){return this._invoke("throw",e)},t.prototype.return=function(e){return this._invoke("return",e)},{wrap:function(e){return function(){return new t(e.apply(this,arguments))}},await:function(e){return new l(e)}}}(),asyncGeneratorDelegate=function(n,e){var t={},o=!1;function r(t,r){return o=!0,r=new Promise(function(e){e(n[t](r))}),{done:!1,value:e(r)}}return"function"==typeof Symbol&&Symbol.iterator&&(t[Symbol.iterator]=function(){return this}),t.next=function(e){return o?(o=!1,e):r("next",e)},"function"==typeof n.throw&&(t.throw=function(e){if(o)throw o=!1,e;return r("throw",e)}),"function"==typeof n.return&&(t.return=function(e){return r("return",e)}),t},asyncToGenerator=function(e){return function(){var s=e.apply(this,arguments);return new Promise(function(i,a){return function t(e,r){try{var n=s[e](r),o=n.value}catch(e){return void a(e)}if(!n.done)return Promise.resolve(o).then(function(e){t("next",e)},function(e){t("throw",e)});i(o)}("next")})}},classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},createClass=function(){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),defineEnumerableProperties=function(e,t){for(var r in t){var n=t[r];n.configurable=n.enumerable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,r,n)}return e},defaults=function(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e},defineProperty=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},get=function e(t,r,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,r);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,r,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0},inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},_instanceof=function(e,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?t[Symbol.hasInstance](e):e instanceof t},interopRequireDefault=function(e){return e&&e.__esModule?e:{default:e}},interopRequireWildcard=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},newArrowCheck=function(e,t){if(e!==t)throw new TypeError("Cannot instantiate an arrow function")},objectDestructuringEmpty=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")},objectWithoutProperties=function(e,t){var r={};for(var n in e)0<=t.indexOf(n)||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},selfGlobal="undefined"==typeof global?self:global,set=function e(t,r,n,o){var i=Object.getOwnPropertyDescriptor(t,r);if(void 0===i){var a=Object.getPrototypeOf(t);null!==a&&e(a,r,n,o)}else if("value"in i&&i.writable)i.value=n;else{var s=i.set;void 0!==s&&s.call(o,n)}return n},slicedToArray=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{!n&&s.return&&s.return()}finally{if(o)throw i}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},slicedToArrayLoose=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e)){for(var r,n=[],o=e[Symbol.iterator]();!(r=o.next()).done&&(n.push(r.value),!t||n.length!==t););return n}throw new TypeError("Invalid attempt to destructure non-iterable instance")},taggedTemplateLiteral=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))},taggedTemplateLiteralLoose=function(e,t){return e.raw=t,e},temporalRef=function(e,t,r){if(e===r)throw new ReferenceError(t+" is not defined - temporal dead zone");return e},temporalUndefined={},toArray=function(e){return Array.isArray(e)?e:Array.from(e)},toConsumableArray=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},babelHelpers=Object.freeze({jsx:jsx,asyncIterator:asyncIterator,asyncGenerator:asyncGenerator,asyncGeneratorDelegate:asyncGeneratorDelegate,asyncToGenerator:asyncToGenerator,classCallCheck:classCallCheck,createClass:createClass,defineEnumerableProperties:defineEnumerableProperties,defaults:defaults,defineProperty:defineProperty,get:get,inherits:inherits,interopRequireDefault:interopRequireDefault,interopRequireWildcard:interopRequireWildcard,newArrowCheck:newArrowCheck,objectDestructuringEmpty:objectDestructuringEmpty,objectWithoutProperties:objectWithoutProperties,possibleConstructorReturn:possibleConstructorReturn,selfGlobal:selfGlobal,set:set,slicedToArray:slicedToArray,slicedToArrayLoose:slicedToArrayLoose,taggedTemplateLiteral:taggedTemplateLiteral,taggedTemplateLiteralLoose:taggedTemplateLiteralLoose,temporalRef:temporalRef,temporalUndefined:temporalUndefined,toArray:toArray,toConsumableArray:toConsumableArray,typeof:_typeof,extends:_extends,instanceof:_instanceof}),globalHeaders={"Content-Type":"application/json"},globalOption={headers:new Headers(globalHeaders),mode:"same-origin",credentials:"include",cache:"reload",redirect:"follow",referrer:"client",timeout:3e4,fetchStart:function(e){return Promise.resolve(e)}},mergeOptions=function(){for(var e,t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];var o=(e=babelHelpers).extends.apply(e,[{}].concat(r)),i=_extends({},globalHeaders,o.headers),a=null;return(a=_extends({},globalOption,o)).headers=new Headers(i),{resultOptions:a,resultHealers:i}},setOptions=function(e){globalOption=mergeOptions(e).resultOptions,globalHeaders=mergeOptions(e).resultHealers},parseJSON=function(r){return r.text().then(function(t){try{return JSON.parse(t)}catch(e){throw new Error("JSON Parse Error: "+e+" "+r.url+" "+t.slice(0,500))}})},checkStatus=function(e){if(200<=e.status&&e.status<300||304==e.status)return e;throw new Error(e.url)},setGetURL=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if("[object Object]"!==Object.prototype.toString.call(t)||0===Object.keys(t).length)return e;var r=[];for(var n in t)r.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e+(-1===e.indexOf("?")?"?":"")+r.join("&")},getJSON=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=mergeOptions({method:"GET"},r).resultOptions,o=setGetURL(e,t);return _fetch(o,n).then(parseJSON).then(handleFetchPass,handleFetchError)},deleteJSON=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=mergeOptions({method:"DELETE"},r).resultOptions,o=setGetURL(e,t);return _fetch(o,n).then(parseJSON).then(handleFetchPass,handleFetchError)},postJSON=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=mergeOptions({method:"POST",body:JSON.stringify(t)},r).resultOptions;return _fetch(e,n).then(parseJSON).then(handleFetchPass,handleFetchError)},putJSON=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=mergeOptions({method:"PUT",body:JSON.stringify(t)},r).resultOptions;return _fetch(e,n).then(parseJSON).then(handleFetchPass,handleFetchError)},handleFetchPass=function(e){return"function"==typeof globalOption.fetchSuccess&&globalOption.fetchSuccess(e),e},handleFetchError=function(e){throw"function"==typeof globalOption.fetchError&&globalOption.fetchError(e),e=e instanceof Error?e:new Error(e)},getJSONP=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n="jsonp"+ +new Date,o=document.createElement("script");t[r.callbackName||"_callback"]=n;var i=setGetURL(e,t),a=document.head||document.querySelector("head")||document.documentElement;return o.setAttribute("src",i),o.setAttribute("charset","utf-8"),o.setAttribute("defer",!0),o.setAttribute("async",!0),a.insertBefore(o,a.firstChild),new Promise(function(t,e){window[n]=function(e){t(e),a.removeChild(o)},o.onerror=function(){e(),a.removeChild(o)}})},_fetch=function(o,i){return new Promise(function(t,r){var n=0;Promise.resolve(i.fetchStart({url:o,fetchOption:i})).then(function(t){var e=new Request(t.url,t.fetchOption);return n=setTimeout(function(){var e=new Error(t.url+" timeout");e.fetchOption=t.fetchOption,r(e)},t.fetchOption.timeout),fetch(e)}).then(function(e){clearTimeout(n),e.fetchOption=i,t(e)},function(e){clearTimeout(n),e.url=o,e.fetchOption=i,r(e)})}).then(checkStatus)},main={setOptions:setOptions,getJSONP:getJSONP,getJSON:getJSON,postJSON:postJSON,putJSON:putJSON,deleteJSON:deleteJSON};module.exports=main;
