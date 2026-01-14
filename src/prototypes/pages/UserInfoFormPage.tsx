import { PrototypeWrapper } from '../PrototypeWrapper';
import { UserInfoForm } from '../UserInfoForm';

/**
 * UserInfoFormPage
 *
 * Page wrapper for the UserInfoForm prototype.
 * Uses PrototypeWrapper for consistent navigation and layout.
 */
export function UserInfoFormPage() {
  return (
    <PrototypeWrapper
      title="User Info Form"
      description="Progressive disclosure form using accordions"
    >
      <UserInfoForm />
    </PrototypeWrapper>
  );
}

export default UserInfoFormPage;
