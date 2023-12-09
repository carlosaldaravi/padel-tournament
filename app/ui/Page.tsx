const Page = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <main className="p-4">
      <h1 className="mt-4 mb-12 text-center text-4xl font-bold">{title}</h1>
      <div className="flex justify-center">
        <div className="w-full sm:w-4/5 ">{children}</div>
      </div>
    </main>
  );
};

export default Page;
