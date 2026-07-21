/** Set to true when the Marathon art direction case study is ready to publish. */
export const marathonCaseStudyPublished = false;

export const MARATHON_LOGO = '/images/Marathon/Marathon_Logo_WordMark_Green_TRANSPARENT.png';

/**
 * Controls the "Leadership brief" links (header, About, Contact). Points at the
 * printable /brief page — a one-page leadership summary an exec can read at a
 * glance and "Save as PDF". To ship a designed PDF instead, drop it in
 * site/public/ and set RESUME_URL to that path (and re-add `download`).
 */
export const resumeAvailable = true;
export const RESUME_URL = '/brief';
export const RESUME_LABEL = 'Leadership brief';
