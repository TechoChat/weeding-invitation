import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Automatic asset transfer for generated images
const srcHero = "C:\\Users\\Kevin\\.gemini\\antigravity-ide\\brain\\27c57550-dd84-4b18-abbb-b2970636acde\\couple_hero_1782625588387.png";
const destHero = path.join(process.cwd(), "public", "couple-hero.png");

const srcRitual = "C:\\Users\\Kevin\\.gemini\\antigravity-ide\\brain\\27c57550-dd84-4b18-abbb-b2970636acde\\couple_ritual_1782625656357.png";
const destRitual = path.join(process.cwd(), "public", "couple-ritual.png");

try {
  if (fs.existsSync(srcHero)) {
    fs.copyFileSync(srcHero, destHero);
    console.log("Assets: Successfully copied couple-hero.png");
  }
  if (fs.existsSync(srcRitual)) {
    fs.copyFileSync(srcRitual, destRitual);
    console.log("Assets: Successfully copied couple-ritual.png");
  }
} catch (err) {
  console.log("Assets: Automatic image transfer skipped/failed (normal if not running on local host):", err);
}

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ['10.43.110.113'],
  } as any,
};

export default nextConfig;

