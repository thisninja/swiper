const Utils = {
  deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      object[key] = null;
      delete object[key];
    });
  },
  nextTick(callback, delay = 0) {
    return setTimeout(callback, delay);
  },
  nextFrame(callback) {
    if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
    else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
    return window.setTimeout(callback, 1000 / 60);
  },
  now() {
    return Date.now();
  },
  promise(handler) {
    let resolved = false;
    let rejected = false;
    let resolveArgs;
    let rejectArgs;
    const promiseHandlers = {
      then: undefined,
      catch: undefined,
    };
    const promise = {
      then(thenHandler) {
        if (resolved) {
          thenHandler(...resolveArgs);
        } else {
          promiseHandlers.then = thenHandler;
        }
        return promise;
      },
      catch(catchHandler) {
        if (rejected) {
          catchHandler(...rejectArgs);
        } else {
          promiseHandlers.catch = catchHandler;
        }
        return promise;
      },
    };

    function resolve(...args) {
      resolved = true;
      if (promiseHandlers.then) promiseHandlers.then(...args);
      else resolveArgs = args;
    }
    function reject(...args) {
      rejected = true;
      if (promiseHandlers.catch) promiseHandlers.catch(...args);
      else rejectArgs = args;
    }
    handler(resolve, reject);

    return promise;
  },
  requestAnimationFrame(callback) {
    if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
    else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
    return window.setTimeout(callback, 1000 / 60);
  },
  cancelAnimationFrame(id) {
    if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
    else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
    return window.clearTimeout(id);
  },
  parseUrlQuery(url) {
    const query = {};
    let urlToParse = url || window.location.href;
    let i;
    let params;
    let param;
    let length;
    if (typeof urlToParse === 'string' && urlToParse.length) {
      urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
      params = urlToParse.split('&').filter(paramsPart => paramsPart !== '');
      length = params.length;

      for (i = 0; i < length; i += 1) {
        param = params[i].replace(/#\S+/g, '').split('=');
        query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
      }
    }
    return query;
  },
  extend(...args) {
    const to = Object(args[0]);
    for (let i = 1; i < args.length; i += 1) {
      const nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        const keysArray = Object.keys(Object(nextSource));
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (typeof to[nextKey] === 'object' && typeof nextSource[nextKey] === 'object') {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },
};
export default Utils;