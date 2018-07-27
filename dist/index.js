"use strict";!function(t){if(!t.fetch){var e="URLSearchParams"in t,r="Symbol"in t&&"iterator"in Symbol,s="FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),n="FormData"in t,o="ArrayBuffer"in t;if(o)var i=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],a=function(t){return t&&DataView.prototype.isPrototypeOf(t)},h=ArrayBuffer.isView||function(t){return t&&-1<i.indexOf(Object.prototype.toString.call(t))};p.prototype.append=function(t,e){t=f(t),e=d(e);var r=this.map[t];this.map[t]=r?r+","+e:e},p.prototype.delete=function(t){delete this.map[f(t)]},p.prototype.get=function(t){return t=f(t),this.has(t)?this.map[t]:null},p.prototype.has=function(t){return this.map.hasOwnProperty(f(t))},p.prototype.set=function(t,e){this.map[f(t)]=d(e)},p.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},p.prototype.keys=function(){var r=[];return this.forEach(function(t,e){r.push(e)}),l(r)},p.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),l(e)},p.prototype.entries=function(){var r=[];return this.forEach(function(t,e){r.push([e,t])}),l(r)},r&&(p.prototype[Symbol.iterator]=p.prototype.entries);var u=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];O.prototype.clone=function(){return new O(this,{body:this._bodyInit})},v.call(O.prototype),v.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new p(this.headers),url:this.url})},E.error=function(){var t=new E(null,{status:0,statusText:""});return t.type="error",t};var c=[301,302,303,307,308];E.redirect=function(t,e){if(-1===c.indexOf(e))throw new RangeError("Invalid status code");return new E(null,{status:e,headers:{location:t}})},t.Headers=p,t.Request=O,t.Response=E,t.fetch=function(r,o){return new Promise(function(n,t){var e=new O(r,o),i=new XMLHttpRequest;i.onload=function(){var t,o,e={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",o=new p,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var e=t.split(":"),r=e.shift().trim();if(r){var n=e.join(":").trim();o.append(r,n)}}),o)};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var r="response"in i?i.response:i.responseText;n(new E(r,e))},i.onerror=function(){t(new TypeError("Network request failed"))},i.ontimeout=function(){t(new TypeError("Network request failed"))},i.open(e.method,e.url,!0),"include"===e.credentials?i.withCredentials=!0:"omit"===e.credentials&&(i.withCredentials=!1),"responseType"in i&&s&&(i.responseType="blob"),e.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send(void 0===e._bodyInit?null:e._bodyInit)})},t.fetch.polyfill=!0}function f(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function d(t){return"string"!=typeof t&&(t=String(t)),t}function l(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return r&&(t[Symbol.iterator]=function(){return t}),t}function p(e){this.map={},e instanceof p?e.forEach(function(t,e){this.append(e,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function y(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function b(r){return new Promise(function(t,e){r.onload=function(){t(r.result)},r.onerror=function(){e(r.error)}})}function m(t){var e=new FileReader,r=b(e);return e.readAsArrayBuffer(t),r}function w(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function v(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t)if("string"==typeof t)this._bodyText=t;else if(s&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(n&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(e&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(o&&s&&a(t))this._bodyArrayBuffer=w(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!o||!ArrayBuffer.prototype.isPrototypeOf(t)&&!h(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=w(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):e&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},s&&(this.blob=function(){var t=y(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?y(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(m)}),this.text=function(){var t,e,r,n=y(this);if(n)return n;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=b(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},n&&(this.formData=function(){return this.text().then(g)}),this.json=function(){return this.text().then(JSON.parse)},this}function O(t,e){var r,n,o=(e=e||{}).body;if(t instanceof O){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new p(t.headers)),this.method=t.method,this.mode=t.mode,o||null==t._bodyInit||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new p(e.headers)),this.method=(r=e.method||this.method||"GET",n=r.toUpperCase(),-1<u.indexOf(n)?n:r),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function g(t){var o=new FormData;return t.trim().split("&").forEach(function(t){if(t){var e=t.split("="),r=e.shift().replace(/\+/g," "),n=e.join("=").replace(/\+/g," ");o.append(decodeURIComponent(r),decodeURIComponent(n))}}),o}function E(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new p(e.headers),this.url=e.url||"",this._initBody(t)}}("undefined"!=typeof self?self:void 0);var _extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},globalOption={headers:new Headers({"Content-Type":"application/json"}),mode:"same-origin",credentials:"include",cache:"reload",redirect:"follow",referrer:"client",timeout:3e4},setOptions=function(t){globalOption=_extends({},globalOption,t)},parseJSON=function(e){return e.json().catch(function(t){throw new Error("JSON Parse Error: "+t+" "+e.url)})},checkStatus=function(t){if(200<=t.status&&t.status<300||304==t.status)return t;throw new Error(t.url)},setGetURL=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if("[object Object]"!==Object.prototype.toString.call(e)||0===Object.keys(e).length)return t;var r=[];for(var n in e)r.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t+(-1===t.indexOf("?")?"?":"")+r.join("&")},getJSON=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=_extends({},globalOption,{method:"GET"},r),o=setGetURL(t,e);return _fetch(o,n).then(parseJSON).then(handleFetchPass,handleFetchError)},deleteJSON=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=_extends({},globalOption,{method:"DELETE"},r),o=setGetURL(t,e);return _fetch(o,n).then(parseJSON).then(handleFetchPass,handleFetchError)},postJSON=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=_extends({},globalOption,{method:"POST",body:JSON.stringify(e)},r);return _fetch(t,n).then(parseJSON).then(handleFetchPass,handleFetchError)},putJSON=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=_extends({},globalOption,{method:"PUT",body:JSON.stringify(e)},r);return _fetch(t,n).then(parseJSON).then(handleFetchPass,handleFetchError)},handleFetchPass=function(t){return"function"==typeof globalOption.fetchSuccess&&globalOption.fetchSuccess(t),t},handleFetchError=function(t){throw"function"==typeof globalOption.fetchError&&globalOption.fetchError(t),t=t instanceof Error?t:new Error(t)},getJSONP=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n="jsonp"+ +new Date,o=document.createElement("script");e[r.callbackName||"_callback"]=n;var i=setGetURL(t,e),s=document.head||document.querySelector("head")||document.documentElement;return o.setAttribute("src",i),o.setAttribute("charset","utf-8"),o.setAttribute("defer",!0),o.setAttribute("async",!0),s.insertBefore(o,s.firstChild),new Promise(function(e,t){window[n]=function(t){e(t),s.removeChild(o)},o.onerror=function(){t(),s.removeChild(o)}})},_fetch=function(o,i){return new Promise(function(e,r){var n,t=new Request(o,i);n=setTimeout(function(){var t=new Error(o+" timeout");t.fetchOption=i,r(t)},i.timeout),"function"==typeof i.fetchStart&&i.fetchStart(),fetch(t).then(function(t){clearTimeout(n),t.fetchOption=i,e(t)},function(t){clearTimeout(n),t.url=o,t.fetchOption=i,r(t)})}).then(checkStatus)},main={setOptions:setOptions,getJSONP:getJSONP,getJSON:getJSON,postJSON:postJSON,putJSON:putJSON,deleteJSON:deleteJSON};module.exports=main;
