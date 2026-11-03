/**
 * =============================================================================
 * VYNTRA ANALYTICS BACKEND — FULL FEATURE EDITION
 * Adapted from the SportsMax Apps Script architecture for VYNTRA.
 * Version: 2.0.0
 *
 * INCLUDED:
 * - Webhook GET/POST, payload validation, event routing
 * - Existing VYNTRA 23-tab structure
 * - Page views, CTA clicks, sessions, user behavior, tool events
 * - UTM attribution and digital intelligence
 * - Contact leads, lead numbers, admin email notifications
 * - Jira webhook integration
 * - Airtable lead and analytics integrations
 * - YouTube engagement sync endpoint with comment de-duplication
 * - Processed analytics, connection tests, validation and system tests
 *
 * INITIAL SETUP:
 * 1. Confirm SPREADSHEET_ID below.
 * 2. Run initializeSpreadsheet() once.
 * 3. Add optional credentials under Project Settings > Script Properties.
 * 4. Run runValidationTest(), then runContactLeadValidationTest().
 * 5. Deploy > New deployment > Web app; Execute as Me; access Anyone.
 * 6. Use the deployed /exec URL in VITE_ANALYTICS_WEBHOOK_URL.
 * 7. After every code update, deploy a new version.
 *
 * SCRIPT PROPERTIES (only add values for integrations you use):
 * ADMIN_EMAIL
 * JIRA_WEBHOOK_URL
 * JIRA_WEBHOOK_SECRET
 * AIRTABLE_TOKEN
 * AIRTABLE_BASE_ID
 * AIRTABLE_CONTACT_TABLE       (default: Contact Leads)
 * AIRTABLE_ANALYTICS_TABLE     (default: Analytics Events)
 * YOUTUBE_API_KEY              (only needed for direct YouTube API functions)
 * YOUTUBE_CHANNEL_ID           (only needed for direct YouTube API functions)
 *
 * SECURITY:
 * - Do not paste API keys or webhook secrets into frontend code.
 * - Do not reuse the exposed SportsMax Jira secret; rotate it.
 * - WEBHOOK_SECRET is optional. If configured, frontend must send ?secret=...
 * =============================================================================
 */

// =============================================================================
// 1. CENTRAL CONFIGURATION
// =============================================================================

var CONFIG = {
  VERSION: '2.0.0',
  SPREADSHEET_ID: '1K3mlBZIV3Im3U-DVKafl1eWpmE0LUzd5T7Uxzto3lYw',
  WEBHOOK_SECRET: '', // Optional. Keep blank unless frontend sends ?secret=...
  MAX_PAYLOAD_BYTES: 25000,
  ADMIN_EMAIL: 'mythrivaishnavik.int2027g3@gmail.com', // Prefer Script Property ADMIN_EMAIL.
  TIME_ZONE: 'Asia/Kolkata',

  // Leave these blank here. Prefer Script Properties for secrets.
  JIRA: {
    WEBHOOK_URL: '',
    WEBHOOK_SECRET: ''
  },

  AIRTABLE: {
    BASE_ID: '',
    TOKEN: '',
    CONTACT_TABLE: 'Contact Leads',
    ANALYTICS_TABLE: 'Analytics Events'
  },

  YOUTUBE: {
    API_KEY: '',
    CHANNEL_ID: ''
  }
};

// =============================================================================
// 2. VYNTRA SHEET NAMES AND HEADERS
// Existing VYNTRA tabs are retained. Additional columns are appended safely
// when a sheet already exists; existing rows are not cleared by initialization.
// =============================================================================

var SHEETS = {
  PROCESSED_ANALYTICS: 'PROCESSED_ANALYTICS',
  RAW_DATA: 'RAW_DATA',
  LIVE_TRAFFIC: 'Live_Traffic_Events',
  PAGE_VIEWS: 'Page_Views',
  CTA_CLICKS: 'CTA_Clicks',
  SESSIONS: 'Sessions',
  USER_BEHAVIOR: 'User_Behavior',
  CONTACT_LEADS: 'Contact_Leads',
  RUN_ANALYTICS: 'Run_Analytics_Events',
  DASHBOARD_EVENTS: 'Dashboard_Events',
  INSIGHTS_EVENTS: 'Insights_Events',
  RECOMMENDATIONS_EVENTS: 'Recommendations_Events',
  UTM_DATA: 'UTM_Data',
  DI_EVENTS: 'Digital_Intelligence_Events',
  PROC_PAGE: 'Processed_Page_Analytics',
  PROC_CTA: 'Processed_CTA_Analytics',
  PROC_TRAFFIC: 'Processed_Traffic_Analytics',
  PROC_DEVICE: 'Processed_Device_Analytics',
  PROC_FEATURE: 'Processed_Feature_Analytics',
  PROC_DAILY: 'Processed_Daily_Trends',
  PROC_SESSION: 'Processed_Session_Analytics',
  YOUTUBE: 'YouTube Engagement',
  JIRA_TEST: 'JIRA_TEST'
};

var HEADERS = {};

HEADERS[SHEETS.RAW_DATA] = [
  'Timestamp', 'Event', 'Page', 'Visitor ID', 'Session ID',
  'Name', 'Email', 'Role', 'Organization', 'Details',
  'Device', 'Source', 'Duration', 'Scroll Depth', 'CTA Name'
];

HEADERS[SHEETS.PROCESSED_ANALYTICS] = [
  'Last Updated', 'Total Page Views', 'Unique Sessions',
  'Total CTA Clicks', 'Contact Leads', 'Bounce Rate %',
  'Avg Session Duration (s)', 'Top Page', 'Top CTA', 'Top Traffic Source'
];

HEADERS[SHEETS.LIVE_TRAFFIC] = [
  'Timestamp', 'Visitor ID', 'Page', 'Source', 'Medium',
  'Campaign', 'Device', 'Country'
];

HEADERS[SHEETS.PAGE_VIEWS] = [
  'Date', 'Page', 'Views', 'Unique Visitors',
  'Avg Time on Page (s)', 'Avg Scroll Depth %', 'Bounce Rate %'
];

HEADERS[SHEETS.CTA_CLICKS] = [
  'Date', 'CTA Name', 'Page', 'Clicks', 'Unique Clickers', 'Conversion Rate %'
];

HEADERS[SHEETS.SESSIONS] = [
  'Session ID', 'Visitor ID', 'Start Time', 'End Time',
  'Duration (s)', 'Page Count', 'Entry Page', 'Exit Page',
  'Device', 'Source', 'Converted'
];

HEADERS[SHEETS.USER_BEHAVIOR] = [
  'Date', 'Avg Scroll Depth %', 'Avg Session Duration (s)',
  'Bounced Sessions', 'Tool Usage Count', 'Calculator Uses',
  'VSM Uses', 'Simulator Uses'
];

// Preserve the exact original VYNTRA Contact_Leads column order.
// New SportsMax-style fields are appended after the existing columns.
HEADERS[SHEETS.CONTACT_LEADS] = [
  'Timestamp', 'Name', 'Email', 'Organization', 'Role', 'Industry',
  'Area of Interest', 'Business Challenge', 'Source', 'Medium',
  'Campaign', 'Session ID', 'Visitor ID',
  'Lead Number', 'Page', 'Status'
];

