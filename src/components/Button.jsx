const Button = ({ value }) => {
  return (
    <div className="border p-1 rounded-full inline-block border-[#571ce0] shadow-blue-100 shadow">
      <button className="btn rounded-full border-transparent bg-[#571ce0] hover:bg-transparent text-white hover:border-[#571ce0]">
        {value}
      </button>
    </div>
  );
};

export default Button;
