import { formatPrice } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    price: 1999,
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    price: 39.0,
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    price: 299.0,
  },
  {
    name: "William Kim",
    email: "will@email.com",
    price: 99.0,
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    price: 39.0,
  },
];

export function RecentSales() {
  return (
    <div>
      {sales.length ? (
        <div className="space-y-8">
          {sales.map((sale, index) => (
            <div key={index} className="flex gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col justify-between gap-2 sm:flex-row">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {sale.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{sale.email}</p>
                </div>
                <div className="font-medium">+{formatPrice(sale.price)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
