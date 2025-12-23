# Backend Audit Checklist (G2A Integration)

## Configuration
- [ ] Env vars present: `G2A_API_URL` (with /integration-api/v1), `G2A_API_KEY`, `G2A_SECRET`, `G2A_ENV`, optional `G2A_TIMEOUT_MS`, `G2A_RETRY_MAX`.
- [ ] Non-prod defaults to sandbox.
- [ ] URLs validated (HTTPS, correct host); secrets masked in logs.

## HTTP Client
- [ ] Timeout 5–10s configured.
- [ ] Retries only on 429/5xx with jitter/backoff; cap attempts.
- [ ] No retry on 4xx.
- [ ] Correlation-id propagation.

## Auth
- [ ] Token cache with refresh-before-expiry.
- [ ] Fast-fail on invalid creds.

## Operations
- [ ] Product list/detail mapped and validated.
- [ ] Order create validates payload and handles errors.

## Webhooks
- [ ] Signature + nonce + timestamp validation (skew window, e.g., 5m).
- [ ] Idempotency store (DB/Redis) prevents double-processing.
- [ ] Replay protection for stale timestamps.

## Observability
- [ ] Structured logs: method/path/status/latency/retries, secrets masked.
- [ ] Metrics: success/error/retry counters; latency histogram; token TTL gauge; webhook validation failures.

## Health/Diagnostics
- [ ] Health endpoint checks token fetch probe and idempotency store connectivity.
- [ ] Build/lint/test commands pass (CI ready).

## Testing
- [ ] Unit: URL validator, signature/nonce/timestamp, retry policy, mappers.
- [ ] Integration (sandbox): token, product list/detail, order create, negative creds.
- [ ] E2E smoke: token → product → order → simulated webhook; verifies idempotency.

## Security
- [ ] Secrets stored only in env/secret manager; no logs.
- [ ] TLS enforced; host allowlist.
- [ ] Access to prod keys restricted/rotated.
