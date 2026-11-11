/* A template remounts on every navigation, so this one class gives each page
   a short cross-fade in without a client-side animation library. Opacity
   only: a transform here would break `position: sticky` further down. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
