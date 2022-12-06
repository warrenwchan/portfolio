import Motion from "../Motion";

const BodyText = ({ data }) => {
  return (
    <Motion>
      <p className="px-4 leading-normal">{data.body_text}</p>
    </Motion>
  );
};

export default BodyText;