HEADERS[SHEETS.RUN_ANALYTICS] = [
  'Timestamp', 'Event', 'Tool', 'Visitor ID', 'Session ID',
  'Details', 'Duration (s)', 'Device'
];

HEADERS[SHEETS.DASHBOARD_EVENTS] = [
  'Timestamp', 'Event', 'Page', 'Element', 'Visitor ID', 'Session ID', 'Details'
];

HEADERS[SHEETS.INSIGHTS_EVENTS] = [
  'Timestamp', 'Insight Type', 'Page', 'Content',
  'Visitor ID', 'Session ID', 'Interaction'
];

HEADERS[SHEETS.RECOMMENDATIONS_EVENTS] = [
  'Timestamp', 'Recommendation', 'Source Page', 'Target',
  'Visitor ID', 'Session ID', 'Accepted'
];

HEADERS[SHEETS.UTM_DATA] = [
  'Timestamp', 'Visitor ID', 'Session ID', 'UTM Source',
  'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content',
  'Landing Page', 'Device', 'Referrer'
];

// Retains the original eight VYNTRA columns and adds SportsMax-style
// digital-intelligence fields to the right.
HEADERS[SHEETS.DI_EVENTS] = [
  'Timestamp', 'Event', 'Category', 'Label', 'Value',
  'Visitor ID', 'Session ID', 'Page',
  'Entry Page', 'Exit Page', 'Navigation Path', 'Referrer',
  'Traffic Source', 'Traffic Medium', 'Campaign', 'UTM Term',
  'UTM Content', 'Country', 'Region', 'City', 'Time Zone',
  'Local Hour', 'IP Hash', 'ISP / Organization', 'ASN',
  'Network Type', 'Browser', 'Screen Size', 'Is Repeat Visitor', 'Visit Count'
];

HEADERS[SHEETS.PROC_PAGE] = [
  'Last Updated', 'Page', 'Total Views', 'Unique Visitors',
  'Avg Time (s)', 'Avg Scroll %', 'Entries', 'Exits'
];

HEADERS[SHEETS.PROC_CTA] = [
  'Last Updated', 'CTA Name', 'Page', 'Total Clicks',
  'Unique Clickers', 'Conversion Rate %', 'Last Click'
];

HEADERS[SHEETS.PROC_TRAFFIC] = [
  'Last Updated', 'Source', 'Medium', 'Sessions',
  'Users', 'Bounce Rate %', 'Avg Duration (s)', 'Conversions'
];

HEADERS[SHEETS.PROC_DEVICE] = [
  'Last Updated', 'Device Type', 'Sessions', 'Users',
  'Bounce Rate %', 'Avg Duration (s)', 'Conversions'
];

HEADERS[SHEETS.PROC_FEATURE] = [
  'Last Updated', 'Feature', 'Uses', 'Unique Users',
  'Avg Duration (s)', 'Completion Rate %', 'Last Used'
];

HEADERS[SHEETS.PROC_DAILY] = [
  'Date', 'Page Views', 'Sessions', 'New Visitors',
  'CTA Clicks', 'Contact Leads', 'Tool Uses', 'Bounce Rate %'
];

HEADERS[SHEETS.PROC_SESSION] = [
  'Last Updated', 'Total Sessions', 'Avg Duration (s)',
  'Avg Pages / Session', 'Bounce Rate %',
  'Returning Visitors %', 'Top Entry Page', 'Top Exit Page'
];

// Preserve VYNTRA's original YouTube metrics columns first, then append
// SportsMax-style per-comment engagement fields.
HEADERS[SHEETS.YOUTUBE] = [
  'Date', 'Video Title', 'Video ID', 'Views', 'Likes', 'Comments',
  'Watch Time (min)', 'Subscribers Gained', 'Source', 'Notes',
  'Comment ID', 'Commenter Name', 'Commenter Channel ID',
  'Comment Likes', 'Comment Date', 'Comment URL', 'Last Synced Time'
];

HEADERS[SHEETS.JIRA_TEST] = [
  'Timestamp', 'Issue Key', 'Summary', 'Status', 'Priority',
  'Assignee', 'Reporter', 'Created', 'Updated', 'Labels', 'Notes'
];

// =============================================================================
// 3. WEB APP ENTRY POINTS
// =============================================================================

function doGet(e) {
  return jsonResponse({
    ok: true,
    success: true,
    service: 'VYNTRA Analytics Webhook',
    version: CONFIG.VERSION,
    timestamp: new Date().toISOString(),
    note: 'GET health check only; send a POST to record analytics events.'
  });
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    if (!e || !e.postData || typeof e.postData.contents !== 'string') {
      return jsonResponse({ ok: false, success: false, error: 'Empty request body' });
    }

    if (CONFIG.WEBHOOK_SECRET) {
      var suppliedSecret = (e.parameter && e.parameter.secret) || '';
      if (suppliedSecret !== CONFIG.WEBHOOK_SECRET) {
        return jsonResponse({ ok: false, success: false, error: 'Unauthorized' });
      }
    }

    var rawBody = e.postData.contents;
    if (!rawBody.trim()) {
      return jsonResponse({ ok: false, success: false, error: 'Empty request body' });
    }

    var bodyBytes = Utilities.newBlob(rawBody).getBytes().length;
    if (bodyBytes > CONFIG.MAX_PAYLOAD_BYTES) {
      return jsonResponse({ ok: false, success: false, error: 'Payload too large' });
    }

    var data;
    try {
      data = JSON.parse(rawBody);
    } catch (parseError) {
      return jsonResponse({ ok: false, success: false, error: 'Invalid JSON' });
    }

    // YouTube sync is a separate action, not a standard analytics event.
    if (data && data.action === 'youtube_engagement_sync') {
      return handleYouTubeEngagementSync(data);
    }

    var validationError = validatePayload(data);
    if (validationError) {
      return jsonResponse({ ok: false, success: false, error: validationError });
    }

    // Prevent concurrent lead-number allocation and duplicate append races.
    lock.waitLock(20000);

    var ss = getSpreadsheet();
    ensureAllSheets(ss);

    var eventName = normalizeEventName(data.event);
    data.event = eventName;

    var rawRow = buildRawRow(data);
    appendRow(ss, SHEETS.RAW_DATA, rawRow);

    routeEvent(ss, data, rawRow);

    // Keep the processed dashboard metrics current, as in the SportsMax backend.
    // A refresh failure is logged separately; the successfully stored event remains valid.
    try {
      updateProcessedAnalytics();
    } catch (analyticsError) {
      console.error('Processed analytics refresh error: ' +
        (analyticsError.stack || analyticsError.message || analyticsError));
    }

    SpreadsheetApp.flush();

    return jsonResponse({
      ok: true,
      success: true,
      message: 'VYNTRA event recorded successfully.',
      event: eventName,
      visitorId: data.visitorId || '',
      sessionId: data.sessionId || '',
      timestamp: rawRow[0]
    });

  } catch (error) {
    console.error('VYNTRA doPost error: ' + (error.stack || error.message || error));
    return jsonResponse({
      ok: false,
      success: false,
      error: 'Event processing failed. Check Apps Script Executions for details.'
    });
  } finally {
    try {
      if (lock.hasLock()) lock.releaseLock();
    } catch (lockError) {
      console.warn('Lock release warning: ' + lockError.message);
    }
  }
}

