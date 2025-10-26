import { readJSON, writeJSON, removeKey } from "../utils/storage.js";
import { makeError } from "../utils/errors.js";
import { LS_KEYS, TEST_USER } from "../utils/constants.js";

function ensureSeedUser() {
  const users = readJSON(LS_KEYS.USERS, []);
  const exists = users.some(
    (u) =>
      u.email?.toLowerCase() === TEST_USER.email.toLowerCase() &&
      u.password === TEST_USER.password
  );
  if (!exists) {
    writeJSON(LS_KEYS.USERS, [...users, TEST_USER]);
  }
}

export function signup({ email, password }) {
  ensureSeedUser();

  if (!email || !password) {
    throw makeError("VALIDATION_ERROR", "Email and password are required.", {
      fields: {
        email: !email ? "Required" : undefined,
        password: !password ? "Required" : undefined,
      },
    });
  }

  if (password.length < 6) {
    throw makeError(
      "VALIDATION_ERROR",
      "Password must be at least 6 characters.",
      { fields: { password: "Too short" } }
    );
  }

  const users = readJSON(LS_KEYS.USERS, []);
  const existsEmail = users.some(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );
  if (existsEmail) {
    throw makeError(
      "VALIDATION_ERROR",
      "That email is already registered.",
      { fields: { email: "Already in use" } }
    );
  }

  writeJSON(LS_KEYS.USERS, [...users, { email, password }]);
  writeJSON(LS_KEYS.SESSION, { email });

  return { email };
}

export function login({ email, password }) {
  ensureSeedUser();

  if (!email || !password) {
    throw makeError("VALIDATION_ERROR", "Email and password are required.", {
      fields: {
        email: !email ? "Required" : undefined,
        password: !password ? "Required" : undefined,
      },
    });
  }

  const users = readJSON(LS_KEYS.USERS, []);
  const found = users.find(
    (u) =>
      u.email?.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (!found) {
    throw makeError("AUTH_ERROR", "Invalid email or password.", {
      fields: {
        email: "Invalid credentials",
        password: "Invalid credentials",
      },
    });
  }

  writeJSON(LS_KEYS.SESSION, { email: found.email });
  return { email: found.email };
}

export function logout() {
  removeKey(LS_KEYS.SESSION);
  return true;
}

export function getSession() {
  const session = readJSON(LS_KEYS.SESSION, null);
  if (!session || !session.email) {
    throw makeError("AUTH_ERROR", "No valid session. Please log in.", {});
  }
  return session;
}
