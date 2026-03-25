const siteUrlEnv = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrlEnv) {
  throw new Error("Missing NEXT_PUBLIC_SITE_URL in environment variables.");
}

export const siteUrl = siteUrlEnv.replace(/\/$/, "");
