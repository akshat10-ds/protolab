import { PrototypeWrapper } from '../PrototypeWrapper';
import { PartiesView } from '../PartiesView';

/**
 * PartiesViewPage
 *
 * Page wrapper for the PartiesView prototype.
 */
export function PartiesViewPage() {
  return (
    <PrototypeWrapper
      title="Parties View"
      description="View and manage all parties with tabbed filtering (All, Recent, Starred), search, and star functionality."
    >
      <PartiesView />
    </PrototypeWrapper>
  );
}

export default PartiesViewPage;
