import Box from '@mui/material/Box';

/**
 * Infinite horizontal scroll strip.
 * Duplicates `items` array so the loop appears seamless.
 * Pauses on hover. Fades edges with a mask gradient.
 *
 * Props:
 *   items   — array of React nodes (e.g. <SkillsBadge /> elements)
 *   reverse — if true, scroll direction is right-to-left
 *   speed   — animation duration in seconds (higher = slower)
 */
export default function MarqueeStrip({ items, reverse = false, speed = 30 }) {
  const doubled = [...items, ...items];

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          gap: '12px',
          animation: `${reverse ? 'marqueeReverse' : 'marquee'} ${speed}s linear infinite`,
          '&:hover': { animationPlayState: 'paused' },
        }}
      >
        {doubled.map((item, i) => (
          <Box key={i} sx={{ flexShrink: 0 }}>
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
