import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogType,
  useDialog,
} from "./dialog";
import GradientText from "../GradientText";

const ConnectorDialog: FC = () => {
  const { open, setOpen } = useDialog(DialogType.Connector);

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
          {Array.from({ length: 5 }).map((connector, ind) => {
            return ind;
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectorDialog;