// =============================================================================
// 4. INITIALIZATION AND SHEET MANAGEMENT
// =============================================================================

function initializeSpreadsheet() {
  var ss = getSpreadsheet();
  ensureAllSheets(ss);
  SpreadsheetApp.flush();
  Logger.log('VYNTRA initialization complete. ' + Object.keys(SHEETS).length + ' tabs checked.');
}

function ensureAllSheets(ss) {
  Object.keys(SHEETS).forEach(function(key) {
    var sheetName = SHEETS[key];
    ensureSheet(ss, sheetName, HEADERS[sheetName] || []);
  });
}

function ensureSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    Logger.log('Created sheet: ' + sheetName);
  }

  if (!headers || headers.length === 0) return sheet;

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    styleHeader(sheet, headers.length);
    return sheet;
  }

  // Safe, non-destructive header extension. Existing header names and rows
  // are never overwritten. New columns are appended only when needed.
  var existingWidth = Math.max(sheet.getLastColumn(), 1);
  var existingHeaders = sheet.getRange(1, 1, 1, existingWidth).getValues()[0];
  var known = {};
  existingHeaders.forEach(function(value) {
    if (value !== '') known[String(value)] = true;
  });

  var additions = [];
  headers.forEach(function(header) {
    if (!known[header]) additions.push(header);
  });

  if (additions.length) {
    var startColumn = sheet.getLastColumn() + 1;
    sheet.getRange(1, startColumn, 1, additions.length).setValues([additions]);
    styleHeader(sheet, sheet.getLastColumn());
    Logger.log('Extended headers for ' + sheetName + ': ' + additions.join(', '));
  }

  if (sheet.getFrozenRows() === 0) sheet.setFrozenRows(1);
  return sheet;
}

function styleHeader(sheet, width) {
  sheet.getRange(1, 1, 1, width)
    .setFontWeight('bold')
    .setBackground('#1a3a5c')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

function getOrCreateSheet(ss, sheetName, headers) {
  return ensureSheet(ss, sheetName, headers || []);
}

function getSpreadsheet() {
  if (!CONFIG.SPREADSHEET_ID) throw new Error('SPREADSHEET_ID is not configured.');
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

function appendRow(ss, sheetName, values) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error('Required sheet not found: ' + sheetName);
  sheet.appendRow(values);
  return sheet.getLastRow();
}

// =============================================================================
// 5. PAYLOAD VALIDATION AND EVENT NORMALIZATION
// =============================================================================

function validatePayload(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return 'Payload must be a JSON object.';
  }
  if (!data.event || typeof data.event !== 'string') {
    return 'Missing or invalid event field.';
  }
  if (data.event.length > 100) return 'Event name is too long.';
  if (data.email && (typeof data.email !== 'string' || data.email.indexOf('@') < 1)) {
    return 'Invalid email address.';
  }
  return null;
}

function normalizeEventName(eventName) {
  var event = String(eventName || '').trim().toLowerCase();
  var aliases = {
    pageview: 'page_view',
    contact_submission: 'contact_lead',
    contact_submit: 'contact_lead',
    form_submit: 'contact_lead',
    workshop_request: 'contact_lead',
    run_session: 'tool_use',
    recommendation_action: 'recommendation_click'
  };
  return aliases[event] || event;
}

// =============================================================================
// 6. RAW DATA AND EVENT ROUTING
// =============================================================================

function buildRawRow(data) {
  return [
    new Date().toISOString(),
    data.event || '',
    data.page || '',
    data.visitorId || '',
    data.sessionId || '',
    data.name || '',
    data.email || '',
    data.role || '',
    data.organization || '',
    safeJson(data.details !== undefined ? data.details : data.message),
    data.device || '',
    data.source || data.trafficSource || '',
    data.duration || data.dwellTime || 0,
    data.scrollDepth || 0,
    data.ctaName || ''
  ];
}

function routeEvent(ss, data, rawRow) {
  var event = normalizeEventName(data.event);
  var timestamp = rawRow[0];
  var visitorId = data.visitorId || '';
  var sessionId = data.sessionId || '';
  var page = data.page || '';
  var device = data.device || '';
  var source = data.source || data.trafficSource || 'direct';
  var medium = data.medium || data.trafficMedium || '';
  var campaign = data.campaign || '';
  var details = safeJson(data.details !== undefined ? data.details : data.message);

  // Live traffic receives every event.
  appendRow(ss, SHEETS.LIVE_TRAFFIC, [
    timestamp, visitorId, page, source, medium, campaign, device, data.country || ''
  ]);

  // Specific event sheets.
  if (event === 'page_view') {
    appendRow(ss, SHEETS.PAGE_VIEWS, [
      formatDate(timestamp), page, 1, visitorId,
      Number(data.duration || data.dwellTime || 0),
      Number(data.scrollDepth || 0), ''
    ]);
    appendRow(ss, SHEETS.DI_EVENTS, buildDigitalIntelligenceRow(data, timestamp, {
      event: event, category: 'navigation', label: page, value: 1
    }));
  } else if (event === 'cta_click' || event === 'button_click' || event === 'link_click') {
    var cta = data.ctaName || data.element || '';
    appendRow(ss, SHEETS.CTA_CLICKS, [
      formatDate(timestamp), cta, page, 1, visitorId, ''
    ]);
    appendRow(ss, SHEETS.DASHBOARD_EVENTS, [
      timestamp, event, page, cta, visitorId, sessionId, details
    ]);
  } else if (event === 'session_start') {
    upsertSession(ss, data, timestamp, true);
  } else if (event === 'session_end') {
    updateSessionEnd(ss, sessionId, timestamp, data.duration, data.pageCount, page);
  } else if (event === 'contact_lead') {
    handleContactLead(ss, data, timestamp);
  } else if (
    event === 'tool_use' || event === 'calculator_use' ||
    event === 'vsm_use' || event === 'simulator_use' || event === 'feature_use'
  ) {
    appendRow(ss, SHEETS.RUN_ANALYTICS, [
      timestamp, event, data.toolName || data.tool || page,
      visitorId, sessionId, details, data.duration || 0, device
    ]);
    appendRow(ss, SHEETS.DI_EVENTS, buildDigitalIntelligenceRow(data, timestamp, {
      event: event, category: 'tool', label: data.toolName || data.tool || page, value: 1
    }));
  } else if (event === 'run_session') {
    appendRow(ss, SHEETS.RUN_ANALYTICS, [
      timestamp, event, data.toolName || data.tool || page,
      visitorId, sessionId, details, data.duration || 0, device
    ]);
  } else if (event === 'dashboard_view' || event === 'nav_click' || event === 'tab_click') {
    appendRow(ss, SHEETS.DASHBOARD_EVENTS, [
      timestamp, event, page, data.element || details, visitorId, sessionId, details
    ]);
  } else if (event === 'insight_view' || event === 'insights_view') {
    appendRow(ss, SHEETS.INSIGHTS_EVENTS, [
      timestamp, data.insightType || 'general', page, details, visitorId, sessionId,
      data.interaction || 'view'
    ]);
  } else if (event === 'recommendation_click' || event === 'recommendation_view') {
    appendRow(ss, SHEETS.RECOMMENDATIONS_EVENTS, [
      timestamp, data.recommendation || details, page, data.target || '',
      visitorId, sessionId, event === 'recommendation_click'
    ]);
  } else if (event === 'scroll_depth') {
    appendRow(ss, SHEETS.USER_BEHAVIOR, [
      formatDate(timestamp), Number(data.scrollDepth || 0),
      Number(data.duration || 0), 0, 0, 0, 0, 0
    ]);
  } else if (event === 'digital_intelligence') {
    appendRow(ss, SHEETS.DI_EVENTS, buildDigitalIntelligenceRow(data, timestamp, {
      event: event, category: data.category || 'digital_intelligence',
      label: data.label || page, value: data.value || ''
    }));
  } else {
    appendRow(ss, SHEETS.DI_EVENTS, buildDigitalIntelligenceRow(data, timestamp, {
      event: event, category: data.category || 'other',
      label: data.label || details, value: data.value || ''
    }));
  }

  // Every event contributes to user behavior and session tracking.
  if (event !== 'scroll_depth') {
    appendRow(ss, SHEETS.USER_BEHAVIOR, [
      formatDate(timestamp), Number(data.scrollDepth || 0),
      Number(data.duration || data.dwellTime || 0), 0,
      isToolEvent(event) ? 1 : 0,
      event === 'calculator_use' ? 1 : 0,
      event === 'vsm_use' ? 1 : 0,
      event === 'simulator_use' ? 1 : 0
    ]);
  }

  if (sessionId && event !== 'session_start' && event !== 'session_end') {
    upsertSession(ss, data, timestamp, false);
  }

  writeUTMData(ss, data, timestamp);
}

