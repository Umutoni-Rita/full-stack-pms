const Input = ({ placeholder, onChange, type = "text", name }) => {
  return (
    <input
      className="p-3 m-3 font-semibold bg-[#E5E7EB] rounded-md border border-[#1E6A6E] placeholder:font-normal text-black"
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      name={name}
    />
  );
};

export default Input;