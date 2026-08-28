export const PERSONALIZATION_MAX_FILE_BYTES = 5 * 1024 * 1024;

export const PERSONALIZATION_ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "application/postscript",
  "application/illustrator",
] as const;

export const PERSONALIZATION_ACCEPTED_EXTENSIONS = [
  ".pdf",
  ".ai",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".eps",
] as const;

export const PERSONALIZATION_ACCEPT_ATTRIBUTE = PERSONALIZATION_ACCEPTED_EXTENSIONS.join(",");

export type PersonalizationFileValidation =
  | { ok: true; file: File }
  | { ok: false; message: string };

function getFileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot).toLowerCase() : "";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function validatePersonalizationFile(file: File): PersonalizationFileValidation {
  const extension = getFileExtension(file.name);
  const mimeOk =
    file.type === "" ||
    PERSONALIZATION_ACCEPTED_MIME_TYPES.some((type) => type === file.type);
  const extensionOk = PERSONALIZATION_ACCEPTED_EXTENSIONS.some((ext) => ext === extension);

  if (!extensionOk && !mimeOk) {
    return {
      ok: false,
      message: "Format non accepté. Utilisez PDF, AI, SVG, PNG ou JPG.",
    };
  }

  if (file.size > PERSONALIZATION_MAX_FILE_BYTES) {
    return {
      ok: false,
      message: `Fichier trop volumineux (${formatFileSize(file.size)}). Taille maximale : 5 Mo.`,
    };
  }

  if (file.size === 0) {
    return { ok: false, message: "Le fichier est vide." };
  }

  return { ok: true, file };
}
