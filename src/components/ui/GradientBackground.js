/**
 * GradientBackground Component
 *
 * Dark mode gradient glow effect.
 * Only visible in dark mode - creates a diffused pink glow.
 *
 * Props:
 * - variant: 'pink' | 'fuchsia' | 'rose' | 'custom' (default: 'pink')
 * - position: gradient position, e.g. '50% 50%' (default: '50% 50%')
 * - size: size of the glow in pixels (default: 400)
 * - intensity: opacity 0-100 (default: 30)
 * - blur: blur amount in pixels (default: 100)
 * - className: additional classes
 */

const GradientBackground = ({
  variant = 'pink',
  position = '50% 50%',
  size = 400,
  intensity = 30,
  blur = 100,
  className = '',
}) => {
  const colors = {
    pink: 'bg-pink-500',
    fuchsia: 'bg-fuchsia-400',
    rose: 'bg-rose-400',
    indigo: 'bg-indigo-500',
  };

  const colorClass = colors[variant] || colors.pink;

  return (
    <div
      className={`hidden dark:block absolute pointer-events-none ${className}`}
      style={{
        top: position.split(' ')[1] || '50%',
        left: position.split(' ')[0] || '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`rounded-full ${colorClass}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          opacity: intensity / 100,
          filter: `blur(${blur}px)`,
        }}
      />
    </div>
  );
};

export default GradientBackground;