function isToolEvent(event) {
  return [
    'tool_use', 'calculator_use', 'vsm_use',
    'simulator_use', 'feature_use', 'run_session'
  ].indexOf(event) !== -1;
}

// =============================================================================
// 7. SESSION TRACKING
// =============================================================================

function upsertSession(ss, data, timestamp, isStartEvent) {
  var sessionId = String(data.sessionId || '');
  if (!sessionId) return;

  var sheet = getOrCreateSheet(ss, SHEETS.SESSIONS, HEADERS[SHEETS.SESSIONS]);
  var lastRow = sheet.getLastRow();
  var rowNumber = -1;

  if (lastRow >= 2) {
    var ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === sessionId) {
        rowNumber = i + 2;
        break;
      }
    }
  }

  if (rowNumber === -1) {
    sheet.appendRow([
      sessionId, data.visitorId || '', timestamp, '',
      0, 1, data.page || '', data.page || '',
      data.device || '', data.source || data.trafficSource || '', false
    ]);
    return;
  }

  var currentCount = Number(sheet.getRange(rowNumber, 6).getValue()) || 0;
  sheet.getRange(rowNumber, 4).setValue(timestamp);
  sheet.getRange(rowNumber, 6).setValue(currentCount + (isStartEvent ? 0 : 1));
  sheet.getRange(rowNumber, 8).setValue(data.page || '');
  if (!sheet.getRange(rowNumber, 2).getValue() && data.visitorId) {
    sheet.getRange(rowNumber, 2).setValue(data.visitorId);
  }
}

function updateSessionEnd(ss, sessionId, endTimestamp, duration, pageCount, exitPage) {
  if (!sessionId) return;

  var sheet = ss.getSheetByName(SHEETS.SESSIONS);
  if (!sheet) throw new Error('Sessions sheet is missing.');

  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    var ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(sessionId)) {
        var row = i + 2;
        sheet.getRange(row, 4).setValue(endTimestamp);
        sheet.getRange(row, 5).setValue(duration || 0);
        sheet.getRange(row, 6).setValue(pageCount || sheet.getRange(row, 6).getValue() || 0);
        sheet.getRange(row, 8).setValue(exitPage || '');
        return;
      }
    }
  }

  sheet.appendRow([
    sessionId, '', '', endTimestamp, duration || 0,
    pageCount || 0, '', exitPage || '', '', '', false
  ]);
}

// =============================================================================
// 8. UTM ATTRIBUTION
// =============================================================================

function writeUTMData(ss, data, timestamp) {
  var hasUtm = data.utmSource || data.utmMedium || data.utmCampaign ||
    data.utmTerm || data.utmContent || data.referrer;

  if (!hasUtm) return;

  appendRow(ss, SHEETS.UTM_DATA, [
    timestamp || new Date().toISOString(),
    data.visitorId || '',
    data.sessionId || '',
    data.utmSource || data.source || '',
    data.utmMedium || data.medium || data.trafficMedium || '',
    data.utmCampaign || data.campaign || '',
    data.utmTerm || '',
    data.utmContent || '',
    data.landingPage || data.page || '',
    data.device || '',
    data.referrer || ''
  ]);
}

// =============================================================================
// 9. DIGITAL INTELLIGENCE
// =============================================================================

function buildDigitalIntelligenceRow(data, timestamp, eventInfo) {
  eventInfo = eventInfo || {};
  return [
    timestamp || data.timestamp || new Date().toISOString(),
    eventInfo.event || data.event || '',
    eventInfo.category || data.category || '',
    eventInfo.label || data.label || '',
    eventInfo.value !== undefined ? eventInfo.value : (data.value || ''),
    data.visitorId || '',
    data.sessionId || '',
    data.page || '',
    data.entryPage || '',
    data.exitPage || '',
    data.navigationPath || '',
    data.referrer || '',
    data.trafficSource || data.source || '',
    data.trafficMedium || data.medium || '',
    data.campaign || data.utmCampaign || '',
    data.utmTerm || '',
    data.utmContent || '',
    data.country || '',
    data.region || '',
    data.city || '',
    data.timezone || data.timeZone || '',
    data.localHour !== undefined ? data.localHour : '',
    data.ipHash || '',
    data.isp || data.organizationNetwork || '',
    data.asn || '',
    data.networkType || '',
    data.browser || '',
    data.screenSize || '',
    data.isRepeatVisitor !== undefined ? data.isRepeatVisitor : '',
    data.visitCount || ''
  ];
}

function writeDigitalIntelligenceEvent(ss, data) {
  ensureSheet(ss, SHEETS.DI_EVENTS, HEADERS[SHEETS.DI_EVENTS]);
  appendRow(ss, SHEETS.DI_EVENTS, buildDigitalIntelligenceRow(data, new Date().toISOString(), {
    event: 'digital_intelligence',
    category: data.category || 'digital_intelligence',
    label: data.label || data.page || '',
    value: data.value || ''
  }));
}

