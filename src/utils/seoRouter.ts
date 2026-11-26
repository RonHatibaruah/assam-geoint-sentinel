import { TabType } from '../components/Navbar';

export interface RouteMeta {
  path: string;
  tab: TabType;
  title: string;
  description: string;
  breadcrumb: string;
}

export const BASE_URL = 'https://assam-geoint-sentinel.pages.dev';

export const ROUTE_CONFIG: Record<TabType, RouteMeta> = {
  dashboard: {
    path: '/dashboard',
    tab: 'dashboard',
    title: 'Bhu-Drishti Assam (ভূ-দৃষ্টি অসম) | AI LULC Sentinel Dashboard • NESFIC-D-21',
    description: "Statewide automated LULC change detection dashboard across Assam's 78,438 sq. km. Real-time multi-sensor Sentinel-1 SAR and Sentinel-2 optical earth observation pipeline.",
    breadcrumb: 'Executive Dashboard',
  },
  'map-studio': {
    path: '/map-studio',
    tab: 'map-studio',
    title: 'Map Studio | Bi-Temporal Satellite Curtain & Cadastral Overlays • Bhu-Drishti Assam',
    description: 'Interactive bi-temporal satellite curtain viewer comparing Sentinel-2 optical and Sentinel-1 SAR radar imagery aligned to Assam revenue cadastral dag plots.',
    breadcrumb: 'Bi-Temporal Map Studio',
  },
  alerts: {
    path: '/alerts',
    tab: 'alerts',
    title: 'Encroachment & Anomaly Alert Queue | Cadastral Violation Tracker • Bhu-Drishti Assam',
    description: 'AI-flagged unauthorized land-cover conversions in Kamrup Metro, Majuli, and Ramsar wetlands with automated statutory field inspection dossiers for Circle Officers.',
    breadcrumb: 'Anomaly Alert Queue',
  },
  playground: {
    path: '/playground',
    tab: 'playground',
    title: 'GeoAI Model Playground | ChangeFormer & Swin-UNet Inference • Bhu-Drishti Assam',
    description: 'Test bi-temporal deep learning change detection models (ChangeFormer-v2, Swin-UNet), optical-SAR cross-attention tensors, and pixel-level LULC transition matrices.',
    breadcrumb: 'GeoAI Model Playground',
  },
  gallery: {
    path: '/gallery',
    tab: 'gallery',
    title: 'Infographics & Evidence Gallery (18 Architecture Blueprints) • Bhu-Drishti Assam',
    description: '18 high-resolution 16:9 widescreen technological architecture blueprints and infographic evidence for the NESFIC-D-21 grant proposal.',
    breadcrumb: 'Supporting Evidence Gallery',
  },
  proposal: {
    path: '/proposal',
    tab: 'proposal',
    title: 'NESFIC-D-21 Grant Proposal Submission Dossier | Flugelsoft Labs',
    description: 'All 12 official government proposal sections for Assam Startup NESFIC 2026, strictly compliant with <=500 words per section and verified evidence.',
    breadcrumb: 'Grant Proposal Dossier',
  },
};

/**
 * Determine the active tab from window.location.pathname or hash
 */
export function getRouteFromLocation(): {
  tab: TabType;
  hotspotId?: string;
  alertId?: string;
  sectionId?: number;
} {
  if (typeof window === 'undefined') {
    return { tab: 'dashboard' };
  }

  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  const searchParams = new URLSearchParams(window.location.search);

  // Check path or hash
  let tab: TabType = 'dashboard';
  if (pathname.includes('/map-studio') || hash === 'map-studio') {
    tab = 'map-studio';
  } else if (pathname.includes('/alerts') || hash === 'alerts') {
    tab = 'alerts';
  } else if (pathname.includes('/playground') || hash === 'playground') {
    tab = 'playground';
  } else if (pathname.includes('/gallery') || hash === 'gallery') {
    tab = 'gallery';
  } else if (pathname.includes('/proposal') || hash === 'proposal') {
    tab = 'proposal';
  } else if (pathname.includes('/dashboard') || hash === 'dashboard') {
    tab = 'dashboard';
  }

  const hotspotId = searchParams.get('hotspot') || undefined;
  const alertId = searchParams.get('alert') || undefined;
  const rawSection = searchParams.get('section');
  const sectionId = rawSection ? parseInt(rawSection, 10) : undefined;

  return { tab, hotspotId, alertId, sectionId };
}

