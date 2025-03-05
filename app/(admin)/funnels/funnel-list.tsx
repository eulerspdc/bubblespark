"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Edit,
  Trash,
  Copy,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { FunnelCampaign } from "@prisma/client";
import Link from "next/link";
import {
  formatDate,
  timeAgo,
  checkExpirationDate,
  ExpirationStatus,
} from "@/lib/date-utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const returnExpirationColorStatus = (dateStatus: ExpirationStatus) => {
  if (dateStatus.expired === "danger") {
    return "bg-red-100 text-red-800";
  } else if (dateStatus.expired === "alert") {
    return "bg-yellow-100 text-yellow-800";
  } else {
    return "bg-green-100 text-green-800";
  }
};

const PublishStatusChip: React.FC<{ isPublished: boolean }> = ({
  isPublished,
}) => (
  <span
    className={`rounded-full px-2 py-1 text-xs font-semibold ${isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
  >
    {isPublished ? "Publicado" : "Não publicado"}
  </span>
);
const ExpiresAtChip: React.FC<{ dateStatus: ExpirationStatus }> = ({
  dateStatus,
}) => (
  <span
    className={`rounded-full px-2 py-1 text-xs font-semibold ${returnExpirationColorStatus(dateStatus)}`}
  >
    {dateStatus.message}
  </span>
);

const FunnelItem: React.FC<{
  funnel: FunnelCampaign;
  onToggleActive: () => void;
}> = ({ funnel, onToggleActive }) => (
  <Card className="mb-4 border-gray-200 rounded-sm shadow-sm">
    <CardContent className="flex flex-col items-start justify-between p-4 sm:flex-row sm:items-center">
      <div className="w-full flex-grow sm:w-auto">
        <div className="mb-2 flex flex-col justify-between sm:mb-0 sm:flex-row sm:items-center">
          <Link href={`/funnels/${funnel.slug}/edit`} className="block w-full">
            <div className="mb-2 flex items-center space-x-2 sm:mb-0   ">
              <h3 className="text-lg font-semibold capitalize">
                {funnel.funnelName}
              </h3>
              <PublishStatusChip isPublished={funnel.isPublished} />
              <ExpiresAtChip
                dateStatus={checkExpirationDate(funnel.expiresAt)}
              />
            </div>
          </Link>
        </div>
        <Link
          href={`/p/${funnel.slug}`}
          className="mb-2 mr-14 text-sm text-blue-500 hover:underline"
        >
          Acessar vídeo da campanha
        </Link>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Link
              href={funnel?.leadCount ? `/funnels/${funnel.slug}/leads` : "#"}
            >
              <Button
                variant="ghost"
                size="icon"
                className="flex w-full items-center px-1 py-0"
              >
                <Users className="h-4 w-4" />
                Leads: {funnel?.leadCount}
              </Button>
            </Link>

            {/* <Users className="h-4 w-4" /> */}
            {Math.floor(Math.random() * 100) % 2 === 0 ? (
              <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="ml-1 h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>
              Expira em:{" "}
              {funnel?.expiresAt ? formatDate(funnel.expiresAt) : "N/A"}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>No ar a {timeAgo(funnel.createdAt)}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-4 sm:mt-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Status:</span>

          <Switch
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
            checked={funnel.isPublished}
            onCheckedChange={onToggleActive}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" />
              <span>Deletar</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              <span>Duplicar</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Ver leads</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardContent>
  </Card>
);

interface FunnelListProps {
  funnels: FunnelCampaign[];
}

export const FunnelList: React.FC<FunnelListProps> = ({ funnels }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  return (
    <div className="container ml-auto mr-auto mt-4 lg:max-w-full">
      <div className="flex justify-between items-center py-4">
      <h1 className="mb-4 text-2xl font-bold">Lista de Funis</h1>
      <Link href="/funnels/create">
        <Button variant="default">Novo Funil</Button>
      </Link>
      </div>
      {mounted &&
        funnels.map((funnel: FunnelCampaign) => (
          <FunnelItem
            key={funnel.id}
            funnel={funnel}
            onToggleActive={() => {}}
          />
        ))}
    </div>
  );
};
