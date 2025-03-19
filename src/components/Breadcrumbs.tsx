import React from "react";

interface BreadcrumbsProps {
  breadcrumb: { id: string | null; name: string }[];
  onBreadcrumbClick: (index: number) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumb,
  onBreadcrumbClick,
}) => {
  return (
    <nav className="breadcrumbs">
      {breadcrumb.map((crumb, index) => (
        <span
          key={crumb.id ?? "root"}
          onClick={() => onBreadcrumbClick(index)}
          style={{ cursor: "pointer", marginRight: "5px" }}
        >
          {crumb.name} {index < breadcrumb.length - 1 ? " > " : ""}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
