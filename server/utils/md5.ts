/**
 * 计算buffer的md5，在开发环境下使用SHA-1，Cloudflare环境下使用MD5
 * @param data
 * @returns
 */
export const bufferDigest = async (data: Buffer) => {
  const hashBuffer = await crypto.subtle.digest(
    { name: import.meta.dev ? "SHA-1" : "MD5" },
    data,
  );
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
