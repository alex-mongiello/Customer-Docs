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

const SLACK_MESSAGES = [
  'Hey! Need a case study for this deal ASAP',
  'Can you find me a customer reference for tomorrow?',
  'Do we have any testimonials from fintech companies?',
  'Quick ask - need a logo for this presentation',
  'Customer story for healthcare vertical?',
  'Need proof points for this prospect by EOD',
  'Got a reference for enterprise deals?',
  'Can you pull stats from our case studies?',
];

const SLACK_SENDERS = [
  'Sarah Chen',
  'Mike Johnson',
  'Priya Patel',
  'David Kim',
  'Lisa Rodriguez',
  'Tom Williams',
  'Aisha Khan',
  'James Lee',
];

const SLACK_CHANNELS = [
  '#sales-requests',
  '#customer-marketing',
  '#references',
  '#deal-support',
  '#content-requests',
  '#urgent-asks',
  '#customer-stories',
  '#marketing-help',
];

const EMAIL_SUBJECTS = [
  'URGENT: Reference needed for 500K deal',
  'Customer testimonial request - Due today',
  'RE: Case study needed by Friday',
  'Quick question about customer logos',
  'Need social proof for pitch deck',
];

const EMAIL_SENDERS = [
  'Jennifer Adams',
  'Robert Taylor',
  'Amanda Foster',
  'Chris Martinez',
  'Emily Davis',
];

// ---------------------------------------------------------------------------
// Notification schedule - each entry: [frameAppear, type, index]
// ---------------------------------------------------------------------------

type NoteType = 'slack' | 'email' | 'badge';
type ScheduleEntry = [number, NoteType, number];

const SCHEDULE: ScheduleEntry[] = [
  // Phase 1: Calm (frames 0-90, seconds 0-3) - 2 notifications
  [45, 'slack', 0],
  [75, 'email', 0],

  // Phase 2: Building (frames 90-300, seconds 3-10) - moderate pace
  [100, 'slack', 1],
  [130, 'email', 1],
  [155, 'slack', 2],
  [175, 'badge', 0],
  [195, 'email', 2],
  [215, 'slack', 3],
  [235, 'slack', 4],
  [255, 'email', 3],
  [270, 'badge', 1],
  [285, 'slack', 5],

  // Phase 3: Chaotic (frames 300-480, seconds 10-16) - rapid fire
  [305, 'slack', 6],
  [312, 'email', 4],
  [320, 'slack', 7],
  [328, 'badge', 2],
  [335, 'slack', 0],
  [340, 'email', 0],
  [346, 'slack', 1],
  [352, 'badge', 3],
  [358, 'email', 1],
  [363, 'slack', 2],
  [368, 'slack', 3],
  [373, 'email', 2],
  [378, 'badge', 4],
  [383, 'slack', 4],
  [388, 'email', 3],
  [392, 'slack', 5],
  [396, 'badge', 5],
  [400, 'slack', 6],
  [404, 'email', 4],
  [408, 'slack', 7],
  [412, 'badge', 6],
  [415, 'slack', 0],
  [418, 'email', 0],
  [421, 'slack', 1],
  [424, 'badge', 7],
  [427, 'slack', 2],
  [430, 'email', 1],
  [433, 'slack', 3],
  [436, 'badge', 8],
  [439, 'slack', 4],
  [442, 'email', 2],
  [445, 'slack', 5],
  [448, 'badge', 9],
  [451, 'slack', 6],
  [454, 'email', 3],
  [457, 'slack', 7],
  [460, 'badge', 10],
  [463, 'slack', 0],
  [466, 'email', 4],
  [469, 'slack', 1],
  [472, 'badge', 11],
  [475, 'slack', 2],
  [478, 'email', 0],

  // Phase 4: Overwhelmed (frames 480-540) - everything stacks
  [482, 'slack', 3],
  [484, 'email', 1],
  [486, 'badge', 12],
  [488, 'slack', 4],
  [490, 'email', 2],
  [492, 'slack', 5],
  [494, 'badge', 13],
  [496, 'slack', 6],
  [498, 'email', 3],
  [500, 'slack', 7],
  [502, 'badge', 14],
  [504, 'email', 4],
  [506, 'slack', 0],
  [508, 'badge', 15],
  [510, 'slack', 1],
  [512, 'email', 0],
  [514, 'slack', 2],
  [516, 'badge', 16],
  [518, 'slack', 3],
  [520, 'email', 1],
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
        background: '#1a1a2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Laptop body */}
      <div
        style={{
          width: 1600,
          height: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Screen bezel */}
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
          {/* Camera notch */}
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
          {/* Screen content */}
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
        {/* Laptop base / hinge */}
        <div
          style={{
            width: 1600,
            height: 14,
            background: 'linear-gradient(180deg, #c0c0c0 0%, #a0a0a0 100%)',
            borderRadius: '0 0 2px 2px',
          }}
        />
        {/* Laptop bottom */}
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

const SlackSidebar: React.FC = () => {
  const channels = [
    'general',
    'sales-requests',
    'customer-marketing',
    'references',
    'random',
    'deal-support',
    'content-requests',
  ];
  return (
    <div
      style={{
        width: 220,
        height: '100%',
        background: '#3F0E40',
        padding: '16px 0',
        flexShrink: 0,
      }}
    >
      {/* Workspace name */}
      <div
        style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
          padding: '0 16px 16px',
          borderBottom: '1px solid #522653',
        }}
      >
        Acme Corp
      </div>
      {/* Channels header */}
      <div
        style={{
          color: '#cfa5cf',
          fontSize: 13,
          padding: '16px 16px 8px',
          fontWeight: 600,
        }}
      >
        Channels
      </div>
      {channels.map((ch) => (
        <div
          key={ch}
          style={{
            color: '#cfa5cf',
            fontSize: 14,
            padding: '3px 16px',
            cursor: 'pointer',
          }}
        >
          # {ch}
        </div>
      ))}
      {/* DMs header */}
      <div
        style={{
          color: '#cfa5cf',
          fontSize: 13,
          padding: '16px 16px 8px',
          fontWeight: 600,
        }}
      >
        Direct Messages
      </div>
      {SLACK_SENDERS.slice(0, 4).map((name) => (
        <div
          key={name}
          style={{
            color: '#cfa5cf',
            fontSize: 14,
            padding: '3px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#2bac76',
            }}
          />
          {name}
        </div>
      ))}
    </div>
  );
};

