import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';

const CORAL_RED = '#FE4759';
const CORAL_RED_DARK = '#C02038';
const DEEP_INDIGO = '#160340';
const MID_INDIGO = '#241956';
const SOFT_WHITE = '#F8F8FB';

const PeerboundLogo: React.FC = () => (
	<svg width="38" height="38" viewBox="0 0 40 40" fill="none">
		<polygon points="20,2 38,36 2,36" fill={SOFT_WHITE} />
	</svg>
);

export interface PersonnelCardProps {
	photoFile: string; // filename in public/assets/, e.g. 'chris-dalton.jpg'
	category: string; // e.g. 'CAREER MOVE'
	name: string; // e.g. 'CHRIS DALTON'
	role: string; // e.g. 'PRINCIPAL, CUSTOMER MARKETING'
	company: string; // e.g. '@ GAINSIGHT'
	fromCompany: string; // e.g. 'Clari'
	toCompany: string; // e.g. 'Gainsight'
	chyron: string; // e.g. 'GAINED'
}

export const PersonnelCard: React.FC<PersonnelCardProps> = ({
	photoFile,
	category,
	name,
	role,
	company,
	fromCompany,
	toCompany,
	chyron,
}) => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: DEEP_INDIGO,
				fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
				overflow: 'hidden',
			}}
		>
			{/* Background dot grid texture */}
			<svg
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					opacity: 0.07,
					pointerEvents: 'none',
				}}
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<pattern
						id="dots"
						x="0"
						y="0"
						width="44"
						height="44"
						patternUnits="userSpaceOnUse"
					>
						<circle cx="22" cy="22" r="1.8" fill={SOFT_WHITE} />
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#dots)" />
			</svg>

			{/* Top banner */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: 112,
					background: `linear-gradient(135deg, ${CORAL_RED} 0%, ${CORAL_RED_DARK} 100%)`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingLeft: 44,
					paddingRight: 44,
					zIndex: 10,
					boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
				}}
			>
				<span
					style={{
						color: SOFT_WHITE,
						fontSize: 38,
						fontWeight: 800,
						letterSpacing: '0.14em',
						textTransform: 'uppercase',
						textShadow: '0 2px 8px rgba(0,0,0,0.25)',
					}}
				>
					{category}
				</span>
				<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
					<PeerboundLogo />
					<span
						style={{
							color: SOFT_WHITE,
							fontSize: 24,
							fontWeight: 700,
							letterSpacing: '0.18em',
							textTransform: 'uppercase',
						}}
					>
						PEERBOUND
					</span>
				</div>
			</div>

			{/* Headshot */}
			<div
				style={{
					position: 'absolute',
					top: 112,
					left: 0,
					right: 0,
					bottom: 260,
					overflow: 'hidden',
				}}
			>
				<Img
					src={staticFile(photoFile)}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center top',
					}}
				/>
				{/* Gradient fade into name plate */}
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: 160,
						background: `linear-gradient(to bottom, transparent 0%, ${DEEP_INDIGO} 100%)`,
					}}
				/>
				{/* Company transition badges */}
				<div
					style={{
						position: 'absolute',
						bottom: 28,
						left: 0,
						right: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 20,
					}}
				>
					<div
						style={{
							backgroundColor: 'rgba(255,255,255,0.92)',
							borderRadius: 12,
							padding: '10px 26px',
							fontSize: 22,
							fontWeight: 700,
							color: '#1a1a1a',
							letterSpacing: '0.02em',
							boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
						}}
					>
						{fromCompany}
					</div>
					<span
						style={{
							color: SOFT_WHITE,
							fontSize: 32,
							fontWeight: 300,
							opacity: 0.9,
						}}
					>
						→
					</span>
					<div
						style={{
							backgroundColor: 'rgba(255,255,255,0.92)',
							borderRadius: 12,
							padding: '10px 26px',
							fontSize: 22,
							fontWeight: 700,
							color: '#1a1a1a',
							letterSpacing: '0.02em',
							boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
						}}
					>
						{toCompany}
					</div>
				</div>
			</div>

			{/* Name plate */}
			<div
				style={{
					position: 'absolute',
					bottom: 150,
					left: 0,
					right: 0,
					height: 110,
					backgroundColor: MID_INDIGO,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 6,
					borderTop: `1px solid rgba(255,255,255,0.08)`,
				}}
			>
				<span
					style={{
						color: SOFT_WHITE,
						fontSize: 40,
						fontWeight: 800,
						letterSpacing: '0.1em',
						textTransform: 'uppercase',
						lineHeight: 1,
					}}
				>
					{name}
				</span>
				<span
					style={{
						color: 'rgba(248,248,251,0.55)',
						fontSize: 17,
						fontWeight: 500,
						letterSpacing: '0.07em',
						textTransform: 'uppercase',
					}}
				>
					{role} {company}
				</span>
			</div>

			{/* Chyron */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 150,
					background: `linear-gradient(135deg, ${CORAL_RED} 0%, ${CORAL_RED_DARK} 100%)`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					boxShadow: '0 -4px 24px rgba(0,0,0,0.3)',
				}}
			>
				<span
					style={{
						color: SOFT_WHITE,
						fontSize: 90,
						fontWeight: 900,
						letterSpacing: '0.12em',
						textTransform: 'uppercase',
						textShadow: '0 4px 20px rgba(0,0,0,0.3)',
						lineHeight: 1,
					}}
				>
					{chyron}
				</span>
			</div>
		</AbsoluteFill>
	);
};

// Chris Dalton card — export as a ready-to-render composition wrapper
export const ChrisDaltonCard: React.FC = () => (
	<PersonnelCard
		photoFile="Chris.jpg"
		category="CAREER MOVE"
		name="CHRIS DALTON"
		role="Principal, Customer Marketing"
		company="@ Gainsight"
		fromCompany="Clari"
		toCompany="Gainsight"
		chyron="GAINED"
	/>
);
