
/**
 * VYNTRA Analytics Service
 * ========================
 * Centralized analytics event collection and delivery.
 *
 * Features:
 * - Page views
 * - Navigation clicks
 * - CTA clicks
 * - Contact leads
 * - Tool usage
 * - Scroll tracking
 * - Session tracking
 * - Visitor identification
 * - UTM attribution
 * - Event IDs and timestamps
 * - Network error handling
 *
 * Configuration:
 * VITE_ANALYTICS_WEBHOOK_URL
 * VITE_ANALYTICS_SECRET (optional)
 */

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export interface VyntraEvent {
  event: string;
  eventId?: string;
  timestamp?: string;

  page?: string;
  visitorId?: string;
  sessionId?: string;

  name?: string;
  email?: string;
  role?: string;
  organization?: string;

  details?: Record<string, unknown>;

  device?: string;
  source?: string;
  medium?: string;
  campaign?: string;

  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;

  duration?: number;
  scrollDepth?: number;

  ctaName?: string;
  toolName?: string;
  pageCount?: number;

  insightType?: string;
  recommendation?: string;

  target?: string;
  category?: string;
  label?: string;
  value?: number;
}

export interface ContactLeadData {
  name: string;
  email: string;
  organization: string;
  role?: string;
  industry?: string;
  areaOfInterest?: string;
  businessChallenge?: string;
}

export interface SendResult {
  ok: boolean;
  errorMessage?: string;
}

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------

const VISITOR_ID_KEY = 'vyn_visitor_id';
const SESSION_ID_KEY = 'vyn_session_id';
const SESSION_AGE_KEY = 'vyn_session_ts';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

// ---------------------------------------------------------------------------
// ANALYTICS CLASS
// ---------------------------------------------------------------------------

class VyntraAnalytics {

  private readonly webhookUrl: string;
  private readonly secret: string;
  private readonly enabled: boolean;

  private readonly visitorId: string;
  private sessionId: string;

  private readonly utmParams: Record<string, string>;

  private sessionPageCount = 0;

  private lastTrackedPage = '';

  constructor() {

    this.webhookUrl =
      (import.meta.env?.VITE_ANALYTICS_WEBHOOK_URL as string) || '';

    this.secret =
      (import.meta.env?.VITE_ANALYTICS_SECRET as string) || '';

    this.enabled = Boolean(this.webhookUrl);

    if (!this.enabled) {
      console.warn(
        '[VYNTRA Analytics] Webhook URL not configured.'
      );
    }

    this.visitorId = this.getOrCreateVisitorId();
    this.sessionId = this.getOrCreateSessionId();
    this.utmParams = this.captureUtmParams();
  }

  // -------------------------------------------------------------------------
  // PUBLIC TRACKING METHODS
  // -------------------------------------------------------------------------

  /**
   * Track a page view.
   * The caller should invoke this once per actual route change.
   */
  trackPageView(
    page: string,
    scrollDepth = 0,
    duration = 0
  ): void {

    const normalizedPage = this.normalizePage(page);

    // Prevent duplicate consecutive page-view events.
    if (this.lastTrackedPage === normalizedPage) {
      return;
    }

    this.lastTrackedPage = normalizedPage;
    this.sessionPageCount++;

    this.send({
      event: 'page_view',
      page: normalizedPage,
      scrollDepth,
      duration
    });
  }

  /**
   * Track navigation clicks.
   */
  trackNavClick(
    target: string,
    page: string,
    destination?: string
  ): void {

    this.send({
      event: 'nav_click',
      page: this.normalizePage(page),
      target,
      ctaName: target,
      details: {
        destination: destination
          ? this.normalizePage(destination)
          : ''
      }
    });
  }

  /**
   * Track CTA clicks.
   */
  trackCtaClick(ctaName: string, page: string): void {

    this.send({
      event: 'cta_click',
      page: this.normalizePage(page),
      ctaName
    });
  }

  /**
   * Track analytical tool usage.
   */
  trackToolUse(
    toolName: string,
    page: string,
    duration = 0
  ): void {

    this.send({
      event: 'tool_use',
      page: this.normalizePage(page),
      toolName,
      duration
    });
  }

  trackCalculatorUse(duration = 0): void {

    this.trackToolUse(
      'Lean Sigma Calculator',
      '/calculator',
      duration
    );
  }

  trackVsmUse(duration = 0): void {

    this.trackToolUse(
      'Value Stream Mapping',
      '/vsm',
      duration
    );
  }

  trackSimulatorUse(duration = 0): void {

    this.trackToolUse(
      'Value Stream Simulator',
      '/simulator',
      duration
    );
  }

  /**
   * Fire-and-forget contact lead.
   */
  trackContactLead(
    data: ContactLeadData,
    page = '/contact'
  ): void {

    this.send(
      this.buildContactLeadPayload(data, page)
    );
  }

