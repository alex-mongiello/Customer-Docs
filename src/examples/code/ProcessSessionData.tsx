import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SESSION_SOURCES = [
  'Google Analytics',
  'HubSpot CRM',
  'Salesforce',
  'Mixpanel',
  'Amplitude',
  'Segment',
  'Marketo',
  'Intercom',
];

const METRIC_LABELS = [
  'Total Sessions',
  'Unique Visitors',
  'Avg Duration',
  'Bounce Rate',
  'Conversion Rate',
  'Pages / Session',
  'New Users',
  'Returning Users',
];

const SESSION_ROWS = [
  {id: 'USR-4821', name: 'Acme Corp', sessions: 342, pages: 1284, duration: '4m 12s', score: 87},
  {id: 'USR-7193', name: 'TechFlow Inc', sessions: 219, pages: 876, duration: '3m 48s', score: 72},
  {id: 'USR-3305', name: 'DataVault Ltd', sessions: 187, pages: 612, duration: '2m 55s', score: 65},
  {id: 'USR-9012', name: 'CloudSync Co', sessions: 456, pages: 2103, duration: '5m 30s', score: 91},
  {id: 'USR-1147', name: 'Bright Signals', sessions: 128, pages: 398, duration: '2m 18s', score: 58},
  {id: 'USR-6638', name: 'NexGen Labs', sessions: 301, pages: 1456, duration: '4m 44s', score: 83},
  {id: 'USR-2254', name: 'PulseMetrics', sessions: 274, pages: 1089, duration: '3m 22s', score: 76},
  {id: 'USR-8870', name: 'Orbit Media', sessions: 163, pages: 520, duration: '2m 41s', score: 61},
  {id: 'USR-5519', name: 'Signal Path', sessions: 410, pages: 1837, duration: '5m 05s', score: 89},
  {id: 'USR-0423', name: 'Keystone AI', sessions: 95, pages: 281, duration: '1m 58s', score: 44},
  {id: 'USR-7781', name: 'BlueArc Dev', sessions: 388, pages: 1692, duration: '4m 33s', score: 85},
  {id: 'USR-3398', name: 'Vertex SaaS', sessions: 247, pages: 943, duration: '3m 11s', score: 69},
  {id: 'USR-6104', name: 'Prism Health', sessions: 178, pages: 567, duration: '2m 49s', score: 62},
  {id: 'USR-1890', name: 'Ember Works', sessions: 321, pages: 1345, duration: '4m 19s', score: 80},
  {id: 'USR-4456', name: 'Lumen Data', sessions: 143, pages: 432, duration: '2m 27s', score: 55},
  {id: 'USR-9927', name: 'Horizon IO', sessions: 492, pages: 2340, duration: '6m 12s', score: 94},
];

const PROCESSING_TASKS = [
  'Importing GA4 session events…',
  'Parsing HubSpot engagement logs…',
  'Merging Salesforce contact records…',
  'Deduplicating user sessions…',
  'Computing attribution models…',
  'Aggregating page-view funnels…',
  'Resolving cross-device identities…',
  'Normalizing UTM parameters…',
  'Calculating cohort retention…',
  'Building engagement score matrix…',
  'Reconciling CRM touchpoints…',
  'Exporting to dashboard…',
];

const CHART_BARS = [38, 52, 45, 67, 73, 61, 80, 55, 92, 48, 70, 85];

// ---------------------------------------------------------------------------
// Schedule: [frameAppear, type, index]
// Types: 'row' = data row, 'task' = processing task, 'metric' = metric update, 'source' = source ping
// ---------------------------------------------------------------------------

type NoteType = 'row' | 'task' | 'metric' | 'source';
type ScheduleEntry = [number, NoteType, number];

