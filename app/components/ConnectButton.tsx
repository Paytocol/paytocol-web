import { useAppKit } from "@reown/appkit/react";

export function ConnectButton() {
  // 4. Use modal hook
  const { open } = useAppKit();

  return (
    <div className="column">
      <appkit-button />
    </div>
  );
}