// =============================================================================
// 10. CONTACT LEADS, LEAD NUMBERS, EMAIL, JIRA AND AIRTABLE
// =============================================================================

function handleContactLead(ss, data, timestamp) {
  var leadNumber = generateLeadNumber(ss);
  data.leadNumber = leadNumber;

  var details = data.details && typeof data.details === 'object' ? data.details : {};
  appendRow(ss, SHEETS.CONTACT_LEADS, [
    timestamp,
    data.name || '',
    data.email || '',
    data.organization || '',
    data.role || '',
    details.industry || data.industry || '',
    details.areaOfInterest || data.areaOfInterest || '',
    details.businessChallenge || data.businessChallenge || data.message || '',
    data.source || data.trafficSource || '',
    data.medium || data.trafficMedium || '',
    data.campaign || data.utmCampaign || '',
    data.sessionId || '',
    data.visitorId || '',
    leadNumber,
    data.page || '',
    'New'
  ]);

  appendRow(ss, SHEETS.DI_EVENTS, buildDigitalIntelligenceRow(data, timestamp, {
    event: 'contact_lead', category: 'conversion',
    label: 'contact_form', value: 1
  }));

  // Each external integration is isolated: a Jira/Airtable/email failure
  // must not undo the successfully stored lead.
  try {
    sendContactEmail(data);
  } catch (emailError) {
    logIntegrationError('Email', emailError);
  }

  try {
    sendContactToJira(data);
  } catch (jiraError) {
    logIntegrationError('Jira', jiraError);
  }

  try {
    createAirtableLead(data);
  } catch (airtableError) {
    logIntegrationError('Airtable lead', airtableError);
  }
}

function generateLeadNumber(ss) {
  var sheet = getOrCreateSheet(ss, SHEETS.CONTACT_LEADS, HEADERS[SHEETS.CONTACT_LEADS]);
  var today = Utilities.formatDate(new Date(), CONFIG.TIME_ZONE, 'yyyyMMdd');
  var prefix = 'VYN-' + today + '-';
  var lastRow = sheet.getLastRow();
  var count = 0;

  if (lastRow >= 2) {
    // Lead Number is column B.
    var numbers = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
    numbers.forEach(function(item) {
      if (String(item[0] || '').indexOf(prefix) === 0) count++;
    });
  }

  return prefix + String(count + 1).padStart(4, '0');
}

function getScriptProperty(name) {
  return PropertiesService.getScriptProperties().getProperty(name) || '';
}

function getIntegrationConfig() {
  return {
    adminEmail: getScriptProperty('ADMIN_EMAIL') || CONFIG.ADMIN_EMAIL,
    jiraUrl: getScriptProperty('JIRA_WEBHOOK_URL') || CONFIG.JIRA.WEBHOOK_URL,
    jiraSecret: getScriptProperty('JIRA_WEBHOOK_SECRET') || CONFIG.JIRA.WEBHOOK_SECRET,
    airtableToken: getScriptProperty('AIRTABLE_TOKEN') || CONFIG.AIRTABLE.TOKEN,
    airtableBaseId: getScriptProperty('AIRTABLE_BASE_ID') || CONFIG.AIRTABLE.BASE_ID,
    airtableContactTable: getScriptProperty('AIRTABLE_CONTACT_TABLE') || CONFIG.AIRTABLE.CONTACT_TABLE,
    airtableAnalyticsTable: getScriptProperty('AIRTABLE_ANALYTICS_TABLE') || CONFIG.AIRTABLE.ANALYTICS_TABLE
  };
}

function sendContactEmail(data) {
  var cfg = getIntegrationConfig();
  if (!cfg.adminEmail) {
    Logger.log('Email skipped: set ADMIN_EMAIL in Script Properties.');
    return false;
  }

  var name = data.name || 'VYNTRA Website Visitor';
  var body = [
    'New VYNTRA contact submission',
    '',
    'Lead Number: ' + (data.leadNumber || ''),
    'Name: ' + name,
    'Email: ' + (data.email || ''),
    'Role: ' + (data.role || ''),
    'Organization: ' + (data.organization || ''),
    'Page: ' + (data.page || ''),
    'Source: ' + (data.source || data.trafficSource || ''),
    'Session ID: ' + (data.sessionId || ''),
    '',
    'Details:',
    safeJson(data.details || data.message || ''),
    '',
    'Received: ' + new Date().toString()
  ].join('\n');

  MailApp.sendEmail({
    to: cfg.adminEmail,
    subject: 'VYNTRA Contact Lead — ' + name + ' (' + (data.leadNumber || '') + ')',
    body: body,
    replyTo: data.email || undefined
  });

  Logger.log('Contact notification email sent for ' + (data.leadNumber || 'lead'));
  return true;
}