/**
 * Update HTML document title, meta tags, and structured JSON-LD
 */
export function updateDocumentSEO(
  tab: TabType,
  params?: {
    hotspotName?: string;
    sectionTitle?: string;
    alertTitle?: string;
  }
) {
  if (typeof document === 'undefined') return;

  const config = ROUTE_CONFIG[tab] || ROUTE_CONFIG.dashboard;
  let pageTitle = config.title;
  let pageDescription = config.description;

  if (params?.hotspotName) {
    pageTitle = `${params.hotspotName} | Bi-Temporal Satellite Studio • Bhu-Drishti Assam`;
    pageDescription = `Inspect bi-temporal Sentinel optical and SAR change analysis for ${params.hotspotName} with cadastral plot overlays.`;
  } else if (params?.sectionTitle) {
    pageTitle = `${params.sectionTitle} | NESFIC-D-21 Proposal Dossier • Flugelsoft Labs`;
    pageDescription = `Official submission text for ${params.sectionTitle} formatted for Assam Startup NESFIC 2026.`;
  } else if (params?.alertTitle) {
    pageTitle = `${params.alertTitle} | Official Field Inspection Dossier • Bhu-Drishti Assam`;
    pageDescription = `Automated tamper-evident geospatial inspection notice and legal cadastral violation dossier for ${params.alertTitle}.`;
  }

  // 1. Update Title
  document.title = pageTitle;

  // 2. Helper to set or create meta tags
  const setMeta = (nameOrProp: string, value: string, isProp = false) => {
    const selector = isProp
      ? `meta[property="${nameOrProp}"]`
      : `meta[name="${nameOrProp}"]`;
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      if (isProp) {
        el.setAttribute('property', nameOrProp);
      } else {
        el.setAttribute('name', nameOrProp);
      }
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };

  // 3. Update Standard & Open Graph Meta Tags
  setMeta('description', pageDescription);
  const canonicalUrl = `${BASE_URL}${config.path}`;

  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  setMeta('og:title', pageTitle, true);
  setMeta('og:description', pageDescription, true);
  setMeta('og:url', canonicalUrl, true);
  setMeta('twitter:title', pageTitle);
  setMeta('twitter:description', pageDescription);
  setMeta('twitter:url', canonicalUrl);

  // 4. Update JSON-LD Structured Data
  let jsonLdEl = document.querySelector('#seo-structured-data');
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script');
    jsonLdEl.setAttribute('type', 'application/ld+json');
    jsonLdEl.id = 'seo-structured-data';
    document.head.appendChild(jsonLdEl);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GovernmentService',
        name: 'Bhu-Drishti Assam (ভূ-দৃষ্টি অসম)',
        alternateName: 'AI-Based Automated LULC Change Detection Sentinel',
        serviceType: 'Geospatial Earth Observation & Land Administration',
        provider: {
          '@type': 'GovernmentOrganization',
          name: 'Assam State Space Application Centre (ASSAC), Dept. of Science & Technology, Govt. of Assam',
        },
        funder: {
          '@type': 'Organization',
          name: 'Flugelsoft Labs (Lead Applicant: Kalyanjit Hatibaruah)',
          url: 'https://flugelsoft.com',
        },
        url: BASE_URL,
        description: config.description,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: config.breadcrumb,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  jsonLdEl.textContent = JSON.stringify(structuredData);
}
