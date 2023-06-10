const Button = ({ value }) => {
  return (
    <div className="border w-full p-1 rounded-full inline-block border-[#571ce0] shadow-blue-100 shadow">
      <button className="btn btn-block rounded-full border-transparent bg-[#571ce0] hover:bg-transparent px-5 text-white hover:border-[#571ce0]">
        {value}
      </button>
    </div>
  );
};

export default Button;
