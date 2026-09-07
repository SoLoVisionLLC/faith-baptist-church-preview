const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
execFileSync('python3', ['build.py'], { cwd: root, stdio: 'ignore' });
const html = fs.readFileSync(path.join(root, 'variants', 'c', 'events', 'index.html'), 'utf8');
const script = html.match(/<script>\n\(\(\) => \{[\s\S]*?<\/script>/)[0];
const markup = html.match(/<aside class="preview-dock"[\s\S]*?<\/aside>/)[0];

function scriptBody() {
  return script.slice(script.indexOf('<script>') + 8, script.lastIndexOf('</script>'));
}

function run(initialValue) {
  const listeners = {};
  const attributes = {};
  const body = {
    setAttribute(name, value) { attributes[name] = String(value); },
    removeAttribute(name) { delete attributes[name]; },
    hasAttribute(name) { return Object.hasOwn(attributes, name); },
  };
  const button = {
    dataset: { palette: 'original' },
    setAttribute(name, value) { this[name] = String(value); },
    addEventListener(name, callback) { listeners.original = callback; },
  };
  const logo = {
    dataset: { palette: 'logo' },
    setAttribute(name, value) { this[name] = String(value); },
    addEventListener(name, callback) { listeners.logo = callback; },
  };
  const toggle = {
    setAttribute(name, value) { this[name] = String(value); },
    addEventListener(name, callback) { listeners.toggle = callback; },
    textContent: 'Open design comparison',
  };
  const dock = {
    classList: {
      open: false,
      toggle() { this.open = !this.open; return this.open; },
    },
  };
  const storage = {
    value: initialValue,
    getItem() { return this.value; },
    setItem(_key, value) { this.value = value; },
  };
  const context = vm.createContext({
    document: {
      body,
      querySelector(selector) { return selector === '.preview-dock' ? dock : toggle; },
      querySelectorAll() { return [button, logo]; },
    },
    window: { localStorage: storage },
  });
  vm.runInContext(scriptBody(), context);
  return { attributes, button, logo, storage, listeners };
}

assert.match(markup, /aria-current="location"/);
assert.doesNotMatch(markup, /aria-current="page"/);
assert.equal(run(undefined).attributes['data-logo-palette'], undefined);
assert.equal(run('invalid').logo['aria-pressed'], 'false');
const state = run('logo');
assert.equal(state.attributes['data-logo-palette'], '');
assert.equal(state.logo['aria-pressed'], 'true');
state.listeners.original();
assert.equal(state.storage.value, 'original');
assert.equal(state.attributes['data-logo-palette'], undefined);
state.listeners.logo();
assert.equal(state.storage.value, 'logo');
assert.equal(state.attributes['data-logo-palette'], '');
console.log('preview dock palette persistence checks passed');