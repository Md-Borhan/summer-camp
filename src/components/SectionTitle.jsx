const SectionTitle = ({ title, subTitle }) => {
  return (
    <div className="text-center my-10 text-white w-full md:w-9/12 mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text">
        {title}
      </h2>
      <p className="mt-4">{subTitle}</p>
    </div>
  );
};

export default SectionTitle;
