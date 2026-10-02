# Security Policy

## Supported Versions

Security updates are actively maintained and provided for the following versions of Okvir:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

The Okvir development team takes the security and integrity of our interactive desktop learning engine seriously.

If you discover a potential security vulnerability in Okvir (including the desktop shell, WebAssembly Python sandbox, SQLite storage layer, or packaging pipeline), please **do not open a public issue**. Instead, report it privately:

1. **Email:** Send full details, reproduction steps, and proof-of-concept code to:  
   **`security@okvir.dev`** (or `contact@okvir.dev`)
2. **PGP / Sensitive Details:** If you wish to encrypt your communication, please request our security team's PGP key via email before transmitting sensitive exploits.
3. **Response Timeline:**
   * **Acknowledgment:** Within **24 hours**.
   * **Triaging & Severity Assessment:** Within **48 hours**.
   * **Patch / Mitigation Target:** Critical issues patched within **7 days**; standard issues within **14 days**.
4. **Responsible Disclosure:** We ask that you maintain confidentiality until we have authored, verified, and released a security advisory and patched binaries.

---

## Architectural Security Invariants

Okvir's architecture is built around defense-in-depth principles:

### 1. WebAssembly Sandbox Isolation (Dual Workers: Pyodide & DuckDB)
* User-written Python code executes **exclusively inside a dedicated Web Worker** running WebAssembly CPython 3.12 (Pyodide v0.26+).
* SQL analytical queries execute within an in-memory **DuckDB WebAssembly (v1.28.0)** worker sandbox.
* Neither Python nor SQL code can access host filesystem paths, host network sockets, or the desktop OS kernel.
* Filesystem access is strictly sandboxed inside Emscripten MEMFS and the browser Origin Private File System (`OPFS`) at `/workspace`.
* Infinite loops or runaway code execution are bounded by a 5-second hard watchdog timer and non-destructive `SharedArrayBuffer` interrupt signals without freezing the UI thread or compromising the host machine.

### 2. Cryptographic Package Verification (.okvir Chunks)
* Downloaded curriculum bundles and community packs must carry an **Ed25519 digital signature** generated with `minisign`.
* The Tauri native backend verifies both the SHA-256 block hash table and the Ed25519 signature before mounting or unpacking any `.okvir` container into the local curriculum database.
* Tampered or unsigned packages are rejected immediately with an integrity error.

### 3. Local-First & Zero-Telemetry Privacy
* Okvir does not collect or transmit user source code, quiz answers, progress states, or personally identifiable telemetry to any remote server by default.
* All data is persisted in a local embedded SQLite database operating in WAL mode.