const SCHEDULE: ScheduleEntry[] = [
  // Phase 1: Loading (frames 0-60, seconds 0-2)
  [15, 'source', 0],
  [30, 'task', 0],
  [45, 'row', 0],
  [55, 'metric', 0],

  // Phase 2: Processing (frames 60-240, seconds 2-8)
  [65, 'task', 1],
  [80, 'row', 1],
  [95, 'source', 1],
  [105, 'row', 2],
  [115, 'metric', 1],
  [125, 'task', 2],
  [140, 'row', 3],
  [150, 'source', 2],
  [160, 'row', 4],
  [170, 'metric', 2],
  [180, 'task', 3],
  [195, 'row', 5],
  [205, 'source', 3],
  [215, 'metric', 3],
  [225, 'row', 6],
  [235, 'task', 4],

  // Phase 3: Accelerating (frames 240-420, seconds 8-14)
  [242, 'row', 7],
  [248, 'source', 4],
  [254, 'task', 5],
  [260, 'row', 8],
  [265, 'metric', 4],
  [270, 'row', 9],
  [275, 'source', 5],
  [280, 'task', 6],
  [285, 'row', 10],
  [290, 'metric', 5],
  [295, 'row', 11],
  [300, 'source', 6],
  [304, 'task', 7],
  [308, 'row', 12],
  [312, 'metric', 6],
  [316, 'row', 13],
  [320, 'source', 7],
  [324, 'task', 8],
  [328, 'row', 14],
  [332, 'metric', 7],
  [336, 'row', 15],
  [340, 'task', 9],
  [344, 'row', 0],
  [348, 'source', 0],
  [352, 'metric', 0],
  [356, 'row', 1],
  [360, 'task', 10],
  [364, 'row', 2],
  [368, 'source', 1],
  [372, 'row', 3],
  [376, 'metric', 1],
  [380, 'task', 11],
  [384, 'row', 4],
  [388, 'source', 2],
  [392, 'row', 5],
  [396, 'metric', 2],
  [400, 'row', 6],
  [404, 'task', 0],
  [408, 'row', 7],
  [412, 'source', 3],
  [416, 'row', 8],

  // Phase 4: Overloaded (frames 420-540)
  [422, 'row', 9],
  [424, 'task', 1],
  [426, 'metric', 3],
  [428, 'source', 4],
  [430, 'row', 10],
  [432, 'task', 2],
  [434, 'row', 11],
  [436, 'metric', 4],
  [438, 'source', 5],
  [440, 'row', 12],
  [442, 'task', 3],
  [444, 'row', 13],
  [446, 'metric', 5],
  [448, 'source', 6],
  [450, 'row', 14],
  [452, 'task', 4],
  [454, 'row', 15],
  [456, 'metric', 6],
  [458, 'source', 7],
  [460, 'row', 0],
  [462, 'task', 5],
  [464, 'row', 1],
  [466, 'metric', 7],
  [468, 'source', 0],
  [470, 'row', 2],
  [472, 'task', 6],
  [474, 'row', 3],
  [476, 'metric', 0],
  [478, 'source', 1],
  [480, 'row', 4],
  [482, 'task', 7],
  [484, 'row', 5],
  [486, 'metric', 1],
  [488, 'source', 2],
  [490, 'row', 6],
  [492, 'task', 8],
  [494, 'row', 7],
  [496, 'metric', 2],
  [498, 'source', 3],
  [500, 'row', 8],
  [502, 'task', 9],
  [504, 'row', 9],
  [506, 'metric', 3],
  [508, 'row', 10],
  [510, 'task', 10],
  [512, 'row', 11],
  [514, 'source', 4],
  [516, 'metric', 4],
  [518, 'row', 12],
  [520, 'task', 11],
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const MacBookFrame: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0f1923',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 1600,
          height: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 1500,
            height: 940,
            background: '#0a0a0a',
            borderRadius: '16px 16px 0 0',
            padding: '12px 12px 4px 12px',
            boxShadow: '0 0 60px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#1a1a1a',
                border: '1px solid #333',
              }}
            />
          </div>
          <div
            style={{
              width: '100%',
              height: 900,
              borderRadius: 8,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {children}
          </div>
        </div>
        <div
          style={{
            width: 1600,
            height: 14,
            background: 'linear-gradient(180deg, #c0c0c0 0%, #a0a0a0 100%)',
            borderRadius: '0 0 2px 2px',
          }}
        />
        <div
          style={{
            width: 1700,
            height: 10,
            background: 'linear-gradient(180deg, #b0b0b0 0%, #909090 100%)',
            borderRadius: '0 0 12px 12px',
          }}
        />
      </div>
    </div>
  );
};

