type Entry = {
  count: number;
  expiresAt: number;
};

const store = new Map<string, Entry>();

export function enforceRateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.expiresAt <= now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { ok: false, remaining: 0, resetAt: existing.expiresAt };
  }

  existing.count += 1;
  store.set(key, existing);

  return { ok: true, remaining: limit - existing.count };
}