function sendContactToJira(data) {
  var cfg = getIntegrationConfig();
  if (!cfg.jiraUrl) {
    Logger.log('Jira skipped: set JIRA_WEBHOOK_URL in Script Properties.');
    return false;
  }

  var payload = {
    sourceSystem: 'VYNTRA',
    leadNumber: data.leadNumber || '',
    name: data.name || 'Unknown',
    email: data.email || '',
    role: data.role || '',
    organization: data.organization || '',
    details: safeJson(data.details || data.message || ''),
    page: data.page || '',
    source: data.source || data.trafficSource || 'contact_form',
    medium: data.medium || data.trafficMedium || '',
    campaign: data.campaign || data.utmCampaign || '',
    visitorId: data.visitorId || '',
    sessionId: data.sessionId || ''
  };

  var headers = {};
  if (cfg.jiraSecret) headers['X-Automation-Webhook-Token'] = cfg.jiraSecret;

  var result = UrlFetchApp.fetch(cfg.jiraUrl, {
    method: 'post',
    contentType: 'application/json',
    headers: headers,
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  logHttpResult('Jira', result);
  if (result.getResponseCode() < 200 || result.getResponseCode() >= 300) {
    throw new Error('Jira webhook returned HTTP ' + result.getResponseCode());
  }
  return true;
}

function airtableRequest(tableName, payload, method) {
  var cfg = getIntegrationConfig();
  if (!cfg.airtableToken || !cfg.airtableBaseId) {
    throw new Error('Set AIRTABLE_TOKEN and AIRTABLE_BASE_ID in Script Properties.');
  }

  var encodedTable = encodeURIComponent(tableName);
  var url = 'https://api.airtable.com/v0/' + cfg.airtableBaseId + '/' + encodedTable;
  var result = UrlFetchApp.fetch(url, {
    method: method || 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + cfg.airtableToken },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  logHttpResult('Airtable ' + tableName, result);
  if (result.getResponseCode() < 200 || result.getResponseCode() >= 300) {
    throw new Error('Airtable returned HTTP ' + result.getResponseCode() + ': ' + result.getContentText());
  }

  var text = result.getContentText();
  return text ? JSON.parse(text) : {};
}

function createAirtableLead(data) {
  var cfg = getIntegrationConfig();
  if (!cfg.airtableToken || !cfg.airtableBaseId) {
    Logger.log('Airtable lead sync skipped: credentials not configured.');
    return false;
  }

  var fields = {
    'Lead Number': data.leadNumber || '',
    'Name': data.name || '',
    'Email': data.email || '',
    'Role': data.role || '',
    'Organization': data.organization || '',
    'Message': safeJson(data.details || data.message || ''),
    'Source': data.source || data.trafficSource || 'contact_form',
    'Status': 'New'
  };

  var details = data.details && typeof data.details === 'object' ? data.details : {};
  if (details.industry || data.industry) fields.Industry = details.industry || data.industry;
  if (details.areaOfInterest || data.areaOfInterest) fields['Area of Interest'] = details.areaOfInterest || data.areaOfInterest;
  if (details.businessChallenge || data.businessChallenge) fields['Business Challenge'] = details.businessChallenge || data.businessChallenge;

  airtableRequest(cfg.airtableContactTable, { fields: fields }, 'post');
  return true;
}

function sendAnalyticsToAirtable(data) {
  var cfg = getIntegrationConfig();
  if (!cfg.airtableToken || !cfg.airtableBaseId) {
    Logger.log('Airtable analytics sync skipped: credentials not configured.');
    return false;
  }

  var fields = {
    'Event': data.event || '',
    'Timestamp': new Date().toISOString(),
    'Page': data.page || '',
    'Visitor ID': data.visitorId || '',
    'Session ID': data.sessionId || '',
    'Device': data.device || '',
    'Source': data.source || data.trafficSource || '',
    'Scroll Depth': Number(data.scrollDepth || 0),
    'Details': safeJson(data.details || '')
  };

  airtableRequest(cfg.airtableAnalyticsTable, { fields: fields }, 'post');
  return true;
}

// =============================================================================
// 11. YOUTUBE ENGAGEMENT SYNCHRONIZATION
// Website/another service can POST {action:"youtube_engagement_sync",records:[...]}
// Each record should include commentId, videoId, videoTitle, totals and comment info.
// Existing Comment IDs are updated instead of duplicated.
// =============================================================================

function handleYouTubeEngagementSync(data) {
  var ss = getSpreadsheet();
  var sheet = getOrCreateSheet(ss, SHEETS.YOUTUBE, HEADERS[SHEETS.YOUTUBE]);
  var records = Array.isArray(data.records) ? data.records : [];
  var syncTime = data.syncTimestamp || new Date().toISOString();

  var existing = {};
  var lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    var ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      var id = String(ids[i][0] || '').trim();
      if (id) existing[id] = i + 2;
    }
  }

  var newRows = [];
  var updated = 0;
  var skipped = 0;

  records.forEach(function(record) {
    var commentId = String(record.commentId || '').trim();
    if (!commentId) {
      skipped++;
      return;
    }

    var row = [
      String(record.syncDate || syncTime),
      String(record.videoTitle || ''),
      String(record.videoId || ''),
      Number(record.totalViews || 0),
      Number(record.totalLikes || 0),
      Number(record.totalComments || 0),
      Number(record.watchTimeMinutes || 0),
      Number(record.subscribersGained || 0),
      String(record.source || 'YouTube API'),
      String(record.notes || record.commentText || ''),
      commentId,
      String(record.commenterDisplayName || record.commenterName || ''),
      String(record.commenterChannelId || ''),
      Number(record.commentLikes || 0),
      String(record.commentDate || ''),
      String(record.commentUrl || ''),
      syncTime
    ];

    if (existing[commentId]) {
      sheet.getRange(existing[commentId], 1, 1, row.length).setValues([row]);
      updated++;
    } else {
      existing[commentId] = lastRow + newRows.length + 1;
      newRows.push(row);
    }
  });

  if (newRows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, HEADERS[SHEETS.YOUTUBE].length)
      .setValues(newRows);
  }

  SpreadsheetApp.flush();
  return jsonResponse({
    ok: true,
    success: true,
    action: 'youtube_engagement_sync',
    received: records.length,
    inserted: newRows.length,
    updated: updated,
    skipped: skipped,
    message: 'YouTube engagement synchronization completed.'
  });
}

/**
 * Optional direct YouTube Data API test. Set YOUTUBE_API_KEY and
 * YOUTUBE_CHANNEL_ID in Script Properties first.
 * This retrieves channel statistics; it does not fetch private viewer data.
 */
function testYouTubeConnection() {
  var apiKey = getScriptProperty('YOUTUBE_API_KEY') || CONFIG.YOUTUBE.API_KEY;
  var channelId = getScriptProperty('YOUTUBE_CHANNEL_ID') || CONFIG.YOUTUBE.CHANNEL_ID;
  if (!apiKey || !channelId) {
    throw new Error('Set YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID in Script Properties.');
  }

  var url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=' +
    encodeURIComponent(channelId) + '&key=' + encodeURIComponent(apiKey);
  var result = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  logHttpResult('YouTube API', result);

  if (result.getResponseCode() < 200 || result.getResponseCode() >= 300) {
    throw new Error('YouTube API returned HTTP ' + result.getResponseCode());
  }

  var json = JSON.parse(result.getContentText());
  if (!json.items || !json.items.length) throw new Error('No YouTube channel found for configured ID.');
  Logger.log('YouTube channel connected: ' + json.items[0].snippet.title);
  Logger.log('Subscriber count: ' + (json.items[0].statistics.subscriberCount || 'hidden'));
  return json.items[0];
}

// =============================================================================
// 12. PROCESSED ANALYTICS
// =============================================================================

function refreshAllProcessedAnalytics() {
  updateProcessedAnalytics();
}

