import { Button } from "@/components/ui/button";
import type { ApiKeyType } from "@/types/apiKeyTypes";
import { Clipboard } from "lucide-react";
import { Activity } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ApiKeyTable from "./ApiKeyTable";
import { toast } from "../ui/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "../ui/spinner";

export interface ApiKeyProps {
  apiKeys: ApiKeyType[];
  onNameChange: (name: string) => void;
  onSubmit: () => void;
  onDelete: () => void;
  onApiKeyChange: (id: number) => void;
  operation: "delete"  | "update"|"create" | "created" | null;
  onOperationChange: (operation: "delete"  |"create"| "update" | null) => void;
  apiKey: string;
}

const ApiKeyPage = ({
  apiKeys,
  operation,
  apiKey,
  onOperationChange,
  onNameChange,
  onDelete,
  onApiKeyChange,
  onSubmit,
}: ApiKeyProps) => {
  return (
    <div className="h-screen w-full p-4">
      <div className="">
        <h1 className="font-bold text-2xl">API Keys</h1>
        <p className="pt-3">
          Manage your API keys to securely access the Game API and monitor usage
          across your application.
        </p>
      </div>
      <div className="mt-4 flex justify-end mr-10">
        <Button onClick={()=>onOperationChange("create")}>Create</Button>

      </div>
      <div className="py-4">
        <ApiKeyTable
          apiKeys={apiKeys}
          onApiKeyChange={onApiKeyChange}
          onOperationChange={onOperationChange}
        />
      </div>
        <Dialog open={operation==="create"} onOpenChange={()=>onOperationChange(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create ApiKey</DialogTitle>
              <DialogDescription>
                Generate a secure API key to authenticate your requests and
                access the Game API. Keep your key private and never expose it
                in public code.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    name="name"
                    onChange={(event) => onNameChange(event.target.value)}
                  />
                </Field>
              </FieldSet>
            </FieldGroup>
            <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button onClick={onSubmit}>
              Create
            </Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>
      <AlertDialog
        open={operation === "delete"}
        onOpenChange={() => onOperationChange(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} variant="destructive">
              {"deleteLoading" == "deleteLoading" ? (
                <>
                  <Spinner />
                  Deleting
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={operation==="created"} onOpenChange={()=>onOperationChange(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>APi Key</DialogTitle>
            <DialogDescription>
              Your API Key has been created successfully. Please store it
              securely - you won't be able to view it again
            </DialogDescription>
          </DialogHeader>
          <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
            <p>**********************************</p>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              className="shadow-2xl border-2"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(apiKey);
                toast.add({ title: "Copied" });
                onOperationChange(null);
              }}
            >
              <Clipboard />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiKeyPage;
