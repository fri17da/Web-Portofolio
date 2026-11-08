/**
 * Utility functions for handling Project Media (Images, Direct Videos, Embeds)
 */

export function detectMediaType(url) {
  if (!url) return 'image';
  const cleanUrl = url.split('?')[0].toLowerCase();
  if (cleanUrl.match(/\.(mp4|webm|ogg|mov|m4v)$/i)) {
    return 'video';
  }
  if (
    url.includes('drive.google.com') ||
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    url.includes('vimeo.com')
  ) {
    return 'embed';
  }
  return 'image';
}

export function getEmbedUrl(url) {
  if (!url) return '';

  // Google Drive file view / preview link
  const gdriveMatch = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=))([a-zA-Z0-9_-]+)/i);
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`;
  }

  // YouTube watch or short URL
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[3]) {
    return `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`;
  }

  return url;
}

export function parseMediaItem(item) {
  if (!item) return null;

  if (typeof item === 'object') {
    const src = item.src || item.url || '';
    const detected = detectMediaType(src);
    // If provider is an embeddable service (Google Drive, YouTube, Vimeo), prioritize 'embed'
    const type = detected === 'embed' ? 'embed' : (item.type || detected);
    return {
      src,
      type,
      title: item.title || item.caption || '',
      poster: item.poster || '',
      embedUrl: type === 'embed' ? getEmbedUrl(src) : null,
    };
  }

  const src = String(item).trim();
  const type = detectMediaType(src);
  return {
    src,
    type,
    title: '',
    poster: '',
    embedUrl: type === 'embed' ? getEmbedUrl(src) : null,
  };
}

/**
 * Normalizes project media from either `media`, `images`, or `video`/`videoUrl`
 */
export function getProjectMediaList(project) {
  if (!project) return [];

  const rawList = [];

  // 1. If explicit `media` array is provided, use it
  if (Array.isArray(project.media) && project.media.length > 0) {
    project.media.forEach((item) => rawList.push(item));
  } else if (Array.isArray(project.images) && project.images.length > 0) {
    project.images.forEach((item) => rawList.push(item));
  }

  // 2. If single video or videoUrl is provided and not already included, append or prepend
  const singleVideo = project.video || project.videoUrl;
  if (singleVideo && typeof singleVideo === 'string') {
    const exists = rawList.some((item) => (typeof item === 'string' ? item === singleVideo : item?.src === singleVideo));
    if (!exists) {
      rawList.unshift({
        src: singleVideo,
        type: detectMediaType(singleVideo),
        title: 'Video Demo Proyek',
      });
    }
  }

  return rawList.map(parseMediaItem).filter(Boolean);
}