const MenuBar: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 28,
      background: 'rgba(30, 34, 42, 0.95)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 12px',
      fontSize: 13,
      color: '#ccc',
      justifyContent: 'space-between',
      zIndex: 50,
    }}
  >
    <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
      <span style={{fontWeight: 'bold', fontSize: 16}}>&#63743;</span>
      <span style={{fontWeight: 600}}>Session Processor</span>
      <span>File</span>
      <span>Edit</span>
      <span>View</span>
      <span>Tools</span>
      <span>Help</span>
    </div>
    <div style={{display: 'flex', gap: 12, alignItems: 'center', fontSize: 12}}>
      <span>Mon 9:42 AM</span>
    </div>
  </div>
);

/** Left sidebar: data source list with status indicators */
const SourceSidebar: React.FC<{
  activeSources: Array<{name: string; status: 'idle' | 'syncing' | 'done' | 'error'}>;
}> = ({activeSources}) => {
  return (
    <div
      style={{
        width: 200,
        height: '100%',
        background: '#1a1f2e',
        padding: '12px 0',
        flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          color: '#8892a4',
          fontSize: 11,
          fontWeight: 700,
          padding: '0 14px 10px',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Data Sources
      </div>
      {activeSources.map((source, i) => {
        const dotColor =
          source.status === 'syncing'
            ? '#4dabf7'
            : source.status === 'done'
            ? '#51cf66'
            : source.status === 'error'
            ? '#ff6b6b'
            : '#555';
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 14px',
              fontSize: 13,
              color: source.status === 'idle' ? '#556' : '#d0d4dc',
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: dotColor,
                boxShadow: source.status === 'syncing' ? `0 0 6px ${dotColor}` : 'none',
                flexShrink: 0,
              }}
            />
            {source.name}
          </div>
        );
      })}

      <div
        style={{
          color: '#8892a4',
          fontSize: 11,
          fontWeight: 700,
          padding: '20px 14px 10px',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Processing
      </div>
      <div
        style={{
          padding: '0 14px',
          fontSize: 12,
          color: '#8892a4',
          lineHeight: 1.6,
        }}
      >
        Sessions ingested
        <br />
        Records merged
        <br />
        Errors skipped
      </div>
    </div>
  );
};

/** Main data table panel */
const DataTablePanel: React.FC<{
  rows: Array<{
    id: string;
    name: string;
    sessions: number;
    pages: number;
    duration: string;
    score: number;
    opacity: number;
  }>;
}> = ({rows}) => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#141820',
        overflow: 'hidden',
      }}
    >
      {/* Table header */}
      <div
        style={{
          display: 'flex',
          padding: '10px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          fontSize: 11,
          fontWeight: 700,
          color: '#8892a4',
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          gap: 0,
        }}
      >
        <span style={{width: 90}}>ID</span>
        <span style={{width: 130}}>Account</span>
        <span style={{width: 80, textAlign: 'right'}}>Sessions</span>
        <span style={{width: 80, textAlign: 'right'}}>Pages</span>
        <span style={{width: 90, textAlign: 'right'}}>Avg Duration</span>
        <span style={{width: 70, textAlign: 'right'}}>Score</span>
      </div>
      {/* Data rows */}
      <div style={{flex: 1, overflowY: 'hidden'}}>
        {rows.map((row, i) => {
          const scoreColor =
            row.score >= 80 ? '#51cf66' : row.score >= 60 ? '#fcc419' : '#ff6b6b';
          return (
            <div
              key={`${row.id}-${i}`}
              style={{
                display: 'flex',
                padding: '7px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                fontSize: 13,
                color: '#c8cdd5',
                opacity: row.opacity,
                gap: 0,
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
              }}
            >
              <span style={{width: 90, color: '#6c7a8d', fontFamily: 'monospace', fontSize: 12}}>
                {row.id}
              </span>
              <span style={{width: 130, fontWeight: 500}}>{row.name}</span>
              <span style={{width: 80, textAlign: 'right', fontFamily: 'monospace'}}>
                {row.sessions.toLocaleString()}
              </span>
              <span style={{width: 80, textAlign: 'right', fontFamily: 'monospace'}}>
                {row.pages.toLocaleString()}
              </span>
              <span
                style={{
                  width: 90,
                  textAlign: 'right',
                  fontFamily: 'monospace',
                  color: '#8892a4',
                }}
              >
                {row.duration}
              </span>
              <span
                style={{
                  width: 70,
                  textAlign: 'right',
                  fontWeight: 700,
                  color: scoreColor,
                  fontFamily: 'monospace',
                }}
              >
                {row.score}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Right panel: metrics cards and mini bar chart */
const MetricsPanel: React.FC<{
  metricValues: number[];
  chartProgress: number;
  frame: number;
  fps: number;
}> = ({metricValues, chartProgress, frame, fps}) => {
  const metricInfo: Array<{label: string; format: (v: number) => string}> = [
    {label: 'Total Sessions', format: (v) => v.toLocaleString()},
    {label: 'Unique Visitors', format: (v) => v.toLocaleString()},
    {label: 'Avg Duration', format: (v) => `${Math.floor(v / 60)}m ${v % 60}s`},
    {label: 'Bounce Rate', format: (v) => `${v}%`},
    {label: 'Conversion Rate', format: (v) => `${(v / 10).toFixed(1)}%`},
    {label: 'Pages / Session', format: (v) => (v / 10).toFixed(1)},
    {label: 'New Users', format: (v) => v.toLocaleString()},
    {label: 'Returning Users', format: (v) => v.toLocaleString()},
  ];
  return (
    <div
      style={{
        width: 300,
        height: '100%',
        background: '#161b26',
        borderLeft: '1px solid rgba(255,255,255,0.06)',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flexShrink: 0,
        overflowY: 'hidden',
      }}
    >
      <div
        style={{
          color: '#8892a4',
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 2,
        }}
      >
        Key Metrics
      </div>
      {/* Metric cards - 2 columns */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
        }}
      >
        {metricValues.slice(0, 8).map((val, i) => {
          const info = metricInfo[i];
          const cardOpacity = interpolate(
            frame,
            [30 + i * 15, 45 + i * 15],
            [0, 1],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
          );
          return (
            <div
              key={i}
              style={{
                width: 131,
                padding: '8px 10px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.06)',
                opacity: cardOpacity,
              }}
            >
              <div style={{fontSize: 10, color: '#8892a4', marginBottom: 2}}>
                {info.label}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#e4e8ee',
                  fontFamily: 'monospace',
                }}
              >
                {info.format(val)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini bar chart */}
      <div
        style={{
          color: '#8892a4',
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginTop: 6,
        }}
      >
        Sessions / Hour
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 4,
          padding: '4px 0',
          minHeight: 80,
        }}
      >
        {CHART_BARS.map((height, i) => {
          const barHeight = (height / 100) * 120 * chartProgress;
          const barColor = height > 75 ? '#4dabf7' : height > 50 ? '#69db7c' : '#495057';
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: barHeight,
                background: barColor,
                borderRadius: '3px 3px 0 0',
                minHeight: 2,
                transition: 'height 0.3s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

/** Processing task log - appears as a bottom console */
const ProcessingLog: React.FC<{
  tasks: Array<{text: string; status: 'running' | 'done' | 'error'; opacity: number}>;
}> = ({tasks}) => {
  return (
    <div
      style={{
        height: 120,
        background: '#0d1117',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '8px 14px',
        overflowY: 'hidden',
        fontFamily: 'monospace',
        fontSize: 12,
      }}
    >
      <div
        style={{
          color: '#8892a4',
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 6,
        }}
      >
        Processing Log
      </div>
      {tasks.map((task, i) => {
        const icon =
          task.status === 'running' ? '▸' : task.status === 'done' ? '✓' : '✗';
        const color =
          task.status === 'running'
            ? '#4dabf7'
            : task.status === 'done'
            ? '#51cf66'
            : '#ff6b6b';
        return (
          <div
            key={i}
            style={{
              opacity: task.opacity,
              color: '#8892a4',
              lineHeight: 1.7,
              display: 'flex',
              gap: 8,
            }}
          >
            <span style={{color, fontWeight: 700}}>{icon}</span>
            <span>{task.text}</span>
          </div>
        );
      })}
    </div>
  );
};

/** Floating progress toast */
const ProgressToast: React.FC<{
  text: string;
  x: number;
  y: number;
  animProgress: number;
  variant: 'info' | 'warning' | 'error';
}> = ({text, x, y, animProgress, variant}) => {
  const opacity = interpolate(animProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0.5]);
  const scale = interpolate(animProgress, [0, 0.1, 0.15], [0.8, 1.05, 1]);
  const translateY = interpolate(animProgress, [0, 0.15], [-10, 0]);
  const bg = variant === 'error' ? '#3d1517' : variant === 'warning' ? '#3d3115' : '#152636';
  const border =
    variant === 'error'
      ? '#ff6b6b'
      : variant === 'warning'
      ? '#fcc419'
      : '#4dabf7';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        maxWidth: 320,
        background: bg,
        borderRadius: 8,
        border: `1px solid ${border}40`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px ${border}20`,
        padding: '10px 14px',
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        zIndex: 100,
        fontSize: 12,
        color: '#c8cdd5',
        fontFamily: 'monospace',
      }}
    >
      <span style={{color: border, fontWeight: 700, marginRight: 6}}>
        {variant === 'error' ? '✗' : variant === 'warning' ? '⚠' : '●'}
      </span>
      {text}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main composition
// ---------------------------------------------------------------------------

export const ProcessSessionData: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // --- Camera shake for overload phase ---
  const shakeIntensity = interpolate(frame, [380, 450, 500, 540], [0, 2, 6, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shakeX = Math.sin(frame * 0.7) * shakeIntensity;
  const shakeY = Math.cos(frame * 0.9) * shakeIntensity;

  // --- Subtle zoom ---
  const zoom = interpolate(frame, [0, 420, 540], [1, 1, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Build data source statuses ---
  const sourceSchedule = SCHEDULE.filter(([, type]) => type === 'source');
  const sourceStatuses: Array<{name: string; status: 'idle' | 'syncing' | 'done' | 'error'}> =
    SESSION_SOURCES.map((name) => ({name, status: 'idle'}));
  for (const [appearFrame, , idx] of sourceSchedule) {
    const sourceIdx = idx % SESSION_SOURCES.length;
    if (frame >= appearFrame) {
      const elapsed = frame - appearFrame;
      if (elapsed < 40) {
        sourceStatuses[sourceIdx].status = 'syncing';
      } else if (frame > 460 && seededRandom(appearFrame) > 0.7) {
        sourceStatuses[sourceIdx].status = 'error';
      } else {
        sourceStatuses[sourceIdx].status = 'done';
      }
    }
  }

  // --- Build visible data rows ---
  const rowSchedule = SCHEDULE.filter(([, type]) => type === 'row');
  const visibleRows: Array<{
    id: string;
    name: string;
    sessions: number;
    pages: number;
    duration: string;
    score: number;
    opacity: number;
  }> = [];
  for (const [appearFrame, , idx] of rowSchedule) {
    if (frame >= appearFrame) {
      const rowData = SESSION_ROWS[idx % SESSION_ROWS.length];
      const rowOpacity = interpolate(frame, [appearFrame, appearFrame + 10], [0, 1], {
        extrapolateRight: 'clamp',
      });
      visibleRows.push({...rowData, opacity: rowOpacity});
    }
  }
  const tableRows = visibleRows.slice(-14);

  // --- Build processing log ---
  const taskSchedule = SCHEDULE.filter(([, type]) => type === 'task');
  const visibleTasks: Array<{text: string; status: 'running' | 'done' | 'error'; opacity: number}> =
    [];
  for (const [appearFrame, , idx] of taskSchedule) {
    if (frame >= appearFrame) {
      const taskOpacity = interpolate(frame, [appearFrame, appearFrame + 8], [0, 1], {
        extrapolateRight: 'clamp',
      });
      const elapsed = frame - appearFrame;
      let status: 'running' | 'done' | 'error' = 'running';
      if (elapsed > 50) {
        status = frame > 480 && seededRandom(appearFrame * 3) > 0.6 ? 'error' : 'done';
      }
      visibleTasks.push({
        text: PROCESSING_TASKS[idx % PROCESSING_TASKS.length],
        status,
        opacity: taskOpacity,
      });
    }
  }
  const logTasks = visibleTasks.slice(-5);

  // --- Metric values (increase over time) ---
  const metricSchedule = SCHEDULE.filter(([, type]) => type === 'metric');
  const metricUpdates = metricSchedule.filter(([f]) => frame >= f).length;
  const baseMetrics = [1247, 893, 252, 34, 42, 37, 612, 281];
  const metricValues = baseMetrics.map((base, i) => {
    const growth = Math.floor(base * 0.15 * metricUpdates * (1 + seededRandom(i) * 0.5));
    return base + growth;
  });

  // --- Chart progress ---
  const chartProgress = interpolate(frame, [30, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Floating toasts for overload phase ---
  const toastDuration = 70;
  const activeToasts: Array<{
    text: string;
    x: number;
    y: number;
    animProgress: number;
    variant: 'info' | 'warning' | 'error';
  }> = [];
  const toastMessages = [
    {text: 'Rate limit exceeded: GA4 API', variant: 'error' as const},
    {text: 'Duplicate session IDs detected', variant: 'warning' as const},
    {text: 'Syncing 2,341 new records…', variant: 'info' as const},
    {text: 'Memory usage: 87%', variant: 'warning' as const},
    {text: 'HubSpot timeout: retry 3/5', variant: 'error' as const},
    {text: 'Schema mismatch: Salesforce', variant: 'error' as const},
    {text: 'Queue depth: 14,209 events', variant: 'warning' as const},
    {text: 'Processing batch 47/128…', variant: 'info' as const},
  ];

  // Show toasts from acceleration phase onward
  for (let i = 0; i < SCHEDULE.length; i++) {
    const [appearFrame, type] = SCHEDULE[i];
    if (appearFrame < 280) continue;
    if (type !== 'row' && type !== 'task') continue;
    if (frame >= appearFrame && frame < appearFrame + toastDuration) {
      const progress = (frame - appearFrame) / toastDuration;
      const msgIdx = i % toastMessages.length;
      const seed = appearFrame * 7 + i * 13;
      activeToasts.push({
        ...toastMessages[msgIdx],
        x: 220 + seededRandom(seed) * 700,
        y: 40 + seededRandom(seed + 1) * 500,
        animProgress: progress,
      });
    }
  }
  // Limit toast count
  const displayToasts = activeToasts.slice(-6);

  // --- Overwhelm overlay ---
  const overwhelmOpacity = interpolate(frame, [460, 540], [0, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Progress bar at the very top ---
  const totalTasks = SCHEDULE.length;
  const completedTasks = SCHEDULE.filter(([f]) => frame >= f).length;
  const progressPct = (completedTasks / totalTasks) * 100;
  const progressColor =
    progressPct > 80 ? '#ff6b6b' : progressPct > 50 ? '#fcc419' : '#4dabf7';

  return (
    <AbsoluteFill
      style={{
        background: '#0f1923',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <MacBookFrame>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transform: `scale(${zoom}) translate(${shakeX}px, ${shakeY}px)`,
            background: '#141820',
          }}
        >
          <MenuBar />

          {/* Progress bar just below menu bar */}
          <div
            style={{
              position: 'absolute',
              top: 28,
              left: 0,
              right: 0,
              height: 3,
              background: 'rgba(255,255,255,0.05)',
              zIndex: 50,
            }}
          >
            <div
              style={{
                width: `${progressPct}%`,
                height: '100%',
                background: progressColor,
                boxShadow: `0 0 8px ${progressColor}60`,
                transition: 'width 0.1s',
              }}
            />
          </div>

          {/* Main content: sidebar + table + metrics */}
          <div
            style={{
              position: 'absolute',
              top: 31,
              left: 0,
              right: 0,
              bottom: 120,
              display: 'flex',
            }}
          >
            <SourceSidebar activeSources={sourceStatuses} />
            <DataTablePanel rows={tableRows} />
            <MetricsPanel
              metricValues={metricValues}
              chartProgress={chartProgress}
              frame={frame}
              fps={fps}
            />
          </div>

          {/* Processing log at the bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <ProcessingLog tasks={logTasks} />
          </div>

          {/* Toast overlay layer */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              zIndex: 150,
            }}
          >
            {displayToasts.map((toast, i) => (
              <ProgressToast key={`toast-${i}`} {...toast} />
            ))}
          </div>

          {/* Overwhelm overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `rgba(255, 50, 50, ${overwhelmOpacity})`,
              pointerEvents: 'none',
              zIndex: 300,
            }}
          />
        </div>
      </MacBookFrame>
    </AbsoluteFill>
  );
};
