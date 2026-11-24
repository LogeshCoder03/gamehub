import DataTable from "@/components/admin/DataTable";
import { Activity, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import Loader from "../Loader";
import UpdateModal from "./UpdateModal";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import useAdminContext from "@/pages/admin/useAdminContext";
import { Spinner } from "../ui/spinner";
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

interface Props {
  filter: string;
  page: string;
}

const AdminPresenter = ({ filter, page }: Props) => {
  const [logo, setLogo] = useState<File | undefined>();
  const {
    columns,
    onOperationChange,
    isLoading,
    data,
    onDelete,
    onCreate,
    onUpdateLogo,
    onUpdate,
    operation,
    updateLoading,
    deleteLoading,
    createLoading,
    logoLoading,
  } = useAdminContext();
  if (isLoading) return <Loader />;

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-end mt-4">
        {page === "games" ? (
          <Button>
            <Link to={`/admin/${page}/create`}>Create</Link>
          </Button>
        ) : (
          <Button onClick={() => onOperationChange("create")}>Create</Button>
        )}
      </div>
      <DataTable 
      data={data} 
      columns={columns} 
    //   filter={filter} 
     />
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
              {deleteLoading ? (
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
      <Activity mode={operation === "update" ? "visible" : "hidden"}>
        <UpdateModal onSubmit={onUpdate} isLoading={updateLoading} />
      </Activity>
      <Activity mode={operation === "create" ? "visible" : "hidden"}>
        <UpdateModal onSubmit={onCreate} isLoading={createLoading} />
      </Activity>
      <Dialog open={operation==="upload"} onOpenChange={()=>onOperationChange(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload ApiKey</DialogTitle>
            <DialogDescription>
              Create the api key for your own
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="logo">Upload</FieldLabel>
              <Input
                name="logo"
                type="file"
                required
                onChange={(e) => setLogo(e.target.files?.[0])}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              disabled={logo ? false : true}
              onClick={() => {
                if (!logo) {
                  toast.add({ title: "The file is required" });
                } else {
                  onUpdateLogo(logo!);
                  setLogo(undefined);
                }
              }}
            >
              {logoLoading ? (
                <>
                  <Spinner>Uploading</Spinner>Uploading
                </>
              ) : (
                "Update"
              )}
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPresenter;