function updateProcessedAnalytics() {
  var ss = getSpreadsheet();
  var raw = ss.getSheetByName(SHEETS.RAW_DATA);
  if (!raw) throw new Error('RAW_DATA missing. Run initializeSpreadsheet().');

  var data = raw.getDataRange().getValues();
  if (data.length < 2) {
    Logger.log('No raw events available for analytics.');
    return;
  }

  var headers = data[0];
  var col = {};
  headers.forEach(function(header, index) { col[String(header)] = index; });

  var pageAgg = {};
  var ctaAgg = {};
  var sourceAgg = {};
  var deviceAgg = {};
  var featureAgg = {};
  var dailyAgg = {};
  var visitors = {};
  var sessions = {};
  var totalViews = 0;
  var totalCta = 0;
  var totalLeads = 0;
  var totalSessionStarts = 0;
  var durationSum = 0;
  var durationCount = 0;

  data.slice(1).forEach(function(row) {
    var event = String(row[col.Event] || '').toLowerCase();
    var page = row[col.Page] || '';
    var visitor = row[col['Visitor ID']] || '';
    var session = row[col['Session ID']] || '';
    var device = row[col.Device] || 'Unknown';
    var source = row[col.Source] || 'direct';
    var cta = row[col['CTA Name']] || '';
    var duration = Number(row[col.Duration]) || 0;
    var scroll = Number(row[col['Scroll Depth']]) || 0;
    var timestamp = row[col.Timestamp];
    var date = formatDateFromTs(timestamp);

    if (!dailyAgg[date]) dailyAgg[date] = { views: 0, cta: 0, leads: 0, tools: 0, sessions: {} };
    if (visitor) visitors[visitor] = true;
    if (session) {
      sessions[session] = true;
      dailyAgg[date].sessions[session] = true;
    }
    if (duration > 0) {
      durationSum += duration;
      durationCount++;
    }

    if (event === 'page_view' || event === 'pageview') {
      totalViews++;
      dailyAgg[date].views++;
      if (!pageAgg[page]) pageAgg[page] = { views: 0, duration: 0, scroll: 0, visitors: {} };
      pageAgg[page].views++;
      pageAgg[page].duration += duration;
      pageAgg[page].scroll += scroll;
      if (visitor) pageAgg[page].visitors[visitor] = true;
    }

    if (event === 'cta_click' || event === 'button_click' || event === 'link_click') {
      totalCta++;
      dailyAgg[date].cta++;
      var ctaKey = cta + '|' + page;
      if (!ctaAgg[ctaKey]) ctaAgg[ctaKey] = { name: cta, page: page, clicks: 0, visitors: {} };
      ctaAgg[ctaKey].clicks++;
      if (visitor) ctaAgg[ctaKey].visitors[visitor] = true;
    }

    if (event === 'contact_lead' || event === 'contact_submission' || event === 'form_submit' || event === 'workshop_request') {
      totalLeads++;
      dailyAgg[date].leads++;
    }

    if (isToolEvent(event)) {
      dailyAgg[date].tools++;
      var feature = page || 'Unknown';
      if (!featureAgg[feature]) featureAgg[feature] = { uses: 0, duration: 0, visitors: {} };
      featureAgg[feature].uses++;
      featureAgg[feature].duration += duration;
      if (visitor) featureAgg[feature].visitors[visitor] = true;
    }

    if (event === 'session_start') {
      totalSessionStarts++;
      if (!sourceAgg[source]) sourceAgg[source] = { sessions: 0 };
      if (!deviceAgg[device]) deviceAgg[device] = { sessions: 0 };
      sourceAgg[source].sessions++;
      deviceAgg[device].sessions++;
    }
  });

  var now = new Date().toISOString();

  var pageSheet = clearProcessedSheet(ss, SHEETS.PROC_PAGE);
  Object.keys(pageAgg).forEach(function(page) {
    var item = pageAgg[page];
    pageSheet.appendRow([
      now, page, item.views, Object.keys(item.visitors).length,
      item.views ? Math.round(item.duration / item.views) : 0,
      item.views ? Math.round(item.scroll / item.views) : 0, '', ''
    ]);
  });

  var ctaSheet = clearProcessedSheet(ss, SHEETS.PROC_CTA);
  Object.keys(ctaAgg).forEach(function(key) {
    var item = ctaAgg[key];
    ctaSheet.appendRow([
      now, item.name, item.page, item.clicks,
      Object.keys(item.visitors).length, '', ''
    ]);
  });

  var trafficSheet = clearProcessedSheet(ss, SHEETS.PROC_TRAFFIC);
  Object.keys(sourceAgg).forEach(function(source) {
    trafficSheet.appendRow([now, source, '', sourceAgg[source].sessions, '', '', '', '']);
  });

  var deviceSheet = clearProcessedSheet(ss, SHEETS.PROC_DEVICE);
  Object.keys(deviceAgg).forEach(function(device) {
    deviceSheet.appendRow([now, device, deviceAgg[device].sessions, '', '', '', '']);
  });

  var featureSheet = clearProcessedSheet(ss, SHEETS.PROC_FEATURE);
  Object.keys(featureAgg).forEach(function(feature) {
    var item = featureAgg[feature];
    featureSheet.appendRow([
      now, feature, item.uses, Object.keys(item.visitors).length,
      item.uses ? Math.round(item.duration / item.uses) : 0, '', ''
    ]);
  });

  var dailySheet = clearProcessedSheet(ss, SHEETS.PROC_DAILY);
  Object.keys(dailyAgg).sort().forEach(function(date) {
    var item = dailyAgg[date];
    dailySheet.appendRow([
      date, item.views, Object.keys(item.sessions).length,
      '', item.cta, item.leads, item.tools, ''
    ]);
  });

  var sessionSheet = clearProcessedSheet(ss, SHEETS.PROC_SESSION);
  sessionSheet.appendRow([
    now, totalSessionStarts, durationCount ? Math.round(durationSum / durationCount) : 0,
    '', '', '', '', ''
  ]);

  var topPage = Object.keys(pageAgg).sort(function(a, b) {
    return pageAgg[b].views - pageAgg[a].views;
  })[0] || '';

  var topCtaKey = Object.keys(ctaAgg).sort(function(a, b) {
    return ctaAgg[b].clicks - ctaAgg[a].clicks;
  })[0] || '';

  var topSource = Object.keys(sourceAgg).sort(function(a, b) {
    return sourceAgg[b].sessions - sourceAgg[a].sessions;
  })[0] || '';

  var summary = ss.getSheetByName(SHEETS.PROCESSED_ANALYTICS);
  var summaryRow = [[
    now, totalViews, Object.keys(sessions).length, totalCta, totalLeads,
    '', durationCount ? Math.round(durationSum / durationCount) : 0,
    topPage, topCtaKey ? ctaAgg[topCtaKey].name : '', topSource
  ]];

  summary.getRange(2, 1, 1, 10).setValues(summaryRow);
  SpreadsheetApp.flush();

  Logger.log('Processed analytics refreshed. Visitors=' + Object.keys(visitors).length +
    ', Sessions=' + Object.keys(sessions).length + ', Page views=' + totalViews);
}

function clearProcessedSheet(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error('Processed sheet missing: ' + sheetName);
  var last = sheet.getLastRow();
  if (last > 1) sheet.deleteRows(2, last - 1);
  return sheet;
}

// =============================================================================
// 13. INTEGRATION TESTS
// =============================================================================

function testAirtableConnection() {
  var cfg = getIntegrationConfig();
  if (!cfg.airtableToken || !cfg.airtableBaseId) {
    throw new Error('Set AIRTABLE_TOKEN and AIRTABLE_BASE_ID in Script Properties.');
  }

  var result = airtableRequest(cfg.airtableContactTable, {
    fields: {
      'Lead Number': 'VYN-TEST-0001',
      'Name': 'VYNTRA Airtable Test',
      'Email': 'airtable-test@example.com',
      'Role': 'Test',
      'Organization': 'VYNTRA',
      'Message': 'Airtable connection test',
      'Source': 'Apps Script Test',
      'Status': 'Test'
    }
  }, 'post');

  Logger.log('Airtable connection test passed. Record ID: ' + (result.id || 'created'));
  return result;
}

function testAirtableAnalytics() {
  var testData = {
    event: 'page_view',
    page: '/vyntra-airtable-test',
    visitorId: 'VYNTRA-AIRTABLE-TEST',
    sessionId: 'VYNTRA-AIRTABLE-SESSION',
    device: 'desktop',
    source: 'Apps Script Test',
    scrollDepth: 50,
    details: 'VYNTRA Airtable analytics connection test'
  };
  return sendAnalyticsToAirtable(testData);
}