  /**
   * Awaitable contact lead submission.
   *
   * Keeps the existing JSON request format to preserve
   * compatibility with the working contact-lead flow.
   */
  async trackContactLeadAsync(
    data: ContactLeadData,
    page = '/contact'
  ): Promise<SendResult> {

    if (!this.enabled) {
      console.debug(
        '[VYNTRA Analytics] Contact lead - webhook disabled',
        data
      );

      return { ok: true };
    }

    const payload = this.buildFullPayload(
      this.buildContactLeadPayload(data, page)
    );

    const body = JSON.stringify(payload);
    const url = this.buildUrl();

    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });

      if (!response.ok) {
        return {
          ok: false,
          errorMessage: `Server returned HTTP ${response.status}.`
        };
      }

      const json = await response.json();

      if (json?.ok === false) {
        return {
          ok: false,
          errorMessage: json.error || 'Lead submission failed.'
        };
      }

      console.info(
        '[VYNTRA Analytics] Contact lead submitted:',
        payload.eventId
      );

      return { ok: true };

    } catch (error) {

      console.error(
        '[VYNTRA Analytics] Contact lead error:',
        error
      );

      return {
        ok: false,
        errorMessage:
          'Network error. Please check your connection and try again.'
      };
    }
  }

  /**
   * Track scrolling.
   */
  trackScrollDepth(
    depth: number,
    page: string,
    duration = 0
  ): void {

    this.send({
      event: 'scroll_depth',
      page: this.normalizePage(page),
      scrollDepth: depth,
      duration
    });
  }

  /**
   * Track session start.
   */
  trackSessionStart(page: string): void {

    this.send({
      event: 'session_start',
      page: this.normalizePage(page)
    });
  }

  /**
   * Track session end.
   */
  trackSessionEnd(
    duration: number,
    pageCount: number,
    exitPage: string
  ): void {

    const payload = this.buildFullPayload({
      event: 'session_end',
      page: this.normalizePage(exitPage),
      duration,
      pageCount
    });

    this.sendPayload(payload, true);
  }

  /**
   * Track insight views.
   */
  trackInsightView(
    insightType: string,
    page: string
  ): void {

    this.send({
      event: 'insight_view',
      page: this.normalizePage(page),
      insightType
    });
  }

  /**
   * Track recommendations.
   */
  trackRecommendation(
    recommendation: string,
    target: string,
    page: string,
    accepted = false
  ): void {

    this.send({
      event: accepted
        ? 'recommendation_click'
        : 'recommendation_view',

      page: this.normalizePage(page),
      recommendation,
      target
    });
  }

  // -------------------------------------------------------------------------
  // CENTRAL EVENT DELIVERY
  // -------------------------------------------------------------------------

  /**
   * All generic analytics events pass through this function.
   */
  send(partial: Partial<VyntraEvent>): void {

    if (!partial.event) {
      console.error(
        '[VYNTRA Analytics] Event name is required.'
      );
      return;
    }

    const payload = this.buildFullPayload(partial);

    console.debug(
      '[VYNTRA Analytics] Sending:',
      payload.event,
      payload
    );

    if (!this.enabled) {
      return;
    }

    this.sendPayload(payload);
  }

  /**
   * Sends an event using URL-encoded form data.
   *
   * Apps Script should read the JSON from:
   * e.parameter.payload
   */
  private sendPayload(
    payload: VyntraEvent,
    useBeacon = false
  ): void {

    if (!this.enabled) return;

    const body = JSON.stringify(payload);
    const url = this.buildUrl();

    const formData = new URLSearchParams({
      payload: body
    });

    // Session-end delivery during page unload.
    if (
      useBeacon &&
      typeof navigator !== 'undefined' &&
      navigator.sendBeacon
    ) {

      const sent = navigator.sendBeacon(
        url,
        formData
      );

      if (!sent) {
        console.warn(
          '[VYNTRA Analytics] Beacon could not be queued.'
        );
      }

      return;
    }

    fetch(url, {
      method: 'POST',
      body: formData,
      keepalive: true,
      redirect: 'follow'
    })
      .then((response) => {

        if (!response.ok) {
          console.error(
            '[VYNTRA Analytics] HTTP error:',
            response.status,
            payload.event
          );

          return;
        }

        console.debug(
          '[VYNTRA Analytics] Request completed:',
          payload.event,
          payload.eventId
        );

      })
      .catch((error) => {

        console.error(
          '[VYNTRA Analytics] Network delivery failed:',
          payload.event,
          error
        );

      });
  }

  // -------------------------------------------------------------------------
  // PAYLOAD BUILDERS
  // -------------------------------------------------------------------------

  private buildContactLeadPayload(
    data: ContactLeadData,
    page: string
  ): Partial<VyntraEvent> {

    return {
      event: 'contact_lead',
      page: this.normalizePage(page),

      name: data.name,
      email: data.email,
      organization: data.organization,
      role: data.role ?? '',

      ctaName: 'Schedule Discovery Workshop',

      details: {
        industry: data.industry ?? '',
        areaOfInterest: data.areaOfInterest ?? '',
        businessChallenge: data.businessChallenge ?? ''
      }
    };
  }

  /**
   * Attach common visitor and session information.
   */
  private buildFullPayload(
    partial: Partial<VyntraEvent>
  ): VyntraEvent {

    this.refreshSessionActivity();

    const base: VyntraEvent = {

      event: partial.event ?? '',

      eventId: this.generateId(),

      timestamp: new Date().toISOString(),

      visitorId: this.visitorId,

      sessionId: this.sessionId,

      device: this.detectDevice(),

      source:
        this.utmParams.utm_source ||
        (typeof document !== 'undefined'
          ? document.referrer
          : '') ||
        'direct',

      medium: this.utmParams.utm_medium || '',

      campaign: this.utmParams.utm_campaign || '',

      utmSource: this.utmParams.utm_source || '',

      utmMedium: this.utmParams.utm_medium || '',

      utmCampaign: this.utmParams.utm_campaign || '',

      utmTerm: this.utmParams.utm_term || '',

      utmContent: this.utmParams.utm_content || ''

    };

    return {
      ...base,
      ...partial
    };
  }

  // -------------------------------------------------------------------------
  // SESSION MANAGEMENT
  // -------------------------------------------------------------------------

  /**
   * Refresh session activity.
   * Start a new session after 30 minutes of inactivity.
   */
  private refreshSessionActivity(): void {

    try {

      const now = Date.now();

      const previousTimestamp = Number(
        localStorage.getItem(SESSION_AGE_KEY) || 0
      );

      if (
        !previousTimestamp ||
        now - previousTimestamp >= SESSION_TIMEOUT_MS
      ) {

        this.sessionId =
          'SES-' + this.generateId();

      }

      localStorage.setItem(
        SESSION_ID_KEY,
        this.sessionId
      );

      localStorage.setItem(
        SESSION_AGE_KEY,
        String(now)
      );

    } catch (error) {

      console.warn(
        '[VYNTRA Analytics] Session storage unavailable:',
        error
      );

    }
  }

  private getOrCreateVisitorId(): string {

    try {

      let id = localStorage.getItem(
        VISITOR_ID_KEY
      );

      if (!id) {

        id = 'VIS-' + this.generateId();

        localStorage.setItem(
          VISITOR_ID_KEY,
          id
        );
      }

      return id;

    } catch {

      return 'VIS-' + this.generateId();

    }
  }

  private getOrCreateSessionId(): string {

    try {

      const timestamp = Number(
        localStorage.getItem(SESSION_AGE_KEY) || 0
      );

      const now = Date.now();

      const existing = localStorage.getItem(
        SESSION_ID_KEY
      );

      if (
        existing &&
        timestamp &&
        now - timestamp < SESSION_TIMEOUT_MS
      ) {

        localStorage.setItem(
          SESSION_AGE_KEY,
          String(now)
        );

        return existing;
      }

      const id = 'SES-' + this.generateId();

      localStorage.setItem(
        SESSION_ID_KEY,
        id
      );

      localStorage.setItem(
        SESSION_AGE_KEY,
        String(now)
      );

      return id;

    } catch {

      return 'SES-' + this.generateId();

    }
  }

  // -------------------------------------------------------------------------
  // IDENTIFICATION & UTILITIES
  // -------------------------------------------------------------------------

  private generateId(): string {

    if (
      typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
    ) {
      return crypto.randomUUID();
    }

    return (
      Math.random().toString(36).slice(2, 10).toUpperCase() +
      Date.now().toString(36).toUpperCase()
    );
  }

  /**
   * Normalize hash-based routes.
   */
  private normalizePage(page: string): string {

    if (!page) return '/';

    let normalized = page.trim();

    if (normalized.includes('#')) {
      normalized = normalized.split('#').pop() || '/';
    }

    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }

    return normalized.replace(/\/+$/, '') || '/';
  }

  private detectDevice():
    'mobile' | 'tablet' | 'desktop' {

    if (typeof window === 'undefined') {
      return 'desktop';
    }

    const width = window.innerWidth;

    if (width < 768) return 'mobile';

    if (width < 1024) return 'tablet';

    return 'desktop';
  }

  /**
   * Capture campaign parameters from the landing URL.
   */
  private captureUtmParams(): Record<string, string> {

    const result: Record<string, string> = {};

    try {

      const params = new URLSearchParams(
        window.location.search
      );

      [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content'
      ].forEach((key) => {

        const value = params.get(key);

        if (value) {
          result[key] = value;
        }

      });

    } catch (error) {

      console.warn(
        '[VYNTRA Analytics] UTM capture failed:',
        error
      );

    }

    return result;
  }

  private buildUrl(): string {

    return (
      this.webhookUrl +
      (
        this.secret
          ? `?secret=${encodeURIComponent(this.secret)}`
          : ''
      )
    );
  }

}

// ---------------------------------------------------------------------------
// SINGLETON EXPORT
// ---------------------------------------------------------------------------

export const analytics = new VyntraAnalytics();

export default analytics;
