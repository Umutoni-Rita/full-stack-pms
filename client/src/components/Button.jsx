const Button = ({ text, onPress, disabled }) => {
  return (
    <button
      className="px-5 py-1 m-3 text-white font-semibold bg-[#1E6A6E] rounded-full hover:bg-[#165557] disabled:cursor-not-allowed"
      onClick={onPress} disabled= {disabled}
      type="submit"
    >
      {text}
    </button>
  );
};

export default Button;
