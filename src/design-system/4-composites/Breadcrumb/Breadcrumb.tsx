import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './Breadcrumb.module.css';
import { Link } from '../../3-primitives/Link';

export interface BreadcrumbItem {
  /** Label for the breadcrumb */
  label: string;
  /** URL to navigate to */
  href?: string;
  /** Icon to display before label */
  icon?: React.ReactNode;
  /** Is this the current page */
  current?: boolean;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator (default: /) */
  separator?: React.ReactNode;
  /** Collapse breadcrumbs on mobile */
  collapsible?: boolean;
  /** Max items to show before collapsing */
  maxItems?: number;
  /** Additional className */
  className?: string;
  /** Callback when item is clicked */
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  collapsible = true,
  maxItems,
  className,
  onItemClick,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (collapsible) {
      const handleResize = () => {
        setIsCollapsed(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [collapsible]);

  const renderItems = () => {
    let displayItems = [...items];

    // Handle maxItems truncation
    if (maxItems && items.length > maxItems) {
      const firstItem = items[0];
      const lastItems = items.slice(-(maxItems - 1));
      displayItems = [firstItem, { label: '...', href: undefined }, ...lastItems];
    }

    // Handle mobile collapse - show only first and last
    if (isCollapsed && items.length > 2) {
      displayItems = [items[0], { label: '...', href: undefined }, items[items.length - 1]];
    }

    return displayItems.map((item, index) => {
      const isLast = index === displayItems.length - 1;
      const isCurrent = item.current || isLast;
      const isEllipsis = item.label === '...';

      const handleClick = (e: React.MouseEvent) => {
        if (onItemClick && !isCurrent && !isEllipsis) {
          e.preventDefault();
          onItemClick(item, index);
        }
      };

      return (
        <li key={`${item.label}-${index}`} className={styles.item}>
          {item.href && !isCurrent ? (
            <Link
              href={item.href}
              className={cn(styles.link, isEllipsis && styles.ellipsis)}
              onClick={handleClick}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            <span
              className={cn(
                styles.text,
                isCurrent && styles.current,
                isEllipsis && styles.ellipsis
              )}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              {item.label}
            </span>
          )}
          {!isLast && <span className={styles.separator}>{separator}</span>}
        </li>
      );
    });
  };

  return (
    <nav aria-label="Breadcrumb" className={cn(styles.breadcrumb, className)}>
      <ol className={styles.list}>{renderItems()}</ol>
    </nav>
  );
};

Breadcrumb.displayName = 'InkBreadcrumb';

export { Breadcrumb };
