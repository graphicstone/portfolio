import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

const TAG_BASE_SX = {
  fontSize: '10px', fontWeight: 600,
  padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.03em',
};

const TAG_ACTIVE_SX = {
  ...TAG_BASE_SX,
  color: '#a5b4fc',
  background: 'rgba(99,102,241,0.1)',
  border: '1px solid rgba(99,102,241,0.2)',
};

const TAG_INACTIVE_SX = {
  ...TAG_BASE_SX,
  color: '#52525b',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid #2a2a2a',
};

export default function ExperienceCard({
  companyLogo,
  jobTitle,
  tenure,
  description = [],
  children,
  tags = [],
  isActive = false,
  defaultExpanded = false,
  expandLabel = 'details',
}) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  return (
    <Box
      sx={{
        width: '100%',
        padding: '28px 32px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'colors.surface',
        borderRadius: '12px',
        borderLeft: '3px solid',
        borderLeftColor: 'colors.accent',
        outline: '1px solid',
        outlineColor: isActive
          ? 'rgba(99,102,241,0.45)'
          : isOpen
            ? 'rgba(99,102,241,0.2)'
            : 'colors.border',
        transition: 'outline-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Glowing top edge — active role only */}
      {isActive && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(to right, transparent, #6366F1, transparent)',
            borderRadius: '12px 12px 0 0',
          }}
        />
      )}

      {/* Header row — click to toggle */}
      <Box
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen((prev) => !prev); } }}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '16px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {/* Logo */}
        <Box sx={{ '& svg': { width: '44px', height: 'auto', borderRadius: '6px' }, flexShrink: 0 }}>
          {companyLogo}
        </Box>

        {/* Meta: title + tenure + tags */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="heading_h4_semi_bold" sx={{ color: 'colors.textPrimary' }}>
            {jobTitle}
          </Typography>
          <Typography
            variant="heading_h6_medium"
            sx={{
              color: isActive ? 'colors.accent' : '#888',
              fontSize: '12px',
              letterSpacing: '0.03em',
              marginBottom: tags.length > 0 ? '10px' : 0,
            }}
          >
            {tenure}
          </Typography>
          {tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {tags.map((tag) => (
                <Box
                  key={tag}
                  component="span"
                  sx={isActive ? TAG_ACTIVE_SX : TAG_INACTIVE_SX}
                >
                  {tag}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Right column: CURRENT badge + expand button */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
          {isActive && (
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.25)',
                borderRadius: '20px',
                padding: '4px 10px 4px 7px',
              }}
            >
              <Box
                sx={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  backgroundColor: '#6366F1',
                  boxShadow: '0 0 8px rgba(99,102,241,0.8)',
                }}
              />
              <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#818cf8', letterSpacing: '0.06em' }}>
                CURRENT
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              fontSize: '10px',
              color: isOpen ? '#6366F1' : '#555',
              border: '1px solid',
              borderColor: isOpen ? 'rgba(99,102,241,0.3)' : '#2a2a2a',
              borderRadius: '4px',
              padding: '4px 8px',
              whiteSpace: 'nowrap',
            }}
          >
            {isOpen ? '▲ hide' : `▼ ${expandLabel}`}
          </Box>
        </Box>
      </Box>

      {/* Body — animated accordion */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <Box sx={{ color: 'colors.textSecondary', paddingTop: '24px' }}>
          {children ? (
            children
          ) : (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {description.map((item, index) => (
                <li key={index + item} style={{ marginBottom: '6px' }}>
                  <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.textSecondary' }}>
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </motion.div>
    </Box>
  );
}
