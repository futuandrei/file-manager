import React from "react";
import "./Breadcrumbs.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface BreadcrumbsProps {
  breadcrumb: { id: string | null; name: string }[];
  onBreadcrumbClick: (index: number) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumb,
  onBreadcrumbClick,
}) => {
  //   console.log("Breadcrumb State:", breadcrumb); // ✅ Debugging

  return (
    <nav className="breadcrumbs">
      {breadcrumb.map((crumb, index) => (
        <span
          key={crumb.id ?? `root-${index}`}
          onClick={() => {
            console.log("Breadcrumb Clicked in Breadcrumbs.tsx:", crumb); // ✅ Debugging
            onBreadcrumbClick(index);
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            marginRight: "5px",
          }}
        >
          {crumb.name}
          {index < breadcrumb.length - 1 && (
            <ArrowForwardIosIcon fontSize="small" style={{ margin: "0 5px" }} />
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
