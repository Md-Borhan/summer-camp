const SectionTitle = ({ title, subTitle }) => {
  return (
    <div
      className={`text-center bg-[#1f2340] px-4 md:px-0 py-10 text-white w-full md:w-9/12 mx-auto `}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text">
        {title}
      </h2>
      <p className="mt-4">{subTitle}</p>
    </div>
  );
};

export default SectionTitle;
