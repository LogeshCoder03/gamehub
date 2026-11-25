import DataTable from "@/components/admin/DataTable";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import Loader from "../Loader";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
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
import type { FieldProps } from "@/types/commanTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  filter: string;
  page: string;
}

const FormField = ({
  type,
  name,
  label,
  value,
  onEdit,
  options,
}: FieldProps) => {
  switch (type) {
    case "email":
    case "number":
    case "text":
    case "datetime-local":
    case "password":
      return (
        <Field>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            type={type}
            name={name}
            value={value ? value : ""}
            onChange={(e) => onEdit?.(name, e.target.value)}
          />
        </Field>
      );
    case "select":
      return (
        <Field>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Select
            onValueChange={(value) => {
              onEdit?.(name, value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select-${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((value, idx) => (
                <SelectItem value={value as string} key={idx}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      );
    case "checkbox":
      return (
        <Field className="flex">
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Checkbox
            name={name}
            checked={value ?? false}
            onCheckedChange={(value) => onEdit?.(name, value)}
          />
        </Field>
      );
    case "textarea":
      return (
        <Field>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Textarea
            name={name}
            value={value ? value : ""}
            onChange={(e) => onEdit?.(name, e.target.value)}
          />
        </Field>
      );
    case "other":
        
      return (
        <Field>
          <FieldLabel htmlFor="available_on">Available on</FieldLabel>
          <FieldGroup className="flex-row py-2">
            {options?.map((option) => (
              <Field orientation="horizontal" key={option}>
                <FieldLabel htmlFor={option} className="capitalize">
                  {option}
                </FieldLabel>
                <Checkbox
                  id={option}
                  key={option}
                  value={option}
                  checked={
                    value
                      ? value.includes(option.toLowerCase())
                      : false
                  }
                  onCheckedChange={(isChecked) => {
                    let availableOn = [...value];
                    if (isChecked) {
                      availableOn.push(option);
                    } else {
                      availableOn = availableOn.filter(
                        (value) => value != option,
                      );
                    }
                    onEdit?.(name,availableOn);
                  }}
                />
              </Field>
            ))}
          </FieldGroup>
        </Field>
      );
    default:
      return null;
  }
};

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
    fields,
    onEdit,
    updatedData,
  } = useAdminContext();
  
  const handelEdit = (key: string, value: any) => {
    onEdit({ ...updatedData, [key]: value });
  };
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
        <Dialog
            open={operation === "update"}
            onOpenChange={() => onOperationChange(null)}
        >

            <DialogContent>
            <DialogHeader>
                <DialogTitle>Upload ApiKey</DialogTitle>
                <DialogDescription>
                Create the api key for your own
                </DialogDescription>
            </DialogHeader>
            {/* <ScrollArea className="h-fit w-full"> */}
            <FieldGroup className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                <FieldSet>
                {fields.map((field, idx) => {
                    return (
                    <FormField
                        key={idx}
                        {...field}
                        onEdit={handelEdit}
                        value={updatedData && updatedData[field.name]}
                    />
                    );
                })}
                </FieldSet>
            </FieldGroup>
            {/* </ScrollArea> */}
            <DialogFooter>
                <Button
                className="capitalize"
                onClick={() => onUpdate(updatedData)}
                >
                {updateLoading ? (
                    <>
                    <Spinner />
                    {operation?.slice(0, -1) + "ing"}
                    </>
                ) : (
                    operation
                )}
                </Button>
                <Button variant="outline" onClick={() => onOperationChange(null)}>
                Cancel
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
      <Dialog
        open={operation === "create"}
        onOpenChange={() => onOperationChange(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Craey ApiKey</DialogTitle>
            <DialogDescription>
              Create the api key for your own
            </DialogDescription>
          </DialogHeader>
          {/* <ScrollArea className="h-fit w-full"> */}
          <FieldGroup className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
            <FieldSet>
              {fields.map((field, idx) => {
                return (
                  <FormField
                    key={idx}
                    {...field}
                    onEdit={handelEdit}
                    value={updatedData && updatedData[field.name]}
                  />
                );
              })}
            </FieldSet>
          </FieldGroup>
          {/* </ScrollArea> */}
          <DialogFooter>
            <Button
              className="capitalize"
              onClick={() => onCreate(updatedData)}
            >
              {createLoading ? (
                <>
                  <Spinner />
                  {operation?.slice(0, -1) + "ing"}
                </>
              ) : (
                operation
              )}
            </Button>
            <Button variant="outline" onClick={() => onOperationChange(null)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={operation === "upload"}
        onOpenChange={() => onOperationChange(null)}
      >
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
                  <Spinner />
                  Uploading
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
