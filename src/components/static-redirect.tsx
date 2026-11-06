export function StaticRedirect({ href }: { href: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${href}`} />
      <main className="shell message-page">
        <h1>This page has moved.</h1>
        <p>
          <a className="text-link" href={href}>
            Continue to the updated page
          </a>
        </p>
      </main>
    </>
  );
}
