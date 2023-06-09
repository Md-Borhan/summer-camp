const SectionTitle = ({ title, subTitle }) => {
  return (
    <div className="text-center my-10">
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text">
        {title}
      </h2>
      <p>{subTitle}</p>
    </div>
  );
};

export default SectionTitle;
