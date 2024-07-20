import { FC, useCallback, useMemo, useState } from "react";
import { useConnect, useAccount } from "wagmi";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogType,
  useDialog,
} from "./dialog";
import { useToast } from "../Toast/ToastProvider";
import { Icons } from "@/app/lib/utils/dialog/constant";
import GradientText from "../WalletMenu/GradientText";

const ConnectorDialog: FC = () => {
  const { connectors, isPending, connectAsync } = useConnect();
  const { connector: activeConnector } = useAccount();
  const [pendingConnectorId, setPendingConnectorId] = useState("");
  const { open, setOpen } = useDialog(DialogType.Connector);
  const { showToast } = useToast();

  const onSelect = useCallback(
    async (connectorId: string) => {
      try {
        const connector = connectors.find((el) => el.id === connectorId);
        if (!connector) throw new Error("Connector not found");
        await connectAsync({ connector });
      } catch (error: any) {
        console.error(error);
        showToast(error.message || error, "error");
      } finally {
        setOpen(false);
      }
    },
    [connectAsync, connectors, setOpen, showToast],
  );

  const _connectors = useMemo(() => {
    const conns = [...connectors];
    const injected = conns.find((el) => el.id === "injected");
    if (injected) {
      return [
        injected,
        ...conns.filter(
          (el) => el.id !== "injected" && el.name !== injected.name,
        ),
      ];
    }
    return conns;
  }, [connectors]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-4xl">
            <GradientText className="text-left">
              Connect Your Wallet
            </GradientText>
          </DialogTitle>
          <DialogDescription className="!text-2xl text-left">
            Please select a wallet to connect.
          </DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-2 gap-5">
          {_connectors.map((connector) => {
            const iconSrc =
              connector.name in Icons ? Icons[connector.name] : Icons.Injected;
            const isConnected = activeConnector?.id === connector.id;

            return (
              <div
                onClick={() => {
                  if (!isConnected) {
                    onSelect(connector.id);
                    setPendingConnectorId(connector.id);
                  }
                }}
                key={connector.id}
                className="flex items-center rounded-xl cursor-pointer p-2 space-x-2 bg-white text-black-medium"
              >
                <Image
                  src={iconSrc}
                  alt={connector.name}
                  width={80}
                  height={80}
                  className="border border-black-medium rounded-xl p-2 h-20"
                />
                <div className="flex flex-col">
                  <h4 className="text-xl font-bold">{connector.name}</h4>
                  {isConnected ? (
                    <span className="text-sm font-semibold text-green-main">
                      (Connected)
                    </span>
                  ) : (
                    isPending &&
                    connector.id === pendingConnectorId && (
                      <span className="text-sm font-semibold text-gray-400">
                        Connecting...
                      </span>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectorDialog;
