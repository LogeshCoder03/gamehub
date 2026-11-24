import type { ApiKeyType, ApiKeyUsageType } from "@/types/apiKeyTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import type { BaseGameType } from "@/types/gameTypes";
import type { UserType } from "@/types/authTypes";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";

const userColumnHelper = createColumnHelper<DataTableFeatures, UserType>();
const gameColumnHelper = createColumnHelper<DataTableFeatures, BaseGameType>();
const apiKeyColumnHelper = createColumnHelper<DataTableFeatures, ApiKeyType>();
const apiKeyUsageColumnHelper = createColumnHelper<
  DataTableFeatures,
  ApiKeyUsageType
>();

interface ColumnProps {
  onSetId: (id: number) => void;
  onSetOperation: (operation: "delete" | "update" | "upload") => void;
  onHandleUpdate: (data: any) => void;
}

export const userColumns = ({
  onSetId,
  onSetOperation,
  onHandleUpdate,
}: ColumnProps): any => {
  const userColumns = userColumnHelper.columns([
    userColumnHelper.accessor("id", {
      header: "Id",
    }),
    userColumnHelper.accessor("username", {
      header: "Username",
    }),
    userColumnHelper.accessor("email", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    }),
    userColumnHelper.accessor("is_superuser", {
      header: "SuperUser",
    }),
    userColumnHelper.accessor("is_active", {
      header: "Active",
    }),
    userColumnHelper.accessor("is_admin", {
      header: "Admin",
    }),
    userColumnHelper.display({
      id: "actions",
      header: "Action",
      // enableHiding: true,
      cell({ row }) {
        const data = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    onSetOperation("delete");
                    onSetId(data.id);
                  }}
                >
                  Delete
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onHandleUpdate(data);
                    onSetOperation("update");
                  }}
                >
                  Update
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ]);

  return userColumns;
};

export const gameColumns = ({
  onSetId,
  onHandleUpdate,
  onSetOperation,
}: ColumnProps) => {
  const columns = gameColumnHelper.columns([
    gameColumnHelper.accessor("id", {
      header: "Id",
    }),
    gameColumnHelper.accessor("name", {
      header: "Name",
    }),
    gameColumnHelper.accessor("logo", {
      header: "Logo",
    }),
    gameColumnHelper.accessor("description", {
      header: "Description",
    }),
    gameColumnHelper.accessor("details.available_on", {
      header: "Available On",
    }),
    gameColumnHelper.accessor("details.category", {
      header: "Category",
    }),
    gameColumnHelper.accessor("details.downloads", {
      header: "Downloads",
    }),
    gameColumnHelper.accessor("details.is_conduct_tournament", {
      header: "Is Conduct Tournament",
    }),
    gameColumnHelper.accessor("details.popularity", {
      header: "Popularity",
    }),
    gameColumnHelper.accessor("details.ratings", {
      header: "Ratings",
    }),
    gameColumnHelper.accessor("details.type", {
      header: "Type",
    }),
    gameColumnHelper.accessor("is_approved", {
      header: "Is Approved",
    }),
    gameColumnHelper.accessor("development_details.founder", {
      header: "Founder",
    }),
    gameColumnHelper.accessor("development_details.made_in", {
      header: "MadeIn",
    }),
    gameColumnHelper.accessor("development_details.published_at", {
      header: "Published At",
    }),
    gameColumnHelper.display({
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell({ row }) {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              }
            />
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {/* <DropdownMenuSeparator /> */}
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
                      id: data.id,
                      description: data.description,
                      logo: data.logo,
                      name: data.name,
                      is_approved: data.is_approved,
                      ...data.details,
                      ...data.development_details,
                    });
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
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ]);
  return columns;
};

export const apiKeyColumns = ({
  onSetId,
  onSetOperation,
  onHandleUpdate,
}: ColumnProps) => {
  const columns = apiKeyColumnHelper.columns([
    apiKeyColumnHelper.accessor("id", {
      header: "Id",
    }),
    apiKeyColumnHelper.accessor("name", {
      header: "Name",
    }),
    apiKeyColumnHelper.accessor("api_key", {
      header: "API Key",
    }),
    apiKeyColumnHelper.accessor("role", {
      header: "Role",
    }),
    apiKeyColumnHelper.accessor("created_at", {
      header: "Created At",
    }),
    apiKeyColumnHelper.group({
      id: "actions",
      header: "Actions",
      cell({ row }) {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
                    onHandleUpdate(data);
                    onSetOperation("update");
                  }}
                >
                  Update
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ]);
  return columns;
};

export const apiKeyUsageColumns = ({
  onSetId,
  onSetOperation,
  onHandleUpdate,
}: ColumnProps) => {
  const columns = apiKeyUsageColumnHelper.columns([
    apiKeyUsageColumnHelper.accessor("id", {
      header: "Id",
    }),
    apiKeyUsageColumnHelper.accessor("api_key", {
      header: "API Key",
    }),
    apiKeyUsageColumnHelper.accessor("count", {
      header: "Count",
    }),
    apiKeyUsageColumnHelper.accessor("date", {
      header: "Date",
    }),
    apiKeyUsageColumnHelper.group({
      header: "Actions",
      id: "action",
      cell({ row }) {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
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
                    onHandleUpdate(data);
                    onSetOperation("update");
                  }}
                >
                  Update
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ]);

  return columns;
};



