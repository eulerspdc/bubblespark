import { FC } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbProps {
  paths: { name: string; href: string }[];
}

export const DynamicBreadcrumb: FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500">
      {paths.map((path, index) => (
        <BreadcrumbList key={index}>
          {index > 0 && index < paths.length - 1 ? (
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={path.href}>{path.name}</BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            <span>{path.name}</span>
          )}
          {index < paths.length - 1 && (
            <BreadcrumbSeparator className="hidden md:block" />
          )}
        </BreadcrumbList>
      ))}
    </div>
  );
};
