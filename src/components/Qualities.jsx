const Qualities = ({ qualities }) => {
  return (
    <>
      {qualities.map((item) => (
        <span key={item.name} className={`badge text-bg-${item.color} m-2`}>
          {item.name}
        </span>
      ))}
    </>
  );
};

export default Qualities;
