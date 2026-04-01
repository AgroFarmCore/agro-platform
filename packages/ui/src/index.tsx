import type { CSSProperties, ReactNode } from "react";

const cardStyle: CSSProperties = {
  border: "1px solid rgba(15, 23, 42, 0.08)",
  borderRadius: 20,
  padding: 24,
  background: "rgba(255,255,255,0.92)",
  boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
};

export function AppFrame(props: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={{ display: "grid", gap: 24 }}>
      <header style={{ display: "grid", gap: 8 }}>
        <span
          style={{
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#5b6b5f",
          }}
        >
          {props.eyebrow}
        </span>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3.75rem)",
            margin: 0,
            color: "#102418",
          }}
        >
          {props.title}
        </h1>
      </header>
      <div style={{ display: "grid", gap: 16 }}>{props.children}</div>
    </section>
  );
}

export function Surface(props: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <article style={cardStyle}>
      <div style={{ display: "grid", gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 22, color: "#102418" }}>
          {props.title}
        </h2>
        <p style={{ margin: 0, color: "#4e5d52", lineHeight: 1.6 }}>
          {props.description}
        </p>
        {props.children}
      </div>
    </article>
  );
}

export function Stack(props: { children: ReactNode }) {
  return <div style={{ display: "grid", gap: 16 }}>{props.children}</div>;
}
