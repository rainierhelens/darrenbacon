/** Set to true when the Marathon art direction case study is ready to publish. */
export const marathonCaseStudyPublished = false;

/** Local preview before publish — full case study is available in `astro dev` only. */
export const marathonCaseStudyVisible =
  marathonCaseStudyPublished || import.meta.env.DEV;

export const MARATHON_LOGO = '/images/Marathon/Marathon_Logo_WordMark_Green_TRANSPARENT.png';

/**
 * Leadership brief links (header, About, Contact, homepage) open the live
 * HTML page at /brief/. A downloadable PDF is offered from that page.
 */
export const resumeAvailable = true;
export const RESUME_URL = '/brief/';
export const RESUME_LABEL = 'Leadership brief';
export const RESUME_PDF_FILENAME = 'Darren-Bacon-Leadership-Brief.pdf';

/**
 * Leave-behind UTMs — only when THIS SITE is the click source (e.g. the
 * PDF on /brief/). Do not add UTMs to internal nav.
 *
 * Paste on properties that point at darrenbacon.com:
 *   LinkedIn featured:
 *     https://www.darrenbacon.com/?utm_source=linkedin&utm_medium=profile&utm_campaign=leavebehind
 *   Email signature:
 *     https://www.darrenbacon.com/?utm_source=email&utm_medium=signature&utm_campaign=leavebehind
 */
export const SITE_LEAVEBEHIND_UTM = 'utm_source=site&utm_medium=brief&utm_campaign=leavebehind';
export const RESUME_PDF_URL = `/darren-bacon-leadership-brief.pdf?${SITE_LEAVEBEHIND_UTM}`;

/**
 * Analytics — leave empty until you paste real IDs (scripts stay off).
 * GA4 Measurement ID looks like: G-XXXXXXXXXX
 * Clarity Project ID looks like: abcdefghij
 */
export const GA_MEASUREMENT_ID = 'G-2PWMSXQSZN';
export const CLARITY_PROJECT_ID = '';