const SlackPanel: React.FC<{
  messages: Array<{sender: string; channel: string; text: string; opacity: number}>;
}> = ({messages}) => {
  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        display: 'flex',
        background: '#1a1d21',
      }}
    >
      <SlackSidebar />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
        }}
      >
        {/* Channel header */}
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid #e0e0e0',
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1d1c1d',
          }}
        >
          # sales-requests
        </div>
        {/* Messages area */}
        <div
          style={{
            flex: 1,
            padding: '12px 20px',
            overflowY: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                opacity: msg.opacity,
                display: 'flex',
                gap: 10,
                padding: '6px 0',
                transition: 'opacity 0.2s',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 6,
                  background: `hsl(${(i * 47 + 200) % 360}, 50%, 60%)`,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              >
                {msg.sender.charAt(0)}
              </div>
              <div>
                <div style={{display: 'flex', gap: 8, alignItems: 'baseline'}}>
                  <span
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      color: '#1d1c1d',
                    }}
                  >
                    {msg.sender}
                  </span>
                  <span style={{fontSize: 11, color: '#999'}}>
                    {`${9 + (i % 4)}:${15 + ((i * 13) % 45)}AM`}
                  </span>
                </div>
                <div style={{fontSize: 14, color: '#1d1c1d', marginTop: 2}}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GmailPanel: React.FC<{
  emails: Array<{sender: string; subject: string; opacity: number; isUnread: boolean}>;
}> = ({emails}) => {
  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Gmail header bar */}
      <div
        style={{
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: '1px solid #e0e0e0',
          background: '#f6f8fc',
        }}
      >
        {/* Gmail logo area */}
        <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
          <div
            style={{
              width: 28,
              height: 20,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Envelope shape */}
            <div
              style={{
                width: 24,
                height: 17,
                border: '2px solid #EA4335',
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 0,
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '8px solid #EA4335',
                }}
              />
            </div>
          </div>
          <span style={{fontSize: 18, fontWeight: 500, color: '#5f6368'}}>
            Gmail
          </span>
        </div>
        {/* Search bar */}
        <div
          style={{
            flex: 1,
            background: '#eaf1fb',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 14,
            color: '#5f6368',
          }}
        >
          Search mail
        </div>
      </div>
      {/* Tab area */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <div
          style={{
            padding: '10px 24px',
            fontSize: 13,
            fontWeight: 600,
            color: '#1a73e8',
            borderBottom: '3px solid #1a73e8',
          }}
        >
          Primary
        </div>
        <div style={{padding: '10px 24px', fontSize: 13, color: '#5f6368'}}>
          Promotions
        </div>
        <div style={{padding: '10px 24px', fontSize: 13, color: '#5f6368'}}>
          Social
        </div>
      </div>
      {/* Email list */}
      <div style={{flex: 1, overflowY: 'hidden'}}>
        {emails.map((email, i) => (
          <div
            key={i}
            style={{
              opacity: email.opacity,
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderBottom: '1px solid #f0f0f0',
              background: email.isUnread ? '#f2f6fc' : '#fff',
              gap: 12,
              transition: 'opacity 0.2s',
            }}
          >
            {/* Checkbox */}
            <div
              style={{
                width: 18,
                height: 18,
                border: '2px solid #c0c0c0',
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            {/* Star */}
            <div style={{fontSize: 16, color: '#c0c0c0', flexShrink: 0}}>
              *
            </div>
            {/* Sender */}
            <div
              style={{
                width: 140,
                fontSize: 13,
                fontWeight: email.isUnread ? 'bold' : 'normal',
                color: '#202124',
                flexShrink: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {email.sender}
            </div>
            {/* Subject */}
            <div
              style={{
                flex: 1,
                fontSize: 13,
                fontWeight: email.isUnread ? 'bold' : 'normal',
                color: '#202124',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {email.subject}
            </div>
            {/* Time */}
            <div
              style={{
                fontSize: 12,
                color: email.isUnread ? '#202124' : '#5f6368',
                fontWeight: email.isUnread ? 'bold' : 'normal',
                flexShrink: 0,
              }}
            >
              {`${9 + (i % 3)}:${10 + ((i * 17) % 50)} AM`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Toast notification that pops up
const SlackToast: React.FC<{
  sender: string;
  channel: string;
  text: string;
  x: number;
  y: number;
  animProgress: number;
}> = ({sender, channel, text, x, y, animProgress}) => {
  const opacity = interpolate(animProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.7]);
  const scale = interpolate(animProgress, [0, 0.1, 0.15], [0.8, 1.05, 1]);
  const translateY = interpolate(animProgress, [0, 0.15], [-10, 0]);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 360,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
        padding: '14px 16px',
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        zIndex: 100,
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
      }}
    >
      {/* Slack icon */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: '#4A154B',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            lineHeight: 1,
          }}
        >
          S
        </div>
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#4A154B',
            marginBottom: 2,
          }}
        >
          Slack - {channel}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            color: '#1d1c1d',
          }}
        >
          {sender}
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#616061',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

const EmailToast: React.FC<{
  sender: string;
  subject: string;
  x: number;
  y: number;
  animProgress: number;
}> = ({sender, subject, x, y, animProgress}) => {
  const opacity = interpolate(animProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.7]);
  const scale = interpolate(animProgress, [0, 0.1, 0.15], [0.8, 1.05, 1]);
  const translateY = interpolate(animProgress, [0, 0.15], [-10, 0]);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 340,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
        padding: '14px 16px',
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        zIndex: 100,
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
      }}
    >
      {/* Gmail icon */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: '#EA4335',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            lineHeight: 1,
          }}
        >
          M
        </div>
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#EA4335',
            marginBottom: 2,
          }}
        >
          Gmail
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            color: '#202124',
          }}
        >
          {sender}
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#5f6368',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {subject}
        </div>
      </div>
    </div>
  );
};

