/** Desktop installers attached to the latest GitHub release by
 * .github/workflows/desktop.yml -- the repo it publishes to (its
 * RELEASE_REPO variable) must be this one. File names come from
 * app/packages/desktop/electron-builder.yml's artifactName settings --
 * keep the two in sync. */
export const RELEASES = "https://github.com/pi-code-dev/CrewCo/releases";
const latest = (file: string) => `${RELEASES}/latest/download/${file}`;

export type Platform = "mac" | "windows" | "linux";

export interface Download {
  label: string;
  file: string;
  href: string;
}

export interface PlatformDownloads {
  name: string;
  /** Shown as the main button for this platform. */
  primary: Download;
  others: Download[];
  /** What to do the first time, since the builds aren't code-signed yet. */
  firstOpen: string;
}

function dl(label: string, file: string): Download {
  return { label, file, href: latest(file) };
}

export const DOWNLOADS: Record<Platform, PlatformDownloads> = {
  mac: {
    name: "macOS",
    primary: dl("Apple Silicon (.dmg)", "CrewCo-mac-arm64.dmg"),
    others: [dl("Intel (.dmg)", "CrewCo-mac-x64.dmg")],
    firstOpen:
      "Drag CrewCo into Applications. The first time you open it, macOS blocks it because it isn't signed yet: open System Settings → Privacy & Security and click Open Anyway.",
  },
  windows: {
    name: "Windows",
    primary: dl("Installer (.exe)", "CrewCo-win-setup.exe"),
    others: [],
    firstOpen:
      "Runs on x64 PCs, and on Arm PCs through Windows' built-in emulation. If SmartScreen warns that the publisher is unknown, click More info → Run anyway.",
  },
  linux: {
    name: "Linux",
    primary: dl("AppImage (x64)", "CrewCo-linux-x86_64.AppImage"),
    others: [
      dl(".deb (x64)", "CrewCo-linux-amd64.deb"),
      dl("AppImage (Arm64)", "CrewCo-linux-arm64.AppImage"),
      dl(".deb (Arm64)", "CrewCo-linux-arm64.deb"),
    ],
    firstOpen: "Make the AppImage executable (chmod +x) and run it, or install the .deb with sudo apt install ./CrewCo-linux-amd64.deb.",
  },
};

export const PLATFORMS: Platform[] = ["mac", "windows", "linux"];

/** Best guess at the visitor's OS. Browsers don't reliably say whether a
 * Mac is Apple Silicon or Intel, so macOS defaults to Apple Silicon and
 * the Intel build stays one click away. */
export function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const hint = `${nav.userAgentData?.platform ?? ""} ${nav.userAgent}`.toLowerCase();
  if (/iphone|ipad|android/.test(hint)) return null;
  if (hint.includes("mac")) return "mac";
  if (hint.includes("win")) return "windows";
  if (hint.includes("linux") || hint.includes("x11")) return "linux";
  return null;
}
