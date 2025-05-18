const Button = ({ text, onPress }) => {
  return (
    <button
      className="px-5 py-1 m-3 text-white font-semibold bg-[#1E6A6E] rounded-full hover:bg-[#165557]"
      onClick={onPress}
      type="submit"
    >
      {text}
    </button>
  );
};

export default Button;
