import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

// ─────────────────────────────────────────────────────────────────────────────
// Formatters
// ─────────────────────────────────────────────────────────────────────────────

const DASH = "—";

export const formatMoney = (n, currency = "Rs") => {
  if (n == null || n === "") return DASH;
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  return `${currency} ${num.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

export const formatNumber = (n) => {
  if (n == null || n === "") return DASH;
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  return num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
};

const isoLike = (v) =>
  typeof v === "string" &&
  /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/.test(
    v,
  );

export const formatDate = (v, opts) => {
  if (!v) return DASH;
  const d = v instanceof Date ? v : new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  const hasTime =
    typeof v === "string" && /T\d{2}:\d{2}/.test(v) && !opts?.dateOnly;
  return d.toLocaleString(
    undefined,
    opts?.format ||
      (hasTime
        ? { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
        : { year: "numeric", month: "short", day: "numeric" }),
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Status chip — semantic colors derived from the enum value
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_PALETTE = {
  ACTIVE: { color: "success", variant: "filled" },
  INACTIVE: { color: "default", variant: "outlined" },
  PENDING: { color: "warning", variant: "outlined" },
  WAITING: { color: "warning", variant: "outlined" },
  PREPARING: { color: "info", variant: "outlined" },
  READY: { color: "primary", variant: "outlined" },
  IN_PROGRESS: { color: "info", variant: "outlined" },
  PROCESSING: { color: "info", variant: "outlined" },
  DRAFT: { color: "default", variant: "outlined" },
  COMPLETED: { color: "success", variant: "filled" },
  SUCCESS: { color: "success", variant: "filled" },
  PAID: { color: "success", variant: "filled" },
  SERVED: { color: "success", variant: "filled" },
  VERIFIED: { color: "success", variant: "filled" },
  APPROVED: { color: "success", variant: "filled" },
  AVAILABLE: { color: "success", variant: "filled" },
  CANCELLED: { color: "error", variant: "outlined" },
  CANCELED: { color: "error", variant: "outlined" },
  REJECTED: { color: "error", variant: "outlined" },
  FAILED: { color: "error", variant: "outlined" },
  UNVERIFIED: { color: "warning", variant: "outlined" },
  UNPAID: { color: "warning", variant: "outlined" },
  OUT_OF_STOCK: { color: "error", variant: "filled" },
  OCCUPIED: { color: "error", variant: "outlined" },
  RESERVED: { color: "warning", variant: "outlined" },
  OUT_OF_ORDER: { color: "default", variant: "outlined" },
  LOCKED: { color: "error", variant: "outlined" },
  UNLOCKED: { color: "success", variant: "outlined" },
};

const humanizeEnum = (v) =>
  String(v)
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const StatusCell = ({ value }) => {
  if (value == null || value === "") return <Dash />;
  const key = String(value).toUpperCase();
  const palette = STATUS_PALETTE[key] || {
    color: "default",
    variant: "outlined",
  };
  return (
    <Chip
      size="small"
      color={palette.color}
      variant={palette.variant}
      label={humanizeEnum(value)}
      sx={{
        height: 22,
        fontSize: "0.7rem",
        fontWeight: 600,
        borderRadius: 1,
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Cell components
// ─────────────────────────────────────────────────────────────────────────────

export const Dash = () => (
  <Typography component="span" sx={{ color: "text.disabled" }}>
    {DASH}
  </Typography>
);

export const MoneyCell = ({ value, currency }) => (
  <Typography
    component="span"
    sx={{
      fontVariantNumeric: "tabular-nums",
      fontWeight: 600,
      color: value == null ? "text.disabled" : "text.primary",
    }}
  >
    {formatMoney(value, currency)}
  </Typography>
);

export const NumberCell = ({ value }) => (
  <Typography
    component="span"
    sx={{
      fontVariantNumeric: "tabular-nums",
      color: value == null ? "text.disabled" : "text.primary",
    }}
  >
    {formatNumber(value)}
  </Typography>
);

export const DateCell = ({ value, dateOnly = false }) => (
  <Typography
    component="span"
    sx={{ color: value == null ? "text.disabled" : "text.primary" }}
  >
    {formatDate(value, { dateOnly })}
  </Typography>
);

export const BooleanCell = ({ value }) => {
  if (value == null) return <Dash />;
  return value ? (
    <CheckRoundedIcon sx={{ color: "success.main", fontSize: 18 }} />
  ) : (
    <CloseRoundedIcon sx={{ color: "error.main", fontSize: 18 }} />
  );
};

export const TruncatedCell = ({ value, lines = 1, maxWidth = 280 }) => {
  if (value == null || value === "") return <Dash />;
  const text = String(value);
  return (
    <Tooltip title={text} placement="top" arrow disableInteractive>
      <Typography
        component="span"
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: lines,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: lines === 1 ? "nowrap" : "normal",
          maxWidth,
          color: "text.primary",
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};

export const NameWithAvatarCell = ({
  name,
  src,
  subtitle,
  shape = "rounded",
}) => (
  <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0 }}>
    <Avatar
      src={src}
      alt={name}
      variant={shape === "rounded" ? "rounded" : "circular"}
      sx={{
        width: 28,
        height: 28,
        borderRadius: shape === "rounded" ? 1 : "50%",
        fontSize: 12,
      }}
    >
      {name?.charAt?.(0)?.toUpperCase()}
    </Avatar>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="body2"
        fontWeight={600}
        noWrap
        sx={{ lineHeight: 1.2 }}
      >
        {name || <Dash />}
      </Typography>
      {subtitle && (
        <Typography
          variant="caption"
          noWrap
          sx={{ color: "text.secondary", display: "block", lineHeight: 1.2 }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  </Stack>
);

export const LinkCell = ({ value, href }) => {
  if (!value) return <Dash />;
  return (
    <Typography
      component="a"
      href={href || `mailto:${value}`}
      sx={{
        color: "primary.main",
        textDecoration: "none",
        "&:hover": { textDecoration: "underline" },
      }}
    >
      {value}
    </Typography>
  );
};

export const TagsCell = ({ value, max = 3 }) => {
  if (!value) return <Dash />;
  const list = Array.isArray(value)
    ? value
    : String(value)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
  if (list.length === 0) return <Dash />;
  const visible = list.slice(0, max);
  const overflow = list.length - max;
  return (
    <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5 }}>
      {visible.map((t, i) => (
        <Chip
          key={i}
          label={t}
          size="small"
          variant="outlined"
          sx={{ height: 20, fontSize: "0.65rem", borderRadius: 1 }}
        />
      ))}
      {overflow > 0 && (
        <Tooltip title={list.slice(max).join(", ")} arrow>
          <Chip
            label={`+${overflow}`}
            size="small"
            variant="outlined"
            sx={{ height: 20, fontSize: "0.65rem", borderRadius: 1 }}
          />
        </Tooltip>
      )}
    </Stack>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Smart auto-formatter — used by CustomTable when a column has no `Cell`
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_KEY_RE = /(status|state)$/i;
const DATE_KEY_RE = /(date|time|at|on|expires|effective|termination|joined|birth|created|updated)$/i;
const MONEY_KEY_RE = /(amount|price|salary|bill|paid|due|cost|total|balance|fee|charge)/i;
const COUNT_KEY_RE = /(count|qty|quantity|level|days|capacity)$/i;

export const autoCell = (column) => {
  // Respect any explicit Cell renderer / accessorFn / mrt-internal column.
  if (column?.Cell || column?.accessorFn) return column;
  const key = column?.accessorKey || column?.id;
  if (!key || typeof key !== "string") return column;
  if (key.startsWith("mrt-")) return column;

  const lowerKey = key.toLowerCase();

  // Boolean — likely keys
  if (/^(is|has)[A-Z]/.test(key) || /^(verified|active|enabled|locked)$/i.test(key)) {
    return {
      align: "center",
      ...column,
      Cell: ({ cell }) => <BooleanCell value={cell.getValue()} />,
    };
  }

  if (STATUS_KEY_RE.test(key)) {
    return {
      ...column,
      Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    };
  }

  if (DATE_KEY_RE.test(lowerKey)) {
    return {
      ...column,
      Cell: ({ cell }) => <DateCell value={cell.getValue()} />,
    };
  }

  if (MONEY_KEY_RE.test(lowerKey)) {
    return {
      align: "right",
      muiTableHeadCellProps: { align: "right" },
      muiTableBodyCellProps: { align: "right" },
      ...column,
      Cell: ({ cell }) => <MoneyCell value={cell.getValue()} />,
    };
  }

  if (COUNT_KEY_RE.test(lowerKey)) {
    return {
      align: "right",
      muiTableHeadCellProps: { align: "right" },
      muiTableBodyCellProps: { align: "right" },
      ...column,
      Cell: ({ cell }) => <NumberCell value={cell.getValue()} />,
    };
  }

  // Generic text — wrap in a truncated cell so long strings get tooltip + ellipsis.
  return {
    ...column,
    Cell: ({ cell }) => {
      const v = cell.getValue();
      // ISO-looking date even when key didn't hint at it
      if (isoLike(v)) return <DateCell value={v} />;
      if (v == null || v === "") return <Dash />;
      // boolean values
      if (typeof v === "boolean") return <BooleanCell value={v} />;
      // arrays → tags
      if (Array.isArray(v)) return <TagsCell value={v} />;
      // objects → JSON to avoid React errors
      if (typeof v === "object")
        return <Typography variant="caption">{JSON.stringify(v)}</Typography>;
      return <TruncatedCell value={v} />;
    },
  };
};

export const enrichColumns = (columns = []) => columns.map(autoCell);
