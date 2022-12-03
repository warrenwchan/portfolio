import Motion from "../Motion"

const SubTitle = ({ data }) => {
  return (
    <Motion>
      <h3 className="text-xl md:text-3xl font-bold">
        {data.sub_title}
      </h3>
    </Motion>
  )
}

export default SubTitle
