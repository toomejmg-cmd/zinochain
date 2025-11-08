import React from 'react';
import './StarBorder.css';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = '#B19EEF',
  speed = '6s',
  thickness = 2,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        '--border-color': color,
        '--animation-speed': speed,
        '--border-thickness': `${thickness}px`,
      } as React.CSSProperties}
      {...(rest as any)}
    >
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
