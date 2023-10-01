import { UserCartItemsProvdier } from "@/context/user-cart-items";
import { UserCollectionsProvdier } from "@/context/user-collections";
import { UserLikesProvdier } from "@/context/user-likes";

interface Props {
  children: React.ReactNode;
}

export function UserContextsProviders({ children }: Props) {
  return (
    <UserCartItemsProvdier>
      <UserLikesProvdier>
        <UserCollectionsProvdier>{children}</UserCollectionsProvdier>
      </UserLikesProvdier>
    </UserCartItemsProvdier>
  );
}
