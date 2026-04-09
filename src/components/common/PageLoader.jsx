const PageLoader = () => (
  <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4">
    <div className="relative flex items-center justify-center">
      <div
        className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-primary-200)', borderTopColor: 'var(--color-primary-600)' }}
      />
      <span className="absolute text-2xl animate-pulse">😊</span>
    </div>
    <p
      className="text-lg font-bold tracking-widest uppercase animate-pulse"
      style={{ color: 'var(--color-primary-600)' }}
    >
      Ça charge…
    </p>
  </div>
);

export default PageLoader;
