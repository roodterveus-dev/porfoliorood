// localStorage can throw (blocked site data, some private modes). Preferences
// are a convenience, so failures must never take the page down.
export function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Preference just won't persist.
  }
}
