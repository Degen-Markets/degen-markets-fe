import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogType,
  useDialog,
} from "../dialog";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import ProfileDetails from "./ProfileDetails";

const AccountDetailDialog = ({ children }: { children: ReactNode }) => {
  const { open, setOpen } = useDialog(DialogType.AccountDetail);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  if (!address) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <ProfileDetails
          address={address}
          balance={balance}
          onDisconnect={disconnect}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AccountDetailDialog;
