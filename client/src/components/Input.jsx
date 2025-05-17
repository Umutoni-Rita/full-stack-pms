const Input = ({ placeholder, onChange, type = "text" }) => {
    return(
  <input
    className="p-3 m-3 font-semibold bg-orange-50 rounded-md border border-orange-400 placeholder:font-normal text-black  "
    placeholder={placeholder}
    onChange={onChange}
    type={type}
  />);
};

export default Input;
