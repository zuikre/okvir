/**
 * OKVIR - GitHub Releases Update Engine & Community Download Metrics
 * Fetches latest release metadata directly from public GitHub Releases API.
 * - Zero telemetry: No third-party analytics servers or trackers.
 * - Compares SemVer against application version.
 * - Resolves OS-specific release assets (Debian/AppImage, Windows MSI, macOS DMG).
 * - Computes total community release downloads.
 */

export interface GitHubReleaseAsset {
  id: number;
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
  content_type: string;
}

export interface GitHubReleaseInfo {
  tagName: string;
  version: string;
  name: string;
  body: string;
  publishedAt: string;
  htmlUrl: string;
  assets: GitHubReleaseAsset[];
  totalDownloads: number;
  hasUpdate: boolean;
  osAssetUrl?: string;
  osAssetName?: string;
}

declare const __APP_VERSION__: string | undefined;
export const CURRENT_APP_VERSION: string =
  typeof __APP_VERSION__ !== 'undefined' && __APP_VERSION__ ? __APP_VERSION__ : '1.0.2';
const GITHUB_REPO = 'zuikre/okvir';

/**
 * Compare two SemVer strings (e.g. '1.1.0' vs '1.0.1')
 * Returns true if vRemote is strictly newer than vCurrent
 */
export function isNewerVersion(vRemote: string, vCurrent: string): boolean {
  const cleanRemote = vRemote.replace(/^v/, '').trim();
  const cleanCurrent = vCurrent.replace(/^v/, '').trim();

  const rParts = cleanRemote.split('.').map((n) => parseInt(n, 10) || 0);
  const cParts = cleanCurrent.split('.').map((n) => parseInt(n, 10) || 0);

  for (let i = 0; i < Math.max(rParts.length, cParts.length); i++) {
    const r = rParts[i] || 0;
    const c = cParts[i] || 0;
    if (r > c) return true;
    if (r < c) return false;
  }
  return false;
}

/**
 * Detect User OS and match best installer asset from release assets
 */
export function findBestAssetForPlatform(assets: GitHubReleaseAsset[]): { url: string; name: string } | undefined {
  if (typeof window === 'undefined' || !assets.length) return undefined;

  const ua = window.navigator.userAgent.toLowerCase();
  const isMac = ua.includes('macintosh') || ua.includes('mac os');
  const isWin = ua.includes('windows');
  const isLinux = !isMac && !isWin;

  if (isLinux) {
    const deb = assets.find((a) => a.name.endsWith('.deb') || a.name.includes('amd64.deb'));
    if (deb) return { url: deb.browser_download_url, name: deb.name };
    const appimage = assets.find((a) => a.name.endsWith('.AppImage'));
    if (appimage) return { url: appimage.browser_download_url, name: appimage.name };
  } else if (isWin) {
    const msi = assets.find((a) => a.name.endsWith('.msi'));
    if (msi) return { url: msi.browser_download_url, name: msi.name };
    const exe = assets.find((a) => a.name.endsWith('.exe'));
    if (exe) return { url: exe.browser_download_url, name: exe.name };
  } else if (isMac) {
    const dmg = assets.find((a) => a.name.endsWith('.dmg'));
    if (dmg) return { url: dmg.browser_download_url, name: dmg.name };
  }

  // Fallback to first available archive/binary
  const fallback = assets[0];
  return fallback ? { url: fallback.browser_download_url, name: fallback.name } : undefined;
}

export class OkvirUpdateChecker {
  private static cachedResult: GitHubReleaseInfo | null = null;
  private static lastCheckTime = 0;

  /**
   * Fetch and evaluate latest release from GitHub
   */
  static async checkLatestRelease(force = false, currentVer?: string): Promise<GitHubReleaseInfo | null> {
    const now = Date.now();
    // Cache result for 15 minutes unless forced
    if (!force && this.cachedResult && now - this.lastCheckTime < 15 * 60 * 1000) {
      return this.cachedResult;
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub Releases API responded with status ${response.status}`);
      }

      const data = await response.json();
      const baseVersion = currentVer || CURRENT_APP_VERSION;
      const tagName: string = data.tag_name || `v${baseVersion}`;
      const cleanVersion = tagName.replace(/^v/, '');
      const hasUpdate = isNewerVersion(cleanVersion, baseVersion);

      const rawAssets: any[] = Array.isArray(data.assets) ? data.assets : [];
      let totalDownloads = 0;

      const assets: GitHubReleaseAsset[] = rawAssets.map((a: any) => {
        const count = Number(a.download_count) || 0;
        totalDownloads += count;
        return {
          id: a.id,
          name: a.name,
          size: a.size,
          download_count: count,
          browser_download_url: a.browser_download_url,
          content_type: a.content_type,
        };
      });

      const matchedAsset = findBestAssetForPlatform(assets);

      const result: GitHubReleaseInfo = {
        tagName,
        version: cleanVersion,
        name: data.name || `Okvir ${tagName}`,
        body: data.body || 'No release notes provided.',
        publishedAt: data.published_at || new Date().toISOString(),
        htmlUrl: data.html_url || `https://github.com/${GITHUB_REPO}/releases`,
        assets,
        totalDownloads,
        hasUpdate,
        osAssetUrl: matchedAsset?.url,
        osAssetName: matchedAsset?.name,
      };

      this.cachedResult = result;
      this.lastCheckTime = now;
      return result;
    } catch (err) {
      console.warn('Okvir update check failed:', err);
      return null;
    }
  }
}
