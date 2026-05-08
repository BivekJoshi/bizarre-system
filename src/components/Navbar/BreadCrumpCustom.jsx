import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {
  adminTab,
  baristaTab,
  branchOwnerTab,
  cashierTab,
  customerTab,
  supplierTab,
  waiterTab,
} from "../SideBar/sideTab";
import { getUserType } from "../../utils/cookieHelper";

const roleTabsMap = {
  ADMIN: adminTab,
  BRANCH_OWNER: branchOwnerTab,
  CASHIER: cashierTab,
  WAITER: waiterTab,
  BARISTA: baristaTab,
  SUPPLIER: supplierTab,
  CUSTOMER: customerTab,
};

// Parent and subTab labels are kept in separate maps because their `value`s
// can collide (e.g. parent "Member" and sub "Branch Owner" both use
// `branch-owner`), and position determines which label to render.
const buildTabLookups = (tabs) => {
  const parentLabels = {};
  const subLabels = {};
  const parentOfSub = {};
  tabs.forEach((tab) => {
    parentLabels[tab.value] = tab.label;
    tab.subTabs?.forEach((sub) => {
      subLabels[sub.value] = sub.label;
      parentOfSub[sub.value] = tab.value;
    });
  });
  return { parentLabels, subLabels, parentOfSub };
};

// URL segments that represent IDs/route params rather than navigable pages.
const isIdLike = (seg) => {
  if (!seg) return false;
  if (/^\d+$/.test(seg)) return true;
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(seg)
  )
    return true;
  if (/^[0-9a-f]{24}$/i.test(seg)) return true;
  if (/[A-Z]/.test(seg) && /\d/.test(seg)) return true;
  if (seg.length >= 15 && /\d/.test(seg)) return true;
  return false;
};

const prettify = (seg) =>
  seg.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// Find the longest segment-prefix that matches a known tab/subTab path so
// multi-segment values like `profit/loss-report` are consumed as one crumb.
const matchTabPath = (segments, parentLabels, subLabels, parentOfSub) => {
  for (let i = segments.length; i > 0; i--) {
    const candidate = segments.slice(0, i).join("/");
    if (subLabels[candidate]) {
      const parentValue = parentOfSub[candidate];
      return {
        matchedPath: candidate,
        matchedLabel: subLabels[candidate],
        parentValue,
        parentLabel: parentValue ? parentLabels[parentValue] : null,
        consumed: i,
      };
    }
    if (parentLabels[candidate]) {
      return {
        matchedPath: candidate,
        matchedLabel: parentLabels[candidate],
        parentValue: null,
        parentLabel: null,
        consumed: i,
      };
    }
  }
  return null;
};

const BreadCrumpCustom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUserType();
  const userTabs = roleTabsMap[user] || [];
  const { parentLabels, subLabels, parentOfSub } = buildTabLookups(userTabs);

  const roleSegment = user ? user.toLowerCase() : "";
  const rawSegments = location.pathname
    .replace(/^\//, "")
    .split("/")
    .filter(Boolean);

  let segments =
    rawSegments[0] === roleSegment ? rawSegments.slice(1) : rawSegments;

  // Drop ID/param segments — they aren't navigable pages.
  segments = segments.filter((s) => !isIdLike(s));

  const dashboardValue = userTabs[0]?.value || "dashboard";
  const crumbs = [
    {
      label: (
        <HomeRoundedIcon
          sx={{
            verticalAlign: "middle",
            fontSize: 16,
            color: "text.secondary",
          }}
        />
      ),
      to: `/${roleSegment}/${dashboardValue}`,
      key: "home",
      isHome: true,
    },
  ];

  const match = matchTabPath(segments, parentLabels, subLabels, parentOfSub);

  if (match) {
    if (match.parentValue && match.parentLabel) {
      crumbs.push({
        label: match.parentLabel,
        to: `/${roleSegment}/${match.parentValue}`,
        key: `parent-${match.parentValue}`,
      });
    }
    crumbs.push({
      label: match.matchedLabel,
      to: `/${roleSegment}/${match.matchedPath}`,
      key: `match-${match.matchedPath}`,
    });
    segments.slice(match.consumed).forEach((seg, idx) => {
      const basePath = segments.slice(0, match.consumed + idx + 1).join("/");
      crumbs.push({
        label: prettify(seg),
        to: `/${roleSegment}/${basePath}`,
        key: `seg-${basePath}`,
      });
    });
  } else {
    segments.forEach((seg, idx) => {
      const partial = segments.slice(0, idx + 1).join("/");
      crumbs.push({
        label: prettify(seg),
        to: `/${roleSegment}/${partial}`,
        key: `seg-${partial}`,
      });
    });
  }

  // Remove consecutive duplicate labels (covers parent/sub collisions).
  const dedupedCrumbs = crumbs.filter((c, i) => {
    if (i === 0) return true;
    const prev = crumbs[i - 1];
    const bothStrings =
      typeof c.label === "string" && typeof prev.label === "string";
    return !(bothStrings && c.label === prev.label);
  });

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={
        <NavigateNextIcon
          sx={{ fontSize: 14, color: "text.disabled", mx: -0.5 }}
        />
      }
      sx={{
        fontSize: 13,
        color: "text.secondary",
        "& ol": { flexWrap: "nowrap", overflow: "hidden" },
        "& li": { minWidth: 0 },
      }}
    >
      {dedupedCrumbs.map((crumb, idx) => {
        const isLast = idx === dedupedCrumbs.length - 1;
        if (isLast) {
          return (
            <Typography
              key={crumb.key}
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {crumb.label}
            </Typography>
          );
        }
        return (
          <Link
            key={crumb.key}
            underline="hover"
            onClick={() => navigate(crumb.to)}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: "nowrap",
              "&:hover": { color: "text.primary" },
            }}
          >
            {crumb.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumpCustom;
