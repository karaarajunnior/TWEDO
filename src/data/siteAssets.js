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

// A helper to tokenize a string and extract key terms
const getKeywords = (str) => {
  if (!str) return [];
  const stopwords = new Set(['and', 'the', 'in', 'on', 'of', 'to', 'for', 'with', 'a', 'an', 'our', 'us', 'at', 'is', 'was', 'were', 'been', 'by', 'as', 'its', 'from', 'our', 'their', 'about', 'sensitization', 'engagement', 'dialogue', 'drive', 'prevalence', 'prevention', 'treatment', 'care', 'services', 'visit', 'challenge', 'challenges', 'delivery', 'document', 'advocate', 'improved', 'visiting', 'field']);
  return str.toLowerCase()
    .replace(/[^\w\s-]/g, ' ') // keep hyphens for words like covid-19
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopwords.has(word));
};

// A smart asset path resolver that maps logical/referenced paths to physical file locations on disk
// It also accepts an optional contextText (e.g. event or activity title/text) to scan available assets
// for closely related folder/file names.
export const getAssetPath = (image, contextText) => {
  // 1. Context-aware search (semantic matching based on title/description keywords)
  if (contextText) {
    const keywords = getKeywords(contextText);
    if (keywords.length > 0) {
      const candidates = [];

      for (const asset of imageAssets) {
        let score = 0;
        const lowerPath = asset.path.toLowerCase();
        
        // Match keywords against the asset path
        for (const word of keywords) {
          if (lowerPath.includes(word)) {
            score += 10;
            // Extra weight if keyword is in the filename portion itself
            const filename = lowerPath.split('/').pop() || '';
            if (filename.includes(word)) {
              score += 5;
            }
          }
        }

        // Semantic folder/file boosts for critical themes
        const semanticRules = [
          { keys: ['malaria'], matchers: ['malaria awareness'] },
          { keys: ['tailor', 'tailoring', 'sweater', 'knitting', 'needle'], matchers: ['tailorig', 'tailoring-atiira', 'tailoring-kapelebyong'] },
          { keys: ['sanitary', 'pad', 'pads', 'menstrual', 'cup', 'hygiene', 'reusable'], matchers: ['training on sanitary pads'] },
          { keys: ['hospital', 'referral', 'healthcare', 'visit', 'mngmt', 'management'], matchers: ['hospital'] },
          { keys: ['leadership', 'summit', 'meeting', 'district', 'governance', 'officer', 'coordinator', 'lead'], matchers: ['leadership', 'district_meeting'] },
          { keys: ['info', 'gathering', 'survey', 'advocacy', 'sensitization', 'community', 'dialogue', 'campaign', 'gbv', 'violence', 'activism'], matchers: ['info_gathering', 'communitySHRHSensitization1'] },
          { keys: ['bcp', 'concrete', 'brick', 'construction', 'building'], matchers: ['bcp-construction', 'bcp-orungo'] }
        ];

        for (const rule of semanticRules) {
          // If the context text contains any of the keys
          const matchesKey = rule.keys.some(key => keywords.includes(key) || contextText.toLowerCase().includes(key));
          if (matchesKey) {
            // Check if this asset path contains any of the matcher subfolders or filenames
            const matchesMatcher = rule.matchers.some(m => lowerPath.includes(m));
            if (matchesMatcher) {
              score += 25; // Large boost to group these assets
            }
          }
        }

        if (score > 0) {
          candidates.push({ asset, score });
        }
      }

      if (candidates.length > 0) {
        // Sort candidates by score descending, then path length ascending (shorter paths are cleaner)
        candidates.sort((a, b) => b.score - a.score || a.asset.path.length - b.asset.path.length);
        const topScore = candidates[0].score;
        const topCandidates = candidates.filter(c => c.score === topScore);

        // Deterministically choose one of the best candidates using a hash of the context text
        let hash = 0;
        for (let i = 0; i < contextText.length; i++) {
          hash = (hash * 31 + contextText.charCodeAt(i)) >>> 0;
        }
        const selectedIndex = hash % topCandidates.length;
        return topCandidates[selectedIndex].asset.src;
      }
    }
  }

  // 2. Regular fallback resolver if no contextText is provided or if no candidate is found
  if (!image) return '';
  if (image.startsWith('/')) return image;

  let cleanImage = image.replace(/^\/?assets\//, '');

  const overrides = {
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.47.jpeg': 'activities/district_meeting/districtmeeting (1).jpeg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.41.jpeg': 'activities/district_meeting/districtmeeting (2).jpeg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.37.jpeg': 'activities/district_meeting/districtmeeting (3).jpeg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.34.jpeg': 'activities/district_meeting/districtmeeting (4).jpeg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.45.jpeg': 'activities/district_meeting/districtmeeting (5).jpeg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.36.jpeg': 'activities/district_meeting/districtmeeting (6).jpeg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.39.jpeg': 'activities/district_meeting/districtmeeting (7).jpeg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.44.jpeg': 'activities/district_meeting/districtmeeting (8).jpeg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.48.jpeg': 'activities/district_meeting/districtmeeting (9).jpeg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.50.jpeg': 'activities/district_meeting/districtmeeting (10).jpeg',
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.44.jpeg': 'activities/info_gathering/WhatsApp Image 2026-05-11 at 19.30.45.jpeg',
    'hospital/hospital-visit-1.jpg': 'activities/hospital/hospital2 (1).jpeg',
    'hospital/hospital-visit-2.jpg': 'activities/hospital/hospital2 (2).jpeg',
    'hospital/hospital-visit-3.jpg': 'activities/hospital/hospital2 (3).jpeg',
    'hospital/hospital-visit-4.jpg': 'activities/hospital/hospital2 (4).jpeg',
    'hospital/hospital-visit-5.jpg': 'activities/hospital/hospital2 (5).jpeg'
  };

  if (overrides[cleanImage]) {
    cleanImage = overrides[cleanImage];
  } else {
    const subfolders = ['district_meeting', 'hospital', 'info_gathering', 'leadership', 'tailorig', 'training on sanitary pads', 'malaria awareness'];
    const otherFolders = ['other_1', 'other_2', 'other_3'];

    const segments = cleanImage.split('/');
    const firstSegment = segments[0];

    if (subfolders.includes(firstSegment)) {
      cleanImage = 'activities/' + cleanImage;
    } else if (otherFolders.includes(firstSegment)) {
      cleanImage = 'others/' + cleanImage;
    }

    if (cleanImage.includes('hospital/hospital-visit-')) {
       const match = cleanImage.match(/hospital-visit-(\d+)\.jpg/);
       if (match) {
          const num = match[1];
          cleanImage = `activities/hospital/hospital2 (${num}).jpeg`;
       }
    }
  }

  const cleanImageEncoded = cleanImage.split('/').map(encodeURIComponent).join('/');
  const targetUrl = `/assets/${cleanImageEncoded}`;
  
  const exists = imageAssets.some(asset => asset.src === targetUrl) || videoAssets.some(asset => asset.src === targetUrl);
  if (exists) {
    return targetUrl;
  }

  const segments = cleanImage.split('/');
  const filename = segments.pop();
  const dirPath = segments.join('/');

  if (dirPath) {
    const siblingAssets = imageAssets.filter(asset => asset.path.startsWith(dirPath + '/'));
    if (siblingAssets.length > 0) {
      let hash = 0;
      for (let i = 0; i < filename.length; i++) {
        hash = (hash * 31 + filename.charCodeAt(i)) >>> 0;
      }
      const selectedIndex = hash % siblingAssets.length;
      return siblingAssets[selectedIndex].src;
    }
  }

  return `/assets/${cleanImage.split('/').map(encodeURIComponent).join('/')}`;
};
