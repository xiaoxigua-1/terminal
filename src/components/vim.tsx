export default function Vim(text: string, _setText: (_text: string) => boolean): JSX.Element {
  return (
    <pre className="fixed w-screen h-screen top-0 bg-black z-40">
      {text}
    </pre>
  );
}
