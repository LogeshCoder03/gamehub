import type { ApiKeyType, ApiKeyUsageType } from "@/types/apiKeyTypes";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import type { BaseGameType } from "@/types/gameTypes";
import type { UserType } from "@/types/authTypes";

interface ColumnProps {
  onSetId: (id: number) => void;
  onSetOperation: (operation: "delete" | "update"|"upload") => void;
  onHandleUpdate:(data:any)=>void
}

export const userColumns = ({
  onSetId,
  onSetOperation,
  onHandleUpdate
}: ColumnProps): ColumnDef<UserType>[] => {
  const userColumns:ColumnDef<UserType>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "username",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "is_superuser",
      header: "SuperUser",
    },
    {
      accessorKey: "is_active",
      header: "Active",
    },
    {
      accessorKey: "is_admin",
      header: "Admin",
    },
    {
      id: "actions",
      header: "actions",
      enableHiding: false,
      cell({ row }) {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  onSetOperation("delete");
                  onSetId(data.id);
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onHandleUpdate(data)
                  onSetOperation("update");
                }}
              >
                Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return userColumns;
};

export const gameColumns = ({
  onSetId,
  onHandleUpdate,
  onSetOperation,
}: ColumnProps): ColumnDef<BaseGameType>[] => {
  const columns: ColumnDef<BaseGameType>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "logo",
      header: "Logo",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "details.downloads",
      header: "Downloads",
    },
    {
      accessorKey: "details.type",
      header: "Type",
    },
    {
      accessorKey: "details.category",
      header: "Category",
    },
    {
      accessorKey: "details.is_conduct_tournament",
      header: "Tournament",
    },
    {
      accessorKey: "details.available_on",
      header: "Available On",
    },
    {
      accessorKey: "details.popularity",
      header: "Popularity",
    },
    {
      accessorKey: "details.ratings",
      header: "Ratings",
    },
    {
      accessorKey: "development_details.founder",
      header: "Founder",
    },
    {
      accessorKey: "development_details.published_at",
      header: "Published At",
    },
    {
      accessorKey: "development_details.made_in",
      header: "Made In",
    },
    {
      accessorKey: "is_approved",
      header: "Is Approved",
    },
    {
      id: "actions",
      header: "actions",
      enableHiding: false,
      cell({ row }) {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  onSetId(data.id);
                  onSetOperation("delete");
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onHandleUpdate({
                    id:data.id,
                    description:data.description,
                    logo:data.logo,
                    name:data.name,
                    is_approved:data.is_approved,
                    ...data.details,
                    ...data.development_details
                  })
                  onSetOperation("update");
                }}
              >
                Update
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onSetId(data.id);
                  onSetOperation("upload");
                }}
              >
                Update Logo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return columns;
};

export const apiKeyColumns = ({
  onSetId,
  onSetOperation,
  onHandleUpdate
}: ColumnProps): ColumnDef<ApiKeyType>[] => {
  const columns: ColumnDef<ApiKeyType>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "api_key",
      header: "Api Key",
    },
    {
      accessorKey: "user_id",
      header: "User",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "actions",
      header: "actions",
      enableHiding: false,
      cell({ row }) {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  onSetOperation("delete");
                  onSetId(data.id);
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onHandleUpdate(data)
                  onSetOperation("update");
                }}
              >
                Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return columns;
};
export const apiKeyUsageColumns = ({
  onSetId,
  onSetOperation,
  onHandleUpdate
}: ColumnProps): ColumnDef<ApiKeyUsageType>[] => {
  const columns: ColumnDef<ApiKeyUsageType>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "api_key_id",
      header: "Api Key",
    },
    {
      accessorKey: "user_id",
      header: "User",
    },
    {
      accessorKey: "count",
      header: "Count",
    },
    {
      accessorKey: "endpoint",
      header: "Endpoint",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell({row}) {
        const data=row.original
        return(
            <p>{new Date(data.date).toDateString()}</p>
        )
      },
    },
    {
      id: "actions",
      header: "actions",
      enableHiding: false,
      cell({ row }) {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  onSetOperation("delete");
                  onSetId(data.id);
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onHandleUpdate(data)
                  onSetOperation("update");
                }}
              >
                Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return columns;
};
