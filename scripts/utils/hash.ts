import crypto from 'crypto';

export function contentHash(content: Buffer | string, length = 8) {
  return crypto
    .createHash('md5')
    .update(content)
    .digest('hex')
    .slice(0, length);
}
