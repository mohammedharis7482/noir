import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";
import { PLATE_DIRECTORY, type Plate } from "@/content/plates";

const platesFolder = path.join(process.cwd(), "public", PLATE_DIRECTORY);

/**
 * Whether a plate's photograph is in public/images/plates. It is checked on
 * the server while rendering, so a missing file becomes the placeholder
 * block rather than a broken image. Where the folder itself is missing (a
 * serverless function does not ship public/), the file is assumed present.
 */
export function hasPlateFile(plate: Plate): boolean {
  return !existsSync(platesFolder) || existsSync(path.join(platesFolder, plate.file));
}
