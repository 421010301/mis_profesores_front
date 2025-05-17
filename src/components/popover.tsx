import { useEffect, useRef } from 'react';

interface PopoverProps {
  icon?: string | React.ReactNode; // Puede ser un string o un componente React
  message: string;
  className?: string;
  placement?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
}

export default function Popover({
  icon,
  message,
  className,
  placement = 'top',
}: PopoverProps) {
  const popoverRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let instance: any;

    const loadPopover = async () => {
      const { Popover } = await import('bootstrap');

      if (popoverRef.current) {
        instance = new Popover(popoverRef.current, {
          trigger: 'hover focus',
          placement,
          content: message,
          container: 'body',
        });
      }
    };

    loadPopover();

    return () => {
      if (instance) {
        instance.dispose();
      }
    };
  }, [placement, message]);

  return (
    <button
      tabIndex={0}
      ref={popoverRef}
      type='button'
      className={`btn ${className ?? 'btn-light'} rounded`}
      data-bs-toggle='popover'
      aria-label='Popover Button'
      aria-describedby={message}
    >
      {typeof icon === 'string' ? <i className={`bi bi-${icon}`}></i> : icon}
    </button>
  );
}
