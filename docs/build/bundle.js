
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty$1() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function _isPlaceholder(a) {
      return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
    }

    /**
     * Optimized internal one-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */

    function _curry1(fn) {
      return function f1(a) {
        if (arguments.length === 0 || _isPlaceholder(a)) {
          return f1;
        } else {
          return fn.apply(this, arguments);
        }
      };
    }

    /**
     * Optimized internal two-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */

    function _curry2(fn) {
      return function f2(a, b) {
        switch (arguments.length) {
          case 0:
            return f2;

          case 1:
            return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
              return fn(a, _b);
            });

          default:
            return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
              return fn(_a, b);
            }) : _isPlaceholder(b) ? _curry1(function (_b) {
              return fn(a, _b);
            }) : fn(a, b);
        }
      };
    }

    /**
     * Private `concat` function to merge two array-like objects.
     *
     * @private
     * @param {Array|Arguments} [set1=[]] An array-like object.
     * @param {Array|Arguments} [set2=[]] An array-like object.
     * @return {Array} A new, merged array.
     * @example
     *
     *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
     */
    function _concat(set1, set2) {
      set1 = set1 || [];
      set2 = set2 || [];
      var idx;
      var len1 = set1.length;
      var len2 = set2.length;
      var result = [];
      idx = 0;

      while (idx < len1) {
        result[result.length] = set1[idx];
        idx += 1;
      }

      idx = 0;

      while (idx < len2) {
        result[result.length] = set2[idx];
        idx += 1;
      }

      return result;
    }

    function _arity(n, fn) {
      /* eslint-disable no-unused-vars */
      switch (n) {
        case 0:
          return function () {
            return fn.apply(this, arguments);
          };

        case 1:
          return function (a0) {
            return fn.apply(this, arguments);
          };

        case 2:
          return function (a0, a1) {
            return fn.apply(this, arguments);
          };

        case 3:
          return function (a0, a1, a2) {
            return fn.apply(this, arguments);
          };

        case 4:
          return function (a0, a1, a2, a3) {
            return fn.apply(this, arguments);
          };

        case 5:
          return function (a0, a1, a2, a3, a4) {
            return fn.apply(this, arguments);
          };

        case 6:
          return function (a0, a1, a2, a3, a4, a5) {
            return fn.apply(this, arguments);
          };

        case 7:
          return function (a0, a1, a2, a3, a4, a5, a6) {
            return fn.apply(this, arguments);
          };

        case 8:
          return function (a0, a1, a2, a3, a4, a5, a6, a7) {
            return fn.apply(this, arguments);
          };

        case 9:
          return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
            return fn.apply(this, arguments);
          };

        case 10:
          return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            return fn.apply(this, arguments);
          };

        default:
          throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
      }
    }

    /**
     * Internal curryN function.
     *
     * @private
     * @category Function
     * @param {Number} length The arity of the curried function.
     * @param {Array} received An array of arguments received thus far.
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */

    function _curryN(length, received, fn) {
      return function () {
        var combined = [];
        var argsIdx = 0;
        var left = length;
        var combinedIdx = 0;

        while (combinedIdx < received.length || argsIdx < arguments.length) {
          var result;

          if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
            result = received[combinedIdx];
          } else {
            result = arguments[argsIdx];
            argsIdx += 1;
          }

          combined[combinedIdx] = result;

          if (!_isPlaceholder(result)) {
            left -= 1;
          }

          combinedIdx += 1;
        }

        return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
      };
    }

    /**
     * Returns a curried equivalent of the provided function, with the specified
     * arity. The curried function has two unusual capabilities. First, its
     * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
     * following are equivalent:
     *
     *   - `g(1)(2)(3)`
     *   - `g(1)(2, 3)`
     *   - `g(1, 2)(3)`
     *   - `g(1, 2, 3)`
     *
     * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
     * "gaps", allowing partial application of any combination of arguments,
     * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
     * the following are equivalent:
     *
     *   - `g(1, 2, 3)`
     *   - `g(_, 2, 3)(1)`
     *   - `g(_, _, 3)(1)(2)`
     *   - `g(_, _, 3)(1, 2)`
     *   - `g(_, 2)(1)(3)`
     *   - `g(_, 2)(1, 3)`
     *   - `g(_, 2)(_, 3)(1)`
     *
     * @func
     * @memberOf R
     * @since v0.5.0
     * @category Function
     * @sig Number -> (* -> a) -> (* -> a)
     * @param {Number} length The arity for the returned function.
     * @param {Function} fn The function to curry.
     * @return {Function} A new, curried function.
     * @see R.curry
     * @example
     *
     *      const sumArgs = (...args) => R.sum(args);
     *
     *      const curriedAddFourNumbers = R.curryN(4, sumArgs);
     *      const f = curriedAddFourNumbers(1, 2);
     *      const g = f(3);
     *      g(4); //=> 10
     */

    var curryN =
    /*#__PURE__*/
    _curry2(function curryN(length, fn) {
      if (length === 1) {
        return _curry1(fn);
      }

      return _arity(length, _curryN(length, [], fn));
    });

    /**
     * Optimized internal three-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */

    function _curry3(fn) {
      return function f3(a, b, c) {
        switch (arguments.length) {
          case 0:
            return f3;

          case 1:
            return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
              return fn(a, _b, _c);
            });

          case 2:
            return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
              return fn(_a, b, _c);
            }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
              return fn(a, _b, _c);
            }) : _curry1(function (_c) {
              return fn(a, b, _c);
            });

          default:
            return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
              return fn(_a, _b, c);
            }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
              return fn(_a, b, _c);
            }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
              return fn(a, _b, _c);
            }) : _isPlaceholder(a) ? _curry1(function (_a) {
              return fn(_a, b, c);
            }) : _isPlaceholder(b) ? _curry1(function (_b) {
              return fn(a, _b, c);
            }) : _isPlaceholder(c) ? _curry1(function (_c) {
              return fn(a, b, _c);
            }) : fn(a, b, c);
        }
      };
    }

    /**
     * Tests whether or not an object is an array.
     *
     * @private
     * @param {*} val The object to test.
     * @return {Boolean} `true` if `val` is an array, `false` otherwise.
     * @example
     *
     *      _isArray([]); //=> true
     *      _isArray(null); //=> false
     *      _isArray({}); //=> false
     */
    var _isArray = Array.isArray || function _isArray(val) {
      return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
    };

    function _isTransformer(obj) {
      return obj != null && typeof obj['@@transducer/step'] === 'function';
    }

    /**
     * Returns a function that dispatches with different strategies based on the
     * object in list position (last argument). If it is an array, executes [fn].
     * Otherwise, if it has a function with one of the given method names, it will
     * execute that function (functor case). Otherwise, if it is a transformer,
     * uses transducer created by [transducerCreator] to return a new transformer
     * (transducer case).
     * Otherwise, it will default to executing [fn].
     *
     * @private
     * @param {Array} methodNames properties to check for a custom implementation
     * @param {Function} transducerCreator transducer factory if object is transformer
     * @param {Function} fn default ramda implementation
     * @return {Function} A function that dispatches on object in list position
     */

    function _dispatchable(methodNames, transducerCreator, fn) {
      return function () {
        if (arguments.length === 0) {
          return fn();
        }

        var obj = arguments[arguments.length - 1];

        if (!_isArray(obj)) {
          var idx = 0;

          while (idx < methodNames.length) {
            if (typeof obj[methodNames[idx]] === 'function') {
              return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
            }

            idx += 1;
          }

          if (_isTransformer(obj)) {
            var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
            return transducer(obj);
          }
        }

        return fn.apply(this, arguments);
      };
    }

    function _reduced(x) {
      return x && x['@@transducer/reduced'] ? x : {
        '@@transducer/value': x,
        '@@transducer/reduced': true
      };
    }

    var _xfBase = {
      init: function () {
        return this.xf['@@transducer/init']();
      },
      result: function (result) {
        return this.xf['@@transducer/result'](result);
      }
    };

    function _map(fn, functor) {
      var idx = 0;
      var len = functor.length;
      var result = Array(len);

      while (idx < len) {
        result[idx] = fn(functor[idx]);
        idx += 1;
      }

      return result;
    }

    function _isString(x) {
      return Object.prototype.toString.call(x) === '[object String]';
    }

    /**
     * Tests whether or not an object is similar to an array.
     *
     * @private
     * @category Type
     * @category List
     * @sig * -> Boolean
     * @param {*} x The object to test.
     * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
     * @example
     *
     *      _isArrayLike([]); //=> true
     *      _isArrayLike(true); //=> false
     *      _isArrayLike({}); //=> false
     *      _isArrayLike({length: 10}); //=> false
     *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
     *      _isArrayLike({nodeType: 1, length: 1}) // => false
     */

    var _isArrayLike =
    /*#__PURE__*/
    _curry1(function isArrayLike(x) {
      if (_isArray(x)) {
        return true;
      }

      if (!x) {
        return false;
      }

      if (typeof x !== 'object') {
        return false;
      }

      if (_isString(x)) {
        return false;
      }

      if (x.length === 0) {
        return true;
      }

      if (x.length > 0) {
        return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
      }

      return false;
    });

    var XWrap =
    /*#__PURE__*/
    function () {
      function XWrap(fn) {
        this.f = fn;
      }

      XWrap.prototype['@@transducer/init'] = function () {
        throw new Error('init not implemented on XWrap');
      };

      XWrap.prototype['@@transducer/result'] = function (acc) {
        return acc;
      };

      XWrap.prototype['@@transducer/step'] = function (acc, x) {
        return this.f(acc, x);
      };

      return XWrap;
    }();

    function _xwrap(fn) {
      return new XWrap(fn);
    }

    /**
     * Creates a function that is bound to a context.
     * Note: `R.bind` does not provide the additional argument-binding capabilities of
     * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
     *
     * @func
     * @memberOf R
     * @since v0.6.0
     * @category Function
     * @category Object
     * @sig (* -> *) -> {*} -> (* -> *)
     * @param {Function} fn The function to bind to context
     * @param {Object} thisObj The context to bind `fn` to
     * @return {Function} A function that will execute in the context of `thisObj`.
     * @see R.partial
     * @example
     *
     *      const log = R.bind(console.log, console);
     *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
     *      // logs {a: 2}
     * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
     */

    var bind =
    /*#__PURE__*/
    _curry2(function bind(fn, thisObj) {
      return _arity(fn.length, function () {
        return fn.apply(thisObj, arguments);
      });
    });

    function _arrayReduce(xf, acc, list) {
      var idx = 0;
      var len = list.length;

      while (idx < len) {
        acc = xf['@@transducer/step'](acc, list[idx]);

        if (acc && acc['@@transducer/reduced']) {
          acc = acc['@@transducer/value'];
          break;
        }

        idx += 1;
      }

      return xf['@@transducer/result'](acc);
    }

    function _iterableReduce(xf, acc, iter) {
      var step = iter.next();

      while (!step.done) {
        acc = xf['@@transducer/step'](acc, step.value);

        if (acc && acc['@@transducer/reduced']) {
          acc = acc['@@transducer/value'];
          break;
        }

        step = iter.next();
      }

      return xf['@@transducer/result'](acc);
    }

    function _methodReduce(xf, acc, obj, methodName) {
      return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
    }

    var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
    function _reduce(fn, acc, list) {
      if (typeof fn === 'function') {
        fn = _xwrap(fn);
      }

      if (_isArrayLike(list)) {
        return _arrayReduce(fn, acc, list);
      }

      if (typeof list['fantasy-land/reduce'] === 'function') {
        return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
      }

      if (list[symIterator] != null) {
        return _iterableReduce(fn, acc, list[symIterator]());
      }

      if (typeof list.next === 'function') {
        return _iterableReduce(fn, acc, list);
      }

      if (typeof list.reduce === 'function') {
        return _methodReduce(fn, acc, list, 'reduce');
      }

      throw new TypeError('reduce: list must be array or iterable');
    }

    var XMap =
    /*#__PURE__*/
    function () {
      function XMap(f, xf) {
        this.xf = xf;
        this.f = f;
      }

      XMap.prototype['@@transducer/init'] = _xfBase.init;
      XMap.prototype['@@transducer/result'] = _xfBase.result;

      XMap.prototype['@@transducer/step'] = function (result, input) {
        return this.xf['@@transducer/step'](result, this.f(input));
      };

      return XMap;
    }();

    var _xmap =
    /*#__PURE__*/
    _curry2(function _xmap(f, xf) {
      return new XMap(f, xf);
    });

    function _has(prop, obj) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    var toString = Object.prototype.toString;

    var _isArguments =
    /*#__PURE__*/
    function () {
      return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
        return toString.call(x) === '[object Arguments]';
      } : function _isArguments(x) {
        return _has('callee', x);
      };
    }();

    var hasEnumBug = !
    /*#__PURE__*/
    {
      toString: null
    }.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

    var hasArgsEnumBug =
    /*#__PURE__*/
    function () {

      return arguments.propertyIsEnumerable('length');
    }();

    var contains = function contains(list, item) {
      var idx = 0;

      while (idx < list.length) {
        if (list[idx] === item) {
          return true;
        }

        idx += 1;
      }

      return false;
    };
    /**
     * Returns a list containing the names of all the enumerable own properties of
     * the supplied object.
     * Note that the order of the output array is not guaranteed to be consistent
     * across different JS platforms.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig {k: v} -> [k]
     * @param {Object} obj The object to extract properties from
     * @return {Array} An array of the object's own properties.
     * @see R.keysIn, R.values, R.toPairs
     * @example
     *
     *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
     */


    var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ?
    /*#__PURE__*/
    _curry1(function keys(obj) {
      return Object(obj) !== obj ? [] : Object.keys(obj);
    }) :
    /*#__PURE__*/
    _curry1(function keys(obj) {
      if (Object(obj) !== obj) {
        return [];
      }

      var prop, nIdx;
      var ks = [];

      var checkArgsLength = hasArgsEnumBug && _isArguments(obj);

      for (prop in obj) {
        if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
          ks[ks.length] = prop;
        }
      }

      if (hasEnumBug) {
        nIdx = nonEnumerableProps.length - 1;

        while (nIdx >= 0) {
          prop = nonEnumerableProps[nIdx];

          if (_has(prop, obj) && !contains(ks, prop)) {
            ks[ks.length] = prop;
          }

          nIdx -= 1;
        }
      }

      return ks;
    });

    /**
     * Takes a function and
     * a [functor](https://github.com/fantasyland/fantasy-land#functor),
     * applies the function to each of the functor's values, and returns
     * a functor of the same shape.
     *
     * Ramda provides suitable `map` implementations for `Array` and `Object`,
     * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
     *
     * Dispatches to the `map` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     *
     * Also treats functions as functors and will compose them together.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig Functor f => (a -> b) -> f a -> f b
     * @param {Function} fn The function to be called on every element of the input `list`.
     * @param {Array} list The list to be iterated over.
     * @return {Array} The new list.
     * @see R.transduce, R.addIndex, R.pluck, R.project
     * @example
     *
     *      const double = x => x * 2;
     *
     *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
     *
     *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
     * @symb R.map(f, [a, b]) = [f(a), f(b)]
     * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
     * @symb R.map(f, functor_o) = functor_o.map(f)
     */

    var map =
    /*#__PURE__*/
    _curry2(
    /*#__PURE__*/
    _dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
      switch (Object.prototype.toString.call(functor)) {
        case '[object Function]':
          return curryN(functor.length, function () {
            return fn.call(this, functor.apply(this, arguments));
          });

        case '[object Object]':
          return _reduce(function (acc, key) {
            acc[key] = fn(functor[key]);
            return acc;
          }, {}, keys(functor));

        default:
          return _map(fn, functor);
      }
    }));

    /**
     * Determine if the passed argument is an integer.
     *
     * @private
     * @param {*} n
     * @category Type
     * @return {Boolean}
     */
    var _isInteger = Number.isInteger || function _isInteger(n) {
      return n << 0 === n;
    };

    /**
     * Returns the nth element of the given list or string. If n is negative the
     * element at index length + n is returned.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig Number -> [a] -> a | Undefined
     * @sig Number -> String -> String
     * @param {Number} offset
     * @param {*} list
     * @return {*}
     * @example
     *
     *      const list = ['foo', 'bar', 'baz', 'quux'];
     *      R.nth(1, list); //=> 'bar'
     *      R.nth(-1, list); //=> 'quux'
     *      R.nth(-99, list); //=> undefined
     *
     *      R.nth(2, 'abc'); //=> 'c'
     *      R.nth(3, 'abc'); //=> ''
     * @symb R.nth(-1, [a, b, c]) = c
     * @symb R.nth(0, [a, b, c]) = a
     * @symb R.nth(1, [a, b, c]) = b
     */

    var nth =
    /*#__PURE__*/
    _curry2(function nth(offset, list) {
      var idx = offset < 0 ? list.length + offset : offset;
      return _isString(list) ? list.charAt(idx) : list[idx];
    });

    /**
     * Returns a function that when supplied an object returns the indicated
     * property of that object, if it exists.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @typedefn Idx = String | Int | Symbol
     * @sig Idx -> {s: a} -> a | Undefined
     * @param {String|Number} p The property name or array index
     * @param {Object} obj The object to query
     * @return {*} The value at `obj.p`.
     * @see R.path, R.props, R.pluck, R.project, R.nth
     * @example
     *
     *      R.prop('x', {x: 100}); //=> 100
     *      R.prop('x', {}); //=> undefined
     *      R.prop(0, [100]); //=> 100
     *      R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
     */

    var prop =
    /*#__PURE__*/
    _curry2(function prop(p, obj) {
      if (obj == null) {
        return;
      }

      return _isInteger(p) ? nth(p, obj) : obj[p];
    });

    var prop$1 = prop;

    /**
     * Returns a single item by iterating through the list, successively calling
     * the iterator function and passing it an accumulator value and the current
     * value from the array, and then passing the result to the next call.
     *
     * The iterator function receives two values: *(acc, value)*. It may use
     * [`R.reduced`](#reduced) to shortcut the iteration.
     *
     * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
     * is *(value, acc)*.
     *
     * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
     * arrays), unlike the native `Array.prototype.reduce` method. For more details
     * on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
     *
     * Dispatches to the `reduce` method of the third argument, if present. When
     * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
     * shortcuting, as this is not implemented by `reduce`.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig ((a, b) -> a) -> a -> [b] -> a
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @see R.reduced, R.addIndex, R.reduceRight
     * @example
     *
     *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
     *      //          -               -10
     *      //         / \              / \
     *      //        -   4           -6   4
     *      //       / \              / \
     *      //      -   3   ==>     -3   3
     *      //     / \              / \
     *      //    -   2           -1   2
     *      //   / \              / \
     *      //  0   1            0   1
     *
     * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
     */

    var reduce =
    /*#__PURE__*/
    _curry3(_reduce);

    var reduce$1 = reduce;

    /**
     * Returns a function that always returns the given value. Note that for
     * non-primitives the value returned is a reference to the original value.
     *
     * This function is known as `const`, `constant`, or `K` (for K combinator) in
     * other languages and libraries.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig a -> (* -> a)
     * @param {*} val The value to wrap in a function
     * @return {Function} A Function :: * -> val.
     * @example
     *
     *      const t = R.always('Tee');
     *      t(); //=> 'Tee'
     */

    var always =
    /*#__PURE__*/
    _curry1(function always(val) {
      return function () {
        return val;
      };
    });

    var always$1 = always;

    /**
     * ap applies a list of functions to a list of values.
     *
     * Dispatches to the `ap` method of the second argument, if present. Also
     * treats curried functions as applicatives.
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category Function
     * @sig [a -> b] -> [a] -> [b]
     * @sig Apply f => f (a -> b) -> f a -> f b
     * @sig (r -> a -> b) -> (r -> a) -> (r -> b)
     * @param {*} applyF
     * @param {*} applyX
     * @return {*}
     * @example
     *
     *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
     *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
     *
     *      // R.ap can also be used as S combinator
     *      // when only two functions are passed
     *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
     * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
     */

    var ap =
    /*#__PURE__*/
    _curry2(function ap(applyF, applyX) {
      return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
        return applyF(x)(applyX(x));
      } : _reduce(function (acc, f) {
        return _concat(acc, map(f, applyX));
      }, [], applyF);
    });

    /**
     * Checks if the input value is `null` or `undefined`.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Type
     * @sig * -> Boolean
     * @param {*} x The value to test.
     * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
     * @example
     *
     *      R.isNil(null); //=> true
     *      R.isNil(undefined); //=> true
     *      R.isNil(0); //=> false
     *      R.isNil([]); //=> false
     */

    var isNil =
    /*#__PURE__*/
    _curry1(function isNil(x) {
      return x == null;
    });

    var isNil$1 = isNil;

    function _isFunction(x) {
      var type = Object.prototype.toString.call(x);
      return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object AsyncGeneratorFunction]';
    }

    /**
     * "lifts" a function to be the specified arity, so that it may "map over" that
     * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
     *
     * @func
     * @memberOf R
     * @since v0.7.0
     * @category Function
     * @sig Number -> (*... -> *) -> ([*]... -> [*])
     * @param {Function} fn The function to lift into higher context
     * @return {Function} The lifted function.
     * @see R.lift, R.ap
     * @example
     *
     *      const madd3 = R.liftN(3, (...args) => R.sum(args));
     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
     */

    var liftN =
    /*#__PURE__*/
    _curry2(function liftN(arity, fn) {
      var lifted = curryN(arity, fn);
      return curryN(arity, function () {
        return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
      });
    });

    /**
     * "lifts" a function of arity >= 1 so that it may "map over" a list, Function or other
     * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
     *
     * @func
     * @memberOf R
     * @since v0.7.0
     * @category Function
     * @sig (*... -> *) -> ([*]... -> [*])
     * @param {Function} fn The function to lift into higher context
     * @return {Function} The lifted function.
     * @see R.liftN
     * @example
     *
     *      const madd3 = R.lift((a, b, c) => a + b + c);
     *
     *      madd3([100, 200], [30, 40], [5, 6, 7]); //=> [135, 136, 137, 145, 146, 147, 235, 236, 237, 245, 246, 247]
     *
     *      const madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
     *
     *      madd5([10, 20], [1], [2, 3], [4], [100, 200]); //=> [117, 217, 118, 218, 127, 227, 128, 228]
     */

    var lift =
    /*#__PURE__*/
    _curry1(function lift(fn) {
      return liftN(fn.length, fn);
    });

    /**
     * Restricts a number to be within a range.
     *
     * Also works for other ordered types such as Strings and Dates.
     *
     * @func
     * @memberOf R
     * @since v0.20.0
     * @category Relation
     * @sig Ord a => a -> a -> a -> a
     * @param {Number} minimum The lower limit of the clamp (inclusive)
     * @param {Number} maximum The upper limit of the clamp (inclusive)
     * @param {Number} value Value to be clamped
     * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
     * @example
     *
     *      R.clamp(1, 10, -5) // => 1
     *      R.clamp(1, 10, 15) // => 10
     *      R.clamp(1, 10, 4)  // => 4
     */

    var clamp =
    /*#__PURE__*/
    _curry3(function clamp(min, max, value) {
      if (min > max) {
        throw new Error('min must not be greater than max in clamp(min, max, value)');
      }

      return value < min ? min : value > max ? max : value;
    });

    var clamp$1 = clamp;

    /**
     * Gives a single-word string description of the (native) type of a value,
     * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
     * attempt to distinguish user Object types any further, reporting them all as
     * 'Object'.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Type
     * @sig (* -> {*}) -> String
     * @param {*} val The value to test
     * @return {String}
     * @example
     *
     *      R.type({}); //=> "Object"
     *      R.type(1); //=> "Number"
     *      R.type(false); //=> "Boolean"
     *      R.type('s'); //=> "String"
     *      R.type(null); //=> "Null"
     *      R.type([]); //=> "Array"
     *      R.type(/[A-z]/); //=> "RegExp"
     *      R.type(() => {}); //=> "Function"
     *      R.type(undefined); //=> "Undefined"
     */

    var type =
    /*#__PURE__*/
    _curry1(function type(val) {
      return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
    });

    function _pipe(f, g) {
      return function () {
        return g.call(this, f.apply(this, arguments));
      };
    }

    /**
     * This checks whether a function has a [methodname] function. If it isn't an
     * array it will execute that function otherwise it will default to the ramda
     * implementation.
     *
     * @private
     * @param {Function} fn ramda implementation
     * @param {String} methodname property to check for a custom implementation
     * @return {Object} Whatever the return value of the method is.
     */

    function _checkForMethod(methodname, fn) {
      return function () {
        var length = arguments.length;

        if (length === 0) {
          return fn();
        }

        var obj = arguments[length - 1];
        return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
      };
    }

    /**
     * Returns the elements of the given list or string (or object with a `slice`
     * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
     *
     * Dispatches to the `slice` method of the third argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.4
     * @category List
     * @sig Number -> Number -> [a] -> [a]
     * @sig Number -> Number -> String -> String
     * @param {Number} fromIndex The start index (inclusive).
     * @param {Number} toIndex The end index (exclusive).
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
     *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
     *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
     *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
     *      R.slice(0, 3, 'ramda');                     //=> 'ram'
     */

    var slice =
    /*#__PURE__*/
    _curry3(
    /*#__PURE__*/
    _checkForMethod('slice', function slice(fromIndex, toIndex, list) {
      return Array.prototype.slice.call(list, fromIndex, toIndex);
    }));

    /**
     * Returns all but the first element of the given list or string (or object
     * with a `tail` method).
     *
     * Dispatches to the `slice` method of the first argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [a]
     * @sig String -> String
     * @param {*} list
     * @return {*}
     * @see R.head, R.init, R.last
     * @example
     *
     *      R.tail([1, 2, 3]);  //=> [2, 3]
     *      R.tail([1, 2]);     //=> [2]
     *      R.tail([1]);        //=> []
     *      R.tail([]);         //=> []
     *
     *      R.tail('abc');  //=> 'bc'
     *      R.tail('ab');   //=> 'b'
     *      R.tail('a');    //=> ''
     *      R.tail('');     //=> ''
     */

    var tail =
    /*#__PURE__*/
    _curry1(
    /*#__PURE__*/
    _checkForMethod('tail',
    /*#__PURE__*/
    slice(1, Infinity)));

    var tail$1 = tail;

    /**
     * Performs left-to-right function composition. The first argument may have
     * any arity; the remaining arguments must be unary.
     *
     * In some libraries this function is named `sequence`.
     *
     * **Note:** The result of pipe is not automatically curried.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.compose
     * @example
     *
     *      const f = R.pipe(Math.pow, R.negate, R.inc);
     *
     *      f(3, 4); // -(3^4) + 1
     * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
     * @symb R.pipe(f, g, h)(a)(b) = h(g(f(a)))(b)
     */

    function pipe() {
      if (arguments.length === 0) {
        throw new Error('pipe requires at least one argument');
      }

      return _arity(arguments[0].length, reduce$1(_pipe, arguments[0], tail$1(arguments)));
    }

    /**
     * Returns a new list or string with the elements or characters in reverse
     * order.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [a]
     * @sig String -> String
     * @param {Array|String} list
     * @return {Array|String}
     * @example
     *
     *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
     *      R.reverse([1, 2]);     //=> [2, 1]
     *      R.reverse([1]);        //=> [1]
     *      R.reverse([]);         //=> []
     *
     *      R.reverse('abc');      //=> 'cba'
     *      R.reverse('ab');       //=> 'ba'
     *      R.reverse('a');        //=> 'a'
     *      R.reverse('');         //=> ''
     */

    var reverse =
    /*#__PURE__*/
    _curry1(function reverse(list) {
      return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
    });

    var reverse$1 = reverse;

    /**
     * Performs right-to-left function composition. The last argument may have
     * any arity; the remaining arguments must be unary.
     *
     * **Note:** The result of compose is not automatically curried.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
     * @param {...Function} ...functions The functions to compose
     * @return {Function}
     * @see R.pipe
     * @example
     *
     *      const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
     *      const yellGreeting = R.compose(R.toUpper, classyGreeting);
     *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
     *
     *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
     *
     * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
     * @symb R.compose(f, g, h)(a)(b) = f(g(h(a)))(b)
     */

    function compose() {
      if (arguments.length === 0) {
        throw new Error('compose requires at least one argument');
      }

      return pipe.apply(this, reverse$1(arguments));
    }

    /**
     * Returns the first element of the given list or string. In some libraries
     * this function is named `first`.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> a | Undefined
     * @sig String -> String
     * @param {Array|String} list
     * @return {*}
     * @see R.tail, R.init, R.last
     * @example
     *
     *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
     *      R.head([]); //=> undefined
     *
     *      R.head('abc'); //=> 'a'
     *      R.head(''); //=> ''
     */

    var head =
    /*#__PURE__*/
    nth(0);
    var head$1 = head;

    function _identity(x) {
      return x;
    }

    /**
     * A function that does nothing but return the parameter supplied to it. Good
     * as a default or placeholder function.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig a -> a
     * @param {*} x The value to return.
     * @return {*} The input value, `x`.
     * @example
     *
     *      R.identity(1); //=> 1
     *
     *      const obj = {};
     *      R.identity(obj) === obj; //=> true
     * @symb R.identity(a) = a
     */

    var identity =
    /*#__PURE__*/
    _curry1(_identity);

    var identity$1 = identity;

    function _arrayFromIterator(iter) {
      var list = [];
      var next;

      while (!(next = iter.next()).done) {
        list.push(next.value);
      }

      return list;
    }

    function _includesWith(pred, x, list) {
      var idx = 0;
      var len = list.length;

      while (idx < len) {
        if (pred(x, list[idx])) {
          return true;
        }

        idx += 1;
      }

      return false;
    }

    function _functionName(f) {
      // String(x => x) evaluates to "x => x", so the pattern may not match.
      var match = String(f).match(/^function (\w*)/);
      return match == null ? '' : match[1];
    }

    // Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    function _objectIs(a, b) {
      // SameValue algorithm
      if (a === b) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return a !== 0 || 1 / a === 1 / b;
      } else {
        // Step 6.a: NaN == NaN
        return a !== a && b !== b;
      }
    }

    var _objectIs$1 = typeof Object.is === 'function' ? Object.is : _objectIs;

    /**
     * private _uniqContentEquals function.
     * That function is checking equality of 2 iterator contents with 2 assumptions
     * - iterators lengths are the same
     * - iterators values are unique
     *
     * false-positive result will be returned for comparison of, e.g.
     * - [1,2,3] and [1,2,3,4]
     * - [1,1,1] and [1,2,3]
     * */

    function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
      var a = _arrayFromIterator(aIterator);

      var b = _arrayFromIterator(bIterator);

      function eq(_a, _b) {
        return _equals(_a, _b, stackA.slice(), stackB.slice());
      } // if *a* array contains any element that is not included in *b*


      return !_includesWith(function (b, aItem) {
        return !_includesWith(eq, aItem, b);
      }, b, a);
    }

    function _equals(a, b, stackA, stackB) {
      if (_objectIs$1(a, b)) {
        return true;
      }

      var typeA = type(a);

      if (typeA !== type(b)) {
        return false;
      }

      if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
        return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
      }

      if (typeof a.equals === 'function' || typeof b.equals === 'function') {
        return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
      }

      switch (typeA) {
        case 'Arguments':
        case 'Array':
        case 'Object':
          if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
            return a === b;
          }

          break;

        case 'Boolean':
        case 'Number':
        case 'String':
          if (!(typeof a === typeof b && _objectIs$1(a.valueOf(), b.valueOf()))) {
            return false;
          }

          break;

        case 'Date':
          if (!_objectIs$1(a.valueOf(), b.valueOf())) {
            return false;
          }

          break;

        case 'Error':
          return a.name === b.name && a.message === b.message;

        case 'RegExp':
          if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
            return false;
          }

          break;
      }

      var idx = stackA.length - 1;

      while (idx >= 0) {
        if (stackA[idx] === a) {
          return stackB[idx] === b;
        }

        idx -= 1;
      }

      switch (typeA) {
        case 'Map':
          if (a.size !== b.size) {
            return false;
          }

          return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));

        case 'Set':
          if (a.size !== b.size) {
            return false;
          }

          return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));

        case 'Arguments':
        case 'Array':
        case 'Object':
        case 'Boolean':
        case 'Number':
        case 'String':
        case 'Date':
        case 'Error':
        case 'RegExp':
        case 'Int8Array':
        case 'Uint8Array':
        case 'Uint8ClampedArray':
        case 'Int16Array':
        case 'Uint16Array':
        case 'Int32Array':
        case 'Uint32Array':
        case 'Float32Array':
        case 'Float64Array':
        case 'ArrayBuffer':
          break;

        default:
          // Values of other types are only equal if identical.
          return false;
      }

      var keysA = keys(a);

      if (keysA.length !== keys(b).length) {
        return false;
      }

      var extendedStackA = stackA.concat([a]);
      var extendedStackB = stackB.concat([b]);
      idx = keysA.length - 1;

      while (idx >= 0) {
        var key = keysA[idx];

        if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
          return false;
        }

        idx -= 1;
      }

      return true;
    }

    /**
     * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
     * cyclical data structures.
     *
     * Dispatches symmetrically to the `equals` methods of both arguments, if
     * present.
     *
     * @func
     * @memberOf R
     * @since v0.15.0
     * @category Relation
     * @sig a -> b -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @example
     *
     *      R.equals(1, 1); //=> true
     *      R.equals(1, '1'); //=> false
     *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
     *
     *      const a = {}; a.v = a;
     *      const b = {}; b.v = b;
     *      R.equals(a, b); //=> true
     */

    var equals =
    /*#__PURE__*/
    _curry2(function equals(a, b) {
      return _equals(a, b, [], []);
    });

    function _filter(fn, list) {
      var idx = 0;
      var len = list.length;
      var result = [];

      while (idx < len) {
        if (fn(list[idx])) {
          result[result.length] = list[idx];
        }

        idx += 1;
      }

      return result;
    }

    function _isObject(x) {
      return Object.prototype.toString.call(x) === '[object Object]';
    }

    var XFilter =
    /*#__PURE__*/
    function () {
      function XFilter(f, xf) {
        this.xf = xf;
        this.f = f;
      }

      XFilter.prototype['@@transducer/init'] = _xfBase.init;
      XFilter.prototype['@@transducer/result'] = _xfBase.result;

      XFilter.prototype['@@transducer/step'] = function (result, input) {
        return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
      };

      return XFilter;
    }();

    var _xfilter =
    /*#__PURE__*/
    _curry2(function _xfilter(f, xf) {
      return new XFilter(f, xf);
    });

    /**
     * Takes a predicate and a `Filterable`, and returns a new filterable of the
     * same type containing the members of the given filterable which satisfy the
     * given predicate. Filterable objects include plain objects or any object
     * that has a filter method such as `Array`.
     *
     * Dispatches to the `filter` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig Filterable f => (a -> Boolean) -> f a -> f a
     * @param {Function} pred
     * @param {Array} filterable
     * @return {Array} Filterable
     * @see R.reject, R.transduce, R.addIndex
     * @example
     *
     *      const isEven = n => n % 2 === 0;
     *
     *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
     *
     *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
     */

    var filter =
    /*#__PURE__*/
    _curry2(
    /*#__PURE__*/
    _dispatchable(['fantasy-land/filter', 'filter'], _xfilter, function (pred, filterable) {
      return _isObject(filterable) ? _reduce(function (acc, key) {
        if (pred(filterable[key])) {
          acc[key] = filterable[key];
        }

        return acc;
      }, {}, keys(filterable)) : // else
      _filter(pred, filterable);
    }));

    var filter$1 = filter;

    /**
     * Returns the first argument if it is truthy, otherwise the second argument.
     * Acts as the boolean `or` statement if both inputs are `Boolean`s.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Logic
     * @sig a -> b -> a | b
     * @param {Any} a
     * @param {Any} b
     * @return {Any}
     * @see R.either, R.and
     * @example
     *
     *      R.or(true, true); //=> true
     *      R.or(true, false); //=> true
     *      R.or(false, true); //=> true
     *      R.or(false, false); //=> false
     */

    var or =
    /*#__PURE__*/
    _curry2(function or(a, b) {
      return a || b;
    });

    /**
     * A function wrapping calls to the two functions in an `||` operation,
     * returning the result of the first function if it is truth-y and the result
     * of the second function otherwise. Note that this is short-circuited,
     * meaning that the second function will not be invoked if the first returns a
     * truth-y value.
     *
     * In addition to functions, `R.either` also accepts any fantasy-land compatible
     * applicative functor.
     *
     * @func
     * @memberOf R
     * @since v0.12.0
     * @category Logic
     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
     * @param {Function} f a predicate
     * @param {Function} g another predicate
     * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
     * @see R.both, R.or
     * @example
     *
     *      const gt10 = x => x > 10;
     *      const even = x => x % 2 === 0;
     *      const f = R.either(gt10, even);
     *      f(101); //=> true
     *      f(8); //=> true
     *
     *      R.either(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(55)
     *      R.either([false, false, 'a'], [11]) // => [11, 11, "a"]
     */

    var either =
    /*#__PURE__*/
    _curry2(function either(f, g) {
      return _isFunction(f) ? function _either() {
        return f.apply(this, arguments) || g.apply(this, arguments);
      } : lift(or)(f, g);
    });

    var either$1 = either;

    /**
     * Tests whether or not an object is a typed array.
     *
     * @private
     * @param {*} val The object to test.
     * @return {Boolean} `true` if `val` is a typed array, `false` otherwise.
     * @example
     *
     *      _isTypedArray(new Uint8Array([])); //=> true
     *      _isTypedArray(new Float32Array([])); //=> true
     *      _isTypedArray([]); //=> false
     *      _isTypedArray(null); //=> false
     *      _isTypedArray({}); //=> false
     */
    function _isTypedArray(val) {
      var type = Object.prototype.toString.call(val);
      return type === '[object Uint8ClampedArray]' || type === '[object Int8Array]' || type === '[object Uint8Array]' || type === '[object Int16Array]' || type === '[object Uint16Array]' || type === '[object Int32Array]' || type === '[object Uint32Array]' || type === '[object Float32Array]' || type === '[object Float64Array]' || type === '[object BigInt64Array]' || type === '[object BigUint64Array]';
    }

    /**
     * Returns the empty value of its argument's type. Ramda defines the empty
     * value of Array (`[]`), Object (`{}`), String (`''`),
     * TypedArray (`Uint8Array []`, `Float32Array []`, etc), and Arguments. Other
     * types are supported if they define `<Type>.empty`,
     * `<Type>.prototype.empty` or implement the
     * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
     *
     * Dispatches to the `empty` method of the first argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category Function
     * @sig a -> a
     * @param {*} x
     * @return {*}
     * @example
     *
     *      R.empty(Just(42));               //=> Nothing()
     *      R.empty([1, 2, 3]);              //=> []
     *      R.empty('unicorns');             //=> ''
     *      R.empty({x: 1, y: 2});           //=> {}
     *      R.empty(Uint8Array.from('123')); //=> Uint8Array []
     */

    var empty =
    /*#__PURE__*/
    _curry1(function empty(x) {
      return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
        return arguments;
      }() : _isTypedArray(x) ? x.constructor.from('') : void 0 // else
      ;
    });

    var XFind =
    /*#__PURE__*/
    function () {
      function XFind(f, xf) {
        this.xf = xf;
        this.f = f;
        this.found = false;
      }

      XFind.prototype['@@transducer/init'] = _xfBase.init;

      XFind.prototype['@@transducer/result'] = function (result) {
        if (!this.found) {
          result = this.xf['@@transducer/step'](result, void 0);
        }

        return this.xf['@@transducer/result'](result);
      };

      XFind.prototype['@@transducer/step'] = function (result, input) {
        if (this.f(input)) {
          this.found = true;
          result = _reduced(this.xf['@@transducer/step'](result, input));
        }

        return result;
      };

      return XFind;
    }();

    var _xfind =
    /*#__PURE__*/
    _curry2(function _xfind(f, xf) {
      return new XFind(f, xf);
    });

    /**
     * Returns the first element of the list which matches the predicate, or
     * `undefined` if no element matches.
     *
     * Dispatches to the `find` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> a | undefined
     * @param {Function} fn The predicate function used to determine if the element is the
     *        desired one.
     * @param {Array} list The array to consider.
     * @return {Object} The element found, or `undefined`.
     * @see R.transduce
     * @example
     *
     *      const xs = [{a: 1}, {a: 2}, {a: 3}];
     *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
     *      R.find(R.propEq('a', 4))(xs); //=> undefined
     */

    var find =
    /*#__PURE__*/
    _curry2(
    /*#__PURE__*/
    _dispatchable(['find'], _xfind, function find(fn, list) {
      var idx = 0;
      var len = list.length;

      while (idx < len) {
        if (fn(list[idx])) {
          return list[idx];
        }

        idx += 1;
      }
    }));

    var find$1 = find;

    /**
     * Creates a function that will process either the `onTrue` or the `onFalse`
     * function depending upon the result of the `condition` predicate.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Logic
     * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
     * @param {Function} condition A predicate function
     * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
     * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
     * @return {Function} A new function that will process either the `onTrue` or the `onFalse`
     *                    function depending upon the result of the `condition` predicate.
     * @see R.unless, R.when, R.cond
     * @example
     *
     *      const incCount = R.ifElse(
     *        R.has('count'),
     *        R.over(R.lensProp('count'), R.inc),
     *        R.assoc('count', 1)
     *      );
     *      incCount({ count: 1 }); //=> { count: 2 }
     *      incCount({});           //=> { count: 1 }
     */

    var ifElse =
    /*#__PURE__*/
    _curry3(function ifElse(condition, onTrue, onFalse) {
      return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
        return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
      });
    });

    var ifElse$1 = ifElse;

    /**
     * Returns `true` if the given value is its type's empty value; `false`
     * otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Logic
     * @sig a -> Boolean
     * @param {*} x
     * @return {Boolean}
     * @see R.empty
     * @example
     *
     *      R.isEmpty([1, 2, 3]);           //=> false
     *      R.isEmpty([]);                  //=> true
     *      R.isEmpty('');                  //=> true
     *      R.isEmpty(null);                //=> false
     *      R.isEmpty({});                  //=> true
     *      R.isEmpty({length: 0});         //=> false
     *      R.isEmpty(Uint8Array.from('')); //=> true
     */

    var isEmpty =
    /*#__PURE__*/
    _curry1(function isEmpty(x) {
      return x != null && equals(x, empty(x));
    });

    var isEmpty$1 = isEmpty;

    function _createPartialApplicator(concat) {
      return _curry2(function (fn, args) {
        return _arity(Math.max(0, fn.length - args.length), function () {
          return fn.apply(this, concat(args, arguments));
        });
      });
    }

    /**
     * Takes a function `f` and a list of arguments, and returns a function `g`.
     * When applied, `g` returns the result of applying `f` to the arguments
     * provided initially followed by the arguments provided to `g`.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category Function
     * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
     * @param {Function} f
     * @param {Array} args
     * @return {Function}
     * @see R.partialRight, R.curry
     * @example
     *
     *      const multiply2 = (a, b) => a * b;
     *      const double = R.partial(multiply2, [2]);
     *      double(3); //=> 6
     *
     *      const greet = (salutation, title, firstName, lastName) =>
     *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
     *
     *      const sayHello = R.partial(greet, ['Hello']);
     *      const sayHelloToMs = R.partial(sayHello, ['Ms.']);
     *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
     * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
     */

    var partial =
    /*#__PURE__*/
    _createPartialApplicator(_concat);

    var partial$1 = partial;

    /**
     * Returns `true` if the specified object property is equal, in
     * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
     * You can test multiple properties with [`R.whereEq`](#whereEq).
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig String -> a -> Object -> Boolean
     * @param {String} name
     * @param {*} val
     * @param {*} obj
     * @return {Boolean}
     * @see R.whereEq, R.propSatisfies, R.equals
     * @example
     *
     *      const abby = {name: 'Abby', age: 7, hair: 'blond'};
     *      const fred = {name: 'Fred', age: 12, hair: 'brown'};
     *      const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
     *      const alois = {name: 'Alois', age: 15, disposition: 'surly'};
     *      const kids = [abby, fred, rusty, alois];
     *      const hasBrownHair = R.propEq('hair', 'brown');
     *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
     */

    var propEq =
    /*#__PURE__*/
    _curry3(function propEq(name, val, obj) {
      return equals(val, prop$1(name, obj));
    });

    var propEq$1 = propEq;

    /**
     * Returns `true` if the specified object property satisfies the given
     * predicate; `false` otherwise. You can test multiple properties with
     * [`R.where`](#where).
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category Logic
     * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
     * @param {Function} pred
     * @param {String} name
     * @param {*} obj
     * @return {Boolean}
     * @see R.where, R.propEq, R.propIs
     * @example
     *
     *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
     */

    var propSatisfies =
    /*#__PURE__*/
    _curry3(function propSatisfies(pred, name, obj) {
      return pred(prop$1(name, obj));
    });

    var propSatisfies$1 = propSatisfies;

    /**
     * Sorts the list according to the supplied function.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig Ord b => (a -> b) -> [a] -> [a]
     * @param {Function} fn
     * @param {Array} list The list to sort.
     * @return {Array} A new list sorted by the keys generated by `fn`.
     * @example
     *
     *      const sortByFirstItem = R.sortBy(R.prop(0));
     *      const pairs = [[-1, 1], [-2, 2], [-3, 3]];
     *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
     *
     *      const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
     *      const alice = {
     *        name: 'ALICE',
     *        age: 101
     *      };
     *      const bob = {
     *        name: 'Bob',
     *        age: -10
     *      };
     *      const clara = {
     *        name: 'clara',
     *        age: 314.159
     *      };
     *      const people = [clara, bob, alice];
     *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
     */

    var sortBy =
    /*#__PURE__*/
    _curry2(function sortBy(fn, list) {
      return Array.prototype.slice.call(list, 0).sort(function (a, b) {
        var aa = fn(a);
        var bb = fn(b);
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
    });

    var sortBy$1 = sortBy;

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const STORAGE_KEY$1 = "settings";

    const settings = writable(
      {
        selectedCharacterId: null,
        newCharacter: false,
        menuOpen: false,
      },
      (set) => {
        const settings = JSON.parse(localStorage.getItem(STORAGE_KEY$1) || "{}");
        set({ ...settings, menuOpen: false });

        return (a, b, c, d) => console.log("settings sub", a, b, c, d);
      }
    );

    settings.subscribe((settings) => {
      localStorage.setItem(STORAGE_KEY$1, JSON.stringify(settings));
    });

    const STORAGE_KEY = "character:";

    const character = writable({}, (set) => {
      const { selectedCharacterId } = JSON.parse(
        localStorage.getItem("settings") || "{}"
      );

      if (selectedCharacterId !== undefined) {
        set(
          JSON.parse(
            localStorage.getItem(`${STORAGE_KEY}${selectedCharacterId}`) || "{}"
          )
        );
      }

      return (a, b, c, d) => console.log("nomoresubs", a, b, c, d);
    });

    // More events ... perhaps a way to push changes when the local stops changing
    character.subscribe((value) => {
      const { id } = value;
      localStorage.setItem(`${STORAGE_KEY}${id}`, JSON.stringify(value));
    });

    //
    const toggleEquip = (itemId) => (value) => {
      const { _id, equipped } = value;

      return { ...value, equipped: itemId === _id ? !equipped : equipped };
    };

    //
    const equip = (itemId) =>
      character.update((currentCharacter) => {
        const { equipment } = currentCharacter;

        return {
          ...currentCharacter,
          equipment: map(toggleEquip(itemId), equipment),
        };
      });

    // ARMOR
    // TODO: This method need to check for out of bounds
    const setArmorTier = (itemId, currentTier) =>
      character.update((currentCharacter) => {
        const equipment = currentCharacter.equipment.map((eq) =>
          eq._id === itemId ? { ...eq, currentTier } : eq
        );

        return {
          ...currentCharacter,
          equipment,
        };
      });

    // Weapons
    const breakWeapon = (itemId) =>
      character.update((currentCharacter) => {
        const equipment = currentCharacter.equipment.map((eq) =>
          eq._id !== itemId ? eq : { ...eq, broken: true }
        );

        return {
          ...currentCharacter,
          equipment,
        };
      });

    // HP Helpers
    const incrementHp = () =>
      character.update((currentCharacter) => {
        const { current, maximum } = currentCharacter.hitpoints;

        return current < maximum
          ? {
              ...currentCharacter,
              hitpoints: {
                current: current + 1,
                maximum,
              },
            }
          : currentCharacter;
      });

    const addHealth = (hp) =>
      character.update((oldState) => {
        const { current, maximum } = oldState.hitpoints;

        return {
          ...oldState,
          hitpoints: {
            current: clamp$1(1, maximum, current + hp),
            maximum,
          },
        };
      });

    const decrementHp = () =>
      character.update((currentCharacter) => {
        const { current, maximum } = currentCharacter.hitpoints;

        return {
          ...currentCharacter,
          hitpoints: {
            current: current - 1,
            maximum,
          },
        };
      });

    const decrementOmens = () =>
      character.update((currentCharacter) => {
        const { current, die, maximum } = currentCharacter.omens;

        return current > 1
          ? {
              ...currentCharacter,
              omens: {
                current: current - 1,
                die,
                maximum,
              },
            }
          : {
              ...currentCharacter,
              omens: {
                current: 0,
                die,
                maximum,
              },
            };
      });

    // Powers
    const incrementPowers = () =>
      character.update((currentCharacter) => {
        const { powers = 0 } = currentCharacter;

        return {
          ...currentCharacter,
          powers: powers === 4 ? 4 : powers + 1,
        };
      });

    const decrementPowers = () =>
      character.update((currentCharacter) => {
        const { powers = 0 } = currentCharacter;

        return {
          ...currentCharacter,
          powers: powers === 0 ? 0 : powers - 1,
        };
      });

    // EQUIPMENT
    const dropEquipment = (index) =>
      character.update((currentCharacter) => {
        const { equipment } = currentCharacter;

        return {
          ...currentCharacter,
          equipment: equipment.filter((value, i) => i !== index),
        };
      });

    const subtractEquipment = (id) =>
      character.update((oldState) => {
        const { equipment } = oldState;

        const updatedEquipment = equipment.reduce((acc, eq) => {
          if (eq._id !== id) return acc.concat(eq);

          const nextQ = eq.quantity - 1;

          return nextQ === 0 ? acc : acc.concat({ ...eq, quantity: nextQ });
        }, []);

        return {
          ...oldState,
          equipment: updatedEquipment,
        };
      });

    const addEquipment = (id) =>
      character.update((oldState) => {
        const { equipment } = oldState;

        const updatedEquipment = equipment.map((eq) => {
          if (eq._id !== id) return eq;

          const nextQ = eq.quantity + 1;

          return nextQ * eq.weight <= 100 ? { ...eq, quantity: nextQ } : acc;
        });

        return {
          ...oldState,
          equipment: updatedEquipment,
        };
      });

    const setSilver = (num) =>
      character.update((oldState) => {
        const { silver } = oldState;
        const nextSilver = silver + num;

        return {
          ...oldState,
          silver: nextSilver,
        };
      });

    const symbol = (score) =>
      score === 0 ? `±${score}` : score > 0 ? `+${score}` : score;

    // Rolling
    // const validRollString = /^\d+d\d{1,3}[+-x]?\d+$/;
    // const rollString = "2d6x10";
    // const tupleDice = [2, "d", 6, "x", 10]; // a.k.a. roll formula

    const roll = (d) => Math.floor(Math.random() * d) + 1;

    const rollFormula = ([number, , die, operation, modifier]) => {
      let r = 0;

      for (let i = 0; i < number; i++) {
        r += roll(die);
      }

      switch (operation) {
        case "+":
          r += modifier;
          break;
        case "-":
          r -= modifier;
          break;
        case "x":
          r *= modifier;
          break;
      }

      return r;
    };

    const toInt = (str) => parseInt(str, 10);
    const numOrZero = (x) => (isNaN(x) ? 0 : x);

    compose(numOrZero, toInt);

    const toInboundsIndex = (num) => (num === -1 ? Infinity : num);

    const parseRollString = (rs) => {
      const dieIndex = rs.indexOf("d");
      let modIndex = toInboundsIndex(rs.search(/[-x\+]/));
      let modNext = modIndex + 1;

      const roll = [
        toInt(rs.slice(0, dieIndex)),
        "d",
        toInt(rs.slice(dieIndex + 1, modIndex)),
      ];

      return modIndex === Infinity
        ? roll
        : [...roll, rs.slice(modIndex, modNext), toInt(rs.slice(modNext))];
    };

    const rollString = compose(rollFormula, parseRollString);

    compose(prop$1(2), parseRollString);

    const alertRoll = (dr, score) => (roll) => {
      const total = roll + score;
      const hit = total >= dr ? "Hits" : "Misses";

      alert(`D20 ${roll} + ${score} = ${total}; ${hit} DR${dr}`);
    };

    /* src/components/Buttons/RollButton.svelte generated by Svelte v3.46.4 */
    const file$j = "src/components/Buttons/RollButton.svelte";

    // (11:91) {diceString}
    function fallback_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*diceString*/ ctx[0]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*diceString*/ 1) set_data_dev(t, /*diceString*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(11:91) {diceString}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "roll-button svelte-1j9bcfm");
    			button.disabled = /*disabled*/ ctx[1];
    			add_location(button, file$j, 10, 0, 231);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*handleClick*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*diceString*/ 1)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			if (!current || dirty & /*disabled*/ 2) {
    				prop_dev(button, "disabled", /*disabled*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RollButton', slots, ['default']);
    	let { diceString = "" } = $$props;

    	let { onRoll = roll => {
    		
    	} } = $$props;

    	let { disabled = false } = $$props;
    	const handleClick = () => onRoll(rollString(diceString));
    	const writable_props = ['diceString', 'onRoll', 'disabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RollButton> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('diceString' in $$props) $$invalidate(0, diceString = $$props.diceString);
    		if ('onRoll' in $$props) $$invalidate(3, onRoll = $$props.onRoll);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		rollString,
    		diceString,
    		onRoll,
    		disabled,
    		handleClick
    	});

    	$$self.$inject_state = $$props => {
    		if ('diceString' in $$props) $$invalidate(0, diceString = $$props.diceString);
    		if ('onRoll' in $$props) $$invalidate(3, onRoll = $$props.onRoll);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [diceString, disabled, handleClick, onRoll, $$scope, slots];
    }

    class RollButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, { diceString: 0, onRoll: 3, disabled: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RollButton",
    			options,
    			id: create_fragment$k.name
    		});
    	}

    	get diceString() {
    		throw new Error("<RollButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set diceString(value) {
    		throw new Error("<RollButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onRoll() {
    		throw new Error("<RollButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onRoll(value) {
    		throw new Error("<RollButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<RollButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<RollButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/CharacterSheet/Scores.svelte generated by Svelte v3.46.4 */
    const file$i = "src/components/CharacterSheet/Scores.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (20:8) <RollButton             diceString="1d20"             onRoll={alertRoll(tests[score], abilities[score])}         >
    function create_default_slot_3(ctx) {
    	let t0;
    	let t1_value = /*tests*/ ctx[1][/*score*/ ctx[4]] + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("test ");
    			t1 = text(t1_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(20:8) <RollButton             diceString=\\\"1d20\\\"             onRoll={alertRoll(tests[score], abilities[score])}         >",
    		ctx
    	});

    	return block;
    }

    // (40:39) 
    function create_if_block_2$1(ctx) {
    	let rollbutton;
    	let current;

    	rollbutton = new RollButton({
    			props: {
    				diceString: "1d20",
    				onRoll: alertRoll(/*tests*/ ctx[1].ranged, /*abilities*/ ctx[2][/*score*/ ctx[4]]),
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(rollbutton.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(rollbutton, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const rollbutton_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				rollbutton_changes.$$scope = { dirty, ctx };
    			}

    			rollbutton.$set(rollbutton_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rollbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rollbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(rollbutton, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(40:39) ",
    		ctx
    	});

    	return block;
    }

    // (33:38) 
    function create_if_block_1$3(ctx) {
    	let rollbutton;
    	let current;

    	rollbutton = new RollButton({
    			props: {
    				diceString: "1d20",
    				onRoll: alertRoll(/*tests*/ ctx[1].defence, /*abilities*/ ctx[2][/*score*/ ctx[4]]),
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(rollbutton.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(rollbutton, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const rollbutton_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				rollbutton_changes.$$scope = { dirty, ctx };
    			}

    			rollbutton.$set(rollbutton_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rollbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rollbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(rollbutton, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(33:38) ",
    		ctx
    	});

    	return block;
    }

    // (26:8) {#if score === "strength"}
    function create_if_block$6(ctx) {
    	let rollbutton;
    	let current;

    	rollbutton = new RollButton({
    			props: {
    				diceString: "1d20",
    				onRoll: alertRoll(/*tests*/ ctx[1].melee, /*abilities*/ ctx[2][/*score*/ ctx[4]]),
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(rollbutton.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(rollbutton, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const rollbutton_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				rollbutton_changes.$$scope = { dirty, ctx };
    			}

    			rollbutton.$set(rollbutton_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rollbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rollbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(rollbutton, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(26:8) {#if score === \\\"strength\\\"}",
    		ctx
    	});

    	return block;
    }

    // (41:8) <RollButton             diceString="1d20"             onRoll={alertRoll(tests.ranged, abilities[score])}         >
    function create_default_slot_2(ctx) {
    	let t0;
    	let t1_value = /*tests*/ ctx[1].ranged + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("ranged ");
    			t1 = text(t1_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(41:8) <RollButton             diceString=\\\"1d20\\\"             onRoll={alertRoll(tests.ranged, abilities[score])}         >",
    		ctx
    	});

    	return block;
    }

    // (34:8) <RollButton             diceString="1d20"             onRoll={alertRoll(tests.defence, abilities[score])}         >
    function create_default_slot_1(ctx) {
    	let t0;
    	let t1_value = /*tests*/ ctx[1].defence + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("defense ");
    			t1 = text(t1_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(34:8) <RollButton             diceString=\\\"1d20\\\"             onRoll={alertRoll(tests.defence, abilities[score])}         >",
    		ctx
    	});

    	return block;
    }

    // (27:8) <RollButton             diceString="1d20"             onRoll={alertRoll(tests.melee, abilities[score])}         >
    function create_default_slot$6(ctx) {
    	let t0;
    	let t1_value = /*tests*/ ctx[1].melee + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("melee ");
    			t1 = text(t1_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(27:8) <RollButton             diceString=\\\"1d20\\\"             onRoll={alertRoll(tests.melee, abilities[score])}         >",
    		ctx
    	});

    	return block;
    }

    // (12:4) {#each SCORES as score }
    function create_each_block$3(ctx) {
    	let div2;
    	let div0;
    	let t0_value = /*score*/ ctx[4] + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = symbol(/*abilities*/ ctx[2][/*score*/ ctx[4]]) + "";
    	let t2;
    	let t3;
    	let rollbutton;
    	let t4;
    	let current_block_type_index;
    	let if_block;
    	let t5;
    	let current;

    	rollbutton = new RollButton({
    			props: {
    				diceString: "1d20",
    				onRoll: alertRoll(/*tests*/ ctx[1][/*score*/ ctx[4]], /*abilities*/ ctx[2][/*score*/ ctx[4]]),
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const if_block_creators = [create_if_block$6, create_if_block_1$3, create_if_block_2$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*score*/ ctx[4] === "strength") return 0;
    		if (/*score*/ ctx[4] === "agility") return 1;
    		if (/*score*/ ctx[4] === "presence") return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			create_component(rollbutton.$$.fragment);
    			t4 = space();
    			if (if_block) if_block.c();
    			t5 = space();
    			attr_dev(div0, "class", "score-name");
    			add_location(div0, file$i, 13, 8, 397);
    			attr_dev(div1, "class", "score");
    			add_location(div1, file$i, 16, 8, 465);
    			attr_dev(div2, "class", "score-wrapper svelte-1h6nalv");
    			add_location(div2, file$i, 12, 4, 361);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, t2);
    			append_dev(div2, t3);
    			mount_component(rollbutton, div2, null);
    			append_dev(div2, t4);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div2, null);
    			}

    			append_dev(div2, t5);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const rollbutton_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				rollbutton_changes.$$scope = { dirty, ctx };
    			}

    			rollbutton.$set(rollbutton_changes);
    			if (if_block) if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rollbutton.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rollbutton.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(rollbutton);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(12:4) {#each SCORES as score }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let div;
    	let current;
    	let each_value = /*SCORES*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "row row-padded r svelte-1h6nalv");
    			add_location(div, file$i, 10, 0, 297);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*alertRoll, tests, abilities, SCORES, symbol*/ 7) {
    				each_value = /*SCORES*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(3, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Scores', slots, []);
    	const SCORES = ['strength', 'agility', 'presence', 'toughness'];
    	const { tests, abilities } = $character;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Scores> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		character,
    		RollButton,
    		symbol,
    		alertRoll,
    		SCORES,
    		tests,
    		abilities,
    		$character
    	});

    	return [SCORES, tests, abilities];
    }

    class Scores extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scores",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* src/components/Defense.svelte generated by Svelte v3.46.4 */
    const file$h = "src/components/Defense.svelte";

    // (18:4) <RollButton diceString="1d20" onRoll={alertRoll(tests.defence, abilities.agility)}>
    function create_default_slot$5(ctx) {
    	let t0;
    	let t1_value = /*tests*/ ctx[0].defence + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("Defence 1d20 + Agility vs ");
    			t1 = text(t1_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(18:4) <RollButton diceString=\\\"1d20\\\" onRoll={alertRoll(tests.defence, abilities.agility)}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let div;
    	let rollbutton;
    	let current;

    	rollbutton = new RollButton({
    			props: {
    				diceString: "1d20",
    				onRoll: /*alertRoll*/ ctx[2](/*tests*/ ctx[0].defence, /*abilities*/ ctx[1].agility),
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(rollbutton.$$.fragment);
    			add_location(div, file$h, 16, 0, 400);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(rollbutton, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const rollbutton_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				rollbutton_changes.$$scope = { dirty, ctx };
    			}

    			rollbutton.$set(rollbutton_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rollbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rollbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(rollbutton);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(3, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Defense', slots, []);
    	const { tests, abilities } = $character;

    	// 
    	const alertRoll = (dr, score) => roll => {
    		const total = roll + score;
    		const hit = total >= dr ? 'Hits' : 'Misses';
    		alert(`D20 ${roll} + ${score} = ${total}; ${hit} DR${dr}`);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Defense> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		character,
    		RollButton,
    		tests,
    		abilities,
    		alertRoll,
    		$character
    	});

    	return [tests, abilities, alertRoll];
    }

    class Defense extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Defense",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src/components/SlideIn.svelte generated by Svelte v3.46.4 */
    const file$g = "src/components/SlideIn.svelte";

    function create_fragment$h(ctx) {
    	let div1;
    	let button;
    	let t1;
    	let div0;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			button = element("button");
    			button.textContent = "close";
    			t1 = space();
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "close svelte-1tzls3z");
    			add_location(button, file$g, 22, 4, 599);
    			attr_dev(div0, "class", "content svelte-1tzls3z");
    			add_location(div0, file$g, 29, 4, 716);
    			attr_dev(div1, "class", "modal svelte-1tzls3z");
    			set_style(div1, "transform", /*show*/ ctx[0] ? 'translate3d(0, 0, 0)' : '', false);
    			add_location(div1, file$g, 18, 0, 513);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, button);
    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*onClose*/ ctx[1])) /*onClose*/ ctx[1].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (dirty & /*show*/ 1) {
    				set_style(div1, "transform", /*show*/ ctx[0] ? 'translate3d(0, 0, 0)' : '', false);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SlideIn', slots, ['default']);
    	let { show = false } = $$props;

    	let { onClose = () => {
    		
    	} } = $$props;

    	const handleKeydown = e => e.key === "Escape" ? onClose() : null;

    	afterUpdate(() => {
    		if (show) {
    			document.body.addEventListener('keydown', handleKeydown);
    		} else {
    			document.body.removeEventListener('keydown', handleKeydown);
    		}
    	});

    	onDestroy(() => document.body.removeEventListener('keydown', handleKeydown));
    	const writable_props = ['show', 'onClose'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SlideIn> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		afterUpdate,
    		onDestroy,
    		show,
    		onClose,
    		handleKeydown
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [show, onClose, $$scope, slots];
    }

    class SlideIn extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { show: 0, onClose: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SlideIn",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get show() {
    		throw new Error("<SlideIn>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<SlideIn>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onClose() {
    		throw new Error("<SlideIn>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClose(value) {
    		throw new Error("<SlideIn>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/CharacterSheet/Rest.svelte generated by Svelte v3.46.4 */
    const file$f = "src/components/CharacterSheet/Rest.svelte";

    // (49:0) <SlideIn show={show} onClose={onClose}>
    function create_default_slot$4(ctx) {
    	let div0;
    	let p0;
    	let t0;
    	let button0;
    	let t1;
    	let button0_disabled_value;
    	let t2;
    	let t3;
    	let div1;
    	let p1;
    	let t4;
    	let button1;
    	let t5;
    	let button1_disabled_value;
    	let t6;
    	let t7;
    	let button2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			p0 = element("p");
    			t0 = text("Catch your breath, \n      ");
    			button0 = element("button");
    			t1 = text("have a drink\n      ");
    			t2 = text(". Restore d4 HP.");
    			t3 = space();
    			div1 = element("div");
    			p1 = element("p");
    			t4 = text("A\n      ");
    			button1 = element("button");
    			t5 = text("full night’s sleep");
    			t6 = text("\n       restores d6 HP.");
    			t7 = space();
    			button2 = element("button");
    			button2.textContent = "Cancel";
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "mb0");
    			button0.disabled = button0_disabled_value = /*isInfected*/ ctx[4] || /*water*/ ctx[3].quantity === 0;
    			add_location(button0, file$f, 52, 6, 1326);
    			add_location(p0, file$f, 50, 4, 1290);
    			attr_dev(div0, "class", "svelte-i61tr3");
    			toggle_class(div0, "s", /*isInfected*/ ctx[4] || /*water*/ ctx[3].quantity === 0);
    			add_location(div0, file$f, 49, 2, 1235);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "mb0");
    			button1.disabled = button1_disabled_value = /*isInfected*/ ctx[4] || /*food*/ ctx[2].quantity === 0;
    			add_location(button1, file$f, 65, 6, 1621);
    			add_location(p1, file$f, 63, 4, 1603);
    			attr_dev(div1, "class", "svelte-i61tr3");
    			toggle_class(div1, "s", /*isInfected*/ ctx[4] || /*food*/ ctx[2].quantity === 0);
    			add_location(div1, file$f, 62, 2, 1549);
    			attr_dev(button2, "type", "button");
    			add_location(button2, file$f, 76, 2, 1858);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, p0);
    			append_dev(p0, t0);
    			append_dev(p0, button0);
    			append_dev(button0, t1);
    			append_dev(p0, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p1);
    			append_dev(p1, t4);
    			append_dev(p1, button1);
    			append_dev(button1, t5);
    			append_dev(p1, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, button2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						button0,
    						"click",
    						function () {
    							if (is_function(/*onRestClick*/ ctx[5](/*water*/ ctx[3]))) /*onRestClick*/ ctx[5](/*water*/ ctx[3]).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						button1,
    						"click",
    						function () {
    							if (is_function(/*onSleepClick*/ ctx[6](/*food*/ ctx[2]))) /*onSleepClick*/ ctx[6](/*food*/ ctx[2]).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						button2,
    						"click",
    						function () {
    							if (is_function(/*onClose*/ ctx[1])) /*onClose*/ ctx[1].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*isInfected, water*/ 24 && button0_disabled_value !== (button0_disabled_value = /*isInfected*/ ctx[4] || /*water*/ ctx[3].quantity === 0)) {
    				prop_dev(button0, "disabled", button0_disabled_value);
    			}

    			if (dirty & /*isInfected, water*/ 24) {
    				toggle_class(div0, "s", /*isInfected*/ ctx[4] || /*water*/ ctx[3].quantity === 0);
    			}

    			if (dirty & /*isInfected, food*/ 20 && button1_disabled_value !== (button1_disabled_value = /*isInfected*/ ctx[4] || /*food*/ ctx[2].quantity === 0)) {
    				prop_dev(button1, "disabled", button1_disabled_value);
    			}

    			if (dirty & /*isInfected, food*/ 20) {
    				toggle_class(div1, "s", /*isInfected*/ ctx[4] || /*food*/ ctx[2].quantity === 0);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(button2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(49:0) <SlideIn show={show} onClose={onClose}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let slidein;
    	let current;

    	slidein = new SlideIn({
    			props: {
    				show: /*show*/ ctx[0],
    				onClose: /*onClose*/ ctx[1],
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(slidein.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(slidein, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const slidein_changes = {};
    			if (dirty & /*show*/ 1) slidein_changes.show = /*show*/ ctx[0];
    			if (dirty & /*onClose*/ 2) slidein_changes.onClose = /*onClose*/ ctx[1];

    			if (dirty & /*$$scope, onClose, isInfected, food, water*/ 2078) {
    				slidein_changes.$$scope = { dirty, ctx };
    			}

    			slidein.$set(slidein_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slidein.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slidein.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(slidein, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let isInfected;
    	let water;
    	let food;
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(7, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Rest', slots, []);
    	let { show = false } = $$props;

    	let { onClose = () => {
    		
    	} } = $$props;

    	// Helpers
    	const emptyQ = ifElse$1(isNil$1, always$1({ quantity: 0 }), identity$1);

    	const getWater = compose(emptyQ, head$1, filter$1(propEq$1('name', 'Waterskin')));
    	const getFood = compose(emptyQ, head$1, sortBy$1(prop$1('quantity')), filter$1(either$1(propEq$1('name', 'Dried food'), propEq$1('name', 'Lard'))));

    	// Handlers
    	const onRestClick = ({ _id }) => {
    		subtractEquipment(_id);
    		const heal = rollString('1d4');
    		alert(`Healing ${heal} points`);
    		addHealth(heal);
    		onClose();
    	};

    	const onSleepClick = ({ _id }) => {
    		subtractEquipment(_id);
    		const heal = rollString('1d6');
    		alert(`Healing ${heal} points`);
    		addHealth(heal);
    		onClose();
    	};

    	const writable_props = ['show', 'onClose'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Rest> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
    	};

    	$$self.$capture_state = () => ({
    		always: always$1,
    		compose,
    		either: either$1,
    		filter: filter$1,
    		head: head$1,
    		identity: identity$1,
    		ifElse: ifElse$1,
    		isNil: isNil$1,
    		prop: prop$1,
    		propEq: propEq$1,
    		sortBy: sortBy$1,
    		SlideIn,
    		character,
    		subtractEquipment,
    		addHealth,
    		rollString,
    		show,
    		onClose,
    		emptyQ,
    		getWater,
    		getFood,
    		onRestClick,
    		onSleepClick,
    		food,
    		water,
    		isInfected,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
    		if ('food' in $$props) $$invalidate(2, food = $$props.food);
    		if ('water' in $$props) $$invalidate(3, water = $$props.water);
    		if ('isInfected' in $$props) $$invalidate(4, isInfected = $$props.isInfected);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$character*/ 128) {
    			$$invalidate(4, isInfected = !!$character.infected);
    		}

    		if ($$self.$$.dirty & /*$character*/ 128) {
    			$$invalidate(3, water = getWater($character.equipment));
    		}

    		if ($$self.$$.dirty & /*$character*/ 128) {
    			$$invalidate(2, food = getFood($character.equipment));
    		}
    	};

    	return [show, onClose, food, water, isInfected, onRestClick, onSleepClick, $character];
    }

    class Rest extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { show: 0, onClose: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Rest",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get show() {
    		throw new Error("<Rest>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Rest>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onClose() {
    		throw new Error("<Rest>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClose(value) {
    		throw new Error("<Rest>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/CharacterSheet/Miseries.svelte generated by Svelte v3.46.4 */

    const file$e = "src/components/CharacterSheet/Miseries.svelte";

    function create_fragment$f(ctx) {
    	let div;
    	let t0;
    	let button0;
    	let t2;
    	let button1;
    	let t4;
    	let button2;
    	let t6;
    	let button3;
    	let t8;
    	let button4;
    	let t10;
    	let button5;
    	let t12;
    	let button6;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Miseries:\n    ");
    			button0 = element("button");
    			button0.textContent = "1";
    			t2 = space();
    			button1 = element("button");
    			button1.textContent = "2";
    			t4 = space();
    			button2 = element("button");
    			button2.textContent = "3";
    			t6 = space();
    			button3 = element("button");
    			button3.textContent = "4";
    			t8 = space();
    			button4 = element("button");
    			button4.textContent = "5";
    			t10 = space();
    			button5 = element("button");
    			button5.textContent = "6";
    			t12 = space();
    			button6 = element("button");
    			button6.textContent = "7";
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "misery-button svelte-1lxwhwi");
    			attr_dev(button0, "title", "Misery 1");
    			add_location(button0, file$e, 1, 4, 36);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "misery-button svelte-1lxwhwi");
    			attr_dev(button1, "title", "Misery 2");
    			add_location(button1, file$e, 2, 4, 112);
    			attr_dev(button2, "type", "button");
    			attr_dev(button2, "class", "misery-button svelte-1lxwhwi");
    			attr_dev(button2, "title", "Misery 3");
    			add_location(button2, file$e, 3, 4, 188);
    			attr_dev(button3, "type", "button");
    			attr_dev(button3, "class", "misery-button svelte-1lxwhwi");
    			attr_dev(button3, "title", "Misery 4");
    			add_location(button3, file$e, 4, 4, 264);
    			attr_dev(button4, "type", "button");
    			attr_dev(button4, "class", "misery-button svelte-1lxwhwi");
    			attr_dev(button4, "title", "Misery 5");
    			add_location(button4, file$e, 5, 4, 340);
    			attr_dev(button5, "type", "button");
    			attr_dev(button5, "class", "misery-button svelte-1lxwhwi");
    			attr_dev(button5, "title", "Misery 6");
    			add_location(button5, file$e, 6, 4, 416);
    			attr_dev(button6, "type", "button");
    			attr_dev(button6, "class", "misery-button svelte-1lxwhwi");
    			attr_dev(button6, "title", "Misery 7");
    			add_location(button6, file$e, 7, 4, 492);
    			attr_dev(div, "class", "miseries svelte-1lxwhwi");
    			add_location(div, file$e, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, button0);
    			append_dev(div, t2);
    			append_dev(div, button1);
    			append_dev(div, t4);
    			append_dev(div, button2);
    			append_dev(div, t6);
    			append_dev(div, button3);
    			append_dev(div, t8);
    			append_dev(div, button4);
    			append_dev(div, t10);
    			append_dev(div, button5);
    			append_dev(div, t12);
    			append_dev(div, button6);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Miseries', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Miseries> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Miseries extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Miseries",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/components/Omens.svelte generated by Svelte v3.46.4 */
    const file$d = "src/components/Omens.svelte";

    // (14:0) <SlideIn show={show} onClose={onClose}>
    function create_default_slot$3(ctx) {
    	let div;
    	let t0;
    	let t1_value = /*$character*/ ctx[2]?.omens?.die + "";
    	let t1;
    	let t2;
    	let t3_value = (/*$character*/ ctx[2]?.omens?.current || 0) + "";
    	let t3;
    	let t4;
    	let p;
    	let t6;
    	let ul;
    	let li0;
    	let t8;
    	let li1;
    	let t10;
    	let li2;
    	let t12;
    	let li3;
    	let t14;
    	let li4;
    	let t16;
    	let button0;
    	let t18;
    	let button1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Omens: (");
    			t1 = text(t1_value);
    			t2 = text("/day); current (");
    			t3 = text(t3_value);
    			t4 = text(")\n        ");
    			p = element("p");
    			p.textContent = "Use omens to";
    			t6 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "deal maximum damage with one attack";
    			t8 = space();
    			li1 = element("li");
    			li1.textContent = "reroll, your dice or someone else's";
    			t10 = space();
    			li2 = element("li");
    			li2.textContent = "lower damage dealt to you by 1d6";
    			t12 = space();
    			li3 = element("li");
    			li3.textContent = "neutralize a crit or a fumble";
    			t14 = space();
    			li4 = element("li");
    			li4.textContent = "lower one test by DR -4";
    			t16 = space();
    			button0 = element("button");
    			button0.textContent = "Use";
    			t18 = space();
    			button1 = element("button");
    			button1.textContent = "Cancel";
    			add_location(p, file$d, 16, 8, 428);
    			add_location(li0, file$d, 18, 12, 473);
    			add_location(li1, file$d, 19, 12, 530);
    			add_location(li2, file$d, 20, 12, 587);
    			add_location(li3, file$d, 21, 12, 641);
    			add_location(li4, file$d, 22, 12, 692);
    			add_location(ul, file$d, 17, 8, 456);
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$d, 24, 8, 747);
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$d, 25, 8, 811);
    			add_location(div, file$d, 14, 4, 322);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    			append_dev(div, t3);
    			append_dev(div, t4);
    			append_dev(div, p);
    			append_dev(div, t6);
    			append_dev(div, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t8);
    			append_dev(ul, li1);
    			append_dev(ul, t10);
    			append_dev(ul, li2);
    			append_dev(ul, t12);
    			append_dev(ul, li3);
    			append_dev(ul, t14);
    			append_dev(ul, li4);
    			append_dev(div, t16);
    			append_dev(div, button0);
    			append_dev(div, t18);
    			append_dev(div, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*handleUse*/ ctx[3], false, false, false),
    					listen_dev(
    						button1,
    						"click",
    						function () {
    							if (is_function(/*onClose*/ ctx[1])) /*onClose*/ ctx[1].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*$character*/ 4 && t1_value !== (t1_value = /*$character*/ ctx[2]?.omens?.die + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*$character*/ 4 && t3_value !== (t3_value = (/*$character*/ ctx[2]?.omens?.current || 0) + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(14:0) <SlideIn show={show} onClose={onClose}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let slidein;
    	let current;

    	slidein = new SlideIn({
    			props: {
    				show: /*show*/ ctx[0],
    				onClose: /*onClose*/ ctx[1],
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(slidein.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(slidein, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const slidein_changes = {};
    			if (dirty & /*show*/ 1) slidein_changes.show = /*show*/ ctx[0];
    			if (dirty & /*onClose*/ 2) slidein_changes.onClose = /*onClose*/ ctx[1];

    			if (dirty & /*$$scope, onClose, $character*/ 22) {
    				slidein_changes.$$scope = { dirty, ctx };
    			}

    			slidein.$set(slidein_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slidein.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slidein.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(slidein, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(2, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Omens', slots, []);
    	let { show = false } = $$props;

    	let { onClose = () => {
    		
    	} } = $$props;

    	const handleUse = () => {
    		decrementOmens();
    		onClose();
    	};

    	const writable_props = ['show', 'onClose'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Omens> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
    	};

    	$$self.$capture_state = () => ({
    		SlideIn,
    		character,
    		decrementOmens,
    		show,
    		onClose,
    		handleUse,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [show, onClose, $character, handleUse];
    }

    class Omens extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { show: 0, onClose: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Omens",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get show() {
    		throw new Error("<Omens>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Omens>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onClose() {
    		throw new Error("<Omens>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClose(value) {
    		throw new Error("<Omens>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Powers.svelte generated by Svelte v3.46.4 */
    const file$c = "src/components/Powers.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (17:8) {#if scrolls.length > 0}
    function create_if_block$5(ctx) {
    	let ul;
    	let each_value = /*scrolls*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(ul, file$c, 17, 12, 770);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*scrolls*/ 8) {
    				each_value = /*scrolls*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(17:8) {#if scrolls.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (19:16) {#each scrolls as scroll}
    function create_each_block$2(ctx) {
    	let li;
    	let b;
    	let t0_value = /*scroll*/ ctx[4].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*scroll*/ ctx[4].description + "";
    	let t2;

    	const block = {
    		c: function create() {
    			li = element("li");
    			b = element("b");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			add_location(b, file$c, 19, 24, 841);
    			add_location(li, file$c, 19, 20, 837);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, b);
    			append_dev(b, t0);
    			append_dev(li, t1);
    			append_dev(li, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(19:16) {#each scrolls as scroll}",
    		ctx
    	});

    	return block;
    }

    // (12:0) <SlideIn show={show} onClose={onClose}>
    function create_default_slot$2(ctx) {
    	let div;
    	let p0;
    	let t0;
    	let t1_value = (/*$character*/ ctx[2]?.powers || 0) + "";
    	let t1;
    	let t2;
    	let t3;
    	let p1;
    	let t5;
    	let p2;
    	let t8;
    	let t9;
    	let button0;
    	let t11;
    	let button1;
    	let mounted;
    	let dispose;
    	let if_block = /*scrolls*/ ctx[3].length > 0 && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			t0 = text("Powers: (1d4/day); current (");
    			t1 = text(t1_value);
    			t2 = text(")");
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "Presence Test DR12. Success, the power is activated. Failure, take d2 points of damage and you are dizzy for the next hour. Powers can not be used during this time.";
    			t5 = space();
    			p2 = element("p");
    			p2.textContent = `Available Powers ${/*scrolls*/ ctx[3].length === 0 ? ': none' : ':'}`;
    			t8 = space();
    			if (if_block) if_block.c();
    			t9 = space();
    			button0 = element("button");
    			button0.textContent = "Roll Prsence test, if successful onlock scrolls and enable thir effects, oin fail closse and take damage.";
    			t11 = space();
    			button1 = element("button");
    			button1.textContent = "Cancel";
    			add_location(p0, file$c, 13, 8, 411);
    			add_location(p1, file$c, 14, 8, 481);
    			add_location(p2, file$c, 15, 8, 661);
    			add_location(button0, file$c, 23, 8, 952);
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$c, 25, 8, 1156);
    			add_location(div, file$c, 12, 4, 397);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(p0, t0);
    			append_dev(p0, t1);
    			append_dev(p0, t2);
    			append_dev(div, t3);
    			append_dev(div, p1);
    			append_dev(div, t5);
    			append_dev(div, p2);
    			append_dev(div, t8);
    			if (if_block) if_block.m(div, null);
    			append_dev(div, t9);
    			append_dev(div, button0);
    			append_dev(div, t11);
    			append_dev(div, button1);

    			if (!mounted) {
    				dispose = listen_dev(
    					button1,
    					"click",
    					function () {
    						if (is_function(/*onClose*/ ctx[1])) /*onClose*/ ctx[1].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*$character*/ 4 && t1_value !== (t1_value = (/*$character*/ ctx[2]?.powers || 0) + "")) set_data_dev(t1, t1_value);
    			if (/*scrolls*/ ctx[3].length > 0) if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(12:0) <SlideIn show={show} onClose={onClose}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let slidein;
    	let current;

    	slidein = new SlideIn({
    			props: {
    				show: /*show*/ ctx[0],
    				onClose: /*onClose*/ ctx[1],
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(slidein.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(slidein, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const slidein_changes = {};
    			if (dirty & /*show*/ 1) slidein_changes.show = /*show*/ ctx[0];
    			if (dirty & /*onClose*/ 2) slidein_changes.onClose = /*onClose*/ ctx[1];

    			if (dirty & /*$$scope, onClose, $character*/ 134) {
    				slidein_changes.$$scope = { dirty, ctx };
    			}

    			slidein.$set(slidein_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slidein.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slidein.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(slidein, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(2, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Powers', slots, []);
    	let { show = false } = $$props;

    	let { onClose = () => {
    		
    	} } = $$props;

    	const scrolls = $character.equipment.filter(eq => eq.type === 'scroll');
    	const writable_props = ['show', 'onClose'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Powers> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
    	};

    	$$self.$capture_state = () => ({
    		SlideIn,
    		character,
    		decrementPowers,
    		incrementPowers,
    		RollButton,
    		show,
    		onClose,
    		scrolls,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [show, onClose, $character, scrolls];
    }

    class Powers extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { show: 0, onClose: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Powers",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get show() {
    		throw new Error("<Powers>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Powers>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onClose() {
    		throw new Error("<Powers>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClose(value) {
    		throw new Error("<Powers>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ArmorWorn.svelte generated by Svelte v3.46.4 */
    const file$b = "src/components/ArmorWorn.svelte";

    // (26:8) {#if hasArmor}
    function create_if_block$4(ctx) {
    	let button;
    	let img;
    	let img_src_value;
    	let button_title_value;
    	let t;
    	let if_block_anchor;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*toggle*/ ctx[1]) return create_if_block_1$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			button = element("button");
    			img = element("img");
    			t = space();
    			if_block.c();
    			if_block_anchor = empty$1();
    			if (!src_url_equal(img.src, img_src_value = "/images/switch_sm.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1uodjs9");
    			add_location(img, file$b, 32, 16, 1157);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "button-tier svelte-1uodjs9");
    			attr_dev(button, "title", button_title_value = `Show ${/*toggle*/ ctx[1] ? 'Tiers' : 'Rolls'}`);
    			add_location(button, file$b, 26, 12, 950);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, img);
    			insert_dev(target, t, anchor);
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*handleToggle*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*toggle*/ 2 && button_title_value !== (button_title_value = `Show ${/*toggle*/ ctx[1] ? 'Tiers' : 'Rolls'}`)) {
    				attr_dev(button, "title", button_title_value);
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t);
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(26:8) {#if hasArmor}",
    		ctx
    	});

    	return block;
    }

    // (63:12) {:else}
    function create_else_block$2(ctx) {
    	let button0;
    	let t0;
    	let button0_class_value;
    	let t1;
    	let button1;
    	let t2;
    	let button1_class_value;
    	let t3;
    	let button2;
    	let t4;
    	let button2_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button0 = element("button");
    			t0 = text("1");
    			t1 = space();
    			button1 = element("button");
    			t2 = text("2");
    			t3 = space();
    			button2 = element("button");
    			t4 = text("3");
    			attr_dev(button0, "type", "button");

    			attr_dev(button0, "class", button0_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 1
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"));

    			attr_dev(button0, "title", "Tier 1, -d2");
    			add_location(button0, file$b, 63, 16, 2381);
    			attr_dev(button1, "type", "button");

    			attr_dev(button1, "class", button1_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 2
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"));

    			attr_dev(button1, "title", "Tier 2, -d4");
    			add_location(button1, file$b, 71, 16, 2691);
    			attr_dev(button2, "type", "button");

    			attr_dev(button2, "class", button2_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 3
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"));

    			attr_dev(button2, "title", "Tier 3, -d6");
    			add_location(button2, file$b, 79, 16, 3001);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button0, anchor);
    			append_dev(button0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, button1, anchor);
    			append_dev(button1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, button2, anchor);
    			append_dev(button2, t4);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*handleTierClick*/ ctx[4](1), false, false, false),
    					listen_dev(button1, "click", /*handleTierClick*/ ctx[4](2), false, false, false),
    					listen_dev(button2, "click", /*handleTierClick*/ ctx[4](3), false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*armorWorn*/ 1 && button0_class_value !== (button0_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 1
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"))) {
    				attr_dev(button0, "class", button0_class_value);
    			}

    			if (dirty & /*armorWorn*/ 1 && button1_class_value !== (button1_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 2
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"))) {
    				attr_dev(button1, "class", button1_class_value);
    			}

    			if (dirty & /*armorWorn*/ 1 && button2_class_value !== (button2_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 3
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"))) {
    				attr_dev(button2, "class", button2_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(button2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(63:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (35:12) {#if toggle}
    function create_if_block_1$2(ctx) {
    	let button0;
    	let t0;
    	let button0_class_value;
    	let button0_disabled_value;
    	let t1;
    	let button1;
    	let t2;
    	let button1_class_value;
    	let button1_disabled_value;
    	let t3;
    	let button2;
    	let t4;
    	let button2_class_value;
    	let button2_disabled_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button0 = element("button");
    			t0 = text("-d2");
    			t1 = space();
    			button1 = element("button");
    			t2 = text("-d4");
    			t3 = space();
    			button2 = element("button");
    			t4 = text("-d6");
    			attr_dev(button0, "type", "button");

    			attr_dev(button0, "class", button0_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 1
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"));

    			attr_dev(button0, "title", "-d2");
    			button0.disabled = button0_disabled_value = /*armorWorn*/ ctx[0].currentTier !== 1;
    			add_location(button0, file$b, 35, 16, 1263);
    			attr_dev(button1, "type", "button");

    			attr_dev(button1, "class", button1_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 2
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"));

    			attr_dev(button1, "title", "-d4");
    			button1.disabled = button1_disabled_value = /*armorWorn*/ ctx[0].currentTier !== 2;
    			add_location(button1, file$b, 44, 16, 1629);
    			attr_dev(button2, "type", "button");

    			attr_dev(button2, "class", button2_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 3
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"));

    			attr_dev(button2, "title", "-d6");
    			button2.disabled = button2_disabled_value = /*armorWorn*/ ctx[0].currentTier !== 3;
    			add_location(button2, file$b, 53, 16, 1995);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button0, anchor);
    			append_dev(button0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, button1, anchor);
    			append_dev(button1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, button2, anchor);
    			append_dev(button2, t4);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[6], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[7], false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*armorWorn*/ 1 && button0_class_value !== (button0_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 1
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"))) {
    				attr_dev(button0, "class", button0_class_value);
    			}

    			if (dirty & /*armorWorn*/ 1 && button0_disabled_value !== (button0_disabled_value = /*armorWorn*/ ctx[0].currentTier !== 1)) {
    				prop_dev(button0, "disabled", button0_disabled_value);
    			}

    			if (dirty & /*armorWorn*/ 1 && button1_class_value !== (button1_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 2
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"))) {
    				attr_dev(button1, "class", button1_class_value);
    			}

    			if (dirty & /*armorWorn*/ 1 && button1_disabled_value !== (button1_disabled_value = /*armorWorn*/ ctx[0].currentTier !== 2)) {
    				prop_dev(button1, "disabled", button1_disabled_value);
    			}

    			if (dirty & /*armorWorn*/ 1 && button2_class_value !== (button2_class_value = "" + (null_to_empty(/*armorWorn*/ ctx[0].currentTier === 3
    			? 'current button-tier'
    			: 'button-tier') + " svelte-1uodjs9"))) {
    				attr_dev(button2, "class", button2_class_value);
    			}

    			if (dirty & /*armorWorn*/ 1 && button2_disabled_value !== (button2_disabled_value = /*armorWorn*/ ctx[0].currentTier !== 3)) {
    				prop_dev(button2, "disabled", button2_disabled_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(button2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(35:12) {#if toggle}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div2;
    	let div0;
    	let b;
    	let t1;
    	let t2_value = (/*hasArmor*/ ctx[2] ? /*armorWorn*/ ctx[0].name : 'None') + "";
    	let t2;
    	let t3;
    	let div1;
    	let if_block = /*hasArmor*/ ctx[2] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			b = element("b");
    			b.textContent = "Armor:";
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			div1 = element("div");
    			if (if_block) if_block.c();
    			add_location(b, file$b, 22, 8, 843);
    			attr_dev(div0, "class", "svelte-1uodjs9");
    			add_location(div0, file$b, 21, 4, 829);
    			attr_dev(div1, "class", "svelte-1uodjs9");
    			add_location(div1, file$b, 24, 4, 909);
    			attr_dev(div2, "class", "row-padded r svelte-1uodjs9");
    			add_location(div2, file$b, 20, 0, 798);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, b);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			if (if_block) if_block.m(div1, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*hasArmor, armorWorn*/ 5 && t2_value !== (t2_value = (/*hasArmor*/ ctx[2] ? /*armorWorn*/ ctx[0].name : 'None') + "")) set_data_dev(t2, t2_value);

    			if (/*hasArmor*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let armorWorn;
    	let hasArmor;
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(5, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ArmorWorn', slots, []);
    	const isWornArmor = equipment => equipment.type === 'armor' && equipment.equipped;
    	const getWornArmor = compose(ifElse$1(isNil$1, always$1({}), identity$1), head$1, filter$1(isWornArmor));
    	let toggle = true;

    	// Handlers
    	const handleToggle = () => $$invalidate(1, toggle = !toggle);

    	// does this need to be reactive? Would I get stale state for armor worn?, armor is
    	// stale but it doesn't matter in this case
    	const handleTierClick = tier => () => setArmorTier(armorWorn._id, tier);

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArmorWorn> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => alert(roll(2));
    	const click_handler_1 = () => alert(roll(4));
    	const click_handler_2 = () => alert(roll(6));

    	$$self.$capture_state = () => ({
    		always: always$1,
    		compose,
    		filter: filter$1,
    		head: head$1,
    		identity: identity$1,
    		ifElse: ifElse$1,
    		isEmpty: isEmpty$1,
    		isNil: isNil$1,
    		character,
    		setArmorTier,
    		roll,
    		isWornArmor,
    		getWornArmor,
    		toggle,
    		handleToggle,
    		handleTierClick,
    		armorWorn,
    		hasArmor,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ('toggle' in $$props) $$invalidate(1, toggle = $$props.toggle);
    		if ('armorWorn' in $$props) $$invalidate(0, armorWorn = $$props.armorWorn);
    		if ('hasArmor' in $$props) $$invalidate(2, hasArmor = $$props.hasArmor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$character*/ 32) {
    			$$invalidate(0, armorWorn = getWornArmor($character.equipment));
    		}

    		if ($$self.$$.dirty & /*armorWorn*/ 1) {
    			$$invalidate(2, hasArmor = !isEmpty$1(armorWorn));
    		}
    	};

    	return [
    		armorWorn,
    		toggle,
    		hasArmor,
    		handleToggle,
    		handleTierClick,
    		$character,
    		click_handler,
    		click_handler_1,
    		click_handler_2
    	];
    }

    class ArmorWorn extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ArmorWorn",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/components/WeaponsCarried.svelte generated by Svelte v3.46.4 */
    const file$a = "src/components/WeaponsCarried.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	const constants_0 = typeof /*weapon*/ child_ctx[14].damageDie;
    	child_ctx[15] = constants_0;
    	const constants_1 = /*COMBAT_MAP*/ child_ctx[1][/*weapon*/ child_ctx[14].weaponType];
    	child_ctx[16] = constants_1;
    	return child_ctx;
    }

    // (56:16) <RollButton                     diceString="1d20"                     onRoll={attackType.roll}                 >
    function create_default_slot$1(ctx) {
    	let t_value = symbol(/*attackType*/ ctx[16].bonus) + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*weapons*/ 1 && t_value !== (t_value = symbol(/*attackType*/ ctx[16].bonus) + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(56:16) <RollButton                     diceString=\\\"1d20\\\"                     onRoll={attackType.roll}                 >",
    		ctx
    	});

    	return block;
    }

    // (42:4) {#each weapons as weapon }
    function create_each_block$1(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*weapon*/ ctx[14].description + "";
    	let t0;
    	let t1;
    	let td1;
    	let button0;
    	let t3;
    	let td2;
    	let rollbutton;
    	let t4;
    	let td3;
    	let button1;

    	let t5_value = (/*damageType*/ ctx[15] === 'string'
    	? /*weapon*/ ctx[14].damageDie
    	: `d${/*weapon*/ ctx[14].damageDie}`) + "";

    	let t5;
    	let t6;
    	let current;
    	let mounted;
    	let dispose;

    	rollbutton = new RollButton({
    			props: {
    				diceString: "1d20",
    				onRoll: /*attackType*/ ctx[16].roll,
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function click_handler() {
    		return /*click_handler*/ ctx[4](/*weapon*/ ctx[14]);
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			button0 = element("button");
    			button0.textContent = "Break";
    			t3 = space();
    			td2 = element("td");
    			create_component(rollbutton.$$.fragment);
    			t4 = space();
    			td3 = element("td");
    			button1 = element("button");
    			t5 = text(t5_value);
    			t6 = space();
    			add_location(td0, file$a, 45, 12, 1469);
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$a, 47, 16, 1532);
    			add_location(td1, file$a, 46, 12, 1511);
    			add_location(td2, file$a, 54, 12, 1740);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "title", "Damage");
    			add_location(button1, file$a, 63, 16, 2002);
    			add_location(td3, file$a, 62, 12, 1981);
    			add_location(tr, file$a, 44, 8, 1452);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, button0);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			mount_component(rollbutton, td2, null);
    			append_dev(tr, t4);
    			append_dev(tr, td3);
    			append_dev(td3, button1);
    			append_dev(button1, t5);
    			append_dev(tr, t6);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						button0,
    						"click",
    						function () {
    							if (is_function(partial$1(breakWeapon, [/*weapon*/ ctx[14]._id]))) partial$1(breakWeapon, [/*weapon*/ ctx[14]._id]).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(button1, "click", click_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*weapons*/ 1) && t0_value !== (t0_value = /*weapon*/ ctx[14].description + "")) set_data_dev(t0, t0_value);
    			const rollbutton_changes = {};
    			if (dirty & /*weapons*/ 1) rollbutton_changes.onRoll = /*attackType*/ ctx[16].roll;

    			if (dirty & /*$$scope, weapons*/ 524289) {
    				rollbutton_changes.$$scope = { dirty, ctx };
    			}

    			rollbutton.$set(rollbutton_changes);

    			if ((!current || dirty & /*weapons*/ 1) && t5_value !== (t5_value = (/*damageType*/ ctx[15] === 'string'
    			? /*weapon*/ ctx[14].damageDie
    			: `d${/*weapon*/ ctx[14].damageDie}`) + "")) set_data_dev(t5, t5_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rollbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rollbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_component(rollbutton);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(42:4) {#each weapons as weapon }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let table;
    	let thead;
    	let tr;
    	let th0;
    	let t1;
    	let th1;
    	let t2;
    	let th2;
    	let t4;
    	let th3;
    	let t6;
    	let tbody;
    	let current;
    	let each_value = /*weapons*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "Weapon";
    			t1 = space();
    			th1 = element("th");
    			t2 = space();
    			th2 = element("th");
    			th2.textContent = "To Hit";
    			t4 = space();
    			th3 = element("th");
    			th3.textContent = "Damage";
    			t6 = space();
    			tbody = element("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(th0, file$a, 34, 12, 1166);
    			add_location(th1, file$a, 35, 12, 1194);
    			add_location(th2, file$a, 36, 12, 1216);
    			add_location(th3, file$a, 37, 12, 1244);
    			add_location(tr, file$a, 33, 8, 1149);
    			add_location(thead, file$a, 32, 4, 1133);
    			add_location(tbody, file$a, 40, 4, 1291);
    			add_location(table, file$a, 31, 0, 1121);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, thead);
    			append_dev(thead, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t1);
    			append_dev(tr, th1);
    			append_dev(tr, t2);
    			append_dev(tr, th2);
    			append_dev(tr, t4);
    			append_dev(tr, th3);
    			append_dev(table, t6);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*alert, rol, weapons, COMBAT_MAP, symbol, partial, breakWeapon*/ 7) {
    				each_value = /*weapons*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let weapons;
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(3, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WeaponsCarried', slots, []);
    	const { strength, presence } = $character.abilities;
    	const { melee, ranged } = $character.tests;

    	const COMBAT_MAP = {
    		melee: {
    			bonus: strength,
    			roll: alertRoll(melee, strength)
    		},
    		ranged: {
    			bonus: presence,
    			roll: alertRoll(ranged, presence)
    		}
    	};

    	const isWeapon = propSatisfies$1(x => x === 'weapon', 'type');
    	const isUnbroken = propSatisfies$1(x => x === false || x === undefined, 'broken');
    	const isEquipped = propSatisfies$1(x => x === true, 'equipped');
    	const isUnbrokenWeapon = weapon => isWeapon(weapon) && isEquipped(weapon) && isUnbroken(weapon);
    	const getWeapons = filter$1(isUnbrokenWeapon);
    	const rol = die => typeof die === 'string' ? rollString(die) : roll(die);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WeaponsCarried> was created with unknown prop '${key}'`);
    	});

    	const click_handler = weapon => alert(rol(weapon.damageDie));

    	$$self.$capture_state = () => ({
    		filter: filter$1,
    		partial: partial$1,
    		propSatisfies: propSatisfies$1,
    		character,
    		breakWeapon,
    		RollButton,
    		alertRoll,
    		roll,
    		rollString,
    		symbol,
    		strength,
    		presence,
    		melee,
    		ranged,
    		COMBAT_MAP,
    		isWeapon,
    		isUnbroken,
    		isEquipped,
    		isUnbrokenWeapon,
    		getWeapons,
    		rol,
    		weapons,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ('weapons' in $$props) $$invalidate(0, weapons = $$props.weapons);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$character*/ 8) {
    			$$invalidate(0, weapons = getWeapons($character.equipment));
    		}
    	};

    	return [weapons, COMBAT_MAP, rol, $character, click_handler];
    }

    class WeaponsCarried extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WeaponsCarried",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/components/EquipmentTypes/Equipable.svelte generated by Svelte v3.46.4 */
    const file$9 = "src/components/EquipmentTypes/Equipable.svelte";

    function create_fragment$a(ctx) {
    	let div1;
    	let div0;
    	let t0_value = /*item*/ ctx[0].description + "";
    	let t0;
    	let t1;
    	let button;
    	let t2_value = (/*item*/ ctx[0].equipped ? 'Remove' : 'Equip') + "";
    	let t2;
    	let button_disabled_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			button = element("button");
    			t2 = text(t2_value);
    			add_location(div0, file$9, 8, 2, 147);
    			attr_dev(button, "class", "mb0");
    			attr_dev(button, "type", "button");
    			button.disabled = button_disabled_value = /*item*/ ctx[0].broken;
    			add_location(button, file$9, 11, 2, 188);
    			attr_dev(div1, "class", "r svelte-1m7g13q");
    			add_location(div1, file$9, 7, 0, 129);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);
    			append_dev(div1, button);
    			append_dev(button, t2);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(partial$1(equip, [/*item*/ ctx[0]._id]))) partial$1(equip, [/*item*/ ctx[0]._id]).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*item*/ 1 && t0_value !== (t0_value = /*item*/ ctx[0].description + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*item*/ 1 && t2_value !== (t2_value = (/*item*/ ctx[0].equipped ? 'Remove' : 'Equip') + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*item*/ 1 && button_disabled_value !== (button_disabled_value = /*item*/ ctx[0].broken)) {
    				prop_dev(button, "disabled", button_disabled_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Equipable', slots, []);
    	let { item = {} } = $$props;
    	const writable_props = ['item'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Equipable> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('item' in $$props) $$invalidate(0, item = $$props.item);
    	};

    	$$self.$capture_state = () => ({ partial: partial$1, equip, item });

    	$$self.$inject_state = $$props => {
    		if ('item' in $$props) $$invalidate(0, item = $$props.item);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [item];
    }

    class Equipable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { item: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Equipable",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get item() {
    		throw new Error("<Equipable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<Equipable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/EquipmentTypes/Equipment.svelte generated by Svelte v3.46.4 */

    const file$8 = "src/components/EquipmentTypes/Equipment.svelte";

    function create_fragment$9(ctx) {
    	let div1;
    	let div0;
    	let t_value = /*item*/ ctx[0].description + "";
    	let t;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = text(t_value);
    			add_location(div0, file$8, 5, 2, 64);
    			attr_dev(div1, "class", "r svelte-18umlsd");
    			add_location(div1, file$8, 4, 0, 46);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*item*/ 1 && t_value !== (t_value = /*item*/ ctx[0].description + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Equipment', slots, []);
    	let { item = {} } = $$props;
    	const writable_props = ['item'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Equipment> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('item' in $$props) $$invalidate(0, item = $$props.item);
    	};

    	$$self.$capture_state = () => ({ item });

    	$$self.$inject_state = $$props => {
    		if ('item' in $$props) $$invalidate(0, item = $$props.item);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [item];
    }

    class Equipment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { item: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Equipment",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get item() {
    		throw new Error("<Equipment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<Equipment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/EquipmentTypes/Countable.svelte generated by Svelte v3.46.4 */
    const file$7 = "src/components/EquipmentTypes/Countable.svelte";

    function create_fragment$8(ctx) {
    	let div2;
    	let div0;
    	let t0_value = /*item*/ ctx[0].description.replace('#', /*item*/ ctx[0].quantity) + "";
    	let t0;
    	let t1;
    	let div1;
    	let button0;
    	let t2;
    	let button0_disabled_value;
    	let t3;
    	let button1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			button0 = element("button");
    			t2 = text("+");
    			t3 = space();
    			button1 = element("button");
    			button1.textContent = "-";
    			add_location(div0, file$7, 8, 2, 180);
    			attr_dev(button0, "class", "mb0");
    			attr_dev(button0, "type", "button");
    			button0.disabled = button0_disabled_value = /*item*/ ctx[0].weight * /*item*/ ctx[0].quantity === 100;
    			add_location(button0, file$7, 12, 4, 258);
    			attr_dev(button1, "class", "mb0");
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$7, 20, 4, 440);
    			add_location(div1, file$7, 11, 2, 248);
    			attr_dev(div2, "class", "r svelte-39ftsm");
    			add_location(div2, file$7, 7, 0, 162);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, button0);
    			append_dev(button0, t2);
    			append_dev(div1, t3);
    			append_dev(div1, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						button0,
    						"click",
    						function () {
    							if (is_function(partial$1(addEquipment, [/*item*/ ctx[0]._id]))) partial$1(addEquipment, [/*item*/ ctx[0]._id]).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						button1,
    						"click",
    						function () {
    							if (is_function(partial$1(subtractEquipment, [/*item*/ ctx[0]._id]))) partial$1(subtractEquipment, [/*item*/ ctx[0]._id]).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*item*/ 1 && t0_value !== (t0_value = /*item*/ ctx[0].description.replace('#', /*item*/ ctx[0].quantity) + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*item*/ 1 && button0_disabled_value !== (button0_disabled_value = /*item*/ ctx[0].weight * /*item*/ ctx[0].quantity === 100)) {
    				prop_dev(button0, "disabled", button0_disabled_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Countable', slots, []);
    	let { item = {} } = $$props;
    	const writable_props = ['item'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Countable> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('item' in $$props) $$invalidate(0, item = $$props.item);
    	};

    	$$self.$capture_state = () => ({
    		partial: partial$1,
    		subtractEquipment,
    		addEquipment,
    		item
    	});

    	$$self.$inject_state = $$props => {
    		if ('item' in $$props) $$invalidate(0, item = $$props.item);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [item];
    }

    class Countable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { item: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Countable",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get item() {
    		throw new Error("<Countable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<Countable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Equipment.svelte generated by Svelte v3.46.4 */

    const { console: console_1 } = globals;
    const file$6 = "src/components/Equipment.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[10] = i;
    	return child_ctx;
    }

    // (38:16) {:else}
    function create_else_block$1(ctx) {
    	let equipment;
    	let current;

    	equipment = new Equipment({
    			props: { item: /*e*/ ctx[8] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(equipment.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(equipment, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const equipment_changes = {};
    			if (dirty & /*$character*/ 2) equipment_changes.item = /*e*/ ctx[8];
    			equipment.$set(equipment_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(equipment.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(equipment.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(equipment, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(38:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (36:41) 
    function create_if_block_1$1(ctx) {
    	let countable;
    	let current;

    	countable = new Countable({
    			props: { item: /*e*/ ctx[8] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(countable.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(countable, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const countable_changes = {};
    			if (dirty & /*$character*/ 2) countable_changes.item = /*e*/ ctx[8];
    			countable.$set(countable_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(countable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(countable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(countable, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(36:41) ",
    		ctx
    	});

    	return block;
    }

    // (34:16) {#if isEquippable(e)}
    function create_if_block$3(ctx) {
    	let equipable;
    	let current;

    	equipable = new Equipable({
    			props: { item: /*e*/ ctx[8] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(equipable.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(equipable, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const equipable_changes = {};
    			if (dirty & /*$character*/ 2) equipable_changes.item = /*e*/ ctx[8];
    			equipable.$set(equipable_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(equipable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(equipable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(equipable, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(34:16) {#if isEquippable(e)}",
    		ctx
    	});

    	return block;
    }

    // (32:8) {#each $character.equipment as e, i (e._id)}
    function create_each_block(key_1, ctx) {
    	let li;
    	let show_if;
    	let show_if_1;
    	let current_block_type_index;
    	let if_block;
    	let t0;
    	let button;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block$3, create_if_block_1$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (dirty & /*$character*/ 2) show_if = null;
    		if (dirty & /*$character*/ 2) show_if_1 = null;
    		if (show_if == null) show_if = !!/*isEquippable*/ ctx[2](/*e*/ ctx[8]);
    		if (show_if) return 0;
    		if (show_if_1 == null) show_if_1 = !!/*isCountable*/ ctx[3](/*e*/ ctx[8]);
    		if (show_if_1) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx, -1);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			li = element("li");
    			if_block.c();
    			t0 = space();
    			button = element("button");
    			button.textContent = "Delete";
    			t2 = space();
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "mb0");
    			add_location(button, file$6, 41, 16, 1857);
    			attr_dev(li, "class", "list-item svelte-kbj1xw");
    			add_location(li, file$6, 32, 12, 1521);
    			this.first = li;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			if_blocks[current_block_type_index].m(li, null);
    			append_dev(li, t0);
    			append_dev(li, button);
    			append_dev(li, t2);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(partial$1(dropEquipment, [/*i*/ ctx[10]]))) partial$1(dropEquipment, [/*i*/ ctx[10]]).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx, dirty);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(li, t0);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if_blocks[current_block_type_index].d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(32:8) {#each $character.equipment as e, i (e._id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let p;
    	let t5;
    	let ul;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;
    	let each_value = /*$character*/ ctx[1].equipment;
    	validate_each_argument(each_value);
    	const get_key = ctx => /*e*/ ctx[8]._id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Equipment";
    			t1 = space();
    			p = element("p");
    			p.textContent = `Strength + 8 (${/*encumbranceNumber*/ ctx[4]}) items or DR+2 on Agility/Strength tests`;
    			t5 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "title svelte-kbj1xw");
    			add_location(h2, file$6, 26, 8, 1275);
    			attr_dev(p, "class", "text svelte-kbj1xw");
    			add_location(p, file$6, 27, 8, 1316);
    			attr_dev(div0, "class", "row r svelte-kbj1xw");
    			add_location(div0, file$6, 25, 4, 1247);
    			attr_dev(ul, "class", "list-clear list svelte-kbj1xw");
    			add_location(ul, file$6, 30, 4, 1427);
    			attr_dev(div1, "class", "equipment svelte-kbj1xw");
    			toggle_class(div1, "encumbered", /*isEncumbered*/ ctx[0]);
    			add_location(div1, file$6, 24, 0, 1187);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(div1, t5);
    			append_dev(div1, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*partial, dropEquipment, $character, isEquippable, isCountable*/ 14) {
    				each_value = /*$character*/ ctx[1].equipment;
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, ul, outro_and_destroy_block, create_each_block, null, get_each_context);
    				check_outros();
    			}

    			if (dirty & /*isEncumbered*/ 1) {
    				toggle_class(div1, "encumbered", /*isEncumbered*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let equipmentWeight;
    	let isEncumbered;
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(1, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Equipment', slots, []);
    	const isEquippable = propSatisfies$1(x => !!find$1(equals(x), ['armor', 'weapon']), 'type');
    	const isCountable = propSatisfies$1(x => x > 1, 'quantity');

    	/**
     * because JS is bad at floating point math we're going to use 100 to represent a "full size item"
     * partial sized items will have 100 / number to fill one slot. 
     * Ex: Arrows will have a weight 5 fitting 20 into a single slot
     */
    	const encumbranceNumber = 8 + $character.abilities.strength;

    	const maxEquipmentRows = encumbranceNumber * 2;
    	const calculatedEncumbrance = encumbranceNumber * 100;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Equipment> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		equals,
    		find: find$1,
    		partial: partial$1,
    		propSatisfies: propSatisfies$1,
    		Equipable,
    		Equipment,
    		Countable,
    		character,
    		dropEquipment,
    		isEquippable,
    		isCountable,
    		encumbranceNumber,
    		maxEquipmentRows,
    		calculatedEncumbrance,
    		isEncumbered,
    		equipmentWeight,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ('isEncumbered' in $$props) $$invalidate(0, isEncumbered = $$props.isEncumbered);
    		if ('equipmentWeight' in $$props) $$invalidate(5, equipmentWeight = $$props.equipmentWeight);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$character*/ 2) {
    			$$invalidate(5, equipmentWeight = $character.equipment.reduce((acc, eq) => acc + (!!eq.equipped === false ? eq.weight * eq.quantity : 0), 0));
    		}

    		if ($$self.$$.dirty & /*equipmentWeight*/ 32) {
    			$$invalidate(0, isEncumbered = calculatedEncumbrance <= equipmentWeight);
    		}

    		if ($$self.$$.dirty & /*equipmentWeight, isEncumbered*/ 33) {
    			console.log(20, equipmentWeight, isEncumbered);
    		}
    	};

    	return [
    		isEncumbered,
    		$character,
    		isEquippable,
    		isCountable,
    		encumbranceNumber,
    		equipmentWeight
    	];
    }

    class Equipment_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Equipment_1",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/CharacterSheet/Incrementer.svelte generated by Svelte v3.46.4 */

    const file$5 = "src/components/CharacterSheet/Incrementer.svelte";

    // (36:8) {:else}
    function create_else_block(ctx) {
    	let t0;
    	let t1;
    	let if_block_anchor;
    	let if_block = /*maxValue*/ ctx[2] > -1 && create_if_block_2(ctx);

    	const block = {
    		c: function create() {
    			t0 = text(/*value*/ ctx[1]);
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*value*/ 2) set_data_dev(t0, /*value*/ ctx[1]);

    			if (/*maxValue*/ ctx[2] > -1) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(36:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (31:8) {#if showInput }
    function create_if_block_1(ctx) {
    	let form;
    	let input;
    	let t0;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			form = element("form");
    			input = element("input");
    			t0 = space();
    			button = element("button");
    			button.textContent = "Submit";
    			attr_dev(input, "type", "number");
    			add_location(input, file$5, 32, 16, 783);
    			attr_dev(button, "type", "submit");
    			add_location(button, file$5, 33, 16, 840);
    			attr_dev(form, "action", "");
    			add_location(form, file$5, 31, 12, 710);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, input);
    			set_input_value(input, /*val*/ ctx[6]);
    			append_dev(form, t0);
    			append_dev(form, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[10]),
    					listen_dev(form, "submit", prevent_default(/*handleSubmit*/ ctx[8]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*val*/ 64 && to_number(input.value) !== /*val*/ ctx[6]) {
    				set_input_value(input, /*val*/ ctx[6]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(31:8) {#if showInput }",
    		ctx
    	});

    	return block;
    }

    // (38:12) {#if maxValue > -1}
    function create_if_block_2(ctx) {
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("/");
    			t1 = text(/*maxValue*/ ctx[2]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*maxValue*/ 4) set_data_dev(t1, /*maxValue*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(38:12) {#if maxValue > -1}",
    		ctx
    	});

    	return block;
    }

    // (45:8) {#if !showInput }
    function create_if_block$2(ctx) {
    	let button0;
    	let t1;
    	let button1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button0 = element("button");
    			button0.textContent = "+";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "-";
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "btn svelte-tjd8m4");
    			attr_dev(button0, "title", "Increase by 1");
    			add_location(button0, file$5, 45, 8, 1108);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "btn svelte-tjd8m4");
    			attr_dev(button1, "title", "Reduce by 1P");
    			add_location(button1, file$5, 52, 8, 1270);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, button1, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						button0,
    						"click",
    						function () {
    							if (is_function(/*increment*/ ctx[3])) /*increment*/ ctx[3].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						button1,
    						"click",
    						function () {
    							if (is_function(/*decrement*/ ctx[4])) /*decrement*/ ctx[4].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(45:8) {#if !showInput }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div4;
    	let div2;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div3;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*showInput*/ ctx[5]) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = !/*showInput*/ ctx[5] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			if_block0.c();
    			t1 = space();
    			div3 = element("div");
    			if (if_block1) if_block1.c();
    			attr_dev(div0, "class", "score-name");
    			add_location(div0, file$5, 22, 8, 467);
    			attr_dev(div1, "class", "score");
    			add_location(div1, file$5, 26, 8, 597);
    			add_location(div2, file$5, 21, 4, 453);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$5, 43, 4, 1056);
    			attr_dev(div4, "class", "hit-points row svelte-tjd8m4");
    			add_location(div4, file$5, 20, 0, 420);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div2);
    			append_dev(div2, div0);
    			div0.innerHTML = /*title*/ ctx[0];
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			if_block0.m(div1, null);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			if (if_block1) if_block1.m(div3, null);

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", /*handleInput*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) div0.innerHTML = /*title*/ ctx[0];
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div1, null);
    				}
    			}

    			if (!/*showInput*/ ctx[5]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					if_block1.m(div3, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if_block0.d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Incrementer', slots, []);
    	let { title = '' } = $$props;
    	let { value = 0 } = $$props;
    	let { maxValue = -1 } = $$props;

    	let { increment = () => {
    		
    	} } = $$props;

    	let { decrement = () => {
    		
    	} } = $$props;

    	let { set = () => {
    		
    	} } = $$props;

    	let showInput = false;
    	let val = null;
    	const handleInput = () => !!set ? $$invalidate(5, showInput = true) : null;

    	const handleSubmit = () => {
    		set(val);
    		$$invalidate(6, val = null);
    		$$invalidate(5, showInput = false);
    	};

    	const writable_props = ['title', 'value', 'maxValue', 'increment', 'decrement', 'set'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Incrementer> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		val = to_number(this.value);
    		$$invalidate(6, val);
    	}

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('maxValue' in $$props) $$invalidate(2, maxValue = $$props.maxValue);
    		if ('increment' in $$props) $$invalidate(3, increment = $$props.increment);
    		if ('decrement' in $$props) $$invalidate(4, decrement = $$props.decrement);
    		if ('set' in $$props) $$invalidate(9, set = $$props.set);
    	};

    	$$self.$capture_state = () => ({
    		title,
    		value,
    		maxValue,
    		increment,
    		decrement,
    		set,
    		showInput,
    		val,
    		handleInput,
    		handleSubmit
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('maxValue' in $$props) $$invalidate(2, maxValue = $$props.maxValue);
    		if ('increment' in $$props) $$invalidate(3, increment = $$props.increment);
    		if ('decrement' in $$props) $$invalidate(4, decrement = $$props.decrement);
    		if ('set' in $$props) $$invalidate(9, set = $$props.set);
    		if ('showInput' in $$props) $$invalidate(5, showInput = $$props.showInput);
    		if ('val' in $$props) $$invalidate(6, val = $$props.val);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		title,
    		value,
    		maxValue,
    		increment,
    		decrement,
    		showInput,
    		val,
    		handleInput,
    		handleSubmit,
    		set,
    		input_input_handler
    	];
    }

    class Incrementer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			title: 0,
    			value: 1,
    			maxValue: 2,
    			increment: 3,
    			decrement: 4,
    			set: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Incrementer",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get title() {
    		throw new Error("<Incrementer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Incrementer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Incrementer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Incrementer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maxValue() {
    		throw new Error("<Incrementer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxValue(value) {
    		throw new Error("<Incrementer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get increment() {
    		throw new Error("<Incrementer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set increment(value) {
    		throw new Error("<Incrementer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get decrement() {
    		throw new Error("<Incrementer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set decrement(value) {
    		throw new Error("<Incrementer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get set() {
    		throw new Error("<Incrementer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set set(value) {
    		throw new Error("<Incrementer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/HitPoints.svelte generated by Svelte v3.46.4 */

    function create_fragment$5(ctx) {
    	let incrementer;
    	let current;

    	incrementer = new Incrementer({
    			props: {
    				title: "<abbr title=\"Hit Points\">HP</abbr>",
    				value: /*$character*/ ctx[0].hitpoints.current,
    				maxValue: /*$character*/ ctx[0].hitpoints.maximum,
    				increment: incrementHp,
    				decrement: decrementHp,
    				set: false
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(incrementer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(incrementer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const incrementer_changes = {};
    			if (dirty & /*$character*/ 1) incrementer_changes.value = /*$character*/ ctx[0].hitpoints.current;
    			if (dirty & /*$character*/ 1) incrementer_changes.maxValue = /*$character*/ ctx[0].hitpoints.maximum;
    			incrementer.$set(incrementer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(incrementer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(incrementer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(incrementer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(0, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HitPoints', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HitPoints> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		character,
    		incrementHp,
    		decrementHp,
    		Incrementer,
    		$character
    	});

    	return [$character];
    }

    class HitPoints extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HitPoints",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/Die.svelte generated by Svelte v3.46.4 */

    const file$4 = "src/components/Die.svelte";

    // (14:0) {#if result !== null}
    function create_if_block$1(ctx) {
    	let div3;
    	let button;
    	let t1;
    	let div0;
    	let t2;
    	let div1;
    	let t3;
    	let t4;
    	let div2;
    	let t5_value = /*message*/ ctx[2].formula + "";
    	let t5;
    	let t6;
    	let t7_value = /*message*/ ctx[2].roll + "";
    	let t7;
    	let t8;
    	let t9_value = /*message*/ ctx[2].scoreName + "";
    	let t9;
    	let t10;
    	let t11_value = /*message*/ ctx[2].score + "";
    	let t11;
    	let t12;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			button = element("button");
    			button.textContent = "×";
    			t1 = space();
    			div0 = element("div");
    			t2 = space();
    			div1 = element("div");
    			t3 = text(/*result*/ ctx[1]);
    			t4 = space();
    			div2 = element("div");
    			t5 = text(t5_value);
    			t6 = text(" (");
    			t7 = text(t7_value);
    			t8 = text(") + ");
    			t9 = text(t9_value);
    			t10 = text(" (");
    			t11 = text(t11_value);
    			t12 = text(")");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "close svelte-1cacpgq");
    			add_location(button, file$4, 15, 8, 338);
    			attr_dev(div0, "class", "die svelte-1cacpgq");
    			add_location(div0, file$4, 16, 8, 418);
    			attr_dev(div1, "class", "roll svelte-1cacpgq");
    			add_location(div1, file$4, 17, 8, 450);
    			attr_dev(div2, "class", "formula svelte-1cacpgq");
    			add_location(div2, file$4, 20, 8, 513);
    			attr_dev(div3, "class", "overlay svelte-1cacpgq");
    			add_location(div3, file$4, 14, 4, 289);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, button);
    			append_dev(div3, t1);
    			append_dev(div3, div0);
    			append_dev(div3, t2);
    			append_dev(div3, div1);
    			append_dev(div1, t3);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, t5);
    			append_dev(div2, t6);
    			append_dev(div2, t7);
    			append_dev(div2, t8);
    			append_dev(div2, t9);
    			append_dev(div2, t10);
    			append_dev(div2, t11);
    			append_dev(div2, t12);

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						button,
    						"click",
    						function () {
    							if (is_function(/*onClose*/ ctx[0])) /*onClose*/ ctx[0].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						div3,
    						"click",
    						function () {
    							if (is_function(/*onClose*/ ctx[0])) /*onClose*/ ctx[0].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*result*/ 2) set_data_dev(t3, /*result*/ ctx[1]);
    			if (dirty & /*message*/ 4 && t5_value !== (t5_value = /*message*/ ctx[2].formula + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*message*/ 4 && t7_value !== (t7_value = /*message*/ ctx[2].roll + "")) set_data_dev(t7, t7_value);
    			if (dirty & /*message*/ 4 && t9_value !== (t9_value = /*message*/ ctx[2].scoreName + "")) set_data_dev(t9, t9_value);
    			if (dirty & /*message*/ 4 && t11_value !== (t11_value = /*message*/ ctx[2].score + "")) set_data_dev(t11, t11_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(14:0) {#if result !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*result*/ ctx[1] !== null && create_if_block$1(ctx);
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "keyup", /*handleEsc*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*result*/ ctx[1] !== null) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(t.parentNode, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Die', slots, ['default']);

    	let { onClose = () => {
    		
    	} } = $$props;

    	let { result } = $$props;
    	let { message = { roll: 0, scoreName: 'Strength', score: 0 } } = $$props;
    	const handleEsc = e => e.key === "Escape" ? onClose() : null;
    	const writable_props = ['onClose', 'result', 'message'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Die> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('onClose' in $$props) $$invalidate(0, onClose = $$props.onClose);
    		if ('result' in $$props) $$invalidate(1, result = $$props.result);
    		if ('message' in $$props) $$invalidate(2, message = $$props.message);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ onClose, result, message, handleEsc });

    	$$self.$inject_state = $$props => {
    		if ('onClose' in $$props) $$invalidate(0, onClose = $$props.onClose);
    		if ('result' in $$props) $$invalidate(1, result = $$props.result);
    		if ('message' in $$props) $$invalidate(2, message = $$props.message);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [onClose, result, message, handleEsc, $$scope, slots];
    }

    class Die extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { onClose: 0, result: 1, message: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Die",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*result*/ ctx[1] === undefined && !('result' in props)) {
    			console.warn("<Die> was created without expected prop 'result'");
    		}
    	}

    	get onClose() {
    		throw new Error("<Die>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClose(value) {
    		throw new Error("<Die>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get result() {
    		throw new Error("<Die>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set result(value) {
    		throw new Error("<Die>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get message() {
    		throw new Error("<Die>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set message(value) {
    		throw new Error("<Die>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Initiaitve.svelte generated by Svelte v3.46.4 */
    const file$3 = "src/components/Initiaitve.svelte";

    // (19:0) <Die   onClose={() => result = null}   result={result}   message={{     formula: '1d6',     scoreName: 'Agility',     score: abilities.agility,     roll   }} >
    function create_default_slot(ctx) {
    	let div3;
    	let div2;
    	let div0;
    	let abbr;
    	let t1;
    	let div1;
    	let t2_value = (/*$character*/ ctx[2].initiative || 0) + "";
    	let t2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			abbr = element("abbr");
    			abbr.textContent = "Init";
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			attr_dev(abbr, "title", "Initiative");
    			add_location(abbr, file$3, 31, 16, 662);
    			attr_dev(div0, "class", "score-name");
    			add_location(div0, file$3, 30, 12, 621);
    			attr_dev(div1, "class", "score");
    			add_location(div1, file$3, 33, 12, 730);
    			add_location(div2, file$3, 29, 8, 603);
    			attr_dev(div3, "class", "initiative row svelte-1e1bmdx");
    			add_location(div3, file$3, 28, 4, 544);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, abbr);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, t2);

    			if (!mounted) {
    				dispose = listen_dev(div3, "click", /*handleRoll*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$character*/ 4 && t2_value !== (t2_value = (/*$character*/ ctx[2].initiative || 0) + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(19:0) <Die   onClose={() => result = null}   result={result}   message={{     formula: '1d6',     scoreName: 'Agility',     score: abilities.agility,     roll   }} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let die;
    	let current;

    	die = new Die({
    			props: {
    				onClose: /*func*/ ctx[5],
    				result: /*result*/ ctx[0],
    				message: {
    					formula: '1d6',
    					scoreName: 'Agility',
    					score: /*abilities*/ ctx[3].agility,
    					roll: /*roll*/ ctx[1]
    				},
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(die.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(die, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const die_changes = {};
    			if (dirty & /*result*/ 1) die_changes.onClose = /*func*/ ctx[5];
    			if (dirty & /*result*/ 1) die_changes.result = /*result*/ ctx[0];

    			if (dirty & /*roll*/ 2) die_changes.message = {
    				formula: '1d6',
    				scoreName: 'Agility',
    				score: /*abilities*/ ctx[3].agility,
    				roll: /*roll*/ ctx[1]
    			};

    			if (dirty & /*$$scope, $character*/ 68) {
    				die_changes.$$scope = { dirty, ctx };
    			}

    			die.$set(die_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(die.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(die.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(die, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(2, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Initiaitve', slots, []);
    	const { abilities } = $character;
    	let result = null;
    	let roll = 1;

    	// Handlers
    	const handleRoll = () => {
    		$$invalidate(1, roll = rollFormula([1, 'd', 6]));
    		$$invalidate(0, result = roll + abilities.agility);
    		set_store_value(character, $character.initiative = result, $character);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Initiaitve> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(0, result = null);

    	$$self.$capture_state = () => ({
    		Die,
    		character,
    		rollFormula,
    		abilities,
    		result,
    		roll,
    		handleRoll,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ('result' in $$props) $$invalidate(0, result = $$props.result);
    		if ('roll' in $$props) $$invalidate(1, roll = $$props.roll);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [result, roll, $character, abilities, handleRoll, func];
    }

    class Initiaitve extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Initiaitve",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/CharacterSheet/Header.svelte generated by Svelte v3.46.4 */
    const file$2 = "src/components/CharacterSheet/Header.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let header;
    	let h1;
    	let t0_value = /*$character*/ ctx[0].name + "";
    	let t0;
    	let t1;
    	let h2;
    	let t2_value = /*$character*/ ctx[0].className + "";
    	let t2;
    	let t3;
    	let div0;
    	let initiaitve;
    	let t4;
    	let hitpoints;
    	let current;
    	initiaitve = new Initiaitve({ $$inline: true });
    	hitpoints = new HitPoints({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			header = element("header");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			h2 = element("h2");
    			t2 = text(t2_value);
    			t3 = space();
    			div0 = element("div");
    			create_component(initiaitve.$$.fragment);
    			t4 = space();
    			create_component(hitpoints.$$.fragment);
    			attr_dev(h1, "class", "h1 svelte-1hr8ad4");
    			add_location(h1, file$2, 9, 8, 327);
    			attr_dev(h2, "class", "h2 svelte-1hr8ad4");
    			add_location(h2, file$2, 10, 8, 373);
    			add_location(header, file$2, 8, 4, 310);
    			attr_dev(div0, "class", "hp-wrapper svelte-1hr8ad4");
    			add_location(div0, file$2, 12, 4, 434);
    			attr_dev(div1, "id", "character-header");
    			attr_dev(div1, "class", "theme-black svelte-1hr8ad4");
    			add_location(div1, file$2, 6, 0, 171);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, header);
    			append_dev(header, h1);
    			append_dev(h1, t0);
    			append_dev(header, t1);
    			append_dev(header, h2);
    			append_dev(h2, t2);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			mount_component(initiaitve, div0, null);
    			append_dev(div0, t4);
    			mount_component(hitpoints, div0, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$character*/ 1) && t0_value !== (t0_value = /*$character*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*$character*/ 1) && t2_value !== (t2_value = /*$character*/ ctx[0].className + "")) set_data_dev(t2, t2_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(initiaitve.$$.fragment, local);
    			transition_in(hitpoints.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(initiaitve.$$.fragment, local);
    			transition_out(hitpoints.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(initiaitve);
    			destroy_component(hitpoints);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(0, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		character,
    		HitPoints,
    		Initiaitve,
    		$character
    	});

    	return [$character];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/CharacterSheet/CharacterSheet.svelte generated by Svelte v3.46.4 */
    const file$1 = "src/components/CharacterSheet/CharacterSheet.svelte";

    // (23:0) {#if !isEmpty($character)}
    function create_if_block(ctx) {
    	let article;
    	let header;
    	let t0;
    	let scores;
    	let t1;
    	let div4;
    	let div0;
    	let button0;
    	let t2;
    	let t3_value = /*$character*/ ctx[3]?.omens?.current + "";
    	let t3;
    	let t4;
    	let button0_disabled_value;
    	let t5;
    	let div1;
    	let button1;
    	let t6;
    	let t7_value = (/*$character*/ ctx[3]?.powers || 0) + "";
    	let t7;
    	let t8;
    	let button1_disabled_value;
    	let t9;
    	let div2;
    	let button2;
    	let t11;
    	let div3;
    	let button3;
    	let t13;
    	let armorworn;
    	let t14;
    	let weaponscarried;
    	let t15;
    	let equipment;
    	let t16;
    	let incrementer;
    	let t17;
    	let omens;
    	let t18;
    	let powers;
    	let t19;
    	let rest;
    	let current;
    	let mounted;
    	let dispose;
    	header = new Header({ $$inline: true });
    	scores = new Scores({ $$inline: true });
    	armorworn = new ArmorWorn({ $$inline: true });
    	weaponscarried = new WeaponsCarried({ $$inline: true });
    	equipment = new Equipment_1({ $$inline: true });

    	incrementer = new Incrementer({
    			props: {
    				title: "Silver",
    				value: /*$character*/ ctx[3].silver,
    				increment: partial$1(setSilver, [1]),
    				decrement: partial$1(setSilver, [-1]),
    				set: /*func*/ ctx[7]
    			},
    			$$inline: true
    		});

    	omens = new Omens({
    			props: {
    				show: /*showOmens*/ ctx[0],
    				onClose: /*func_1*/ ctx[8]
    			},
    			$$inline: true
    		});

    	powers = new Powers({
    			props: {
    				show: /*showPowers*/ ctx[1],
    				onClose: /*func_2*/ ctx[9]
    			},
    			$$inline: true
    		});

    	rest = new Rest({
    			props: {
    				show: /*showRest*/ ctx[2],
    				onClose: /*func_3*/ ctx[10]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			article = element("article");
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(scores.$$.fragment);
    			t1 = space();
    			div4 = element("div");
    			div0 = element("div");
    			button0 = element("button");
    			t2 = text("Omens (");
    			t3 = text(t3_value);
    			t4 = text(")");
    			t5 = space();
    			div1 = element("div");
    			button1 = element("button");
    			t6 = text("Powers (");
    			t7 = text(t7_value);
    			t8 = text(")");
    			t9 = space();
    			div2 = element("div");
    			button2 = element("button");
    			button2.textContent = "Rest";
    			t11 = space();
    			div3 = element("div");
    			button3 = element("button");
    			button3.textContent = "Get Better";
    			t13 = space();
    			create_component(armorworn.$$.fragment);
    			t14 = space();
    			create_component(weaponscarried.$$.fragment);
    			t15 = space();
    			create_component(equipment.$$.fragment);
    			t16 = space();
    			create_component(incrementer.$$.fragment);
    			t17 = space();
    			create_component(omens.$$.fragment);
    			t18 = space();
    			create_component(powers.$$.fragment);
    			t19 = space();
    			create_component(rest.$$.fragment);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "b svelte-9vsq3q");
    			button0.disabled = button0_disabled_value = /*$character*/ ctx[3]?.omens?.current === 0;
    			add_location(button0, file$1, 30, 12, 954);
    			add_location(div0, file$1, 29, 8, 936);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "b svelte-9vsq3q");
    			button1.disabled = button1_disabled_value = /*$character*/ ctx[3]?.powers === 0;
    			add_location(button1, file$1, 40, 12, 1258);
    			add_location(div1, file$1, 39, 8, 1240);
    			attr_dev(button2, "type", "button");
    			attr_dev(button2, "class", "b svelte-9vsq3q");
    			add_location(button2, file$1, 50, 12, 1553);
    			add_location(div2, file$1, 49, 8, 1535);
    			attr_dev(button3, "type", "button");
    			button3.disabled = true;
    			attr_dev(button3, "class", "b svelte-9vsq3q");
    			add_location(button3, file$1, 59, 12, 1764);
    			add_location(div3, file$1, 58, 8, 1746);
    			attr_dev(div4, "class", "row row-padded");
    			add_location(div4, file$1, 28, 4, 899);
    			add_location(article, file$1, 23, 0, 828);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			mount_component(header, article, null);
    			append_dev(article, t0);
    			mount_component(scores, article, null);
    			append_dev(article, t1);
    			append_dev(article, div4);
    			append_dev(div4, div0);
    			append_dev(div0, button0);
    			append_dev(button0, t2);
    			append_dev(button0, t3);
    			append_dev(button0, t4);
    			append_dev(div4, t5);
    			append_dev(div4, div1);
    			append_dev(div1, button1);
    			append_dev(button1, t6);
    			append_dev(button1, t7);
    			append_dev(button1, t8);
    			append_dev(div4, t9);
    			append_dev(div4, div2);
    			append_dev(div2, button2);
    			append_dev(div4, t11);
    			append_dev(div4, div3);
    			append_dev(div3, button3);
    			append_dev(article, t13);
    			mount_component(armorworn, article, null);
    			append_dev(article, t14);
    			mount_component(weaponscarried, article, null);
    			append_dev(article, t15);
    			mount_component(equipment, article, null);
    			append_dev(article, t16);
    			mount_component(incrementer, article, null);
    			append_dev(article, t17);
    			mount_component(omens, article, null);
    			append_dev(article, t18);
    			mount_component(powers, article, null);
    			append_dev(article, t19);
    			mount_component(rest, article, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[4], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[5], false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*$character*/ 8) && t3_value !== (t3_value = /*$character*/ ctx[3]?.omens?.current + "")) set_data_dev(t3, t3_value);

    			if (!current || dirty & /*$character*/ 8 && button0_disabled_value !== (button0_disabled_value = /*$character*/ ctx[3]?.omens?.current === 0)) {
    				prop_dev(button0, "disabled", button0_disabled_value);
    			}

    			if ((!current || dirty & /*$character*/ 8) && t7_value !== (t7_value = (/*$character*/ ctx[3]?.powers || 0) + "")) set_data_dev(t7, t7_value);

    			if (!current || dirty & /*$character*/ 8 && button1_disabled_value !== (button1_disabled_value = /*$character*/ ctx[3]?.powers === 0)) {
    				prop_dev(button1, "disabled", button1_disabled_value);
    			}

    			const incrementer_changes = {};
    			if (dirty & /*$character*/ 8) incrementer_changes.value = /*$character*/ ctx[3].silver;
    			incrementer.$set(incrementer_changes);
    			const omens_changes = {};
    			if (dirty & /*showOmens*/ 1) omens_changes.show = /*showOmens*/ ctx[0];
    			if (dirty & /*showOmens*/ 1) omens_changes.onClose = /*func_1*/ ctx[8];
    			omens.$set(omens_changes);
    			const powers_changes = {};
    			if (dirty & /*showPowers*/ 2) powers_changes.show = /*showPowers*/ ctx[1];
    			if (dirty & /*showPowers*/ 2) powers_changes.onClose = /*func_2*/ ctx[9];
    			powers.$set(powers_changes);
    			const rest_changes = {};
    			if (dirty & /*showRest*/ 4) rest_changes.show = /*showRest*/ ctx[2];
    			if (dirty & /*showRest*/ 4) rest_changes.onClose = /*func_3*/ ctx[10];
    			rest.$set(rest_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(scores.$$.fragment, local);
    			transition_in(armorworn.$$.fragment, local);
    			transition_in(weaponscarried.$$.fragment, local);
    			transition_in(equipment.$$.fragment, local);
    			transition_in(incrementer.$$.fragment, local);
    			transition_in(omens.$$.fragment, local);
    			transition_in(powers.$$.fragment, local);
    			transition_in(rest.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(scores.$$.fragment, local);
    			transition_out(armorworn.$$.fragment, local);
    			transition_out(weaponscarried.$$.fragment, local);
    			transition_out(equipment.$$.fragment, local);
    			transition_out(incrementer.$$.fragment, local);
    			transition_out(omens.$$.fragment, local);
    			transition_out(powers.$$.fragment, local);
    			transition_out(rest.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			destroy_component(header);
    			destroy_component(scores);
    			destroy_component(armorworn);
    			destroy_component(weaponscarried);
    			destroy_component(equipment);
    			destroy_component(incrementer);
    			destroy_component(omens);
    			destroy_component(powers);
    			destroy_component(rest);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(23:0) {#if !isEmpty($character)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let show_if = !isEmpty$1(/*$character*/ ctx[3]);
    	let if_block_anchor;
    	let current;
    	let if_block = show_if && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$1();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$character*/ 8) show_if = !isEmpty$1(/*$character*/ ctx[3]);

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$character*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, 'character');
    	component_subscribe($$self, character, $$value => $$invalidate(3, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CharacterSheet', slots, []);
    	let showOmens = false;
    	let showPowers = false;
    	let showRest = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CharacterSheet> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, showOmens = true);
    	const click_handler_1 = () => $$invalidate(1, showPowers = true);
    	const click_handler_2 = () => $$invalidate(2, showRest = true);
    	const func = num => setSilver(num);
    	const func_1 = () => $$invalidate(0, showOmens = false);
    	const func_2 = () => $$invalidate(1, showPowers = false);
    	const func_3 = () => $$invalidate(2, showRest = false);

    	$$self.$capture_state = () => ({
    		isEmpty: isEmpty$1,
    		partial: partial$1,
    		character,
    		setSilver,
    		Scores,
    		Defense,
    		Rest,
    		Miseries,
    		Omens,
    		Powers,
    		ArmorWorn,
    		WeaponsCarried,
    		Equipment: Equipment_1,
    		Header,
    		roll,
    		SlideIn,
    		Incrementer,
    		showOmens,
    		showPowers,
    		showRest,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ('showOmens' in $$props) $$invalidate(0, showOmens = $$props.showOmens);
    		if ('showPowers' in $$props) $$invalidate(1, showPowers = $$props.showPowers);
    		if ('showRest' in $$props) $$invalidate(2, showRest = $$props.showRest);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		showOmens,
    		showPowers,
    		showRest,
    		$character,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		func,
    		func_1,
    		func_2,
    		func_3
    	];
    }

    class CharacterSheet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CharacterSheet",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.46.4 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let header;
    	let h1;
    	let t1;
    	let main;
    	let div;
    	let charactersheet;
    	let t2;
    	let footer;
    	let p0;
    	let t4;
    	let p1;
    	let t6;
    	let p2;
    	let a0;
    	let t8;
    	let a1;
    	let current;
    	charactersheet = new CharacterSheet({ $$inline: true });

    	const block = {
    		c: function create() {
    			header = element("header");
    			h1 = element("h1");
    			h1.textContent = "SCVUMGRINDER";
    			t1 = space();
    			main = element("main");
    			div = element("div");
    			create_component(charactersheet.$$.fragment);
    			t2 = space();
    			footer = element("footer");
    			p0 = element("p");
    			p0.textContent = "Scvmgrinder is an independent production by James Krayer and is not affiliated with Ockult Örtmästare Games or Stockholm Kartell. It is published under the MÖRK BORG Third Party License.";
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "MÖRK BORG is copyright Ockult Örtmästare Games and Stockholm Kartell.";
    			t6 = space();
    			p2 = element("p");
    			a0 = element("a");
    			a0.textContent = "GitHub";
    			t8 = text(" |  ");
    			a1 = element("a");
    			a1.textContent = "MÖRK BORG";
    			add_location(h1, file, 5, 1, 166);
    			attr_dev(header, "id", "global-header");
    			attr_dev(header, "class", "theme-magenta row row-polar");
    			add_location(header, file, 4, 0, 101);
    			attr_dev(div, "id", "stage");
    			add_location(div, file, 9, 1, 216);
    			attr_dev(main, "id", "app");
    			add_location(main, file, 8, 0, 199);
    			add_location(p0, file, 15, 1, 320);
    			add_location(p1, file, 16, 1, 515);
    			attr_dev(a0, "href", "https://github.com/jkrayer/scvmgrinder");
    			add_location(a0, file, 17, 4, 596);
    			attr_dev(a1, "href", "https://morkborg.com/");
    			add_location(a1, file, 17, 67, 659);
    			add_location(p2, file, 17, 1, 593);
    			attr_dev(footer, "id", "global-footer");
    			attr_dev(footer, "class", "theme-black");
    			add_location(footer, file, 14, 0, 271);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, h1);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			mount_component(charactersheet, div, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, footer, anchor);
    			append_dev(footer, p0);
    			append_dev(footer, t4);
    			append_dev(footer, p1);
    			append_dev(footer, t6);
    			append_dev(footer, p2);
    			append_dev(p2, a0);
    			append_dev(p2, t8);
    			append_dev(p2, a1);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(charactersheet.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(charactersheet.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(main);
    			destroy_component(charactersheet);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ CharacterSheet });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var app = new App({
    	target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
