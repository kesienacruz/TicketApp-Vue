export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key) {
  window.localStorage.removeItem(key);
}
