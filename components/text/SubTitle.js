import Motion from "../Motion";

const SubTitle = ({ data }) => {
  return (
    <Motion>
      <h3 className="text-xl font-bold md:text-3xl">{data.sub_title}</h3>
    </Motion>
  );
};

export default SubTitle;
