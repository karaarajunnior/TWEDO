const imageModules = import.meta.glob('../../public/assets/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
});

const videoModules = import.meta.glob('../../public/assets/**/*.{mp4,webm,ogg,mov}', {
  eager: true,
  query: '?url',
  import: 'default'
});

const resourceModules = import.meta.glob('../../public/assets/resources/**/*.{pdf,doc,docx,ppt,pptx,xls,xlsx,txt,zip}', {
  eager: true,
  query: '?url',
  import: 'default'
});

const toPublicPath = (importPath) => importPath.replace(/^.*public\/assets\//, '');

const toPublicUrl = (assetPath) => `/assets/${assetPath.split('/').map(encodeURIComponent).join('/')}`;

const formatTitle = (assetPath) => {
  const filename = assetPath.split('/').pop() || assetPath;
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/^WhatsApp (Image|Video) \d{4}-\d{2}-\d{2} at /, 'Field $1 ')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const toAssetList = (modules) => Object.keys(modules)
  .map((importPath) => {
    const path = toPublicPath(importPath);
    return {
      path,
      src: toPublicUrl(path),
      title: formatTitle(path)
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

export const imageAssets = toAssetList(imageModules);
export const videoAssets = toAssetList(videoModules);
export const resourceAssets = toAssetList(resourceModules);

export const fieldStoryVideos = videoAssets.filter((asset) => asset.path.startsWith('video clips/'));