function testJiraConnection() {
  var cfg = getIntegrationConfig();
  if (!cfg.jiraUrl) throw new Error('Set JIRA_WEBHOOK_URL in Script Properties.');

  var payload = {
    sourceSystem: 'VYNTRA',
    event: 'integration_test',
    leadNumber: 'VYN-TEST-0001',
    name: 'VYNTRA Jira Test',
    email: 'jira-test@example.com',
    organization: 'VYNTRA',
    details: 'Test event from VYNTRA Apps Script'
  };

  var headers = {};
  if (cfg.jiraSecret) headers['X-Automation-Webhook-Token'] = cfg.jiraSecret;

  var result = UrlFetchApp.fetch(cfg.jiraUrl, {
    method: 'post',
    contentType: 'application/json',
    headers: headers,
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  logHttpResult('Jira test', result);
  if (result.getResponseCode() < 200 || result.getResponseCode() >= 300) {
    throw new Error('Jira test failed with HTTP ' + result.getResponseCode());
  }
  return true;
}

function testEmailConnection() {
  var cfg = getIntegrationConfig();
  if (!cfg.adminEmail) throw new Error('Set ADMIN_EMAIL in Script Properties.');
  MailApp.sendEmail({
    to: cfg.adminEmail,
    subject: 'VYNTRA Apps Script email test',
    body: 'This is a test email from the VYNTRA analytics backend.'
  });
  Logger.log('Test email sent to ' + cfg.adminEmail);
}

function testYouTubeEngagementSync() {
  var testData = {
    action: 'youtube_engagement_sync',
    records: [{
      commentId: 'VYNTRA-TEST-COMMENT-001',
      videoId: 'TEST-VIDEO',
      videoTitle: 'VYNTRA YouTube Integration Test',
      totalViews: 1,
      totalLikes: 1,
      totalComments: 1,
      commentText: 'Test record — safe to delete after verification',
      commenterName: 'VYNTRA Test',
      commentLikes: 0,
      commentDate: new Date().toISOString(),
      commentUrl: ''
    }]
  };

  var response = handleYouTubeEngagementSync(testData);
  Logger.log(response.getContent());
}

function testDigitalIntelligence() {
  var ss = getSpreadsheet();
  ensureAllSheets(ss);
  var sample = {
    event: 'digital_intelligence',
    visitorId: 'VYNTRA-DI-TEST',
    sessionId: 'VYNTRA-DI-SESSION',
    page: '/home',
    entryPage: '/home',
    exitPage: '/services',
    navigationPath: '/home -> /services',
    referrer: 'https://www.google.com/',
    trafficSource: 'google',
    trafficMedium: 'organic',
    campaign: 'test-campaign',
    utmTerm: 'lean six sigma',
    utmContent: 'test-content',
    country: 'India',
    region: 'Kerala',
    city: '',
    timezone: 'Asia/Kolkata',
    localHour: 12,
    device: 'desktop',
    browser: 'Chrome',
    screenSize: '1920x1080',
    dwellTime: 45,
    scrollDepth: 80,
    isRepeatVisitor: false,
    visitCount: 1
  };
  writeDigitalIntelligenceEvent(ss, sample);
  SpreadsheetApp.flush();
  Logger.log('Digital intelligence test row added.');
}

function runValidationTest() {
  var ss = getSpreadsheet();
  ensureAllSheets(ss);
  var raw = ss.getSheetByName(SHEETS.RAW_DATA);
  var before = raw.getLastRow();

  var payload = {
    event: 'page_view',
    page: '/vyntra-validation-test',
    visitorId: 'VYNTRA-TEST-VISITOR-001',
    sessionId: 'VYNTRA-TEST-SESSION-001',
    device: 'desktop',
    source: 'validation_script',
    duration: 30,
    scrollDepth: 75,
    details: { test: true }
  };

  var rawRow = buildRawRow(payload);
  appendRow(ss, SHEETS.RAW_DATA, rawRow);
  routeEvent(ss, payload, rawRow);
  SpreadsheetApp.flush();

  if (raw.getLastRow() !== before + 1) {
    throw new Error('Validation failed: RAW_DATA row count did not increase.');
  }
  Logger.log('PASSED: page_view added to RAW_DATA at row ' + raw.getLastRow());
}

function runContactLeadValidationTest() {
  var ss = getSpreadsheet();
  ensureAllSheets(ss);
  var leads = ss.getSheetByName(SHEETS.CONTACT_LEADS);
  var before = leads.getLastRow();

  var payload = {
    event: 'contact_lead',
    page: '/contact',
    visitorId: 'VYNTRA-TEST-VISITOR-002',
    sessionId: 'VYNTRA-TEST-SESSION-002',
    name: 'VYNTRA Test User',
    email: 'test@example.com',
    role: 'Operations Manager',
    organization: 'VYNTRA Test Organization',
    details: {
      industry: 'Manufacturing',
      areaOfInterest: 'Lean Six Sigma Transformation',
      businessChallenge: 'Validation test only'
    },
    device: 'desktop',
    source: 'validation_script'
  };

  var rawRow = buildRawRow(payload);
  appendRow(ss, SHEETS.RAW_DATA, rawRow);
  routeEvent(ss, payload, rawRow);
  SpreadsheetApp.flush();

  if (leads.getLastRow() !== before + 1) {
    throw new Error('Contact lead validation failed.');
  }
  Logger.log('PASSED: Contact lead created at row ' + leads.getLastRow());
}

function runWebhookPostTest() {
  var payload = {
    event: 'page_view',
    page: '/vyntra-webhook-post-test',
    visitorId: 'VYNTRA-WEBHOOK-TEST',
    sessionId: 'VYNTRA-WEBHOOK-SESSION',
    device: 'desktop',
    source: 'apps_script_post_test',
    duration: 5,
    scrollDepth: 20,
    details: { test: true }
  };

  var mockEvent = {
    postData: { contents: JSON.stringify(payload), type: 'application/json' },
    parameter: {}
  };

  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}

function testVyntraSystem() {
  initializeSpreadsheet();
  runValidationTest();
  testDigitalIntelligence();
  refreshAllProcessedAnalytics();
  Logger.log('VYNTRA core system test completed. External integrations are tested separately.');
}

// =============================================================================
// 14. LOGGING AND UTILITIES
// =============================================================================

function logIntegrationError(integrationName, error) {
  console.error(integrationName + ' integration error: ' + (error.stack || error.message || error));
}

function logHttpResult(serviceName, result) {
  Logger.log(serviceName + ' HTTP status: ' + result.getResponseCode());
  Logger.log(serviceName + ' response: ' + result.getContentText());
}

function safeJson(value) {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch (error) {
    Logger.log('JSON serialization error: ' + error.message);
    return '';
  }
}

function formatDate(value) {
  try {
    var date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return '';
    return Utilities.formatDate(date, CONFIG.TIME_ZONE, 'yyyy-MM-dd');
  } catch (error) {
    Logger.log('Date formatting error: ' + error.message);
    return '';
  }
}

function formatDateFromTs(value) {
  if (!value) return '';
  return formatDate(value instanceof Date ? value : new Date(value));
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
