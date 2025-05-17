const Button = ({ text, onPress }) => {
  return (
    <button
      className="px-5 py-1 m-3 text-white font-semibold bg-orange-500 rounded-full"
      onClick={onPress}
      type="submit"
    >
      {text}
    </button>
  );
};

export default Button;
