import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useAdminContext from "@/pages/admin/useAdminContext";
import { Spinner } from "../ui/spinner";
import type { FieldProps } from "@/types/commanTypes";

interface Props {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}
const titleDesc = {
  "api-keys": {
    title: "API Key",
    description:
      "Generate a secure API key to authenticate your requests and access the Game API. Keep your key private and never expose it in public code.",
  },
  "key-usages": {
    title: "API Key Usage",
    description:
      "Track how your API keys are being used with detailed insights into request counts, daily usage, and endpoint activity.",
  },
  users: {
    title: "User",
    description:
      "Manage user accounts, monitor activity, and control access to API resources based on roles and subscriptions.",
  },
  games: {
    title: "Games",
    description: "Update Games Data",
  },
};

const UpdateField = ({ type, name, label, value, onEdit }: FieldProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        type={type}
        name={name}
        value={value ? value : ""}
        onChange={(e) => onEdit?.({ [name]: e.target.value })}
      />
    </Field>
  );
};

const UpdateModal = ({ onSubmit, isLoading }: Props) => {
  const {
    fields,
    onOperationChange,
    updatedData: data,
    onEdit,
    operation,
    page,
  } = useAdminContext();
  return (
    <div className="fixed bg-primary/20 w-full h-screen flex items-center justify-center inset-0 z-40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="capitalize">
            {operation} {titleDesc[page].title}
          </CardTitle>
          <CardDescription>{titleDesc[page].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72">
            <FieldGroup>
              <FieldSet>
                {fields.map((field, idx) => {
                  if (field.type === "checkbox") {
                    return (
                      <Field key={idx} className="flex">
                        <FieldLabel htmlFor={field.name}>
                          {field.label}
                        </FieldLabel>
                        <Checkbox
                          name={field.name}
                          checked={data ? data[field.name] : false}
                          onCheckedChange={(value) =>
                            onEdit({ ...data, [field.name]: value })
                          }
                        />
                      </Field>
                    );
                  } else if (field.type === "select") {
                    return (
                      <Field key={idx}>
                        <FieldLabel htmlFor={field.name}>
                          {field.label}
                        </FieldLabel>
                        <Select
                          onValueChange={(value) => {
                            onEdit({ ...data, [field.name]: value });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`Select-${field.label}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((value, idx) => (
                              <SelectItem value={value as string} key={idx}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    );
                  } else if (field.type === "other") {
                    return (
                      <Field key={idx}>
                        <FieldLabel htmlFor="available_on">
                          Available on
                        </FieldLabel>
                        <FieldGroup className="flex-row py-2">
                          {field.options?.map((option) => (
                            <Field orientation="horizontal" key={option}>
                              <FieldLabel
                                htmlFor={option}
                                className="capitalize"
                              >
                                {option}
                              </FieldLabel>
                              <Checkbox
                                id={option}
                                key={option}
                                value={option}
                                checked={
                                  data
                                    ? data[field.name].includes(
                                        option.toLowerCase(),
                                      )
                                    : false
                                }
                                onCheckedChange={(isChecked) => {
                                  let availableOn = [...data[field.name]];
                                  if (isChecked) {
                                    availableOn.push(option);
                                  } else {
                                    availableOn = availableOn.filter(
                                      (value) => value != option,
                                    );
                                  }
                                  onEdit({
                                    ...data,
                                    [field.name]: availableOn,
                                  });
                                }}
                              />
                            </Field>
                          ))}
                        </FieldGroup>
                      </Field>
                    );
                  }
                  return (
                    <UpdateField
                      {...field}
                      key={idx}
                      value={data && data[field.name]}
                      onEdit={(value) => onEdit({ ...data, ...value })}
                    />
                  );
                })}
              </FieldSet>
            </FieldGroup>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-purple-400 capitalize"
            onClick={() => onSubmit(data)}
          >
            {isLoading ? (
              <>
                <Spinner />
                {operation?.slice(0, -1) + "ing"}
              </>
            ) : (
              operation
            )}
          </Button>
          <Button onClick={() => onOperationChange(null)}>Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateModal;
