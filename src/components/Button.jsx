function Button(props) {
  return (
    <button {...props} className="bg-slate-400 p-1 rounded-md text-white">
      {props.children}
    </button>
  );
}

export default Button;
