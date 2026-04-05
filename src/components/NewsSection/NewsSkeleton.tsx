const NewsSkeleton: React.FC = () => (
  <section className="py-16 md:py-24 bg-linear-to-b from-gray-50 to-gray-100">
    <div className="container mx-auto px-4">
      <div className="mb-12">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="h-9 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-4/3 bg-gray-200 animate-pulse"></div>
        ))}
      </div>
    </div>
  </section>
);

export default NewsSkeleton;