const BadgeCounter: React.FC<{
  count: number;
  x: number;
  y: number;
  color: string;
  animProgress: number;
}> = ({count, x, y, color, animProgress}) => {
  const opacity = interpolate(animProgress, [0, 0.2], [0, 1]);
  const scale = interpolate(animProgress, [0, 0.15, 0.25], [0.3, 1.3, 1]);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: count > 99 ? 36 : 26,
        height: 26,
        borderRadius: 13,
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `scale(${scale})`,
        zIndex: 200,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <span style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
        {count > 99 ? '99+' : count}
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main composition
// ---------------------------------------------------------------------------

export const NotificationFlood: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // --- Camera shake for chaos phase ---
  const shakeIntensity = interpolate(frame, [300, 400, 480, 540], [0, 3, 8, 12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shakeX = Math.sin(frame * 0.7) * shakeIntensity;
  const shakeY = Math.cos(frame * 0.9) * shakeIntensity;

  // --- Subtle zoom as overwhelm builds ---
  const zoom = interpolate(frame, [0, 300, 540], [1, 1, 1.04], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Build visible Slack messages list ---
  const slackSchedule = SCHEDULE.filter(([, type]) => type === 'slack');
  const visibleSlackMessages: Array<{
    sender: string;
    channel: string;
    text: string;
    opacity: number;
  }> = [];
  for (const [appearFrame, , idx] of slackSchedule) {
    if (frame >= appearFrame) {
      const msgOpacity = interpolate(
        frame,
        [appearFrame, appearFrame + 10],
        [0, 1],
        {extrapolateRight: 'clamp'}
      );
      visibleSlackMessages.push({
        sender: SLACK_SENDERS[idx % SLACK_SENDERS.length],
        channel: SLACK_CHANNELS[idx % SLACK_CHANNELS.length],
        text: SLACK_MESSAGES[idx % SLACK_MESSAGES.length],
        opacity: msgOpacity,
      });
    }
  }
  // Only show last ~12 in panel
  const slackPanelMessages = visibleSlackMessages.slice(-12);

  // --- Build visible email list ---
  const emailSchedule = SCHEDULE.filter(([, type]) => type === 'email');
  const visibleEmails: Array<{
    sender: string;
    subject: string;
    opacity: number;
    isUnread: boolean;
  }> = [];
  for (const [appearFrame, , idx] of emailSchedule) {
    if (frame >= appearFrame) {
      const emailOpacity = interpolate(
        frame,
        [appearFrame, appearFrame + 10],
        [0, 1],
        {extrapolateRight: 'clamp'}
      );
      visibleEmails.push({
        sender: EMAIL_SENDERS[idx % EMAIL_SENDERS.length],
        subject: EMAIL_SUBJECTS[idx % EMAIL_SUBJECTS.length],
        opacity: emailOpacity,
        isUnread: frame - appearFrame < 120,
      });
    }
  }
  const gmailPanelEmails = visibleEmails.slice(-10);

  // --- Toast notifications (pop-ups) ---
  // Show toasts for recent notifications
  const toastDuration = 80; // frames each toast is visible
  const activeSlackToasts: Array<{
    sender: string;
    channel: string;
    text: string;
    x: number;
    y: number;
    animProgress: number;
  }> = [];
  const activeEmailToasts: Array<{
    sender: string;
    subject: string;
    x: number;
    y: number;
    animProgress: number;
  }> = [];

  let toastIdx = 0;
  for (const [appearFrame, type, idx] of SCHEDULE) {
    if (frame >= appearFrame && frame < appearFrame + toastDuration) {
      const progress = (frame - appearFrame) / toastDuration;
      const seed = appearFrame * 7 + idx * 13 + toastIdx;
      if (type === 'slack') {
        activeSlackToasts.push({
          sender: SLACK_SENDERS[idx % SLACK_SENDERS.length],
          channel: SLACK_CHANNELS[idx % SLACK_CHANNELS.length],
          text: SLACK_MESSAGES[idx % SLACK_MESSAGES.length],
          x: 80 + seededRandom(seed) * 400,
          y: 50 + seededRandom(seed + 1) * 500,
          animProgress: progress,
        });
      } else if (type === 'email') {
        activeEmailToasts.push({
          sender: EMAIL_SENDERS[idx % EMAIL_SENDERS.length],
          subject: EMAIL_SUBJECTS[idx % EMAIL_SUBJECTS.length],
          x: 700 + seededRandom(seed) * 400,
          y: 50 + seededRandom(seed + 1) * 500,
          animProgress: progress,
        });
      }
    }
    toastIdx++;
  }

  // --- Badge counters ---
  const badgeSchedule = SCHEDULE.filter(([, type]) => type === 'badge');
  let slackBadgeCount = 0;
  let gmailBadgeCount = 0;
  for (const [appearFrame] of badgeSchedule) {
    if (frame >= appearFrame) {
      slackBadgeCount++;
      gmailBadgeCount++;
    }
  }
  // Also count messages for badge
  const totalSlack = slackSchedule.filter(([f]) => frame >= f).length;
  const totalEmail = emailSchedule.filter(([f]) => frame >= f).length;
  const slackBadge = totalSlack + slackBadgeCount;
  const gmailBadge = totalEmail + gmailBadgeCount;

  // --- Red overlay for final overwhelm ---
  const overwhelmOpacity = interpolate(frame, [460, 540], [0, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Badge animation progress
  const badgeAnim = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- macOS dock at bottom ---
  const Dock: React.FC = () => (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        background: 'rgba(240, 240, 240, 0.85)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '0 20px',
        zIndex: 50,
      }}
    >
      {/* Dock icons */}
      {['#1a73e8', '#4A154B', '#EA4335', '#34a853', '#fbbc04', '#ff6d01', '#9c27b0', '#607d8b'].map(
        (color, i) => (
          <div
            key={i}
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: color,
              position: 'relative',
            }}
          >
            {/* Badge on Slack icon (index 1) */}
            {i === 1 && slackBadge > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  minWidth: 20,
                  height: 20,
                  borderRadius: 10,
                  background: '#EA4335',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: '#fff',
                  padding: '0 4px',
                }}
              >
                {slackBadge > 99 ? '99+' : slackBadge}
              </div>
            )}
            {/* Badge on Gmail icon (index 2) */}
            {i === 2 && gmailBadge > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  minWidth: 20,
                  height: 20,
                  borderRadius: 10,
                  background: '#EA4335',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: '#fff',
                  padding: '0 4px',
                }}
              >
                {gmailBadge > 99 ? '99+' : gmailBadge}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );

  // --- macOS menu bar ---
  const MenuBar: React.FC = () => (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 28,
        background: 'rgba(240,240,240,0.92)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        fontSize: 13,
        color: '#333',
        justifyContent: 'space-between',
        zIndex: 50,
      }}
    >
      <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
        <span style={{fontWeight: 'bold', fontSize: 16}}>&#63743;</span>
        <span style={{fontWeight: 600}}>Slack</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Window</span>
        <span>Help</span>
      </div>
      <div style={{display: 'flex', gap: 12, alignItems: 'center', fontSize: 12}}>
        <span>Mon 9:42 AM</span>
      </div>
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        background: '#1a1a2e',
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
            background: '#f5f5f5',
          }}
        >
          <MenuBar />

          {/* Main content area - split Slack and Gmail */}
          <div
            style={{
              position: 'absolute',
              top: 28,
              left: 0,
              right: 0,
              bottom: 56,
              display: 'flex',
            }}
          >
            {/* Slack half */}
            <div style={{flex: 1, borderRight: '2px solid #e0e0e0'}}>
              <SlackPanel messages={slackPanelMessages} />
            </div>
            {/* Gmail half */}
            <div style={{flex: 1}}>
              <GmailPanel emails={gmailPanelEmails} />
            </div>
          </div>

          <Dock />

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
            {activeSlackToasts.map((toast, i) => (
              <SlackToast key={`st-${i}`} {...toast} />
            ))}
            {activeEmailToasts.map((toast, i) => (
              <EmailToast key={`et-${i}`} {...toast} />
            ))}
          </div>

          {/* Badge counters on dock area */}
          {slackBadge > 0 && (
            <BadgeCounter
              count={slackBadge}
              x={680}
              y={8}
              color="#4A154B"
              animProgress={badgeAnim}
            />
          )}
          {gmailBadge > 0 && (
            <BadgeCounter
              count={gmailBadge}
              x={780}
              y={8}
              color="#EA4335"
              animProgress={badgeAnim}
            />
          )}

          {/* Overwhelm red tint overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `rgba(234, 67, 53, ${overwhelmOpacity})`,
              pointerEvents: 'none',
              zIndex: 300,
            }}
          />
        </div>
      </MacBookFrame>
    </AbsoluteFill>
  );
};
