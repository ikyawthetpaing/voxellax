import { UserCartItemsProvdier } from "@/context/user-cart-items";
import { UserCollectionsProvdier } from "@/context/user-collections";

interface Props {
  children: React.ReactNode;
}

export function UserContextsProviders({ children }: Props) {
  return (
    <UserCartItemsProvdier>
      <UserCollectionsProvdier>{children}</UserCollectionsProvdier>
    </UserCartItemsProvdier>
  );
}
